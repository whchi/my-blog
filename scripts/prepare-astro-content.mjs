import { mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";

import { transformHugoShortcodes } from "../src/lib/shortcodes.js";

const sourceRoot = path.resolve("content");
const outputRoot = path.resolve(".astro/content");

await copyDirectory(sourceRoot, outputRoot);

async function copyDirectory(source, output) {
  await mkdir(output, { recursive: true });
  const entries = await readdir(source);

  for (const entry of entries) {
    if (entry === ".DS_Store") continue;

    const sourcePath = path.join(source, entry);
    const outputPath = path.join(output, entry);
    const info = await stat(sourcePath);

    if (info.isDirectory()) {
      await copyDirectory(sourcePath, outputPath);
      continue;
    }

    const content = await readFile(sourcePath, "utf8");
    const next = sourcePath.endsWith(".md") ? transformHugoShortcodes(content) : content;
    await writeFile(outputPath, next);
  }
}
