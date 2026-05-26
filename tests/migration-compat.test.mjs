import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  comparePostsNewestFirst,
  getPostPermalink,
  getPostSlug,
  getTagSlug,
  isPublished,
  normalizeTags,
} from "../src/lib/posts.js";

describe("content compatibility", () => {
  it("keeps the existing year/month/contentbasename post permalink", () => {
    const post = {
      id: "recommendations/how-to-do-great-work.md",
      data: { date: new Date("2025-08-09T13:00:00+08:00") },
    };

    assert.equal(getPostSlug(post), "how-to-do-great-work");
    assert.equal(getPostPermalink(post), "/2025/08/how-to-do-great-work/");
  });

  it("sorts posts newest first and excludes drafts", () => {
    const posts = [
      { id: "old.md", data: { date: new Date("2020-01-01"), draft: false } },
      { id: "draft.md", data: { date: new Date("2026-01-01"), draft: true } },
      { id: "new.md", data: { date: new Date("2024-01-01") } },
    ];

    assert.deepEqual(
      posts.filter(isPublished).sort(comparePostsNewestFirst).map((post) => post.id),
      ["new.md", "old.md"],
    );
  });

  it("normalizes frontmatter tags without losing display labels", () => {
    assert.deepEqual(normalizeTags(["TypeScript", "system design", "AI/LLM"]), [
      { label: "TypeScript", slug: "typescript" },
      { label: "system design", slug: "system-design" },
      { label: "AI/LLM", slug: "ai-llm" },
    ]);
    assert.equal(getTagSlug("中文 標籤"), encodeURIComponent("中文-標籤"));
  });
});
