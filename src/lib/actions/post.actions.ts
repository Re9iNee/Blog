"use server";

import { postSchema } from "@/types/schemas/post-schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "../prisma";

const CreatePost = postSchema.omit({ id: true });

export async function createPost(prevState: unknown, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreatePost.safeParse({
    body: formData.get("body"),
    title: formData.get("title"),
    summary: formData.get("summary"),
    authorId: formData.get("authorId"),
    readingTime: formData.get("readingTime"),
  });

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
    console.log(e);
  }

  revalidatePath("/dashboard/posts");
  redirect("/dashboard/posts");
}
