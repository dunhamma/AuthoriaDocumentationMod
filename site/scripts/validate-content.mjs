import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("out");
const siteRoot = path.resolve(".");
const arrRoot = "D:/Wabbajack/modlists/ARR";
const mcmSettingsDir = `${arrRoot}/mods/Authoria - MCM and INI Settings/MCM/Settings`;
const sksePluginsDir = `${arrRoot}/mods/Authoria - MCM and INI Settings/SKSE/Plugins`;
const sunhelmConfigDir = `${arrRoot}/mods/Authoria - MCM and INI Settings/SunHelm/Config`;

const expectedSections = {
  "start-here": 2,
  progression: 4,
  combat: 1,
  survival: 1,
  companions: 10,
  regions: 7,
  "quest-arcs": 12,
};

const exportedSections = [
  ...Object.keys(expectedSections),
  "settings",
  "evidence",
];

const bannedPublicTerms = [
  "Val Serano",
  "Representative enabled mods",
  "MO2 groups",
  "Authoria highlights",
  "Requiem highlights",
  "first-pass article shell",
  "This hub guide shell",
  "Open capture questions",
  "Capture target",
  "not an entry in a mod list",
];

const forbiddenSlugs = [
  ["companions", "val-serano"],
];

const quoteableTargets = [
  ["requiem", `${mcmSettingsDir}/Requiem.ini`, "ini"],
  ["experience", `${sksePluginsDir}/Experience.ini`, "ini"],
  ["static-skill-leveling", `${mcmSettingsDir}/StaticSkillLeveling.ini`, "ini"],
  ["trade-and-barter", `${mcmSettingsDir}/trade & barter.ini`, "ini"],
  ["follower-stats", `${mcmSettingsDir}/Follower Stats.ini`, "ini"],
  ["missives", `${mcmSettingsDir}/Missives.ini`, "ini"],
  ["bounty-hunter", `${mcmSettingsDir}/Bounty Hunter - Bounty Perks.ini`, "ini"],
  ["dynamic-activation-key", `${mcmSettingsDir}/Dynamic Activation Key - MCM.ini`, "ini"],
  ["horse-whistle", `${mcmSettingsDir}/Horse Whistle Key.ini`, "ini"],
  ["camping-expansion", `${mcmSettingsDir}/Camping Expansion.ini`, "ini"],
  ["inns-can-be-closed", `${mcmSettingsDir}/Inns Can Be Closed.ini`, "ini"],
  ["simple-hunting-overhaul", `${mcmSettingsDir}/Simple Hunting Overhaul MCM Helper.ini`, "ini"],
  ["immersive-hunting", `${mcmSettingsDir}/ImmersiveHunting.ini`, "ini"],
  ["stress-and-fear", `${mcmSettingsDir}/Stress and Fear.ini`, "ini"],
  ["optimal-potion-hotkey", `${mcmSettingsDir}/OptimalPotionHotkeyMCM.ini`, "ini"],
  ["tk-dodge", `${mcmSettingsDir}/TKDodgeAddon.ini`, "ini"],
  ["true-directional-movement", `${mcmSettingsDir}/TrueDirectionalMovement.ini`, "ini"],
  ["wounds", `${mcmSettingsDir}/Wounds.ini`, "ini"],
  ["sunhelm-normal", `${sunhelmConfigDir}/normal.json`, "json"],
  ["sunhelm-hard", `${sunhelmConfigDir}/hard.json`, "json"],
  ["better-carriage-destinations", `${mcmSettingsDir}/Better Carriage Destinations.ini`, "ini"],
  ["map-marker-framework", `${sksePluginsDir}/MapMarkerFramework.ini`, "ini"],
  ["mcm-keybinds", `${mcmSettingsDir}/keybinds.json`, "json"],
  ["a-matter-of-time", `${mcmSettingsDir}/AMatterOfTime.ini`, "ini"],
  ["helmet-toggle", `${mcmSettingsDir}/Helmet Toggle 2.ini`, "ini"],
  ["first-person-interactions", `${mcmSettingsDir}/FirstPersonInteractions.ini`, "ini"],
  ["looting-animations", `${mcmSettingsDir}/LootingAnimations.ini`, "ini"],
  ["obody", `${mcmSettingsDir}/OBody NG.ini`, "ini"],
  ["photo-mode", `${mcmSettingsDir}/PhotoMode.ini`, "ini"],
  ["ocpa", `${mcmSettingsDir}/OCPA.ini`, "ini"],
];

async function exists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

async function readOptional(filePath) {
  try {
    return await readFile(filePath, "utf8");
  } catch {
    return null;
  }
}

function cleanKey(value) {
  return value.trim().toLowerCase().replace(/\s+/g, "-");
}

function factId(sourceId, section, key) {
  return `${sourceId}.${cleanKey(section)}.${key}`;
}

function parseIni(raw) {
  const facts = [];
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
    });
  }

  return facts;
}

function parseJson(raw) {
  const parsed = JSON.parse(raw);
  const facts = [];

  function visit(value, parts) {
    if (value === null || typeof value !== "object") {
      const key = parts.pop() ?? "value";
      facts.push({
        section: parts.join(".") || "root",
        key,
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

function parseByFormat(raw, format) {
  if (format === "json") {
    return parseJson(raw);
  }
  return parseIni(raw);
}

async function extractedPresetFactIds() {
  const ids = new Set();
  const missingTargets = [];

  for (const [sourceId, filePath, format] of quoteableTargets) {
    const raw = await readOptional(filePath);
    if (!raw) {
      missingTargets.push(filePath);
      continue;
    }

    for (const fact of parseByFormat(raw, format)) {
      ids.add(factId(sourceId, fact.section, fact.key));
    }
  }

  return { ids, missingTargets };
}

async function quotedSettingIds() {
  const catalogPath = path.join(siteRoot, "lib/content/catalog.ts");
  const raw = await readFile(catalogPath, "utf8");
  return Array.from(raw.matchAll(/setting\(\s*"([^"]+)"/g), (match) => match[1]);
}

async function quotedRelatedSlugs() {
  const catalogPath = path.join(siteRoot, "lib/content/catalog.ts");
  const raw = await readFile(catalogPath, "utf8");
  const slugs = [];

  for (const relatedMatch of raw.matchAll(/related:\s*\[([^\]]*)\]/g)) {
    const relatedBody = relatedMatch[1];
    slugs.push(...Array.from(relatedBody.matchAll(/"([^"]+)"/g), (match) => match[1]));
  }

  return slugs;
}

async function sectionArticleCount(section) {
  const sectionPath = path.join(root, section);
  const entries = await readdir(sectionPath, { withFileTypes: true });
  return entries.filter((entry) => entry.isDirectory() && !entry.name.startsWith("__next.")).length;
}

async function exportedSlugs() {
  const slugs = new Set();

  for (const section of exportedSections) {
    const sectionPath = path.join(root, section);
    if (!(await exists(sectionPath))) {
      continue;
    }
    const entries = await readdir(sectionPath, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory() && !entry.name.startsWith("__next.")) {
        slugs.add(entry.name);
      }
    }
  }

  return slugs;
}

async function collectPublicFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === "_next") {
        continue;
      }
      files.push(...(await collectPublicFiles(entryPath)));
      continue;
    }

    if (entry.isFile() && (entry.name.endsWith(".html") || entry.name.endsWith(".txt"))) {
      files.push(entryPath);
    }
  }

  return files;
}

const failures = [];

if (!(await exists(root))) {
  failures.push("Expected static export at site/out. Run `pnpm build` before content validation.");
} else {
  for (const [section, expectedCount] of Object.entries(expectedSections)) {
    const actualCount = await sectionArticleCount(section);
    if (actualCount !== expectedCount) {
      failures.push(`${section} expected ${expectedCount} articles, found ${actualCount}.`);
    }
  }

  for (const [section, slug] of forbiddenSlugs) {
    if (await exists(path.join(root, section, slug))) {
      failures.push(`Forbidden public route exists: /${section}/${slug}`);
    }
  }

  for (const filePath of await collectPublicFiles(root)) {
    const text = await readFile(filePath, "utf8");
    for (const term of bannedPublicTerms) {
      if (text.includes(term)) {
        failures.push(`Banned public term "${term}" found in ${path.relative(root, filePath)}.`);
      }
    }
  }

  const { ids: extractedIds, missingTargets } = await extractedPresetFactIds();
  if (missingTargets.length > 0) {
    failures.push(
      `Could not read ${missingTargets.length} preset target(s) needed for setting quote validation.`,
    );
  }

  for (const quotedId of await quotedSettingIds()) {
    if (!extractedIds.has(quotedId)) {
      failures.push(`Quoted setting id is not extractable from local presets: ${quotedId}`);
    }
  }

  const slugs = await exportedSlugs();
  for (const relatedSlug of await quotedRelatedSlugs()) {
    if (!slugs.has(relatedSlug)) {
      failures.push(`Related article slug does not resolve to an exported route: ${relatedSlug}`);
    }
  }
}

if (failures.length > 0) {
  console.error("Content validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Content validation passed.");
