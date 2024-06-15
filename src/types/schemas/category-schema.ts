import { z } from "zod";
import { postSchema } from "./post-schema";

export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  posts: z.array(postSchema),
  updatedAt: z.date().default(new Date()),
  createdAt: z.date().default(new Date()),
});

export const CreateCategorySchema = categorySchema
  .pick({ name: true, posts: true })
  .partial({ posts: true });

export const UpdateCategorySchema = categorySchema
  .pick({ id: true, posts: true })
  .partial({ posts: true });
