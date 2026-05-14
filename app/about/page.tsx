import type { Metadata } from "next";
import { FIRM } from "@/lib/gassman-data";

export const metadata: Metadata = {
  title: "About the Firm",
  description:
    "A family-owned CPA and consulting firm in Deerfield, Illinois since 1980, founded by Bob Gassman in 1965 — now in its third generation of practice.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-ivory">
        <div className="container-narrow pt-16 sm:pt-20 md:pt-24">
          <p className="eyebrow">About the firm</p>
          <h1 className="h-display mt-3 text-balance">
            Founded in 1965. Family-owned ever since.
          </h1>
        </div>
      </section>

      <article className="bg-ivory">
        <div className="container-narrow pb-12 sm:pb-16">
          <div className="mt-10 space-y-6 text-lg leading-relaxed text-ink/85 text-pretty">
            <p>
              Bob Gassman started the firm in 1965 after returning from duty
              with the US Navy and graduating from Roosevelt University. The
              practice grew with the help of his wife Lynn, their daughter
              Lauren, and son-in-law Mike — three generations who built the firm
              one client conversation at a time.
            </p>
            <p>
              Since 1980, we've operated from Deerfield, Illinois. We file
              returns in every state. We sit across the table from the IRS on
              behalf of our clients. And we've watched families grow up,
              businesses change hands, and grandchildren show up to drop off
              their first 1040.
            </p>
            <p>
              The work is technical — federal and state tax codes, multi-state
              filing rules, IRS procedure, entity structure. The job is to make
              it feel less so. Our team includes Certified Public Accountants,
              IRS Enrolled Agents, and an attorney, so the credentials are
              covered. What you'll notice instead is that we know your kids'
              names.
            </p>
          </div>

          <div className="mt-12 grid gap-6 rounded-xl border border-border bg-ivory-warm p-6 sm:grid-cols-2 sm:p-8">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-camel-dark">
                Mission
              </p>
              <p className="mt-2 font-heading text-xl text-ink leading-snug">
                {FIRM.mission}
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-camel-dark">
                Vision
              </p>
              <p className="mt-2 font-heading text-xl text-ink leading-snug">
                {FIRM.vision}
              </p>
            </div>
          </div>
        </div>
      </article>

      <section className="bg-ivory-warm">
        <div className="container-narrow py-14 sm:py-20">
          <p className="eyebrow">Timeline</p>
          <ol className="mt-6 space-y-6 border-l border-camel/40 pl-6">
            {[
              {
                year: "1965",
                event:
                  "Bob Gassman founds the firm after Navy service and Roosevelt University.",
              },
              {
                year: "1980",
                event:
                  "The practice settles permanently in Deerfield, Illinois.",
              },
              {
                year: "2001",
                event: "Mike Collins joins the firm and earns his CPA in 2005.",
              },
              {
                year: "2011",
                event:
                  "Lauren Freedman earns her IRS Enrolled Agent credentials.",
              },
              {
                year: "2022",
                event:
                  "Bary Gassman joins as an associate, bringing legal practice in-house.",
              },
              {
                year: "Today",
                event:
                  "Three generations of family, six credentialed professionals, and clients we've known for decades.",
              },
            ].map((m, i) => (
              <li key={i} className="relative">
                <span
                  aria-hidden
                  className="absolute -left-[33px] mt-1.5 inline-block h-2.5 w-2.5 rounded-full bg-camel ring-4 ring-ivory-warm"
                />
                <p className="font-heading text-lg text-oxblood">{m.year}</p>
                <p className="mt-1 text-ink/80 leading-relaxed">{m.event}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
