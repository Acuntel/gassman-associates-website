import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { TEAM } from "@/lib/gassman-data";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the CPAs, IRS Enrolled Agents, attorney, and staff at Gassman & Associates — a family-owned firm in Deerfield, Illinois.",
};

export default function TeamPage() {
  return (
    <>
      <section className="bg-ivory">
        <div className="container-prose pt-16 pb-10 sm:pt-20 sm:pb-12 md:pt-24">
          <p className="eyebrow">The team</p>
          <h1 className="h-display mt-3 max-w-3xl text-balance">
            Six people. Sixty years. One firm.
          </h1>
          <p className="lede mt-5 max-w-2xl text-pretty">
            A small practice on purpose. When you call, you reach a person you
            know — not a queue.
          </p>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="container-prose pb-16 sm:pb-20 md:pb-24">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((t) => (
              <li key={t.slug} className="card card-lift flex h-full flex-col">
                <div className="flex items-center gap-4">
                  <Initials name={t.name} />
                  <div className="min-w-0">
                    <p className="font-heading text-xl text-ink leading-tight">
                      {t.name}
                    </p>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-muted mt-1">
                      {t.title}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-[12px] text-camel-dark font-medium">
                  {t.credentials}
                </p>
                <p className="mt-3 text-sm text-ink/75 leading-relaxed flex-1">
                  {t.bio}
                </p>
                <a
                  href={`mailto:${t.email}`}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-oxblood hover:text-oxblood-dark"
                >
                  <Mail size={14} aria-hidden />
                  {t.email}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function Initials({ name }: { name: string }) {
  const parts = name.split(" ");
  const i = `${parts[0]?.[0] || ""}${parts[parts.length - 1]?.[0] || ""}`;
  return (
    <span
      aria-hidden
      className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-oxblood text-ivory font-heading text-base tracking-wide ring-1 ring-camel/30"
    >
      {i}
    </span>
  );
}
