import { defineCollection, z } from 'astro:content';

const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    externalUrl: z.string().url().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { notes };
