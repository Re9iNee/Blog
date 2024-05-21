"use server";

import { prisma } from "@/lib/prisma";
import { PostModel } from "@/types/post";
import { PostStatus } from "@prisma/client";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";

export async function getSlideshowContents(): Promise<PostModel[]> {
  const posts = await prisma.post.findMany({
    where: { isSlideshow: true },
    include: { author: true, categories: true },
  });

  return posts;
}

type getAllPublishedPosts = {
  page: number;
  perPage: number;
};
export async function getAllPublishedPosts({
  page,
  perPage,
}: getAllPublishedPosts): Promise<Omit<PostModel, "categories">[]> {
  const posts = await prisma.post.findMany({
    take: perPage,
    include: { author: true },
    skip: (page - 1) * perPage,
    orderBy: { createdAt: "desc" },
    where: { status: PostStatus.published },
  });

  return posts;
}

export async function getPublishedPostsCount(): Promise<number> {
  const count = await prisma.post.count({
    where: { status: PostStatus.published },
  });

  return count;
}

type getAllPosts = {
  page?: number;
  perPage?: number;
  query?: string;
};
export async function getAllPosts({
  page = 1,
  perPage = 10,
  query,
}: getAllPosts): Promise<PostModel[]> {
  noStore();

  const posts = await prisma.post.findMany({
    where: {
      title: { contains: query, mode: "insensitive" },
    },
    orderBy: { id: "desc" },
    include: {
      author: true,
      categories: true,
    },
    take: perPage,
    skip: (page - 1) * perPage,
  });

  return posts;
}

export async function fetchTotalPostsCount(query?: string): Promise<number> {
  noStore();

  const count = await prisma.post.count({
    where: {
      title: { contains: query, mode: "insensitive" },
    },
  });

  return count;
}

export async function getPost(id: number): Promise<PostModel | null> {
  noStore();

  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: { author: true, categories: true },
    });

    return post;
  } catch (e) {
    console.error(e);
    throw new Error("Post not found");
  }
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
