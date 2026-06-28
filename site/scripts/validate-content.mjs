import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

import {
  arrRoot,
  bannedPublicTerms,
  expectedSections,
  expectedPublicSlugs,
  expectedSelectedProfile,
  exportedSections,
  forbiddenMainNavHrefs,
  forbiddenSlugs,
  guideLeakTerms,
  quoteableTargets,
  requiredExportedPageTerms,
  requiredArchitectureSources,
} from "../lib/content/validation-manifest.mjs";

const root = path.resolve("out");
const siteRoot = path.resolve(".");
const repoRoot = path.resolve("..");

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

async function quotedVerificationOverrideSlugs() {
  const verificationPath = path.join(siteRoot, "lib/content/verification.ts");
  const raw = await readFile(verificationPath, "utf8");
  const overrideMatch = raw.match(
    /articleVerificationOverrides:[\s\S]*?=\s*\{([\s\S]*?)\n\};/,
  );

  if (!overrideMatch) {
    return [];
  }

  return Array.from(
    overrideMatch[1].matchAll(/"([^"]+)":\s*\{/g),
    (match) => match[1],
  );
}

function parseSelectedProfile(rawIni) {
  const match = rawIni?.match(/selected_profile\s*=\s*@ByteArray\(([^)]+)\)/);
  return match?.[1] ?? null;
}

function parseDefaultProfile(rawPathsTs) {
  const match = rawPathsTs?.match(/DEFAULT_PROFILE\s*=\s*"([^"]+)"/);
  return match?.[1] ?? null;
}

async function sectionArticleCount(section) {
  const sectionPath = path.join(root, section);
  if (!(await exists(sectionPath))) {
    return 0;
  }
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

async function exportedGuideSlugsBySection() {
  const slugsBySection = new Map();

  for (const section of Object.keys(expectedSections)) {
    const sectionPath = path.join(root, section);
    const slugs = [];

    if (await exists(sectionPath)) {
      const entries = await readdir(sectionPath, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isDirectory() && !entry.name.startsWith("__next.")) {
          slugs.push(entry.name);
        }
      }
    }

    slugsBySection.set(section, slugs.sort());
  }

  return slugsBySection;
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

async function collectGuideFiles() {
  const files = [];

  for (const section of Object.keys(expectedSections)) {
    const sectionPath = path.join(root, section);
    const sectionHtml = path.join(root, `${section}.html`);

    if (await exists(sectionHtml)) {
      files.push(sectionHtml);
    }

    if (await exists(sectionPath)) {
      files.push(...(await collectPublicFiles(sectionPath)));
    }
  }

  return files;
}

const failures = [];

for (const source of requiredArchitectureSources) {
  const filePath = path.resolve(siteRoot, source.relativePath);
  const raw = await readOptional(filePath);
  if (!raw) {
    failures.push(`Missing architecture support file: ${filePath}`);
    continue;
  }

  for (const term of source.requiredTerms) {
    if (!raw.includes(term)) {
      failures.push(
        `Architecture support file ${filePath} is missing required term: ${term}`,
      );
    }
  }
}

const siteShellPath = path.resolve(siteRoot, "components/site-shell.tsx");
const siteShellRaw = await readOptional(siteShellPath);
if (!siteShellRaw) {
  failures.push(`Missing site shell file: ${siteShellPath}`);
} else {
  for (const href of forbiddenMainNavHrefs) {
    if (siteShellRaw.includes(`href: "${href}"`)) {
      failures.push(`Forbidden main-nav href remains in site shell: ${href}`);
    }
  }
}

const modOrganizerIniRaw = await readOptional(path.resolve(arrRoot, "ModOrganizer.ini"));
const selectedProfile = parseSelectedProfile(modOrganizerIniRaw);
if (!selectedProfile) {
  failures.push(`Could not resolve selected profile from ${arrRoot}/ModOrganizer.ini.`);
} else if (selectedProfile !== expectedSelectedProfile) {
  failures.push(
    `Selected ARR profile drift: ModOrganizer.ini has "${selectedProfile}", expected "${expectedSelectedProfile}".`,
  );
}

const arrPathsRaw = await readOptional(path.resolve(siteRoot, "lib/arr/paths.ts"));
const defaultProfile = parseDefaultProfile(arrPathsRaw);
if (defaultProfile !== expectedSelectedProfile) {
  failures.push(
    `site/lib/arr/paths.ts DEFAULT_PROFILE is "${defaultProfile}", expected "${expectedSelectedProfile}".`,
  );
}

const selectedProfileFiles = [
  "modlist.txt",
  "plugins.txt",
  "loadorder.txt",
  "modlist_report_gold.csv",
];
for (const filename of selectedProfileFiles) {
  const filePath = path.resolve(arrRoot, "profiles", expectedSelectedProfile, filename);
  if (!(await exists(filePath))) {
    failures.push(`Selected profile evidence file is missing: ${filePath}`);
  }
}

for (const relativePath of [
  "CONTEXT.md",
  "docs/authoria-creation-roadmap.md",
  "docs/article-harvest-status.md",
]) {
  const filePath = path.resolve(repoRoot, relativePath);
  const raw = await readOptional(filePath);
  if (raw?.includes("profiles\\ARSE") || raw?.includes("profiles/ARSE")) {
    failures.push(`Stale ARSE profile path remains in ${relativePath}.`);
  }
}

if (!(await exists(root))) {
  failures.push("Expected static export at site/out. Run `pnpm build` before content validation.");
} else {
  for (const [section, expectedCount] of Object.entries(expectedSections)) {
    const actualCount = await sectionArticleCount(section);
    if (actualCount !== expectedCount) {
      failures.push(`${section} expected ${expectedCount} articles, found ${actualCount}.`);
    }
  }

  const guideSlugsBySection = await exportedGuideSlugsBySection();
  for (const [section, expectedSlugs] of Object.entries(expectedPublicSlugs)) {
    const actualSlugs = guideSlugsBySection.get(section) ?? [];
    const expected = [...expectedSlugs].sort();

    for (const slug of actualSlugs) {
      if (!expected.includes(slug)) {
        failures.push(
          `Unexpected public guide route exported: /${section}/${slug}. Check publicationStatus before publishing seeded pages.`,
        );
      }
    }

    for (const slug of expected) {
      if (!actualSlugs.includes(slug)) {
        failures.push(`Expected public guide route is missing: /${section}/${slug}.`);
      }
    }
  }

  for (const [section, slug] of forbiddenSlugs) {
    if (await exists(path.join(root, section, slug))) {
      failures.push(`Forbidden public route exists: /${section}/${slug}`);
    }
  }

  for (const page of requiredExportedPageTerms) {
    const pagePath = path.join(root, page.route);
    const text = await readOptional(pagePath);

    if (!text) {
      failures.push(`Required exported page is missing: ${page.route}`);
      continue;
    }

    for (const term of page.requiredTerms) {
      if (!text.includes(term)) {
        failures.push(
          `Required exported page ${page.route} is missing term: ${term}`,
        );
      }
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

  for (const filePath of await collectGuideFiles()) {
    const text = await readFile(filePath, "utf8");
    for (const term of guideLeakTerms) {
      if (text.includes(term)) {
        failures.push(
          `Guide leak term "${term}" found in ${path.relative(root, filePath)}.`,
        );
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

  for (const overrideSlug of await quotedVerificationOverrideSlugs()) {
    if (!slugs.has(overrideSlug)) {
      failures.push(
        `Article verification override does not resolve to an exported route: ${overrideSlug}`,
      );
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
