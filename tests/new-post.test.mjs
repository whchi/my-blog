import assert from "node:assert/strict";
import { mkdtemp, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, it } from "node:test";

import { createPost } from "../scripts/new-post.mjs";

describe("new post script", () => {
  it("creates an mdx post under content/posts with the generated date", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "new-post-"));
    const now = new Date("2026-06-09T10:11:12+08:00");

    const result = await createPost("recommendations/example-post", { root, now });
    const expectedPath = path.join(root, "content/posts/recommendations/example-post.mdx");

    assert.equal(result.filePath, expectedPath);
    assert.equal(
      await readFile(expectedPath, "utf8"),
      `---
title: 
date: 2026-06-09T10:11:12+08:00
draft: true
author: 'whchi'
tags: []
summary: ''
preview_figure: ''
preview_figcaption: ''
---
`,
    );
  });

  it("keeps paths inside content/posts", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "new-post-"));

    await assert.rejects(
      () => createPost("../outside", { root, now: new Date("2026-06-09T10:11:12+08:00") }),
      /inside content\/posts/,
    );
  });
});
