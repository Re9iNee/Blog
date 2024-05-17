import BlogCard from "@/components/ui/blog-card";
import { getAllPublishedPosts } from "@/service/posts.service";

type Props = {
  perPage: number;
};
export default async function PublishedPostsWrapper({ perPage }: Props) {
  const recentPosts = await getAllPublishedPosts({
    perPage,
  });

  return (
    <>
      {recentPosts.map((post) => (
        <BlogCard key={post.id} data={post} />
      ))}
    </>
  );
}
