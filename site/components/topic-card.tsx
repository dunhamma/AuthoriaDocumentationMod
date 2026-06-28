import Link from "next/link";
import {
  ArrowUpRight,
  BookOpenText,
  Compass,
  Map,
  Settings2,
  ShieldAlert,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { ReferenceEntry } from "@/lib/content/schema";
import { getArticleHref } from "@/lib/content/routes";

const kindStyles = {
  systemArticle: {
    label: "System",
    icon: BookOpenText,
    accent: "text-teal-700",
    surface: "bg-teal-50",
  },
  companionArticle: {
    label: "Companion",
    icon: Users,
    accent: "text-indigo-700",
    surface: "bg-indigo-50",
  },
  regionGuide: {
    label: "Region",
    icon: Map,
    accent: "text-emerald-700",
    surface: "bg-emerald-50",
  },
  questArcGuide: {
    label: "Quest Arc",
    icon: Compass,
    accent: "text-amber-700",
    surface: "bg-amber-50",
  },
  presetFactReference: {
    label: "Settings",
    icon: Settings2,
    accent: "text-sky-700",
    surface: "bg-sky-50",
  },
  evidenceDossier: {
    label: "Evidence",
    icon: ShieldAlert,
    accent: "text-rose-700",
    surface: "bg-rose-50",
  },
} as const;

export function TopicCard({ entry }: { entry: ReferenceEntry }) {
  const style = kindStyles[entry.kind];
  const Icon = style.icon;

  return (
    <Link
      href={getArticleHref(entry)}
      className="group block rounded-lg border border-black/8 bg-white px-5 py-5 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_18px_40px_-28px_rgba(15,23,42,0.35)]"
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div
            className={cn(
              "inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]",
              style.surface,
              style.accent,
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            {style.label}
          </div>
          <ArrowUpRight className="h-4 w-4 text-slate-400 transition group-hover:text-slate-900" />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold tracking-tight text-slate-950">
            {entry.title}
          </h3>
          <p className="text-sm leading-6 text-slate-600">{entry.summary}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {entry.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
