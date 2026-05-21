import { getArrInstallData } from "@/lib/arr/install";
import { getPresetFacts } from "@/lib/arr/presets";
import { getArrSnapshot } from "@/lib/arr/snapshot";
import { getAllEntries, getArticleHref, sectionDefinitions } from "@/lib/content/catalog";

export default async function EvidencePage() {
  const install = await getArrInstallData();
  const snapshot = await getArrSnapshot();
  const entries = getAllEntries();
  const facts = await getPresetFacts();
  const highConfidenceFacts = facts.filter((fact) => fact.confidence === "high");
  const quoteCount = entries.reduce(
    (total, entry) => total + entry.settingQuotes.length,
    0,
  );
  const evidenceCount = entries.reduce(
    (total, entry) => total + entry.evidence.length,
    0,
  );
  const verificationQueue = entries
    .filter((entry) => entry.verificationNotes.length > 0)
    .slice(0, 10);

  return (
    <div className="space-y-8 pb-12">
      <section className="space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-950">
          Evidence model
        </h1>
        <p className="max-w-4xl text-base leading-8 text-slate-600">
          The guide is meant to answer player questions quickly without losing
          track of authority. These are the files and runtime surfaces that
          should be checked before the app states a gameplay rule as fact.
        </p>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-4 rounded-lg border border-black/8 bg-white px-5 py-5">
          <h2 className="text-xl font-semibold tracking-tight text-slate-950">
            Source order
          </h2>
          <ol className="space-y-3 text-sm leading-7 text-slate-600">
            <li>ARR install root and selected profile files</li>
            <li>Enabled local mod folders and output folders</li>
            <li>Runtime-facing presets, MCM exports, and UI settings</li>
            <li>Upstream Nexus pages and GitHub repositories</li>
          </ol>
        </div>

        <aside className="rounded-lg border border-black/8 bg-slate-950 px-5 py-5 text-slate-100">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-300">
            Live profile
          </p>
          <p className="mt-4 text-2xl font-semibold tracking-tight">
            {snapshot.selectedProfile}
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            {snapshot.available
              ? "The file paths below were resolved against the local ARSE profile."
              : "The local report was unavailable, so these paths are the expected defaults from the repo context."}
          </p>
        </aside>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-lg border border-black/8 bg-white px-5 py-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
            Articles
          </p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
            {entries.length}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Public reference entries across systems, companions, regions, quest
            arcs, settings, and evidence.
          </p>
        </div>
        <div className="rounded-lg border border-black/8 bg-white px-5 py-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
            Setting quotes
          </p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
            {quoteCount}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Concrete values currently cited directly by article pages.
          </p>
        </div>
        <div className="rounded-lg border border-black/8 bg-white px-5 py-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-700">
            Evidence links
          </p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
            {evidenceCount}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Local paths attached to articles as provenance.
          </p>
        </div>
        <div className="rounded-lg border border-black/8 bg-white px-5 py-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-700">
            Extracted facts
          </p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
            {highConfidenceFacts.length}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            High-confidence local preset facts available for article work.
          </p>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
        <div className="rounded-lg border border-black/8 bg-white px-5 py-5">
          <h2 className="text-xl font-semibold tracking-tight text-slate-950">
            Article coverage
          </h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {sectionDefinitions.map((section) => {
              const sectionEntries = entries.filter(
                (entry) => entry.section === section.slug,
              );

              return (
                <div
                  key={section.slug}
                  className="rounded-lg border border-black/8 bg-slate-50 px-4 py-4"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="text-sm font-semibold text-slate-950">
                      {section.title}
                    </p>
                    <p className="font-mono text-sm text-slate-600">
                      {sectionEntries.length}
                    </p>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {section.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <aside className="rounded-lg border border-black/8 bg-white px-5 py-5">
          <h2 className="text-xl font-semibold tracking-tight text-slate-950">
            Verification queue
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            These are the next records or in-game checks most likely to convert
            current guidance into firmer ARR truth.
          </p>
          <div className="mt-5 space-y-3">
            {verificationQueue.map((entry) => (
              <a
                key={entry.slug}
                href={getArticleHref(entry)}
                className="block rounded-lg border border-black/8 bg-slate-50 px-4 py-4 transition hover:border-teal-300 hover:bg-teal-50/70"
              >
                <p className="text-sm font-semibold text-slate-950">
                  {entry.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {entry.verificationNotes[0]}
                </p>
              </a>
            ))}
          </div>
        </aside>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold tracking-tight text-slate-950">
          Core files
        </h2>
        <div className="space-y-3">
          {snapshot.evidencePaths.map((path) => (
            <div
              key={path}
              className="rounded-lg border border-black/8 bg-white px-4 py-4 font-mono text-xs leading-6 text-slate-800"
            >
              {path}
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        {install.evidenceSurfaces.map((surface) => (
          <div
            key={surface.title}
            className="rounded-lg border border-black/8 bg-white px-5 py-5"
          >
            <h3 className="text-lg font-semibold tracking-tight text-slate-950">
              {surface.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {surface.description}
            </p>
            <ul className="mt-4 space-y-2 font-mono text-xs leading-6 text-slate-700">
              {surface.paths.map((filePath) => (
                <li key={filePath}>{filePath}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {install.runtimeSurfaces.map((surface) => (
          <div
            key={surface.title}
            className="rounded-lg border border-black/8 bg-white px-5 py-5"
          >
            <h3 className="text-lg font-semibold tracking-tight text-slate-950">
              {surface.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {surface.description}
            </p>
            <p className="mt-3 font-mono text-xs leading-6 text-slate-700">
              {surface.path}
            </p>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-600">
              {surface.entries.slice(0, 12).map((entry) => (
                <li key={entry}>{entry}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <div className="rounded-lg border border-black/8 bg-white px-5 py-5">
          <h3 className="text-lg font-semibold tracking-tight text-slate-950">
            When a system claim looks too broad
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Check the local output layer and runtime presets before assuming the
            upstream description still holds.
          </p>
        </div>
        <div className="rounded-lg border border-black/8 bg-white px-5 py-5">
          <h3 className="text-lg font-semibold tracking-tight text-slate-950">
            When a UX claim sounds subjective
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Tie it to map settings, MCM exports, widgets, controller mappings,
            or profile-local INIs wherever possible.
          </p>
        </div>
        <div className="rounded-lg border border-black/8 bg-white px-5 py-5">
          <h3 className="text-lg font-semibold tracking-tight text-slate-950">
            When a quest or follower behaves oddly
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Look for Requiem compatibility outputs, NPC patchers, and local
            xEdit or CK results before writing an explanation.
          </p>
        </div>
      </section>
    </div>
  );
}
