import Link from "next/link";
import {
  BookOpenText,
  Compass,
  FileSearch,
  Layers3,
  ShieldAlert,
  Waypoints,
} from "lucide-react";

type SiteShellProps = {
  children: React.ReactNode;
};

const primaryLinks = [
  {
    href: "/",
    label: "Overview",
    detail: "Live ARR snapshot and topic browser",
    icon: Compass,
  },
  {
    href: "/systems",
    label: "Systems",
    detail: "Progression, travel, maps, and UX",
    icon: Layers3,
  },
  {
    href: "/atlas",
    label: "Atlas",
    detail: "Live content clusters from ARR",
    icon: Waypoints,
  },
  {
    href: "/experiences",
    label: "Experiences",
    detail: "Player journeys and onboarding paths",
    icon: BookOpenText,
  },
  {
    href: "/mods",
    label: "Output Layer",
    detail: "Local patches and generated behavior",
    icon: ShieldAlert,
  },
  {
    href: "/evidence",
    label: "Evidence",
    detail: "Where each claim should be verified",
    icon: FileSearch,
  },
] as const;

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f6f7f4_0%,#eef1ef_40%,#f6f7f4_100%)] text-slate-900">
      <div className="mx-auto grid min-h-screen max-w-[1600px] grid-cols-1 gap-0 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="border-b border-black/8 bg-white/80 px-6 py-8 backdrop-blur lg:border-r lg:border-b-0 lg:px-7">
          <div className="space-y-8">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-700">
                Authoria Reference
              </p>
              <div className="space-y-2">
                <p className="text-[1.75rem] font-semibold tracking-tight text-slate-950">
                  Gameplay guide for the live ARR build
                </p>
                <p className="max-w-sm text-sm leading-6 text-slate-600">
                  A reader-first view of how Authoria actually plays, with
                  local evidence and patch provenance kept visible.
                </p>
              </div>
            </div>

            <nav className="space-y-2" aria-label="Primary">
              {primaryLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group block rounded-lg border border-black/8 bg-white px-4 py-3 transition hover:border-teal-300 hover:bg-teal-50/70"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-lg bg-slate-950 p-2 text-white transition group-hover:bg-teal-700">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-950">
                          {link.label}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-slate-600">
                          {link.detail}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </nav>

            <section className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                Operating rule
              </p>
              <p className="text-sm leading-6 text-slate-600">
                Document the game as it exists in
                {" "}
                <span className="font-medium text-slate-950">
                  D:\Wabbajack\modlists\ARR
                </span>
                , not as upstream pages describe it in isolation.
              </p>
            </section>
          </div>
        </aside>

        <main className="min-w-0 px-5 py-6 sm:px-8 lg:px-10 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
