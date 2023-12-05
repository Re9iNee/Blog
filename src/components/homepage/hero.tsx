"use client";

import useDynamicHeight from "@/hooks/useDynamicHeight";
import RotatingTexts from "./dynamic-text";
import EllipseGroup from "./ellipse-group";
import { useEffect, useState } from "react";
import HeroImage from "./hero-image";

function HeroSection() {
  useDynamicHeight("hero-container", "header");
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % 3); // cause we have 3 types dynamic (ellipses and texts)
    }, 4000); // Change text every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section id='hero-container' className='flex px-6 pt-6 gap-20'>
      <div className='flex flex-col'>
        <h1 className='z-10 text-3xl font-bold leading-10 bg-white dark:bg-black'>
          Read About New
        </h1>
        <RotatingTexts activeIndex={activeIndex} />
        <h2 className='z-10 bg-white dark:bg-black text-neutral-500 text-sm leading-tight'>
          Join out MORA blog community to stay updated on the latest in
          technology&apos;s frontiers
        </h2>
      </div>

      {/* section VR Guy and hero image component */}
      <div className='grid grid-cols-1 grid-rows-1'>
        <EllipseGroup activeIndex={activeIndex} />
        <HeroImage activeIndex={activeIndex} />
      </div>
    </section>
  );
}

export default HeroSection;
