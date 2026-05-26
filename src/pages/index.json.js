import { getAllPosts } from "../lib/content.js";
import { getPostPermalink, getSummary } from "../lib/posts.js";

export async function GET() {
  const posts = await getAllPosts();
  const items = posts.map((post) => {
    const content = stripMarkdown(post.body ?? "");
    return {
      title: post.data.title,
      permalink: getPostPermalink(post),
      summary: getSummary(post),
      tags: post.data.tags ?? [],
      content,
      contents: content,
    };
  });

  return new Response(JSON.stringify(items), {
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

function stripMarkdown(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_`[\]()-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
