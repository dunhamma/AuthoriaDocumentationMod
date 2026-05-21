import { TopicBrowser } from "@/components/topic-browser";
import { getEntriesBySection } from "@/lib/content/catalog";
import { getPresetFacts } from "@/lib/arr/presets";

export default async function SettingsPage() {
  const facts = await getPresetFacts();
  const highlightedFacts = facts.filter((fact) => fact.confidence === "high");

  return (
    <div className="space-y-8 pb-12">
      <TopicBrowser
        entries={getEntriesBySection("settings")}
        heading="Settings"
        description="Concrete local preset values that article pages can quote when explaining gameplay behavior."
      />

      <section className="rounded-lg border border-black/8 bg-white px-5 py-5">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
            Extracted facts
          </p>
          <h2 className="text-xl font-semibold tracking-tight text-slate-950">
            High-confidence preset values
          </h2>
          <p className="max-w-3xl text-sm leading-6 text-slate-600">
            These values come from local ARR preset files. They are suitable as
            article evidence, but the gameplay interpretation still belongs in
            the article text.
          </p>
        </div>

        <div className="mt-5 grid gap-3 xl:grid-cols-2">
          {highlightedFacts.map((fact) => (
            <div
              key={fact.id}
              className="rounded-lg border border-black/8 bg-slate-50 px-4 py-4"
            >
              <p className="text-sm font-semibold text-slate-950">
                {fact.publicLabel}
              </p>
              <p className="mt-2 font-mono text-xs leading-6 text-slate-700">
                {fact.section}.{fact.key} = {fact.value}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {fact.interpretation}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
