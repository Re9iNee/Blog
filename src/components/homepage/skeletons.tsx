import { cn, getPostUrl } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import { ClassValue } from "clsx";
import Link from "next/link";

function MainImageSkeleton({ slug }: { slug: string }) {
  return (
    <Link
      href={getPostUrl(slug)}
      // By adding flex to the parent, the hover effect will and skeleton animation will be on top of each other. instead of new line (block display)
      className="group relative flex h-32 w-full cursor-pointer rounded-xl"
    >
      <Skeleton className="h-32 w-full rounded-xl" />
      <div className="absolute grid h-full w-full place-items-center rounded-xl bg-gradient-to-l from-violet-500 to-violet-900 font-bold text-white opacity-0 backdrop-blur-none duration-400 group-hover:opacity-75 group-active:opacity-100">
        Read More
        <span className="sr-only">read more button</span>
      </div>
    </Link>
  );
}
function BlogCardSkeleton() {
  return (
    <div className="flex cursor-wait flex-col gap-2">
      <MainImageSkeleton slug="" />

      {/* title */}
      <Skeleton className="h-6 w-[50%]" />
      {/* summary */}
      <Skeleton className="h-3 flex-grow" />
      <Skeleton className="h-3 w-[30%] flex-grow" />

      <section
        aria-labelledby="post info"
        className="flex items-center justify-between pt-2"
      >
        <div className="flex items-center gap-2">
          {/* Author's image */}
          <Skeleton className="aspect-square h-5 w-5 rounded-full" />
          {/* Author's name */}
          <Skeleton className="h-3 w-16" />
        </div>

        <Skeleton className="h-3 w-16" />
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
        "relative grid h-[342px] grid-cols-6 grid-rows-6 rounded-2xl bg-gray-200 md:grid-cols-12",
        className,
      )}
    >
      {/* only xs */}
      <section className="col-span-full row-span-full row-start-4 flex flex-col justify-end gap-1 px-2 md:hidden">
        {/* Title */}
        <Skeleton className="h-8 w-48" />
        {/* Author's name */}
        <Skeleton className="h-3 w-16" />
        {/* Start Reading Button */}
        <Skeleton className="mb-3 h-10 w-full items-center justify-center rounded-lg px-8 py-2" />
      </section>

      <section className="col-span-full row-span-full row-start-4 hidden items-end justify-between gap-11 px-4 pb-4 md:flex">
        <div className="flex flex-col items-start justify-end gap-2 text-white">
          {/* title */}
          <Skeleton className="h-11 w-96" />
          {/* Author's name */}
          <Skeleton className="h-3 w-16" />
        </div>

        {/* Start Reading button */}
        <Skeleton className="h-10 w-48 items-center justify-center rounded-3xl px-8 py-2" />
      </section>
    </div>
  );
}

export { MainImageSkeleton as BlogCardMainImageSkeleton };
