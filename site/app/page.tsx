import { AlertTriangle, Database, Layers3, ScrollText } from "lucide-react";

import { TopicBrowser } from "@/components/topic-browser";
import { getArrInstallData } from "@/lib/arr/install";
import { getArrSnapshot } from "@/lib/arr/snapshot";
import { getAllEntries } from "@/lib/content/catalog";

function StatTile({
  label,
  value,
  detail,
  icon: Icon,
}: {
  label: string;
  value: string;
  detail: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="rounded-lg border border-black/8 bg-white px-5 py-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            {label}
          </p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
            {value}
          </p>
        </div>
        <div className="rounded-lg bg-slate-950 p-2 text-white">
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600">{detail}</p>
    </div>
  );
}

export default async function Home() {
  const install = await getArrInstallData();
  const snapshot = await getArrSnapshot();
  const entries = getAllEntries();

  return (
    <div className="space-y-8 pb-12">
      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-4 rounded-lg border border-black/8 bg-white px-6 py-6">
          <div className="inline-flex rounded-lg bg-teal-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
            Live reference workspace
          </div>
          <div className="space-y-3">
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-950">
              A playable guide to how Authoria actually works
            </h1>
            <p className="max-w-4xl text-base leading-8 text-slate-600">
              This reader blends curated gameplay interpretation with the live
              ARR install. The aim is to answer player questions quickly while
              keeping the source-of-truth order visible: local install first,
              upstream pages second.
            </p>
          </div>
        </div>

        <aside className="rounded-lg border border-black/8 bg-slate-950 px-5 py-5 text-slate-100">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-300">
            ARR snapshot
          </p>
          <div className="mt-4 space-y-3">
            <p className="text-2xl font-semibold tracking-tight">
              Profile {snapshot.selectedProfile}
            </p>
            <p className="text-sm leading-6 text-slate-300">
              {snapshot.available
                ? "Live counts are coming from the local ARSE report."
                : "Live ARR files were unavailable, so the reader is showing curated content only."}
            </p>
          </div>
          <ul className="mt-5 space-y-2 text-sm leading-6 text-slate-300">
            {snapshot.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatTile
          label="Enabled mods"
          value={String(snapshot.totals.enabledMods)}
          detail="Live count from modlist_report_gold.csv for the selected profile."
          icon={Database}
        />
        <StatTile
          label="Authoria mods"
          value={String(snapshot.totals.authoriaMods)}
          detail="Enabled local mods with Authoria-owned naming in the live report."
          icon={Layers3}
        />
        <StatTile
          label="Requiem stack"
          value={String(snapshot.totals.requiemMods)}
          detail="Enabled mods whose names explicitly reference Requiem in the live profile."
          icon={ScrollText}
        />
        <StatTile
          label="Custom mods"
          value={String(snapshot.totals.customMods)}
          detail="Enabled mods flagged as custom in the ARR report."
          icon={AlertTriangle}
        />
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <div className="rounded-lg border border-black/8 bg-white px-5 py-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
            Authoria highlights
          </p>
          <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-600">
            {snapshot.highlights.authoria.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-black/8 bg-white px-5 py-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
            Requiem highlights
          </p>
          <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-600">
            {snapshot.highlights.requiem.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-black/8 bg-white px-5 py-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-700">
            Evidence order
          </p>
          <ol className="mt-4 space-y-2 text-sm leading-6 text-slate-600">
            <li>ARR install and selected profile files</li>
            <li>Enabled local mod folders</li>
            <li>Authoria output and preset layers</li>
            <li>Upstream Nexus and GitHub references</li>
          </ol>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        {install.topicClusters.slice(0, 3).map((cluster) => (
          <div
            key={cluster.slug}
            className="rounded-lg border border-black/8 bg-white px-5 py-5"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
              Atlas cluster
            </p>
            <h2 className="mt-3 text-xl font-semibold tracking-tight text-slate-950">
              {cluster.title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {cluster.summary}
            </p>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-600">
              {cluster.mods.slice(0, 5).map((mod) => (
                <li key={mod}>{mod}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <TopicBrowser
        entries={entries}
        heading="Reference browser"
        description="Search by the question a player would ask, not by the plugin they happen to remember. The current seed focuses on progression, onboarding, travel pressure, map UX, and the local output layer."
      />
    </div>
  );
}
