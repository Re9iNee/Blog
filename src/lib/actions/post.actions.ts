"use server";

import { PostModel, PostUpsertType } from "@/types/post.type";
import {
  CreatePostSchema,
  UpdatePostSchema,
} from "@/types/schemas/post-schema";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "../prisma";

export async function createPost(data: PostUpsertType) {
  // if we don't use noStore, NextJS will cache the response and return the same response for same request
  noStore();

  // Validate form using Zod
  const validatedFields = CreatePostSchema.safeParse(data);

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Post.",
    };
  }

  const { categories, ...values } = validatedFields.data;

  try {
    await prisma.post.create({
      data: {
        ...values,
        categories: { connect: categories.map((id) => ({ id: +id })) },
      },
    });
  } catch (e) {
    console.error(e);
    throw new Error("Failed to create post.");
  }

  revalidatePath("/dashboard/posts");
  redirect("/dashboard/posts");
}

export async function updatePost(id: number, data: PostUpsertType) {
  // if we don't use noStore, NextJS will cache the response and return the same response for same request
  noStore();

  const validatedFields = UpdatePostSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Post.",
    };
  }

  const { categories, ...values } = validatedFields.data;

  try {
    await prisma.post.update({
      where: { id },
      data: {
        ...values,
        categories: { set: categories.map((id) => ({ id: +id })) },
      },
    });
  } catch (e) {
    console.log(e);
  }

  revalidatePath("/dashboard/posts");
  redirect("/dashboard/posts");
}
