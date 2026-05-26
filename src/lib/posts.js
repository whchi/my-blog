export const SITE_TITLE = "社畜人生";
export const SITE_DESCRIPTION = "技術筆記、工具與一些工程現場的碎念。";
export const PAGE_SIZE = 10;

export function isPublished(entry) {
  return entry?.data?.draft !== true;
}

export function comparePostsNewestFirst(a, b) {
  return getTimestamp(b) - getTimestamp(a);
}

export function getPostSlug(entry) {
  const id = entry?.id ?? "";
  const filename = id.split("/").pop() ?? id;
  return filename.replace(/\.(md|mdx)$/i, "");
}

export function getPostPermalink(entry) {
  const date = toDate(entry?.data?.date);
  const year = String(date.getFullYear()).padStart(4, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `/${year}/${month}/${getPostSlug(entry)}/`;
}

export function normalizeTags(tags = []) {
  if (!Array.isArray(tags)) return [];
  return tags
    .filter((tag) => typeof tag === "string" && tag.trim().length > 0)
    .map((tag) => tag.trim())
    .map((label) => ({ label, slug: getTagSlug(label) }));
}

export function getTagSlug(label) {
  return encodeURIComponent(
    String(label)
      .trim()
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9\u3400-\u9fff]+/gi, "-")
      .replace(/^-+|-+$/g, ""),
  );
}

export function getTimestamp(entry) {
  return toDate(entry?.data?.date).getTime();
}

export function toDate(value) {
  if (value instanceof Date) return value;
  const date = new Date(value ?? 0);
  return Number.isNaN(date.getTime()) ? new Date(0) : date;
}

export function formatDate(value, locale = "zh-TW") {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(toDate(value));
}

export function getSummary(entry, fallback = "") {
  return entry?.data?.summary || entry?.data?.description || fallback;
}
