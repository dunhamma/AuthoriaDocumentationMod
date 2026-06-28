import type {
  ArticlePublicationState,
  EvidenceItem,
  ReferenceEntry,
  ReferenceKind,
  ReferenceSection,
  SectionDefinition,
  SettingQuote,
} from "@/lib/content/schema";
import { arrPaths } from "@/lib/arr/paths";

const profile = arrPaths.profileDir();
const mcm = arrPaths.authoriaMcmIniSettings;
const controller = arrPaths.authoriaControllerConfigs;
const xedit = arrPaths.authoriaXEditOutput;
const synthesis = arrPaths.authoriaSynthesisOutput;

export const sectionDefinitions: SectionDefinition[] = [
  {
    slug: "start-here",
    title: "Start Here",
    description:
      "Set up the first session before Skyrim muscle memory gets you into trouble.",
  },
  {
    slug: "progression",
    title: "Progression",
    description:
      "Learn how power, money, gear, and route readiness differ from vanilla Skyrim.",
  },
  {
    slug: "combat",
    title: "Combat",
    description:
      "Fight with stamina, wounds, dodge commitment, and retreat in mind.",
  },
  {
    slug: "survival",
    title: "Survival",
    description:
      "Start here: food, fatigue, cold, seasons, maps, and recoverable roads.",
  },
  {
    slug: "companions",
    title: "Companions",
    description:
      "Decide when a follower adds safety, story, utility, or too much extra noise.",
  },
  {
    slug: "regions",
    title: "Regions",
    description:
      "Use towns and roads as recovery loops before you chase distant trouble.",
  },
  {
    slug: "quest-arcs",
    title: "Quest Arcs",
    description:
      "Treat big questlines and worldspaces as commitments, not casual map markers.",
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

export const guideSectionDefinitions = sectionDefinitions.filter(
  (section) => section.slug !== "settings" && section.slug !== "evidence",
);

const publicArticleStates: ArticlePublicationState[] = [
  "evidence-backed",
  "record-verified",
  "playtested",
];

export function isPublicArticle(entry: ReferenceEntry) {
  return (
    entry.section !== "settings" &&
    entry.section !== "evidence" &&
    entry.publicationStatus !== undefined &&
    publicArticleStates.includes(entry.publicationStatus)
  );
}

export function isProofArticle(entry: ReferenceEntry) {
  return entry.section === "settings" || entry.section === "evidence";
}

function toPublicEntry(entry: ReferenceEntry): ReferenceEntry {
  const publicEntry = { ...entry };
  delete publicEntry.publicationStatus;

  return {
    ...publicEntry,
    evidence: entry.evidence.map((item) => ({
      label: item.label,
      note: item.note,
      path: "",
    })),
    evidenceDossier: entry.evidenceDossier.map((item) => ({
      publicLabel: item.publicLabel,
      internalSources: [],
    })),
    verificationNotes: [],
  };
}

const coreEvidence: EvidenceItem[] = [
  {
    label: "Local Authoria setup",
    path: `${profile}/modlist.txt`,
    note: "Shows the installed guide sources and local customization groups.",
  },
  {
    label: "Local gameplay setup",
    path: `${profile}/loadorder.txt`,
    note: "Confirms the local gameplay stack that supports the guide.",
  },
  {
    label: "Local inventory support",
    path: `${profile}/modlist_report_gold.csv`,
    note: "Supports local status checks without turning the guide into a catalog.",
  },
];

const outputEvidence: EvidenceItem[] = [
  {
    label: "Authoria patch support",
    path: xedit,
    note: "Supports claims where Authoria changes Requiem or worldspace behavior.",
  },
  {
    label: "Generated Authoria support",
    path: synthesis,
    note: "Supports claims about the final local gameplay and worldspace setup.",
  },
];

const setting = (
  factId: string,
  label: string,
  value: string,
  interpretation: string,
): SettingQuote => ({ factId, label, value, interpretation });

const questArcDetails: Record<
  string,
  {
    summary?: string;
    playerExperience?: string[];
    progressionImpact?: string[];
    practicalGuidance: string[];
    uxTouchpoints?: string[];
    sections: ReferenceEntry["sections"];
    verificationNotes: string[];
  }
> = {
  vigilant: {
    practicalGuidance: [
      "Treat Vigilant as a campaign-scale commitment, not an incidental side quest.",
      "Use the delayed-start requirement as a readiness signal: confirm level, Dac0da state, supplies, follower plan, and recovery options before entering.",
      "Bring anti-Daedric, undead, and boss-fight expectations into the article only after local patch records are checked.",
    ],
    sections: [
      {
        title: "Readiness framing",
        paragraphs: [
          "The old guide said Vigilant starts after level 30 and Dac0da. The new article should explain why that matters: ARR carries delayed start support, a voiced/visual overhaul stack, boss-bar support, paper-map support, Auri commentary, and an Authoria Requiem patch. That is not a casual quest marker; it is a staged campaign entry.",
          "Vigilant guidance should therefore ask whether the character can survive long fights, handle attrition, recover between chapters, and tolerate a major tonal and mechanical shift away from local errands.",
        ],
      },
      {
        title: "Travel and party expectations",
        paragraphs: [
          "Because the profile includes map support and follower commentary hooks, the page should tell the player whether they are approaching Vigilant solo for challenge, with a story companion for commentary, or with a combat party for safety. That decision changes pacing and readability.",
        ],
      },
    ],
    verificationNotes: [
      "Confirm the exact delayed-start trigger in local plugin records.",
      "Check Authoria - Viligant Requiem Patch.esp for encounter, NPC, and item changes before writing encounter-specific advice.",
    ],
  },
  glenmoril: {
    practicalGuidance: [
      "Do not present Glenmoril as merely another new-land entry; frame it as a gated continuation with prerequisite quest state.",
      "Verify the old guide's sleep trigger and prerequisite chain before final publication.",
      "Explain worldspace, visual, NPC, gun replacement, and Requiem patch support as signals of a curated arc.",
    ],
    sections: [
      {
        title: "Why the gate matters",
        paragraphs: [
          "The old guide described Glenmoril as requiring level 30, major vanilla/Dragonborn quest state, Dac0da, and Vigilant progress before sleeping. The deeper article should turn that into campaign advice: Glenmoril is for a character already carrying significant world knowledge, not a fresh wanderer who found a door too early.",
          "The live profile reinforces that interpretation through delayed-start support, worldspace patches, visual and NPC overhauls, TDM boss support, and a dedicated Authoria Glenmoril Requiem patch.",
        ],
      },
      {
        title: "How to prepare",
        paragraphs: [
          "Preparation language should cover more than level. The player should know whether they are ready for long-form horror pacing, unfamiliar worldspace navigation, boss readability, supply pressure, and whether their follower party supports or distracts from the arc.",
        ],
      },
    ],
    verificationNotes: [
      "Confirm the exact local prerequisite and sleep trigger implementation.",
      "Inspect Authoria - Glenmoril Requiem Patch.esp before giving enemy or reward advice.",
    ],
  },
  unslaad: {
    practicalGuidance: [
      "Present Unslaad as a late campaign arc after prior Vicn and main-quest commitments.",
      "Explain the lift, boss bars, paper map, voiced add-on, and Requiem patch as route/readability support.",
      "Treat cold, travel, and late-game attrition as part of readiness.",
    ],
    sections: [
      {
        title: "Late-arc positioning",
        paragraphs: [
          "The old guide placed Unslaad after level 40, Dragon Slayer, Dac0da, Vigilant, and Glenmoril. The new page should state plainly that this is not optional flavor ordering; it is a late-campaign expectation. A player should not enter only because the content is installed.",
          "ARR's enabled support stack includes delayed start, an English voiced add-on, worldspace patches, a lift, boss bar support, paper map support, and an Authoria Unslaad Requiem patch. That set points to a curated destination with special navigation and encounter expectations.",
        ],
      },
      {
        title: "Route burden",
        paragraphs: [
          "Unslaad guidance should connect quest readiness to travel readiness. If the route or worldspace exposes the player to cold, unfamiliar map reading, or long recovery gaps, the article should tell them how to prepare before they leave a stable hub.",
        ],
      },
    ],
    verificationNotes: [
      "Confirm the exact local prerequisite implementation.",
      "Inspect Authoria - Unslaad Requiem Patch.esp before writing boss or enemy-specific guidance.",
    ],
  },
  dac0da: {
    summary:
      "Dac0da should be explained as the first campaign key in the Vicn route chain: a supported authored arc whose completion can change later Vigilant, Glenmoril, and Unslaad readiness.",
    playerExperience: [
      "The player is not just starting one quest; they are entering the first step of a larger authored campaign chain.",
      "Paper-map and delayed-start support should be read as pacing signals, not collectibles in the loadout.",
    ],
    progressionImpact: [
      "Dac0da state matters because later Vicn guidance depends on whether this arc has been completed.",
      "It should be staged when the character can commit to a route rather than squeezed between early hub errands.",
    ],
    practicalGuidance: [
      "Treat Dac0da as the first gate in the Vicn campaign chain.",
      "Explain delayed start and map support before telling players to seek it out.",
      "Connect completion state to later Vigilant/Glenmoril/Unslaad readiness.",
    ],
    uxTouchpoints: ["Delayed start", "Paper map", "Vicn campaign chain", "Quest-state prerequisites"],
    sections: [
      {
        title: "Campaign chain role",
        paragraphs: [
          "The old guide made Dac0da the prerequisite for Vigilant, Glenmoril, and Unslaad. That means the Dac0da page should not be isolated. It is the first major campaign-key page: finishing it changes what later arcs can mean.",
        ],
      },
    ],
    verificationNotes: [
      "Confirm local delayed-start behavior and how completion is detected by later arcs.",
    ],
  },
  wyrmstooth: {
    summary:
      "Wyrmstooth should be treated as a large island campaign with ARR-specific travel, season, Missives, Requiem, and Xelzaz support. It is not a casual errand simply because the map and board systems can point at it.",
    playerExperience: [
      "The player is leaving the familiar Skyrim hub loop for a larger destination with its own travel and recovery rhythm.",
      "The route can feel supported because ARR includes map, seasons, Missives, Requiem, and companion hooks, but that support does not make the island early-safe.",
    ],
    progressionImpact: [
      "Wyrmstooth should be staged after the player can afford supplies, recover from long fights, and commit to a remote route.",
      "Xelzaz support makes companion choice a campaign-quality decision rather than pure combat optimization.",
    ],
    practicalGuidance: [
      "Treat Wyrmstooth as a planned expedition, not a board-job detour.",
      "Check supplies, carry weight, rest access, follower plan, and return expectations before leaving Skyrim.",
      "Recommend Xelzaz only as a route-quality companion after recruitment and quest-state interactions are verified.",
    ],
    uxTouchpoints: ["Worldspace travel", "Paper/map support", "Missives worldspace support", "Xelzaz commentary", "Requiem patch"],
    sections: [
      {
        title: "Expedition framing",
        paragraphs: [
          "The local profile gives Wyrmstooth unusually clear campaign support: a Requiem patch, Settings Loader, season support, map/travel visuals, Missives worldspace support, and Xelzaz integration. The article should translate that into player advice: prepare as though the run is leaving the normal early-hub loop.",
          "Safe entry means the player can solve road fights, pay for recovery, manage weight and supplies, and tolerate a longer absence from familiar vendors.",
        ],
      },
      {
        title: "Companion and work loops",
        paragraphs: [
          "Wyrmstooth's Missives and Xelzaz hooks should be treated as route enrichment, not permission to enter early. The guide should separate 'there is supported content here' from 'your current character is ready for it.'",
        ],
      },
    ],
    verificationNotes: [
      "Confirm Wyrmstooth start timing and travel-return behavior in the local build.",
      "Inspect Requiem - Wyrmstooth (Updated) and Xelzaz Follower - Wyrmstooth before final encounter or companion-commentary claims.",
    ],
  },
  olenveld: {
    summary:
      "Olenveld is a new-land arc with local Requiem, paper-map, draugr, voice, tweak, and fix support, so the page should frame it as an undead-leaning expedition with route and attrition expectations.",
    playerExperience: [
      "The player is entering a curated destination with stronger dungeon and undead expectations than ordinary local work.",
      "Navigation support helps readability, but the practical question is whether the build can handle attrition, draugr pressure, and recovery gaps.",
    ],
    progressionImpact: [
      "Olenveld belongs after the character has reliable undead answers and supply discipline.",
      "The local Requiem and draugr support make generic upstream difficulty assumptions unsafe.",
    ],
    practicalGuidance: [
      "Prepare Olenveld like an undead expedition: carry recovery tools, anti-undead answers, food, and enough money to recover.",
      "Do not recommend it as a first new-land destination until local enemy and reward records are checked.",
      "Use paper-map support as navigation help, not as a safety guarantee.",
    ],
    uxTouchpoints: ["Paper map", "Requiem patch", "Draugr support", "Voice/fix support", "Travel planning"],
    sections: [
      {
        title: "Undead expedition",
        paragraphs: [
          "ARR evidence points to Olenveld as an authored destination with multiple local support layers: paper map, Requiem patch, draugr support, voice work, fixes, and tweaks. Player guidance should start from readiness: can this character endure an undead-heavy route without depending on nearby town recovery?",
        ],
      },
      {
        title: "What to verify",
        paragraphs: [
          "Before writing encounter advice, the article should inspect local Requiem records and draugr edits. The safe public claim is that Olenveld is curated and supported; the still-open claim is exactly which enemies, rewards, and progression gates ARR changes.",
        ],
      },
    ],
    verificationNotes: [
      "Inspect Requiem - Olenveld and OlenVELD - Draugrs before enemy-specific advice.",
      "Confirm entry route, return route, and map behavior in-game.",
    ],
  },
  sirenroot: {
    summary:
      "Sirenroot should be framed as a focused authored quest with local Requiem, visual, achievement, and Xelzaz support, where the key question is readiness for a contained route rather than open-world wandering.",
    playerExperience: [
      "The player starts a tighter quest experience with less room to drift back into normal town loops.",
      "Xelzaz support can make the route feel more authored if the player brings him deliberately.",
    ],
    progressionImpact: [
      "Sirenroot should be recommended when the player can commit to a focused quest and handle local Requiem tuning.",
      "Because it has companion support, party composition can affect story texture as much as combat safety.",
    ],
    practicalGuidance: [
      "Treat Sirenroot as a focused session plan: clear inventory, rest, bring supplies, and decide whether Xelzaz belongs on the route.",
      "Avoid presenting it as a casual pickup until trigger and exit behavior are verified.",
      "Cross-link Xelzaz as a recommended commentary candidate after direct verification.",
    ],
    uxTouchpoints: ["Quest start", "Requiem patch", "Xelzaz support", "Achievement support", "Route commitment"],
    sections: [
      {
        title: "Focused route",
        paragraphs: [
          "Sirenroot is not currently a broad regional hub page. ARR evidence shows a focused quest stack: Requiem support, visual/body support, achievement support, and Xelzaz support. The player-facing advice should be about session commitment and party choice.",
        ],
      },
      {
        title: "Companion decision",
        paragraphs: [
          "If Xelzaz is recruited and the player wants route-specific commentary, Sirenroot is a strong candidate for bringing him. The guide should still mark exact triggers and dialogue coverage as verification-required until checked locally.",
        ],
      },
    ],
    verificationNotes: [
      "Verify start trigger, exit points, and whether Xelzaz commentary requires specific quest state.",
      "Inspect Requiem - Sirenroot before combat or reward claims.",
    ],
  },
  "siege-at-icemoth": {
    summary:
      "Siege at Icemoth is a cold-region worldspace arc with Requiem, seasons, paper-map, and fishing support, so its guide should link combat readiness to exposure and route planning.",
    playerExperience: [
      "The player enters content where cold, remoteness, and combat pressure can stack together.",
      "Map and season support make the destination readable, but survival pressure can still define the session.",
    ],
    progressionImpact: [
      "Icemoth should not be recommended to builds that are barely surviving Windhelm-style cold routes.",
      "Requiem support makes enemy and reward behavior local enough to require verification.",
    ],
    practicalGuidance: [
      "Stage Icemoth from a stable cold-weather hub with warmth, food, rest, and recovery supplies handled.",
      "Treat the arc as a cold expedition, not just a quest marker.",
      "Delay encounter-specific advice until Requiem and season records are checked.",
    ],
    uxTouchpoints: ["Cold survival", "Seasons", "Paper map", "Requiem patch", "Fishing integration"],
    sections: [
      {
        title: "Cold expedition",
        paragraphs: [
          "The live profile includes Siege at Icemoth, Requiem support, Seasons of Icemoth, paper-map support, and fishing integration. That combination should drive the article's first claim: readiness is both combat and environment.",
        ],
      },
      {
        title: "When to go",
        paragraphs: [
          "A character ready for Icemoth should already understand Windhelm/Winterhold-style exposure planning, have a recovery plan, and be able to absorb long-route consequences. The guide should not treat map support as a substitute for supplies.",
        ],
      },
    ],
    verificationNotes: [
      "Verify travel/start behavior, cold exposure profile, and return route.",
      "Inspect Requiem - Siege at Icemoth before encounter advice.",
    ],
  },
  "forgotten-city": {
    summary:
      "The Forgotten City should be handled as a self-contained, spoiler-sensitive quest with ARR visual, marker, music, and ending-tweak support rather than as ordinary dungeon progression.",
    playerExperience: [
      "The player enters a more self-contained authored mystery where normal open-world priorities may pause.",
      "The safest guide is spoiler-light: explain commitment and readiness without solving the quest for the reader.",
    ],
    progressionImpact: [
      "The Forgotten City can interrupt open-world pacing, so it should be started when the player is ready for a contained story session.",
      "Local marker and ending tweaks mean ARR behavior should be checked before quoting generic walkthrough advice.",
    ],
    practicalGuidance: [
      "Keep public advice spoiler-safe: entry timing, session commitment, inventory/rest readiness, and exit expectations.",
      "Do not frame it as a power-farming route.",
      "Verify hidden marker and ending tweak behavior before telling players what the local build changes.",
    ],
    uxTouchpoints: ["Quest start", "Hidden map marker", "Music fix", "Ending tweak", "Spoiler-safe guidance"],
    sections: [
      {
        title: "Spoiler-safe readiness",
        paragraphs: [
          "ARR evidence shows The Forgotten City plus a hidden map marker, music fixer, good-ending tweak, and visual work. The guide should avoid walkthrough logic and instead answer whether the player is ready to step into a self-contained authored story.",
        ],
      },
      {
        title: "Public boundary",
        paragraphs: [
          "The article should state what the route asks of the player without revealing solutions. Good public advice covers time commitment, save posture, supplies, and whether the character should finish active errands before entering.",
        ],
      },
    ],
    verificationNotes: [
      "Verify start trigger, hidden marker behavior, and ending tweak behavior in the local build.",
      "Keep puzzle and ending details out of public first-pass guidance unless a spoiler section is deliberately added.",
    ],
  },
  "saints-and-seducers-extended-cut": {
    summary:
      "Saints and Seducers Extended Cut should be presented as a locally Requiem-tuned Creation Club expansion route with paper-map, creature, NPC, wilderness, texture, and Rare Curios support.",
    playerExperience: [
      "The player encounters a Creation Club expansion that ARR has turned into a more integrated route.",
      "The content can affect combat, loot, curios, and wilderness encounters rather than sitting apart from the main progression loop.",
    ],
    progressionImpact: [
      "Saints/Seducers content should be staged once the player can handle Requiem-tuned enemy variety and unusual itemization.",
      "Rare Curios and local patches mean economy/alchemy/item advice needs ARR-specific verification.",
    ],
    practicalGuidance: [
      "Treat this as a midgame route unless local trigger and enemy records prove otherwise.",
      "Explain Rare Curios and Requiem interaction only after checking the local patch stack.",
      "Use paper-map support to discuss navigation without turning the page into a mod inventory.",
    ],
    uxTouchpoints: ["Quest start", "Paper map", "Requiem patch", "Rare Curios support", "Wilderness/creature patches"],
    sections: [
      {
        title: "Integrated expansion",
        paragraphs: [
          "The profile includes Extended Cut Saints and Seducers, paper-map support, Requiem support, Rare Curios support, creature/NPC/wilderness patches, and visual support. The page should explain the practical result: the expansion is part of Authoria's progression ecosystem, not a bolt-on checklist.",
        ],
      },
      {
        title: "Item and enemy caution",
        paragraphs: [
          "Because Saints/Seducers touches unusual enemies and items, the article should avoid generic item advice until the local Requiem and Rare Curios patches are checked.",
        ],
      },
    ],
    verificationNotes: [
      "Inspect Requiem - Extended Cut Saints and Seducers and Rare Curios patch behavior before item/enemy guidance.",
      "Verify start trigger and map behavior locally.",
    ],
  },
  "penitus-oculatus": {
    summary:
      "Penitus Oculatus should be framed as a roleplay/faction route with local balance review pending, not a default early power path.",
    playerExperience: [
      "The player is choosing a faction identity and questline posture, not only adding tasks to the journal.",
      "The route may conflict with other roleplay assumptions and should be introduced as a character-defining choice.",
    ],
    progressionImpact: [
      "Faction expansion can redirect campaign identity and quest sequencing.",
      "Without deeper local patch review, it should remain a deliberate mid-run choice rather than early default advice.",
    ],
    practicalGuidance: [
      "Tell players to treat Penitus Oculatus as a roleplay route decision.",
      "Verify prerequisites, conflicts, and rewards before recommending timing.",
      "Do not present it as generic faction content until local balance is understood.",
    ],
    uxTouchpoints: ["Faction choice", "Quest prerequisites", "Roleplay identity", "Reward verification"],
    sections: [
      {
        title: "Faction commitment",
        paragraphs: [
          "The local profile includes Penitus Oculatus, but the current evidence does not yet justify exact progression claims. The first article should therefore be honest: this is a route identity page, and the next harvest should inspect prerequisites, conflicts, and reward balance before giving strong advice.",
        ],
      },
    ],
    verificationNotes: [
      "Inspect plugin records for prerequisites, quest conflicts, rewards, and Requiem interactions.",
      "Confirm whether the route conflicts with other faction or main quest recommendations.",
    ],
  },
  "legacy-of-the-dragonborn": {
    summary:
      "Legacy of the Dragonborn should be explained as a museum and collection spine that changes how players value artifacts, replicas, displays, followers, homes, and long-route planning.",
    playerExperience: [
      "The player gains a persistent museum objective that can turn ordinary loot decisions into collection and display decisions.",
      "The Curator's Companion, follower patches, home displays, and many content patches make the museum a campaign layer rather than one quest.",
    ],
    progressionImpact: [
      "Legacy changes what counts as progress: artifacts, replicas, displays, and museum logistics can matter as much as raw combat power.",
      "It can tempt hoarding and over-routing, so players need advice on when collection goals should yield to survival, money, or combat readiness.",
    ],
    practicalGuidance: [
      "Frame Legacy as a long-term campaign layer, not a first-hour objective dump.",
      "Explain replicas and displays as progression pressure only after local display/reward behavior is verified.",
      "Cross-link companion pages where museum/TCC support changes route quality.",
    ],
    uxTouchpoints: ["Museum displays", "The Curator's Companion", "Follower patches", "Home displays", "Replica logic"],
    sections: [
      {
        title: "Collection spine",
        paragraphs: [
          "ARR includes Legacy V6, The Curator's Companion, official patches, follower patches, Creation Club patches, player-home displays, visual overhaul, perk menu support, storage patches, and many content-specific display integrations. The player-facing guide should translate that into behavior: the museum can become the spine of a playthrough.",
        ],
      },
      {
        title: "Power versus collection",
        paragraphs: [
          "Legacy guidance should help players decide when to keep, sell, replicate, or display items. In Authoria, that advice must be balanced against Requiem economy and survival pressure: a display goal is not automatically worth starving the route or carrying too much weight.",
        ],
      },
    ],
    verificationNotes: [
      "Verify local replica/display behavior and The Curator's Companion settings before quoting exact collection rules.",
      "Audit follower and new-land integrations for route-specific cross-links.",
    ],
  },
};

const companionDetails: Record<
  string,
  {
    summary: string;
    playerExperience: string[];
    progressionImpact: string[];
    practicalGuidance: string[];
    uxTouchpoints: string[];
    sections: ReferenceEntry["sections"];
    verificationNotes: string[];
  }
> = {
  inigo: {
    summary:
      "Inigo should be documented as a high-presence companion whose Authoria role is route confidence, banter density, and Requiem-aware party support. The local profile includes Inigo, a Requiem patch, banter links, location/interior patches, bard support, LOTD/TCC support, and visual cleanup.",
    playerExperience: [
      "The player is not just recruiting a fighter; they are adding a long-form commentary layer to travel and questing.",
      "Inigo can make early danger feel more manageable, but his presence also changes the tone and density of a route.",
      "Because the profile carries Requiem and museum/support patches, upstream assumptions should not be treated as final.",
    ],
    progressionImpact: [
      "A Requiem-aware Inigo can smooth early combat and road confidence.",
      "Banter and museum support make him more valuable on long campaign routes than a generic hireling.",
      "Follower balance settings still matter when pairing him with additional companions.",
    ],
    practicalGuidance: [
      "Present Inigo as a strong first serious companion once recruitment is verified.",
      "Mention his banter links with Auri and Kaidan/Inigo support where relevant.",
      "Warn that adding him to a large party changes both fight readability and dialogue pacing.",
    ],
    uxTouchpoints: ["Follower controls", "Banter patches", "Museum/TCC support", "Requiem follower patch"],
    sections: [
      {
        title: "Best use case",
        paragraphs: [
          "Inigo is best framed as an anchor companion for players who want travel to feel voiced and supported. His local Requiem patch means the page should discuss him as part of the Authoria party-power layer, not as an untouched upstream follower.",
          "He is especially relevant to early and midgame route confidence, but the article should avoid promising exact combat strength until record-level stats are checked.",
        ],
      },
    ],
    verificationNotes: [
      "Verify recruitment state and exact starting conditions.",
      "Inspect Requiem - Inigo.esp before making final stat or perk claims.",
    ],
  },
  kaidan: {
    summary:
      "Kaidan is one of the most infrastructure-heavy companions in ARR: the profile includes immersive features, alternate/bounty starts, survival integration, tent and camp support, Requiem patching, visual replacers, museum support, and broad location compatibility.",
    playerExperience: [
      "The player experiences Kaidan as a relationship/campaign companion, not a disposable combat slot.",
      "His survival, tent, and alternate-start support make him unusually tied to route comfort and long travel.",
      "The amount of support can improve immersion but also increases setup and pacing complexity.",
    ],
    progressionImpact: [
      "Kaidan can make travel-heavy play more stable because the local stack explicitly connects him to survival systems.",
      "Requiem patching means his combat role should be interpreted through ARR balance.",
      "Alternate-start and bounty-start support can affect how early his content enters the run.",
    ],
    practicalGuidance: [
      "Frame Kaidan as a major playthrough choice rather than a casual pickup.",
      "Mention survival and tent support when recommending him for travel-heavy or cold-region routes.",
      "Keep party-size advice conservative because his feature stack can dominate pacing.",
    ],
    uxTouchpoints: ["Kaidan MCM", "Immersive Features", "Survival patches", "Tent/camp support", "Requiem patch"],
    sections: [
      {
        title: "Travel companion profile",
        paragraphs: [
          "Kaidan's local support points toward a companion who changes how travel feels: tent changes, SunHelm/Frostfall survival patches, alternate-start hooks, and broad location patches all make him part of route planning.",
          "That makes him a strong candidate for players who want a voiced, relationship-heavy, travel-aware run. It also means the guide should warn that he is not a quiet utility follower.",
        ],
      },
    ],
    verificationNotes: [
      "Read KaidanMCM.json and verify which options are active before quoting MCM behavior.",
      "Inspect Kaidan 2 - Requiem patch.esp before final combat-role claims.",
    ],
  },
  auri: {
    summary:
      "Auri should be framed as a wilderness/story companion with extensive Authoria support: Requiem of the Green, Vigilant commentary, Kaidan and Inigo banter, FDE interactions, bard support, map marker support, museum patches, and food/beverage Requiem compatibility.",
    playerExperience: [
      "The player adds a companion who strongly colors wilderness travel and story tone.",
      "Her Vigilant commentary and banter support make her more than a combat helper on specific campaign routes.",
      "Her local patches suggest she is curated for both presentation and Requiem-adjacent balance.",
    ],
    progressionImpact: [
      "Auri can make forest and travel-heavy play feel more authored and companion-backed.",
      "Vigilant support makes her relevant to campaign planning, not just open-world wandering.",
      "Food/beverage compatibility points to survival/economy interactions that need verification before exact advice.",
    ],
    practicalGuidance: [
      "Recommend Auri when the player wants wilderness tone, banter, and Vicn commentary.",
      "Call out her Vigilant support on the Vigilant guide.",
      "Mention her Inigo/Kaidan banter links when advising party composition.",
    ],
    uxTouchpoints: ["Banter patches", "Vigilant commentary", "Map marker support", "Requiem of the Green"],
    sections: [
      {
        title: "Campaign and wilderness fit",
        paragraphs: [
          "Auri is one of the clearest examples of why companion pages need to be specific. Her local setup connects follower tone, wilderness identity, Requiem support, Vigilant commentary, and cross-companion banter.",
          "The page should help players decide whether they want her as a thematic wilderness partner, a Vicn commentary companion, or part of a talkative party with Inigo or Kaidan.",
        ],
      },
    ],
    verificationNotes: [
      "Verify how Auri's Vigilant commentary triggers in the local setup.",
      "Inspect Requiem of the Green and food/beverage patches before final balance claims.",
    ],
  },
  lucien: {
    summary:
      "Lucien is a knowledge-and-banter companion in ARR with Requiem support, Anniversary Edition support, FDE links, visual replacer support, lighting/location patches, and broader companion-stack integration.",
    playerExperience: [
      "The player gets a companion whose main value is commentary, learning/growth tone, and conversational texture.",
      "Lucien can soften lonely routes without necessarily being the most direct power solution.",
      "His local Requiem patch means the guide should still verify combat and growth assumptions.",
    ],
    progressionImpact: [
      "Lucien is useful when the player wants guidance tone and story presence while stabilizing.",
      "He may be better framed as a long-route companion than as an immediate answer to hard Requiem fights.",
      "Requiem patching and local visual/location support make ARR-specific behavior important.",
    ],
    practicalGuidance: [
      "Frame Lucien around story presence, learning curve, and party texture.",
      "Avoid overstating combat power until the local Requiem patch is inspected.",
      "Mention FDE and AE support when explaining why he fits longer playthroughs.",
    ],
    uxTouchpoints: ["Dialogue", "FDE patches", "Requiem patch", "AE support"],
    sections: [
      {
        title: "Companion role",
        paragraphs: [
          "Lucien's page should answer a different question than Kaidan or Inigo. He is not only about route safety; he is about whether the player wants a companion who makes the world more conversational and developmental while still being adapted to the local Requiem stack.",
        ],
      },
    ],
    verificationNotes: [
      "Verify recruitment and growth behavior in ARR.",
      "Inspect Requiem - Lucien.esp before final combat scaling claims.",
    ],
  },
  remiel: {
    summary:
      "Remiel is a Dwemer-specialist companion whose ARR support includes Requiem patching, FDE links, visual/replacer support, museum/TCC patches, location patches, Nimhe support, and food/beverage compatibility.",
    playerExperience: [
      "The player gets a specialist companion whose value is strongest when Dwemer, museum, and technical-exploration themes matter.",
      "Her page should explain when she adds useful context rather than generic combat support.",
      "Local compatibility suggests she is intended to travel through several curated content layers.",
    ],
    progressionImpact: [
      "Remiel can shape Dwemer route confidence and museum-oriented play.",
      "Requiem patching means her combat and survival role needs local verification.",
      "Her museum/TCC support makes her more relevant to collection-heavy campaigns.",
    ],
    practicalGuidance: [
      "Recommend Remiel for Dwemer, museum, and technical exploration runs.",
      "Mention Nimhe and museum support where those routes are documented.",
      "Avoid final combat advice until her Requiem patch is inspected.",
    ],
    uxTouchpoints: ["Dialogue", "Museum/TCC support", "Requiem patch", "Location patches"],
    sections: [
      {
        title: "Specialist value",
        paragraphs: [
          "Remiel should be written as a specialist, not just another follower. The player-facing question is whether the run is heading toward Dwemer spaces, museum collection, or technical lore where her commentary and utility are more central.",
        ],
      },
    ],
    verificationNotes: [
      "Verify recruitment and Dwemer-specific interactions.",
      "Inspect Requiem - Remiel.esp and food/beverage compatibility before final power/survival claims.",
    ],
  },
  xelzaz: {
    summary:
      "Xelzaz is a high-context Telvanni companion with unusually strong ARR route hooks: Requiem patching, Wyrmstooth support, Sirenroot support, Inigo patching, bard support, market/location patches, museum/TCC support, and food/beverage compatibility.",
    playerExperience: [
      "The player adds a companion who is especially relevant to long quest and new-land routes.",
      "His Wyrmstooth and Sirenroot support make him a campaign-planning companion, not only a road follower.",
      "His Telvanni identity can strongly color tone and dialogue density.",
    ],
    progressionImpact: [
      "Xelzaz should be considered for Wyrmstooth or Sirenroot routes once those arcs are staged.",
      "Requiem and food/beverage patches mean local balance and survival behavior need verification.",
      "He can add both utility and conversational density to long routes.",
    ],
    practicalGuidance: [
      "Cross-link Xelzaz from Wyrmstooth and Sirenroot guide pages.",
      "Mention Inigo compatibility when advising party composition.",
      "Frame him as a mid/long-route companion until recruitment and local scaling are verified.",
    ],
    uxTouchpoints: ["Wyrmstooth support", "Sirenroot support", "Requiem patch", "Banter/location patches"],
    sections: [
      {
        title: "Quest-route companion",
        paragraphs: [
          "Xelzaz is the strongest current candidate for a companion page tied directly to quest-arc routing. The live profile includes both Wyrmstooth and Sirenroot support alongside Requiem and museum compatibility, so his page should tell players when bringing him changes the quality of a campaign route.",
        ],
      },
    ],
    verificationNotes: [
      "Verify recruitment timing and whether Wyrmstooth/Sirenroot support requires specific quest states.",
      "Inspect Requiem - Xelzaz.esp before final combat-role claims.",
    ],
  },
  mrissi: {
    summary:
      "M'rissi should be documented as follower-plus-quest content with local quest tweaks, visual replacement, location patching, and adult-content-adjacent compatibility that should stay outside the public core guide unless directly relevant.",
    playerExperience: [
      "The player is engaging a quest companion rather than only recruiting party utility.",
      "Her page needs tone and content-expectation framing before route advice.",
    ],
    progressionImpact: [
      "Quest companion pacing can redirect early play if started too soon.",
      "Local patches suggest the page needs verification before recommending an entry point.",
    ],
    practicalGuidance: [
      "Frame as quest content with follower implications.",
      "Verify tone, recruitment, and route impact before publishing as final.",
    ],
    uxTouchpoints: ["Quest start", "Follower controls", "Location patches"],
    sections: [
      {
        title: "Quest-companion boundary",
        paragraphs: [
          "M'rissi should be handled carefully because her value is not only party support. The article needs to answer what kind of quest experience the player is starting and whether it belongs in early progression.",
        ],
      },
    ],
    verificationNotes: ["Verify public-facing content boundaries and recruitment before expanding."],
  },
  thogra: {
    summary:
      "Thogra should be framed as an Orc follower and quest route with battle-camp changes, visual replacement, location patches, and later local patching visible in the load order.",
    playerExperience: [
      "The player adds a more combat-forward follower/quest presence than a pure banter companion.",
      "Camp and location support suggest she affects place-based play, not only party composition.",
    ],
    progressionImpact: [
      "Thogra may be useful for players who want stronger early combat support, pending verification.",
      "Quest and camp changes can create local-route implications.",
    ],
    practicalGuidance: [
      "Verify recruitment and battle-camp changes before giving route advice.",
      "Frame as combat/quest support rather than a generic follower.",
    ],
    uxTouchpoints: ["Follower controls", "Quest/camp content", "Location patches"],
    sections: [
      {
        title: "Combat and camp angle",
        paragraphs: [
          "Thogra's page should answer whether she is early combat support, a quest commitment, or both. The local evidence points toward follower, quest, battle-camp, and location support that need direct verification before any route recommendation.",
        ],
      },
    ],
    verificationNotes: ["Verify recruitment, camp edits, and combat role in-game or via plugin records."],
  },
  yoana: {
    summary:
      "Yoana currently has the least local context among the priority follower pages and should remain a concise verification target until recruitment, role, and interaction coverage are established.",
    playerExperience: [
      "The player should not yet be given strong advice beyond existence and verification status.",
    ],
    progressionImpact: [
      "Potential party impact is unknown until recruitment and combat role are checked.",
    ],
    practicalGuidance: [
      "Keep this page in verification status.",
      "Capture recruitment, role, and any quest interactions before recommending.",
    ],
    uxTouchpoints: ["Follower controls", "Dialogue"],
    sections: [
      {
        title: "Verification target",
        paragraphs: [
          "Yoana's page should stay deliberately thin until direct evidence confirms how she enters play and what she contributes. This avoids inventing follower advice from the name alone.",
        ],
      },
    ],
    verificationNotes: ["Verify recruitment, combat role, and dialogue/quest coverage."],
  },
};

const regionDetails: Record<
  string,
  {
    summary: string;
    tags: string[];
    playerExperience: string[];
    progressionImpact: string[];
    practicalGuidance: string[];
    uxTouchpoints: string[];
    sections: ReferenceEntry["sections"];
    verificationNotes: string[];
  }
> = {
  "falkreath-hub": {
    summary:
      "Falkreath is a useful second-step hub after Riverwood and Whiterun: it offers beds, vendors, and task-board income, but the forest turns quickly from errands into exposure, wounds, predators, ambushes, and remote-road drift.",
    tags: ["region", "hub", "falkreath", "forest", "early progression"],
    playerExperience: [
      "The hold feels quieter than Whiterun, but danger is less signposted: woods, animals, ambushes, bad weather, and road forks can all spend your supplies before a dungeon ever starts.",
      "The town is valuable because it lets you turn delivery jobs, gathering requests, selling, food, and sleep into a repeatable recovery loop.",
      "Use the hub to learn when a forest route is still recoverable: you should know where you will sleep, what you will eat, and which road brings you back.",
    ],
    progressionImpact: [
      "Falkreath works best after the Riverwood/Whiterun loop has taught you how to fund rooms, food, potions, and basic gear.",
      "Forest jobs reward caution because Requiem makes attrition matter: a wound, disease, poison, or long retreat can be more expensive than the job reward.",
      "Visible ruins, Daedric hooks, and long roads are readiness checks. They ask whether the build has damage, stamina, healing, resistances, and a return plan.",
    ],
    practicalGuidance: [
      "Use Falkreath for one board job at a time: deliveries, gathering requests, nearby errands, or scouting legs that still return to town.",
      "Treat road exits as separate decisions: south and west routes can be longer and harder to recover from than they look on the map.",
      "Carry food, water, and a recovery plan even for errands because detours and avoided fights can stretch the trip.",
      "Return to town when the route starts spending potions, warmth, fatigue, daylight, or wound risk faster than it pays you back.",
    ],
    uxTouchpoints: ["Missives board", "Paper map", "Survival widgets", "Follower controls", "Town services"],
    sections: [
      {
        title: "Use it after your first loop",
        paragraphs: [
          "Falkreath is not a bad early hub, but it is a better second hub than first answer. Come here once Riverwood and Whiterun have taught you how to sleep, sell, eat, read the board, and stop before the route turns sour.",
          "The useful jobs are the ones you can finish or abandon without losing recovery: a Missives delivery, a gathering request, a nearby errand, or a scouting leg that returns before night. If a job points deep into woods, ruins, or a long road with no warm stop, treat that as a later route rather than today's pay.",
        ],
      },
      {
        title: "The forest hides the cost",
        paragraphs: [
          "The danger is route drift. You can leave town for a delivery and end up in poor recovery terrain, bad weather, or a fight where the injury matters longer than the enemy did.",
          "Read Falkreath jobs by return path first. A small reward is only low-commitment when you can name the bed, food source, and road back before you leave.",
        ],
        bullets: [
          "Stable: Missives deliveries, gathering requests, town errands, known beds, and work that brings you back before night.",
          "Scouting: forest routes where you can turn around before the objective.",
          "Delay: remote ruins, Daedric hooks, long wilderness loops, and any job where retreat is less clear than the reward.",
        ],
      },
    ],
    verificationNotes: [
      "Audit nearby Falkreath board destinations and dungeon entrances before marking any specific job safe.",
      "Verify local bed, food, water, carriage, and follower-recruitment affordances in-game.",
    ],
  },
  "riften-ivarstead-corridor": {
    summary:
      "Use Riften and Ivarstead as a staged route: Riften can stabilize money, services, and supplies, while Ivarstead is the checkpoint where you decide whether the mountain, nearby ruins, or another road is actually worth the cost.",
    tags: ["region", "hub", "riften", "ivarstead", "corridor", "travel"],
    playerExperience: [
      "Riften gives you city services, shops, beds, work boards, and locally adjusted interiors, so it can feel safer than the roads around it.",
      "Ivarstead adds real services, but it is still a checkpoint before mountain pressure, nearby ruins, and longer road choices.",
      "Visible roads and markers help you plan, but they do not tell you whether your food, fatigue, warmth, or combat tools can survive the route.",
    ],
    progressionImpact: [
      "Riften can stabilize money through city services and task-board jobs. For new players, start with deliveries, gathering requests, and one-road errands before bigger city or mountain commitments.",
      "Ivarstead is useful as a rest point, not proof that the character is ready for every mountain-adjacent objective.",
      "High Hrothgar, Shroud Hearth Barrow, the Ratway, and nearby forts ask different questions: food and warmth for the climb, undead or interior tools for ruins, locks and close-quarters risk for undercity spaces, and retreat discipline for forts.",
    ],
    practicalGuidance: [
      "Use Riften to sell, sleep, buy food, check the Missives board, and reset before you take one road job.",
      "Pick one corridor objective at a time instead of stacking city work, road work, ruins, and mountain travel into one outing.",
      "At Ivarstead, stop and reassess food, fatigue, warmth, potions, daylight, and the road home before continuing.",
      "Delay High Hrothgar, Shroud Hearth Barrow, Ratway trouble, and fort routes when you cannot name the recovery stop after them.",
    ],
    uxTouchpoints: ["Missives board", "Paper map", "SunHelm needs", "Requiem pressure", "Follower controls"],
    sections: [
      {
        title: "Think in legs, not markers",
        paragraphs: [
          "Vanilla muscle memory says a visible marker is the next thing to chase. Authoria makes that a bad habit. Riften to Ivarstead works better as a set of legs: city services, road travel, checkpoint, then a decision.",
          "The local setup supports that framing. Riften has many adjusted shops, inns, interiors, and service spaces. Ivarstead is expanded into more than a signpost, with a shop, smith, inn, bakery, chapel, farm, and houses to support a pause.",
        ],
      },
      {
        title: "Use Riften to recover, not to spiral",
        paragraphs: [
          "Riften looks secure inside the walls and still points at trouble. Use it for selling, rooms, food, board jobs, and route selection. A good first board job is a delivery, gathering request, nearby errand, or one-road task you can turn back from cleanly. Do not let city confidence become permission to clear the Ratway, chase every nearby hook, and then start a mountain trip tired.",
          "Ivarstead is the same lesson in smaller form. It can support a pause, but it is not proof that High Hrothgar, Shroud Hearth Barrow, or a long road is safe today.",
        ],
        bullets: [
          "Stable: city services, Missives deliveries, gathering requests, short errands, one road leg, and a named return point.",
          "Scouting: Ivarstead as a stop where you can turn back cleanly.",
          "Delay: mountain pushes, nearby ruins, forts, sewer trouble, and any route that spends your recovery buffer before the objective.",
        ],
      },
    ],
    verificationNotes: [
      "Manual route-feel proof is still needed before publishing exact danger tiers for nearby ruins, forts, mountain travel, or city underworld routes.",
      "Carriage and ferry behavior should be checked in game before making precise travel-network claims.",
    ],
  },
  "solitude-hub": {
    summary:
      "Solitude is a high-service stabilizer: use it for rest, shopping, selling, and travel planning, then be deliberate about which faction, museum, coast, or cave hook becomes an actual trip.",
    tags: ["region", "hub", "solitude", "services", "travel"],
    playerExperience: [
      "The city gives you one of the strongest service bases in the province: beds, vendors, selling options, delivery/gathering jobs, and travel links are all useful.",
      "That safety can make the next choice feel smaller than it is. Treat a resupply visit, a faction errand, a museum hook, and a coastal road as different decisions.",
      "Use Solitude to get stable first; leave with one planned objective and a named way back.",
    ],
    progressionImpact: [
      "A character with money can turn Solitude into a strong recovery loop, but a broke or tired character can still get stranded by expensive rooms, long roads, or stacked objectives.",
      "Faction, museum, coast, cave, and dock hooks can each become a larger commitment than a first visit needs.",
      "The danger is overcommitment, not the city itself. Strong vendors and beds improve recovery; they do not solve frost, poison, magic, boss, or long-route readiness for you.",
    ],
    practicalGuidance: [
      "Arrive with enough gold for food, a room, and a ride back to a known hub.",
      "Sell, rest, check the board, and choose one low-commitment job before taking faction or museum bait.",
      "Keep coast, cave, dock, and campaign hooks separate from your basic city-resupply visit.",
      "Use travel service for recovery when you are tired or under-supplied instead of walking out because the map looks familiar.",
    ],
    uxTouchpoints: ["City services", "Travel service", "Missives board", "Museum route hooks", "Paper map"],
    sections: [
      {
        title: "Use the city as a reset",
        paragraphs: [
          "Solitude changes early play because service density gives you choices. You can rest, sell, buy food, inspect board jobs, and plan travel instead of scraping through one more wilderness leg.",
          "A useful first job is specific: a delivery, gathering request, nearby errand, or one-road task that still leaves enough gold, food, and daylight to recover.",
        ],
      },
      {
        title: "Separate visit from campaign",
        paragraphs: [
          "The city points at a lot of interesting content. That does not mean all of it belongs in the same outing.",
          "For a first Solitude trip, decide whether you are here to reset, to fund supplies, or to start a larger thread. If the answer becomes all three, sleep and split the plan.",
        ],
        bullets: [
          "Stable: selling, shopping, room, food, delivery or gathering jobs, and travel back to known hubs.",
          "Scouting: nearby city errands and one-road jobs that return cleanly.",
          "Delay: stacked faction, museum, coastal, dock, cave, and campaign routes.",
        ],
      },
    ],
    verificationNotes: [
      "Verify Solitude board destinations and which nearby routes are recoverable at low level.",
      "Cross-check museum onboarding guidance against Legacy of the Dragonborn article work.",
    ],
  },
  "windhelm-hub": {
    summary:
      "Windhelm is a cold-weather service hub: useful once you reach it, but the approaches and exits ask for warmth, food, daylight, and a return plan before the next road.",
    tags: ["region", "hub", "windhelm", "cold", "survival"],
    playerExperience: [
      "You get major-city support once you are inside: an inn, shops, docks, stables, and places to sell or rest.",
      "The cold still matters on the way in and the way out. Do not judge the next road by the size of the city behind you.",
      "Windhelm works best when you treat it as a recovery anchor before northern or eastern travel, not a free pass through winter roads.",
    ],
    progressionImpact: [
      "Cold can turn a normal errand into a survival problem before combat starts if you leave hungry, tired, wet, or without a warm stop in mind.",
      "Northern and eastern routes can stack exposure, road fights, fatigue, frost resistance needs, and long returns in the same outing.",
      "Seasonal and survival systems mean the same map line can feel different depending on weather, time, warmth, food, and how much recovery buffer you brought.",
    ],
    practicalGuidance: [
      "Reach the city with warmth, food, and enough money for an inn stay.",
      "Rest and resupply before accepting work that points north, east, or along the coast.",
      "Pick short known routes first; leave long cold corridors until your build can handle exposure plus combat.",
      "Turn back when food, fatigue, warmth, or daylight starts failing before the objective does.",
    ],
    uxTouchpoints: ["SunHelm needs", "Seasons", "Travel service", "Paper map", "Missives board"],
    sections: [
      {
        title: "Cold changes the city",
        paragraphs: [
          "Windhelm teaches the route rule in a harsher way than Whiterun. A major city can recover you, but it cannot make a cold road safe after you leave tired or underfed.",
          "Read the approach and exit conditions before the objective. A delivery is only low-commitment if warmth, food, daylight, and the return leg still work.",
        ],
      },
      {
        title: "Use it as an anchor",
        paragraphs: [
          "A recoverable Windhelm plan is planned travel, a real rest, a resupply pass, then one clear piece of work. The risky version is treating it like Whiterun and walking into cold roads because the city itself felt secure.",
        ],
        bullets: [
          "Stable: inn, vendors, docks, stables, delivery jobs, gathering requests, and short returns.",
          "Scouting: one-road jobs where you can name the warm stop before you leave.",
          "Delay: long northern roads, coastal commitments, remote ruins, and cold-plus-combat routes.",
        ],
      },
    ],
    verificationNotes: [
      "Verify active season and survival profile interactions on Windhelm approach routes.",
      "Audit nearby board jobs for cold exposure and enemy profile.",
    ],
  },
  "winterhold-hub": {
    summary:
      "Winterhold is a deliberate cold-region trip, not a normal first hub: go for the College or northern work only when you can afford the route, the weather, and the return.",
    tags: ["region", "hub", "winterhold", "college", "cold", "magic"],
    playerExperience: [
      "The College makes Winterhold tempting early, especially for magic-minded characters.",
      "The town can support a pause, but it is remote, cold, and easier to reach with ambition than to leave with a clean recovery plan.",
      "Treat the route itself as part of the cost of becoming a northern or College-focused character; spell access still needs money, study time, food, warmth, and a way home.",
    ],
    progressionImpact: [
      "Magic goals do not replace food, sleep, warmth, gold, and return planning.",
      "A new mage can arrive for spells and still be overmatched by cold roads, fatigue, poor resistances, or the next trip south.",
      "Do not assume easy evacuation until you have checked the actual travel option in game.",
    ],
    practicalGuidance: [
      "Do not make Winterhold your first stabilization hub unless the character is built and supplied for a cold trip.",
      "Bring food, warmth, rest money, and a clear plan for getting south again.",
      "Treat College entry as a progression choice with travel costs attached, not just a dialogue stop.",
      "Leave northern roads, ruins, and side routes alone when the return plan is weaker than the goal.",
    ],
    uxTouchpoints: ["College entry", "Cold survival needs", "Map markers", "Travel surfaces", "Town services"],
    sections: [
      {
        title: "Remote ambition has a travel cost",
        paragraphs: [
          "Winterhold connects two things players often separate: magic ambition and route burden. Wanting the College is a valid plan, but the road and weather still count.",
          "Use the town and College as reasons to plan a trip, not reasons to ignore what the trip costs. In Authoria, a spell purchase is not the whole magic plan: the character still needs time, safety, supplies, and enough route discipline to use that investment.",
        ],
      },
      {
        title: "Make the return plan first",
        paragraphs: [
          "For most builds, Winterhold belongs after you have money, warmth, food, and a return strategy. Mage characters can go earlier than some builds, but they should still budget for the road.",
        ],
        bullets: [
          "Stable: inn stop, town services, College objective, and a planned route south.",
          "Scouting: College setup or town errands when you can recover immediately after.",
          "Delay: remote northern roads, ruins, and side objectives that leave you cold, tired, or stuck.",
        ],
      },
    ],
    verificationNotes: [
      "Verify actual carriage behavior with Winterhold Restored, CFTO, and disabled-carriage patching active.",
      "Audit College entry and local survival recovery options before final advice.",
    ],
  },
  "markarth-hub": {
    summary:
      "Markarth is a strong western service hub wrapped in terrain, ruins, politics, and Dwemer-adjacent danger; use it as a planned base, not a casual early dungeon launcher.",
    tags: ["region", "hub", "markarth", "dwemer", "western route"],
    playerExperience: [
      "The city gives you strong services, beds, vendors, and a western anchor once you reach it.",
      "The surrounding region can turn quickly from city errands into cliffs, ruins, Forsworn pressure, mines, caves, or dense city hooks.",
      "Use the city to recover and sort the plan before accepting work that points into old stone, remote roads, or deep interiors.",
    ],
    progressionImpact: [
      "Markarth can stabilize a prepared character through rest, vendors, and board jobs, but it is a poor place to wander blindly.",
      "Dwemer, Forsworn, cave, and terrain pressure can punish the wrong damage plan, poor armor, low supplies, missing resistances, or a vague retreat plan.",
      "Visible mines, ruins, and city hooks are warning signs to plan, not proof that the work is safe today.",
    ],
    practicalGuidance: [
      "Use Markarth after you have money, recovery supplies, and a clear reason to be in the west.",
      "Separate city errands from Dwemer, Forsworn, cave, mine, or remote-road commitments.",
      "Rest and sell before leaving town; do not start a ruin route while already tired or low on supplies.",
      "Treat markers for mines and ruins as economy or danger signals first, not guaranteed safe work.",
    ],
    uxTouchpoints: ["City services", "Missives board", "Mine markers", "Terrain pressure", "Paper map"],
    sections: [
      {
        title: "Western hub, not first answer",
        paragraphs: [
          "Markarth answers a different question than Whiterun. It can be an excellent base once reached, but the terrain and content density make it a bad blind first expansion.",
          "Map visibility helps you notice mines, roads, and important places. It does not tell you whether your build can handle constructs, ambushes, poison, armor checks, or the climb back to safety.",
        ],
      },
      {
        title: "When to use it",
        paragraphs: [
          "Use Markarth when you can afford recovery, handle tougher interiors, and want western-region work. A fragile character can still visit by travel service, but should treat the city as a resupply stop before accepting anything that points into ruins, caves, or remote roads.",
        ],
        bullets: [
          "Stable: inn, vendors, delivery jobs, gathering requests, city errands, and western resupply.",
          "Scouting: short roads and errands with a clear retreat to the city.",
          "Delay: Dwemer routes, Forsworn pressure, remote terrain, mines, caves, and city hooks that turn into larger commitments.",
        ],
      },
    ],
    verificationNotes: [
      "Audit Markarth board destinations and nearby mine/ruin danger labels.",
      "Cross-link deeper Dwemer-route guidance after dungeon evidence is stronger.",
    ],
  },
};

const entry = (
  value: Omit<
    ReferenceEntry,
    "questionsAnswered" | "evidenceDossier" | "settingQuotes" | "publicationStatus"
  > & {
    questionsAnswered?: string[];
    evidenceDossier?: ReferenceEntry["evidenceDossier"];
    publicationStatus?: ArticlePublicationState;
    settingQuotes?: SettingQuote[];
  },
): ReferenceEntry => ({
  publicationStatus: "seeded",
  questionsAnswered: [
    "What should I do before acting on this?",
    "What changed from vanilla Skyrim?",
  ],
  evidenceDossier: [
    {
      publicLabel: "Local Authoria source notes",
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
    publicationStatus: "evidence-backed",
    title: "First Session Setup",
    strapline:
      "Before the first road, confirm the exact controls, difficulty, survival posture, starter tools, and first recovery hub.",
    summary:
      "Your first session should be a setup pass, not a blind launch. Test the keys you will actually touch, match the in-game difficulty to the selected setup, decide how hard survival should bite, choose a starter-kit direction, and name your first recovery hub before accepting travel work.",
    questionsAnswered: [
      "Which keys should I test before leaving setup?",
      "Which difficulty and survival choices change the first hour?",
      "What should I know before accepting the first road job?",
    ],
    tags: ["onboarding", "setup", "difficulty", "controls", "new save"],
    playerExperience: [
      "The player should leave setup knowing the keys for activation, weapon ready, sprint, dodge, power attack, lock-on, potion recovery, Wheeler, and the utility tools they will use on the road.",
      "A mismatched difficulty, untested dodge key, or forgotten potion key can make the game feel broken when it is actually asking for practiced inputs.",
      "The first session should produce a practical route posture: input method, difficulty, survival pressure, starter tools, first hub, and a rule for turning back.",
    ],
    progressionImpact: [
      "Difficulty, follower weakening, survival posture, and starter-kit access change what counts as recoverable early play.",
      "Static Skill Leveling and Experience mean early progress is planned through choices and level-up allocation, not passive vanilla skill grinding.",
      "Save-sensitive customization, input conflicts, and difficulty mismatch should be resolved before the character starts accumulating route and quest state.",
    ],
    practicalGuidance: [
      "Keyboard/mouse check: press E to activate, R to ready or sheathe, Left Shift to sprint, Left Alt to dodge, Mouse4 to power attack, Mouse3 to lock on, and G to open Wheeler.",
      "Controller check: press A to activate, X to ready or sheathe, L3 to sprint, B to dodge, R1 to power attack, R3 to lock on, and L1 to open Wheeler.",
      "Recovery check: press 0 for health potion, - for stamina potion, and = for magicka potion while you are not under pressure.",
      "Utility check: test B for Horse Whistle, L for QuickLight, H for follower commands, U for Character Sheet, K for Bestiary, V for Build Campfire, ; for Fill Water Bottle, N for Bathe, and Y for Helmet Toggle.",
      "Before accepting work, match the in-game difficulty prompt to the setup you chose, pick season/survival pressure, choose a first hub, and decide what will make you turn back.",
    ],
    uxTouchpoints: [
      "Keybind reminder",
      "Controller setup",
      "Difficulty prompt",
      "Season and survival MCMs",
      "Starting-room initialization messages",
      "Potion and utility hotkeys",
    ],
    settingQuotes: [
      setting(
        "requiem.general.fTimeScale",
        "Local time scale",
        "12",
        "Travel, exposure, and daily planning should be interpreted through the local runtime clock, not vanilla assumptions.",
      ),
      setting(
        "sunhelm-normal.root.HungerRate",
        "Normal hunger rate",
        "7",
        "Food planning is active in the baseline survival profile, so the first route should include supply access.",
      ),
      setting(
        "sunhelm-normal.root.ThirstRate",
        "Normal thirst rate",
        "7",
        "Water access matters from the start instead of being an optional immersion detail.",
      ),
      setting(
        "sunhelm-normal.root.FatigueRate",
        "Normal fatigue rate",
        "7",
        "Beds and rest cadence should be part of onboarding and route advice.",
      ),
      setting(
        "dynamic-activation-key.general.iHotkey",
        "Dynamic activation modifier",
        "Left Shift",
        "The interaction layer uses the Left Shift keycode, so test alternate prompts before assuming vanilla activation behavior.",
      ),
      setting(
        "horse-whistle.main.iWhistleHotkey",
        "Horse whistle hotkey",
        "B",
        "Mount recovery is keybound locally and belongs in travel onboarding once horses matter.",
      ),
      setting(
        "optimal-potion-hotkey.hotkeys.iHealthpotionhotkey",
        "Health potion hotkey",
        "0",
        "Health recovery needs a practiced key before the first serious fight.",
      ),
      setting(
        "optimal-potion-hotkey.hotkeys.iStaminapotionhotkey",
        "Stamina potion hotkey",
        "-",
        "Stamina recovery is part of sprinting, blocking, dodging, and retreat planning.",
      ),
      setting(
        "optimal-potion-hotkey.hotkeys.iMagickapotionhotkey",
        "Magicka potion hotkey",
        "=",
        "Magic recovery should be tested before a mage route depends on it.",
      ),
      setting(
        "tk-dodge.general.iDodgeKey",
        "Dodge key",
        "Left Alt / gamepad B",
        "Dodge is a committed defensive input with stamina cost and local perk gating, not a panic button to discover mid-fight.",
      ),
      setting(
        "ocpa.general.iKeycode",
        "Power attack input",
        "Mouse4 / gamepad R1",
        "Power attack has a dedicated input and should be tested before Requiem punishes a missed opening.",
      ),
      setting(
        "true-directional-movement.keys.uTargetLockKey",
        "Target lock input",
        "Mouse3 / gamepad R3",
        "Target lock affects combat readability and should be tested before a serious road fight.",
      ),
      setting(
        "mcm-keybinds.keybinds.0.keycode",
        "Managed helmet-toggle keybind",
        "Y",
        "Helmet Toggle is a managed presentation hotkey, so players should confirm it during downtime rather than in combat or bad weather.",
      ),
    ],
    sections: [
      {
        title: "Test the controls first",
        paragraphs: [
          "Do this before accepting the first road job. Stand somewhere quiet, then touch the controls that can save or ruin the first route.",
          "Keyboard/mouse players should test E, R, Left Shift, Left Alt, Mouse4, Mouse3, G, 0, -, =, B, L, H, U, K, V, ;, N, and Y. Controller players should test A, X, L3, B, R1, R3, L1, D-pad right, D-pad left, plus the potion and utility bindings they expect to use from keyboard or menu.",
        ],
        bullets: [
          "E or A: activate a container, door, or NPC.",
          "R or X: ready and sheathe your weapon.",
          "Left Shift or L3: sprint until you can feel the stamina cost.",
          "Left Alt or B: dodge once, then notice that dodge spends stamina.",
          "Mouse4 or R1: power attack deliberately, not by accident.",
          "Mouse3 or R3: lock on, then unlock before moving on.",
          "G or L1: open Wheeler and confirm you can leave it cleanly.",
          "0, -, and =: health, stamina, and magicka potion recovery.",
        ],
      },
      {
        title: "Set the game state",
        paragraphs: [
          "Some setup choices are not cosmetic toggles. Difficulty, follower weakening, survival posture, season, starter kit, and visual setup decide what the opening hour feels like.",
          "Match the in-game difficulty prompt to the setup you actually chose. A player on hard survival with a fragile starter kit is not playing the same opening as a normal-survival character with stronger tools.",
        ],
        bullets: [
          "Resolve character appearance and other save-sensitive customization before the route starts.",
          "Choose the survival profile and season before accepting travel-heavy work.",
          "Choose a starter kit for the first ten hours, not the endgame fantasy.",
          "Decide whether followers are part of the opening route or a later comfort layer.",
        ],
      },
      {
        title: "Leave with a first route",
        paragraphs: [
          "Leave setup with a route, not just a character. Name the first recovery hub, the first vendor, the first bed, the first food source, and the road back before you accept travel-heavy work.",
          "For Stage 1 advice, Riverwood and Whiterun are the teaching loop. Use them to practice selling, eating, resting, reading Missives, testing combat inputs, and leaving before a mistake becomes the whole session.",
        ],
        bullets: [
          "Take a delivery, gathering request, nearby errand, or familiar-road scouting leg before a dungeon push.",
          "Buy food before luxuries; keep enough gold for a room or ride back.",
          "Turn back if food, warmth, potions, fatigue, or wounds start failing before the objective.",
          "Treat Bleak Falls, giants, dragons, cold roads, and remote ruins as readiness checks, not automatic first stops.",
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
      { label: "Dynamic activation preset", path: `${mcm}/MCM/Settings/Dynamic Activation Key - MCM.ini`, note: "Local interaction key and addon surface." },
      { label: "Horse whistle preset", path: `${mcm}/MCM/Settings/Horse Whistle Key.ini`, note: "Local mount recovery controls." },
      { label: "Potion hotkey preset", path: `${mcm}/MCM/Settings/OptimalPotionHotkeyMCM.ini`, note: "Local recovery hotkeys." },
      { label: "Dodge preset", path: `${mcm}/MCM/Settings/TKDodgeAddon.ini`, note: "Local dodge behavior and keybinding surface." },
      { label: "Movement preset", path: `${mcm}/MCM/Settings/TrueDirectionalMovement.ini`, note: "Local target-lock and movement surface." },
      { label: "Power attack preset", path: `${controller}/MCM/Settings/OCPA.ini`, note: "Local power-attack control behavior." },
      { label: "Hotkeys reminder", path: `${mcm}/Interface/hotkeysreminder_data.json`, note: "Human-readable keyboard and controller labels." },
      { label: "Managed MCM keybind export", path: `${mcm}/MCM/Settings/keybinds.json`, note: "Local keybind preset export." },
    ],
    verificationNotes: [
      "The exact in-game initialization message order should be verified in a fresh game after article drafting.",
    ],
    related: ["character-creation-and-starting-choices", "survival-seasons-and-travel"],
  }),
  entry({
    slug: "controls-hud-and-interaction",
    kind: "systemArticle",
    section: "start-here",
    publicationStatus: "evidence-backed",
    title: "Controls, HUD, and Interaction",
    strapline:
      "Authoria has enough deliberate controls and HUD state that learning the interface is part of the first route.",
    summary:
      "Controls are part of survival here. Time and season are visible, looting and harvesting have interaction pacing, recovery needs practiced inputs, and appearance tools belong in quiet downtime.",
    tags: ["controls", "hud", "keybinds", "interaction", "first session"],
    playerExperience: [
      "The player sees more state on screen than vanilla: clock, date, season, moon/state widgets, survival icons, and configured interaction prompts.",
      "Some everyday actions have presentation and timing friction, especially looting, harvesting, body/helmet presentation, photo mode, and first-person interactions.",
      "Combat controls must be tested before pressure arrives because dodge, power attack, recovery, and interaction are separate muscle-memory surfaces.",
    ],
    progressionImpact: [
      "Control fluency changes early survivability because missed potion, dodge, power-attack, or interaction inputs can turn a manageable fight into a route failure.",
      "Visible time and season state make travel planning more explicit.",
      "Interaction animation and looting friction make gathering and scavenging route decisions, not instant background income.",
    ],
    practicalGuidance: [
      "Before leaving the first quiet room or hub, press Mouse4 or R1 for power attack, Mouse3 or R3 for lock-on, Left Alt or gamepad B for dodge, and 0/-/= for potion recovery.",
      "Test B for Horse Whistle, L for QuickLight, H for follower commands, U for Character Sheet, K for Bestiary, V for Build Campfire, ; for Fill Water Bottle, N for Bathe, and Y for Helmet Toggle.",
      "Use the clock/date/season HUD as route information, especially before accepting distant work.",
      "Do appearance tools deliberately during downtime rather than treating them as combat or travel tools.",
      "Sheathe weapons when utility interactions fail, because first-person interactions can be disabled while weapons are drawn.",
    ],
    uxTouchpoints: [
      "Clock/date/season widgets",
      "Dynamic activation",
      "Power attack key",
      "Potion hotkeys",
      "Looting and harvest animations",
      "Helmet/OBody/photo controls",
    ],
    settingQuotes: [
      setting(
        "first-person-interactions.main.iDisableWeaponsDrawn",
        "Interaction disabled while weapons drawn",
        "1",
        "Utility interactions can require sheathing, so players should test this before pressure.",
      ),
      setting(
        "looting-animations.main.iEnableContainer",
        "Container looting animations",
        "1",
        "Looting has presentation and timing friction instead of being purely instant.",
      ),
      setting(
        "ocpa.general.iKeycode",
        "Power attack key",
        "Mouse4 / gamepad R1",
        "Power attack has a configured key and should be part of combat onboarding.",
      ),
      setting(
        "true-directional-movement.keys.uTargetLockKey",
        "Target lock key",
        "Mouse3 / gamepad R3",
        "Lock-on changes fight readability and should be tested before pressure arrives.",
      ),
      setting(
        "optimal-potion-hotkey.hotkeys.iHealthpotionhotkey",
        "Health potion hotkey",
        "0",
        "Health recovery has a direct key and should not be discovered mid-fight.",
      ),
      setting(
        "optimal-potion-hotkey.hotkeys.iStaminapotionhotkey",
        "Stamina potion hotkey",
        "-",
        "Stamina recovery matters because sprinting, blocking, dodging, and retreat all spend the same resource.",
      ),
      setting(
        "optimal-potion-hotkey.hotkeys.iMagickapotionhotkey",
        "Magicka potion hotkey",
        "=",
        "Magic recovery has a direct key and should be part of mage onboarding.",
      ),
      setting(
        "obody.settings.iPresetListKey",
        "Body preset list key",
        "24",
        "Appearance customization has a configured key and should be handled deliberately during setup.",
      ),
    ],
    sections: [
      {
        title: "Why controls are gameplay",
        paragraphs: [
          "Authoria asks the player to read and act on more state than vanilla. The local HUD shows clock, date, season, and moon/season symbols, while survival and map systems make that information useful. A distant job is not only a marker; it is a time, weather, food, and recovery decision.",
          "Controls are equally practical. Power attack is Mouse4 or R1, target lock is Mouse3 or R3, dodge is Left Alt or gamepad B, and potion recovery uses 0, -, and =. Test those surfaces early so route and combat advice is actually usable.",
        ],
      },
      {
        title: "Interaction pacing",
        paragraphs: [
          "Looting, harvesting, and first-person interactions are not invisible background behavior. Container and harvest animations are active, first-person utility interactions can be disabled while weapons are drawn, and automatic torch equip is disabled. That creates small but real pacing rules around gathering, scavenging, and moving through dark or hostile spaces.",
          "This is why the first-session flow should include a quiet interaction test: harvest, loot, sheathe, use alternate activation, confirm recovery keys, and then leave the hub.",
        ],
      },
      {
        title: "Presentation controls",
        paragraphs: [
          "Helmet visibility, body preset selection, and photo mode should be framed as controlled presentation tools. They matter to comfort and roleplay, but they should be adjusted during quiet downtime rather than discovered during combat, cold travel, or a timed route.",
        ],
      },
    ],
    evidence: [
      ...coreEvidence,
      { label: "Clock and season HUD preset", path: `${mcm}/MCM/Settings/AMatterOfTime.ini`, note: "Local time/date/season HUD surface." },
      { label: "First-person interaction preset", path: `${mcm}/MCM/Settings/FirstPersonInteractions.ini`, note: "Local first-person utility interaction behavior." },
      { label: "Looting interaction preset", path: `${mcm}/MCM/Settings/LootingAnimations.ini`, note: "Local looting and harvest animation behavior." },
      { label: "Power attack preset", path: `${controller}/MCM/Settings/OCPA.ini`, note: "Local power-attack control behavior." },
      { label: "Potion hotkey preset", path: `${mcm}/MCM/Settings/OptimalPotionHotkeyMCM.ini`, note: "Local recovery hotkeys." },
      { label: "Hotkeys reminder", path: `${mcm}/Interface/hotkeysreminder_data.json`, note: "Human-readable keyboard and controller labels." },
      { label: "Helmet visibility preset", path: `${mcm}/MCM/Settings/Helmet Toggle 2.ini`, note: "Local presentation and helmet behavior." },
      { label: "Body preset control", path: `${mcm}/MCM/Settings/OBody NG.ini`, note: "Local appearance preset key." },
    ],
    verificationNotes: [
      "Confirm exact key labels in-game or through control-map translation before writing human-readable key names.",
    ],
    related: ["first-session-setup", "combat-rhythm-and-dodge-commitment", "survival-seasons-and-travel"],
  }),
  entry({
    slug: "character-creation-and-starting-choices",
    kind: "systemArticle",
    section: "progression",
    publicationStatus: "evidence-backed",
    title: "Character Creation and Starting Choices",
    strapline:
      "Race, birthsign, traits, religion, starting kit, and route are one pipeline rather than isolated flavor picks.",
    summary:
      "Authoria asks the player to build for the world they are about to enter. Race and birthsign choices interact with Requiem expectations, traits and religion add long-tail commitments, and Noxrim/Starting Choices determine what tools and risks arrive before the first recovery hub.",
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
      setting(
        "static-skill-leveling.general.iSkillPointsPerLevel",
        "Skill points per level",
        "20",
        "Every level-up gives a fixed planning budget, so the player should treat skill growth as allocation rather than passive grinding.",
      ),
      setting(
        "static-skill-leveling.general.iSkillPointCost75",
        "High-skill point cost",
        "6",
        "Late skill investment is expensive enough that spreading points casually can delay build-defining thresholds.",
      ),
    ],
    sections: [
      {
        title: "What build planning means here",
        paragraphs: [
          "A good build plan starts with a near-term route: how the character survives, earns, sleeps, eats, and avoids bad fights. Race, sign, trait, religion, kit, and first hub should be described together because the player experiences them as one practical opening package.",
          "Race and birthsign shape your baseline role, traits add tradeoffs, religion encourages a long-term identity, and starting choices decide whether the first route is supported or under-equipped.",
        ],
      },
      {
        title: "Why leveling feels deliberate",
        paragraphs: [
          "Authoria's local Experience configuration disables skill-use XP, and Static Skill Leveling provides a fixed pool of points at level-up. That means the player is not supposed to grind a weapon or crafting loop until the build solves itself. Progress comes through quests, clearing, and explicit allocation.",
          "This changes advice for new players. Instead of saying 'train the skill by using it,' the guide should ask what the next route requires: a combat threshold, a survival utility, a lock or magic solution, or better economic support.",
        ],
        bullets: [
          "Build planning is practical route insurance.",
          "Starter kits should be read as opening-route tools.",
          "Early mistakes are often missing tools, not missing levels.",
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
    publicationStatus: "evidence-backed",
    title: "Requiem Progression",
    strapline:
      "Requiem changes what counts as ready: level matters, but matchups, resistances, stamina, tools, money, and retreat matter first.",
    summary:
      "Authoria asks you to read the world before you push forward. Gear, resistances, damage type, stamina, money, food, lock access, spell access, route knowledge, and retreat options often matter before raw level does.",
    tags: ["requiem", "progression", "noxrim", "difficulty", "power curve"],
    playerExperience: [
      "The player cannot treat generic level gain as a universal safety net.",
      "Enemy type matters. Bandits, undead, animals, mages, constructs, bosses, and dragons are not just higher or lower numbers; they ask for different tools.",
      "A dungeon feeling impossible may be correct information rather than poor balance: the build may need armor, a resistance, a damage answer, a lock answer, or a safer route.",
    ],
    progressionImpact: [
      "Early character choices remain load-bearing longer than in vanilla.",
      "Economy, food, spell learning, locks, resistances, dragons, and boss encounters should all be framed as progression systems.",
      "Authoria's local setup can change advice you remember from other Requiem guides because starting choices, Requiem tweaks, survival patches, and generated outputs all shape final behavior.",
    ],
    practicalGuidance: [
      "Treat level as a readiness hint, not a permission slip.",
      "Prepare for the route you are taking: food, money, damage type, armor, resistances, lock access, healing, and an escape plan.",
      "If a dungeon feels impossible, leave and come back with better answers.",
      "Treat locks, spell learning, vendor access, standing stones, dragons, and boss bars as progression signals rather than isolated features.",
    ],
    uxTouchpoints: [
      "Requiem MCM",
      "Experience config",
      "Static Skill Leveling",
      "Difficulty settings",
      "Lock and key rules",
      "Spell learning",
      "Vendor and barter rules",
      "Boss and dragon readiness",
    ],
    evidenceDossier: [
      {
        publicLabel: "Local Requiem preset",
        internalSources: ["MCM/Settings/Requiem.ini"],
      },
      {
        publicLabel: "Noxrim starting-choice layer",
        internalSources: ["Starting Choices - Noxrim"],
      },
      {
        publicLabel: "Authoria Requiem support",
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
      setting(
        "requiem.general.bAtmosphereAllowFastTravel",
        "Requiem fast-travel allowance",
        "1",
        "The local Requiem preset itself allows fast travel, so travel restrictions and route friction should be attributed to the broader travel/survival stack when present.",
      ),
      setting(
        "requiem.general.iHoursToRespawnCell",
        "Uncleared-cell respawn time",
        "336 hours",
        "Even uncleared spaces are not quick-reset loops, supporting a world-state rather than farming interpretation.",
      ),
      setting(
        "requiem.general.bCombatNoFearAndYield",
        "Requiem fear/yield behavior",
        "1",
        "Fear and yield behavior is disabled in the local Requiem preset, so fights should be explained as commitment checks rather than morale exits.",
      ),
      setting(
        "requiem.general.bCombatNoOnHitDisarm",
        "Requiem on-hit disarm",
        "1",
        "On-hit disarm is disabled locally, so disarm pressure should not be overstated without separate local evidence.",
      ),
      setting(
        "requiem.general.iWIWaitDragon",
        "Dragon world-interaction wait",
        "12",
        "Dragon pacing is locally configured and should be verified before writing route-specific dragon timing advice.",
      ),
    ],
    sections: [
      {
        title: "Why Requiem changes planning",
        paragraphs: [
          "A Requiem character is not ready just because a quest marker is nearby. The useful question is what the route asks for: damage that works on the target, armor that prevents wounds, stamina to block or disengage, food and warmth for the road, lock access, money, and a clean way home.",
          "Authoria builds on that idea. It expects preparation, specialization, and the discipline to walk away from bad matchups instead of treating every cave as first-session content. When the world says no, the intended answer is often to change route, gear, resistances, or tools.",
        ],
      },
      {
        title: "Resistances and matchups",
        paragraphs: [
          "New players often read difficulty as level. In Authoria, read it as a matchup. Cold roads ask for warmth and recovery; mages ask what happens when armor is not enough; undead and constructs can punish the wrong damage plan; poison, disease, and traps can make a technically won fight ruin the next day.",
          "Exact thresholds need record proof or playtesting. For now, use the player-facing habit that matters most: before a route, ask what damage you can deal, what damage you can survive, and what condition would force you to leave.",
        ],
        bullets: [
          "Bring frost planning to northern and exposed roads.",
          "Bring disease, poison, or wound recovery when caves, animals, ruins, or traps are likely.",
          "Bring the right damage plan before treating undead, constructs, bosses, or dragons as normal fights.",
          "Treat resistances as route gear, not endgame trivia.",
        ],
      },
      {
        title: "What changes from vanilla assumptions",
        paragraphs: [
          "Vanilla Skyrim encourages broad wandering because scaling and skill-use leveling smooth over bad plans. Authoria should be explained almost the opposite way. The player is reading the world for danger bands, required tools, route costs, and whether a fight is worth taking now.",
          "The local preset also makes world persistence meaningful. Long respawn times mean clearing and route decisions are not disposable loops. A reliable hub, a cleared nearby mine, or a missed supply opportunity can remain relevant for a long stretch of play.",
          "Some famous Requiem pressures also need local wording. Fear/yield and on-hit disarm are disabled here, while dragon timing is configured. That means the Almanac should describe Authoria as played, not Requiem from memory.",
        ],
        bullets: [
          "Level is a readiness hint, not a universal permission slip.",
          "Gear, resistances, food, money, route knowledge, and escape routes are progression resources.",
          "Do not assume every upstream Requiem warning applies unchanged.",
          "When Authoria changes the final behavior, follow the Authoria result.",
        ],
      },
      {
        title: "Noxrim, Noxcrab support, and starting pressure",
        paragraphs: [
          "Noxrim starting choices are part of progression, not just alternate-start flavor. Starting kits, easier early locks, and opening-route support decide whether the first trip feels equipped or desperate.",
          "The active profile also carries Noxcrab survival support and Authoria Requiem/Reqtificator output, so the public guide should explain the final play behavior rather than treating Requiem, survival, magic, stealth, weapons, and starting choices as separate mod facts.",
        ],
      },
      {
        title: "Locks, keys, and spell learning",
        paragraphs: [
          "Locks are tool and build gates, not just the vanilla minigame with harsher numbers. A locked object can mean several things: bring the right skill, find the key route, come back with force, or leave the reward for later.",
          "Spell learning belongs in the same progression conversation. A magic build needs money, time, safety, study resources, and enough route discipline to avoid buying spells it cannot practically absorb yet.",
        ],
        bullets: [
          "Early locks are route information: they tell the player whether this character, this tool kit, or this timing fits the place.",
          "Lock bashing should be described as a committed option with risk and build dependence, not a universal bypass.",
          "Spell access should be written as a learning pipeline: finding, affording, studying, and surviving long enough to use the spell.",
        ],
      },
      {
        title: "Vendors, standing stones, dragons, and bosses",
        paragraphs: [
          "Vendor behavior is also progression. Prices, trade access, and social preparation can decide whether a route is ready before the first fight starts. Money is power only when you can turn it into usable supplies.",
          "Standing stones and birthsigns should be treated as campaign decisions. They are not lightweight flavor picks when you are planning armor, magic, survival, and early route pressure.",
          "Dragons and bosses need the strongest wording. A boss bar or dragon encounter is not permission to win now; it is a signal that the route has entered a readiness check where resistance, tools, terrain, followers, and retreat planning matter.",
        ],
        bullets: [
          "If a vendor cannot make the route affordable, the practical answer may be bounties, missives, safer loot, or a different hub.",
          "Standing-stone advice should connect to the build plan instead of being presented as a one-off bonus list.",
          "Dragon and boss advice should stay conservative unless the Almanac has direct Source notes for the exact route.",
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
      {
        label: "Lock and key progression support",
        path: `${profile}/modlist.txt`,
        note: "Supports local lockpicking, lock-bashing, and key-route interpretation.",
      },
      {
        label: "Spell-learning support",
        path: `${profile}/loadorder.txt`,
        note: "Supports local spell-learning guidance.",
      },
      {
        label: "Dragon and boss readiness support",
        path: `${profile}/modlist.txt`,
        note: "Supports conservative dragon and boss readiness guidance.",
      },
      ...outputEvidence,
    ],
    verificationNotes: [
      "Specific perk, race, birthsign, spell, and boss behavior needs xEdit or in-game verification before detailed advice.",
      "Lock record conditions, vendor records, dragon level records, and boss-specific stats should be checked before route-level thresholds are quoted.",
    ],
    related: ["route-readiness-and-return-rules", "combat-rhythm-and-dodge-commitment", "economy-gear-and-open-world-work"],
  }),
  entry({
    slug: "route-readiness-and-return-rules",
    kind: "systemArticle",
    section: "progression",
    publicationStatus: "evidence-backed",
    title: "Route Readiness and Return Rules",
    strapline:
      "Good early play means recoverable choices: known beds, readable maps, affordable supplies, and a plan to come back.",
    summary:
      "Before accepting a job, road, cave, bounty, or worldspace hook, ask whether the route is recoverable. The answer is not level alone; it is beds, food, warmth, travel cost, season, reward tier, map readability, follower burden, and whether the route has an obvious exit.",
    tags: ["progression", "routes", "early game", "missives", "bounties", "travel"],
    playerExperience: [
      "The player looks at a job or route and needs to decide whether it is a stable errand, a scouting trip, or a campaign commitment.",
      "A route can be unsafe even when the first enemy is manageable if the character cannot rest, warm up, sell loot, or retreat cleanly.",
      "Reward size, distance, weather, and map clarity become gameplay language rather than background details.",
    ],
    progressionImpact: [
      "Recoverable work lets new characters turn small wins into food, beds, training, and gear.",
      "Overlong routes can convert one bad fight or cold night into multi-day recovery because survival, wounds, and economy systems compound.",
      "Follower support can make a route safer in combat while making stealth, dialogue pacing, carriage use, and resource management more complex.",
    ],
    practicalGuidance: [
      "Ask where you sleep, eat, warm up, sell, and retreat before accepting distant work.",
      "Treat deliveries, gathering requests, and nearby errands as stabilization tools when the route itself is recoverable.",
      "Treat giant, dragon, remote ruin, new-land, and long-corridor hooks as readiness checks until local route evidence proves otherwise.",
      "Use hub pages to find nearby recovery loops before chasing nearby danger.",
    ],
    uxTouchpoints: [
      "Missives board",
      "Bounty rewards",
      "Paper and compass map settings",
      "Carriage destinations",
      "SunHelm/Frostfall widgets",
      "Follower controls",
    ],
    evidenceDossier: [
      {
        publicLabel: "Local task-board weighting",
        internalSources: ["MCM/Settings/Missives.ini"],
      },
      {
        publicLabel: "Local bounty payout tiers",
        internalSources: ["MCM/Settings/Bounty Hunter - Bounty Perks.ini"],
      },
      {
        publicLabel: "Map and carriage readability layer",
        internalSources: ["MapMarkerFramework.ini", "Better Carriage Destinations.ini"],
      },
    ],
    settingQuotes: [
      setting(
        "missives.general.iEasyQuestChance",
        "Easy Missives chance",
        "80",
        "The board is locally weighted toward lower-risk jobs, so early guidance can recommend deliveries and gathering requests when the route itself is recoverable.",
      ),
      setting(
        "missives.general.iVeryHardQuestChance",
        "Very hard Missives chance",
        "0",
        "Very hard jobs are not part of the local default board mix, which supports using boards as stabilization rather than ambush content.",
      ),
      setting(
        "map-marker-framework.hud.bObscuredUndiscovered",
        "Undiscovered marker HUD obscuring",
        "false",
        "Readable markers help planning, but visible direction is not the same as route safety.",
      ),
      setting(
        "sunhelm-normal.root.HungerRate",
        "Normal hunger rate",
        "7",
        "Food pressure is active enough that route length and meal access belong in early progression advice.",
      ),
      setting(
        "follower-stats.main.iScale",
        "Follower stat scale",
        "50",
        "Followers can improve route confidence, but local scaling prevents party advice from assuming full-strength follower carries.",
      ),
    ],
    sections: [
      {
        title: "The recoverability test",
        paragraphs: [
          "A good early route is not a route with no danger. It is a route where a mistake does not strand the character. The player should know the nearest bed, food source, warmth source, vendor, and return path before turning a delivery into a long walk.",
          "This is why Riverwood and Whiterun are stronger teaching hubs than remote quest hooks. They let the player test combat, selling, food, sleep, board jobs, follower management, and map reading without losing the campaign to one overextended road.",
        ],
        bullets: [
          "Stable: known road, known bed, known vendor, affordable food, familiar retreat.",
          "Scouting: unknown road, visible return path, no heavy loot commitment, enough supplies to turn around.",
          "Commitment: remote dungeon, cold corridor, boss marker, dragon risk, new-land travel, or quest state that may not release the player quickly.",
        ],
      },
      {
        title: "Reading work before accepting it",
        paragraphs: [
          "Missives and bounties should be explained as local risk signals. The board weighting makes town jobs useful for early stabilization, but the player still has to inspect distance, terrain, weather, and nearby recovery. A letter delivery can be reasonable from the right hub and poor from the wrong one.",
          "Bounty payouts should be treated as warning labels as much as rewards. Bandit work can fund early gear when the route is close and retreatable. Giant and dragon rewards should tell the player that the task belongs to a later readiness tier unless they have specific tools and a recovery plan.",
        ],
      },
      {
        title: "Return rules",
        paragraphs: [
          "Leaving is normal. If you reach cold weather underfed, see a boss bar, burn through potions before the objective, or find that the map route keeps stretching away from services, the correct Authoria answer is often to return to the hub.",
          "Followers do not erase this rule. A follower can make combat safer, but they can also add management overhead and make overconfidence more expensive. The local follower stat scale supports cautious party advice: bring help for readability and stability, not to bypass route planning.",
        ],
        bullets: [
          "Turn back when the route has spent its food, warmth, potions, or fatigue buffer before the objective.",
          "Turn back when a visible marker or reward tier points at a fight the build is not prepared to solve.",
          "Turn back when the return path is no longer safer than the forward path.",
        ],
      },
    ],
    evidence: [
      {
        label: "Missives preset",
        path: `${mcm}/MCM/Settings/Missives.ini`,
        note: "Local task-board chance and reward settings for early work interpretation.",
      },
      {
        label: "Bounty reward preset",
        path: `${mcm}/MCM/Settings/Bounty Hunter - Bounty Perks.ini`,
        note: "Local bounty payout values used as risk-tier evidence.",
      },
      {
        label: "Map marker framework preset",
        path: `${mcm}/SKSE/Plugins/MapMarkerFramework.ini`,
        note: "Local marker visibility settings for map-readability claims.",
      },
      {
        label: "Carriage destination preset",
        path: `${mcm}/MCM/Settings/Better Carriage Destinations.ini`,
        note: "Local travel anchor settings for settlement-based route guidance.",
      },
      {
        label: "SunHelm normal profile",
        path: `${mcm}/SunHelm/Config/normal.json`,
        note: "Local food and needs pressure for route-length advice.",
      },
      {
        label: "Follower stat preset",
        path: `${mcm}/MCM/Settings/Follower Stats.ini`,
        note: "Local follower scaling evidence for party-readiness guidance.",
      },
    ],
    verificationNotes: [
      "Specific board destinations, travel corridors, beds, vendors, and nearby dungeons still need in-game route auditing before the guide names exact safe loops.",
      "Bounty target records and dragon/giant encounter records should be checked before giving build-specific thresholds.",
    ],
    related: [
      "riverwood-whiterun-early-hub",
      "survival-seasons-and-travel",
      "economy-gear-and-open-world-work",
      "followers-and-party-power",
    ],
  }),
  entry({
    slug: "combat-rhythm-and-dodge-commitment",
    kind: "systemArticle",
    section: "combat",
    publicationStatus: "evidence-backed",
    title: "Combat Rhythm and Dodge Commitment",
    strapline:
      "Combat is about commitment, stamina, spacing, and knowing when the correct answer is to leave.",
    summary:
      "Combat asks for commitment. Dodge access can be gated, animations matter, wounds and stamina turn mistakes into route problems, and Requiem makes enemy selection part of combat skill.",
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
      "Ask what the fight punishes: aggression, bad spacing, poor stamina, or attrition.",
      "Retreat before victory becomes too expensive.",
      "Practice dodge, power attack, and potion recovery before the first serious fight.",
    ],
    uxTouchpoints: [
      "TK Dodge Addon",
      "True Directional Movement",
      "Wounds",
      "Precision",
      "Custom movesets",
    ],
    settingQuotes: [
      setting(
        "tk-dodge.general.fDodgeCost",
        "Dodge stamina cost",
        "10.0",
        "Dodging competes with attacks, blocks, and sprinting instead of being free defense.",
      ),
      setting(
        "tk-dodge.perk.bUsePerkLock",
        "Dodge perk lock",
        "1",
        "Dodge access is locally gated, so combat mobility is a build decision.",
      ),
      setting(
        "wounds.brokenbones.sBrokenBonesHealTime",
        "Broken bone recovery",
        "4.293264 days",
        "A severe injury can affect multiple in-game days, making retreat and recovery part of route planning.",
      ),
      setting(
        "true-directional-movement.directionalmovement.uDirectionalMovementDrawn",
        "Drawn-weapon directional movement",
        "1",
        "Movement behavior changes while armed, so combat navigation should be explained as its own skill.",
      ),
      setting(
        "optimal-potion-hotkey.hotkeys.iHealthpotionhotkey",
        "Health potion hotkey",
        "11",
        "Recovery has a configured hotkey, so combat onboarding should include potion muscle memory.",
      ),
      setting(
        "optimal-potion-hotkey.hotkeys.iStaminapotionhotkey",
        "Stamina potion hotkey",
        "12",
        "Stamina recovery is keybound locally, reinforcing stamina pressure as a control and planning problem.",
      ),
    ],
    sections: [
      {
        title: "How to read fights",
        paragraphs: [
          "A bandit route, boss room, dragon, and major quest boss should not all feel like the same kind of hard. They punish different mistakes and need different preparation.",
          "The local dodge settings make this especially important. Dodging costs stamina, sprint dodge is disabled, MCO recovery is used, and perk locking is enabled. The player should understand dodge as a committed defensive tool they build into, not a universal panic button.",
        ],
      },
      {
        title: "Attrition after the hit",
        paragraphs: [
          "Wounds changes the meaning of a successful fight. A character can survive the immediate encounter but leave with cuts, broken bones, infection risk, or enough recovery burden that the next route becomes unsafe. This is why the guide should talk about retreat, beds, supplies, and local hubs in combat articles.",
          "Armor also matters as injury mitigation, not only damage reduction. That connects combat back to economy and itemization: better gear can reduce the chance that a small mistake becomes a multi-day recovery problem.",
          "Potion hotkeys add a control-layer consequence. Health and stamina recovery are locally keybound, so combat advice should tell players to test recovery inputs before fights, not after a stamina mistake has already locked them into a bad exchange.",
        ],
        bullets: [
          "Explain whether an encounter threatens burst death, wound snowball, or resource exhaustion.",
          "Tell the player when to leave before victory becomes too expensive.",
          "Tie boss and dungeon advice to nearest recovery hubs.",
        ],
      },
      {
        title: "Camera and readability",
        paragraphs: [
          "True Directional Movement matters because camera behavior and target lock affect how readable commitment-heavy fights feel. Treat spacing, lock use, camera control, and manual retreat paths as part of combat skill.",
        ],
      },
    ],
    evidence: [
      ...coreEvidence,
      { label: "Dodge preset", path: `${mcm}/MCM/Settings/TKDodgeAddon.ini`, note: "Local dodge behavior and keybinding surface." },
      { label: "Movement preset", path: `${mcm}/MCM/Settings/TrueDirectionalMovement.ini`, note: "Camera and movement readability surface." },
      { label: "Wounds preset", path: `${mcm}/MCM/Settings/Wounds.ini`, note: "Local injury and attrition behavior surface." },
      { label: "Potion hotkey preset", path: `${mcm}/MCM/Settings/OptimalPotionHotkeyMCM.ini`, note: "Local recovery hotkeys." },
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
    publicationStatus: "evidence-backed",
    title: "Survival, Seasons, and Travel",
    strapline:
      "Travel is part of the challenge loop; winter, distance, weather, food, and map readability all change route quality.",
    summary:
      "Survival turns movement into a real decision. Food, thirst, fatigue, cold, seasons, camping, maps, and Requiem pressure all affect whether a route is recoverable.",
    tags: ["survival", "travel", "seasons", "map", "camping"],
    playerExperience: [
      "The player needs to think about food, water, fatigue, warmth, daylight, and return paths before accepting distant work.",
      "Season choice is not flavor if cold, daylight, weather, and travel burden are active.",
      "Map support helps route planning, but a visible marker does not say whether you can survive the road.",
    ],
    progressionImpact: [
      "A low-combat errand can fail before the fight starts if hunger, thirst, fatigue, cold, darkness, or wet weather has already spent the recovery buffer.",
      "Northern roads, mountain routes, and remote inns ask for survival planning as much as combat planning: food, warmth, water, bed access, and a return option.",
    ],
    practicalGuidance: [
      "Check food, water, fatigue, warmth, daylight, and bed access before the objective, not after trouble starts.",
      "Decide whether a route is a town errand, road errand, overnight risk, or campaign departure.",
      "Treat winter and northern exposure as progression pressure: the route may need gear or timing before it needs bravery.",
    ],
    uxTouchpoints: [
      "SunHelm",
      "Frostfall",
      "Campfire",
      "Seasonal settings",
      "Map markers and paper maps",
    ],
    settingQuotes: [
      setting(
        "sunhelm-normal.root.HungerRate",
        "Normal hunger rate",
        "7",
        "The baseline survival profile expects food planning during normal travel.",
      ),
      setting(
        "sunhelm-hard.root.HungerRate",
        "Hard hunger rate",
        "9",
        "Hard survival increases route cost and should be described as a different planning mode.",
      ),
      setting(
        "sunhelm-normal.root.DisableFastTravel",
        "SunHelm fast-travel disable",
        "0",
        "The normal SunHelm profile does not disable fast travel by itself, so map/travel friction should be attributed precisely.",
      ),
      setting(
        "stress-and-fear.settings.iStressRate",
        "Stress rate",
        "0",
        "Stress is not rising through this preset, so fear/stress should not be overstated as a baseline route pressure.",
      ),
    ],
    sections: [
      {
        title: "Route articles need weather logic",
        paragraphs: [
          "A region guide that ignores exposure and map readability will mislead players. The same objective can be reasonable from one hub and a poor decision from another if the player cannot rest, eat, warm up, or read the route.",
          "The local SunHelm normal profile keeps hunger, thirst, and fatigue active at equal rates. Hard settings push those rates higher. That gives the guide a concrete reason to separate baseline travel advice from hard-mode survival advice instead of treating survival as one vague pressure.",
        ],
      },
      {
        title: "Winter is a progression rule",
        paragraphs: [
          "Season choice belongs in early progression guidance because it changes how expensive distance feels. A low-level character who can solve a summer errand may still be poorly prepared for a northern or exposed winter route. The player needs to know whether a destination is workable because of enemy level, supply access, weather, or all three.",
          "Survival settings matter because they decide what travel costs. Hunger, thirst, fatigue, cold, widgets, rest, and water access form a travel loadout just like weapons and armor form a combat loadout.",
          "Local inn and camping presets make recovery less abstract. Inns can be full, while camping has configured shelter support. That means an overnight route should mention backup shelter, return plans, and whether the player can recover if the expected bed fails.",
        ],
        bullets: [
          "Mention the nearest bed, warm interior, or recovery stop on travel-heavy routes.",
          "Give a backup plan when a route assumes an inn bed.",
          "Explain whether map markers and paper maps make the route readable.",
          "Separate local roads, overnight travel, and expedition travel.",
        ],
      },
      {
        title: "Hunting and stress boundaries",
        paragraphs: [
          "Hunting can support travel, but it should not be written as free food. Local presets enable animal processing and carcass rewards, which means the player has a survival/economy loop if they can safely take the time and risk.",
          "Stress and fear are different: the local stress rate is zero, so public survival guidance should not make stress a headline pressure until another active layer proves it matters in play.",
        ],
      },
    ],
    evidence: [
      ...coreEvidence,
      { label: "SunHelm profiles", path: `${mcm}/SunHelm/Config`, note: "Local survival difficulty profile values." },
      { label: "Frostfall recorder data", path: `${mcm}/McmRecorder/KoK_Base`, note: "Captured survival and cold MCM state." },
      { label: "Map marker settings", path: `${mcm}/mapmarkers/Atlas Map Markers.json`, note: "Local map readability configuration." },
      { label: "Inn availability preset", path: `${mcm}/MCM/Settings/Inns Can Be Closed.ini`, note: "Local bed availability risk." },
      { label: "Camping expansion preset", path: `${mcm}/MCM/Settings/Camping Expansion.ini`, note: "Local camping shelter support." },
      { label: "Stress profile", path: `${mcm}/MCM/Settings/Stress and Fear.ini`, note: "Local stress-rate baseline." },
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
      setting(
        "missives.general.iEasyQuestChance",
        "Easy missive chance",
        "75",
        "Boards are weighted toward lower-risk jobs, making towns useful early stabilization hubs.",
      ),
      setting(
        "missives.general.iVeryHardQuestChance",
        "Very hard missive chance",
        "0",
        "Very hard board jobs are disabled locally, reducing accidental overcommitment from missive boards.",
      ),
      setting(
        "missives.courierquests.iEasyLetterDeliveryReward",
        "Easy delivery reward",
        "100",
        "Low-risk errands have enough cash value to matter for food, rooms, and early supplies.",
      ),
      setting(
        "simple-hunting-overhaul.carcassrewards.iSmall",
        "Small carcass reward",
        "150",
        "Hunting can contribute to early supplies, but the route risk still matters.",
      ),
      setting(
        "simple-hunting-overhaul.carcassrewards.iXXLarge",
        "Very large carcass reward",
        "750",
        "Large hunting payouts should be treated as risk-managed work, not free money.",
      ),
      setting(
        "immersive-hunting.main.iEnableProcess",
        "Animal processing enabled",
        "1",
        "Hunting takes interaction time and should be described as a loop, not instant loot.",
      ),
    ],
    sections: [
      {
        title: "From checklist to economy loop",
        paragraphs: [
          "The useful player question is not only whether an armor is craftable. It is how the player is expected to climb from vulnerable gear to adequate gear without accidentally starting a campaign-scale quest.",
          "The local Missives preset answers part of that question: easy jobs are common, very hard jobs are disabled, and delivery/gathering rewards are large enough to pay for early survival costs. That turns town boards into progression infrastructure, not filler content.",
          "Bounty presets add the other half of the loop: bandits pay substantially more than a letter delivery, while giants and dragons pay more because they belong to a different readiness tier. Read reward size as risk language.",
          "Hunting sits between survival and economy. Carcass rewards can fund early supplies, but processing takes time and exposure. Hunt where you can stop, recover, and carry the result without losing the route.",
        ],
      },
      {
        title: "Gear enters the world through play",
        paragraphs: [
          "The old guide said modded armors and weapons are not craftable and are instead bought, looted, or found in new chests. The consequence is practical: crafting is not the only route to power, and the player is expected to engage with merchants, bandits, dungeons, and local economy loops.",
          "Itemization articles should distinguish combat gear, display gear, replicas, and quest artifacts. Legacy of the Dragonborn replica nerfs are important because museum completion should not be mistaken for combat readiness unless a local exception preserves artifact properties.",
        ],
        bullets: [
          "Use deliveries, gathering requests, and nearby errands to fund food, rooms, training, and small gear upgrades.",
          "Treat bandit loot as risk-managed gear acquisition, not guaranteed early income.",
          "Treat giant and dragon bounties as readiness tests, not attractive early income.",
          "Treat hunting as route work: safe terrain and recovery matter as much as the carcass reward.",
          "Document replica/display behavior separately from combat item behavior.",
        ],
      },
    ],
    evidence: [
      ...coreEvidence,
      { label: "Trade preset", path: `${mcm}/MCM/Settings/trade & barter.ini`, note: "Local pricing preset." },
      { label: "Missives preset", path: `${mcm}/MCM/Settings/Missives.ini`, note: "Task-board configuration surface." },
      { label: "Bounty reward preset", path: `${mcm}/MCM/Settings/Bounty Hunter - Bounty Perks.ini`, note: "Local bounty payout values." },
      { label: "Hunting economy preset", path: `${mcm}/MCM/Settings/Simple Hunting Overhaul MCM Helper.ini`, note: "Local carcass reward values." },
      { label: "Hunting interaction preset", path: `${mcm}/MCM/Settings/ImmersiveHunting.ini`, note: "Local hunting interaction behavior." },
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
    publicationStatus: "evidence-backed",
    title: "Followers and Party Power",
    strapline:
      "Followers can make Requiem survivable earlier, but they also change pacing, chatter density, and management burden.",
    summary:
      "Party play in Authoria is deliberately moderated. Followers can make travel and combat safer, but they also change readability, banter density, carriage use, dialogue pacing, and how crowded a quest route feels.",
    tags: ["companions", "followers", "party", "balance"],
    playerExperience: [
      "The player can choose a harsher solo route or a party-backed route with more support and more overhead.",
      "Follower-heavy play can flatten some early danger while increasing dialogue and control burden.",
      "Choose companions for route and tone, not only popularity.",
    ],
    progressionImpact: [
      "Follower access can change what is recoverable early, but Authoria is not assuming full-strength custom follower power.",
      "Follower weakening and local balance settings are essential context for party size advice.",
      "Follower support is strongest when matched to the route: travel companions for roads, story companions for arcs, specialists for themed spaces, and combat companions for dangerous open-world work.",
    ],
    practicalGuidance: [
      "Ask whether a follower helps combat, utility, travel, story, or banter most.",
      "Keep the party small when you still need clear fights and quiet roads.",
      "Mention when a follower has major quest or new-land interactions.",
      "Warn that large parties can improve survival while making fights harder to read and quest pacing more crowded.",
      "Explain follower transport and interruption controls as quality-of-life systems, not extra power.",
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
        "Follower stats are locally scaled to 50, so party guidance should assume ARR deliberately reins in follower power.",
      ),
    ],
    sections: [
      {
        title: "Companion page template",
        paragraphs: [
          "A good companion guide helps readers choose a party strategy instead of browsing installed follower mods. Recruitment, early safety, combat role, chatter density, travel utility, party-size expectations, and quest interactions all matter.",
          "Requiem danger and custom followers can pull in opposite directions. Followers add safety, utility, and personality, but unmanaged party power can erase the intended risk curve.",
          "Authoria reins in follower strength while still allowing party play. That does not make every follower weak in every circumstance, but it does mean followers should not be treated as campaign carries.",
        ],
      },
      {
        title: "What followers change",
        paragraphs: [
          "A follower changes more than damage output. Travel can be smoother, story routes can be richer, and management overhead rises.",
          "Follower transport and interruption controls should be presented as friction reduction. They make a party easier to live with, but they do not remove the need to choose recoverable routes, manage supplies, or retreat from fights that still overmatch the character.",
        ],
        bullets: [
          "Use one companion when the goal is tone, commentary, or light safety.",
          "Use a small party when the route is dangerous enough to justify extra management.",
          "Avoid stacking several high-chatter companions before long story arcs unless the player wants a crowded campaign voice.",
        ],
      },
      {
        title: "How to choose a party",
        paragraphs: [
          "A companion is a route decision. A combat-heavy follower can open dangerous roads sooner; a story-heavy follower can make long quest arcs more vivid; a utility follower can reduce friction around locks, ranged pressure, or survival. Choose for the next ten hours, not only for favorite dialogue.",
          "Party size also changes clarity. More followers can make fights safer but noisier, pathing more fragile, and story pacing more crowded. Companion pages should state whether they are best as a solo partner, one member of a small party, or a high-banter campaign companion.",
        ],
        bullets: [
          "Call out companion interactions with Vigilant, Wyrmstooth, Sirenroot, or other major arcs when Source notes support them.",
          "State whether a follower is early-safe or midgame-oriented.",
          "Keep the public planning set focused on companions that are actually part of Authoria.",
        ],
      },
    ],
    evidence: [
      ...coreEvidence,
      { label: "Follower stats preset", path: `${mcm}/MCM/Settings/Follower Stats.ini`, note: "Local follower scaling surface." },
      { label: "Follower weakening support", path: `${profile}/modlist.txt`, note: "Supports cautious follower-power guidance." },
      { label: "Follower control support", path: `${profile}/loadorder.txt`, note: "Supports follower controls, carriage support, and dialogue-management guidance." },
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
  ].map(([slug, title, strapline]) => {
    const detail = companionDetails[slug];

    return entry({
      slug,
      kind: "companionArticle",
      section: "companions",
      title,
      strapline,
      summary:
        detail?.summary ??
        "This companion page captures the Authoria-specific questions that matter to player route planning and avoids treating the follower stack as a public catalog.",
      tags: ["companion", "follower", title.toLowerCase()],
      playerExperience:
        detail?.playerExperience ?? [
          "The player should understand recruitment friction, route usefulness, and how much attention the companion adds.",
          "The page should describe whether this follower primarily adds safety, story, utility, banter, or travel comfort.",
        ],
      progressionImpact:
        detail?.progressionImpact ?? [
          "A companion can change early encounter safety and travel confidence.",
          "Local Requiem and follower balance layers may make upstream power assumptions unreliable.",
        ],
      practicalGuidance:
        detail?.practicalGuidance ?? [
          "Verify recruitment and initial location before publishing as final.",
          "Document combat role and party-size fit.",
          "Capture cross-companion and quest arc commentary where present.",
        ],
      uxTouchpoints: detail?.uxTouchpoints ?? ["Follower controls", "Dialogue", "Party management", "Follower balance settings"],
      sections:
        detail?.sections ?? [
          {
            title: "Evidence questions",
            paragraphs: [
              "This page should be grounded in ARR evidence and in-game verification: where the companion enters play, what they change about recoverable routes, and whether they interact with large quest arcs or other major companions.",
            ],
          },
        ],
      evidence: [
        ...coreEvidence,
        { label: "Follower balance preset", path: `${mcm}/MCM/Settings/Follower Stats.ini`, note: "Shared party-power evidence." },
        ...outputEvidence,
      ],
      verificationNotes:
        detail?.verificationNotes ?? [
          "Recruitment location, starting level/stat behavior, and banter coverage still need direct verification.",
        ],
      related: ["followers-and-party-power"],
    });
  }),
  entry({
    slug: "riverwood-whiterun-early-hub",
    kind: "regionGuide",
    section: "regions",
    publicationStatus: "evidence-backed",
    title: "Riverwood and Whiterun Early Hub",
    strapline:
      "Use Riverwood and Whiterun as your first recovery loop: beds, food, vendors, Missives jobs, and roads you can learn before ambition takes over.",
    summary:
      "This is the first place to practice Authoria's rhythm. Rest before leaving, sell before you overload, buy food before luxuries, use deliveries and gathering requests to fund supplies, and treat nearby dungeons as readiness checks rather than automatic first stops.",
    tags: ["region", "early game", "whiterun", "riverwood", "recoverable route"],
    playerExperience: [
      "This corridor turns survival rules into routine: sleep, eat, sell, buy, take a delivery or gathering job, test roads, and come back before trouble compounds.",
      "A good first hub reduces confusion without pretending Requiem danger is gone.",
      "The route is useful because mistakes are more recoverable here than on remote roads or inside long quest arcs: a bad fight, missed meal, or heavy loot load can still be corrected.",
    ],
    progressionImpact: [
      "Reliable hubs let new characters build money and gear before campaign arcs.",
      "Treat nearby caves, ruins, cold roads, and large quest hooks as later choices until the character has damage, armor, resistances, supplies, and a return plan.",
      "Delivery and gathering jobs can stabilize a character; distant work can become a survival problem even when the reward looks modest.",
    ],
    practicalGuidance: [
      "Start with a bed, food, a vendor, and a known road back.",
      "Use Missives deliveries, gathering requests, nearby errands, and familiar roads before major dungeon pushes.",
      "Treat Bleak Falls-style ambition, giant work, dragon hooks, cold corridors, and remote ruins as later readiness checks.",
      "Recruit help only when it supports the route; do not use followers as permission to ignore food, rest, and retreat.",
    ],
    uxTouchpoints: ["Map markers", "Missives", "Trade", "Survival widgets"],
    evidenceDossier: [
      {
        publicLabel: "Local survival settings",
        internalSources: ["SunHelm profiles", "camping and inn settings"],
      },
      {
        publicLabel: "Local work-board weighting",
        internalSources: ["Missives settings"],
      },
      {
        publicLabel: "Local map and travel settings",
        internalSources: ["map marker settings", "carriage settings"],
      },
    ],
    sections: [
      {
        title: "Practice the recovery loop",
        paragraphs: [
          "Riverwood and Whiterun are useful because they let you practice Authoria without committing to a long absence from safety. Sell what you do not need, buy food, check bed access, inspect delivery and gathering jobs, and learn which roads you can walk without burning your whole recovery buffer.",
          "A recoverable loop is not harmless. It is a route where failure has an exit. If a fight, cold night, bad road, or missed meal goes wrong, this corridor gives you a reasonable chance to return to a bed, vendor, and food source before the mistake becomes the whole session.",
        ],
      },
      {
        title: "Board jobs fund the first week",
        paragraphs: [
          "Delivery and gathering jobs are how a new character turns the first week into food, rooms, repairs, and better equipment. Start with the Missives board when the road home is obvious: a delivery, a gathering request, a nearby errand, or a familiar road that can be abandoned cleanly.",
          "Selling loot, scouting one familiar road, or doing a town errand counts as progress because it teaches the local economy without forcing a dungeon commitment.",
          "Do not read lower-risk work as guaranteed safety. A simple job can still become a bad choice if it sends you through cold weather, darkness, hostile terrain, or a road with no useful retreat.",
        ],
        bullets: [
          "Stable: a known road, known bed, vendor access, affordable food, and a familiar retreat.",
          "Scouting: an unknown road with enough supplies to turn around before the objective.",
          "Delay: remote ruins, long cold routes, boss markers, dragon risk, new-land travel, and quest hooks that may not release you quickly.",
        ],
      },
      {
        title: "What to leave alone",
        paragraphs: [
          "The biggest early mistake is treating familiar Skyrim names as permission. A famous dungeon, visible marker, or large reward can be real content and still be wrong for the first week.",
          "Use this hub to learn the return rule: if the route spends your food, warmth, potions, fatigue, or retreat path before the objective, go back. Coming home alive with a little gold is progress.",
        ],
        bullets: [
          "Delay major dungeon pushes until the build has tools, supplies, and recovery money.",
          "Delay cold or remote corridors when you cannot name the next warm stop.",
          "Delay giant, dragon, boss, and campaign-scale hooks until route readiness is obvious.",
        ],
      },
    ],
    evidence: [
      ...coreEvidence,
      { label: "Map marker settings", path: `${mcm}/mapmarkers/Atlas Map Markers.json`, note: "Supports map-readability source notes." },
      { label: "Missives preset", path: `${mcm}/MCM/Settings/Missives.ini`, note: "Supports local work-loop source notes." },
      { label: "Carriage destination preset", path: `${mcm}/MCM/Settings/Better Carriage Destinations.ini`, note: "Supports settlement-anchor travel guidance." },
      { label: "SunHelm normal profile", path: `${mcm}/SunHelm/Config/normal.json`, note: "Supports first-week food and fatigue guidance." },
      { label: "Inn availability preset", path: `${mcm}/MCM/Settings/Inns Can Be Closed.ini`, note: "Supports backup-rest guidance." },
    ],
    verificationNotes: [
      "Specific nearby dungeon danger labels still need in-game or record-backed review before exact danger tiers are published.",
    ],
    related: ["survival-seasons-and-travel", "route-readiness-and-return-rules"],
  }),
  ...[
    ["falkreath-hub", "Falkreath Hub", "Use Falkreath as a second-step forest hub: deliveries, gathering, food, recovery, and a return plan before the woods pull you too far."],
    ["riften-ivarstead-corridor", "Riften and Ivarstead Corridor", "Stage this corridor around recovery, road legs, mountain pressure, and city hooks instead of chasing every visible marker."],
    ["solitude-hub", "Solitude Hub", "Use Solitude as a service reset, then choose one faction, museum, coast, or road commitment deliberately."],
    ["windhelm-hub", "Windhelm Hub", "Treat Windhelm as a cold-weather recovery anchor where warmth, food, fatigue, and the return leg matter before the next road."],
    ["winterhold-hub", "Winterhold Hub", "Make Winterhold a deliberate College or northern trip, with spell ambition, cold exposure, and the route south planned together."],
    ["markarth-hub", "Markarth Hub", "Use Markarth as a western base, then separate city errands from Dwemer, Forsworn, mine, cave, and terrain commitments."],
  ].map(([slug, title, strapline]) => {
    const detail = regionDetails[slug];

    return entry({
      slug,
      kind: "regionGuide",
      section: "regions",
      ...([
        "falkreath-hub",
        "riften-ivarstead-corridor",
        "solitude-hub",
        "windhelm-hub",
        "winterhold-hub",
        "markarth-hub",
      ].includes(slug)
        ? { publicationStatus: "evidence-backed" as const }
        : {}),
      title,
      strapline,
      summary:
        detail?.summary ??
        "This hub guide defines the evidence and questions needed for practical early-progression advice.",
      tags: detail?.tags ?? ["region", "hub", "early progression"],
      playerExperience:
        detail?.playerExperience ?? [
          "The player needs to know whether this hub is stabilizing, risky, remote, or campaign-adjacent.",
        ],
      progressionImpact:
        detail?.progressionImpact ?? [
          "Hub choice changes supply cost, route risk, follower value, and available low-commitment work.",
        ],
      practicalGuidance:
        detail?.practicalGuidance ?? [
          "Capture beds, vendors, food, Missives boards, carriage options, recoverable roads, and avoid-until-ready routes.",
        ],
      uxTouchpoints: detail?.uxTouchpoints ?? ["Map markers", "Survival widgets", "Missives", "Carriage/travel surfaces"],
      settingQuotes: [
        setting(
          "missives.general.iEasyQuestChance",
          "Lower-risk board-job chance",
          "75",
          "Task boards are weighted toward lower-risk jobs, so hubs can be used for low-commitment stabilization.",
        ),
        setting(
          "missives.general.iVeryHardQuestChance",
          "Very hard board-job chance",
          "0",
          "The local preset disables very hard board jobs, reducing accidental overcommitment from town boards.",
        ),
        setting(
          "map-marker-framework.hud.bObscuredUndiscovered",
          "HUD compass obscures undiscovered marker types",
          "1",
          "Road travel still asks the player to read the world instead of using the compass as a full spoiler layer.",
        ),
      ],
      sections:
        detail?.sections ?? [
          {
            title: "Evidence target",
            paragraphs: [
              "Ground this page in ARR map, survival, quest, and in-game route evidence before treating its route advice as final.",
            ],
          },
        ],
      evidence: [
        ...coreEvidence,
        { label: "Missives task-board preset", path: `${mcm}/MCM/Settings/Missives.ini`, note: "Board work difficulty and reward weights." },
        {
          label: "Map readability preset",
          path: `${mcm}/SKSE/Plugins/MapMarkerFramework.ini`,
          note: "Paper-map and compass marker visibility settings.",
        },
        {
          label: "Atlas marker visibility preset",
          path: `${mcm}/MCM/Settings/atlas map markers.ini`,
          note: "Local marker groups that affect hub and route planning.",
        },
        {
          label: "SunHelm normal profile",
          path: `${mcm}/SunHelm/Config/normal.json`,
          note: "Food, thirst, fatigue, cold, and fast-travel survival settings.",
        },
        {
          label: "Local Riften/Ivarstead route evidence",
          path: "docs/evidence/riften-ivarstead-stage1.md",
          note: "Read-only houseCARL record findings for the Stage 1 route tranche.",
        },
        {
          label: "Stage 1 route-atlas evidence",
          path: "docs/evidence/region-route-atlas-stage1.md",
          note: "Read-only houseCARL and local preset findings for the Solitude, Windhelm, Winterhold, and Markarth route tranche.",
        },
      ],
      verificationNotes: detail?.verificationNotes ?? ["Needs route walk, resupply audit, and local danger labeling."],
      related: ["survival-seasons-and-travel", "economy-gear-and-open-world-work"],
    });
  }),
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
  ].map(([slug, title, strapline]) => {
    const detail = questArcDetails[slug];

    return entry({
      slug,
      kind: "questArcGuide",
      section: "quest-arcs",
      title,
      strapline,
      summary:
        detail?.summary ??
        "This quest-arc guide frames the content as a campaign decision. It should connect entry timing, route burden, combat profile, and local patch authority.",
      tags: ["quest arc", "worldspace", title.toLowerCase()],
      playerExperience:
        detail?.playerExperience ?? [
          "The player needs to know whether this is a short detour, a self-contained region, or a major commitment.",
          "Delayed starts and map support should be explained as curation, not trivia.",
        ],
      progressionImpact:
        detail?.progressionImpact ?? [
          "Large arcs can overmatch a character if entered before the right tools, level, route knowledge, or prior quests.",
        ],
      practicalGuidance: detail?.practicalGuidance ?? [
        "Capture entry requirements and delayed-start behavior.",
        "Describe travel and map expectations.",
        "Document Requiem/local patch implications before publishing encounter advice.",
      ],
      uxTouchpoints: detail?.uxTouchpoints ?? ["Quest start", "Map support", "Boss bars", "Follower commentary", "Travel/survival surfaces"],
      sections: detail?.sections ?? [
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
        { label: "Map support layer", path: arrPaths.authoriaMapMarkers, note: "Supports navigation and worldspace map claims." },
      ],
      verificationNotes: detail?.verificationNotes ?? [
        "Exact trigger requirements should be checked against local plugin records and in-game behavior before final wording.",
      ],
      related: ["survival-seasons-and-travel", "requiem-progression"],
    });
  }),
  entry({
    slug: "preset-facts",
    kind: "presetFactReference",
    section: "settings",
    publicationStatus: "evidence-backed",
    title: "Preset Source Notes",
    strapline:
      "Local preset details that support Almanac guide claims.",
    summary:
      "This proof page keeps local preset values available without making normal guide pages read like setup files.",
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
    publicationStatus: "evidence-backed",
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

export function getPublicEntries() {
  return entries.filter(isPublicArticle).map(toPublicEntry);
}

export function getRoutableEntries() {
  return entries.filter((entry) => isPublicArticle(entry) || isProofArticle(entry));
}

export function getEntriesByKind(kind: ReferenceKind) {
  return getPublicEntries().filter((entry) => entry.kind === kind);
}

export function getEntriesBySection(section: ReferenceSection) {
  return getPublicEntries().filter((entry) => entry.section === section);
}

export function getEntry(section: ReferenceSection, slug: string) {
  const entry = getRoutableEntries().find(
    (entry) => entry.section === section && entry.slug === slug,
  );

  if (!entry) {
    return undefined;
  }

  return isPublicArticle(entry) ? toPublicEntry(entry) : entry;
}

export function getEntryBySlug(slug: string) {
  return entries.find((entry) => entry.slug === slug);
}

export function getRelatedEntries(slugs: string[]) {
  return slugs
    .map((slug) => getEntryBySlug(slug))
    .flatMap((entry) => {
      if (!entry) {
        return [];
      }

      if (isPublicArticle(entry)) {
        return [toPublicEntry(entry)];
      }

      if (isProofArticle(entry)) {
        return [entry];
      }

      return [];
    });
}

export function getSection(section: string) {
  return sectionDefinitions.find((item) => item.slug === section);
}
