import { prisma } from "@/lib/prisma";
import { AuthorField } from "@/types/author";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchAuthors(): Promise<AuthorField[]> {
  noStore();

  try {
    const authors = await prisma.user.findMany({
      select: { id: true, name: true },
    });

    return authors;
  } catch (e) {
    console.error(e);
    throw new Error("Failed to Fetch All Authors");
  }
}
