import BlogCard from "@/components/ui/blog-card";
import { getAllPublishedPosts } from "@/service/posts.service";

export default async function PublishedPostsWrapper() {
  const recentPosts = await getAllPublishedPosts(12);

  return (
    <>
      {recentPosts.map((post) => (
        <BlogCard key={post.id} data={post} />
      ))}
    </>
  );
}
