import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  children: string;
  isActive?: boolean;
};
function Chip({ children, isActive }: Props) {
  return (
    <Link
      href={{
        pathname: "/",
        query: isActive ? {} : { category: children },
      }}
      className={cn(
        "rounded-[32px] text-xs text-neutral-600 bg-neutral-50 px-4 py-1.5 dark:bg-blue-950 dark:text-white transition-all",
        isActive &&
          "bg-gradient-to-tr to-[#9767FE] from-[#5F14FF] text-neutral-50"
      )}
    >
      {children}
    </Link>
  );
}

export default Chip;
