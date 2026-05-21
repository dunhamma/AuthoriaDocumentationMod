import { cache } from "react";
import { promises as fs } from "node:fs";
import path from "node:path";

import { parseCsv } from "@/lib/arr/csv";
import { arrPaths, DEFAULT_PROFILE } from "@/lib/arr/paths";

export type ArrModRecord = {
  name: string;
  version: string;
  enabled: boolean;
  priority: number | null;
  custom: boolean;
  pluginHashes: string[];
};

export type ArrModGroup = {
  name: string;
  enabledMods: string[];
  disabledMods: string[];
};

export type ArrRuntimeSurface = {
  title: string;
  description: string;
  path: string;
  entries: string[];
};

export type ArrEvidenceSurface = {
  title: string;
  description: string;
  paths: string[];
};

export type ArrTopicCluster = {
  slug: string;
  title: string;
  summary: string;
  groupNames: string[];
  mods: string[];
  evidence: string[];
};

export type ArrInstallData = {
  available: boolean;
  selectedProfile: string;
  records: ArrModRecord[];
  groups: ArrModGroup[];
  runtimeSurfaces: ArrRuntimeSurface[];
  evidenceSurfaces: ArrEvidenceSurface[];
  topicClusters: ArrTopicCluster[];
  notes: string[];
};

type TopicClusterDefinition = {
  slug: string;
  title: string;
  summary: string;
  groupMatchers: RegExp[];
  modMatchers: RegExp[];
  evidence: string[];
};

const topicClusterDefinitions: TopicClusterDefinition[] = [
  {
    slug: "progression",
    title: "Progression and Requiem",
    summary:
      "Progression pressure is driven by Requiem, Experience, economy tweaks, and late local compatibility outputs.",
    groupMatchers: [/Gameplay - Requiem/i],
    modMatchers: [
      /requiem/i,
      /^experience$/i,
      /trade and barter/i,
      /bounty hunter/i,
    ],
    evidence: [
      arrPaths.profileReport(),
      arrPaths.mcmSetting("Requiem.ini"),
      arrPaths.mcmSetting("trade & barter.ini"),
      arrPaths.sksePlugin("Experience.ini"),
      arrPaths.authoriaXEditOutput,
    ],
  },
  {
    slug: "combat",
    title: "Combat Readability and Dodge",
    summary:
      "Combat feel is a combined result of dodge tooling, wounds, animation overrides, and Requiem combat expectations.",
    groupMatchers: [/Animations - Dodge Animations/i, /Gameplay - Requiem/i],
    modMatchers: [
      /dodge/i,
      /wounds/i,
      /precision/i,
      /directional/i,
      /parry/i,
      /custom movesets/i,
    ],
    evidence: [
      arrPaths.mcmSetting("TKDodgeAddon.ini"),
      arrPaths.mcmSetting("TrueDirectionalMovement.ini"),
      arrPaths.mcmSetting("Wounds.ini"),
      arrPaths.authoriaCustomMovesets,
      arrPaths.authoriaMcmIniSettings,
    ],
  },
  {
    slug: "survival",
    title: "Survival and Travel",
    summary:
      "Travel burden is shaped by SunHelm, Frostfall-adjacent presets, route legibility, and the paper map stack.",
    groupMatchers: [/Gameplay - Requiem/i, /Flat Map World Framework/i],
    modMatchers: [
      /sunhelm/i,
      /frostfall/i,
      /camping/i,
      /map/i,
      /survival/i,
      /waterskin/i,
    ],
    evidence: [
      arrPaths.mcmRecorderProfile("KoK_Base"),
      arrPaths.sunhelmConfigDir,
      arrPaths.mapMarkersConfig,
      arrPaths.profileModlist(),
    ],
  },
  {
    slug: "followers",
    title: "Followers and Party Play",
    summary:
      "Follower power, chatter, and compatibility are being actively curated rather than left to vanilla follower behavior.",
    groupMatchers: [/Modded Followers/i, /Weaker Followers/i],
    modMatchers: [
      /follower/i,
      /companion/i,
      /kaidan/i,
      /inigo/i,
      /lucien/i,
      /xelzaz/i,
      /auri/i,
      /remiel/i,
      /party/i,
    ],
    evidence: [
      arrPaths.mcmSetting("Follower Stats.ini"),
      arrPaths.profileModlist(),
      arrPaths.authoriaMcmIniSettings,
      arrPaths.authoriaXEditOutput,
    ],
  },
  {
    slug: "quests",
    title: "Questing, Missives, and Open-World Work",
    summary:
      "ARR appears to support a broad open-world task loop through missives, bounty systems, and Requiem-aware quest patching.",
    groupMatchers: [/Gameplay - Missives/i],
    modMatchers: [
      /missives/i,
      /headhunter/i,
      /bounty/i,
      /quest/i,
      /sirenroot/i,
      /wyrmstooth/i,
    ],
    evidence: [
      arrPaths.mcmSetting("Missives.ini"),
      arrPaths.mcmSetting("trade & barter.ini"),
      arrPaths.profileModlist(),
      arrPaths.authoriaXEditOutput,
    ],
  },
  {
    slug: "vicn",
    title: "Vicn and New-Lands Content",
    summary:
      "Large quest and worldspace content is being carried with dedicated map support, delayed starts, and Requiem-aware compatibility.",
    groupMatchers: [/Glenmoril/i, /Unslaad/i, /Vigilant/i],
    modMatchers: [
      /glenmoril/i,
      /unslaad/i,
      /vigilant/i,
      /midnight sun/i,
      /olenveld/i,
      /icemoth/i,
    ],
    evidence: [
      arrPaths.profileModlist(),
      arrPaths.profileReport(),
      arrPaths.authoriaXEditOutput,
      arrPaths.authoriaMapMarkers,
    ],
  },
];

async function readOptionalFile(filePath: string) {
  try {
    return await fs.readFile(filePath, "utf8");
  } catch {
    return null;
  }
}

async function readOptionalDirNames(directoryPath: string) {
  try {
    const entries = await fs.readdir(directoryPath, { withFileTypes: true });
    return entries.map((entry) => ({
      name: entry.name,
      isDirectory: entry.isDirectory(),
    }));
  } catch {
    return [];
  }
}

function parseSelectedProfile(rawIni: string | null) {
  if (!rawIni) {
    return DEFAULT_PROFILE;
  }

  const match = rawIni.match(/selected_profile=@ByteArray\(([^)]+)\)/);
  return match?.[1] ?? DEFAULT_PROFILE;
}

function toBoolean(raw: string) {
  return raw.trim().toLowerCase() === "true";
}

function toPriority(raw: string) {
  const parsed = Number.parseInt(raw, 10);
  return Number.isNaN(parsed) ? null : parsed;
}

function parseReport(rawCsv: string | null) {
  if (!rawCsv) {
    return [] as ArrModRecord[];
  }

  const [header, ...rows] = parseCsv(rawCsv);
  if (!header) {
    return [] as ArrModRecord[];
  }

  return rows.map((row) => {
    const [
      name = "",
      version = "",
      enabled = "false",
      priority = "",
      custom = "false",
      pluginHashes = "",
    ] = row;

    return {
      name,
      version,
      enabled: toBoolean(enabled),
      priority: toPriority(priority),
      custom: toBoolean(custom),
      pluginHashes: pluginHashes
        .split(";")
        .map((value) => value.trim())
        .filter(Boolean),
    };
  });
}

function normalizeSeparatorName(raw: string) {
  return raw
    .replace(/^[+-]/, "")
    .replace(/_separator$/i, "")
    .trim();
}

function parseModlistGroups(rawModlist: string | null) {
  if (!rawModlist) {
    return [] as ArrModGroup[];
  }

  const groups = new Map<string, ArrModGroup>();
  let activeGroupName = "Ungrouped";

  const ensureGroup = (name: string) => {
    const existing = groups.get(name);
    if (existing) {
      return existing;
    }

    const created: ArrModGroup = {
      name,
      enabledMods: [],
      disabledMods: [],
    };
    groups.set(name, created);
    return created;
  };

  ensureGroup(activeGroupName);

  for (const line of rawModlist.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed) {
      continue;
    }

    if (trimmed.endsWith("_separator")) {
      activeGroupName = normalizeSeparatorName(trimmed);
      ensureGroup(activeGroupName);
      continue;
    }

    if (!trimmed.startsWith("+") && !trimmed.startsWith("-")) {
      continue;
    }

    const name = trimmed.slice(1).trim();
    const group = ensureGroup(activeGroupName);

    if (trimmed.startsWith("+")) {
      group.enabledMods.push(name);
    } else {
      group.disabledMods.push(name);
    }
  }

  return Array.from(groups.values()).filter(
    (group) => group.enabledMods.length > 0 || group.disabledMods.length > 0,
  );
}

function toDisplayName(filename: string) {
  return filename.replace(/\.[^.]+$/, "");
}

function takeDisplayNames(names: string[], limit = 12) {
  return names.slice(0, limit).map(toDisplayName);
}

function dedupeSorted(items: string[]) {
  return Array.from(new Set(items)).sort((left, right) =>
    left.localeCompare(right),
  );
}

function matchesAny(value: string, matchers: RegExp[]) {
  return matchers.some((matcher) => matcher.test(value));
}

function buildRuntimeSurfaces(
  selectedProfile: string,
  directoryEntries: {
    mcmSettings: string[];
    mcmRecorderProfiles: string[];
    sksePluginFiles: string[];
  },
) {
  return [
    {
      title: "MCM presets",
      description:
        "These are the high-signal MCM exports that shape runtime behavior and should anchor player-facing UX claims.",
      path: arrPaths.mcmSettingsDir,
      entries: takeDisplayNames(directoryEntries.mcmSettings, 18),
    },
    {
      title: "Recorder profiles",
      description:
        "Captured preset bundles suggest named difficulty or experience profiles that may change the feel of the build materially.",
      path: arrPaths.mcmRecorderDir,
      entries: directoryEntries.mcmRecorderProfiles,
    },
    {
      title: "SKSE plugin configs",
      description:
        "These configs shape controls, HUD behavior, camera feel, widgets, and plugin-level gameplay tuning.",
      path: arrPaths.sksePluginsDir,
      entries: takeDisplayNames(directoryEntries.sksePluginFiles, 18),
    },
    {
      title: `Profile ${selectedProfile} runtime files`,
      description:
        "Profile-local INIs matter whenever a system feels different from the same mod in another list or profile.",
      path: arrPaths.profileDir(selectedProfile),
      entries: ["Skyrim.ini", "SkyrimPrefs.ini", "skyrimcustom.ini"],
    },
  ].filter((surface) => surface.entries.length > 0);
}

function buildEvidenceSurfaces(selectedProfile: string): ArrEvidenceSurface[] {
  return [
    {
      title: "Profile truth set",
      description:
        "The selected profile files answer what is enabled, in what order, and under which local runtime assumptions.",
      paths: [
        arrPaths.modOrganizerIni,
        arrPaths.profileModlist(selectedProfile),
        arrPaths.profilePlugins(selectedProfile),
        arrPaths.profileLoadOrder(selectedProfile),
        arrPaths.profileReport(selectedProfile),
      ],
    },
    {
      title: "Authoria output layer",
      description:
        "Late local outputs should be treated as first-class evidence whenever final behavior matters more than upstream intent.",
      paths: [
        arrPaths.authoriaXEditOutput,
        arrPaths.authoriaSynthesisOutput,
        arrPaths.authoriaRftiOutput,
        arrPaths.authoriaNpcMerge,
        arrPaths.authoriaCkOutput,
      ],
    },
    {
      title: "Runtime UX surfaces",
      description:
        "These paths shape what the player sees, configures, and struggles with in real play.",
      paths: [
        arrPaths.authoriaMcmIniSettings,
        arrPaths.authoriaUiPositioning,
        arrPaths.authoriaControllerConfigs,
        arrPaths.authoriaMapMarkers,
      ],
    },
  ];
}

function buildTopicClusters(
  records: ArrModRecord[],
  groups: ArrModGroup[],
): ArrTopicCluster[] {
  const enabledRecords = records.filter((record) => record.enabled);

  return topicClusterDefinitions
    .map((definition) => {
      const matchedGroups = groups.filter((group) =>
        matchesAny(group.name, definition.groupMatchers),
      );
      const matchedMods = enabledRecords
        .filter((record) => matchesAny(record.name, definition.modMatchers))
        .map((record) => record.name);
      const modsFromGroups = matchedGroups.flatMap((group) => group.enabledMods);
      const mods = dedupeSorted([...matchedMods, ...modsFromGroups]).slice(0, 18);

      return {
        slug: definition.slug,
        title: definition.title,
        summary: definition.summary,
        groupNames: matchedGroups.map((group) => group.name),
        mods,
        evidence: definition.evidence,
      };
    })
    .filter((cluster) => cluster.mods.length > 0 || cluster.groupNames.length > 0);
}

export const getArrInstallData = cache(async (): Promise<ArrInstallData> => {
  const modOrganizerIni = await readOptionalFile(arrPaths.modOrganizerIni);
  const selectedProfile = parseSelectedProfile(modOrganizerIni);
  const [
    report,
    modlist,
    mcmSettingsDirEntries,
    mcmRecorderDirEntries,
    skseDirEntries,
  ] = await Promise.all([
    readOptionalFile(arrPaths.profileReport(selectedProfile)),
    readOptionalFile(arrPaths.profileModlist(selectedProfile)),
    readOptionalDirNames(arrPaths.mcmSettingsDir),
    readOptionalDirNames(arrPaths.mcmRecorderDir),
    readOptionalDirNames(arrPaths.sksePluginsDir),
  ]);

  const records = parseReport(report);
  const groups = parseModlistGroups(modlist);
  const runtimeSurfaces = buildRuntimeSurfaces(selectedProfile, {
    mcmSettings: mcmSettingsDirEntries
      .filter((entry) => !entry.isDirectory)
      .map((entry) => entry.name),
    mcmRecorderProfiles: mcmRecorderDirEntries
      .filter((entry) => entry.isDirectory && !entry.name.startsWith("."))
      .map((entry) => entry.name)
      .sort((left, right) => left.localeCompare(right)),
    sksePluginFiles: skseDirEntries
      .filter((entry) => !entry.isDirectory)
      .map((entry) => entry.name),
  });
  const evidenceSurfaces = buildEvidenceSurfaces(selectedProfile);
  const topicClusters = buildTopicClusters(records, groups);

  return {
    available: records.length > 0,
    selectedProfile,
    records,
    groups,
    runtimeSurfaces,
    evidenceSurfaces,
    topicClusters,
    notes: records.length
      ? [
          `Live ARR report loaded from profile ${selectedProfile}.`,
          "Structured topic clusters are derived from the local install and MO2 grouping, not from upstream marketing text.",
          `Runtime surfaces were scanned from ${path.basename(arrPaths.authoriaMcmIniSettings)} and related local config folders.`,
        ]
      : [
          "The local ARR report was not available at build time.",
          "The content model still renders, but live counts and topic clusters are hidden until the local files are present.",
        ],
  };
});

