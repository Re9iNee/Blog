import { z } from "zod";
import { MultiSelectSchema } from "../common";
import { basePost } from "./post-schema";

export const baseCategory = z.object({
  id: z.number(),
  updatedAt: z.date().default(new Date()),
  createdAt: z.date().default(new Date()),

  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters." })
    .max(50, { message: "Name must be at most 50 characters." }),
});

export const categorySchema = baseCategory.extend({
  posts: z.array(
    z.lazy(() => basePost.pick({ id: true, title: true, mainImageUrl: true }))
  ),
});

export const CreateCategorySchema = baseCategory
  .pick({
    name: true,
  })
  .extend({
    posts: MultiSelectSchema,
  });

export const UpdateCategorySchema = baseCategory
  .pick({ id: true, name: true })
  .extend({
    posts: MultiSelectSchema,
  });
