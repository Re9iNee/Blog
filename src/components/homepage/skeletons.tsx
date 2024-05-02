import { Skeleton } from "../ui/skeleton";

function BlogCardSkeleton() {
  return (
    <div className='flex flex-col gap-2 cursor-wait'>
      {/* main image */}
      <Skeleton className='w-full h-32 rounded-xl' />

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
