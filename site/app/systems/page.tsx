import { TopicBrowser } from "@/components/topic-browser";
import { getEntriesByKind } from "@/lib/content/catalog";

export default function SystemsPage() {
  return (
    <div className="space-y-8 pb-12">
      <TopicBrowser
        entries={getEntriesByKind("system")}
        heading="Systems"
        description="Systems pages explain how rulesets feel in play, how they shape progression, and which local evidence should be checked before trusting an assumption."
        lockedKind="system"
      />
    </div>
  );
}

