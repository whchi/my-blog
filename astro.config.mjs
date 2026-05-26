import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

import { transformHugoShortcodes } from "./src/lib/shortcodes.js";

export default defineConfig({
  site: "https://d6i.dev",
  output: "static",
  publicDir: "./static",
  outDir: "./dist",
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      theme: "github-dark",
    },
  },
  vite: {
    plugins: [
      {
        name: "hugo-shortcode-compat",
        enforce: "pre",
        transform(code, id) {
          if (!id.includes("/content/") || !id.endsWith(".md")) return null;
          const transformed = transformHugoShortcodes(code);
          // Skip if no change to avoid unnecessary re-processing
          if (transformed === code) return null;
          return {
            code: transformed,
            map: null,
          };
        },
      },
    ],
  },
});
