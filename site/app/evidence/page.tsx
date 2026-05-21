import { getArrInstallData } from "@/lib/arr/install";
import { getArrSnapshot } from "@/lib/arr/snapshot";

export default async function EvidencePage() {
  const install = await getArrInstallData();
  const snapshot = await getArrSnapshot();

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
