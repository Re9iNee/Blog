import { z } from "zod";

export const postSchema = z.object({
  id: z.number().optional(),

  body: z.string(),
  title: z.string(),
  summary: z.string(),
  authorId: z.number(),
  readingTime: z.coerce.number(),
  publishedAt: z.date().nullish(),
  updatedAt: z.date().default(new Date()),
  createdAt: z.date().default(new Date()),
  isSlideshow: z.boolean().default(false),
  mainImageUrl: z.string().url().nullish(),
  status: z.enum(["draft", "published", "archived"]).default("draft"),

  // TODO
  author: z.any().optional(),
  categories: z.array(z.any()).optional(),
});
