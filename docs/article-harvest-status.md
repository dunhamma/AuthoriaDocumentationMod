# Article Harvest Status

This document records the current state of the article-grade ARR guide harvest.
It is a maintainer-facing sync note, not public player copy.

For the end-to-end creation lifecycle that connects playable ARR build work to
reference-site evidence and release gates, see
`docs/authoria-creation-roadmap.md`.

## Current Site Shape

The public site is organized by player experience instead of installed-mod
inventory:

- `Start Here`: first-session setup plus controls, HUD, and interaction.
- `Progression`: character creation, Requiem progression, route readiness,
  economy/gear/work.
- `Combat`: dodge commitment, stamina, wounds, recovery controls, retreat.
- `Survival`: food, fatigue, cold, seasons, maps, inns, camping, hunting.
- `Companions`: party-power overview plus priority companion pages.
- `Regions`: early hub and route guidance.
- `Quest Arcs`: campaign and worldspace readiness guidance.
- `Settings`: high-confidence local preset facts.
- `Evidence`: maintainer provenance.

The public UI must continue to avoid enabled-mod lists, MO2 separator dumps,
representative mod cards, and removed companion routes.

## Implemented Harvest Slices

- Article-grade schema and routes are in place for `systemArticle`,
  `companionArticle`, `regionGuide`, `questArcGuide`, `presetFactReference`,
  and `evidenceDossier`.
- The old gameplay guide has been converted into deeper article families rather
  than preserved as a single broad guide.
- Preset extraction covers `.ini`, `.json`, simple `.toml`, and simple XML-like
  config surfaces.
- Public settings now show all high-confidence extracted facts rather than a
  small capped subset.
- Content validation is available through `pnpm validate:content` after
  `pnpm build`.
- The final overnight slices added Requiem lock/key, spell-learning, vendor,
  standing-stone, dragon, and boss-readiness interpretation, then added a
  route-readiness article that connects system rules to practical early
  recovery decisions.

## Current Public Almanac Counts

These counts are enforced by `site/scripts/validate-content.mjs`:

- `start-here`: 2
- `progression`: 3
- `combat`: 1
- `survival`: 1
- `companions`: 1
- `regions`: 1
- `quest-arcs`: 0

Seeded companion, region, and quest-arc pages remain in the catalog as
maintainer drafts until promoted through `docs/almanac-promotion-pipeline.md`.

## Evidence Added To Articles

The guide now quotes or interprets local facts from these surfaces:

- Requiem preset and profile evidence: damage scalar, respawn timers,
  fast-travel allowance, disabled fear/yield and on-hit disarm assumptions,
  dragon timing, lock/key layers, spell-learning surfaces, vendor/barter
  surfaces, standing-stone support, and boss/dragon readiness evidence.
- Experience and Static Skill Leveling: skill-use XP, level cap, skill-point
  planning.
- Combat controls and feel: dodge cost, dodge perk lock, movement behavior,
  wounds, potion hotkeys, power-attack controls.
- Survival and travel: SunHelm profiles, inn fullness, camping shelter support,
  map/compass visibility, carriage destinations, season/time HUD.
- Economy, route readiness, and work: Trade and Barter, Missives, bounty
  payouts, hunting rewards and processing, carriage settlement anchors, map
  readability, and return-rule guidance.
- Followers: follower stat scale, follower weakening evidence, follower
  control/transport/dialogue-management surfaces.
- Onboarding and UI: dynamic activation, horse whistle, managed MCM keybinds,
  OBody, helmet visibility, photo mode, first-person interactions, looting
  animations.

## Completed Content Tracks

- Start/setup: first-session workflow and controls/HUD article.
- Character creation/progression: race/birthsign/traits/start-kit framing,
  Experience and Static Skill Leveling interpretation, Requiem progression, and
  route readiness/return-rule guidance.
- Requiem/Noxrim: local Requiem behavior and Noxrim starting pressure framed as
  ARR-final behavior instead of generic upstream behavior, including lock/key
  gates, spell-learning pressure, vendor readiness, standing-stone decisions,
  dragons, and boss bars.
- Combat: dodge commitment, stamina pressure, wounds, recovery controls, camera
  readability, retreat discipline.
- Survival/travel: seasons, food/thirst/fatigue, cold, inns, camping, maps,
  carriage settlement anchors, hunting boundaries.
- Economy/gear: board work, bounty tiers, hunting, buying/looting/crafting,
  display/replica separation.
- Companions: overview plus Inigo, Kaidan, Auri, Lucien, Remiel, Xelzaz,
  M'rissi, Thogra, Yoana. Val Serano remains excluded from public planning.
- Regions: Riverwood/Whiterun, Falkreath, Riften/Ivarstead, Solitude,
  Windhelm, Winterhold, Markarth.
- Quest arcs: Vigilant, Glenmoril, Unslaad, Dac0da, Wyrmstooth, Olenveld,
  Sirenroot, Siege at Icemoth, The Forgotten City, Saints and Seducers Extended
  Cut, Penitus Oculatus, Legacy of the Dragonborn.

## Remaining High-Value Slices

- Continue promoting the survival-first route path, starting from
  Riverwood/Whiterun and then adding route-specific danger labels as local
  evidence supports them.
- Record-level verification for specific Requiem/NoxCrab/Noxrim claims:
  perk gates, locks, spell learning, bosses, dragons, vendor behavior, and
  starting-kit item lists.
- Companion recruitment and role verification for each companion page.
- Region danger labels for specific dungeons, board destinations, and travel
  corridors.
- Quest-arc trigger verification and follower-commentary confirmation for
  Wyrmstooth, Sirenroot, Vicn arcs, and Legacy integrations.
- Artifact, replica, and display behavior for Legacy of the Dragonborn.
- A richer maintainer evidence view that exposes dossiers without making the
  public guide feel like a mod catalog.

## Last Overnight Verification

The final pre-cutoff verification pass covered:

- `pnpm lint`
- `pnpm build`
- `pnpm validate:content`
- Public leak scan for removed companion and raw mod-list framing terms.
- Browser checks for `Requiem Progression` and `Route Readiness and Return
  Rules`.

## Verification Workflow

Run these from `site/` after content changes:

```bash
pnpm lint
pnpm build
pnpm validate:content
```

Use browser spot checks for changed public pages, especially when adding new
routes, changing navigation, expanding settings visibility, or touching content
that could leak removed companion names or raw mod-list framing.
