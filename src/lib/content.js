import { getCollection } from "astro:content";

import {
  comparePostsNewestFirst,
  getTagSlug,
  isPublished,
  normalizeTags,
} from "./posts.js";

export async function getAllPosts() {
  const posts = await getCollection("posts");
  return posts.filter(isPublished).sort(comparePostsNewestFirst);
}

export async function getAllTags() {
  const posts = await getAllPosts();
  const bySlug = new Map();

  for (const post of posts) {
    for (const tag of normalizeTags(post.data.tags)) {
      const current = bySlug.get(tag.slug) ?? { ...tag, count: 0, posts: [] };
      current.count += 1;
      current.posts.push(post);
      bySlug.set(tag.slug, current);
    }
  }

  return [...bySlug.values()].sort((a, b) => a.label.localeCompare(b.label, "zh-TW"));
}

export async function getPageById(id) {
  const pages = await getCollection("pages");
  return pages.find((page) => page.id === `${id}.md` || page.id === id);
}

export async function getTagWithPosts(labelOrSlug) {
  const slug = getTagSlug(decodeURIComponent(labelOrSlug));
  const tags = await getAllTags();
  return tags.find((tag) => tag.slug === slug);
}
