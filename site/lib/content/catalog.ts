import type { ReferenceEntry, ReferenceKind } from "@/lib/content/schema";

const entries: ReferenceEntry[] = [
  {
    slug: "requiem-progression",
    kind: "system",
    title: "Requiem Progression",
    strapline: "Authoria assumes a harsher, slower, and more gated power curve than vanilla Skyrim.",
    summary:
      "Progression in this build is primarily interpreted through Requiem and then narrowed further by late Authoria patches, local MCM presets, and generated outputs. Readers should expect gear, economy, encounter access, and perk value to matter earlier and for longer than in a vanilla-derived guide.",
    questionsAnswered: [
      "Why does early progression feel slower and more dangerous than vanilla?",
      "Where do the final progression rules come from in ARR?",
      "Which local files should be checked before making claims about balance?",
    ],
    tags: ["progression", "requiem", "difficulty", "economy"],
    playerExperience: [
      "The player is pushed to treat route planning, gear upgrades, and combat selection as meaningful decisions rather than background friction.",
      "Leveling is not the only or even primary power signal; access to the right tools, resistances, and encounter knowledge matters earlier.",
      "A reference guide that ignores the late patch layer will understate how deliberate the pacing is supposed to feel.",
    ],
    progressionImpact: [
      "Early game choices stay load-bearing longer because Requiem-style scaling reduces the safety net of generic level gain.",
      "Economy and crafting access should be documented as progression systems, not side systems.",
      "Readers need to know when an apparent rule is upstream Requiem versus a local Authoria patch expectation.",
    ],
    uxTouchpoints: [
      "Requiem MCM preset",
      "Trade and economy settings",
      "Difficulty toggles and optional nerf mods",
      "Late xEdit and Synthesis outputs that finalize record behavior",
    ],
    implementationChain: {
      upstream: [
        "Requiem",
        "Requiem sub-overhauls such as Alchemy, Races, Birthsigns, Weapons and Armor, and Magic Redone",
      ],
      requiem: [
        "Requiem Patch Central - rerun",
        "Undeniable's Requiem Patch Compendium",
        "A. Requiem - Auto NPC Patcher - Main File",
        "Unofficial Reqtificator Lite - Main File",
      ],
      authoria: [
        "Authoria - Requiem Master Patch.esp",
        "Authoria - Requiem Lite Patches.esp",
        "Authoria - Reqtificator Lite Output.esp",
        "Requiem for the Indifferent.esp",
      ],
    },
    sections: [
      {
        title: "What readers should internalize first",
        paragraphs: [
          "This build should not be documented with vanilla assumptions. The progression story is a layered ruleset in which Requiem establishes the baseline and the local Authoria outputs decide the final shape of many record-level outcomes.",
          "When a reader asks why a dungeon feels overtuned, why certain gear matters sooner, or why a follower or spell package performs differently than expected, the reference guide should answer at the level of the final install, not the upstream marketing copy.",
        ],
        bullets: [
          "Treat access, preparation, and loadout as part of progression.",
          "Treat local outputs as high-priority evidence.",
          "Separate upstream design intent from ARR-final behavior.",
        ],
      },
      {
        title: "Where progression claims should be verified",
        paragraphs: [
          "The fastest evidence path is the ARSE report and profile files, then the late Authoria outputs. The report tells you what is enabled and where it sits in the order; the output mods tell you how that final state was reshaped.",
          "If a claim touches NPC strength, perk access, leveled lists, or compatibility for new content, the Reqtificator Lite output, Auto NPC Patcher, and xEdit output layer should be treated as first-class references.",
        ],
      },
    ],
    evidence: [
      {
        label: "Live mod inventory report",
        path: "D:/Wabbajack/modlists/ARR/profiles/ARSE/modlist_report_gold.csv",
        note: "Confirms enabled Requiem-family mods, local custom mods, priorities, and plugin hashes.",
      },
      {
        label: "Enabled mod order",
        path: "D:/Wabbajack/modlists/ARR/profiles/ARSE/modlist.txt",
        note: "Shows the Requiem grouping, optional settings, and Authoria output placement in MO2 order.",
      },
      {
        label: "Requiem preset surface",
        path: "D:/Wabbajack/modlists/ARR/mods/Authoria - MCM and INI Settings/MCM/Settings/Requiem.ini",
        note: "Documents player-facing Requiem runtime settings rather than only plugin records.",
      },
      {
        label: "Late conflict layer",
        path: "D:/Wabbajack/modlists/ARR/mods/Authoria - xEdit Output",
        note: "Contains final local patch plugins for progression-sensitive systems.",
      },
    ],
    related: [
      "starting-a-character-in-authoria",
      "survival-and-travel-pressure",
      "authoria-output-layer",
    ],
  },
  {
    slug: "survival-and-travel-pressure",
    kind: "system",
    title: "Survival and Travel Pressure",
    strapline: "Movement through the world is part of the challenge loop, not a dead zone between encounters.",
    summary:
      "Travel in ARR appears to be shaped by Requiem expectations, survival patches, map choices, and runtime presets that make movement, weather, and route planning part of the gameplay burden. The guide should describe how travel feels, what systems create that friction, and which settings soften or sharpen it.",
    questionsAnswered: [
      "Why does travel feel more consequential in Authoria?",
      "Which systems turn movement into a gameplay decision?",
      "Where should survival claims be checked locally?",
    ],
    tags: ["survival", "travel", "sunhelm", "frostfall", "map"],
    playerExperience: [
      "The player is likely expected to think about exposure, supplies, destination order, and return path more often than in a fast-travel-first Skyrim rhythm.",
      "Travel convenience is part of build knowledge: readers need to know which tools, map aids, or presets make the world legible enough to manage.",
    ],
    progressionImpact: [
      "Early-game survival burden changes which quests feel reasonable to start.",
      "Travel friction amplifies economy pressure because food, camping, and resupply matter.",
      "Quest documentation should mention travel readiness, not only quest prerequisites.",
    ],
    uxTouchpoints: [
      "SunHelm and Frostfall-adjacent presets",
      "Map marker settings",
      "Paper map stack",
      "Profile-local INIs and recorder presets",
    ],
    implementationChain: {
      upstream: [
        "Survival-oriented mods such as SunHelm, Frostfall-adjacent settings, and map frameworks",
      ],
      requiem: [
        "Requiem - Noxcrab's Survival Mod Patches",
        "Sunhelm Patch for CC Survival Food - Requiem",
        "Requiem - Survival Spells",
      ],
      authoria: [
        "Authoria - MCM and INI Settings",
        "Authoria - FMWF Map Marker Settings",
        "Authoria - UI Positioning",
      ],
    },
    sections: [
      {
        title: "Travel as part of the gameplay loop",
        paragraphs: [
          "A good Authoria guide should explain travel burden the same way it explains combat burden. If readers are sent into a region or questline without context on exposure, rest cadence, or map legibility, the guide is missing part of how the build actually works.",
          "The travel layer is also a UX topic: widgets, marker density, paper maps, and control mappings all decide whether the friction reads as intentional tension or opaque hassle.",
        ],
      },
      {
        title: "What to record when documenting a route or region",
        paragraphs: [
          "Capture whether the player is expected to stock food, camping supplies, warmth support, or follower help. Note whether the route is readable from the current map setup or requires local knowledge.",
        ],
        bullets: [
          "Mention route safety and resupply expectations.",
          "Mention whether the map stack clarifies or obscures the destination.",
          "Mention any MCM or preset choices that materially change the burden.",
        ],
      },
    ],
    evidence: [
      {
        label: "Map marker settings",
        path: "D:/Wabbajack/modlists/ARR/mods/Authoria - MCM and INI Settings/mapmarkers/Atlas Map Markers.json",
        note: "Shows that map readability is being curated locally.",
      },
      {
        label: "Runtime presets",
        path: "D:/Wabbajack/modlists/ARR/mods/Authoria - MCM and INI Settings/McmRecorder/KoK_Base",
        note: "Contains captured MCM state for survival-adjacent systems.",
      },
      {
        label: "Enabled travel-related stack",
        path: "D:/Wabbajack/modlists/ARR/profiles/ARSE/modlist.txt",
        note: "Shows paper maps, FWMF support, and survival-related enabled mods in order context.",
      },
    ],
    related: ["map-navigation-and-paper-maps", "starting-a-character-in-authoria"],
  },
  {
    slug: "map-navigation-and-paper-maps",
    kind: "system",
    title: "Map Navigation and Paper Maps",
    strapline: "Navigation in ARR is curated as a presentation system, not just a utility menu.",
    summary:
      "The active mod order places map and paper-map content near the top of the user-facing customization stack, which suggests that navigation readability is a designed experience in its own right. The guide should treat maps as a player-experience system with both UX and exploration consequences.",
    questionsAnswered: [
      "Why are there so many paper map and marker mods enabled?",
      "How should the guide talk about navigation in this build?",
      "Which local files shape map readability?",
    ],
    tags: ["maps", "navigation", "exploration", "fwmf", "ux"],
    playerExperience: [
      "The player is likely meant to read the world through a stylized paper-map presentation rather than a default utility map.",
      "Navigation quality depends on both the map assets and the marker configuration, so players may experience the same region differently depending on those local settings.",
    ],
    progressionImpact: [
      "Readable navigation lowers accidental travel friction and helps the player decide when a route is worth attempting.",
      "Poorly documented map behavior can make exploration guides feel wrong even when the quest facts are accurate.",
    ],
    uxTouchpoints: [
      "Flat World Map Framework",
      "Authoria - FMWF Map Marker Settings",
      "Paper map mods for quest and worldspace expansions",
      "UI positioning and marker-related presets",
    ],
    implementationChain: {
      upstream: [
        "Flat World Map Framework (FWMF)",
        "paper map packs for worldspaces and quest mods",
      ],
      requiem: ["Navigation is downstream of the world and travel stack, even when not directly patched by Requiem."],
      authoria: [
        "Authoria - FMWF Master Patch.esp",
        "Authoria - FMWF Map Marker Settings",
      ],
    },
    sections: [
      {
        title: "Why this deserves first-class documentation",
        paragraphs: [
          "Navigation is one of the clearest examples of why Authoria should be documented as a player experience rather than as a list of plugins. The map stack changes how readers orient themselves, what they trust, and how intimidating a worldspace feels before they even enter it.",
        ],
      },
      {
        title: "What a guide should mention",
        paragraphs: [
          "When a quest, new land, or dungeon route is documented, note whether the map layer meaningfully supports it. Some worldspaces have dedicated paper maps; others rely more heavily on route knowledge or marker configuration.",
        ],
      },
    ],
    evidence: [
      {
        label: "Map-heavy MO2 grouping",
        path: "D:/Wabbajack/modlists/ARR/profiles/ARSE/modlist.txt",
        note: "Shows paper map entries clustered around the FWMF stack.",
      },
      {
        label: "Authoria map patch output",
        path: "D:/Wabbajack/modlists/ARR/profiles/ARSE/modlist_report_gold.csv",
        note: "Confirms Authoria - FMWF Map Marker Settings and its plugin output.",
      },
    ],
    related: ["survival-and-travel-pressure", "starting-a-character-in-authoria"],
  },
  {
    slug: "starting-a-character-in-authoria",
    kind: "experience",
    title: "Starting a Character in Authoria",
    strapline: "The opening hours are a negotiation between alternate start freedom, survival burden, and Requiem danger.",
    summary:
      "A new-character guide for this build should focus less on raw feature lists and more on what a safe first session feels like: what to configure, how the alternate start stack works, what travel and survival pressures appear immediately, and how quickly a bad route decision can punish the player.",
    questionsAnswered: [
      "What should a reader know before their first Authoria session?",
      "Which setup surfaces affect the opening experience most strongly?",
      "Why can the first few hours feel punishing if treated like vanilla Skyrim?",
    ],
    tags: ["onboarding", "alternate start", "new character", "early game"],
    playerExperience: [
      "The player is not only choosing a build, but choosing how much exposure to danger, travel friction, and system complexity to take on immediately.",
      "Opening clarity depends on both the alternate start flow and the surrounding UI and MCM defaults. A bad onboarding guide would make the build feel hostile when it may simply be underexplained.",
    ],
    progressionImpact: [
      "Starting location and opening route have outsized impact because the world is less forgiving of generic wandering.",
      "Readers need a guide to safe or at least intelligible first goals, not just a lore summary of the start options.",
    ],
    uxTouchpoints: [
      "Alternate Perspective stack",
      "Controller and hotkey presets",
      "Status widgets and map aids",
      "MCM recorder presets for survival-adjacent systems",
    ],
    implementationChain: {
      upstream: [
        "Alternate Perspective Reborn",
        "Why I Came to Skyrim",
      ],
      requiem: [
        "Requiem changes what counts as a safe or reasonable first destination.",
        "Starting Choices - Noxrim is part of the opening expectation stack.",
      ],
      authoria: [
        "Authoria - MCM and INI Settings",
        "Authoria - Controller Configs",
        "Authoria - UI Positioning",
        "Authoria - AP Master Patch.esp",
      ],
    },
    sections: [
      {
        title: "What a first-session guide should cover",
        paragraphs: [
          "Document setup and orientation before you document ambition. A new reader should leave the page knowing which menus matter, how to read the UI, what kinds of early risks are deliberate, and which routes or goals are more punishing than they appear.",
        ],
        bullets: [
          "Explain the alternate start flow and its consequences.",
          "Explain the first UI surfaces the player should trust.",
          "Explain early route and supply discipline.",
        ],
      },
      {
        title: "Where the local build changes onboarding",
        paragraphs: [
          "The onboarding experience is not only created by alternate start mods. It is also reshaped by controller presets, keybind layout, map readability, survival MCM state, and late local patches that can make early combat or quest access more demanding than upstream descriptions imply.",
        ],
      },
    ],
    evidence: [
      {
        label: "Opening mod stack",
        path: "D:/Wabbajack/modlists/ARR/profiles/ARSE/modlist.txt",
        note: "Shows Alternate Perspective entries and related starting-choice mods.",
      },
      {
        label: "Alternate Perspective runtime settings",
        path: "D:/Wabbajack/modlists/ARR/mods/Authoria - MCM and INI Settings/SKSE/AlternatePerspective/AlternatePerspective.json",
        note: "Useful for player-facing onboarding documentation.",
      },
      {
        label: "Control map",
        path: "D:/Wabbajack/modlists/ARR/mods/Authoria - MCM and INI Settings/Root/ControlMap_Custom.txt",
        note: "Supports in-game UX and controller reference writing.",
      },
    ],
    related: ["requiem-progression", "survival-and-travel-pressure"],
  },
  {
    slug: "combat-readability-and-dodge-commitment",
    kind: "system",
    title: "Combat Readability and Dodge Commitment",
    strapline:
      "Combat is tuned around commitment, attrition, and movement discipline rather than forgiving recovery.",
    summary:
      "The live ARR stack suggests that combat feel is a blend of Requiem lethality, dodge add-ons, wound systems, animation overrides, and local presets for directional movement and hit feedback. The guide should explain combat as a readability problem as much as a balance problem.",
    questionsAnswered: [
      "Why does combat in Authoria feel more demanding than vanilla or lighter action lists?",
      "Which local systems shape dodge, wounds, and combat readability?",
      "Where should claims about combat feel be verified in ARR?",
    ],
    tags: ["combat", "dodge", "wounds", "tdm", "animation"],
    playerExperience: [
      "The player is expected to commit to positioning, spacing, and recovery windows instead of relying on loose movement to erase bad decisions.",
      "Visual readability matters because dodge timing, stamina pressure, and wound penalties can make the same fight feel fair or chaotic depending on local tuning.",
      "Combat documentation should prepare players for the rhythm of fights, not only list the mods involved.",
    ],
    progressionImpact: [
      "Early combat readiness depends on gear, stamina discipline, and enemy selection more than on generic level gain.",
      "Wounds and attrition pressure can turn a technically won fight into a failed route if the player cannot recover safely afterward.",
      "Readers need to understand that dodge and movement tools are part of survival, not optional flourish.",
    ],
    uxTouchpoints: [
      "TK Dodge RE Addon",
      "True Directional Movement",
      "Wounds presets and widgets",
      "Custom movesets and animation replacement behavior",
    ],
    implementationChain: {
      upstream: [
        "TK Dodge RE and related dodge animation stack",
        "Wounds",
        "Precision and True Directional Movement",
      ],
      requiem: [
        "Requiem encounter lethality and stamina expectations",
        "Tk Dodge RE Addon - Requiem Perk Lock",
        "Requiem exhaustion and stamina fixes",
      ],
      authoria: [
        "Authoria - Custom Movesets",
        "Authoria - MCM and INI Settings",
        "Authoria - xEdit Output",
      ],
    },
    sections: [
      {
        title: "Why combat docs need a UX frame",
        paragraphs: [
          "A bare load-order summary cannot explain why a fight feels harsh, readable, or exhausting. In Authoria, combat is a player-experience system created by local animation choices, movement tuning, wound state, and encounter rules acting together.",
          "That means a good guide should explain what the player is expected to watch for: spacing, dodge commitment, injury snowball, and whether a retreat is normal rather than a failure state.",
        ],
      },
      {
        title: "What to mention when documenting encounters",
        paragraphs: [
          "If a dungeon or boss is known for punishing movement errors, say so explicitly. Note whether the friction comes from damage, recovery limits, wound accumulation, or the local animation and dodge stack making mistakes harder to erase.",
        ],
        bullets: [
          "Mention whether the fight rewards patience over aggression.",
          "Mention any wound or stamina snowball the player should expect.",
          "Mention when local animation readability materially changes the encounter.",
        ],
      },
    ],
    evidence: [
      {
        label: "Dodge preset",
        path: "D:/Wabbajack/modlists/ARR/mods/Authoria - MCM and INI Settings/MCM/Settings/TKDodgeAddon.ini",
        note: "Documents local dodge behavior and is central to player-facing movement expectations.",
      },
      {
        label: "Directional movement preset",
        path: "D:/Wabbajack/modlists/ARR/mods/Authoria - MCM and INI Settings/MCM/Settings/TrueDirectionalMovement.ini",
        note: "Supports claims about camera, targeting, and movement readability.",
      },
      {
        label: "Wounds preset",
        path: "D:/Wabbajack/modlists/ARR/mods/Authoria - MCM and INI Settings/MCM/Settings/Wounds.ini",
        note: "Explains attrition and injury pressure as local runtime behavior.",
      },
      {
        label: "Animation override layer",
        path: "D:/Wabbajack/modlists/ARR/mods/Authoria - Custom Movesets",
        note: "Contains the custom movement and animation layer shaping combat feel.",
      },
    ],
    related: [
      "requiem-progression",
      "starting-a-character-in-authoria",
      "authoria-output-layer",
    ],
  },
  {
    slug: "followers-and-party-power",
    kind: "system",
    title: "Followers and Party Power",
    strapline:
      "Followers in ARR look deliberately curated rather than treated as a passive convenience feature.",
    summary:
      "The modlist exposes a dense follower stack: dialogue expansions, power tuning, weakening layers, party helpers, and Requiem-aware follower patches. The guide should explain how party play changes pacing, challenge, and information load for the player.",
    questionsAnswered: [
      "How much does Authoria expect or permit follower-heavy play?",
      "Which local mods shape follower power and behavior?",
      "How should the guide talk about party play without assuming vanilla followers?",
    ],
    tags: ["followers", "party", "companions", "recruitment", "dialogue"],
    playerExperience: [
      "The player is likely choosing between a harsher solo experience and a more managed party experience with extra power, chatter, and logistics.",
      "Followers are not only combat assets here; they are also a presentation layer through dialogue bundles, expansions, and custom companion mods.",
      "A guide should warn readers that follower choice affects clarity and pacing as much as raw combat output.",
    ],
    progressionImpact: [
      "Follower access can flatten or redirect early difficulty, especially in Requiem-shaped encounters.",
      "Party power changes resource pressure, route confidence, and which quests feel practical to attempt early.",
      "Compatibility patches mean some follower behavior is specifically adapted to the list, not merely inherited upstream.",
    ],
    uxTouchpoints: [
      "Follower Stats MCM",
      "Simple Follower Framework and party-related controls",
      "Dialogue expansion stack",
      "Follower weakening and chatter-control mods",
    ],
    implementationChain: {
      upstream: [
        "Simple Follower Framework",
        "Follower Dialogue Expansion mods",
        "Custom followers such as Lucien, Auri, Remiel, Xelzaz, and Val Serano",
      ],
      requiem: [
        "Requiem follower patches and compatibility for specific companions",
        "Dynamic Follower Weakening and related balance layers",
      ],
      authoria: [
        "Authoria - MCM and INI Settings",
        "Authoria - xEdit Output",
        "Authoria-owned compatibility in the late patch layer",
      ],
    },
    sections: [
      {
        title: "What follower documentation should actually answer",
        paragraphs: [
          "Readers do not just need a list of recruitable companions. They need to know whether a follower meaningfully changes risk, travel burden, banter density, and combat expectations in this build.",
          "The presence of both weakening and expansion layers suggests the list is trying to keep followers expressive without letting them trivialize the game by default.",
        ],
      },
      {
        title: "Questions to carry into companion writeups",
        paragraphs: [
          "When documenting a specific follower or party composition, say whether the main value is combat support, story presence, utility coverage, or travel comfort. If a follower is strong but locally constrained, surface that explicitly.",
        ],
        bullets: [
          "Mention party-management burden, not only combat power.",
          "Mention when a follower interacts with large quest mods or new lands.",
          "Mention whether the guide assumes solo or companion-backed play.",
        ],
      },
    ],
    evidence: [
      {
        label: "Follower stats preset",
        path: "D:/Wabbajack/modlists/ARR/mods/Authoria - MCM and INI Settings/MCM/Settings/Follower Stats.ini",
        note: "Documents locally chosen follower runtime behavior.",
      },
      {
        label: "Follower-heavy mod grouping",
        path: "D:/Wabbajack/modlists/ARR/profiles/ARSE/modlist.txt",
        note: "Shows the breadth of follower expansions, weakeners, and custom companions enabled in ARR.",
      },
      {
        label: "Late patch output",
        path: "D:/Wabbajack/modlists/ARR/mods/Authoria - xEdit Output",
        note: "Where follower-facing compatibility and balance can be finalized.",
      },
    ],
    related: [
      "starting-a-character-in-authoria",
      "requiem-progression",
      "authoria-output-layer",
    ],
  },
  {
    slug: "economy-bounties-and-open-world-work",
    kind: "system",
    title: "Economy, Bounties, and Open-World Work",
    strapline:
      "ARR appears to support a survival-heavy open-world task loop rather than a purely main-quest-driven progression path.",
    summary:
      "Trade and Barter, Experience, Missives, Headhunter, and bounty-oriented Requiem patches together suggest that the list expects the player to make a living through structured odd jobs, risk-managed travel, and selective combat. The guide should surface this loop clearly because it explains how a character stabilizes before major quest arcs.",
    questionsAnswered: [
      "How is the player meant to fund and pace a character in Authoria?",
      "Why do bounty boards and odd jobs matter more here than in lighter lists?",
      "Which local settings shape the economy and task loop?",
    ],
    tags: ["economy", "missives", "headhunter", "bounties", "experience"],
    playerExperience: [
      "The player likely experiences progression as a chain of practical work: errands, bounties, contracts, and careful looting rather than immediate heroic escalation.",
      "This loop makes the world feel busier and more grounded, but it also increases the reading burden if the guide does not explain which task types are sensible for a fresh character.",
      "Open-world work becomes part of the onboarding path, not just optional side content.",
    ],
    progressionImpact: [
      "Economy pressure decides how quickly the player can absorb survival costs and replace bad gear.",
      "Missives and bounty systems create safer intermediate goals between alternate start and major questlines.",
      "Experience tuning can change whether exploration, quests, and combat reward the same behaviors readers might expect from vanilla.",
    ],
    uxTouchpoints: [
      "Missives MCM",
      "Trade and Barter MCM",
      "Experience plugin config",
      "Journal and board readability through the task stack",
    ],
    implementationChain: {
      upstream: [
        "Trade and Barter",
        "Experience",
        "Missives",
        "Headhunter",
      ],
      requiem: [
        "Requiem - Headhunter",
        "Requiem - Headhunter - Missives",
        "Requiem - Bounty Hunter",
        "Requiem - Conditional Bartering Bonuses",
      ],
      authoria: [
        "Authoria - MCM and INI Settings",
        "Authoria - xEdit Output",
      ],
    },
    sections: [
      {
        title: "Why this loop needs to be explicit",
        paragraphs: [
          "Many players will ask how they are supposed to survive the first dozen hours if major combat and travel are punishing. The answer is often not a single safe questline. It is a local economy loop built from modest work, selective risk, and gradual stabilization.",
          "That loop is easy to miss if the guide focuses only on famous quest mods and ignores the list's day-to-day task structure.",
        ],
      },
      {
        title: "How to write about task boards and practical progression",
        paragraphs: [
          "When documenting regions or starts, say whether the player has access to meaningful low-commitment work. Mention whether a town functions as a stabilizing hub for food, beds, board work, and short-range combat rather than only as a lore destination.",
        ],
      },
    ],
    evidence: [
      {
        label: "Trade and Barter preset",
        path: "D:/Wabbajack/modlists/ARR/mods/Authoria - MCM and INI Settings/MCM/Settings/trade & barter.ini",
        note: "Supports claims about local economy behavior and pricing expectations.",
      },
      {
        label: "Missives preset",
        path: "D:/Wabbajack/modlists/ARR/mods/Authoria - MCM and INI Settings/MCM/Settings/Missives.ini",
        note: "Supports task-board and quest-loop documentation.",
      },
      {
        label: "Experience plugin config",
        path: "D:/Wabbajack/modlists/ARR/mods/Authoria - MCM and INI Settings/SKSE/Plugins/Experience.ini",
        note: "Important for progression pacing claims.",
      },
      {
        label: "Enabled task-loop stack",
        path: "D:/Wabbajack/modlists/ARR/profiles/ARSE/modlist.txt",
        note: "Shows Missives, Headhunter, Experience, and related patches in the live order.",
      },
    ],
    related: [
      "requiem-progression",
      "survival-and-travel-pressure",
      "starting-a-character-in-authoria",
    ],
  },
  {
    slug: "vicn-worldspaces-and-delayed-starts",
    kind: "experience",
    title: "Vicn Worldspaces and Delayed Starts",
    strapline:
      "Large authored quest content in ARR appears curated to be approached deliberately, not stumbled into blindly.",
    summary:
      "The live modlist includes the Vicn stack and other large quest or worldspace content with delayed starts, worldspace patches, paper maps, voiced add-ons, and Requiem-aware compatibility. The guide should explain these as destination experiences with entry timing and route expectations, not only as items in a content list.",
    questionsAnswered: [
      "How should the guide frame Vigilant, Glenmoril, Unslaad, and similar large content in Authoria?",
      "Why do delayed starts and map support matter for these mods?",
      "Which local patches should be checked before writing a quest guide?",
    ],
    tags: ["vicn", "vigilant", "glenmoril", "unslaad", "new lands"],
    playerExperience: [
      "The player is being offered large, authored arcs that likely feel closer to expedition planning than incidental side quests.",
      "Paper maps, worldspace patches, and delayed-start mods suggest the list wants these stories to be discovered on better terms than vanilla quest spam.",
      "A good guide should help readers know when a worldspace is merely present versus when it is sensible to enter.",
    ],
    progressionImpact: [
      "These quest arcs are not only content volume; they are progression commitments that can overmatch a character if entered too early.",
      "Requiem-aware compatibility means the same questline can feel substantially different from its upstream reputation.",
      "Documentation should tie each arc to readiness, route burden, and likely combat profile.",
    ],
    uxTouchpoints: [
      "Paper maps for modded worldspaces",
      "Delayed-start plugins",
      "Boss bar and presentation support",
      "Map marker and navigation patches",
    ],
    implementationChain: {
      upstream: [
        "VIGILANT",
        "GLENMORIL",
        "UNSLAAD",
        "associated paper-map and voiced add-on packages",
      ],
      requiem: [
        "Requiem patches for Vicn and related worldspace content",
        "worldspace and encounter compatibility layers",
      ],
      authoria: [
        "Authoria - xEdit Output",
        "Authoria - FMWF Map Marker Settings",
        "Authoria-owned Requiem patches for Glenmoril and Midnight Sun",
      ],
    },
    sections: [
      {
        title: "What a quest-arc guide should do",
        paragraphs: [
          "Do not only summarize plot or installation facts. Tell the reader when the arc is likely to feel legible, survivable, and worth the travel burden from the rest of the list.",
          "Large content mods should be framed as campaign decisions. Readers need to know whether they are signing up for a short detour, a self-contained region, or a major difficulty shift.",
        ],
      },
      {
        title: "Why maps and delayed starts matter here",
        paragraphs: [
          "The presence of paper maps and delayed-start add-ons is a strong signal that ARR is curating the entry experience. That usually means the guide should mention not just where to go, but when and under what expectations the player should go there.",
        ],
      },
    ],
    evidence: [
      {
        label: "Quest and new-lands groups",
        path: "D:/Wabbajack/modlists/ARR/profiles/ARSE/modlist.txt",
        note: "Shows separate Glenmoril, Vigilant, Unslaad, and follower/new-land stacks in the live profile.",
      },
      {
        label: "Local report for worldspace-related mods",
        path: "D:/Wabbajack/modlists/ARR/profiles/ARSE/modlist_report_gold.csv",
        note: "Confirms the enabled set, versions, and local custom outputs affecting large content.",
      },
      {
        label: "Late patch layer",
        path: "D:/Wabbajack/modlists/ARR/mods/Authoria - xEdit Output",
        note: "Contains Authoria-owned compatibility patches for specific large content.",
      },
      {
        label: "Map support layer",
        path: "D:/Wabbajack/modlists/ARR/mods/Authoria - FMWF Map Marker Settings",
        note: "Supports claims about local navigation curation for new worldspaces.",
      },
    ],
    related: [
      "map-navigation-and-paper-maps",
      "survival-and-travel-pressure",
      "authoria-output-layer",
    ],
  },
  {
    slug: "authoria-output-layer",
    kind: "mod",
    title: "Authoria Output Layer",
    strapline: "The final behavior of the build is concentrated in a late local output layer rather than spread evenly across upstream mods.",
    summary:
      "Readers and maintainers should treat the Authoria output layer as a module in its own right. It is where xEdit, Synthesis, CK, Reqtificator Lite, NPC merge, landscape tweaks, and other late decisions become the actual shipped game state.",
    questionsAnswered: [
      "Why can't the guide stop at upstream mod descriptions?",
      "Which local output folders are most important to the final game state?",
      "Where does final patch authority live?",
    ],
    tags: ["patches", "outputs", "xedit", "synthesis", "architecture"],
    playerExperience: [
      "The player does not experience 'raw upstream mods.' The player experiences the post-processed load order that these outputs finalize.",
      "A guide that ignores this layer will misdescribe balance, compatibility, and worldspace behavior.",
    ],
    progressionImpact: [
      "Late outputs can quietly redefine access, rewards, NPC strength, and route viability.",
      "The reference guide should surface this layer whenever a rule seems oddly specific or locally tuned.",
    ],
    uxTouchpoints: [
      "These outputs rarely expose themselves directly in menus, but they shape many systems the player sees.",
      "MCM presets and UI settings complement them by shaping the runtime-facing layer.",
    ],
    implementationChain: {
      upstream: ["The upstream sources vary by patch target and should not be treated as the final rule."],
      requiem: [
        "Reqtificator Lite and Auto NPC Patcher shape Requiem-facing compatibility outcomes.",
      ],
      authoria: [
        "Authoria - xEdit Output",
        "Authoria - Synthesis Output",
        "Authoria - RFTI Output",
        "Authoria - NPC Merge",
        "Authoria - CK Output",
      ],
    },
    sections: [
      {
        title: "Why this is a real module",
        paragraphs: [
          "Architecturally, the output layer is where complexity is concentrated on purpose. That gives the project leverage and locality: final conflict handling and local tuning live in a known cluster instead of leaking across every topic page.",
          "For the guide, this means the output layer is not a maintenance footnote. It is a top-level explanation surface.",
        ],
      },
      {
        title: "How to use this when documenting",
        paragraphs: [
          "When a gameplay claim sounds too precise to trust to upstream pages, start here. If a quest, follower, worldspace, or economy rule feels custom, the answer often lives in one of the output mods or the runtime preset layer beside them.",
        ],
      },
    ],
    evidence: [
      {
        label: "Output group in report",
        path: "D:/Wabbajack/modlists/ARR/profiles/ARSE/modlist_report_gold.csv",
        note: "Shows the grouped local outputs and their plugins near the end of the order.",
      },
      {
        label: "xEdit output folder",
        path: "D:/Wabbajack/modlists/ARR/mods/Authoria - xEdit Output",
        note: "Contains many of the most specific local patch plugins.",
      },
      {
        label: "Synthesis output folder",
        path: "D:/Wabbajack/modlists/ARR/mods/Authoria - Synthesis Output",
        note: "Contains generated gameplay and worldspace plugins.",
      },
    ],
    related: ["requiem-progression", "starting-a-character-in-authoria"],
  },
];

export function getAllEntries() {
  return entries;
}

export function getEntriesByKind(kind: ReferenceKind) {
  return entries.filter((entry) => entry.kind === kind);
}

export function getEntry(kind: ReferenceKind, slug: string) {
  return entries.find((entry) => entry.kind === kind && entry.slug === slug);
}

export function getRelatedEntries(slugs: string[]) {
  return entries.filter((entry) => slugs.includes(entry.slug));
}
