import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";

type Props = {
  activeIndex: number;
};

function RotatingTexts({ activeIndex }: Props) {
  const dynamicTexts = useMemo(
    () => [
      { text: "AI Stuff 🔥", classNames: "text-blue-500" },
      { text: "Productivity Hacks 🚀", classNames: "text-rose-500" },
      { text: "Industry Updates 📰", classNames: "text-blue-800" },
    ],
    [],
  );

  return (
    <AnimatePresence mode="wait">
      <motion.h2
        className={cn(
          "-z-0 h-20 pb-3 font-poppins text-3xl font-bold leading-10 md:h-auto md:whitespace-nowrap",
          dynamicTexts[activeIndex].classNames,
        )}
        exit={{ y: -40 }}
        animate={{ y: 0 }}
        initial={{ y: 20 }}
        key={activeIndex}
        transition={{ duration: 0.4 }}
      >
        {dynamicTexts[activeIndex].text}
      </motion.h2>
    </AnimatePresence>
  );
}

export default RotatingTexts;
