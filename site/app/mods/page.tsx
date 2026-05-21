import { TopicBrowser } from "@/components/topic-browser";
import { getEntriesByKind } from "@/lib/content/catalog";

export default function ModsPage() {
  return (
    <div className="space-y-8 pb-12">
      <TopicBrowser
        entries={getEntriesByKind("mod")}
        heading="Output Layer"
        description="These pages focus on the local modules that turn upstream mods into the final Authoria build, especially where late outputs become the real source of truth."
        lockedKind="mod"
      />
    </div>
  );
}

