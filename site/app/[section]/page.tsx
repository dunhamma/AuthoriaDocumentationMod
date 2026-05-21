import { notFound } from "next/navigation";

import { TopicBrowser } from "@/components/topic-browser";
import {
  getEntriesBySection,
  getSection,
  sectionDefinitions,
} from "@/lib/content/catalog";
import type { ReferenceSection } from "@/lib/content/schema";

export function generateStaticParams() {
  return sectionDefinitions.map((section) => ({ section: section.slug }));
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section: rawSection } = await params;
  const section = getSection(rawSection);

  if (!section) {
    notFound();
  }

  return (
    <div className="space-y-8 pb-12">
      <TopicBrowser
        entries={getEntriesBySection(section.slug as ReferenceSection)}
        heading={section.title}
        description={section.description}
      />
    </div>
  );
}
