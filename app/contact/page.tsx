import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, Printer } from "lucide-react";
import ContactForm from "./ContactForm";
import { FIRM } from "@/lib/gassman-data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach Gassman & Associates in Deerfield, IL, phone, email, address, and direct contact form. No charge for the first conversation.",
};

export default function ContactPage() {
  const mapsQuery = encodeURIComponent(
    `${FIRM.address.line1}, ${FIRM.address.city}, ${FIRM.address.state} ${FIRM.address.zip}`,
  );
  return (
    <>
      <section className="bg-ivory">
        <div className="container-prose pt-16 pb-10 sm:pt-20 sm:pb-12 md:pt-24">
          <p className="eyebrow">Contact</p>
          <h1 className="h-display mt-3 max-w-3xl text-balance">
            Send a note. Call the office. Stop by.
          </h1>
          <p className="lede mt-5 max-w-2xl text-pretty">
            We respond to every inquiry, usually the same day, never longer
            than one business day. There's no charge for the first conversation.
          </p>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="container-prose pb-20 md:pb-24">
          <div className="grid gap-10 md:grid-cols-[1fr,1.2fr] md:gap-14">
            <aside className="space-y-5">
              <Info
                icon={<Phone size={18} />}
                label="Phone"
                value={FIRM.phone}
                href={FIRM.phoneHref}
              />
              <Info icon={<Printer size={18} />} label="Fax" value={FIRM.fax} />
              <Info
                icon={<Mail size={18} />}
                label="Email"
                value={FIRM.email}
                href={`mailto:${FIRM.email}`}
              />
              <Info
                icon={<MapPin size={18} />}
                label="Office"
                value={`${FIRM.address.line1}\n${FIRM.address.city}, ${FIRM.address.state} ${FIRM.address.zip}`}
                href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
              />
              <Info
                icon={<Clock size={18} />}
                label="Hours"
                value={FIRM.hours}
              />

              <div className="overflow-hidden rounded-xl border border-border">
                <iframe
                  title="Map to Gassman & Associates"
                  src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block h-64 w-full"
                />
              </div>
            </aside>

            <div className="rounded-2xl border border-border bg-white/70 p-5 sm:p-8">
              <h2 className="font-heading text-2xl text-ink">Send us a note</h2>
              <p className="mt-2 text-sm text-ink/70 leading-relaxed">
                Tell us a little about your situation. We'll reply with next
                steps.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Info({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-3 rounded-xl border border-border bg-white/60 p-4 transition hover:bg-white">
      <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-oxblood/10 text-oxblood">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
          {label}
        </p>
        <p className="mt-0.5 whitespace-pre-line text-ink leading-relaxed">
          {value}
        </p>
      </div>
    </div>
  );
  return href ? (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
    >
      {content}
    </a>
  ) : (
    content
  );
}
