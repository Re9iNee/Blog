import { Metadata } from "next";

import HeroSection from "@/components/about-us/hero-section/hero-section";
import HowSection from "@/components/about-us/how-section/how-section";
import TeamSection from "@/components/about-us/team-section/team-section";

export const metadata: Metadata = {
  title: "About us",
  openGraph: {
    siteName: "Mora Blog",
    title: "About us | Mora Blog",
    url: `https://www.mora-ed.com/about-us`,
    description:
      "Meet the MORA team and learn more about our mission and values.",
    images: [
      "https://d1ntfq67otjmwh.cloudfront.net/mora-blog-files/1720898315006-about-us@2x.jpg",
    ],
  },
  twitter: {
    card: "summary",
    title: "About us | Mora Blog",
    description:
      "Meet the MORA team and learn more about our mission and values.",
    images: [
      "https://d1ntfq67otjmwh.cloudfront.net/mora-blog-files/1720898315006-about-us@2x.jpg",
    ],
  },
};

export default function AboutUsPage() {
  return (
    <section className='overflow-hidden'>
      <HeroSection />
      <HowSection className='mb-24 mx-4 md:pb-32' />
      <TeamSection
        className='mx-4 pb-12 mb-4
        sm:pb-16'
      />
    </section>
  );
}
