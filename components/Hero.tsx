"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, ArrowRight } from "lucide-react";
import { FIRM, STATS } from "@/lib/gassman-data";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ivory">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 12%, rgba(181,138,90,0.16), transparent 38%), radial-gradient(circle at 84% 88%, rgba(92,31,35,0.12), transparent 42%)",
        }}
      />
      <div className="container-prose relative grid items-center gap-12 py-16 sm:py-20 md:grid-cols-[1.15fr,1fr] md:py-28 lg:gap-16 lg:py-32">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="eyebrow"
          >
            Deerfield, Illinois · Est. {FIRM.founded}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="h-display mt-4 text-balance"
          >
            Specialized tax expertise for you,{" "}
            <span className="text-oxblood">your family,</span> and your
            business.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="lede mt-6 max-w-xl text-pretty"
          >
            A family-owned CPA firm in Deerfield, Illinois. Three generations of
            practice, IRS Enrolled Agents, certified public accountants, and an
            attorney on staff. We prepare returns, plan ahead, and stand between
            you and the IRS when it matters.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link href="/contact" className="btn-primary">
              Schedule a consultation
              <ArrowRight size={16} aria-hidden />
            </Link>
            <a href={FIRM.phoneHref} className="btn-ghost">
              <Phone size={15} aria-hidden /> {FIRM.phone}
            </a>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.26 }}
            className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 sm:max-w-md sm:grid-cols-4 sm:gap-y-0"
          >
            {STATS.map((s) => (
              <div
                key={s.label}
                className="border-t border-camel/40 pt-4 first:border-l-0 sm:pl-4 sm:first:pl-0"
              >
                <dt className="text-[11px] uppercase tracking-[0.16em] text-muted">
                  {s.label}
                </dt>
                <dd className="mt-1 font-heading text-2xl text-oxblood">
                  {s.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative"
        >
          <Plate />
        </motion.div>
      </div>
    </section>
  );
}

function Plate() {
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[420px]">
      <div
        aria-hidden
        className="absolute inset-0 -translate-x-3 translate-y-3 rounded-[18px] border border-camel/50"
      />
      <div className="relative h-full w-full overflow-hidden rounded-[18px] bg-gradient-to-br from-oxblood via-oxblood-dark to-oxblood text-ivory shadow-xl">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.55) 1px, transparent 1px)",
            backgroundSize: "4px 4px",
          }}
        />
        <div className="relative flex h-full flex-col justify-between p-7 sm:p-9">
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-camel-light">
              Established 1965
            </p>
            <p className="mt-3 font-heading text-3xl sm:text-4xl leading-tight">
              Gassman
              <span className="block text-camel">&amp; Associates</span>
            </p>
            <p className="mt-3 text-sm text-ivory/75 max-w-[260px]">
              CPAs · Enrolled Agents · Attorney on staff. Deerfield, Illinois.
            </p>
          </div>

          <div className="space-y-3 border-t border-camel/40 pt-5 text-sm">
            <Row label="Practice" value="Tax · Planning · Representation" />
            <Row label="Clients" value="Families & their businesses" />
            <Row label="Generations" value="Three" />
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="absolute -bottom-3 -right-3 hidden h-20 w-20 rounded-full border-2 border-camel/70 bg-ivory/80 backdrop-blur-sm sm:flex items-center justify-center"
      >
        <span className="font-heading text-oxblood text-sm leading-none text-center">
          60+
          <br />
          <span className="text-[10px] uppercase tracking-[0.16em] text-muted">
            Years
          </span>
        </span>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="text-[11px] uppercase tracking-[0.16em] text-camel-light">
        {label}
      </span>
      <span className="text-right text-ivory/95">{value}</span>
    </div>
  );
}
