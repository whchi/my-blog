import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://d6i.dev",
  output: "static",
  publicDir: "./static",
  outDir: "./dist",
  integrations: [sitemap(), mdx()],
  trailingSlash: "always",
  build: {
    format: "directory",
    minify: true,
  },
  markdown: {
    shikiConfig: {
      theme: "github-dark",
    },
  },
});
