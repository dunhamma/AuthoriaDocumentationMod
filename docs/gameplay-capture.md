# Gameplay Capture Guide

Use this guide when turning ARR evidence into player-facing documentation.

For current harvested coverage, implemented article families, and remaining
high-value slices, see `docs/article-harvest-status.md`.

## Goal

The output should help someone understand:

- what the feature or system is
- how it feels in play
- what the player must do to engage with it
- what choices are safe early, risky early, or campaign-defining
- what other mods or patches shape the final experience
- where the claims came from

The public guide should not read like a mod list. Mod and plugin names belong in
evidence, citations, or maintainer-facing notes unless the player-facing topic
itself is the named system, companion, region, or quest arc.

## Minimum capture template

For any meaningful gameplay topic, capture:

1. `Summary`
   - One paragraph describing the player-facing feature in plain language.
2. `Player experience`
   - What the player sees, does, and learns.
   - What friction, pressure, or convenience it introduces.
3. `Progression impact`
   - How it affects difficulty, economy, combat readiness, travel, or quest pacing.
4. `Practical guidance`
   - What the reader should do, avoid, delay, prepare, or verify in play.
5. `UX touchpoints`
   - Menus, HUD widgets, map markers, prompts, controller bindings, or MCM surfaces involved.
6. `Provenance`
   - Public evidence labels such as local Requiem preset, runtime preset layer, or late Authoria patch layer.
   - Internal source names can be retained for authoring without becoming the reader-facing point.
7. `Quoteable settings`
   - Concrete preset values when a local config supports the claim.
8. `Evidence`
   - Exact local files that support the writeup.
9. `Verification notes`
   - Anything that still needs xEdit, in-game verification, or upstream cross-checking.

## High-value topic types

Prioritize these for early documentation work:

- Requiem progression and difficulty expectations
- survival and travel pressure
- alternate start and early-game onboarding
- map and navigation readability
- follower-heavy play and party management
- custom quest and new-land content
- combat feel, dodge behavior, stamina pressure, and animation readability
- economy and itemization
- UI and menu burden
- Authoria-specific patch behavior
- companion-specific pages for major followers
- region or hub guides keyed to safe early progression
- dedicated quest-arc guides for Vigilant, Glenmoril, Unslaad, and adjacent large worldspaces
- preset fact references that quote local settings instead of only pointing at files

## Evidence priorities

Use evidence in this order:

1. `modlist_report_gold.csv`
2. `modlist.txt`
3. `plugins.txt`
4. `loadorder.txt`
5. local mod files inside `mods\`
6. upstream Nexus or GitHub references

If local evidence and upstream description diverge, document the local evidence first.

## Article sections

The current site organizes public reference pages into these sections:

- `Start Here`: setup, first-session flow, new-save choices, controls, difficulty, and initialization.
- `Progression`: Requiem/Noxrim interpretation, starting choices, Experience, economy, gear, and power curve.
- `Combat`: dodge, wounds, stamina, animation commitment, encounter selection, and retreat discipline.
- `Survival`: food, fatigue, cold, seasons, map readability, travel, and route planning.
- `Companions`: follower-specific pages for route usefulness, combat role, banter, party power, and local tuning.
- `Regions`: safe hubs, roads, resupply, board work, and avoid-until-ready routes.
- `Quest Arcs`: campaign-scale content, delayed starts, readiness, travel, boss profile, and local patch authority.
- `Settings`: extracted preset facts that can support article claims.
- `Evidence`: maintainer-facing provenance and extraction context.

## Public UI boundary

Avoid public sections that render:

- representative enabled mods
- MO2 separator dumps
- high-signal mod groups
- raw installed-mod highlights

Instead, translate source details into reader-facing claims, then cite the local
evidence below the article.

## Good capture examples

- "This system increases early-game travel friction by combining survival pressure, limited convenience, and map readability changes. Evidence: `MCM\\Settings\\...`, map marker settings, enabled survival patches, and late Requiem-related outputs."
- "The player is expected to manage follower power more actively here than in vanilla because follower behavior is shaped by both Requiem patches and local outfit or stat distribution layers."
- "The local Experience preset disables skill-use XP, so progression guidance should explain manual skill allocation rather than vanilla skill grinding."
- "This quest arc should be framed as a campaign commitment because local delayed-start, map, and Requiem patch evidence all point to deliberate entry timing."

## Weak capture examples

- "This is a survival mod."
- "This patch makes things balanced."
- "The UI is better."

Those statements are too vague unless they are tied to specific player effects and local evidence.
