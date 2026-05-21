import { TopicBrowser } from "@/components/topic-browser";
import { getEntriesByKind } from "@/lib/content/catalog";

export default function ExperiencesPage() {
  return (
    <div className="space-y-8 pb-12">
      <TopicBrowser
        entries={getEntriesByKind("experience")}
        heading="Experiences"
        description="Experience pages are written around player journeys: how a first session, route, or style of play unfolds once the full ARR stack is active."
        lockedKind="experience"
      />
    </div>
  );
}

