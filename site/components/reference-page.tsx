import Link from "next/link";
import { ArrowLeft, ArrowUpRight, FileSearch } from "lucide-react";

import type { ReferenceEntry } from "@/lib/content/schema";
import type { PresetFact } from "@/lib/arr/presets";
import { EvidenceList } from "@/components/evidence-list";
import { getArticleHref, getSection } from "@/lib/content/catalog";

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
    <div className="space-y-10 pb-12">
      <section className="space-y-5">
        <Link
          href={isProofPage ? "/" : `/${entry.section}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-950"
        >
          <ArrowLeft className="h-4 w-4" />
          {isProofPage ? "Back to Almanac" : `Back to ${section?.title ?? "Guides"}`}
        </Link>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-4">
            <div className="inline-flex rounded-lg bg-slate-950 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white">
              {headings[entry.kind]}
            </div>
            <div className="space-y-3">
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-950">
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

          <aside className="space-y-4 rounded-lg border border-black/8 bg-white px-5 py-5">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">
                Before you act
              </p>
              <ul className="space-y-2 text-sm leading-6 text-slate-600">
                {entry.questionsAnswered.map((question) => (
                  <li key={question}>{question}</li>
                ))}
              </ul>
            </div>
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
          <div className="space-y-6">
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="rounded-lg border border-black/8 bg-white px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
                  Do this first
                </p>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                  {entry.practicalGuidance.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg border border-black/8 bg-white px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
                  Know this before you leave town
                </p>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                  {entry.playerExperience.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg border border-black/8 bg-white px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-700">
                  Watch out for
                </p>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                  {entry.progressionImpact.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <section className="space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  What changed from vanilla Skyrim
                </p>
              </div>
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
            </section>
          </div>

          <div className="space-y-6">
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
