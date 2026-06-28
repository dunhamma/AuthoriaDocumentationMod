export const arrRoot = "D:/Wabbajack/modlists/ARR";
export const expectedSelectedProfile = "Authoria - Requiem Reforged - Main Profile";

const mcmSettingsDir = `${arrRoot}/mods/Authoria - MCM and INI Settings/MCM/Settings`;
const sksePluginsDir = `${arrRoot}/mods/Authoria - MCM and INI Settings/SKSE/Plugins`;
const sunhelmConfigDir = `${arrRoot}/mods/Authoria - MCM and INI Settings/SunHelm/Config`;
const controllerSettingsDir = `${arrRoot}/mods/Authoria - Controller Configs/MCM/Settings`;

export const expectedSections = {
  "start-here": 2,
  progression: 3,
  combat: 1,
  survival: 1,
  companions: 1,
  regions: 7,
  "quest-arcs": 0,
};

export const expectedPublicSlugs = {
  "start-here": [
    "controls-hud-and-interaction",
    "first-session-setup",
  ],
  progression: [
    "character-creation-and-starting-choices",
    "requiem-progression",
    "route-readiness-and-return-rules",
  ],
  combat: ["combat-rhythm-and-dodge-commitment"],
  survival: ["survival-seasons-and-travel"],
  companions: ["followers-and-party-power"],
  regions: [
    "falkreath-hub",
    "markarth-hub",
    "riften-ivarstead-corridor",
    "riverwood-whiterun-early-hub",
    "solitude-hub",
    "windhelm-hub",
    "winterhold-hub",
  ],
  "quest-arcs": [],
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
  "verification debt",
  "TODO",
  "evidence-backed",
];

export const requiredExportedPageTerms = [
  {
    route: "index.html",
    requiredTerms: [
      "Survive Your First Week",
      "Start with survival",
      "Plan a recoverable route",
      "Find your first hub",
      "Use Riverwood and Whiterun as your first recovery loop.",
    ],
  },
  {
    route: "survival.html",
    requiredTerms: [
      "Survival",
      "Survival, Seasons, and Travel",
    ],
  },
  {
    route: "start-here/first-session-setup.html",
    requiredTerms: [
      "First Session Setup",
      "Test the controls first",
      "Keyboard/mouse players should test E, R, Left Shift, Left Alt, Mouse4, Mouse3, G, 0, -, =, B, L, H, U, K, V, ;, N, and Y.",
      "Controller players should test A, X, L3, B, R1, R3, L1, D-pad right, D-pad left",
      "Health potion hotkey",
      "Stamina potion hotkey",
      "Magicka potion hotkey",
      "0, -, and =",
      "Leave with a first route",
    ],
  },
  {
    route: "start-here/controls-hud-and-interaction.html",
    requiredTerms: [
      "Controls, HUD, and Interaction",
      "Power attack key",
      "Mouse4 / gamepad R1",
      "Interaction pacing",
      "Potion hotkeys",
    ],
  },
  {
    route: "regions.html",
    requiredTerms: [
      "Regions",
      "Falkreath Hub",
      "Markarth Hub",
      "Riften and Ivarstead Corridor",
      "Riverwood and Whiterun Early Hub",
      "Solitude Hub",
      "Windhelm Hub",
      "Winterhold Hub",
    ],
  },
  {
    route: "regions/solitude-hub.html",
    requiredTerms: [
      "Solitude Hub",
      "Do this first",
      "Know this before you leave town",
      "Watch out for",
      "What changed from vanilla Skyrim",
      "Source notes",
      "Preset source notes",
      "Evidence view",
    ],
  },
  {
    route: "regions/windhelm-hub.html",
    requiredTerms: [
      "Windhelm Hub",
      "Do this first",
      "Know this before you leave town",
      "Watch out for",
      "What changed from vanilla Skyrim",
      "Source notes",
      "Preset source notes",
      "Evidence view",
    ],
  },
  {
    route: "regions/winterhold-hub.html",
    requiredTerms: [
      "Winterhold Hub",
      "Do this first",
      "Know this before you leave town",
      "Watch out for",
      "What changed from vanilla Skyrim",
      "Source notes",
      "Preset source notes",
      "Evidence view",
    ],
  },
  {
    route: "regions/markarth-hub.html",
    requiredTerms: [
      "Markarth Hub",
      "Do this first",
      "Know this before you leave town",
      "Watch out for",
      "What changed from vanilla Skyrim",
      "Source notes",
      "Preset source notes",
      "Evidence view",
    ],
  },
  {
    route: "regions/riften-ivarstead-corridor.html",
    requiredTerms: [
      "Riften and Ivarstead Corridor",
      "Do this first",
      "Know this before you leave town",
      "Watch out for",
      "What changed from vanilla Skyrim",
      "Source notes",
      "Preset source notes",
      "Evidence view",
    ],
  },
  {
    route: "regions/falkreath-hub.html",
    requiredTerms: [
      "Falkreath Hub",
      "Do this first",
      "Know this before you leave town",
      "Watch out for",
      "What changed from vanilla Skyrim",
      "Source notes",
      "Preset source notes",
      "Evidence view",
    ],
  },
  {
    route: "regions/riverwood-whiterun-early-hub.html",
    requiredTerms: [
      "Do this first",
      "Know this before you leave town",
      "Watch out for",
      "What changed from vanilla Skyrim",
      "Source notes",
      "Preset source notes",
      "Evidence view",
    ],
  },
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
    relativePath: "../docs/almanac-promotion-pipeline.md",
    requiredTerms: [
      "Seed review",
      "Evidence pass",
      "Player rewrite",
      "Publication gate",
    ],
  },
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
  ["dynamic-activation-key", `${mcmSettingsDir}/Dynamic Activation Key - MCM.ini`, "ini"],
  ["horse-whistle", `${mcmSettingsDir}/Horse Whistle Key.ini`, "ini"],
  ["simple-hunting-overhaul", `${mcmSettingsDir}/Simple Hunting Overhaul MCM Helper.ini`, "ini"],
  ["immersive-hunting", `${mcmSettingsDir}/ImmersiveHunting.ini`, "ini"],
  ["stress-and-fear", `${mcmSettingsDir}/Stress and Fear.ini`, "ini"],
  ["optimal-potion-hotkey", `${mcmSettingsDir}/OptimalPotionHotkeyMCM.ini`, "ini"],
  ["tk-dodge", `${mcmSettingsDir}/TKDodgeAddon.ini`, "ini"],
  ["true-directional-movement", `${mcmSettingsDir}/TrueDirectionalMovement.ini`, "ini"],
  ["wounds", `${mcmSettingsDir}/Wounds.ini`, "ini"],
  ["sunhelm-normal", `${sunhelmConfigDir}/normal.json`, "json"],
  ["sunhelm-hard", `${sunhelmConfigDir}/Hard.json`, "json"],
  ["map-marker-framework", `${sksePluginsDir}/MapMarkerFramework.ini`, "ini"],
  ["mcm-keybinds", `${mcmSettingsDir}/keybinds.json`, "json"],
  ["helmet-toggle", `${mcmSettingsDir}/Helmet Toggle 2.ini`, "ini"],
  ["first-person-interactions", `${mcmSettingsDir}/FirstPersonInteractions.ini`, "ini"],
  ["looting-animations", `${mcmSettingsDir}/LootingAnimations.ini`, "ini"],
  ["obody", `${mcmSettingsDir}/OBody NG.ini`, "ini"],
  ["photo-mode", `${mcmSettingsDir}/PhotoMode.ini`, "ini"],
  ["ocpa", `${controllerSettingsDir}/OCPA.ini`, "ini"],
];
