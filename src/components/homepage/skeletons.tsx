import { cn, getPostUrl } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import { ClassValue } from "clsx";
import Link from "next/link";

function MainImageSkeleton({ slug }: { slug: string }) {
  return (
    <Link
      href={getPostUrl(slug)}
      className='group relative w-full h-32 rounded-xl cursor-pointer'
    >
      <Skeleton className='w-full h-32 rounded-xl' />
      <div className='w-full h-full absolute opacity-0 group-hover:opacity-75 bg-gradient-to-l from-violet-500 to-violet-900 rounded-xl backdrop-blur-none group-active:opacity-100 duration-400 text-white font-bold grid place-items-center'>
        Read More
        <span className='sr-only'>read more button</span>
      </div>
    </Link>
  );
}
function BlogCardSkeleton() {
  return (
    <div className='flex flex-col gap-2 cursor-wait'>
      <MainImageSkeleton />

      {/* title */}
      <Skeleton className='w-[50%] h-6' />
      {/* summary */}
      <Skeleton className='flex-grow h-3' />
      <Skeleton className='flex-grow w-[30%] h-3' />

      <section
        aria-labelledby='post info'
        className='flex justify-between items-center pt-2'
      >
        <div className='flex items-center gap-2'>
          {/* Author's image */}
          <Skeleton className='w-5 h-5 rounded-full aspect-square' />
          {/* Author's name */}
          <Skeleton className='w-16 h-3' />
        </div>

        <Skeleton className='w-16 h-3' />
      </section>
    </div>
  );
}

export function BlogCardsSkeleton() {
  // make an array of 12 elements from 0 to 11
  const arr = Array.from({ length: 12 }, (_, i) => i);

  return arr.map((i) => <BlogCardSkeleton key={i} />);
}

export function SlideshowSkeleton({ className }: { className?: ClassValue }) {
  return (
    <div
      className={cn(
        "h-[342px] relative grid grid-cols-6 md:grid-cols-12 grid-rows-6 bg-gray-200 rounded-2xl",
        className
      )}
    >
      {/* only xs */}
      <section
        className='col-span-full row-start-4 row-span-full flex flex-col gap-1 justify-end px-2
          md:hidden
          '
      >
        {/* Title */}
        <Skeleton className='w-48 h-8' />
        {/* Author's name */}
        <Skeleton className='w-16 h-3' />
        {/* Start Reading Button */}
        <Skeleton className='rounded-lg py-2 px-8 mb-3 items-center justify-center w-full h-10' />
      </section>

      <section className='hidden col-span-full row-start-4 row-span-full md:flex justify-between gap-11 items-end px-4 pb-4'>
        <div className='flex flex-col justify-end items-start gap-2 text-white'>
          {/* title */}
          <Skeleton className='w-96 h-11' />
          {/* Author's name */}
          <Skeleton className='w-16 h-3' />
        </div>

        {/* Start Reading button */}
        <Skeleton className='rounded-3xl py-2 px-8 items-center justify-center w-48 h-10' />
      </section>
    </div>
  );
}

export { MainImageSkeleton as BlogCardMainImageSkeleton };
