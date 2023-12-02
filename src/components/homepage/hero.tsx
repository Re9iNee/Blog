"use client";

import useDynamicHeight from "@/hooks/useDynamicHeight";
import RotatingTexts from "./dynamic-text";

function HeroSection() {
  useDynamicHeight("hero-container", "header");
  return (
    <section id='hero-container' className='md:grid md:grid-cols-12'>
      <div className='flex flex-col'>
        <h1 className='z-10 text-3xl font-bold leading-10 bg-black'>
          Read About New
        </h1>
        <RotatingTexts />
        <h2 className='z-10 bg-black'>
          {" "}
          Join out MORA blog community to stay updated on the latest in
          technology&apos;s frontiers
        </h2>
      </div>
    </section>
  );
}

export default HeroSection;
