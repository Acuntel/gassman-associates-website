// Single source of truth for firm content. Homepage + chatbot read from here.

export const FIRM = {
  legalName: "B. Robert Gassman and Associates",
  name: "Gassman & Associates",
  short: "Gassman",
  tagline: "Specialized tax expertise for you, your family, and your business.",
  mission:
    "Provide tax and accounting expertise in a personal, professional, and welcoming environment.",
  vision:
    "Help families and their businesses achieve goals for all generations.",
  founded: 1965,
  deerfieldSince: 1980,
  address: {
    line1: "711 Orchard Street, Suite 3",
    city: "Deerfield",
    state: "IL",
    zip: "60015",
  },
  phone: "847-945-7472",
  phoneHref: "tel:+18479457472",
  fax: "847-945-8357",
  email: "info@gassmancpa.com",
  hours: "Mon–Fri, 9:00 AM – 5:00 PM (extended hours during tax season)",
} as const;

export const STATS: { value: string; label: string }[] = [
  { value: "60+", label: "Years in practice" },
  { value: "3", label: "Generations of family" },
  { value: "CPAs + EAs", label: "Credentialed staff" },
  { value: "JD", label: "Attorney on staff" },
];

export const SERVICES: {
  slug: string;
  title: string;
  blurb: string;
  details: string;
}[] = [
  {
    slug: "tax-filings",
    title: "Income Tax Filings",
    blurb:
      "Personal, family, and business returns prepared with the attention to detail that comes from sixty years of practice.",
    details:
      "Federal and state tax preparation for individuals, families, partnerships, S-corporations, C-corporations, trusts, and estates. We file returns in every state and structure your filings to minimize liability across jurisdictions.",
  },
  {
    slug: "consulting-planning",
    title: "Consulting, Planning & Structuring",
    blurb:
      "Year-round tax strategy and entity structuring for families and the businesses they own.",
    details:
      "Entity selection (LLC, S-corp, C-corp, partnership), succession and estate planning, retirement contribution strategy, charitable giving structures, and ongoing tax planning sessions outside of filing season.",
  },
  {
    slug: "irs-representation",
    title: "IRS Tax Representation",
    blurb:
      "When the IRS or a state agency comes calling, our Enrolled Agents and attorney handle it directly on your behalf.",
    details:
      "Audit representation, appeals, payment plan negotiation, offer in compromise, lien and levy resolution, and back-tax filings. Our Enrolled Agents are federally licensed to represent you in any IRS proceeding.",
  },
  {
    slug: "multi-state",
    title: "Multi-State Taxation",
    blurb:
      "For clients with income, property, or business activity across state lines, we coordinate the full filing picture.",
    details:
      "Nexus analysis, allocation and apportionment, residency planning, multi-state withholding, and reconciliation of state-by-state obligations for business owners, executives, and high-net-worth families.",
  },
  {
    slug: "projections",
    title: "Projections & Forecasting",
    blurb:
      "Forward-looking projections so you know your tax position before year-end, not after.",
    details:
      "Quarterly estimated payment calculations, cash-flow modeling for business owners, scenario planning for major transactions (sale of a business, real-estate disposition, large bonus), and Roth conversion analysis.",
  },
];

export const DIFFERENTIATORS = [
  "Established in 1965 — three generations of practice",
  "IRS Enrolled Agents on staff",
  "Certified Public Accountants on staff",
  "Attorney on staff for legal-adjacent tax matters",
  "Family-owned, relationship-first culture",
];

export type TeamMember = {
  slug: string;
  name: string;
  title: string;
  credentials: string;
  email: string;
  bio: string;
};

export const TEAM: TeamMember[] = [
  {
    slug: "lynn-gassman",
    name: "Lynn Gassman",
    title: "Founder",
    credentials: "Co-founder",
    email: "lynn@gassmancpa.com",
    bio: "Lynn built the firm alongside her husband Bob, the late founder. She remains the steward of the firm's culture — its administrator, its advocate, and the keeper of the relationships that have spanned generations of client families.",
  },
  {
    slug: "michael-collins",
    name: "Michael Collins",
    title: "Certified Public Accountant",
    credentials: "CPA · Illinois CPA Society · AICPA",
    email: "mike@gassmancpa.com",
    bio: "Mike joined the firm in 2001 after a career in hotel management in Las Vegas, earning his CPA in 2005. He grew up in Reno, holds a BS in Hotel Management from UNLV, and continued his education at DePaul and UIC. He lives in Deerfield with his wife Brooke and sons Justin and Tyler.",
  },
  {
    slug: "lauren-freedman",
    name: "Lauren Freedman",
    title: "Enrolled Agent",
    credentials: "EA (2011) · University of Illinois",
    email: "lauren@gassmancpa.com",
    bio: "Lauren has worked at Gassman & Associates since she was old enough to type. She graduated from the University of Illinois in 2002, continued her accounting education at UIC, and earned her IRS Enrolled Agent credentials in 2011. She lives in Deerfield with her husband Michael and children Ben and Lily.",
  },
  {
    slug: "jacqueline-arrigo",
    name: "Jacqueline Arrigo",
    title: "Enrolled Agent",
    credentials: "EA (2023) · University of Minnesota",
    email: "jacqueline@gassmancpa.com",
    bio: "Jacqueline graduated from the University of Minnesota with a BS in Kinesiology and a minor in Music. After careers as a piano teacher and freelance bookkeeper, she joined the firm in 2018 and earned her IRS Enrolled Agent credentials in December 2023. She lives in Chicago with her husband August, daughters Alivia and Alexandra, and their dog Bella.",
  },
  {
    slug: "bary-gassman",
    name: "Bary Gassman",
    title: "Associate",
    credentials: "JD · Bachelor's in Accounting (Indiana, 1992)",
    email: "bary@gassmancpa.com",
    bio: "Bary holds a Bachelor's in Accounting from Indiana University (1992) and a Juris Doctor from UIC John Marshall Law School (1996). He has built a career in civil and commercial litigation, resolving hundreds of disputes, and currently operates his own Chicago law firm. He joined Gassman & Associates in 2022 to balance tax practice with his legal work.",
  },
  {
    slug: "linn-mann",
    name: "Linn Mann",
    title: "Assistant",
    credentials: "Operations",
    email: "linn@gassmancpa.com",
    bio: "Linn is the steady hand behind the firm's day-to-day. She keeps the calendar moving, the clients welcomed, and — particularly during tax season — every file in its right place. She is integral to both the family and the business.",
  },
];

export const TESTIMONIALS: { quote: string; attribution: string }[] = [
  {
    quote:
      "They have been my business and personal accountants for over 10 years. Always extremely professional and efficient, taking time to help me understand details. They are a great business partner.",
    attribution: "Small business owner, Deerfield",
  },
];

export const FAQS: { q: string; a: string }[] = [
  {
    q: "Do I need to be local to Deerfield to work with you?",
    a: "No. We serve clients across Illinois and in every state. Most of our client communication happens by phone, email, and secure document exchange. We are happy to meet in person at our Deerfield office when it makes sense.",
  },
  {
    q: "What does it cost to file a return with you?",
    a: "Fees vary based on the complexity of the return — number of states, business entities, schedules, and the work required outside of filing season. We will give you a straight-forward estimate after a brief conversation about your situation.",
  },
  {
    q: "Do you handle business returns as well as personal?",
    a: "Yes. We file for individuals, families, partnerships, S-corporations, C-corporations, trusts, and estates — and we coordinate the personal and business filings together so nothing falls through the cracks.",
  },
  {
    q: "Can you represent me if the IRS audits me?",
    a: "Yes. Our Enrolled Agents are federally licensed to represent taxpayers before the IRS in audits, appeals, and collections, and our on-staff attorney handles matters that move beyond the standard IRS process.",
  },
  {
    q: "How do I get started?",
    a: "Call us at 847-945-7472 or send a note through the contact form. We will set up a short call to understand your situation and walk you through next steps. There is no charge for the initial conversation.",
  },
];
