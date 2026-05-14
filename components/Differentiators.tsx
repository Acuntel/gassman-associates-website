import { DIFFERENTIATORS, FIRM } from "@/lib/gassman-data";

export default function Differentiators() {
  return (
    <section className="bg-ivory-warm">
      <div className="container-prose py-16 sm:py-20 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1fr,1.4fr] md:gap-16">
          <div>
            <p className="eyebrow">Why families choose Gassman</p>
            <h2 className="h-section mt-3 text-balance">
              Three generations, one practice.
            </h2>
            <p className="mt-5 lede max-w-md text-pretty">
              {FIRM.short} has been preparing tax returns and standing alongside
              clients since {FIRM.founded}. The work is technical. The
              relationships are not.
            </p>
          </div>
          <ul className="space-y-4">
            {DIFFERENTIATORS.map((d, i) => (
              <li
                key={d}
                className="flex items-start gap-4 rounded-xl border border-border bg-white/60 p-5"
              >
                <span className="font-heading text-camel-dark text-lg w-7 shrink-0">
                  0{i + 1}
                </span>
                <p className="text-ink/85 leading-relaxed">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
