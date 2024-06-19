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
      aria-label='search'
      className='hidden md:flex flex-col items-center justify-center min-h-80 relative gap-6 group'
    >
      <div className='absolute w-full h-full pointer-events-none' aria-hidden>
        <Image
          src={StarImage}
          alt='star icon'
          aria-hidden
          width={141}
          height={119}
          placeholder='empty'
          className={cn(
            "left-[52%] top-[4%] relative object-none transition-all",
            isFocused && "rotate-[60deg] scale-110"
          )}
        />
      </div>

      <h2 className='text-neutral-950 font-poppins font-bold flex text-2xl'>
        Find your topic <span className='text-purple-600 ml-1'>Faster</span>
      </h2>

      <SearchInput
        isFocused={isFocused}
        setIsFocused={setIsFocused}
        className='relative w-4/6 max-w-[550px]'
      />

      <section aria-label='trending topics' className='space-y-3'>
        <h3 className='text-neutral-600 font-bold text-sm'>Trending Topics</h3>
        {/* chips container */}
        <div className='flex gap-2 p-1'>
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
