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
import { transformHugoShortcodes } from "../src/lib/shortcodes.js";

describe("Hugo migration compatibility", () => {
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

  it("converts common Hugo shortcodes to static Astro-safe HTML", () => {
    const markdown = [
      '{{< figure src="/images/demo.webp" alt="Demo" caption="A demo" >}}',
      '{{< youtube dQw4w9WgXcQ >}}',
      "{{< mermaid >}}",
      "graph TD; A-->B;",
      "{{< /mermaid >}}",
      "{{< figure",
      '    src="/images/multiline.webp"',
      '    title="Multiline"',
      '    caption="Wrapped attrs">}}',
    ].join("\n");

    const html = transformHugoShortcodes(markdown, {
      resolveRef: (target) => `/2024/01/${target}/`,
    });

    assert.match(html, /<figure class="post-figure">/);
    assert.match(html, /<img src="\/images\/demo.webp" alt="Demo" loading="lazy"/);
    assert.match(html, /<figcaption>A demo<\/figcaption>/);
    assert.match(html, /youtube\.com\/embed\/dQw4w9WgXcQ/);
    assert.match(html, /<pre class="mermaid">graph TD; A--&gt;B;<\/pre>/);
    assert.match(html, /src="\/images\/multiline.webp"/);
  });

  it("handles compact shortcode variants found in existing posts", () => {
    const html = transformHugoShortcodes(
      '{{<!-- table -->}}\n{{<table "table table-bordered" >}}\n| A |\n| - |\n{{</table>}}\n{{<gist d753f513f6819de03d3e958da55af404="">}}',
    );

    assert.match(html, /<div class="table-scroll table table-bordered">/);
    assert.doesNotMatch(html, /\{\{<!--/);
    assert.doesNotMatch(html, /\{\{<\/?table/);
    assert.match(html, /https:\/\/gist\.github\.com\/d753f513f6819de03d3e958da55af404\.js/);
    assert.doesNotMatch(html, /\{\{<gist/);
  });
});
