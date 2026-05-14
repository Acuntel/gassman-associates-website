"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send } from "lucide-react";
import { FIRM, SERVICES } from "@/lib/gassman-data";

type Msg = { role: "user" | "assistant"; content: string };
type LeadInfo = {
  name: string;
  email: string;
  phone?: string;
  intent?: string;
};

const SS_LEAD = "gassman-chat-lead-v1";
const SS_MSGS = "gassman-chat-msgs-v1";

const INTENTS = [
  "Tax preparation",
  "IRS representation",
  "Tax planning / strategy",
  "Multi-state taxation",
  "Business consulting",
  "Estate / trust",
  "Just a general question",
];

export default function ChatWidget() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [showProactive, setShowProactive] = useState(false);
  const [lead, setLead] = useState<LeadInfo | null>(null);
  const [leadDraft, setLeadDraft] = useState<LeadInfo>({
    name: "",
    email: "",
    phone: "",
    intent: "",
  });
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const scroller = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const sentFinalRef = useRef(false);

  useEffect(() => {
    setMounted(true);
    try {
      const l = sessionStorage.getItem(SS_LEAD);
      if (l) setLead(JSON.parse(l));
      const m = sessionStorage.getItem(SS_MSGS);
      if (m) setMessages(JSON.parse(m));
    } catch {}
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      sessionStorage.setItem(SS_MSGS, JSON.stringify(messages));
    } catch {}
  }, [messages, mounted]);

  useEffect(() => {
    if (open || !mounted) return;
    const t = setTimeout(() => setShowProactive(true), 12000);
    return () => clearTimeout(t);
  }, [open, mounted]);

  useEffect(() => {
    if (open && scroller.current) {
      scroller.current.scrollTop = scroller.current.scrollHeight;
    }
  }, [messages, open]);

  useEffect(() => {
    if (!lead || messages.length === 0) return;
    const sendFinal = () => {
      if (sentFinalRef.current) return;
      sentFinalRef.current = true;
      try {
        const payload = JSON.stringify({
          ...lead,
          transcript: messages,
        });
        const blob = new Blob([payload], { type: "application/json" });
        navigator.sendBeacon?.("/api/chat/lead", blob);
      } catch {}
    };
    window.addEventListener("pagehide", sendFinal);
    return () => window.removeEventListener("pagehide", sendFinal);
  }, [lead, messages]);

  function openChat() {
    setOpen(true);
    setShowProactive(false);
    setTimeout(() => inputRef.current?.focus(), 250);
  }

  async function submitLead(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!leadDraft.name.trim() || !leadDraft.email.trim()) {
      setError("Name and email are required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadDraft.email)) {
      setError("Please enter a valid email.");
      return;
    }
    setSubmitting(true);
    const lf: LeadInfo = {
      name: leadDraft.name.trim(),
      email: leadDraft.email.trim(),
      phone: leadDraft.phone?.trim() || undefined,
      intent: leadDraft.intent || undefined,
    };
    try {
      sessionStorage.setItem(SS_LEAD, JSON.stringify(lf));
    } catch {}
    setLead(lf);
    fetch("/api/chat/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lf),
    }).catch(() => {});
    const firstName = lf.name.split(" ")[0];
    setMessages([
      {
        role: "assistant",
        content:
          `Welcome, ${firstName}. I'm the Gassman & Associates assistant. ${lf.intent ? `I'll keep your interest in ${lf.intent.toLowerCase()} in mind.` : ""} What can I help you with?`.trim(),
      },
    ]);
    setSubmitting(false);
  }

  async function send() {
    if (!input.trim() || sending) return;
    const userMsg: Msg = { role: "user", content: input.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setSending(true);

    const placeholder: Msg = { role: "assistant", content: "" };
    setMessages((m) => [...m, placeholder]);

    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          leadInfo: lead,
        }),
      });
      if (!r.ok || !r.body) {
        setMessages((m) => {
          const c = [...m];
          c[c.length - 1] = {
            role: "assistant",
            content: `Sorry — I had trouble responding. Please call us at ${FIRM.phone}.`,
          };
          return c;
        });
        return;
      }
      const reader = r.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((m) => {
          const c = [...m];
          c[c.length - 1] = { role: "assistant", content: acc };
          return c;
        });
      }
    } catch (err) {
      console.error(err);
      setMessages((m) => {
        const c = [...m];
        c[c.length - 1] = {
          role: "assistant",
          content: `Sorry — I had trouble responding. Please call us at ${FIRM.phone}.`,
        };
        return c;
      });
    } finally {
      setSending(false);
    }
  }

  function onKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  if (!mounted) return null;

  return (
    <>
      <AnimatePresence>
        {!open && showProactive && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={openChat}
            className="fixed bottom-24 right-4 sm:right-6 z-40 max-w-[260px] rounded-2xl bg-white px-4 py-3 text-left text-sm text-ink shadow-lg ring-1 ring-border"
          >
            <span className="block font-heading text-oxblood">
              Have a tax question?
            </span>
            <span className="block text-xs text-muted mt-1">
              I can help, or set up a call with the team.
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <button
        type="button"
        aria-label={open ? "Close chat" : "Open chat"}
        onClick={() => (open ? setOpen(false) : openChat())}
        className="fixed bottom-5 right-4 sm:right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-oxblood text-ivory shadow-xl ring-2 ring-ivory/40 transition-transform hover:scale-105 active:scale-95"
      >
        {open ? <X size={22} /> : <MessageSquare size={22} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", damping: 22, stiffness: 280 }}
            className="fixed inset-x-2 bottom-24 z-40 max-h-[min(720px,calc(100dvh-7rem))] overflow-hidden rounded-2xl bg-ivory shadow-2xl ring-1 ring-border sm:inset-x-auto sm:right-6 sm:bottom-24 sm:w-[400px]"
          >
            <div className="flex items-center justify-between bg-oxblood px-5 py-4 text-ivory">
              <div>
                <p className="font-heading text-base leading-tight">
                  Gassman &amp; Associates
                </p>
                <p className="text-[11px] uppercase tracking-[0.18em] text-camel-light">
                  Website assistant
                </p>
              </div>
              <button
                type="button"
                aria-label="Close chat"
                onClick={() => setOpen(false)}
                className="rounded-full p-1.5 text-ivory/80 hover:bg-ivory/10 hover:text-ivory"
              >
                <X size={18} />
              </button>
            </div>

            {!lead ? (
              <form onSubmit={submitLead} className="p-5">
                <p className="text-sm text-ink">
                  Before we chat — what's the best way to reach you if we get
                  cut off?
                </p>
                {error && (
                  <p className="mt-3 rounded-md bg-oxblood/10 px-3 py-2 text-xs text-oxblood">
                    {error}
                  </p>
                )}
                <div className="mt-4 space-y-3">
                  <input
                    className="input-field"
                    placeholder="Your name"
                    value={leadDraft.name}
                    onChange={(e) =>
                      setLeadDraft({ ...leadDraft, name: e.target.value })
                    }
                    autoComplete="name"
                  />
                  <input
                    className="input-field"
                    type="email"
                    placeholder="Email"
                    value={leadDraft.email}
                    onChange={(e) =>
                      setLeadDraft({ ...leadDraft, email: e.target.value })
                    }
                    autoComplete="email"
                  />
                  <input
                    className="input-field"
                    type="tel"
                    placeholder="Phone (optional)"
                    value={leadDraft.phone}
                    onChange={(e) =>
                      setLeadDraft({ ...leadDraft, phone: e.target.value })
                    }
                    autoComplete="tel"
                  />
                  <select
                    className="input-field appearance-none bg-white/80"
                    value={leadDraft.intent}
                    onChange={(e) =>
                      setLeadDraft({ ...leadDraft, intent: e.target.value })
                    }
                  >
                    <option value="">What can we help with? (optional)</option>
                    {INTENTS.map((i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary mt-5 w-full disabled:opacity-50"
                >
                  Start the conversation
                </button>
                <p className="mt-3 text-[11px] leading-relaxed text-muted">
                  We use this only so the team can follow up. No spam — ever.
                </p>
              </form>
            ) : (
              <>
                <div
                  ref={scroller}
                  className="flex-1 overflow-y-auto px-4 py-4 space-y-3 max-h-[420px] sm:max-h-[480px]"
                >
                  {messages.map((m, i) => (
                    <div
                      key={i}
                      className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                          m.role === "user"
                            ? "bg-oxblood text-ivory rounded-br-md"
                            : "bg-white text-ink ring-1 ring-border rounded-bl-md"
                        }`}
                      >
                        {m.content || (
                          <span className="inline-flex gap-1">
                            <Dot delay={0} />
                            <Dot delay={120} />
                            <Dot delay={240} />
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                  {messages.length <= 1 && (
                    <div className="pt-2">
                      <p className="px-1 text-[11px] uppercase tracking-[0.18em] text-muted">
                        Try asking
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {SERVICES.slice(0, 3).map((s) => (
                          <button
                            key={s.slug}
                            type="button"
                            onClick={() =>
                              setInput(
                                `Tell me about ${s.title.toLowerCase()}.`,
                              )
                            }
                            className="rounded-full bg-white px-3 py-1.5 text-xs text-oxblood ring-1 ring-border hover:bg-oxblood/5"
                          >
                            {s.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="border-t border-border bg-white/60 p-3">
                  <div className="flex items-end gap-2">
                    <textarea
                      ref={inputRef}
                      rows={1}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={onKey}
                      placeholder="Type a message…"
                      className="textarea-field max-h-32 resize-none"
                    />
                    <button
                      type="button"
                      onClick={send}
                      disabled={!input.trim() || sending}
                      aria-label="Send"
                      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-oxblood text-ivory transition hover:bg-oxblood-dark disabled:opacity-40"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <span
      className="inline-block h-1.5 w-1.5 rounded-full bg-muted"
      style={{
        animation: "fadeIn 0.6s ease-in-out infinite alternate",
        animationDelay: `${delay}ms`,
      }}
    />
  );
}
