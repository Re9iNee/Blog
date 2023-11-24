import { prisma } from "@/lib/prisma";
import { PostModel } from "@/types/post";
import { notFound } from "next/navigation";

export async function getAllPublishedPosts(
  take?: number
): Promise<Omit<PostModel, "categories">[]> {
  const posts = await prisma.post.findMany({
    take: take,
    where: { published: true },
    orderBy: { createdAt: "desc" },
    include: { author: true },
  });

  return posts;
}

export async function getAllPosts() {
  const posts = await prisma.post.findMany({
    orderBy: { id: "asc" },
    select: {
      id: true,
      title: true,
      status: true,
      summery: true,
      published: true,
      publishedAt: true,
      readingTime: true,
    },
    cacheStrategy: {
      swr: 60,
    },
  });

  return posts;
}

export async function getPost(id: number): Promise<PostModel> {
  const post = await prisma.post.findUnique({
    where: { id },
    include: { author: true, categories: true },
  });

  if (!post) notFound();

  return post;
}
