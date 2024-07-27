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
        "rounded-[32px] bg-neutral-50 px-4 py-1.5 text-xs text-neutral-600 transition-all dark:bg-neutral-900 dark:text-neutral-200",
        isActive &&
          "bg-gradient-to-tr from-[#5F14FF] to-[#9767FE] text-neutral-50",
      )}
    >
      {children}
    </Link>
  );
}

export default Chip;
