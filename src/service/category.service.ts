import { prisma } from "@/lib/prisma";
import { Category } from "@prisma/client";

export async function getAllCategories(take?: number): Promise<Category[]> {
  const categories = await prisma.category.findMany({ take: 10 });

  return categories;
}
