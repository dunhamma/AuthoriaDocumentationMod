import { notFound } from "next/navigation";

import { ReferencePage } from "@/components/reference-page";
import {
  getEntry,
  getRelatedEntries,
  getRoutableEntries,
  getSection,
} from "@/lib/content/catalog";
import { findPresetFacts, getPresetFacts } from "@/lib/arr/presets";
import type { ReferenceSection } from "@/lib/content/schema";

export function generateStaticParams() {
  return getRoutableEntries().map((entry) => ({
    section: entry.section,
    slug: entry.slug,
  }));
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ section: string; slug: string }>;
}) {
  const { section: rawSection, slug } = await params;
  const section = getSection(rawSection);

  if (!section) {
    notFound();
  }

  const entry = getEntry(section.slug as ReferenceSection, slug);
  if (!entry) {
    notFound();
  }

  const facts = await getPresetFacts();
  const quoteFactIds = entry.settingQuotes.map((quote) => quote.factId);

  return (
    <ReferencePage
      entry={entry}
      related={getRelatedEntries(entry.related)}
      presetFacts={findPresetFacts(quoteFactIds, facts)}
    />
  );
}
