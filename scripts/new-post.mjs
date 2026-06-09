import { mkdir, open } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const POSTS_DIR = "content/posts";

function pad(value) {
  return String(value).padStart(2, "0");
}

function formatLocalDateTime(date) {
  const offsetMinutes = -date.getTimezoneOffset();
  const offsetSign = offsetMinutes >= 0 ? "+" : "-";
  const absoluteOffset = Math.abs(offsetMinutes);

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(
    date.getHours(),
  )}:${pad(date.getMinutes())}:${pad(date.getSeconds())}${offsetSign}${pad(
    Math.floor(absoluteOffset / 60),
  )}:${pad(absoluteOffset % 60)}`;
}

function normalizePostPath(postPath) {
  if (!postPath || postPath.trim() === "") {
    throw new Error("Post path is required.");
  }

  const normalized = postPath.trim().replaceAll("\\", "/");
  if (path.posix.isAbsolute(normalized)) {
    throw new Error("Post path must stay inside content/posts.");
  }

  const withExtension = path.posix.extname(normalized) ? normalized : `${normalized}.mdx`;
  const parts = withExtension.split("/");

  if (parts.includes("..") || parts.includes(".") || parts.some((part) => part === "")) {
    throw new Error("Post path must stay inside content/posts.");
  }

  return withExtension;
}

function renderFrontMatter(date) {
  return `---
title: 
date: ${formatLocalDateTime(date)}
draft: true
author: 'whchi'
tags: []
summary: ''
preview_figure: ''
preview_figcaption: ''
---
`;
}

export async function createPost(postPath, options = {}) {
  const root = options.root ?? process.cwd();
  const now = options.now ?? new Date();
  const relativePostPath = normalizePostPath(postPath);
  const postsRoot = path.resolve(root, POSTS_DIR);
  const filePath = path.resolve(postsRoot, relativePostPath);

  if (!filePath.startsWith(`${postsRoot}${path.sep}`)) {
    throw new Error("Post path must stay inside content/posts.");
  }

  await mkdir(path.dirname(filePath), { recursive: true });

  const file = await open(filePath, "wx");
  try {
    await file.writeFile(renderFrontMatter(now), "utf8");
  } finally {
    await file.close();
  }

  return { filePath };
}

async function main() {
  const postPath = process.argv[2];

  try {
    const result = await createPost(postPath);
    console.log(`Created ${path.relative(process.cwd(), result.filePath)}`);
  } catch (error) {
    console.error(error.message);
    console.error("Usage: npm run new-post -- path/from/posts");
    process.exitCode = 1;
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await main();
}
