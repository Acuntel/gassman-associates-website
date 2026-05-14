import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { SERVICES, FIRM } from "@/lib/gassman-data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Income tax filings, multi-state taxation, IRS representation, consulting, planning and forecasting, provided by CPAs, Enrolled Agents, and an attorney on staff in Deerfield, IL.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-ivory">
        <div className="container-prose pt-16 pb-10 sm:pt-20 sm:pb-12 md:pt-24">
          <p className="eyebrow">Services</p>
          <h1 className="h-display mt-3 max-w-3xl text-balance">
            What we do, in plain language.
          </h1>
          <p className="lede mt-5 max-w-2xl text-pretty">
            Five service lines that cover the tax and accounting needs of
            families and the businesses they own, backed by sixty years of
            practice and credentialed staff at every step.
          </p>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="container-prose pb-16 sm:pb-20 md:pb-24">
          <ul className="divide-y divide-border border-y border-border">
            {SERVICES.map((s, i) => (
              <li
                key={s.slug}
                id={s.slug}
                className="scroll-mt-28 py-10 sm:py-14"
              >
                <div className="grid gap-8 md:grid-cols-[auto,1fr] md:gap-12">
                  <p className="font-heading text-3xl sm:text-4xl text-camel-dark">
                    0{i + 1}
                  </p>
                  <div>
                    <h2 className="font-heading text-2xl sm:text-3xl text-ink text-balance">
                      {s.title}
                    </h2>
                    <p className="mt-4 text-lg text-ink/80 leading-relaxed text-pretty">
                      {s.blurb}
                    </p>
                    <p className="mt-4 text-ink/70 leading-relaxed text-pretty">
                      {s.details}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-ivory-warm">
        <div className="container-prose py-16 sm:py-20">
          <div className="grid items-center gap-8 md:grid-cols-[1.4fr,1fr]">
            <div>
              <h2 className="h-section text-balance">
                Not sure which service applies to your situation?
              </h2>
              <p className="mt-4 lede max-w-xl text-pretty">
                Send a short note or call us. We'll point you in the right
                direction, even if that means recommending someone else.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <Link href="/contact" className="btn-primary justify-center">
                Start a conversation
                <ArrowRight size={16} aria-hidden />
              </Link>
              <a href={FIRM.phoneHref} className="btn-ghost justify-center">
                <Phone size={15} aria-hidden /> {FIRM.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
