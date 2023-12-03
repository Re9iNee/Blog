import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const RotatingTexts: React.FC = () => {
  const dynamicTexts = useMemo(
    () => [
      { text: "AI Stuff 🔥", classNames: "text-blue-500" },
      { text: "Productivity Hacks 🚀", classNames: "text-rose-400" },
      { text: "Industry Updates 📰", classNames: "text-blue-800" },
    ],
    []
  );

  const [activeTextIndex, setActiveTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTextIndex((prevIndex) => (prevIndex + 1) % dynamicTexts.length);
    }, 4000); // Change text every 4 seconds

    return () => clearInterval(interval);
  }, [dynamicTexts.length]);

  return (
    <AnimatePresence mode='wait'>
      <motion.h2
        className={cn(
          "-z-0 text-3xl font-bold leading-10",
          dynamicTexts[activeTextIndex].classNames
        )}
        exit={{ y: -40 }}
        animate={{ y: 0 }}
        initial={{ y: 20 }}
        key={activeTextIndex}
        transition={{ duration: 0.4 }}
      >
        {dynamicTexts[activeTextIndex].text}
      </motion.h2>
    </AnimatePresence>
  );
};

export default RotatingTexts;
