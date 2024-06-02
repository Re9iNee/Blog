import { faker } from "@faker-js/faker";
import { PostStatus, PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { hash } from "bcryptjs";
import * as dotenv from "dotenv";
dotenv.config(); // Load the environment variables

const prisma = new PrismaClient().$extends(withAccelerate());

async function main() {
  // await clearDB();
  await insertAdmin();
  // console.log(await getHash("examplePassword"));
  // await insertUsers(2);
  // await insertPosts(5);
  // await getAllAuthors();
  // await getAllDB();
}

async function getHash(pwd: string) {
  return await hash(pwd, 12);
}

async function getAllDB() {
  console.log("Fetching all db data...");

  const users = await prisma.user.findMany();
  const posts = await prisma.post.findMany();
  const categories = await prisma.category.findMany();

  console.log({ users, posts, categories });

  return { users, posts, categories };
}

async function insertAdmin() {
  console.log("Inserting Admin...");

  if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_EMAIL)
    throw new Error("No admin password/email found in env file");

  const hashedPassword = await hash(process.env.ADMIN_PASSWORD, 12);

  const admin = await prisma.user.findUnique({
    where: { email: process.env.ADMIN_EMAIL },
  });

  if (admin) {
    console.log("Already exists, ", admin);
    return admin;
  }

  const newAdmin = await prisma.user.create({
    data: {
      name: "Admin",
      email: process.env.ADMIN_EMAIL,
      avatarUrl:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/509.jpg",
      password: hashedPassword,
    },
  });

  console.log("Inserted: ", newAdmin);
  return newAdmin;
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
  for (let i = 0; i < limit; i++) {
    const newUser = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
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

    const title = faker.lorem.sentence();
    const slug = makeSlugWithTitle(title);

    const newPost = {
      slug,
      title,
      authorId: randomAuthor.id,
      status: PostStatus.published,
      summary: faker.lorem.sentence(),
      body: faker.lorem.paragraphs(10),
      readingTime: faker.number.int({ max: 30 }),
      publishedAt: faker.date.past({ years: 1 }),
      mainImageUrl: faker.image.urlPicsumPhotos(),
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

// I had to bring this function here. cause seeder runtime is running without tsconfig path file and setup.
function makeSlugWithTitle(title: string): string {
  return title.toLowerCase().replace(/\s+/g, "-");
}
