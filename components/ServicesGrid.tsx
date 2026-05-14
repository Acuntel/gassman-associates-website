import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/lib/gassman-data";

export default function ServicesGrid({
  compact = false,
}: {
  compact?: boolean;
}) {
  const items = compact ? SERVICES.slice(0, 4) : SERVICES;
  return (
    <section className="bg-ivory">
      <div className="container-prose py-16 sm:py-20 md:py-24">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="eyebrow">What we do</p>
            <h2 className="h-section mt-3 text-balance">
              Tax and accounting expertise — start to finish.
            </h2>
          </div>
          {compact && (
            <Link
              href="/services"
              className="link-underline text-sm font-medium"
            >
              View all services →
            </Link>
          )}
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((s) => (
            <Link
              key={s.slug}
              href={`/services#${s.slug}`}
              className="card card-lift group flex flex-col"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="font-heading text-xl text-ink leading-tight">
                  {s.title}
                </p>
                <ArrowUpRight
                  size={18}
                  className="mt-1 shrink-0 text-camel transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink/75">
                {s.blurb}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
