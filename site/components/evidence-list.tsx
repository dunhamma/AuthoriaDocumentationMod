import type { EvidenceItem } from "@/lib/content/schema";

export function EvidenceList({ evidence }: { evidence: EvidenceItem[] }) {
  return (
    <div className="space-y-3">
      {evidence.map((item) => (
        <div
          key={`${item.label}-${item.path}`}
          className="rounded-lg border border-black/8 bg-white px-4 py-4"
        >
          <p className="text-sm font-semibold text-slate-950">{item.label}</p>
          <p className="mt-2 break-all rounded-md bg-slate-950 px-3 py-2 font-mono text-xs leading-5 text-slate-100">
            {item.path}
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-600">{item.note}</p>
        </div>
      ))}
    </div>
  );
}

