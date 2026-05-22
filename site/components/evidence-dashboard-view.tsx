import type { EvidenceDashboard } from "@/lib/evidence/dashboard";

export function EvidenceDashboardView({
  dashboard,
}: {
  dashboard: EvidenceDashboard;
}) {
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
            {dashboard.snapshot.selectedProfile}
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            {dashboard.snapshot.available
              ? "The file paths below were resolved against the local ARSE profile."
              : "The local report was unavailable, so these paths are the expected defaults from the repo context."}
          </p>
        </aside>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <MetricCard
          accent="text-teal-700"
          label="Articles"
          value={dashboard.counts.articles}
          description="Public reference entries across systems, companions, regions, quest arcs, settings, and evidence."
        />
        <MetricCard
          accent="text-amber-700"
          label="Setting quotes"
          value={dashboard.counts.settingQuotes}
          description="Concrete values currently cited directly by article pages."
        />
        <MetricCard
          accent="text-rose-700"
          label="Evidence links"
          value={dashboard.counts.evidenceLinks}
          description="Local paths attached to articles as provenance."
        />
        <MetricCard
          accent="text-sky-700"
          label="Seeded articles"
          value={dashboard.counts.seededArticles}
          description="Entries still carrying verification notes or broad local support."
        />
        <MetricCard
          accent="text-indigo-700"
          label="Extracted facts"
          value={dashboard.counts.highConfidenceFacts}
          description="High-confidence local preset facts available for article work."
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="rounded-lg border border-black/8 bg-white px-5 py-5">
          <h2 className="text-xl font-semibold tracking-tight text-slate-950">
            Article verification states
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            These maintainer states connect the article-grade guide to the
            playable ARR build. Public pages can stay player-facing while this
            view tracks how much local proof sits behind the prose.
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {dashboard.verificationSummary.map((item) => (
              <div
                key={item.state}
                className="rounded-lg border border-black/8 bg-slate-50 px-4 py-4"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-950">
                    {item.label}
                  </p>
                  <p className="font-mono text-sm text-slate-600">
                    {item.count}
                  </p>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-lg border border-black/8 bg-white px-5 py-5">
          <h2 className="text-xl font-semibold tracking-tight text-slate-950">
            Record evidence adapter
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Record-level facts should be exported into guide-ready JSON before
            article code consumes them. The current adapter is ready for that
            data without parsing binary plugins in the app.
          </p>
          <p className="mt-5 text-3xl font-semibold tracking-tight text-slate-950">
            {dashboard.recordEvidence.records.length}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {dashboard.recordEvidence.available
              ? "Record-level evidence records are available."
              : "Record-level evidence export is planned."}
          </p>
          <div className="mt-4 space-y-2">
            {dashboard.recordEvidence.notes.map((note) => (
              <p key={note} className="text-sm leading-6 text-slate-600">
                {note}
              </p>
            ))}
          </div>
        </aside>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
        <div className="rounded-lg border border-black/8 bg-white px-5 py-5">
          <h2 className="text-xl font-semibold tracking-tight text-slate-950">
            Article coverage
          </h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {dashboard.articleCoverage.map((section) => (
              <div
                key={section.slug}
                className="rounded-lg border border-black/8 bg-slate-50 px-4 py-4"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-950">
                    {section.title}
                  </p>
                  <p className="font-mono text-sm text-slate-600">
                    {section.articleCount}
                  </p>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {section.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {section.stateCounts.map((item) => (
                    <span
                      key={item.state}
                      className="rounded bg-white px-2 py-1 text-xs font-medium text-slate-600"
                    >
                      {item.label}: {item.count}
                    </span>
                  ))}
                </div>
              </div>
            ))}
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
            {dashboard.verificationQueue.map((entry) => (
              <a
                key={entry.slug}
                href={entry.href}
                className="block rounded-lg border border-black/8 bg-slate-50 px-4 py-4 transition hover:border-teal-300 hover:bg-teal-50/70"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-950">
                    {entry.title}
                  </p>
                  <span className="rounded bg-white px-2 py-1 text-xs font-medium text-slate-600">
                    {entry.verification.label}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {entry.firstVerificationNote}
                </p>
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  {entry.verification.source === "explicit"
                    ? "Explicit maintainer state"
                    : "Derived maintainer state"}
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
          {dashboard.snapshot.evidencePaths.map((path) => (
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
        {dashboard.install.evidenceSurfaces.map((surface) => (
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
        {dashboard.install.runtimeSurfaces.map((surface) => (
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
        <AdviceCard
          title="When a system claim looks too broad"
          description="Check the local output layer and runtime presets before assuming the upstream description still holds."
        />
        <AdviceCard
          title="When a UX claim sounds subjective"
          description="Tie it to map settings, MCM exports, widgets, controller mappings, or profile-local INIs wherever possible."
        />
        <AdviceCard
          title="When a quest or follower behaves oddly"
          description="Look for Requiem compatibility outputs, NPC patchers, and local xEdit or CK results before writing an explanation."
        />
      </section>
    </div>
  );
}

function MetricCard({
  accent,
  label,
  value,
  description,
}: {
  accent: string;
  label: string;
  value: number;
  description: string;
}) {
  return (
    <div className="rounded-lg border border-black/8 bg-white px-5 py-5">
      <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${accent}`}>
        {label}
      </p>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
        {value}
      </p>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}

function AdviceCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border border-black/8 bg-white px-5 py-5">
      <h3 className="text-lg font-semibold tracking-tight text-slate-950">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}
