import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { checkRateLimit } from "@/lib/rate-limit";
import { FIRM } from "@/lib/gassman-data";

export const runtime = "nodejs";

type ChatMessage = { role: "user" | "assistant"; content: string };

async function summarizeTranscript(
  transcript: ChatMessage[],
  leadName: string,
): Promise<{ summary: string; cleanTranscript: string }> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  const dialogue = transcript
    .map((m) => `${m.role === "user" ? leadName : "Assistant"}: ${m.content}`)
    .join("\n\n");

  if (!apiKey || transcript.length === 0)
    return {
      summary: "(Summary unavailable: missing API key or empty transcript.)",
      cleanTranscript: dialogue,
    };

  const client = new Anthropic({ apiKey });
  try {
    const r = await client.messages.create({
      model: process.env.ANTHROPIC_MODEL || "claude-sonnet-4-5-20250929",
      max_tokens: 600,
      system: `You are an assistant for ${FIRM.name}, a CPA firm. You receive a chat transcript from the firm's website assistant and produce:

1. A 2-3 sentence summary of who the visitor is, what they need, and any urgency.
2. The transcript, cleaned up (no system noise).

Return JSON only, no commentary, in this exact shape:
{
  "summary": "<summary>",
  "transcript": "<clean transcript>"
}`,
      messages: [{ role: "user", content: dialogue }],
    });
    const text = r.content
      .filter((c) => c.type === "text")
      .map((c) => (c.type === "text" ? c.text : ""))
      .join("");
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("no json");
    const parsed = JSON.parse(match[0]);
    return {
      summary: parsed.summary || "(No summary returned.)",
      cleanTranscript: parsed.transcript || dialogue,
    };
  } catch (err) {
    console.error("Summarization error:", err);
    return {
      summary: "(Auto-summary failed; raw transcript below.)",
      cleanTranscript: dialogue,
    };
  }
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(`lead:${ip}`, 6, 60_000)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const body = await req.json();
    const { name, email, phone, intent, transcript } = body || {};

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 },
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email." }, { status: 400 });
    }

    const isFollowUp = Array.isArray(transcript) && transcript.length > 0;
    const { summary, cleanTranscript } = isFollowUp
      ? await summarizeTranscript(transcript, name)
      : { summary: "", cleanTranscript: "" };

    const lines = [
      isFollowUp
        ? "AI Chat: Conversation Complete"
        : "AI Chat: New Visitor Started Chatting",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      intent ? `Interest: ${intent}` : null,
      "",
      ...(isFollowUp
        ? [
            "--- Summary ---",
            summary,
            "",
            "--- Transcript ---",
            cleanTranscript,
          ]
        : [
            "(Visitor just opened the chat. Transcript will follow when the conversation ends.)",
          ]),
    ].filter(Boolean) as string[];
    const text = lines.join("\n");

    const to = process.env.LEAD_TO_EMAIL || FIRM.email;
    const from =
      process.env.LEAD_FROM_EMAIL ||
      `${FIRM.name} Website <onboarding@resend.dev>`;
    const subject = isFollowUp
      ? `Chat Complete: ${name} (${intent || "General"})`
      : `New Chat Lead: ${name} (${intent || "General"})`;

    if (!process.env.RESEND_API_KEY) {
      console.log("=== LEAD (Resend not configured) ===");
      console.log(text);
      return NextResponse.json({ success: true, dev: true });
    }

    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject,
        text,
      }),
    });
    if (!r.ok) {
      console.error("Resend error:", await r.text());
      return NextResponse.json(
        { error: "Failed to send lead." },
        { status: 500 },
      );
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Lead route error:", err);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
