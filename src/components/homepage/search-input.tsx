"use client";

import useSetURLParams from "@/hooks/useSetURLParams";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import Image from "next/image";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "../ui/input";
import EnterIcon from "public/icons/EnterIcon.svg";
import LittleFlame from "public/images/little-flame.avif";

export default function SearchInput({ className }: { className?: ClassValue }) {
  const { setToUrl } = useSetURLParams({ key: "query", defaultValue: "" });

  const onChange = useDebouncedCallback((query: string) => {
    setToUrl(query);
  }, 500);

  return (
    <div className={cn(className)}>
      <Image
        aria-hidden
        src={LittleFlame}
        placeholder={"empty"}
        alt='little flame icon'
        className='w-[57px] h-[67px] object-none absolute right-3 -top-[67px] transition-all group-hover:top-0 group-hover:scale-50'
      />

      <Input
        type='text'
        className={cn(
          "pl-14 pr-20 text-md font-medium w-full min-h-14 shadow-xl rounded-2xl placeholder:text-neutral-400 relative"
        )}
        onChange={(e) => onChange(e.target.value)}
        placeholder='Find your topic here...'
      />

      <FaMagnifyingGlass className='w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-4 text-purple-600 pointer-events-none' />
      <div className='absolute top-1/2 transform -translate-y-1/2 right-4 text-neutral-500 pointer-events-none items-center gap-1 text-xs font-bold flex'>
        <EnterIcon />
        Enter
      </div>
    </div>
  );
}
