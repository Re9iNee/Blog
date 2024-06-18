import { Category } from "@prisma/client";
import { PostSelect } from "./post.type";

export interface CategoryModel extends Category {
  posts: PostSelect[];
}

export interface CategoryUpsertType extends Category {
  posts: string[];
}

export type CategorySelect = Pick<Category, "id" | "name">;
