import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { z } from 'astro/zod';

const docs = defineCollection({
  loader: docsLoader(),
  schema: docsSchema({
    extend: z.object({
      // Legacy custom fields used by some content files; optional so Starlight
      // built-in content (index etc.) doesn't require them.
      section: z
        .enum(['getting-started', 'skills', 'examples', 'faq'])
        .optional(),
      order: z.number().optional(),
      navTitle: z.string().optional(),
      category: z.string().optional(),
    }),
  }),
});

export const collections = { docs };
