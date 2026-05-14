import Hero from "@/components/Hero";
import Differentiators from "@/components/Differentiators";
import ServicesGrid from "@/components/ServicesGrid";
import TeamPreview from "@/components/TeamPreview";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTABanner from "@/components/CTABanner";

export default function Home() {
  return (
    <>
      <Hero />
      <Differentiators />
      <ServicesGrid compact />
      <Testimonials />
      <TeamPreview />
      <FAQ />
      <CTABanner />
    </>
  );
}
