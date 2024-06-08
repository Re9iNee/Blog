import { z } from "zod";

export const postSchema = z.object({
  id: z.number(),
  body: z.string(),
  readingTime: z.coerce.number(),
  publishedAt: z.date().nullish(),
  updatedAt: z.date().default(new Date()),
  createdAt: z.date().default(new Date()),
  isSlideshow: z.boolean().default(false),
  mainImageUrl: z.string().url().nullish(),
  status: z.enum(["published", "draft", "archived"]).default("draft"),
  authorId: z.coerce.number({ invalid_type_error: "Please select an author" }),

  title: z
    .string()
    .max(80, { message: "Title should be less than 80 characters" }),
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: "Slug is invalid" }),
  summary: z
    .string({
      invalid_type_error: "Please write down a summary",
    })
    .max(300, { message: "Summery should be less than 300 characters" }),

  // TODO
  // author: z.any().optional(),
  // categories: z.array(z.any()).optional(),
});

export const CreatePostSchema = postSchema.omit({ id: true });
export const UpdatePostSchema = postSchema.omit({ id: true });
