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

export async function getAllPosts(): Promise<PostModel[]> {
  const posts = await prisma.post.findMany({
    orderBy: { id: "asc" },
    include: {
      author: true,
      categories: true,
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

export async function updatePost(
  id: number,
  data: Partial<PostModel>
): Promise<PostModel> {
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
