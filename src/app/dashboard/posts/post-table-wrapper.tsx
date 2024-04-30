import { columns } from "@/components/dashboard/posts/data-table/columns";
import PostTable from "@/components/dashboard/posts/post-table";
import { getAllPosts } from "@/service/posts.service";
import { PostModel } from "@/types/post";

type Props = {
  page: number;
  query?: string;
};
export default async function PostTableWrapper({ query, page }: Props) {
  const posts: PostModel[] = await getAllPosts({ query, page });

  return <PostTable posts={posts} columns={columns} query={query} />;
}
