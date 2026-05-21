import Link from "next/link";
import { ArrowUpRight, BookOpenText, Compass, FileSearch, Map, Settings2, Users } from "lucide-react";

import { TopicBrowser } from "@/components/topic-browser";
import {
  getAllEntries,
  getEntriesBySection,
  sectionDefinitions,
} from "@/lib/content/catalog";

const featuredSections = [
  "start-here",
  "progression",
  "combat",
  "survival",
  "companions",
  "regions",
  "quest-arcs",
  "settings",
] as const;

const sectionIcons = {
  "start-here": Compass,
  progression: BookOpenText,
  combat: BookOpenText,
  survival: Map,
  companions: Users,
  regions: Map,
  "quest-arcs": BookOpenText,
  settings: Settings2,
  evidence: FileSearch,
} as const;

export default function Home() {
  const entries = getAllEntries();

  return (
    <div className="space-y-8 pb-12">
      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-4 rounded-lg border border-black/8 bg-white px-6 py-6">
          <div className="inline-flex rounded-lg bg-teal-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
            Article-grade reference
          </div>
          <div className="space-y-3">
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-950">
              How Authoria actually plays
            </h1>
            <p className="max-w-4xl text-base leading-8 text-slate-600">
              This guide turns the old gameplay checklist into evidence-backed
              articles about progression, combat, survival, companions, routes,
              quest arcs, and concrete local settings. The public surface is a
              play guide, not a rendered mod list.
            </p>
          </div>
        </div>

        <aside className="rounded-lg border border-black/8 bg-slate-950 px-5 py-5 text-slate-100">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-300">
            Coverage target
          </p>
          <p className="mt-4 text-2xl font-semibold tracking-tight">
            {entries.length} article seeds
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Every article is expected to explain what the player sees, why it
            behaves that way, what is safe or risky, and which local evidence
            supports the claim.
          </p>
        </aside>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {featuredSections.map((slug) => {
          const section = sectionDefinitions.find((item) => item.slug === slug);
          if (!section) {
            return null;
          }

          const Icon = sectionIcons[section.slug];
          const count = getEntriesBySection(section.slug).length;

          return (
            <Link
              key={section.slug}
              href={`/${section.slug}`}
              className="group rounded-lg border border-black/8 bg-white px-5 py-5 transition hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-[0_18px_40px_-28px_rgba(15,23,42,0.35)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="rounded-lg bg-slate-950 p-2 text-white transition group-hover:bg-teal-700">
                  <Icon className="h-4 w-4" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-slate-400 transition group-hover:text-slate-900" />
              </div>
              <h2 className="mt-4 text-lg font-semibold tracking-tight text-slate-950">
                {section.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {section.description}
              </p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
                {count} articles
              </p>
            </Link>
          );
        })}
      </section>

      <TopicBrowser
        entries={entries}
        heading="Reference browser"
        description="Search by the question a player would ask: where to start, what is safe, which companion changes a route, how a system works, or what a setting means."
      />
    </div>
  );
}
