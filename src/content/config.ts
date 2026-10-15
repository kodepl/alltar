import { defineCollection, z } from 'astro:content';

const karta = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string(),
    authorBio: z.string(),
    category: z.enum(['Na stole', 'W kuchni', 'Po gościach']),
    tags: z.array(z.string()),
    readingTime: z.number(),
    image: z.string().url(),
    imageCaption: z.string(),
  }),
});

export const collections = { karta };
