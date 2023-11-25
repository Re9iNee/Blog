import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

async function main() {
  // await insertUsers(2);
  // await insertPosts(3);
  // await getAllAuthors();
  // await clearDB();
}

async function clearDB() {
  console.log("Clearing DB...");

  const deletePosts = prisma.post.deleteMany();
  const deleteUsers = prisma.user.deleteMany();
  const deleteCategories = prisma.category.deleteMany();

  await prisma.$transaction([deletePosts, deleteUsers, deleteCategories]);

  console.log("DB cleared!");
}

async function getAllAuthors() {
  console.log("Fetching all authors...");

  const authors = await prisma.user.findMany({
    include: { posts: true },
  });

  console.dir(authors, { depth: null });
  return authors;
}

async function insertUsers(limit: number = 3) {
  console.log(`inserting users...`);

  const users = [];
  for (let i = 0; i < 3; i++) {
    const newUser = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatarUrl: faker.image.avatarGitHub(),
    };

    users.push(newUser);
  }

  const result = await prisma.user.createMany({ data: users.slice() });

  console.log(`inserted to DB: `, result);
  return result;
}

async function insertPosts(limit: number = 10) {
  console.log(`inserting posts...`);

  const users = await prisma.user.findMany();
  if (users.length === 0) throw new Error("No users found");

  const posts = [];
  for (let i = 0; i < limit; i++) {
    const randomAuthor = users[Math.floor(Math.random() * users.length)];

    const newPost = {
      title: faker.lorem.sentence(),
      summery: faker.lorem.paragraph(),
      readingTime: faker.number.int({ max: 30 }),
      body: faker.lorem.paragraphs(10),
      mainImageUrl: faker.image.urlPicsumPhotos(),
      published: faker.datatype.boolean(),
      authorId: randomAuthor.id,
    };

    posts.push(newPost);
  }

  const result = await prisma.post.createMany({
    data: posts.slice(),
  });

  console.log(`inserted to DB: `, result);
  return posts;
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
