import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import Image from "next/image";
import bgImage from "public/HeroImages/Dot.png";

type Props = {
  // in VH
  top: number;
  className?: ClassValue;
  position: "left" | "right";
};
function DottedBackground({ position, top, className }: Props) {
  return (
    <div className="relative dark:hidden xl:hidden">
      <Image
        aria-hidden
        width={337}
        height={429}
        src={bgImage}
        priority={true}
        placeholder="blur"
        alt="Dotted Background"
        style={{ top: `${top}vh` }}
        className={cn(
          "pointer-events-none absolute",
          className,
          position === "right" ? "right-0" : "left-0 rotate-180",
        )}
      />
    </div>
  );
}

export default DottedBackground;
