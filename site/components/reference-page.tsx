import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import type { ReferenceEntry } from "@/lib/content/schema";
import { EvidenceList } from "@/components/evidence-list";

const headings = {
  system: "Systems",
  experience: "Experiences",
  mod: "Output Layer",
} as const;

export function ReferencePage({
  entry,
  related,
}: {
  entry: ReferenceEntry;
  related: ReferenceEntry[];
}) {
  return (
    <div className="space-y-10 pb-12">
      <section className="space-y-5">
        <Link
          href={`/${entry.kind}s`}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-950"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to {headings[entry.kind]}
        </Link>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-4">
            <div className="inline-flex rounded-lg bg-slate-950 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white">
              {headings[entry.kind].slice(0, -1)}
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
                UX touchpoints
              </p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                {entry.uxTouchpoints.map((item) => (
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
              Implementation chain
            </p>
            <div className="mt-4 space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-950">Upstream</h3>
                <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-600">
                  {entry.implementationChain.upstream.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-950">Requiem layer</h3>
                <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-600">
                  {entry.implementationChain.requiem.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-950">Authoria layer</h3>
                <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-600">
                  {entry.implementationChain.authoria.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Evidence
            </p>
            <EvidenceList evidence={entry.evidence} />
          </section>

          {related.length > 0 ? (
            <section className="rounded-lg border border-black/8 bg-white px-5 py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Related references
              </p>
              <div className="mt-4 space-y-3">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/${item.kind}s/${item.slug}`}
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

