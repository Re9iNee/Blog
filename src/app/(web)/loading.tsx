import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const Loader = ({ className }: { className?: string }) => {
  return (
    <div className='flex-grow absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2'>
      <Loader2 className={cn("h-16 w-16 animate-spin", className)} />
    </div>
  );
};

export default Loader;
