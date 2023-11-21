import { Category, Post, User } from "@prisma/client";

export interface PostModel extends Post {
  author: User;
  categories: Category[];
}
