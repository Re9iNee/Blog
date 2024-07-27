import { Skeleton } from "@/components/ui/skeleton";
import PostNavigationGroup from "./nav";
import { Separator } from "@/components/ui/separator";

function PostLoading() {
  return (
    <div className="mx-auto mb-8 flex max-w-screen-md flex-col gap-4 px-4 pt-8">
      <PostNavigationGroup postId={1} />

      {/* Title */}
      <Skeleton className="h-6 w-72 pt-2" />
      {/* Image */}
      <Skeleton className="h-40 w-full self-center rounded-lg object-contain" />
      {/* description */}
      <Skeleton className="h-4 w-72" />

      <div className="flex flex-wrap justify-between gap-2">
        <section
          aria-labelledby="author-loading-skeleton"
          className="flex items-center gap-2"
        >
          {/* Author avatar photo */}
          <Skeleton className="aspect-square h-8 w-8 rounded-full object-cover" />
          {/* Author name */}
          <Skeleton className="h-4 w-11" />
        </section>

        <Skeleton className="h-8 w-60" />
      </div>

      <Separator />

      {/* article content */}
      <section
        className="flex flex-col gap-2"
        aria-labelledby="article content skeleton loading"
      >
        <Skeleton className="h-7 w-40" />
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-40 w-full" />

        <Skeleton className="h-7 w-60" />
        <Skeleton className="h-3 w-40" />
        <Skeleton className="h-80 w-full" />

        <Skeleton className="h-7 w-40" />
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-40 w-full" />
      </section>
    </div>
  );
}

export default PostLoading;
