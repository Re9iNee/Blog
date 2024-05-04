"use server";

import { PostModel } from "@/types/post";
import {
  CreatePostSchema,
  UpdatePostSchema,
} from "@/types/schemas/post-schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "../prisma";

export async function createPost(data: PostModel) {
  // Validate form using Zod
  const validatedFields = CreatePostSchema.safeParse(data);

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Post.",
    };
  }

  try {
    await prisma.post.create({
      data: validatedFields.data,
    });
  } catch (e) {
    console.error(e);
    throw new Error("Failed to create post.");
  }

  revalidatePath("/dashboard/posts");
  redirect("/dashboard/posts");
}

export async function updatePost(
  id: number,
  prevState: unknown,
  formData: FormData
) {
  const validatedFields = UpdatePostSchema.safeParse({
    body: formData.get("body"),
    title: formData.get("title"),
    status: formData.get("status"),
    summary: formData.get("summary"),
    authorId: formData.get("authorId"),
    readingTime: formData.get("readingTime"),
    mainImageUrl: formData.get("mainImageUrl"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Post.",
    };
  }

  try {
    await prisma.post.update({
      where: { id },
      data: validatedFields.data,
    });
  } catch (e) {
    console.log(e);
  }

  revalidatePath("/dashboard/posts");
  redirect("/dashboard/posts");
}