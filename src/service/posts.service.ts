"use server";

import { prisma } from "@/lib/prisma";
import { PostModel } from "@/types/post";
import { PostStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";

export async function getAllPublishedPosts(
  take?: number
): Promise<Omit<PostModel, "categories">[]> {
  const posts = await prisma.post.findMany({
    take: take,
    include: { author: true },
    orderBy: { createdAt: "desc" },
    where: { status: PostStatus.published },
  });

  return posts;
}

type getAllPostsParams = {
  caching: boolean;
};
export async function getAllPosts({
  caching,
}: getAllPostsParams): Promise<PostModel[]> {
  const posts = await prisma.post.findMany({
    orderBy: { id: "desc" },
    include: {
      author: true,
      categories: true,
    },
    cacheStrategy: {
      swr: caching ? 60 : undefined,
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

export async function updatePost(
  data: Partial<PostModel>,
  id?: number
): Promise<PostModel> {
  if (!id) throw new Error("id is required");

  const { author, categories, ...rest } = data;

  const post = await prisma.post.update({
    where: { id },
    data: {
      ...rest,
    },
    include: {
      author: true,
      categories: true,
    },
  });

  revalidatePath("/dashboard/posts");

  return post;
}

export async function createPost(data: PostModel): Promise<PostModel> {
  const randomAuthor = await prisma.user.findFirst({
    cacheStrategy: { swr: 60 * 60 * 24 },
  });

  if (!randomAuthor) throw new Error("No author found");

  const { author, categories, ...rest } = data;

  const post = await prisma.post.create({
    data: {
      ...rest,
      authorId: randomAuthor.id,
    },
    include: {
      author: true,
      categories: true,
    },
  });

  revalidatePath("/dashboard/posts");

  return post;
}
