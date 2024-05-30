import { getServerSiteUrl } from "./../lib/utils/urlUtils";
import { getAllPublishedPostsId } from "@/service/posts.service";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (
    process.env.NODE_ENV === "development" ||
    process.env.VERCEL_ENV === "preview" ||
    process.env.VERCEL_ENV === "development"
  )
    return [];

  const baseUrl = getServerSiteUrl();
  const publishedPosts = await getAllPublishedPostsId();

  const posts: MetadataRoute.Sitemap = publishedPosts.map((post) => {
    return {
      priority: 0.8,
      changeFrequency: "weekly",
      lastModified: post.updatedAt,
      url: `${baseUrl}/posts/${post.id}`,
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
