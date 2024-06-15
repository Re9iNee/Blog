"use server";

import { prisma } from "@/lib/prisma";
import { fetchAllParams } from "@/types/common";
import { CreateCategorySchema } from "@/types/schemas/category-schema";
import { Category } from "@prisma/client";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function fetchCategoriesCount(
  query: string | undefined
): Promise<number> {
  noStore();

  const count = await prisma.category.count({
    where: {
      name: { contains: query, mode: "insensitive" },
    },
  });

  return count;
}

export async function fetchCategories({
  query,
  page = 1,
  perPage = 10,
}: fetchAllParams): Promise<Category[]> {
  noStore();

  const categories = await prisma.category.findMany({
    where: {
      name: { contains: query, mode: "insensitive" },
    },
    include: { posts: { select: { title: true, id: true } } },
    take: perPage,
    orderBy: { id: "desc" },
    skip: (page - 1) * perPage,
  });

  return categories;
}

export async function deleteManyCategories(
  ids: number[]
): Promise<{ count: number }> {
  const deleteCount = await prisma.category.deleteMany({
    where: { id: { in: ids } },
  });

  revalidatePath("/dashboard/categories");

  return deleteCount;
}

export async function createCategory(data: Category) {
  // if we don't use noStore, NextJS will cache the response and return the same response for same request
  noStore();

  // Validate form using Zod
  const validatedFields = CreateCategorySchema.safeParse(data);

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Category.",
    };
  }

  try {
    await prisma.category.create({
      data: validatedFields.data,
    });
  } catch (e) {
    console.error(e);
    throw new Error("Failed to create category.");
  }

  revalidatePath("/dashboard/categories");
  redirect("/dashboard/categories");
}
