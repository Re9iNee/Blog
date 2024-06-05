import { columns } from "@/components/dashboard/posts/data-table/columns";
import PostTable from "@/components/dashboard/posts/post-table";
import { fetchTotalPostsCount, getAllPosts } from "@/service/posts.service";

type Props = {
  page: number;
  query?: string;
  perPage: number;
};
export default async function PostTableWrapper({
  page,
  query,
  perPage,
}: Props) {
  const [totalPosts, posts] = await Promise.all([
    fetchTotalPostsCount(query),
    getAllPosts({
      page,
      query,
      perPage,
    }),
  ]);

  return (
    <PostTable
      page={page}
      posts={posts}
      query={query}
      columns={columns}
      perPage={perPage}
      rowCount={totalPosts}
    />
  );
}
