"use server";

import { prisma } from "@/lib/prisma";
import { PostModel } from "@/types/post";
import { PostStatus } from "@prisma/client";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { notFound } from "next/navigation";

export async function getSlideshowContents(): Promise<PostModel[]> {
  const posts = await prisma.post.findMany({
    where: { isSlideshow: true },
    include: { author: true, categories: true },
  });

  return posts;
}

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
  noStore();

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

export async function clapToPost(id: number, amount: number): Promise<number> {
  noStore();
  if (!id) throw new Error("post ID is required");

  console.log({ id, amount });

  const updatedPost = await prisma.post.update({
    where: { id },
    data: {
      claps: {
        increment: amount,
      },
    },
    select: {
      claps: true,
    },
  });

  console.log("Clap Submitted Successfully", updatedPost.claps);
  return updatedPost.claps;
}

// change the visibility of a post in the slideshow
export async function slideshowTogglePostVisibility(
  id: number,
  show: boolean
): Promise<boolean> {
  noStore();

  const updatedPost = await prisma.post.update({
    where: { id },
    data: {
      isSlideshow: { set: show },
    },
    select: {
      isSlideshow: true,
    },
  });

  revalidatePath("/dashboard/posts");

  const updatedPostVisibility = updatedPost.isSlideshow;
  return updatedPostVisibility;
}
