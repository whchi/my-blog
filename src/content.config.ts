import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const markdownSchema = z
  .object({
    title: z.string(),
    date: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    author: z.string().optional(),
    tags: z.array(z.string()).default([]),
    summary: z.string().optional(),
    preview_figure: z.string().optional(),
    preview_figcaption: z.string().optional(),
    preview_image: z.string().optional(),
    toc: z.boolean().optional(),
    nodate: z.boolean().optional(),
    noshowdate: z.boolean().optional(),
    nocomments: z.boolean().optional(),
    nopagination: z.boolean().optional(),
    market_defaults: z
      .object({
        vix: z.number().optional(),
        wti: z.number().optional(),
        dxy: z.number().optional(),
        updated_at: z.string().optional(),
      })
      .optional(),
  })
  .passthrough();

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./.astro/content/posts" }),
  schema: markdownSchema.extend({
    date: z.coerce.date(),
  }),
});

const tools = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./.astro/content/tools" }),
  schema: markdownSchema,
});

const pages = defineCollection({
  loader: glob({ pattern: "*.md", base: "./.astro/content" }),
  schema: markdownSchema,
});

export const collections = { pages, posts, tools };
