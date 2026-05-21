import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import type { ReferenceEntry } from "@/lib/content/schema";
import type { PresetFact } from "@/lib/arr/presets";
import { EvidenceList } from "@/components/evidence-list";
import { getArticleHref, getSection } from "@/lib/content/catalog";

const headings = {
  systemArticle: "System",
  companionArticle: "Companion",
  regionGuide: "Region",
  questArcGuide: "Quest Arc",
  presetFactReference: "Settings",
  evidenceDossier: "Evidence",
} as const;

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

  return (
    <div className="space-y-10 pb-12">
      <section className="space-y-5">
        <Link
          href={`/${entry.section}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-950"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to {section?.title ?? headings[entry.kind]}
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
                Reader questions
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

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-lg border border-black/8 bg-white px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
                Player experience
              </p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                {entry.playerExperience.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-black/8 bg-white px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
                Progression impact
              </p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                {entry.progressionImpact.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-black/8 bg-white px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-700">
                Practical guidance
              </p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                {entry.practicalGuidance.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-4">
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
        </div>

        <div className="space-y-6">
          <section className="rounded-lg border border-black/8 bg-white px-5 py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Provenance
            </p>
            <div className="mt-4 space-y-3">
              {entry.evidenceDossier.map((item) => (
                <div key={item.publicLabel}>
                  <h3 className="text-sm font-semibold text-slate-950">
                    {item.publicLabel}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {item.internalSources.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {entry.settingQuotes.length > 0 || presetFacts.length > 0 ? (
            <section className="rounded-lg border border-black/8 bg-white px-5 py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Quoteable settings
              </p>
              <div className="mt-4 space-y-4">
                {entry.settingQuotes.map((quote) => (
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
                      {fact.publicLabel}: {fact.section}.{fact.key} = {fact.value}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {fact.interpretation}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          <section className="rounded-lg border border-black/8 bg-white px-5 py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              UX touchpoints
            </p>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-600">
              {entry.uxTouchpoints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Evidence
            </p>
            <EvidenceList evidence={entry.evidence} />
          </section>

          {entry.verificationNotes.length > 0 ? (
            <section className="rounded-lg border border-black/8 bg-amber-50 px-5 py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800">
                Verification notes
              </p>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-amber-950">
                {entry.verificationNotes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {related.length > 0 ? (
            <section className="rounded-lg border border-black/8 bg-white px-5 py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Related references
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
    </div>
  );
}
