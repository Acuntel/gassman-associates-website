"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

const INTENTS = [
  "Tax preparation (individual)",
  "Tax preparation (business)",
  "Tax planning / strategy",
  "IRS representation",
  "Multi-state taxation",
  "Estate or trust",
  "General question",
];

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    intent: "",
    message: "",
    honeypot: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">(
    "idle",
  );
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Name, email, and a short message are required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email.");
      return;
    }
    setStatus("sending");
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!r.ok) {
        const j = await r.json().catch(() => ({}));
        setError(j.error || "Something went wrong. Please try again.");
        setStatus("err");
        return;
      }
      setStatus("ok");
      setForm({
        name: "",
        email: "",
        phone: "",
        intent: "",
        message: "",
        honeypot: "",
      });
    } catch {
      setStatus("err");
      setError("Network error. Please try again or call us.");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-xl border border-camel/40 bg-white p-7">
        <p className="font-heading text-2xl text-oxblood">Note received.</p>
        <p className="mt-3 text-ink/80 leading-relaxed">
          Thanks for reaching out. Someone from the firm will reply within one
          business day. If it's urgent, please call us directly at{" "}
          <a href="tel:+18479457472" className="link-underline">
            847-945-7472
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <input
        type="text"
        name="company"
        autoComplete="off"
        tabIndex={-1}
        value={form.honeypot}
        onChange={(e) => setForm({ ...form, honeypot: e.target.value })}
        className="hidden"
        aria-hidden
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Name *"
          name="name"
          autoComplete="name"
          value={form.name}
          onChange={(v) => setForm({ ...form, name: v })}
        />
        <Field
          label="Email *"
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={(v) => setForm({ ...form, email: v })}
        />
        <Field
          label="Phone (optional)"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={form.phone}
          onChange={(v) => setForm({ ...form, phone: v })}
        />
        <div>
          <label className="block text-[11px] uppercase tracking-[0.16em] text-muted mb-1.5">
            How can we help?
          </label>
          <select
            value={form.intent}
            onChange={(e) => setForm({ ...form, intent: e.target.value })}
            className="input-field appearance-none bg-white"
          >
            <option value="">Select an option (optional)</option>
            {INTENTS.map((i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-[11px] uppercase tracking-[0.16em] text-muted mb-1.5">
          Message *
        </label>
        <textarea
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="A sentence or two about your situation is plenty."
          className="textarea-field"
        />
      </div>

      {error && (
        <p className="rounded-lg bg-oxblood/10 px-4 py-3 text-sm text-oxblood">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-primary w-full sm:w-auto disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send the note"}
        <ArrowRight size={16} aria-hidden />
      </button>

      <p className="text-[11px] leading-relaxed text-muted">
        Your details are sent only to the firm. No marketing lists. Not stored
        on this site.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
}) {
  return (
    <div>
      <label className="block text-[11px] uppercase tracking-[0.16em] text-muted mb-1.5">
        {label}
      </label>
      <input
        type={type}
        name={name}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-field"
      />
    </div>
  );
}
