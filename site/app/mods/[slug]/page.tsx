import { notFound } from "next/navigation";

import { ReferencePage } from "@/components/reference-page";
import { getEntriesByKind, getEntry, getRelatedEntries } from "@/lib/content/catalog";

export function generateStaticParams() {
  return getEntriesByKind("mod").map((entry) => ({ slug: entry.slug }));
}

export default async function ModDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getEntry("mod", slug);
  if (!entry) {
    notFound();
  }

  return <ReferencePage entry={entry} related={getRelatedEntries(entry.related)} />;
}
