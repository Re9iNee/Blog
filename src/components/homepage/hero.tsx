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
      id="hero-container"
      className="pointer-events-none mx-3 flex items-center justify-center overflow-hidden pb-4 pt-12 md:gap-20 md:px-6 md:pt-6"
    >
      <div className="flex flex-shrink flex-col md:max-w-[50%]">
        <h1 className="z-10 bg-background font-poppins text-3xl font-bold leading-10">
          Read About New
        </h1>
        <RotatingTexts activeIndex={activeIndex} />
        <h2 className="z-10 max-w-sm text-sm leading-6 text-neutral-500 dark:text-neutral-400">
          Join out MORA blog community to stay updated on the latest in
          technology&apos;s frontiers
        </h2>
      </div>

      {/* section VR Guy and hero image component */}
      <div
        className="hidden flex-grow grid-cols-1 grid-rows-1 place-items-end md:grid"
        aria-hidden="true"
      >
        <EllipseGroup activeIndex={activeIndex} />
        <HeroImage activeIndex={activeIndex} />
      </div>
    </section>
  );
}

export default HeroSection;
