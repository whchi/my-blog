import rss from "@astrojs/rss";

import { getAllPosts } from "../lib/content.js";
import { getPostPermalink, getSummary, SITE_DESCRIPTION, SITE_TITLE } from "../lib/posts.js";

export async function GET(context) {
  const posts = await getAllPosts();

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: getSummary(post),
      pubDate: post.data.date,
      link: getPostPermalink(post),
      categories: post.data.tags ?? [],
    })),
  });
}
