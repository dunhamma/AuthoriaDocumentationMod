import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  ClipboardList,
  FileSearch,
  Info,
} from "lucide-react";

import type { ReferenceEntry } from "@/lib/content/schema";
import type { PresetFact } from "@/lib/arr/presets";
import { EvidenceList } from "@/components/evidence-list";
import { getSection } from "@/lib/content/catalog";
import { getArticleHref } from "@/lib/content/routes";

const headings = {
  systemArticle: "Guide",
  companionArticle: "Companion Guide",
  regionGuide: "Region Guide",
  questArcGuide: "Quest Guide",
  presetFactReference: "Source Notes",
  evidenceDossier: "Source Notes",
} as const;

function SourceNotes({
  entry,
  presetFacts,
}: {
  entry: ReferenceEntry;
  presetFacts: PresetFact[];
}) {
  const sourceLabels = [
    ...entry.evidenceDossier.map((item) => item.publicLabel),
    ...entry.evidence.map((item) => item.label),
  ];

  return (
    <section className="rounded-lg border border-black/8 bg-white px-5 py-5">
      <div className="flex items-start gap-3">
        <div className="rounded-lg bg-slate-950 p-2 text-white">
          <FileSearch className="h-4 w-4" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Source notes
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            These notes keep the advice tied to Authoria without making the
            guide read like a setup file.
          </p>
        </div>
      </div>

      {sourceLabels.length > 0 ? (
        <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-600">
          {Array.from(new Set(sourceLabels)).map((label) => (
            <li key={label}>{label}</li>
          ))}
        </ul>
      ) : null}

      {entry.settingQuotes.length > 0 || presetFacts.length > 0 ? (
        <div className="mt-5 space-y-3">
          {[...entry.settingQuotes].map((quote) => (
            <div key={quote.factId} className="rounded-lg bg-slate-50 px-4 py-3">
              <p className="text-sm font-semibold text-slate-950">
                {quote.label}: {quote.value}
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                {quote.interpretation}
              </p>
            </div>
          ))}
          {presetFacts.map((fact) => (
            <div key={fact.id} className="rounded-lg bg-slate-50 px-4 py-3">
              <p className="text-sm font-semibold text-slate-950">
                {fact.publicLabel}: {fact.value}
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                {fact.interpretation}
              </p>
            </div>
          ))}
        </div>
      ) : null}

      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          href="/settings/preset-facts"
          className="inline-flex items-center gap-2 rounded-lg border border-black/8 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-teal-300 hover:bg-teal-50"
        >
          Preset source notes
          <ArrowUpRight className="h-4 w-4" />
        </Link>
        <Link
          href="/evidence"
          className="inline-flex items-center gap-2 rounded-lg border border-black/8 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-teal-300 hover:bg-teal-50"
        >
          Evidence view
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

export function ReferencePage({
  entry,
  related,
  presetFacts = [],
}: {
  entry: ReferenceEntry;
  related: ReferenceEntry[];
  presetFacts?: PresetFact[];
}) {
  const section = getSection(entry.section);
  const isProofPage = entry.section === "settings" || entry.section === "evidence";

  return (
    <div className="space-y-8 pb-12">
      <section className="border-b border-black/8 pb-8">
        <Link
          href={isProofPage ? "/" : `/${entry.section}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-950"
        >
          <ArrowLeft className="h-4 w-4" />
          {isProofPage ? "Back to Almanac" : `Back to ${section?.title ?? "Guides"}`}
        </Link>

        <div className="mt-6 grid gap-7 xl:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-5">
            <div className="inline-flex rounded-lg bg-slate-950 px-3 py-1.5 text-xs font-semibold uppercase text-white">
              {headings[entry.kind]}
            </div>
            <div className="space-y-3">
              <h1 className="max-w-4xl text-4xl font-semibold text-slate-950">
                {entry.title}
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-700">
                {entry.strapline}
              </p>
              <p className="max-w-4xl text-base leading-8 text-slate-600">
                {entry.summary}
              </p>
            </div>
          </div>

          <aside className="rounded-lg border border-teal-200 bg-teal-50/70 px-5 py-5">
            <p className="text-xs font-semibold uppercase text-teal-800">
              Check before you start
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
              {entry.questionsAnswered.map((question) => (
                <li key={question} className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-teal-700" />
                  <span>{question}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {isProofPage ? (
        <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-6">
            {entry.sections.map((section) => (
              <section
                key={section.title}
                className="rounded-lg border border-black/8 bg-white px-5 py-5"
              >
                <h2 className="text-xl font-semibold tracking-tight text-slate-950">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.bullets ? (
                    <ul className="space-y-2">
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </section>
            ))}
          </div>

          <div className="space-y-6">
            <section className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Technical evidence
              </p>
              <EvidenceList evidence={entry.evidence} />
            </section>
          </div>
        </section>
      ) : (
        <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-8">
            <section className="rounded-lg border border-teal-900/10 bg-white px-5 py-5 shadow-[0_18px_45px_-35px_rgba(15,23,42,0.45)]">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-teal-700 p-2 text-white">
                  <ClipboardList className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-teal-800">
                    Do this first
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Work through these before you chase the next objective.
                  </p>
                </div>
              </div>
              <ol className="mt-5 grid gap-3 md:grid-cols-2">
                {entry.practicalGuidance.map((item, index) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-lg bg-teal-50/70 px-4 py-3 text-sm leading-6 text-slate-700"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-teal-800">
                      {index + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </section>

            <div className="grid gap-4 lg:grid-cols-2">
              <section className="rounded-lg border border-amber-200 bg-amber-50/50 px-5 py-5">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-amber-700" />
                  <p className="text-xs font-semibold uppercase text-amber-800">
                    Know this before you leave town
                  </p>
                </div>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                  {entry.playerExperience.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-lg border border-rose-200 bg-rose-50/50 px-5 py-5">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-rose-700" />
                  <p className="text-xs font-semibold uppercase text-rose-800">
                    Watch out for
                  </p>
                </div>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                  {entry.progressionImpact.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <section className="space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase text-slate-500">
                  What changed from vanilla Skyrim
                </p>
              </div>
              {entry.sections.map((section) => (
                <section
                  key={section.title}
                  className="border-t border-black/8 pt-5"
                >
                  <h2 className="text-xl font-semibold text-slate-950">
                    {section.title}
                  </h2>
                  <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {section.bullets ? (
                      <ul className="space-y-2">
                        {section.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </section>
              ))}
            </section>
          </div>

          <div className="space-y-6 xl:sticky xl:top-8 xl:self-start">
            <SourceNotes entry={entry} presetFacts={presetFacts} />

            <section className="rounded-lg border border-black/8 bg-white px-5 py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                You will touch
              </p>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-600">
                {entry.uxTouchpoints.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            {related.length > 0 ? (
              <section className="rounded-lg border border-black/8 bg-white px-5 py-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Read next
                </p>
                <div className="mt-4 space-y-3">
                  {related.map((item) => (
                    <Link
                      key={item.slug}
                      href={getArticleHref(item)}
                      className="flex items-start justify-between gap-3 rounded-lg border border-black/8 px-4 py-3 transition hover:border-slate-300 hover:bg-slate-50"
                    >
                      <div>
                        <p className="text-sm font-semibold text-slate-950">
                          {item.title}
                        </p>
                        <p className="mt-1 text-sm leading-6 text-slate-600">
                          {item.strapline}
                        </p>
                      </div>
                      <ArrowUpRight className="mt-1 h-4 w-4 text-slate-400" />
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </section>
      )}
    </div>
  );
}
