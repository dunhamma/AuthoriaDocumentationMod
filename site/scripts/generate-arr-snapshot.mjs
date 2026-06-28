import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const arrRoot = "D:/Wabbajack/modlists/ARR";
const modOrganizerIni = `${arrRoot}/ModOrganizer.ini`;
const outputPath = path.resolve("../docs/evidence/arr-snapshot.json");

const expectedEvidenceSurfaces = [
  `${arrRoot}/ModOrganizer.ini`,
  `${arrRoot}/mods/Authoria - MCM and INI Settings`,
  `${arrRoot}/mods/Authoria - xEdit Output`,
  `${arrRoot}/mods/Authoria - Synthesis Output`,
  `${arrRoot}/mods/Authoria - RFTI Output`,
  `${arrRoot}/mods/Authoria - NPC Merge`,
  `${arrRoot}/mods/Authoria - CK Output`,
  `${arrRoot}/mods/Authoria - UI Positioning`,
  `${arrRoot}/mods/Authoria - Controller Configs`,
  `${arrRoot}/mods/Authoria - FMWF Map Marker Settings`,
];

function parseSelectedProfile(rawIni) {
  const match = rawIni.match(/selected_profile\s*=\s*@ByteArray\(([^)]+)\)/);
  return match?.[1] ?? "Authoria - Requiem Reforged - Main Profile";
}

function parseCsvLine(line) {
  const result = [];
  let current = "";
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];

    if (char === '"' && quoted && next === '"') {
      current += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      quoted = !quoted;
      continue;
    }

    if (char === "," && !quoted) {
      result.push(current);
      current = "";
      continue;
    }

    current += char;
  }

  result.push(current);
  return result;
}

function parseReport(rawCsv) {
  const rows = rawCsv
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(1)
    .map(parseCsvLine);

  return rows.map((row) => ({
    name: row[0] ?? "",
    version: row[1] ?? "",
    enabled: (row[2] ?? "").toLowerCase() === "true",
    priority: Number.parseInt(row[3] ?? "", 10),
    custom: (row[4] ?? "").toLowerCase() === "true",
    pluginHashes: (row[5] ?? "")
      .split(";")
      .map((value) => value.trim())
      .filter(Boolean),
  }));
}

function parseEnabledPluginCount(rawPlugins) {
  return rawPlugins
    .split(/\r?\n/)
    .filter((line) => line.trim().startsWith("*")).length;
}

function parseEnabledModlistEntries(rawModlist) {
  return rawModlist
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith("+"))
    .map((line) => line.slice(1).trim())
    .filter((name) => name && !name.endsWith("_separator"));
}

function isAuthoriaModule(record) {
  const name = typeof record === "string" ? record : record.name;
  return /authoria|auhoria/i.test(name);
}

function isGeneratedOutput(record) {
  const name = typeof record === "string" ? record : record.name;
  return (
    isAuthoriaModule(name) &&
    /output|cache|dyndolod|texgen|xlodgen|synthesis|rfti|pandora|pg/i.test(name)
  );
}

async function pathExists(targetPath) {
  try {
    await readFile(targetPath);
    return true;
  } catch {
    try {
      await readdir(targetPath);
      return true;
    } catch {
      return false;
    }
  }
}

async function main() {
  const ini = await readFile(modOrganizerIni, "utf8");
  const selectedProfile = parseSelectedProfile(ini);
  const profileRoot = `${arrRoot}/profiles/${selectedProfile}`;
  const [modlist, plugins, loadorder, report] = await Promise.all([
    readFile(`${profileRoot}/modlist.txt`, "utf8"),
    readFile(`${profileRoot}/plugins.txt`, "utf8"),
    readFile(`${profileRoot}/loadorder.txt`, "utf8"),
    readFile(`${profileRoot}/modlist_report_gold.csv`, "utf8"),
  ]);

  const records = parseReport(report);
  const enabledRecords = records.filter((record) => record.enabled);
  const enabledModlistEntries = parseEnabledModlistEntries(modlist);
  const authoriaOwnedModules = enabledModlistEntries.filter(isAuthoriaModule);
  const generatedOutputs = enabledModlistEntries.filter(isGeneratedOutput);
  const missingEvidenceSurfaces = [];

  for (const evidencePath of [
    ...expectedEvidenceSurfaces,
    `${profileRoot}/modlist.txt`,
    `${profileRoot}/plugins.txt`,
    `${profileRoot}/loadorder.txt`,
    `${profileRoot}/modlist_report_gold.csv`,
  ]) {
    if (!(await pathExists(evidencePath))) {
      missingEvidenceSurfaces.push(evidencePath);
    }
  }

  const snapshot = {
    generatedAt: new Date().toISOString(),
    arrRoot,
    selectedProfile,
    profileRoot,
    counts: {
      allMods: records.length,
      enabledMods: enabledRecords.length,
      enabledPlugins: parseEnabledPluginCount(plugins),
      loadOrderEntries: loadorder
        .split(/\r?\n/)
        .filter((line) => line.trim() && !line.trim().startsWith("#")).length,
      authoriaOwnedMods: authoriaOwnedModules.length,
      authoriaOwnedModsInCsv: enabledRecords.filter(isAuthoriaModule).length,
      generatedOutputMods: generatedOutputs.length,
      generatedOutputModsInCsv: enabledRecords.filter(isGeneratedOutput).length,
      requiemRelatedMods: enabledRecords.filter((record) =>
        /requiem/i.test(record.name),
      ).length,
    },
    authoriaOwnedModules,
    generatedOutputs,
    topicSignals: {
      survival: /sunhelm|frostfall|camping|map|carriage|hunting/i.test(modlist),
      progression: /requiem|experience|static skill|trade and barter/i.test(
        modlist,
      ),
      questArcs: /wyrmstooth|sirenroot|vigilant|glenmoril|unslaad|dac0da|olenveld|icemoth/i.test(
        modlist,
      ),
      companions: /inigo|kaidan|auri|lucien|remiel|xelzaz/i.test(modlist),
    },
    missingEvidenceSurfaces,
  };

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(snapshot, null, 2)}\n`);
  console.log(`Wrote ${outputPath}`);
}

await main();
