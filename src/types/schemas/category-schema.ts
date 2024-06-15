import { z } from "zod";
import { postSchema } from "./post-schema";

export const categorySchema = z.object({
  id: z.number(),
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters." })
    .max(50, { message: "Name must be at most 50 characters." }),
  posts: z.array(postSchema),
  updatedAt: z.date().default(new Date()),
  createdAt: z.date().default(new Date()),
});

export const CreateCategorySchema = categorySchema.pick({ name: true });

export const UpdateCategorySchema = categorySchema
  .pick({ id: true, posts: true })
  .partial({ posts: true });
