export const arrRoot = "D:/Wabbajack/modlists/ARR";

const mcmSettingsDir = `${arrRoot}/mods/Authoria - MCM and INI Settings/MCM/Settings`;
const sksePluginsDir = `${arrRoot}/mods/Authoria - MCM and INI Settings/SKSE/Plugins`;
const sunhelmConfigDir = `${arrRoot}/mods/Authoria - MCM and INI Settings/SunHelm/Config`;

export const expectedSections = {
  "start-here": 2,
  progression: 3,
  combat: 1,
  survival: 1,
  companions: 1,
  regions: 0,
  "quest-arcs": 0,
};

export const exportedSections = [
  ...Object.keys(expectedSections),
  "settings",
  "evidence",
];

export const bannedPublicTerms = [
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
  "Article-grade reference",
  "Reference browser",
  "Verification notes",
];

export const forbiddenSlugs = [["companions", "val-serano"]];

export const forbiddenMainNavHrefs = ["/settings", "/evidence"];

export const guideLeakTerms = [
  "D:/Wabbajack",
  "D:\\Wabbajack",
  "MCM/Settings",
  "loadorder.txt",
  "modlist.txt",
  "plugins.txt",
  "modlist_report_gold.csv",
  "verification pending",
  "verification-required",
  "verify before",
  "needs xEdit",
  "needs in-game",
  "plugin records",
  "late patch layer",
];

export const requiredExportedPageTerms = [
  {
    route: "evidence.html",
    requiredTerms: [
      "Evidence model",
      "Article verification states",
      "Record evidence adapter",
      "Verification queue",
    ],
  },
];

export const requiredArchitectureSources = [
  {
    relativePath: "../docs/authoria-creation-roadmap.md",
    requiredTerms: [
      "Playable product",
      "Reference product",
      "Build Output Ownership",
      "Release Flow",
    ],
  },
  {
    relativePath: "lib/content/verification.ts",
    requiredTerms: [
      "articleVerificationOverrides",
      "seeded",
      "evidence-backed",
      "record-verified",
      "playtested",
    ],
  },
  {
    relativePath: "lib/arr/record-evidence.ts",
    requiredTerms: [
      "sourcePath",
      "pluginOrConfigSurface",
      "recordId",
      "claimSupported",
      "status",
    ],
  },
];

export const quoteableTargets = [
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
