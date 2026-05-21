# Gameplay Capture Guide

Use this guide when turning ARR evidence into player-facing documentation.

## Goal

The output should help someone understand:

- what the feature or system is
- how it feels in play
- what the player must do to engage with it
- what other mods or patches shape the final experience
- where the claims came from

## Minimum capture template

For any meaningful gameplay topic, capture:

1. `Summary`
   - One paragraph describing the player-facing feature in plain language.
2. `Player experience`
   - What the player sees, does, and learns.
   - What friction, pressure, or convenience it introduces.
3. `Progression impact`
   - How it affects difficulty, economy, combat readiness, travel, or quest pacing.
4. `UX touchpoints`
   - Menus, HUD widgets, map markers, prompts, controller bindings, or MCM surfaces involved.
5. `Implementation chain`
   - Upstream mod or mods.
   - Requiem or patch ecosystem dependencies.
   - Authoria-owned overrides, generated outputs, or local configs.
6. `Evidence`
   - Exact local files that support the writeup.
7. `Open questions`
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

## Evidence priorities

Use evidence in this order:

1. `modlist_report_gold.csv`
2. `modlist.txt`
3. `plugins.txt`
4. `loadorder.txt`
5. local mod files inside `mods\`
6. upstream Nexus or GitHub references

If local evidence and upstream description diverge, document the local evidence first.

## Good capture examples

- "This system increases early-game travel friction by combining survival pressure, limited convenience, and map readability changes. Evidence: `MCM\\Settings\\...`, map marker settings, enabled survival patches, and late Requiem-related outputs."
- "The player is expected to manage follower power more actively here than in vanilla because follower behavior is shaped by both Requiem patches and local outfit or stat distribution layers."

## Weak capture examples

- "This is a survival mod."
- "This patch makes things balanced."
- "The UI is better."

Those statements are too vague unless they are tied to specific player effects and local evidence.
