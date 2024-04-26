import { z } from "zod";

export const postSchema = z.object({
  id: z.number(),
  body: z.string(),
  title: z.string(),
  summary: z
    .string({
      invalid_type_error: "Please write down a summary",
    })
    .max(80, { message: "Summery should be less than 80 characters" }),
  authorId: z.coerce.number({ invalid_type_error: "Please select an author" }),
  readingTime: z.coerce.number(),
  publishedAt: z.date().nullish(),
  updatedAt: z.date().default(new Date()),
  createdAt: z.date().default(new Date()),
  isSlideshow: z.boolean().default(false),
  mainImageUrl: z.string().url().nullish(),
  status: z.enum(["draft", "published", "archived"]).default("draft"),

  // TODO
  // author: z.any().optional(),
  // categories: z.array(z.any()).optional(),
});
