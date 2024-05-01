import { columns } from "@/components/dashboard/posts/data-table/columns";
import PostTable from "@/components/dashboard/posts/post-table";
import { getAllPosts } from "@/service/posts.service";
import { PostModel } from "@/types/post";

type Props = {
  page: number;
  query?: string;
  perPage: number;
};
export default async function PostTableWrapper({
  query,
  page,
  perPage,
}: Props) {
  const posts: PostModel[] = await getAllPosts({
    page,
    query,
    perPage,
  });

  return (
    <PostTable
      posts={posts}
      query={query}
      columns={columns}
      perPage={perPage}
    />
  );
}
