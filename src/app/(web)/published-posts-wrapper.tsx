import { MyPagination as Pagination } from "@/components/homepage/pagination";
import BlogCard from "@/components/ui/blog-card";
import {
  getAllPublishedPosts,
  getPublishedPostsCount,
} from "@/service/posts.service";

const PER_PAGE = 12;
type Props = {
  page: number;
  query: string;
};
export default async function PublishedPostsWrapper({ page, query }: Props) {
  const [recentPosts, postsCount] = await Promise.all([
    getAllPublishedPosts({
      page,
      query,
      perPage: PER_PAGE,
    }),
    getPublishedPostsCount({ query }),
  ]);
  const totalPages = Math.ceil(postsCount / PER_PAGE);

  return (
    <>
      {recentPosts.map((post) => (
        <BlogCard key={post.id} data={post} />
      ))}

      {postsCount > 0 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          className='col-span-full'
        />
      )}
    </>
  );
}
