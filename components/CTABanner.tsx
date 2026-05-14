import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { FIRM } from "@/lib/gassman-data";

export default function CTABanner() {
  return (
    <section className="bg-ivory">
      <div className="container-prose py-16 sm:py-20 md:py-24">
        <div className="relative overflow-hidden rounded-2xl border border-camel/40 bg-gradient-to-br from-ivory-warm to-white p-8 sm:p-12 md:p-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-camel/15 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-oxblood/10 blur-3xl"
          />
          <div className="relative grid items-center gap-8 md:grid-cols-[1.4fr,1fr]">
            <div>
              <p className="eyebrow">Ready when you are</p>
              <h2 className="h-section mt-3 text-balance">
                Schedule a short call. No charge for the first conversation.
              </h2>
              <p className="mt-4 text-ink/75 leading-relaxed max-w-xl">
                Tell us a little about your situation and we'll walk you through
                what working with the firm looks like — fees, process,
                expectations.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center md:flex-col md:items-stretch">
              <Link href="/contact" className="btn-primary justify-center">
                Send us a note
                <ArrowRight size={16} aria-hidden />
              </Link>
              <a href={FIRM.phoneHref} className="btn-ghost justify-center">
                <Phone size={15} aria-hidden /> {FIRM.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
