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
      "general.bCombatNoDeathHandling":
        "Requiem death handling is disabled locally, so defeat/recovery behavior should be attributed to the broader ARR stack.",
      "general.bCombatNoFearAndYield":
        "Fear and yield behavior is disabled in the local Requiem preset, supporting fight-to-commitment guidance.",
      "general.bCombatNoOnHitDisarm":
        "On-hit disarm is disabled locally, so disarm advice should not assume that specific Requiem pressure is active.",
      "general.iWIWaitDragon":
        "Dragon world interaction timing is locally configured and should be verified before route-specific dragon warnings.",
      "general.fAtmosphereKillmoveHealthThreshold":
        "Killmove threshold is low, so finishing-move atmosphere should not be confused with broad combat leniency.",
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
    interpretations: {
      "general.iSkillPointsPerLevel":
        "Level-up planning is explicit because the player receives a fixed pool of skill points each level.",
      "general.iSkillPointCost25":
        "Raising a skill past early thresholds has a defined point cost, so broad skill dabbling has an opportunity cost.",
      "general.iSkillPointCost75":
        "High-skill investment is materially more expensive, reinforcing build planning.",
    },
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
        "Follower stats are locally scaled to 50, so party guidance should assume ARR deliberately reins in follower power.",
    },
  },
  {
    sourceId: "missives",
    publicLabel: "Missives task-board preset",
    path: arrPaths.mcmSetting("Missives.ini"),
    format: "ini",
    interpretations: {
      "general.iEasyQuestChance":
        "Task boards are weighted toward easy work, which supports using towns as early stabilization hubs.",
      "general.iHardQuestChance":
        "Hard jobs exist but are a minority, so the player can usually fish for safer work.",
      "general.iVeryHardQuestChance":
        "Very hard work is disabled in the local preset, reducing accidental early overcommitment from boards.",
      "courierquests.iEasyLetterDeliveryReward":
        "Low-risk delivery jobs have concrete early-game cash value.",
      "gatheringquests.iEasyIngredientGatheringReward":
        "Gathering work can pay enough to matter for food, rooms, and small purchases.",
    },
  },
  {
    sourceId: "bounty-hunter",
    publicLabel: "Bounty reward preset",
    path: arrPaths.mcmSetting("Bounty Hunter - Bounty Perks.ini"),
    format: "ini",
    interpretations: {
      "main.fBanditBountyReward":
        "Bandit bounties have enough local cash value to matter, but they still require combat readiness.",
      "main.fForswornBountyReward":
        "Forsworn bounty pay matches bandit pay locally, so risk should be judged by enemy profile and route rather than reward size alone.",
      "main.fGiantBountyReward":
        "Giant bounties pay more because they are serious combat commitments, not early stabilization work.",
      "main.fDragonBountyReward":
        "Dragon bounties are high-value campaign work and should not be treated like ordinary board errands.",
    },
  },
  {
    sourceId: "dynamic-activation-key",
    publicLabel: "Activation hotkey preset",
    path: arrPaths.mcmSetting("Dynamic Activation Key - MCM.ini"),
    format: "ini",
    interpretations: {
      "general.iHotkey":
        "A dedicated activation hotkey is configured, so first-session setup should include interaction/keybind review.",
      "addons.bFollower":
        "Follower interaction support is enabled, making party management part of the interaction surface.",
      "addons.bTrade":
        "Trade interaction support is enabled, reinforcing that economy and interaction keys belong in onboarding.",
      "addons.bTrain":
        "Training interaction support is enabled, which matters in a build where planning and allocation are central.",
    },
  },
  {
    sourceId: "horse-whistle",
    publicLabel: "Horse whistle preset",
    path: arrPaths.mcmSetting("Horse Whistle Key.ini"),
    format: "ini",
    interpretations: {
      "main.iWhistleHotkey":
        "A horse whistle key is configured, so travel onboarding should include mount recovery controls.",
      "main.bHornFreeMovement":
        "Horse whistle use allows free movement while using the horn, reducing travel friction once mounted play is relevant.",
      "main.iHorseConfidence":
        "Horse confidence is locally configured and should be checked before making mounted-combat safety claims.",
    },
  },
  {
    sourceId: "camping-expansion",
    publicLabel: "Camping expansion preset",
    path: arrPaths.mcmSetting("Camping Expansion.ini"),
    format: "ini",
    interpretations: {
      "beta.iShelterAsset":
        "Camping has a configured shelter asset, so travel articles can treat camp setup as part of route planning.",
    },
  },
  {
    sourceId: "inns-can-be-closed",
    publicLabel: "Inn availability preset",
    path: arrPaths.mcmSetting("Inns Can Be Closed.ini"),
    format: "ini",
    interpretations: {
      "general.iFullChance":
        "Inns can be full locally, so bed access should be planned instead of assumed on every route.",
      "general.bUseNotifications":
        "Inn availability uses notifications locally, so the player can receive lightweight feedback instead of modal interruptions.",
    },
  },
  {
    sourceId: "simple-hunting-overhaul",
    publicLabel: "Hunting economy preset",
    path: arrPaths.mcmSetting("Simple Hunting Overhaul MCM Helper.ini"),
    format: "ini",
    interpretations: {
      "general.iLootingTheAnimal":
        "Animal looting is active, making hunting a real survival/economy loop rather than scenery.",
      "carcassrewards.iSmall":
        "Small carcasses have a concrete reward floor, so hunting can support early supplies when route risk is controlled.",
      "carcassrewards.iXXLarge":
        "Very large carcasses have high value, but the route and combat risk still need to be judged locally.",
    },
  },
  {
    sourceId: "immersive-hunting",
    publicLabel: "Hunting interaction preset",
    path: arrPaths.mcmSetting("ImmersiveHunting.ini"),
    format: "ini",
    interpretations: {
      "main.iEnableProcess":
        "Animal processing is enabled, so hunting takes interaction time rather than becoming instant loot.",
      "main.iForceThirdPerson":
        "Hunting interactions force third person locally, which affects presentation and pacing.",
      "main.iEnableQuickLoot":
        "Quick-loot support remains enabled, so hunting friction is moderated rather than purely slow.",
    },
  },
  {
    sourceId: "stress-and-fear",
    publicLabel: "Stress profile",
    path: arrPaths.mcmSetting("Stress and Fear.ini"),
    format: "ini",
    interpretations: {
      "settings.iStressRate":
        "Stress does not currently rise through this preset, so fear/stress should not be overstated as a baseline route pressure.",
      "settings.sCurrentStress":
        "The stored stress baseline is zero, making this a verification target rather than a primary public survival claim.",
    },
  },
  {
    sourceId: "optimal-potion-hotkey",
    publicLabel: "Potion hotkey preset",
    path: arrPaths.mcmSetting("OptimalPotionHotkeyMCM.ini"),
    format: "ini",
    interpretations: {
      "hotkeys.iHealthpotionhotkey":
        "Health recovery has a configured hotkey, so combat onboarding should include potion muscle memory.",
      "hotkeys.iStaminapotionhotkey":
        "Stamina recovery has a configured hotkey, supporting stamina-pressure combat guidance.",
      "hotkeys.iMagickapotionhotkey":
        "Magicka recovery has a configured hotkey, making caster recovery part of control setup.",
    },
  },
  {
    sourceId: "tk-dodge",
    publicLabel: "Dodge preset",
    path: arrPaths.mcmSetting("TKDodgeAddon.ini"),
    format: "ini",
    interpretations: {
      "general.fDodgeCost":
        "Dodging has a local stamina cost, so movement defense competes with attacks, blocks, and sprinting.",
      "general.bEnableSprintDodge":
        "Sprint dodge is disabled, making dodging a committed defensive action rather than a sprint extension.",
      "general.bUseMCORecovery":
        "Dodge behavior is tied to MCO recovery, reinforcing animation commitment.",
      "perk.bUsePerkLock":
        "Dodge access is locally perk-gated, so build planning affects combat mobility.",
    },
  },
  {
    sourceId: "true-directional-movement",
    publicLabel: "Movement readability preset",
    path: arrPaths.mcmSetting("TrueDirectionalMovement.ini"),
    format: "ini",
    interpretations: {
      "targetlock.fTargetLockDistance":
        "Target lock has a long local range, supporting deliberate camera and spacing management.",
      "directionalmovement.uDirectionalMovementDrawn":
        "Directional movement is active with weapons drawn, so combat navigation differs from vanilla movement.",
      "directionalmovement.uAdjustCameraYawDuringMovement":
        "Camera yaw is not auto-adjusted during movement, preserving manual camera control in fights.",
    },
  },
  {
    sourceId: "wounds",
    publicLabel: "Wounds preset",
    path: arrPaths.mcmSetting("Wounds.ini"),
    format: "ini",
    interpretations: {
      "globaloptions.iBaseInjuryChance":
        "Injuries are possible but not guaranteed on every hit, making attrition intermittent and serious.",
      "globaloptions.iBaseInfectionChance":
        "Infection is part of the injury risk model, so post-fight recovery can matter.",
      "globaloptions.iArmorOffset":
        "Armor contributes to injury mitigation, making gear quality part of attrition management.",
      "brokenbones.sBrokenBonesHealTime":
        "Severe injuries can last multiple in-game days, so a bad fight can change route planning.",
      "cuts.iCutsChance":
        "Cuts are the most common configured wound type and can turn small fights into recovery problems.",
    },
  },
  {
    sourceId: "sunhelm-normal",
    publicLabel: "SunHelm normal survival profile",
    path: `${arrPaths.sunhelmConfigDir}/normal.json`,
    format: "json",
    interpretations: {
      "root.HungerRate":
        "Normal hunger pressure is active and should be part of early route planning.",
      "root.ThirstRate":
        "Normal thirst pressure is active, making water access and town loops relevant.",
      "root.FatigueRate":
        "Normal fatigue pressure is active, so beds and rest cadence affect travel.",
      "root.ColdRate":
        "Cold pressure is enabled through the profile even when exact weather severity needs in-game context.",
      "root.DisableFastTravel":
        "Fast travel is not disabled by this SunHelm profile, so any fast-travel restriction must come from another layer.",
    },
  },
  {
    sourceId: "sunhelm-hard",
    publicLabel: "SunHelm hard survival profile",
    path: `${arrPaths.sunhelmConfigDir}/Hard.json`,
    format: "json",
    interpretations: {
      "root.HungerRate":
        "Hard profile hunger rises faster than normal, increasing the cost of long routes.",
      "root.ThirstRate":
        "Hard profile thirst rises faster than normal, making water planning more important.",
      "root.FatigueRate":
        "Hard profile fatigue rises faster than normal, making rest access a stronger route constraint.",
    },
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
    sourceId: "map-marker-framework",
    publicLabel: "Map readability preset",
    path: `${arrPaths.authoriaMcmIniSettings}/SKSE/Plugins/MapMarkerFramework.ini`,
    format: "ini",
    interpretations: {
      "map.fMarkerScale":
        "Map markers are locally enlarged, making the paper-map layer more readable for route planning.",
      "map.bObscuredUndiscovered":
        "Undiscovered marker types remain visible on the map, so the paper map can still guide broad route decisions.",
      "hud.bObscuredUndiscovered":
        "Undiscovered marker types are obscured on the HUD compass, so road travel still asks the player to read the world.",
    },
  },
  {
    sourceId: "atlas-map-markers",
    publicLabel: "Atlas marker visibility preset",
    path: arrPaths.mcmSetting("atlas map markers.ini"),
    format: "ini",
    interpretations: {
      "atlasmapmarkers.iATLASGroupImportantTownGV":
        "Important town markers are enabled, supporting hub-first route planning.",
      "atlasmapmarkers.iATLASGroupFarmGV":
        "Farm markers are enabled, making food, beds, and low-risk local routes easier to plan.",
      "atlasmapmarkers.iATLASGroupMineGV":
        "Mine markers are enabled, which can help economy planning but also points toward dangerous early spaces.",
    },
  },
  {
    sourceId: "better-carriage-destinations",
    publicLabel: "Carriage destination preset",
    path: arrPaths.mcmSetting("Better Carriage Destinations.ini"),
    format: "ini",
    interpretations: {
      "main.bOnlySettlement":
        "Carriage destination guidance should treat settlements as the intended safe travel anchors.",
    },
  },
  {
    sourceId: "control-map",
    publicLabel: "Control map",
    path: `${arrPaths.authoriaMcmIniSettings}/Root/ControlMap_Custom.txt`,
    format: "ini",
  },
  {
    sourceId: "mcm-keybinds",
    publicLabel: "MCM keybind preset",
    path: arrPaths.mcmSetting("keybinds.json"),
    format: "json",
    interpretations: {
      "root.version":
        "The keybind export has a local version marker, so keybind advice should assume a managed preset rather than defaults.",
      "keybinds.0.keycode":
        "A managed hotkey exists in the local keybind export and should be checked during first-session setup.",
      "keybinds.0.modName":
        "The exported managed hotkey belongs to the helmet toggle surface, which affects visibility and presentation rather than combat power.",
    },
  },
  {
    sourceId: "a-matter-of-time",
    publicLabel: "Clock and season HUD preset",
    path: arrPaths.mcmSetting("AMatterOfTime.ini"),
    format: "ini",
    interpretations: {
      "settings.bIGClockShown":
        "The in-game clock is shown, so time pressure is meant to be visible during travel.",
      "settings.bIGDateShown":
        "The in-game date is shown, supporting season-aware route planning.",
      "settings.bSymbol2ShowSeasons":
        "Season display is active, reinforcing that seasonal state belongs in ordinary navigation.",
      "settings.bSymbol2ShowMoonPhases":
        "Moon phase display is active, giving night-state information a visible HUD surface.",
    },
  },
  {
    sourceId: "helmet-toggle",
    publicLabel: "Helmet visibility preset",
    path: arrPaths.mcmSetting("Helmet Toggle 2.ini"),
    format: "ini",
    interpretations: {
      "main.iEnableHotkey":
        "Helmet visibility has hotkey support, so presentation controls belong in onboarding.",
      "main.iEnableCombat":
        "Combat-aware helmet behavior is active, so visual presentation may change during fights.",
      "main.iEnableColdRegion":
        "Cold-region helmet behavior is active, connecting presentation controls to survival context.",
      "main.iEnableFollowers":
        "Follower helmet behavior is active, so party appearance can be affected by the same visibility layer.",
    },
  },
  {
    sourceId: "first-person-interactions",
    publicLabel: "First-person interaction preset",
    path: arrPaths.mcmSetting("FirstPersonInteractions.ini"),
    format: "ini",
    interpretations: {
      "main.iDisableWeaponsDrawn":
        "First-person interactions are disabled with weapons drawn, reinforcing the need to sheathe before some utility actions.",
      "main.iEnableHarvest":
        "First-person harvest interactions are enabled, making gathering part of the visible interaction loop.",
    },
  },
  {
    sourceId: "looting-animations",
    publicLabel: "Looting interaction preset",
    path: arrPaths.mcmSetting("LootingAnimations.ini"),
    format: "ini",
    interpretations: {
      "main.iEnableHarvest":
        "Harvest animations are enabled, so gathering has presentation and timing friction.",
      "main.iEnableContainer":
        "Container looting animations are enabled, making looting part of the interaction pacing.",
      "main.iAutoEquipTorch":
        "Automatic torch equip is disabled, so night/interior visibility remains a player responsibility.",
    },
  },
  {
    sourceId: "obody",
    publicLabel: "Body preset control",
    path: arrPaths.mcmSetting("OBody NG.ini"),
    format: "ini",
    interpretations: {
      "settings.iPresetListKey":
        "The body preset list has a configured key, so appearance customization is a controlled UI action rather than passive background behavior.",
    },
  },
  {
    sourceId: "photo-mode",
    publicLabel: "Photo mode preset",
    path: arrPaths.mcmSetting("PhotoMode.ini"),
    format: "ini",
    interpretations: {
      "settings.bFreezeTimeOnStart":
        "Photo mode freezes time on start, so it should be described as presentation tooling rather than gameplay time pressure.",
      "controls.iPanCameraKey":
        "Photo mode has a configured camera-pan key, making it part of the broader control review.",
    },
  },
  {
    sourceId: "ocpa",
    publicLabel: "Power attack control preset",
    path: `${arrPaths.authoriaControllerConfigs}/MCM/Settings/OCPA.ini`,
    format: "ini",
    interpretations: {
      "general.iKeycode":
        "Power attack has a configured key, so combat onboarding should include power-attack muscle memory.",
      "general.bAllowZeroStamina":
        "Zero-stamina power attacks are not allowed, reinforcing stamina as a hard combat constraint.",
      "mco.bNotifyAttackWindow":
        "Attack-window notifications are disabled, so players must learn timing from animation feel rather than popups.",
    },
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
