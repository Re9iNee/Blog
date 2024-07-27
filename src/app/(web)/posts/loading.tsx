import { Skeleton } from "@/components/ui/skeleton";
import PostNavigationGroup from "./nav";
import { Separator } from "@/components/ui/separator";

function PostLoading() {
  return (
    <div className='pt-8 flex flex-col gap-4 px-4 mb-8 max-w-screen-md mx-auto'>
      <PostNavigationGroup postId={1} />

      {/* Title */}
      <Skeleton className='w-72 h-6 pt-2' />
      {/* Image */}
      <Skeleton className='w-full h-40 rounded-lg self-center object-contain' />
      {/* description */}
      <Skeleton className='w-72 h-4' />

      <div className='flex flex-wrap gap-2 justify-between'>
        <section
          aria-labelledby='author-loading-skeleton'
          className='flex items-center gap-2'
        >
          {/* Author avatar photo */}
          <Skeleton className='w-8 h-8 rounded-full aspect-square object-cover' />
          {/* Author name */}
          <Skeleton className='w-11 h-4' />
        </section>

        <Skeleton className='w-60 h-8' />
      </div>

      <Separator />

      {/* article content */}
      <section
        className='flex flex-col gap-2'
        aria-labelledby='article content skeleton loading'
      >
        <Skeleton className='w-40 h-7' />
        <Skeleton className='w-24 h-3' />
        <Skeleton className='w-full h-40' />

        <Skeleton className='w-60 h-7' />
        <Skeleton className='w-40 h-3' />
        <Skeleton className='w-full h-80' />

        <Skeleton className='w-40 h-7' />
        <Skeleton className='w-24 h-3' />
        <Skeleton className='w-full h-40' />
      </section>
    </div>
  );
}

export default PostLoading;
