"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { Search } from "lucide-react";

import type { ReferenceEntry, ReferenceKind } from "@/lib/content/schema";
import { TopicCard } from "@/components/topic-card";

type TopicBrowserProps = {
  entries: ReferenceEntry[];
  heading: string;
  description: string;
  lockedKind?: ReferenceKind;
};

const filterOptions: { value: ReferenceKind | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "system", label: "Systems" },
  { value: "experience", label: "Experiences" },
  { value: "mod", label: "Output Layer" },
];

export function TopicBrowser({
  entries,
  heading,
  description,
  lockedKind,
}: TopicBrowserProps) {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<ReferenceKind | "all">(lockedKind ?? "all");
  const deferredQuery = useDeferredValue(query);

  const filteredEntries = useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLowerCase();
    return entries.filter((entry) => {
      const kindMatches =
        lockedKind !== undefined
          ? entry.kind === lockedKind
          : kind === "all" || entry.kind === kind;

      if (!kindMatches) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const haystack = [
        entry.title,
        entry.strapline,
        entry.summary,
        ...entry.tags,
        ...entry.questionsAnswered,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [deferredQuery, entries, kind, lockedKind]);

  return (
    <section className="space-y-5">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
          {heading}
        </h2>
        <p className="max-w-3xl text-sm leading-6 text-slate-600">
          {description}
        </p>
      </div>

      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto]">
        <label className="flex items-center gap-3 rounded-lg border border-black/8 bg-white px-4 py-3">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search systems, experiences, outputs, or player questions"
            className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
          />
        </label>

        {!lockedKind ? (
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => {
              const active = kind === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setKind(option.value)}
                  className={[
                    "rounded-lg border px-3 py-2 text-sm font-medium transition",
                    active
                      ? "border-slate-950 bg-slate-950 text-white"
                      : "border-black/8 bg-white text-slate-700 hover:border-slate-300",
                  ].join(" ")}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {filteredEntries.map((entry) => (
          <TopicCard key={`${entry.kind}-${entry.slug}`} entry={entry} />
        ))}
      </div>

      {filteredEntries.length === 0 ? (
        <div className="rounded-lg border border-dashed border-black/10 bg-white px-5 py-10 text-sm text-slate-600">
          No topics matched the current filter. Narrow the question or add a new
          reference topic to the catalog.
        </div>
      ) : null}
    </section>
  );
}

