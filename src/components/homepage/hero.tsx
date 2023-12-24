"use client";

import { useEffect, useState } from "react";
import RotatingTexts from "./dynamic-text";
import EllipseGroup from "./ellipse-group";
import HeroImage from "./hero-image";

function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % 3); // cause we have 3 types dynamic (ellipses and texts)
    }, 4000); // Change text every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id='hero-container'
      className='mx-3 pt-12 pb-4 flex justify-center items-center overflow-x-hidden pointer-events-none 
      md:px-6 md:pt-6 md:gap-20
      '
    >
      <div
        className='flex flex-col flex-shrink 
        md:max-w-[50%]
        '
      >
        <h1 className='z-10 text-3xl font-bold leading-10 bg-background font-poppins'>
          Read About New
        </h1>
        <RotatingTexts activeIndex={activeIndex} />
        <h2 className='z-10 text-neutral-500 text-sm leading-tight max-w-sm'>
          Join out MORA blog community to stay updated on the latest in
          technology&apos;s frontiers
        </h2>
      </div>

      {/* section VR Guy and hero image component */}
      <div className='hidden md:grid grid-cols-1 grid-rows-1 place-items-end flex-grow'>
        <EllipseGroup activeIndex={activeIndex} />
        <HeroImage activeIndex={activeIndex} />
      </div>
    </section>
  );
}

export default HeroSection;
