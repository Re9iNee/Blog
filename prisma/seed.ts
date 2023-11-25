import { Post, PrismaClient, User } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

async function main() {
  // await insertUsers();
  // await insertPosts();
  // await getAllAuthors();
}

async function getAllAuthors() {
  console.log("Fetching all authors...");

  const authors = await prisma.user.findMany({
    include: { posts: true },
  });

  console.dir(authors, { depth: null });
  return authors;
}

async function insertUsers() {
  console.log(`inserting users...`);

  const users = [];
  for (let i = 0; i < 3; i++) {
    const newUser = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatarUrl: faker.image.avatar(),
    };

    users.push(newUser);
  }

  const result = await prisma.user.createMany({ data: users.slice() });

  console.log(`inserted to DB: `, result);
  return result;
}

async function insertPosts() {
  console.log(`inserting posts...`);

  const users = await prisma.user.findMany();

  const posts = [];
  for (let i = 0; i < 10; i++) {
    const randomAuthor = users[Math.floor(Math.random() * users.length)];

    const result = await prisma.post.create({
      data: {
        title: faker.lorem.sentence(),
        summery: faker.lorem.paragraph(),
        readingTime: faker.number.int({ max: 30 }),
        body: faker.lorem.paragraphs(10),
        mainImageUrl: faker.image.urlPicsumPhotos(),
        published: faker.datatype.boolean(),
        author: { connect: { id: randomAuthor.id } },
      },
    });

    posts.push(result);
  }

  console.log(`inserted to DB: `, posts);
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
