import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { FIRM } from "@/lib/gassman-data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://gassmancpa.com",
  ),
  title: {
    default: `${FIRM.name} — CPAs in Deerfield, IL`,
    template: `%s · ${FIRM.name}`,
  },
  description: FIRM.tagline,
  keywords: [
    "Gassman & Associates",
    "Deerfield CPA",
    "Illinois tax preparation",
    "IRS representation",
    "Enrolled Agent",
    "multi-state taxation",
    "tax planning",
    "small business accountant",
  ],
  openGraph: {
    title: `${FIRM.name} — CPAs in Deerfield, IL`,
    description: FIRM.tagline,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${FIRM.name} — CPAs in Deerfield, IL`,
    description: FIRM.tagline,
  },
  icons: { icon: "/favicon.svg" },
  robots: { index: true, follow: true },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#5C1F23",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  name: FIRM.name,
  alternateName: FIRM.legalName,
  description: FIRM.tagline,
  foundingDate: String(FIRM.founded),
  telephone: FIRM.phone,
  faxNumber: FIRM.fax,
  email: FIRM.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: FIRM.address.line1,
    addressLocality: FIRM.address.city,
    addressRegion: FIRM.address.state,
    postalCode: FIRM.address.zip,
    addressCountry: "US",
  },
  areaServed: "United States",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-ivory text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Nav />
        <main className="pt-[68px] sm:pt-[80px]">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
