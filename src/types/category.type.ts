import { Category } from "@prisma/client";
import { PostSelect } from "./post.type";

export interface CategoryModel extends Category {
  posts: PostSelect[];
}

export interface CategoryInsertType extends Category {
  posts: string[];
}
