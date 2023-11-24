import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

async function main() {
  const result = await prisma.post.create({
    data: {
      author: { connect: { id: 1 } },
      title: "My first post",
      summery: "This is my first post",
      readingTime: 5,
      body: "This is the body of my first post",
      published: true,
      publishedAt: new Date(),
      status: "published",
    },
  });

  console.log(result);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
