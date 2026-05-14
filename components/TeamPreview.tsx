import Link from "next/link";
import { TEAM } from "@/lib/gassman-data";

export default function TeamPreview() {
  return (
    <section className="bg-ivory">
      <div className="container-prose py-16 sm:py-20 md:py-24">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="eyebrow">The team</p>
            <h2 className="h-section mt-3 text-balance">
              A small firm of credentialed professionals you'll actually know by
              name.
            </h2>
          </div>
          <Link href="/team" className="link-underline text-sm font-medium">
            Meet everyone →
          </Link>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.slice(0, 6).map((t) => (
            <li key={t.slug} className="card card-lift flex items-center gap-4">
              <Initials name={t.name} />
              <div className="min-w-0">
                <p className="font-heading text-lg text-ink leading-tight truncate">
                  {t.name}
                </p>
                <p className="text-xs uppercase tracking-[0.16em] text-muted mt-1">
                  {t.title}
                </p>
                <p className="text-[12px] text-camel-dark mt-1 truncate">
                  {t.credentials}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Initials({ name }: { name: string }) {
  const parts = name.split(" ");
  const i = `${parts[0]?.[0] || ""}${parts[parts.length - 1]?.[0] || ""}`;
  return (
    <span
      aria-hidden
      className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-oxblood text-ivory font-heading text-sm tracking-wide ring-1 ring-camel/30"
    >
      {i}
    </span>
  );
}
