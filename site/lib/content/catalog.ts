import type {
  EvidenceItem,
  ReferenceEntry,
  ReferenceKind,
  ReferenceSection,
  SectionDefinition,
  SettingQuote,
} from "@/lib/content/schema";

const arr = "D:/Wabbajack/modlists/ARR";
const profile = `${arr}/profiles/ARSE`;
const mcm = `${arr}/mods/Authoria - MCM and INI Settings`;
const xedit = `${arr}/mods/Authoria - xEdit Output`;
const synthesis = `${arr}/mods/Authoria - Synthesis Output`;

export const sectionDefinitions: SectionDefinition[] = [
  {
    slug: "start-here",
    title: "Start Here",
    description:
      "First-session setup, new-save choices, and the opening flow from character creation into a stable early route.",
  },
  {
    slug: "progression",
    title: "Progression",
    description:
      "How Authoria builds power through Requiem, starting choices, traits, Experience, economy, and gear access.",
  },
  {
    slug: "combat",
    title: "Combat",
    description:
      "The practical rhythm of commitment-heavy fights, dodge gates, stamina pressure, wounds, and retreat discipline.",
  },
  {
    slug: "survival",
    title: "Survival",
    description:
      "Food, fatigue, cold, seasons, map readability, and route planning as core gameplay pressure.",
  },
  {
    slug: "companions",
    title: "Companions",
    description:
      "Follower-specific pages focused on party power, chatter, travel utility, Requiem tuning, and management cost.",
  },
  {
    slug: "regions",
    title: "Regions",
    description:
      "Hub and route guides keyed to safe early progression, resupply, bounty work, and local danger.",
  },
  {
    slug: "quest-arcs",
    title: "Quest Arcs",
    description:
      "Large authored campaigns and worldspaces framed by readiness, travel expectations, delayed starts, and local patches.",
  },
  {
    slug: "settings",
    title: "Settings",
    description:
      "Quoteable extracted preset values from local ARR configuration surfaces.",
  },
  {
    slug: "evidence",
    title: "Evidence",
    description:
      "Maintainer-facing provenance, output layers, and extraction dossiers behind public claims.",
  },
];

const coreEvidence: EvidenceItem[] = [
  {
    label: "Active profile mod order",
    path: `${profile}/modlist.txt`,
    note: "Shows reader-topic groupings, enabled profile order, and local customization separators.",
  },
  {
    label: "Active plugin load order",
    path: `${profile}/loadorder.txt`,
    note: "Confirms enabled plugins and late patch/output authority.",
  },
  {
    label: "Inventory report",
    path: `${profile}/modlist_report_gold.csv`,
    note: "Supports enabled/custom status without turning the public guide into a mod catalog.",
  },
];

const outputEvidence: EvidenceItem[] = [
  {
    label: "Late Authoria patch layer",
    path: xedit,
    note: "Where local conflict resolution and Requiem/worldspace compatibility can override upstream behavior.",
  },
  {
    label: "Generated gameplay and worldspace output",
    path: synthesis,
    note: "Generated records should be checked before treating upstream behavior as final.",
  },
];

const setting = (
  factId: string,
  label: string,
  value: string,
  interpretation: string,
): SettingQuote => ({ factId, label, value, interpretation });

const entry = (
  value: Omit<ReferenceEntry, "questionsAnswered" | "evidenceDossier" | "settingQuotes"> & {
    questionsAnswered?: string[];
    evidenceDossier?: ReferenceEntry["evidenceDossier"];
    settingQuotes?: SettingQuote[];
  },
): ReferenceEntry => ({
  questionsAnswered: [
    "What does the player need to know before acting on this?",
    "Which local Authoria evidence supports the claim?",
  ],
  evidenceDossier: [
    {
      publicLabel: "Active ARR profile evidence",
      internalSources: ["modlist.txt", "plugins.txt", "loadorder.txt", "modlist_report_gold.csv"],
    },
  ],
  settingQuotes: [],
  ...value,
});

const entries: ReferenceEntry[] = [
  entry({
    slug: "first-session-setup",
    kind: "systemArticle",
    section: "start-here",
    title: "First Session Setup",
    strapline:
      "Authoria starts before the cart, because difficulty, controls, survival, and presets are part of the character build.",
    summary:
      "The old guide correctly warned that customization choices are new-save decisions. This page turns that warning into a first-session workflow: pick controls, difficulty, season, survival posture, and start-kit assumptions before the game state hardens around them.",
    questionsAnswered: [
      "What should be decided before a new save?",
      "Why must MO2 difficulty and in-game difficulty match?",
      "Which setup choices affect the first hour most?",
    ],
    tags: ["onboarding", "setup", "difficulty", "controls", "new save"],
    playerExperience: [
      "The player is asked to make several non-cosmetic choices before normal movement begins.",
      "A mismatched difficulty or missing controller/keybind setup can make the game feel broken rather than deliberately demanding.",
      "The best first session is one where the player treats settings as part of character creation.",
    ],
    progressionImpact: [
      "Difficulty, follower weakening, survival posture, and start-kit access change what counts as safe early play.",
      "Save-unsafe customization should be resolved before the character starts accumulating route and quest state.",
    ],
    practicalGuidance: [
      "Choose keyboard or controller support before starting.",
      "Match MO2 difficulty choices with the in-game difficulty prompt.",
      "Pick season and survival posture before committing to a travel-heavy start.",
      "Use the keybind reminder and controller menu before leaving the initial setup flow.",
    ],
    uxTouchpoints: [
      "Keybind reminder",
      "Controller setup",
      "Difficulty prompt",
      "Season and survival MCMs",
      "Starting-room initialization messages",
    ],
    settingQuotes: [
      setting(
        "requiem.general.fTimeScale",
        "Local time scale",
        "12",
        "Travel, exposure, and daily planning should be interpreted through the local runtime clock, not vanilla assumptions.",
      ),
    ],
    sections: [
      {
        title: "How to use the old guide now",
        paragraphs: [
          "The old guide is still valuable as a checklist. Its weakness is that it often stops at naming a menu or upstream component. The new guide should explain what each choice does to the player experience and what it makes safe, risky, or inconvenient.",
        ],
        bullets: [
          "Treat customization as gameplay setup.",
          "Keep save-safety warnings visible.",
          "Explain consequences, not only buttons.",
        ],
      },
    ],
    evidence: [
      ...coreEvidence,
      {
        label: "Runtime settings bundle",
        path: mcm,
        note: "Contains MCM, keybind, controller, survival, and preset surfaces used by setup articles.",
      },
    ],
    verificationNotes: [
      "The exact in-game initialization message order should be verified in a fresh game after article drafting.",
    ],
    related: ["character-creation-and-starting-choices", "survival-seasons-and-travel"],
  }),
  entry({
    slug: "character-creation-and-starting-choices",
    kind: "systemArticle",
    section: "progression",
    title: "Character Creation and Starting Choices",
    strapline:
      "Race, birthsign, traits, religion, starting kit, and route are one pipeline rather than isolated flavor picks.",
    summary:
      "Authoria asks the player to build for the world they are about to enter. Race and birthsign choices interact with Requiem expectations, traits and religion add long-tail commitments, and Noxrim/Starting Choices determine what tools and risks arrive before the first safe hub.",
    tags: ["character creation", "starting choices", "noxrim", "traits", "religion"],
    playerExperience: [
      "The player moves through a chained initialization sequence before normal play stabilizes.",
      "Starter kits and traits create immediate strengths and blind spots that matter because early wandering is less forgiving.",
      "Build planning is about avoiding route and tool mismatches, not only maximizing damage.",
    ],
    progressionImpact: [
      "Some starts are effectively promises to solve travel, money, cold, or combat earlier than other builds.",
      "Experience and Static Skill Leveling shift progress toward deliberate questing, clearing, and level-up allocation.",
    ],
    practicalGuidance: [
      "Choose a first hub before choosing a risky start.",
      "Pick a birthsign and trait package that supports the first ten hours, not only the endgame fantasy.",
      "Treat starter-kit descriptions as early-route guidance.",
    ],
    uxTouchpoints: [
      "Starting-room prompts",
      "Birthsign selection",
      "Trait selection",
      "Starting Choices",
      "Static skill level-up menus",
    ],
    settingQuotes: [
      setting(
        "experience.general.bEnableSkillXP",
        "Skill XP mode",
        "false",
        "Skill use does not drive vanilla-style skill XP, so level planning should include manual allocation expectations.",
      ),
      setting(
        "experience.general.iMaxPlayerLevel",
        "Experience level cap",
        "100",
        "Long-term progression is bounded by the local Experience configuration.",
      ),
    ],
    sections: [
      {
        title: "What build planning means here",
        paragraphs: [
          "A good build plan starts with a near-term route: how the character survives, earns, sleeps, eats, and avoids bad fights. Race, sign, trait, religion, kit, and first hub should be described together because the player experiences them as one practical opening package.",
        ],
      },
    ],
    evidence: [
      ...coreEvidence,
      {
        label: "Experience preset",
        path: `${mcm}/SKSE/Plugins/Experience.ini`,
        note: "Provides quoteable progression and skill-XP settings.",
      },
      {
        label: "Alternate start settings",
        path: `${mcm}/SKSE/AlternatePerspective/AlternatePerspective.json`,
        note: "Supports onboarding and start-flow documentation.",
      },
    ],
    verificationNotes: [
      "Starter-kit item lists should be captured in-game or from plugin records before being quoted item-by-item.",
    ],
    related: ["first-session-setup", "requiem-progression"],
  }),
  entry({
    slug: "requiem-progression",
    kind: "systemArticle",
    section: "progression",
    title: "Requiem Progression",
    strapline:
      "Requiem is the baseline, but Authoria's final behavior comes from local patches, presets, and generated outputs.",
    summary:
      "Progression in Authoria should be documented as a layered ruleset: Requiem establishes danger and role definition, NoxCrab/Noxrim-adjacent tweaks reshape starts and survival, and late Authoria outputs decide many final record-level outcomes.",
    tags: ["requiem", "progression", "noxrim", "difficulty", "power curve"],
    playerExperience: [
      "The player cannot treat generic level gain as a universal safety net.",
      "Gear, resistances, stamina, route knowledge, and follower decisions often matter before raw level does.",
      "A dungeon feeling impossible may be correct information rather than poor balance.",
    ],
    progressionImpact: [
      "Early character choices remain load-bearing longer than in vanilla.",
      "Economy, food, spell learning, locks, dragons, and boss encounters should all be framed as progression systems.",
      "Generated and late Authoria patches can be more authoritative than upstream descriptions.",
    ],
    practicalGuidance: [
      "Write Requiem claims from local evidence first.",
      "Separate general Requiem advice from ARR-final behavior.",
      "Mark any boss, dragon, or quest readiness claim as unverified until checked against local output or play.",
    ],
    uxTouchpoints: [
      "Requiem MCM",
      "Experience config",
      "Static Skill Leveling",
      "Late output plugins",
      "Difficulty settings",
    ],
    evidenceDossier: [
      {
        publicLabel: "Local Requiem preset",
        internalSources: ["MCM/Settings/Requiem.ini"],
      },
      {
        publicLabel: "Noxrim starting-choice layer",
        internalSources: ["Starting Choices - Noxrim entries in profile and load order"],
      },
      {
        publicLabel: "Late Authoria patch layer",
        internalSources: [
          "Authoria - Requiem Master Patch.esp",
          "Authoria - Reqtificator Lite Output.esp",
          "Requiem for the Indifferent.esp",
        ],
      },
    ],
    settingQuotes: [
      setting(
        "requiem.general.fDiffMultHPByPCL",
        "Player outgoing damage scalar",
        "0.8",
        "Difficulty should be described from local tuning rather than assumed vanilla damage parity.",
      ),
      setting(
        "requiem.general.iHoursToRespawnCellCleared",
        "Cleared-cell respawn time",
        "7200 hours",
        "Cleared places should be treated as long-term world state, not quick-repeat farm spaces.",
      ),
    ],
    sections: [
      {
        title: "Article standard for Requiem claims",
        paragraphs: [
          "A Requiem article should not say only that Requiem changes combat or progression. It should say what the player should do differently, what evidence supports that claim, and which local output could have changed the final rule.",
        ],
      },
    ],
    evidence: [
      ...coreEvidence,
      {
        label: "Requiem MCM preset",
        path: `${mcm}/MCM/Settings/Requiem.ini`,
        note: "Quoteable runtime settings for local Requiem behavior.",
      },
      ...outputEvidence,
    ],
    verificationNotes: [
      "Specific perk, race, birthsign, spell, and boss behavior needs xEdit or in-game verification before detailed advice.",
    ],
    related: ["combat-rhythm-and-dodge-commitment", "economy-gear-and-open-world-work"],
  }),
  entry({
    slug: "combat-rhythm-and-dodge-commitment",
    kind: "systemArticle",
    section: "combat",
    title: "Combat Rhythm and Dodge Commitment",
    strapline:
      "Combat is about commitment, stamina, spacing, and knowing when the correct answer is to leave.",
    summary:
      "The old guide named the combat stack. The article-grade guide explains how it plays: dodge access can be gated, animation commitment matters, wounds and stamina turn mistakes into route problems, and Requiem makes enemy selection part of combat skill.",
    tags: ["combat", "dodge", "stamina", "wounds", "bosses"],
    playerExperience: [
      "The player needs to watch enemy commitment, stamina state, injury state, and escape options.",
      "Winning a fight with bad wounds or no supplies can still fail the route.",
      "Some fights are information: come back later, bring tools, or bring help.",
    ],
    progressionImpact: [
      "Dodge access and stamina economy make armor/perk choices part of survivability.",
      "Follower-backed play can make difficult fights readable sooner but can also add management overhead.",
    ],
    practicalGuidance: [
      "Document whether an encounter punishes aggression, bad spacing, or attrition.",
      "Tell readers when retreat is normal.",
      "Quote dodge, movement, and wound settings when available.",
    ],
    uxTouchpoints: [
      "TK Dodge Addon",
      "True Directional Movement",
      "Wounds",
      "Precision",
      "Custom movesets",
    ],
    settingQuotes: [],
    sections: [
      {
        title: "How to write fights",
        paragraphs: [
          "Encounter guidance should mention the kind of mistake the fight punishes. A bandit route, boss room, dragon, and Vicn boss should not all be described as merely hard; they need different preparation language.",
        ],
      },
    ],
    evidence: [
      ...coreEvidence,
      { label: "Dodge preset", path: `${mcm}/MCM/Settings/TKDodgeAddon.ini`, note: "Local dodge behavior and keybinding surface." },
      { label: "Movement preset", path: `${mcm}/MCM/Settings/TrueDirectionalMovement.ini`, note: "Camera and movement readability surface." },
      { label: "Wounds preset", path: `${mcm}/MCM/Settings/Wounds.ini`, note: "Local injury and attrition behavior surface." },
      ...outputEvidence,
    ],
    verificationNotes: [
      "Dodge perk-gate text should be verified against the active patch records before being presented as final for all difficulty modes.",
    ],
    related: ["requiem-progression", "followers-and-party-power"],
  }),
  entry({
    slug: "survival-seasons-and-travel",
    kind: "systemArticle",
    section: "survival",
    title: "Survival, Seasons, and Travel",
    strapline:
      "Travel is part of the challenge loop; winter, distance, weather, food, and map readability all change route quality.",
    summary:
      "Authoria's survival layer should be explained as route design. SunHelm, Frostfall, seasons, camping, map markers, paper maps, and Requiem survival patches combine to make movement between objectives a real gameplay decision.",
    tags: ["survival", "travel", "seasons", "map", "camping"],
    playerExperience: [
      "The player needs to think about supplies and return paths before accepting distant work.",
      "Season choice is not flavor if cold, daylight, and travel burden are active.",
      "Map support changes whether a region is readable or intimidating.",
    ],
    progressionImpact: [
      "A safe early quest can become unsafe if it requires long cold travel with poor resupply.",
      "Hub guides need survival and map notes, not only enemy notes.",
    ],
    practicalGuidance: [
      "Document food, fatigue, cold, rest, camping, and resupply together.",
      "Mention whether a route is a day trip, overnight risk, or campaign departure.",
      "Treat winter as a progression modifier.",
    ],
    uxTouchpoints: [
      "SunHelm",
      "Frostfall",
      "Campfire",
      "Seasonal presets",
      "Map markers and paper maps",
    ],
    sections: [
      {
        title: "Route articles need weather logic",
        paragraphs: [
          "A region guide that ignores exposure and map readability will mislead players. The same objective can be reasonable from one hub and a poor decision from another if the player cannot rest, eat, warm up, or read the route.",
        ],
      },
    ],
    evidence: [
      ...coreEvidence,
      { label: "SunHelm profiles", path: `${mcm}/SunHelm/Config`, note: "Local survival difficulty profile values." },
      { label: "Frostfall recorder data", path: `${mcm}/McmRecorder/KoK_Base`, note: "Captured survival and cold MCM state." },
      { label: "Map marker settings", path: `${mcm}/mapmarkers/Atlas Map Markers.json`, note: "Local map readability configuration." },
    ],
    verificationNotes: [
      "Season-specific route severity should be checked in-game for high-value early hubs.",
    ],
    related: ["riverwood-whiterun-early-hub", "requiem-progression"],
  }),
  entry({
    slug: "economy-gear-and-open-world-work",
    kind: "systemArticle",
    section: "progression",
    title: "Economy, Gear, and Open-World Work",
    strapline:
      "Stabilizing a character means earning, buying, looting, and choosing work that does not overmatch the build.",
    summary:
      "The old guide's note that modded armors and weapons are not craftable should become a full itemization article. Gear enters through merchants, bandits, dungeon chests, unique rewards, bounties, and displays; that makes economy and task selection part of progression.",
    tags: ["economy", "gear", "missives", "bounties", "itemization"],
    playerExperience: [
      "The player makes a living through modest work before major heroics become sensible.",
      "Buying and looting can matter more than crafting if modded gear is deliberately world-integrated.",
      "Task boards help bridge the gap between a vulnerable start and large quest arcs.",
    ],
    progressionImpact: [
      "Trade settings, bounty rewards, and quest XP decide how fast a character stabilizes.",
      "Display replicas and museum progress should not be mistaken for combat power unless the local rule preserves an artifact property.",
    ],
    practicalGuidance: [
      "Hub pages should identify nearby low-commitment work.",
      "Gear articles should say whether an item is bought, looted, rewarded, displayed, or not craftable.",
      "Quest arc pages should identify when the player should stop doing errands and prepare for a campaign.",
    ],
    uxTouchpoints: [
      "Missives",
      "Bounty Hunter",
      "Trade and Barter",
      "Experience",
      "Gear distribution notes",
    ],
    settingQuotes: [
      setting(
        "trade-and-barter.barterrates.iPresetChoice",
        "Trade and Barter preset",
        "5",
        "Economy claims should quote the local preset rather than assume default vendor pricing.",
      ),
    ],
    sections: [
      {
        title: "From checklist to economy loop",
        paragraphs: [
          "The useful player question is not only whether an armor is craftable. It is how the player is expected to climb from vulnerable gear to adequate gear without accidentally starting a campaign-scale quest.",
        ],
      },
    ],
    evidence: [
      ...coreEvidence,
      { label: "Trade preset", path: `${mcm}/MCM/Settings/trade & barter.ini`, note: "Local pricing preset." },
      { label: "Missives preset", path: `${mcm}/MCM/Settings/Missives.ini`, note: "Task-board configuration surface." },
      { label: "Experience preset", path: `${mcm}/SKSE/Plugins/Experience.ini`, note: "Quest and clearing XP values." },
      ...outputEvidence,
    ],
    verificationNotes: [
      "Armor/weapon placement should be imported from the existing spreadsheet or harvested from distribution records before item-level pages are written.",
    ],
    related: ["riverwood-whiterun-early-hub", "requiem-progression"],
  }),
  entry({
    slug: "followers-and-party-power",
    kind: "systemArticle",
    section: "companions",
    title: "Followers and Party Power",
    strapline:
      "Followers can make Requiem survivable earlier, but they also change pacing, chatter density, and management burden.",
    summary:
      "Companion documentation should not be a recruitable-name list. It should explain how party play changes risk, travel, combat readability, banter, and follower weakening expectations in Authoria.",
    tags: ["companions", "followers", "party", "balance"],
    playerExperience: [
      "The player can choose a harsher solo route or a party-backed route with more support and more overhead.",
      "Follower-heavy play can flatten some early danger while increasing dialogue and control burden.",
      "The guide should help the player choose companions for route and tone, not only popularity.",
    ],
    progressionImpact: [
      "Follower access can change what is safe early.",
      "Follower weakening and local balance settings are essential context for party size advice.",
    ],
    practicalGuidance: [
      "Every companion page should say whether the follower helps combat, utility, travel, story, or banter most.",
      "Do not include companions that are being removed from the build.",
      "Mention when a follower has major quest or new-land interactions.",
    ],
    uxTouchpoints: [
      "Follower Stats",
      "Simple follower controls",
      "Follower Dialogue Expansion interactions",
      "Follower weakening choices",
    ],
    settingQuotes: [
      setting(
        "follower-stats.main.iScale",
        "Follower stat scale",
        "50",
        "Party-power guidance should account for local follower scaling rather than assuming upstream follower strength.",
      ),
    ],
    sections: [
      {
        title: "Companion page template",
        paragraphs: [
          "Each page should cover recruitment, early safety, combat role, chatter density, travel utility, local tuning, party-size expectations, and quest interactions. The goal is to let readers choose a party strategy, not browse installed follower mods.",
        ],
      },
    ],
    evidence: [
      ...coreEvidence,
      { label: "Follower stats preset", path: `${mcm}/MCM/Settings/Follower Stats.ini`, note: "Local follower scaling surface." },
      ...outputEvidence,
    ],
    verificationNotes: [
      "Recruitment routes and companion-specific stat changes need follower-by-follower verification before final publication.",
    ],
    related: ["inigo", "kaidan", "auri", "lucien", "remiel", "xelzaz"],
  }),
  ...[
    ["inigo", "Inigo", "Strong story presence and combat support make Inigo a route-shaping companion rather than background utility."],
    ["kaidan", "Kaidan", "Kaidan needs coverage for immersive features, alternate start hooks, camp/tent support, and high banter density."],
    ["auri", "Auri", "Auri should be documented around wilderness tone, banter links, Vigilant commentary, and Requiem of the Green tuning."],
    ["lucien", "Lucien", "Lucien is a knowledge-and-banter companion whose value depends on early safety, growth curve, and quest interaction."],
    ["remiel", "Remiel", "Remiel needs a utility/story page around Dwemer expertise, banter patches, and local Requiem support."],
    ["xelzaz", "Xelzaz", "Xelzaz should be framed as a high-context Telvanni companion with Wyrmstooth and Sirenroot support."],
    ["mrissi", "M'rissi", "M'rissi should be treated as follower-plus-quest content with route and tone expectations."],
    ["thogra", "Thogra", "Thogra needs a page for Orc follower recruitment, camp changes, and early combat support."],
    ["yoana", "Yoana", "Yoana should be documented as a custom voiced follower once recruitment and role are verified."],
  ].map(([slug, title, strapline]) =>
    entry({
      slug,
      kind: "companionArticle",
      section: "companions",
      title,
      strapline,
      summary:
        "This companion page is a first-pass article shell: it captures the Authoria-specific questions to answer before publication and avoids treating the follower stack as a public mod list.",
      tags: ["companion", "follower", title.toLowerCase()],
      playerExperience: [
        "The player should understand recruitment friction, route usefulness, and how much attention the companion adds.",
        "The page should describe whether this follower primarily adds safety, story, utility, banter, or travel comfort.",
      ],
      progressionImpact: [
        "A companion can change early encounter safety and travel confidence.",
        "Local Requiem and follower balance layers may make upstream power assumptions unreliable.",
      ],
      practicalGuidance: [
        "Verify recruitment and initial location before publishing as final.",
        "Document combat role and party-size fit.",
        "Capture cross-companion and quest arc commentary where present.",
      ],
      uxTouchpoints: ["Follower controls", "Dialogue", "Party management", "Follower balance settings"],
      sections: [
        {
          title: "Open capture questions",
          paragraphs: [
            "This page should be completed from ARR evidence and in-game verification: where the companion enters play, what they change about safe routes, and whether they interact with large quest arcs or other major companions.",
          ],
        },
      ],
      evidence: [
        ...coreEvidence,
        { label: "Follower balance preset", path: `${mcm}/MCM/Settings/Follower Stats.ini`, note: "Shared party-power evidence." },
        ...outputEvidence,
      ],
      verificationNotes: [
        "Recruitment location, starting level/stat behavior, and banter coverage still need direct verification.",
      ],
      related: ["followers-and-party-power"],
    }),
  ),
  entry({
    slug: "riverwood-whiterun-early-hub",
    kind: "regionGuide",
    section: "regions",
    title: "Riverwood and Whiterun Early Hub",
    strapline:
      "The safest first route is a stabilizing loop: shelter, vendors, low-commitment work, and known roads before ambition.",
    summary:
      "The first region guide should answer where to go first by describing Riverwood and Whiterun as a practical stabilization corridor: resupply, rest, map readability, manageable work, nearby dangers, and follower-supported expansion.",
    tags: ["region", "early game", "whiterun", "riverwood", "safe route"],
    playerExperience: [
      "The player needs a place to turn system knowledge into routine: sleep, eat, sell, buy, take work, and avoid bad fights.",
      "A good early hub reduces confusion without pretending Requiem danger is gone.",
    ],
    progressionImpact: [
      "Stable hubs let fragile characters build money and gear before campaign arcs.",
      "Nearby dungeons and roads need risk labels, not only location names.",
    ],
    practicalGuidance: [
      "Describe resupply, bed access, vendors, carriage access, and board work.",
      "Mark nearby danger as safe, risky, or avoid.",
      "Mention whether winter or survival pressure changes the route.",
    ],
    uxTouchpoints: ["Map markers", "Missives", "Trade", "Survival widgets"],
    sections: [
      {
        title: "Hub guide standard",
        paragraphs: [
          "Each hub page should help a player decide whether to stay local, take short work, recruit help, or travel. The article should be practical enough to prevent an accidental campaign start.",
        ],
      },
    ],
    evidence: [
      ...coreEvidence,
      { label: "Map marker settings", path: `${mcm}/mapmarkers/Atlas Map Markers.json`, note: "Supports map-readability claims." },
      { label: "Missives preset", path: `${mcm}/MCM/Settings/Missives.ini`, note: "Supports local work-loop claims." },
    ],
    verificationNotes: [
      "Specific nearby dungeon danger labels need in-game or xEdit-backed review.",
    ],
    related: ["economy-gear-and-open-world-work", "survival-seasons-and-travel"],
  }),
  ...[
    ["falkreath-hub", "Falkreath Hub", "A forest hub where survival, roads, and nearby quest hooks need careful early labels."],
    ["riften-ivarstead-corridor", "Riften and Ivarstead Corridor", "A travel corridor where road safety, resupply, and quest temptation need explicit staging."],
    ["solitude-hub", "Solitude Hub", "A high-service hub that can stabilize money and travel but may tempt overcommitment."],
    ["windhelm-hub", "Windhelm Hub", "A cold-weather hub where season and survival pressure should be first-class guidance."],
    ["winterhold-hub", "Winterhold Hub", "A harsh northern hub where magic ambition and exposure risk need to be documented together."],
    ["markarth-hub", "Markarth Hub", "A western hub whose roads, terrain, and local quest density require stronger risk warnings."],
  ].map(([slug, title, strapline]) =>
    entry({
      slug,
      kind: "regionGuide",
      section: "regions",
      title,
      strapline,
      summary:
        "This hub guide shell defines the evidence and questions needed before the page becomes final early-progression advice.",
      tags: ["region", "hub", "early progression"],
      playerExperience: ["The player needs to know whether this hub is stabilizing, risky, remote, or campaign-adjacent."],
      progressionImpact: ["Hub choice changes supply cost, route risk, follower value, and available low-commitment work."],
      practicalGuidance: ["Capture beds, vendors, food, boards, carriages, safe roads, and avoid-until-ready routes."],
      uxTouchpoints: ["Map markers", "Survival widgets", "Missives", "Carriage/travel surfaces"],
      sections: [{ title: "Capture target", paragraphs: ["Fill this page from ARR map, survival, quest, and in-game route evidence before publishing as final advice."] }],
      evidence: coreEvidence,
      verificationNotes: ["Needs route walk, resupply audit, and local danger labeling."],
      related: ["survival-seasons-and-travel", "economy-gear-and-open-world-work"],
    }),
  ),
  ...[
    ["vigilant", "Vigilant", "A campaign-scale arc that should be approached through readiness, delayed start, map support, and Requiem patch context."],
    ["glenmoril", "Glenmoril", "A Vicn arc whose prerequisites, sleep trigger, worldspace burden, and local Requiem patch need dedicated explanation."],
    ["unslaad", "Unslaad", "A late Vicn arc where level, main-quest completion, prior arc completion, travel, and boss support must be explicit."],
    ["dac0da", "Dac0da", "A prerequisite-heavy authored arc that functions as part of the Vicn campaign chain in Authoria."],
    ["wyrmstooth", "Wyrmstooth", "A large island/worldspace arc needing readiness, travel, map, and companion-interaction guidance."],
    ["olenveld", "Olenveld", "A new-land arc that needs route, undead/draugr profile, and Requiem support documentation."],
    ["sirenroot", "Sirenroot", "A focused quest arc with local Requiem support and companion interaction hooks to verify."],
    ["siege-at-icemoth", "Siege at Icemoth", "A cold-region worldspace arc where survival and Requiem readiness should be linked."],
    ["forgotten-city", "The Forgotten City", "A self-contained quest arc needing entry timing, travel expectations, and spoiler-safe guidance."],
    ["saints-and-seducers-extended-cut", "Saints and Seducers Extended Cut", "A Creation Club expansion arc with local patch context and readiness expectations."],
    ["penitus-oculatus", "Penitus Oculatus", "A faction/questline expansion that needs roleplay timing and local balance review."],
    ["legacy-of-the-dragonborn", "Legacy of the Dragonborn", "A museum and artifact arc where replicas, display logic, and power expectations need explicit framing."],
  ].map(([slug, title, strapline]) =>
    entry({
      slug,
      kind: "questArcGuide",
      section: "quest-arcs",
      title,
      strapline,
      summary:
        "This quest-arc guide frames the content as a campaign decision, not an entry in a mod list. It should connect entry timing, route burden, combat profile, and local patch authority.",
      tags: ["quest arc", "worldspace", title.toLowerCase()],
      playerExperience: [
        "The player needs to know whether this is a short detour, a self-contained region, or a major commitment.",
        "Delayed starts and map support should be explained as curation, not trivia.",
      ],
      progressionImpact: [
        "Large arcs can overmatch a character if entered before the right tools, level, route knowledge, or prior quests.",
      ],
      practicalGuidance: [
        "Capture entry requirements and delayed-start behavior.",
        "Describe travel and map expectations.",
        "Document Requiem/local patch implications before publishing encounter advice.",
      ],
      uxTouchpoints: ["Quest start", "Map support", "Boss bars", "Follower commentary", "Travel/survival surfaces"],
      sections: [
        {
          title: "Campaign framing",
          paragraphs: [
            "The old guide listed major quests and Vicn requirements. These pages should turn those requirements into readiness advice: why the gate exists, what the player should prepare, and what kind of experience they are starting.",
          ],
        },
      ],
      evidence: [
        ...coreEvidence,
        { label: "Large-content patch layer", path: xedit, note: "Contains local compatibility and Requiem patches for major quest/worldspace content." },
        { label: "Map support layer", path: `${arr}/mods/Authoria - FMWF Map Marker Settings`, note: "Supports navigation and worldspace map claims." },
      ],
      verificationNotes: [
        "Exact trigger requirements should be checked against local plugin records and in-game behavior before final wording.",
      ],
      related: ["survival-seasons-and-travel", "requiem-progression"],
    }),
  ),
  entry({
    slug: "preset-facts",
    kind: "presetFactReference",
    section: "settings",
    title: "Quoteable Preset Facts",
    strapline:
      "Settings should be quoted as concrete local values when the guide uses them to explain gameplay.",
    summary:
      "The settings layer extracts values from local ARR configuration files so article text can say what is actually configured instead of pointing vaguely at a file.",
    tags: ["settings", "presets", "evidence", "extraction"],
    playerExperience: [
      "The player sees clearer explanations when the guide quotes important local values instead of naming config files.",
    ],
    progressionImpact: [
      "Concrete settings clarify survival, economy, combat, follower, and leveling expectations.",
    ],
    practicalGuidance: [
      "Use extracted facts for numeric claims.",
      "Keep raw file paths in evidence, not main article prose.",
      "Mark ambiguous settings for human interpretation.",
    ],
    uxTouchpoints: ["Settings pages", "Evidence citations", "Article callouts"],
    sections: [
      {
        title: "Extraction scope",
        paragraphs: [
          "The first parser handles INI, JSON, TOML-style key/value files, and simple XML values. It is intentionally thin: it creates candidate facts for article authors rather than pretending every setting is already meaningful.",
        ],
      },
    ],
    evidence: [
      { label: "MCM settings", path: `${mcm}/MCM/Settings`, note: "Primary quoteable MCM preset directory." },
      { label: "SKSE plugin settings", path: `${mcm}/SKSE/Plugins`, note: "Plugin-level gameplay and UX settings." },
      { label: "Recorder profiles", path: `${mcm}/McmRecorder`, note: "Captured preset bundles for survival and difficulty variants." },
    ],
    verificationNotes: [
      "Extracted values are facts about files; gameplay interpretation still needs article review.",
    ],
    related: ["first-session-setup", "requiem-progression"],
  }),
  entry({
    slug: "authoria-evidence-dossier",
    kind: "evidenceDossier",
    section: "evidence",
    title: "Authoria Evidence Dossier",
    strapline:
      "The maintainer view keeps raw mod, plugin, preset, and output provenance available without turning the public guide into a catalog.",
    summary:
      "Authoria's public articles should read like gameplay guidance. This dossier explains the private evidence model behind them: active profile truth, runtime presets, late patch layers, generated outputs, and verification notes.",
    tags: ["evidence", "maintenance", "outputs", "provenance"],
    playerExperience: [
      "The player benefits indirectly because claims are stronger and less hand-wavy.",
    ],
    progressionImpact: [
      "Late outputs can redefine combat, NPC, item, quest, and worldspace behavior.",
    ],
    practicalGuidance: [
      "Use this as the source map for future overnight harvest runs.",
      "Keep raw inventory details in evidence/debug views.",
      "Convert raw source names into reader-facing claims before publication.",
    ],
    uxTouchpoints: ["Evidence page", "Article citations", "Maintainer review"],
    evidenceDossier: [
      {
        publicLabel: "Profile truth set",
        internalSources: ["modlist.txt", "plugins.txt", "loadorder.txt", "modlist_report_gold.csv"],
      },
      {
        publicLabel: "Runtime preset layer",
        internalSources: ["MCM/Settings", "SKSE/Plugins", "McmRecorder", "SunHelm/Config"],
      },
      {
        publicLabel: "Late output authority",
        internalSources: ["Authoria - xEdit Output", "Authoria - Synthesis Output", "Authoria - RFTI Output"],
      },
    ],
    sections: [
      {
        title: "Boundary",
        paragraphs: [
          "This dossier can name raw sources because it is an evidence-maintenance page. Reader-first articles should translate those names into gameplay meaning and keep the raw details secondary.",
        ],
      },
    ],
    evidence: [...coreEvidence, ...outputEvidence],
    verificationNotes: [
      "Future binary plugin harvesting should add record-level citations for high-risk claims.",
    ],
    related: ["preset-facts", "requiem-progression"],
  }),
];

export function getAllEntries() {
  return entries;
}

export function getEntriesByKind(kind: ReferenceKind) {
  return entries.filter((entry) => entry.kind === kind);
}

export function getEntriesBySection(section: ReferenceSection) {
  return entries.filter((entry) => entry.section === section);
}

export function getEntry(section: ReferenceSection, slug: string) {
  return entries.find((entry) => entry.section === section && entry.slug === slug);
}

export function getEntryBySlug(slug: string) {
  return entries.find((entry) => entry.slug === slug);
}

export function getRelatedEntries(slugs: string[]) {
  return slugs
    .map((slug) => getEntryBySlug(slug))
    .filter((entry): entry is ReferenceEntry => Boolean(entry));
}

export function getSection(section: string) {
  return sectionDefinitions.find((item) => item.slug === section);
}

export function getArticleHref(entry: ReferenceEntry) {
  return `/${entry.section}/${entry.slug}`;
}
