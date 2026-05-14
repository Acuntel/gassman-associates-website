"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { FIRM } from "@/lib/gassman-data";

const links = [
  { href: "/services", label: "Services" },
  { href: "/team", label: "Team" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-ivory/85 backdrop-blur-md shadow-[0_1px_0_rgba(229,221,204,0.8)]"
          : "bg-ivory/60 backdrop-blur-sm"
      }`}
    >
      <div className="container-prose flex h-[68px] sm:h-[80px] items-center justify-between">
        <Link
          href="/"
          aria-label={FIRM.name}
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <Monogram />
          <span className="flex flex-col leading-tight">
            <span className="font-heading text-[17px] sm:text-lg text-oxblood tracking-tight">
              Gassman <span className="text-camel-dark">&amp;</span> Associates
            </span>
            <span className="hidden sm:block text-[11px] uppercase tracking-[0.18em] text-muted">
              CPAs · Deerfield, IL
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ink/80 hover:text-oxblood transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <a
            href={FIRM.phoneHref}
            className="hidden lg:inline-flex items-center gap-2 text-sm font-semibold text-oxblood"
          >
            <Phone size={15} aria-hidden /> {FIRM.phone}
          </a>
          <Link href="/contact" className="btn-primary !py-2.5 !text-[13px]">
            Schedule a consultation
          </Link>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center rounded-full border border-border bg-white/70 p-2.5 text-oxblood transition hover:bg-white"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-ivory/95 backdrop-blur-md">
          <div className="container-prose flex flex-col gap-1 py-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-ink hover:bg-oxblood/5 hover:text-oxblood"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={FIRM.phoneHref}
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full border border-oxblood/30 px-4 py-3 text-sm font-semibold text-oxblood"
            >
              <Phone size={16} aria-hidden /> {FIRM.phone}
            </a>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 btn-primary w-full"
            >
              Schedule a consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function Monogram() {
  return (
    <span
      aria-hidden
      className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-oxblood text-ivory font-heading text-[15px] sm:text-base tracking-tight shadow-sm"
    >
      G<span className="text-camel-light/90 -mx-0.5">·</span>A
    </span>
  );
}
