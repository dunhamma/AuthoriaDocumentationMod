import Link from "next/link";
import {
  ArrowUpRight,
  BookOpenText,
  Compass,
  FileSearch,
  Flame,
  Map,
  Settings2,
  Users,
} from "lucide-react";

import { TopicBrowser } from "@/components/topic-browser";
import {
  getEntriesBySection,
  getPublicEntries,
  sectionDefinitions,
} from "@/lib/content/catalog";

const featuredSections = [
  "survival",
  "start-here",
  "progression",
  "combat",
  "companions",
  "regions",
  "quest-arcs",
] as const;

const sectionIcons = {
  "start-here": Compass,
  progression: BookOpenText,
  combat: BookOpenText,
  survival: Flame,
  companions: Users,
  regions: Map,
  "quest-arcs": BookOpenText,
  settings: Settings2,
  evidence: FileSearch,
} as const;

export default function Home() {
  const entries = getPublicEntries();

  return (
    <div className="space-y-8 pb-12">
      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-5 rounded-lg border border-black/8 bg-white px-6 py-6">
          <div className="inline-flex rounded-lg bg-teal-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
            Authoria Almanac
          </div>
          <div className="space-y-3">
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-950">
              Survive Your First Week
            </h1>
            <p className="max-w-4xl text-base leading-8 text-slate-600">
              Authoria still begins in Skyrim, but the first week asks for more
              care than a vanilla run. Eat before long roads, sleep before cold
              weather, use towns as anchors, and treat early dungeons as a
              decision rather than a reflex.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/survival/survival-seasons-and-travel"
              className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
            >
              Start with survival
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/progression/route-readiness-and-return-rules"
              className="inline-flex items-center gap-2 rounded-lg border border-black/8 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-teal-300 hover:bg-teal-50"
            >
              Plan a safe route
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/regions/riverwood-whiterun-early-hub"
              className="inline-flex items-center gap-2 rounded-lg border border-black/8 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-teal-300 hover:bg-teal-50"
            >
              Find your first hub
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <aside className="rounded-lg border border-black/8 bg-slate-950 px-5 py-5 text-slate-100">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-300">
            First-week checklist
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
            <li>Rest before leaving a warm hub.</li>
            <li>Carry food, recovery supplies, and a way back.</li>
            <li>Take short work before remote quests.</li>
            <li>Use Riverwood and Whiterun as your first safety loop.</li>
            <li>Assume Requiem makes bad fights worse than you remember.</li>
          </ul>
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
        heading="Almanac guides"
        description="Search by the question you would ask before acting: where to start, what is safe, which companion changes a route, or how a system differs from vanilla Skyrim."
      />
    </div>
  );
}
