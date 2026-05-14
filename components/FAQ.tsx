"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { FAQS } from "@/lib/gassman-data";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-ivory-warm">
      <div className="container-prose py-16 sm:py-20 md:py-24">
        <div className="grid gap-10 md:grid-cols-[1fr,1.6fr] md:gap-16">
          <div>
            <p className="eyebrow">Frequently asked</p>
            <h2 className="h-section mt-3 text-balance">
              Good questions get a straight answer.
            </h2>
            <p className="mt-5 text-ink/75 leading-relaxed max-w-sm">
              Not sure if we're the right fit? Chat with our assistant at the
              bottom of the page, or send a note through the contact form and
              we'll get back to you within one business day.
            </p>
          </div>
          <ul className="divide-y divide-border border-y border-border">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="font-heading text-lg text-ink pr-2">
                      {f.q}
                    </span>
                    <span className="shrink-0 rounded-full border border-oxblood/30 p-1.5 text-oxblood">
                      {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                    </span>
                  </button>
                  <div
                    className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-6 pr-10 text-ink/80 leading-relaxed">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
