import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const RotatingTexts: React.FC = () => {
  const dynamicTexts = useMemo(
    () => ["AI Stuff 🔥", "Productivity Hacks 🚀", "Industry Updates 📰"],
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
        className='-z-0'
        exit={{ y: -20 }}
        animate={{ y: 0 }}
        initial={{ y: 20 }}
        key={activeTextIndex}
        transition={{ duration: 0.4 }}
      >
        {dynamicTexts[activeTextIndex]}
      </motion.h2>
    </AnimatePresence>
  );
};

export default RotatingTexts;
