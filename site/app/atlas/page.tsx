import { getArrInstallData } from "@/lib/arr/install";

export default async function AtlasPage() {
  const install = await getArrInstallData();

  return (
    <div className="space-y-8 pb-12">
      <section className="space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-950">
          Content atlas
        </h1>
        <p className="max-w-4xl text-base leading-8 text-slate-600">
          This atlas rolls the live ARR install into reader-first clusters. It
          is the fastest route to answering what kinds of gameplay, quest,
          follower, and UX systems are actually present before drilling into a
          single reference page.
        </p>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {install.topicClusters.map((cluster) => (
          <article
            key={cluster.slug}
            className="rounded-lg border border-black/8 bg-white px-5 py-5"
          >
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
                Cluster
              </p>
              <h2 className="text-xl font-semibold tracking-tight text-slate-950">
                {cluster.title}
              </h2>
              <p className="text-sm leading-6 text-slate-600">
                {cluster.summary}
              </p>
            </div>

            {cluster.groupNames.length > 0 ? (
              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  MO2 groups
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {cluster.groupNames.map((group) => (
                    <span
                      key={group}
                      className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700"
                    >
                      {group}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Representative enabled mods
              </p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                {cluster.mods.slice(0, 12).map((mod) => (
                  <li key={mod}>{mod}</li>
                ))}
              </ul>
            </div>

            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Evidence paths
              </p>
              <ul className="mt-3 space-y-2 font-mono text-xs leading-6 text-slate-700">
                {cluster.evidence.map((evidence) => (
                  <li key={evidence}>{evidence}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
        <div className="rounded-lg border border-black/8 bg-white px-5 py-5">
          <h2 className="text-xl font-semibold tracking-tight text-slate-950">
            High-signal MO2 groups
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
            These groups come directly from the selected profile&apos;s
            `modlist.txt`. They are useful when a reader asks what content stack
            a topic belongs to before they know the exact plugin name.
          </p>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {install.groups
              .filter((group) => group.enabledMods.length >= 4)
              .slice(0, 12)
              .map((group) => (
                <div
                  key={group.name}
                  className="rounded-lg border border-black/8 bg-slate-50 px-4 py-4"
                >
                  <p className="text-sm font-semibold text-slate-950">
                    {group.name}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">
                    {group.enabledMods.length} enabled mods
                  </p>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                    {group.enabledMods.slice(0, 6).map((mod) => (
                      <li key={mod}>{mod}</li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </div>

        <aside className="space-y-4">
          {install.runtimeSurfaces.map((surface) => (
            <section
              key={surface.title}
              className="rounded-lg border border-black/8 bg-white px-5 py-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
                {surface.title}
              </p>
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
            </section>
          ))}
        </aside>
      </section>
    </div>
  );
}

