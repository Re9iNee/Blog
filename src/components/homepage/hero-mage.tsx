import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useMemo } from "react";

type Props = {
  activeIndex: number;
};
function HeroImage({ activeIndex }: Props) {
  const dynamicImages = useMemo(
    () => [
      {
        alt: "Floating Guy",
        src: "/HeroImages/Floating-Guy.png",
      },
      {
        alt: "Rocket Girl",
        src: "/HeroImages/Rocket-Girl.png",
      },
      {
        alt: "VR Guy",
        src: "/HeroImages/VR-Guy.png",
      },
    ],
    []
  );

  return (
    <div className='rounded-full bg-white z-10 col-start-1 col-end-1 row-start-1 row-end-1'>
      <AnimatePresence mode='wait'>
        <motion.div
          key={activeIndex}
          className='w-72 h-72 relative'
          exit={{ opacity: 0, translateX: -288, translateY: 288, scale: 0 }}
          animate={{ opacity: 1, translateX: 0, translateY: 0, scale: 1 }}
          initial={{ opacity: 0, translateX: 288, translateY: 288, scale: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Image
            fill
            loading='eager'
            src={dynamicImages[activeIndex].src}
            alt={dynamicImages[activeIndex].alt}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default HeroImage;
