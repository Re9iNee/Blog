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
    orderBy: { id: "desc" },
    include: {
      author: true,
      categories: true,
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
  revalidatePath(`/posts/${post.id}`);
  revalidatePath(`/`);

  return post;
}

export async function createPost(data: PostModel): Promise<PostModel> {
  const { categories, author, ...rest } = data;

  const post = await prisma.post.create({
    data: {
      ...rest,
    },
    include: {
      author: true,
      categories: true,
    },
  });

  revalidatePath("/dashboard/posts");
  revalidatePath(`/`);

  return post;
}

export async function deletePost(
  id: number
): Promise<Omit<PostModel, "author" | "categories">> {
  const post = await prisma.post.delete({
    where: { id },
  });

  revalidatePath("/dashboard/posts");
  revalidatePath(`/`);

  return post;
}

export async function deleteManyPosts(
  ids: number[]
): Promise<{ count: number }> {
  const deleteCount = await prisma.post.deleteMany({
    where: { id: { in: ids } },
  });

  revalidatePath("/dashboard/posts");
  revalidatePath(`/`);

  return deleteCount;
}
