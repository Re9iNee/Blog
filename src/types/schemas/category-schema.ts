import { z } from "zod";
import { postSelectSchema } from "./post-schema";

const baseSchema = z.object({
  id: z.number(),
  updatedAt: z.date().default(new Date()),
  createdAt: z.date().default(new Date()),

  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters." })
    .max(50, { message: "Name must be at most 50 characters." }),
});

export const categorySchema = baseSchema.extend({
  posts: postSelectSchema.array(),
});

const postsSelectForm = z.array(z.coerce.number().nonnegative()).default([]);

export const CreateCategorySchema = baseSchema
  .pick({
    name: true,
  })
  .extend({
    posts: postsSelectForm,
  });

export const UpdateCategorySchema = baseSchema
  .pick({ id: true, name: true })
  .extend({
    posts: postsSelectForm,
  });
