import { defineCollection, z } from 'astro:content';

// externalUrl + ctaUrl accept either absolute URL or site-internal "/" path.
const linkOrUrl = z.string().refine(
  v => v.startsWith('/') || /^https?:\/\//.test(v),
  { message: 'Must be an absolute URL (http://) or a site-internal path starting with /' }
);

const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    externalUrl: linkOrUrl.optional(),
    tags: z.array(z.string()).default([]),
  }),
});

const landings = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    externalUrl: linkOrUrl.optional(),
    tags: z.array(z.string()).default([]),
    ctaLabel: z.string().optional(),
    ctaUrl: linkOrUrl.optional(),
  }),
});

export const collections = { notes, landings };
