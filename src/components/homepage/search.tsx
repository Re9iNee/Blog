"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import StarImage from "public/icons/star.avif";
import { useState } from "react";
import SearchInput from "./search-input";

export default function Search() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <>
      <div className="pointer-events-none absolute h-full w-full" aria-hidden>
        <Image
          aria-hidden
          width={141}
          height={135}
          alt="star icon"
          src={StarImage}
          placeholder="empty"
          className={cn(
            "relative left-[52%] top-[4%] object-none transition-all",
            isFocused && "rotate-[60deg] scale-110",
          )}
        />
      </div>

      <h2 className="flex font-poppins text-2xl font-bold text-neutral-950 dark:text-neutral-50">
        Find your topic <span className="ml-1 text-purple-600">Faster</span>
      </h2>

      <SearchInput
        isFocused={isFocused}
        setIsFocused={setIsFocused}
        className="relative w-4/6 max-w-[550px]"
      />
    </>
  );
}
