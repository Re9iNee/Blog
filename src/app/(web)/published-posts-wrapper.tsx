import { MyPagination as Pagination } from "@/components/homepage/pagination";
import { BlogCardsSkeleton } from "@/components/homepage/skeletons";
import BlogCard from "@/components/ui/blog-card";
import {
  getAllPublishedPosts,
  getPublishedPostsCount,
} from "@/service/posts.service";
import Image from "next/image";
import ShruggingManImage from "public/images/shrugging-man.png";
import { Suspense } from "react";

const PER_PAGE = 12;
type Props = {
  page: number;
  query: string;
  category?: string;
};
export default async function PublishedPostsWrapper({
  page,
  query,
  category,
}: Props) {
  const [recentPosts, postsCount] = await Promise.all([
    getAllPublishedPosts({
      page,
      query,
      category,
      perPage: PER_PAGE,
    }),
    getPublishedPostsCount({ query, category }),
  ]);
  const totalPages = Math.ceil(postsCount / PER_PAGE);

  if (postsCount === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-16">
        <Image
          width={320}
          height={330}
          placeholder="blur"
          alt="No Result Image."
          src={ShruggingManImage}
          className="pointer-events-none"
        />
        <h2 className="text-lg text-neutral-300">
          We couldn’t find any results that matches your search
        </h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 p-4 pb-14 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <Suspense fallback={<BlogCardsSkeleton />} key={query + page}>
        {recentPosts.map((post) => (
          <BlogCard key={post.id} data={post} />
        ))}

        {postsCount > 0 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            className="col-span-full"
          />
        )}
      </Suspense>
    </div>
  );
}
