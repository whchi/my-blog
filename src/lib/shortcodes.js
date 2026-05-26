const blockShortcodes = new Set([
  "archives",
  "interest-calculator",
  "search-html-ascii",
  "vix-wit-dxy",
]);

export function transformHugoShortcodes(markdown, options = {}) {
  if (typeof markdown !== "string" || markdown.length === 0) return markdown;

  let output = markdown;

  output = output.replace(/\{\{<!--[\s\S]*?-->\}\}/g, "");

  output = output.replace(
    /\{\{<\s*mermaid\s*>\}\}([\s\S]*?)\{\{<\s*\/mermaid\s*>\}\}/g,
    (_match, body) => `<pre class="mermaid">${escapeHtml(body.trim())}</pre>`,
  );

  output = output.replace(/\{\{<\s*figure\s+([\s\S]*?)>\}\}/g, (_match, attrs) => {
    const params = parseParams(attrs);
    const src = params.src ?? "";
    const title = params.title ?? "";
    const alt = params.alt ?? title ?? "";
    const caption = params.caption ?? "";
    const titleAttr = title ? ` title="${escapeAttribute(title)}"` : "";
    const captionHtml = caption ? `<figcaption>${escapeHtml(caption)}</figcaption>` : "";

    return `<figure class="post-figure"><img src="${escapeAttribute(src)}" alt="${escapeAttribute(alt)}" loading="lazy" decoding="async"${titleAttr}>${captionHtml}</figure>`;
  });

  output = output.replace(
    /\{\{<\s*youtube\s+([^>\s]+)\s*>\}\}/g,
    (_match, id) =>
      `<lite-youtube videoid="${escapeAttribute(id)}"><iframe src="https://www.youtube.com/embed/${escapeAttribute(id)}" title="YouTube video player" loading="lazy" allowfullscreen></iframe></lite-youtube>`,
  );

  output = output.replace(
    /\{\{<\s*gist\s+([^>\s=]+)(?:="")?\s*>\}\}/g,
    (_match, id) => `<script src="https://gist.github.com/${escapeAttribute(id)}.js"></script>`,
  );

  output = output.replace(
    /\{\{<\s*gptt\s+([^>\s]+)\s*>\}\}/g,
    (_match, id) =>
      `<iframe src="https://docs.google.com/presentation/d/e/${escapeAttribute(id)}/embed?start=false&loop=false&delayms=3000&embeded=true" loading="lazy" allowfullscreen></iframe>`,
  );

  output = output.replace(
    /\{\{<\s*ref\s+"?([^">]+)"?\s*>\}\}/g,
    (_match, target) => options.resolveRef?.(target.trim()) ?? `/${target.trim()}/`,
  );

  output = output.replace(/\{\{<\s*table(?:\s+([^>]+))?\s*>\}\}/g, (_match, klass = "") => {
    const className = klass.trim().replace(/^"|"$/g, "");
    return className ? `<div class="table-scroll ${escapeAttribute(className)}">` : `<div class="table-scroll">`;
  });
  output = output.replace(/\{\{<\s*\/\s*table\s*>\}\}/g, "</div>");

  for (const shortcode of blockShortcodes) {
    const pattern = new RegExp(`\\{\\{[%<]\\s*${shortcode}\\s*[%>]\\}\\}`, "g");
    output = output.replace(pattern, "");
  }

  return output;
}

export function parseParams(input) {
  const params = {};
  const pattern = /([A-Za-z0-9_-]+)=("[^"]*"|'[^']*'|[^\s]+)/g;
  let match;

  while ((match = pattern.exec(input)) !== null) {
    params[match[1]] = match[2].replace(/^["']|["']$/g, "");
  }

  return params;
}

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/"/g, "&quot;");
}
