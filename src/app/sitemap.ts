import { getAllPublishedPostsSlug } from "@/service/posts.service";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (
    process.env.NODE_ENV === "development" ||
    process.env.VERCEL_ENV === "preview" ||
    process.env.VERCEL_ENV === "development"
  )
    return [];

  const baseUrl = "https://www.mora-ed.com";
  const publishedPosts = await getAllPublishedPostsSlug();

  const posts: MetadataRoute.Sitemap = publishedPosts.map((post) => {
    return {
      priority: 0.8,
      changeFrequency: "never",
      lastModified: post.updatedAt,
      url: `${baseUrl}/posts/${post.slug}`,
    };
  });

  return [
    {
      priority: 1,
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
    },
    {
      priority: 0.5,
      changeFrequency: "never",
      url: `${baseUrl}/about-us`,
      lastModified: "2024-05-09",
    },
    ...posts,
  ];
}
