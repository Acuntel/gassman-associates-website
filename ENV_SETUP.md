# Environment Variables

Copy the block below into `.env.local` at the project root and fill in real values. `.env.local` is gitignored — never commit secrets.

```bash
# --- Anthropic (chatbot) ---
ANTHROPIC_API_KEY=sk-ant-...
ANTHROPIC_MODEL=claude-sonnet-4-5-20250929

# --- Resend (lead notification + contact form emails) ---
RESEND_API_KEY=re_...
# Inbox the firm receives leads at:
LEAD_TO_EMAIL=info@gassmancpa.com
# Verified Resend sender. Must be from a domain verified in Resend.
# Until a custom domain is verified, use the default onboarding sender:
LEAD_FROM_EMAIL=Gassman & Associates Website <onboarding@resend.dev>

# --- Site ---
NEXT_PUBLIC_SITE_URL=https://gassmancpa.com
```

## One-time setup checklist

1. **Anthropic key** — reuse the existing `bschwartz1725@gmail.com` Anthropic account or create a new key at <https://console.anthropic.com>. Paste as `ANTHROPIC_API_KEY`.
2. **Resend** — create an API key at <https://resend.com/api-keys>. To send from a custom Gassman address, verify the `gassmancpa.com` domain in Resend → Domains, then switch `LEAD_FROM_EMAIL` to e.g. `Gassman & Associates <noreply@gassmancpa.com>`.
3. **Vercel** — under Project → Settings → Environment Variables, paste each variable for all three environments (Production, Preview, Development).
4. **Local dev** — copy the block above into `.env.local`.

## Dev-mode behavior without API keys

- If `ANTHROPIC_API_KEY` is missing, the `/api/chat` route returns a 500 explaining that chat is not configured.
- If `RESEND_API_KEY` is missing, both the chat-lead and contact endpoints log payloads to the server console and return `{ success: true, dev: true }` — useful for local testing without sending real email.

## Lead destination

Lead and contact emails are sent to whatever you set in `LEAD_TO_EMAIL`. Defaults to `info@gassmancpa.com` if the var is missing.
