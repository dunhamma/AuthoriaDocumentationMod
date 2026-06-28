import { cache } from "react";

import type { ArrModRecord } from "@/lib/arr/install";
import { getArrInstallData } from "@/lib/arr/install";

export type ArrSnapshot = {
  available: boolean;
  selectedProfile: string;
  totals: {
    allMods: number;
    enabledMods: number;
    customMods: number;
    authoriaMods: number;
    authoriaModsInReport: number;
    generatedOutputMods: number;
    requiemMods: number;
  };
  highlights: {
    authoria: string[];
    requiem: string[];
    custom: string[];
  };
  evidencePaths: string[];
  notes: string[];
};

function sliceNames(
  entries: ArrModRecord[],
  predicate: (entry: ArrModRecord) => boolean,
  limit = 6,
) {
  return entries
    .filter(predicate)
    .sort((left, right) => {
      const leftPriority = left.priority ?? Number.MAX_SAFE_INTEGER;
      const rightPriority = right.priority ?? Number.MAX_SAFE_INTEGER;
      return leftPriority - rightPriority;
    })
    .slice(0, limit)
    .map((entry) => entry.name);
}

function dedupe(items: string[]) {
  return Array.from(new Set(items));
}

export const getArrSnapshot = cache(async (): Promise<ArrSnapshot> => {
  const install = await getArrInstallData();
  const { groups, records, selectedProfile } = install;
  const enabledRecords = records.filter((entry) => entry.enabled);
  const enabledModlistNames = dedupe(
    groups.flatMap((group) => group.enabledMods),
  );
  const enabledModuleNames = enabledModlistNames.length
    ? enabledModlistNames
    : enabledRecords.map((entry) => entry.name);
  const authoriaMatcher = /authoria|auhoria/i;
  const generatedMatcher =
    /output|cache|dyndolod|texgen|xlodgen|synthesis|rfti|pandora|pg/i;
  const requiemMatcher = /requiem/i;
  const authoriaModules = enabledModuleNames.filter((name) =>
    authoriaMatcher.test(name),
  );
  const generatedOutputs = authoriaModules.filter((name) =>
    generatedMatcher.test(name),
  );
  const reportAuthoriaCount = enabledRecords.filter((entry) =>
    authoriaMatcher.test(entry.name),
  ).length;

  return {
    available: install.available,
    selectedProfile,
    totals: {
      allMods: records.length,
      enabledMods: enabledRecords.length,
      customMods: enabledRecords.filter((entry) => entry.custom).length,
      authoriaMods: authoriaModules.length,
      authoriaModsInReport: reportAuthoriaCount,
      generatedOutputMods: generatedOutputs.length,
      requiemMods: enabledRecords.filter((entry) =>
        requiemMatcher.test(entry.name),
      ).length,
    },
    highlights: {
      authoria: authoriaModules.slice(0, 8),
      requiem: sliceNames(
        enabledRecords,
        (entry) => requiemMatcher.test(entry.name),
        8,
      ),
      custom: sliceNames(enabledRecords, (entry) => entry.custom, 8),
    },
    evidencePaths: [
      ...install.evidenceSurfaces[0].paths,
    ],
    notes: records.length
      ? [
          ...install.notes,
          ...(authoriaModules.length !== reportAuthoriaCount
            ? [
                "Authoria module inventory uses modlist.txt because the generated CSV report can lag behind profile changes.",
              ]
            : []),
          "Counts reflect the local install rather than upstream mod metadata.",
        ]
      : install.notes,
  };
});
