import { cache } from "react";
import { promises as fs } from "node:fs";

import { arrPaths } from "@/lib/arr/paths";

export type PresetFact = {
  id: string;
  sourceId: string;
  sourcePath: string;
  section: string;
  key: string;
  value: string;
  publicLabel: string;
  interpretation: string;
  confidence: "high" | "medium" | "low";
};

type PresetTarget = {
  sourceId: string;
  publicLabel: string;
  path: string;
  format: "ini" | "json" | "toml" | "xml";
  interpretations?: Record<string, string>;
};

const targets: PresetTarget[] = [
  {
    sourceId: "requiem",
    publicLabel: "Local Requiem preset",
    path: arrPaths.mcmSetting("Requiem.ini"),
    format: "ini",
    interpretations: {
      "general.fDiffMultHPByPCL":
        "Player outgoing damage is locally tuned, so combat advice should not assume vanilla damage parity.",
      "general.iHoursToRespawnCellCleared":
        "Cleared spaces persist for a long time, making world-state and route choices feel more durable.",
      "general.fTimeScale":
        "The runtime clock shapes travel, exposure, rest, and daily planning.",
    },
  },
  {
    sourceId: "experience",
    publicLabel: "Experience progression preset",
    path: arrPaths.sksePlugin("Experience.ini"),
    format: "ini",
    interpretations: {
      "general.bEnableSkillXP":
        "Skill use does not drive vanilla-style skill XP when this is disabled.",
      "general.iMaxPlayerLevel":
        "Long-term leveling is bounded by the local Experience cap.",
    },
  },
  {
    sourceId: "static-skill-leveling",
    publicLabel: "Static Skill Leveling preset",
    path: arrPaths.mcmSetting("StaticSkillLeveling.ini"),
    format: "ini",
  },
  {
    sourceId: "trade-and-barter",
    publicLabel: "Trade and Barter preset",
    path: arrPaths.mcmSetting("trade & barter.ini"),
    format: "ini",
    interpretations: {
      "barterrates.iPresetChoice":
        "Economy guidance should quote this local preset rather than assume default barter behavior.",
    },
  },
  {
    sourceId: "follower-stats",
    publicLabel: "Follower balance preset",
    path: arrPaths.mcmSetting("Follower Stats.ini"),
    format: "ini",
    interpretations: {
      "main.iScale":
        "Party power guidance should account for the local follower stat scale.",
    },
  },
  {
    sourceId: "missives",
    publicLabel: "Missives task-board preset",
    path: arrPaths.mcmSetting("Missives.ini"),
    format: "ini",
  },
  {
    sourceId: "tk-dodge",
    publicLabel: "Dodge preset",
    path: arrPaths.mcmSetting("TKDodgeAddon.ini"),
    format: "ini",
  },
  {
    sourceId: "true-directional-movement",
    publicLabel: "Movement readability preset",
    path: arrPaths.mcmSetting("TrueDirectionalMovement.ini"),
    format: "ini",
  },
  {
    sourceId: "wounds",
    publicLabel: "Wounds preset",
    path: arrPaths.mcmSetting("Wounds.ini"),
    format: "ini",
  },
  {
    sourceId: "sunhelm-normal",
    publicLabel: "SunHelm normal survival profile",
    path: `${arrPaths.sunhelmConfigDir}/normal.json`,
    format: "json",
  },
  {
    sourceId: "sunhelm-hard",
    publicLabel: "SunHelm hard survival profile",
    path: `${arrPaths.sunhelmConfigDir}/hard.json`,
    format: "json",
  },
  {
    sourceId: "sunhelm-easy",
    publicLabel: "SunHelm easy survival profile",
    path: `${arrPaths.sunhelmConfigDir}/Easy.json`,
    format: "json",
  },
  {
    sourceId: "map-markers",
    publicLabel: "Map marker preset",
    path: arrPaths.mapMarkersConfig,
    format: "json",
  },
  {
    sourceId: "control-map",
    publicLabel: "Control map",
    path: `${arrPaths.authoriaMcmIniSettings}/Root/ControlMap_Custom.txt`,
    format: "ini",
  },
  {
    sourceId: "kaidan-mcm",
    publicLabel: "Kaidan MCM preset",
    path: `${arrPaths.sksePluginsDir}/storageutildata/KaidanMCM.json`,
    format: "json",
  },
  {
    sourceId: "iwant-status-bars",
    publicLabel: "Status bar profile",
    path: `${arrPaths.authoriaMcmIniSettings}/SKSE/Plugins/FISS/iWant/iWantStatusBars/settings.xml`,
    format: "xml",
  },
];

async function readOptional(filePath: string) {
  try {
    return await fs.readFile(filePath, "utf8");
  } catch {
    return null;
  }
}

function cleanKey(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, "-");
}

function factId(sourceId: string, section: string, key: string) {
  return `${sourceId}.${cleanKey(section)}.${key}`;
}

function parseIni(raw: string) {
  const facts: { section: string; key: string; value: string }[] = [];
  let section = "root";

  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith(";") || trimmed.startsWith("#")) {
      continue;
    }

    const sectionMatch = trimmed.match(/^\[([^\]]+)\]$/);
    if (sectionMatch) {
      section = sectionMatch[1];
      continue;
    }

    const separator = trimmed.indexOf("=");
    if (separator === -1) {
      continue;
    }

    facts.push({
      section,
      key: trimmed.slice(0, separator).trim(),
      value: trimmed.slice(separator + 1).trim(),
    });
  }

  return facts;
}

function parseJson(raw: string) {
  const parsed = JSON.parse(raw) as unknown;
  const facts: { section: string; key: string; value: string }[] = [];

  function visit(value: unknown, parts: string[]) {
    if (value === null || typeof value !== "object") {
      const key = parts.pop() ?? "value";
      facts.push({
        section: parts.join(".") || "root",
        key,
        value: String(value),
      });
      return;
    }

    if (Array.isArray(value)) {
      value.slice(0, 20).forEach((item, index) => visit(item, [...parts, String(index)]));
      return;
    }

    for (const [key, child] of Object.entries(value)) {
      visit(child, [...parts, key]);
    }
  }

  visit(parsed, []);
  return facts;
}

function parseToml(raw: string) {
  return parseIni(raw.replace(/^\s*([A-Za-z0-9_.-]+)\s*=/gm, "$1="));
}

function parseXml(raw: string) {
  const facts: { section: string; key: string; value: string }[] = [];
  const matches = raw.matchAll(/<([A-Za-z0-9_.:-]+)[^>]*>([^<]+)<\/\1>/g);

  for (const match of matches) {
    facts.push({
      section: "xml",
      key: match[1],
      value: match[2].trim(),
    });
  }

  return facts;
}

function parseByFormat(raw: string, format: PresetTarget["format"]) {
  try {
    if (format === "json") {
      return parseJson(raw);
    }
    if (format === "toml") {
      return parseToml(raw);
    }
    if (format === "xml") {
      return parseXml(raw);
    }
    return parseIni(raw);
  } catch {
    return [];
  }
}

export const getPresetFacts = cache(async (): Promise<PresetFact[]> => {
  const loaded = await Promise.all(
    targets.map(async (target) => ({
      target,
      raw: await readOptional(target.path),
    })),
  );

  return loaded.flatMap(({ target, raw }) => {
    if (!raw) {
      return [];
    }

    return parseByFormat(raw, target.format).map((fact) => {
      const lookup = `${cleanKey(fact.section)}.${fact.key}`;
      const interpretation =
        target.interpretations?.[lookup] ??
        "Extracted local setting; gameplay meaning should be confirmed during article review.";

      return {
        id: factId(target.sourceId, fact.section, fact.key),
        sourceId: target.sourceId,
        sourcePath: target.path,
        section: fact.section,
        key: fact.key,
        value: fact.value,
        publicLabel: target.publicLabel,
        interpretation,
        confidence: target.interpretations?.[lookup] ? "high" : "medium",
      };
    });
  });
});

export function findPresetFacts(factIds: string[], facts: PresetFact[]) {
  const wanted = new Set(factIds);
  return facts.filter((fact) => wanted.has(fact.id));
}
