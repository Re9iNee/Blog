import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import Image from "next/image";

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
        src={"/HeroImages/Dot.png"}
        className={cn(
          "pointer-events-none absolute",
          className,
          position === "right" ? "right-0" : "left-0 rotate-180",
        )}
        style={{ top: `${top}vh` }}
        width={337}
        height={429}
        alt="bg"
        loading="lazy"
      />
    </div>
  );
}

export default DottedBackground;
