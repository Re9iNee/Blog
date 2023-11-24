import { z } from "zod";

export const postSchema = z.object({
  id: z.number(),

  title: z.string(),
  summery: z.string(),
  readingTime: z.number(),
  body: z.string().optional(),
  publishedAt: z.date().nullish(),

  mainImageUrl: z.string().url().optional(),
  published: z.boolean().default(false),

  //   categories   Category[]
  //   authorId:      Int
});

export type Post = z.infer<typeof postSchema>;
