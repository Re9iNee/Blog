import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const Loader = ({ className }: { className?: string }) => {
  return (
    <div className="absolute left-[50%] top-[50%] flex-grow -translate-x-1/2 -translate-y-1/2">
      <Loader2 className={cn("h-16 w-16 animate-spin", className)} />
    </div>
  );
};

export default Loader;
