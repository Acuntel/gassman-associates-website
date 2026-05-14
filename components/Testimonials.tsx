import { TESTIMONIALS } from "@/lib/gassman-data";

export default function Testimonials() {
  const t = TESTIMONIALS[0];
  if (!t) return null;
  return (
    <section className="bg-oxblood text-ivory">
      <div className="container-prose py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] uppercase tracking-[0.24em] text-camel-light">
            In their words
          </p>
          <blockquote className="mt-6 font-heading text-2xl sm:text-3xl md:text-[34px] leading-snug text-balance">
            <span className="text-camel-light text-4xl leading-none">“</span>
            {t.quote}
            <span className="text-camel-light text-4xl leading-none">”</span>
          </blockquote>
          <p className="mt-6 text-sm uppercase tracking-[0.2em] text-camel-light">
            {t.attribution}
          </p>
        </div>
      </div>
    </section>
  );
}
