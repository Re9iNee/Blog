"use client";

import { cn } from "@/lib/utils";
import { CategorySelect } from "@/types/category.type";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import StarImage from "public/icons/star.avif";
import { useState } from "react";
import Chip from "../ui/chips";
import SearchInput from "./search-input";

type Props = {
  categories: CategorySelect[];
};
export default function Search({ categories }: Props) {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <section
      aria-label="search"
      className="group relative hidden min-h-80 flex-col items-center justify-center gap-6 md:flex"
    >
      <div className="pointer-events-none absolute h-full w-full" aria-hidden>
        <Image
          src={StarImage}
          alt="star icon"
          aria-hidden
          width={141}
          height={119}
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

      <section aria-label="trending topics" className="space-y-3">
        <h3 className="text-xs font-bold text-neutral-600 dark:text-neutral-200">
          Trending Topics
        </h3>
        {/* chips container */}
        <div className="flex gap-2 p-1">
          {categories.map((cat) => (
            <Chip key={cat.id} isActive={cat.name === selectedCategory}>
              {cat.name}
            </Chip>
          ))}
        </div>
      </section>
    </section>
  );
}
