import { prisma } from "@/lib/prisma";
import { AuthorField } from "@/types/author";

export async function fetchAuthors(): Promise<AuthorField[]> {
  const authors = await prisma.user.findMany({
    select: { id: true, name: true },
  });

  return authors;
}
