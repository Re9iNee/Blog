import { cn } from "@/lib/utils";
import { Variants, motion } from "framer-motion";
import { useMemo } from "react";

type Props = {
  activeIndex: number;
};
function EllipseGroup({ activeIndex }: Props) {
  const dynamicEllipses = useMemo(
    () => [
      { classNames: "bg-rose-400" },
      { classNames: "bg-indigo-600" },
      { classNames: "bg-gray-300" },
    ],
    []
  );

  const variants: Variants = {
    active: {
      width: 281,
      height: 281,
      left: -10,
      top: 15,
    },
    inactive: {
      width: 256,
      height: 256,
      left: 0,
      top: 15,
    },
  };

  return (
    <div className='w-72 h-72 col-start-1 col-end-1 row-start-1 row-end-1 scrollbar-hide'>
      <div className='relative'>
        {dynamicEllipses.map((ellipse, key) => (
          <motion.div
            key={key}
            variants={variants}
            animate={activeIndex === key ? "active" : "inactive"}
            className={cn("absolute rounded-full shadow", ellipse.classNames)}
          />
        ))}
      </div>
    </div>
  );
}

export default EllipseGroup;
