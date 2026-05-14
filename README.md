# Gassman & Associates: Website

Production website for **B. Robert Gassman and Associates**, a family-owned CPA firm in Deerfield, IL.

- **Stack:** Next.js 14 (App Router) · TypeScript · Tailwind · framer-motion · @anthropic-ai/sdk · Resend
- **Hosting:** Vercel
- **Domain (target):** gassmancpa.com

## Run locally

```bash
npm install
cp .env.local.example .env.local   # see ENV_SETUP.md for full vars
npm run dev
```

Open <http://localhost:3000>.

## Scripts

| Command             | Purpose                      |
| ------------------- | ---------------------------- |
| `npm run dev`       | Dev server (hot reload)      |
| `npm run build`     | Production build             |
| `npm run start`     | Run production build locally |
| `npm run typecheck` | `tsc --noEmit` type check    |
| `npm run lint`      | Next.js ESLint               |

## Single source of truth

All firm content (name, team, services, hours, address, FAQs) lives in `lib/gassman-data.ts`. Edit there, the homepage, chatbot, footer, and sitemap all read from it.

## AI chatbot

A floating chat widget (bottom-right) streams from Anthropic Claude. System prompt is generated in `lib/chatbot-system-prompt.ts` from the same `gassman-data.ts` content.

When a visitor opens the chat:

1. They submit a short lead form (name + email, optional phone + intent).
2. A "new lead" email is sent to the firm.
3. The chat runs with that context.
4. When the page is closed/unloaded, the full transcript is sent via `navigator.sendBeacon` to `/api/chat/lead`, which uses Claude to produce a 2-3 sentence summary and emails it to the firm via Resend.

## Contact form

`/contact` form posts to `/api/contact` → Resend → firm inbox. Honeypot + IP rate-limit included.

## Env vars

See `ENV_SETUP.md`.
