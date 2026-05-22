import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { getPresetFacts } from "@/lib/arr/presets";

export default async function SettingsPage() {
  const facts = await getPresetFacts();
  const highlightedFacts = facts.filter((fact) => fact.confidence === "high");

  return (
    <div className="space-y-8 pb-12">
      <section className="rounded-lg border border-black/8 bg-white px-5 py-5">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
            Source notes
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
            Preset Source Notes
          </h1>
          <p className="max-w-3xl text-sm leading-6 text-slate-600">
            These values support Almanac guidance. They stay out of the main
            guide path so players can read advice before auditing settings.
          </p>
        </div>

        <Link
          href="/settings/preset-facts"
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
        >
          Open preset source page
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </section>

      <section className="rounded-lg border border-black/8 bg-white px-5 py-5">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
            Extracted facts
          </p>
          <h2 className="text-xl font-semibold tracking-tight text-slate-950">
            High-confidence preset values
          </h2>
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
