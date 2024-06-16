import { Category, Post, User } from "@prisma/client";

export interface PostModel extends Post {
  author: User;
  categories: Category[];
}

export type PostSelect = Pick<PostModel, "id" | "title" | "mainImageUrl">;
