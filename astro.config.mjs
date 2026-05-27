import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://d6i.dev",
  output: "static",
  publicDir: "./static",
  outDir: "./dist",
  integrations: [sitemap(), mdx()],
  trailingSlash: "never",
  markdown: {
    shikiConfig: {
      theme: "github-dark",
    },
  },
});
