import { useEffect } from "react";

// Custom hook for setting the height of a main section dynamically
const useDynamicHeight = (mainSectionId: string, otherDivId: string) => {
  useEffect(() => {
    const adjustMainSectionHeight = () => {
      const otherDiv = document.getElementById(otherDivId);
      const mainSection = document.getElementById(mainSectionId);

      if (otherDiv && mainSection) {
        const otherDivHeight = otherDiv.offsetHeight;
        const viewportHeight = window.innerHeight;
        const mainSectionHeight = viewportHeight - otherDivHeight;

        mainSection.style.height = `${mainSectionHeight}px`;
      }
    };

    // Initial adjustment
    adjustMainSectionHeight();

    // Adjust on window resize
    window.addEventListener("resize", adjustMainSectionHeight);

    // Clean up listener
    return () => {
      window.removeEventListener("resize", adjustMainSectionHeight);
    };
  }, [mainSectionId, otherDivId]);
};

export default useDynamicHeight;
