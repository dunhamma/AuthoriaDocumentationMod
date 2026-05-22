import { cache } from "react";
import { promises as fs } from "node:fs";
import path from "node:path";

export type ArrRecordEvidenceStatus =
  | "planned"
  | "exported"
  | "reviewed"
  | "playtested";

export type ArrRecordEvidence = {
  id: string;
  sourcePath: string;
  pluginOrConfigSurface: string;
  recordId?: string;
  claimSupported: string;
  status: ArrRecordEvidenceStatus;
  notes: string;
};

export type ArrRecordEvidenceData = {
  available: boolean;
  records: ArrRecordEvidence[];
  notes: string[];
};

const recordEvidencePath = path.join(
  process.cwd(),
  "data",
  "arr-record-evidence.json",
);

function isRecordEvidence(value: unknown): value is ArrRecordEvidence {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<ArrRecordEvidence>;
  return Boolean(
    candidate.id &&
      candidate.sourcePath &&
      candidate.pluginOrConfigSurface &&
      candidate.claimSupported &&
      candidate.status &&
      candidate.notes,
  );
}

export const getArrRecordEvidence = cache(
  async (): Promise<ArrRecordEvidenceData> => {
    try {
      const raw = await fs.readFile(recordEvidencePath, "utf8");
      const parsed = JSON.parse(raw) as unknown;
      const records = Array.isArray(parsed)
        ? parsed.filter(isRecordEvidence)
        : [];

      return {
        available: records.length > 0,
        records,
        notes:
          records.length > 0
            ? [
                "Record-level evidence loaded from exported ARR evidence data.",
              ]
            : [
                "Record-level evidence export exists, but no valid records were found.",
              ],
      };
    } catch {
      return {
        available: false,
        records: [],
        notes: [
          "Record-level evidence is planned but has not been exported yet.",
          "Future xEdit exports should write guide-ready JSON to site/data/arr-record-evidence.json.",
        ],
      };
    }
  },
);
