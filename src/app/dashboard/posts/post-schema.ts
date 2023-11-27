import { z } from "zod";

export const postSchema = z.object({
  id: z.number().optional(),

  title: z.string(),
  summery: z.string(),
  authorId: z.number(),
  readingTime: z.coerce.number(),
  body: z.string().optional(),
  publishedAt: z.date().nullish(),
  mainImageUrl: z.string().url().optional(),
  updatedAt: z.date().default(new Date()),
  createdAt: z.date().default(new Date()),
  status: z.enum(["draft", "published", "archived"]).default("draft"),

  // TODO
  author: z.any().optional(),
  categories: z.array(z.any()).optional(),
});
