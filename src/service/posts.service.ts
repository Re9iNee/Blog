import { prisma } from "@/lib/prisma";
import { PostModel } from "@/types/post";

export async function getAllPosts(
  take?: number
): Promise<Omit<PostModel, "categories">[]> {
  const posts = await prisma.post.findMany({
    take: take,
    where: { published: true },
    orderBy: { createdAt: "desc" },
    include: { author: true },
  });

  return posts;
}
