import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { FIRM, SERVICES } from "@/lib/gassman-data";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-24 bg-oxblood text-ivory">
      <div className="container-prose grid gap-12 py-14 md:grid-cols-3 md:py-20">
        <div>
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-ivory text-oxblood font-heading text-lg shadow-sm"
            >
              G<span className="text-camel mx-0.5">·</span>A
            </span>
            <span className="font-heading text-xl text-ivory tracking-tight">
              Gassman &amp; Associates
            </span>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-ivory/75 max-w-xs">
            A family-owned CPA and consulting firm in Deerfield, Illinois. Three
            generations of practice, serving families and the businesses they
            build.
          </p>
          <p className="mt-6 text-xs uppercase tracking-[0.18em] text-camel-light">
            Established {FIRM.founded}
          </p>
        </div>

        <div>
          <p className="font-heading text-base text-ivory">Services</p>
          <ul className="mt-4 space-y-2.5 text-sm text-ivory/80">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services#${s.slug}`}
                  className="hover:text-camel-light transition"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-heading text-base text-ivory">
            Visit · Call · Write
          </p>
          <address className="mt-4 not-italic text-sm text-ivory/80 leading-relaxed space-y-3">
            <div className="flex items-start gap-3">
              <MapPin size={16} className="mt-0.5 text-camel-light shrink-0" />
              <span>
                {FIRM.address.line1}
                <br />
                {FIRM.address.city}, {FIRM.address.state} {FIRM.address.zip}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-camel-light shrink-0" />
              <a href={FIRM.phoneHref} className="hover:text-camel-light">
                {FIRM.phone}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-camel-light shrink-0" />
              <a
                href={`mailto:${FIRM.email}`}
                className="hover:text-camel-light"
              >
                {FIRM.email}
              </a>
            </div>
          </address>
          <p className="mt-5 text-xs text-ivory/55">{FIRM.hours}</p>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="container-prose flex flex-col gap-3 py-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-ivory/55">
            © {year} {FIRM.legalName}. All rights reserved.
          </p>
          <p className="text-xs text-ivory/45">
            Site by{" "}
            <a
              href="https://inkept.studio"
              className="underline-offset-2 hover:text-camel-light hover:underline"
            >
              Inkept
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
