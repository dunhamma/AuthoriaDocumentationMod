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
- `regions`: 7
- `quest-arcs`: 0

Seeded companion, region, and quest-arc pages remain in the catalog as
maintainer drafts until promoted through `docs/almanac-promotion-pipeline.md`.

## ARR Rebaseline Findings (2026-06-14)

The current Authoria source of truth is the local ARR install at
`D:\Wabbajack\modlists\ARR`, with `ModOrganizer.ini` selecting
`Authoria - Requiem Reforged - Main Profile`. The profile files
`modlist.txt`, `plugins.txt`, `loadorder.txt`, and `modlist_report_gold.csv`
all exist for that profile.

The generated maintainer snapshot lives at `docs/evidence/arr-snapshot.json`.
It currently records 3,404 enabled mods from the CSV report, 3,387 enabled
plugins, 3,449 load-order entries, 136 enabled Authoria-owned modules from
`modlist.txt`, 16 generated Authoria output modules from `modlist.txt`, and 93
Requiem-related enabled CSV rows.

Treat `modlist.txt` as the live inventory for Authoria-owned modules during this
rebaseline. The gold CSV report is useful for broad counts and topic support,
but it lags the profile: it only lists 28 enabled Authoria-owned rows and still
contains older names such as Nemesis/base Bodyslide output while the live
profile has Pandora and 3BA output.

Current ARR evidence supports the existing survival, progression, map, wounds,
dodge, Requiem, SunHelm, Experience, Static Skill Leveling, and Trade and
Barter guidance. Two local support gaps should block sharper public claims for
now: the expected `Authoria - MCM and INI Settings\mapmarkers\Atlas Map
Markers.json` path is not present, and the expected Better Carriage
Destinations MCM export is not present.

Quest/new-land and companion support is strong enough to seed the next backlog,
but not enough to promote pages without trigger and role checks. Wyrmstooth,
Sirenroot, Olenveld, Siege at Icemoth, and the Vicn chain all have local support
signals. Xelzaz is the cleanest companion-route candidate because Wyrmstooth,
Sirenroot, and Requiem support all show enabled. Auri plus Vigilant is a good
second tranche once commentary triggers are checked. Legacy remains too broad
for a quick promotion because display, replica, TCC, follower, and economy
behavior need separate verification.

The rebaseline slice itself did not change public guide counts. The first Stage
1 friend-preview tranche later promoted `riften-ivarstead-corridor`, bringing
public region pages to three. The route-atlas expansion then promoted Solitude,
Windhelm, Winterhold, and Markarth, bringing public region pages to seven.

## Stage 1 Friend Preview (Riften/Ivarstead)

The next public route tranche is `Riften and Ivarstead Corridor`. It is promoted
as `evidence-backed`, not `record-verified` or `playtested`.

Evidence used:

- houseCARL read-only evidence through the normalized ARR mirror in
  `%TEMP%\AuthoriaARR_houseCARL_mirror`.
- Riften location/cell winners showing late Lux, Riften Expansion, Requiem, and
  Authoria patch/output involvement.
- Ivarstead location/cell winners showing Thuldor's Ivarstead, Lux/Thuldor
  fixes, and Authoria location/Reqtificated winners.
- High Hrothgar, Shroud Hearth Barrow, Ratway, and Treva's Watch records as
  nearby temptation/danger anchors.
- Missives, SunHelm, MapMarkerFramework, Requiem, Trade and Barter, and
  follower-balance preset files.

Manual stop point:

- Exact route feel, dungeon danger tiers, carriage/ferry behavior, and
  weather/exposure feel still need in-game review before stronger claims.

## Stage 1 Route Atlas Expansion

The route-atlas tranche promotes four additional region pages as
`evidence-backed`, not `record-verified` or `playtested`:

- `solitude-hub`: high-service capital hub, useful for recovery, shopping,
  board work, and travel planning, with explicit warnings against stacking
  faction, museum, coast, dock, cave, and campaign hooks.
- `windhelm-hub`: cold-weather city hub, useful once reached, but framed around
  approach/exit conditions, warmth, food, fatigue, daylight, and northern or
  eastern route caution.
- `winterhold-hub`: deliberate College/northern trip, with town and College
  support framed as a reason to plan the route rather than ignore cold and
  return costs.
- `markarth-hub`: western service base, useful for resupply and board work, but
  with terrain, mine, Dwemer, Forsworn, cave, and city-hook pressure kept
  separate from basic errands.

Evidence used:

- houseCARL read-only location and cell queries with conflict trees for
  Solitude, Windhelm, Winterhold, and Markarth.
- Local Missives, SunHelm, MapMarkerFramework, Requiem, and Trade and Barter
  preset evidence.
- Live profile inventory and generated ARR snapshot from the selected ARR
  profile.
- Maintainer dossier: `docs/evidence/region-route-atlas-stage1.md`.

Public boundary:

- The pages stay spoiler-light and route-first.
- They do not recommend companions as route answers.
- They avoid quest solutions, hidden rewards, exact enemy stats, and exact
  travel-network promises.
- Route feel, board destination safety, and exact danger labels remain manual or
  deeper-record work.

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

- Add route-specific danger labels for the seven public hubs only where local
  route, dungeon, board-destination, or in-game evidence supports concrete
  recovery advice.
- Refresh or replace `modlist_report_gold.csv` before quoting CSV-only module
  names in player-facing source notes.
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

## Almanac Kickoff Lessons

- Exact public slug validation is now part of the publication gate. Update it
  when a page is promoted instead of relying on section counts alone.
- Public guide objects should be sanitized after routing. Do not allow
  publication status, raw evidence paths, internal source arrays, or
  verification notes to travel into public page props.
- Build before validating content because the validator reads `site/out`.
- Browser checks need to include section pages, not only the promoted article.
  The kickoff pass found status leakage on listing pages through serialized
  page data.
- Treat Source notes as player reassurance. Technical evidence remains
  available through proof links, but the guide path should keep the player in
  practical advice.

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
