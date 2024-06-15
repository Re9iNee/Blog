"use server";

import { prisma } from "@/lib/prisma";
import { fetchAllParams } from "@/types/common";
import { Category } from "@prisma/client";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";

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
