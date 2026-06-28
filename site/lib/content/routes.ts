import type { ReferenceEntry } from "@/lib/content/schema";

export function getArticleHref(entry: Pick<ReferenceEntry, "section" | "slug">) {
  return `/${entry.section}/${entry.slug}`;
}
