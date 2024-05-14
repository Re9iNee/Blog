import { Metadata } from "next";

import HeroSection from "@/components/about-us/hero-section/hero-section";
import HowSection from "@/components/about-us/how-section/how-section";
import TeamSection from "@/components/about-us/team-section/team-section";

export const metadata: Metadata = {
  title: "About us",
};

export default function AboutUsPage() {
  return (
    <section className='overflow-hidden'>
      <HeroSection />
      <HowSection className='mb-24 mx-4' />
      <TeamSection
        className='mx-4 pb-12 mb-4
        sm:pb-16'
      />
    </section>
  );
}
