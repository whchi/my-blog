# Astro local workflow

This site is migrated from Hugo to Astro while keeping the existing authoring model.

## Authoring

- Write articles as Markdown under `content/posts/`.
- Write tool pages as Markdown under `content/tools/`.
- Keep `content/tools/vix-wit-dxy.md` in place because `.github/workflows/update-vix-wit-dxy.yml` updates that file.
- Existing Hugo-style post URLs are preserved as `/:year/:month/:contentbasename/`.
- Existing tool URLs are preserved as `/tools/:slug.html`.
- Astro reads generated compatibility Markdown from `.astro/content/`; keep editing the source files in `content/`.

## Local review

```bash
npm install
npm run dev
```

Use `npm run build` to produce static output in `dist/`, and `npm run preview` to review that output locally.

The npm lifecycle scripts run `scripts/prepare-astro-content.mjs` before `dev`, `check`, `build`, and `preview`.

## Cloudflare

Cloudflare deployment is configured outside this repository. The repository only needs to provide a static build:

- Build command: `npm run build`
- Output directory: `dist`

Do not add local deploy scripts, secrets, or Cloudflare production configuration unless explicitly requested.
