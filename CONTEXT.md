# Authoria Documentation Mod Context

## Project purpose

This repository documents the gameplay content of the Skyrim modlist install at `D:\Wabbajack\modlists\ARR`.

The goal is not to describe Skyrim mods in the abstract. The goal is to describe **Authoria as actually played**: the live interaction between Requiem, the surrounding tweak and patch ecosystem, the installed quest and worldspace mods, and the custom Authoria layer built on top of them.

This repo should prefer evidence over memory. When a claim about gameplay behavior, progression, difficulty, encounters, or content access cannot be tied back to the ARR install, treat it as unverified.

## Primary environment

- Modlist root: `D:\Wabbajack\modlists\ARR`
- Game: Skyrim Special Edition
- Mod Organizer profile currently selected in `ModOrganizer.ini`: `ARSE`
- The profile-specific files under `D:\Wabbajack\modlists\ARR\profiles\ARSE\` are the default reference point unless the work explicitly says to document a different profile.

## What counts as authoritative

Use sources in this order:

1. The ARR install itself.
2. The active MO2 profile files for `ARSE`.
3. Files inside enabled mod folders under `D:\Wabbajack\modlists\ARR\mods\`.
4. Upstream Nexus pages, GitHub repos, and release notes.

Interpretation rule:

- The ARR install is the source of truth for what the player actually has.
- Upstream pages are secondary. Use them to understand original intent, changelogs, and configuration guidance, but always check that the local ARR install still matches.
- If upstream documentation conflicts with the local install, document the local install and note the divergence.

## Core evidence files

Start with these before making claims:

- `D:\Wabbajack\modlists\ARR\ModOrganizer.ini`
  - Confirms the selected profile and toolchain.
- `D:\Wabbajack\modlists\ARR\profiles\ARSE\modlist.txt`
  - The enabled and disabled MO2 mod order.
- `D:\Wabbajack\modlists\ARR\profiles\ARSE\plugins.txt`
  - The enabled plugin set.
- `D:\Wabbajack\modlists\ARR\profiles\ARSE\loadorder.txt`
  - The plugin load order.
- `D:\Wabbajack\modlists\ARR\profiles\ARSE\modlist_report_gold.csv`
  - The best single inventory file for versioning, priorities, custom-mod status, and plugin hashes.

Use `modlist_report_gold.csv` when you need to answer questions like:

- Is this mod enabled?
- Where does it sit in MO2 priority?
- Is it treated as a custom/local mod?
- Which plugin files are attached to it?

Use `modlist.txt` when you need to see separator structure and user-facing MO2 grouping. That file exposes how the modlist is mentally organized, not just what is present.

## Documentation stance

This project documents **player-facing gameplay content**, not just assets or file presence.

Good documentation questions:

- What quests, systems, encounters, followers, overhauls, or progression rules are in the actual build?
- Which of those are upstream, and which are modified by Requiem, NoxCrab-adjacent tweak mods, or Authoria custom patches?
- Which generated outputs or local patches are likely to override upstream behavior?
- Which gameplay claims can be supported by a plugin, ini, distribution config, or output file in ARR?

Weak documentation questions:

- What does the Nexus description say, without checking whether ARR actually uses that version or config?
- What does a mod usually do, if the local build may have patched or replaced that behavior?

## Gameplay coverage standard

This repo should pull a **rich** picture of gameplay, not just a dependency graph.

When documenting a system, questline, region, follower setup, or overhaul, try to answer:

- What does the player actually notice in moment-to-moment play?
- What does this change about difficulty, pacing, clarity, friction, or reward?
- What are the prerequisites, dependencies, and progression gates?
- Which mods introduce the feature, and which local patches or outputs finalize it?
- What does the player need to learn through menus, MCMs, HUD widgets, map markers, prompts, or controller bindings?
- Where can the claim be verified in ARR?

The standard is not "list the mod." The standard is "explain the player experience and support it with evidence."

## Player-experience categories

Future documentation should try to cover gameplay and UX through these lenses:

- `onboarding`: alternate start, opening flow, tutorial burden, first-session clarity
- `progression`: leveling, perks, economy, crafting access, power curve, skill gain expectations
- `combat`: lethality, stamina and magicka pressure, dodging, animation readability, enemy scaling, boss design
- `survival`: needs, camping, travel pressure, food, weather exposure, save pressure
- `exploration`: map usability, marker behavior, worldspace readability, traversal friction, new lands
- `questing`: entry conditions, branching, consequences, quest cadence, new dialogue-heavy content
- `followers`: recruitment friction, party power, follower UI, follower-specific compatibility layers
- `inventory and menus`: menu load, item discovery, sorting, reading burden, hotkey flow, controller ergonomics
- `immersion and presentation`: HUD style, soundscape, pacing, animation tone, visual readability
- `modlist maintenance UX`: what requires reruns, generated outputs, or post-install configuration to preserve intended behavior

Not every document needs every category. But this is the checklist for "rich enough."

## Domain model

Use these terms consistently.

- `Authoria Almanac`: the public player-facing guide experience for Authoria.
  It is written for players who know vanilla Skyrim but are new to Requiem,
  Noxrim, and this modlist's local tuning.
- `ARR install`: the local modlist instance at `D:\Wabbajack\modlists\ARR`.
- `profile`: an MO2 profile; by default this means `ARSE`.
- `mod`: an MO2 mod entry from `modlist.txt` or `modlist_report_gold.csv`.
- `plugin`: a `.esm`, `.esp`, or `.esl` participating in gameplay records and load order.
- `upstream mod`: the original mod as published by its author on Nexus, GitHub, or another source.
- `Noxrim`: the specific NoxCrab mod family present in the Authoria build. Do
  not use this as a broad label for every Requiem-adjacent, survival,
  progression, economy, or local tuning effect.
- `Authoria mod`: a local/custom ARR mod whose name starts with `Authoria` or `Auhoria`, or another clearly project-owned output.
- `generated output`: content produced by tools such as xEdit, Synthesis, Reqtificator Lite, DynDOLOD, TexGen, xLODGen, Nemesis, or CK.
- `source of truth`: the local ARR files that determine current behavior.
- `authoritative reference`: a claim backed by the local install, with upstream used only as secondary confirmation.
- `topic cluster`: a reader-facing grouping of related mods and evidence surfaces derived from the ARR install to answer broad gameplay questions before a page reaches plugin-level detail.

Avoid collapsing `mod` and `plugin` into the same word. Many questions in this workspace depend on the difference.

## Current gameplay stack

The active Authoria build is not a simple upstream mod collection. It is a layered load order with at least four important gameplay strata:

1. Base Skyrim + Creation Club + fixes.
2. Large-scale content and systems mods, including Requiem-centered gameplay changes.
3. Patch ecosystems around Requiem, survival, magic, followers, new lands, and quest content.
4. Authoria-owned customization and generated outputs that finalize actual in-game behavior.

The modlist evidence already shows:

- Requiem is a major organizing layer.
- Requiem-adjacent patch collections and sub-overhauls are extensive.
- The live build includes custom Authoria outputs near the end of the load order, which means they are likely decisive in conflicts.

## Authoria-owned implementation surfaces

When documentation needs to explain "what Authoria changed," inspect these first:

- `D:\Wabbajack\modlists\ARR\mods\Authoria - xEdit Output`
  - Local gameplay plugins and conflict-resolution patches such as `Authoria - Requiem Master Patch.esp`, `Authoria - Master Patch.esp`, `Authoria - AP Master Patch.esp`, `Authoria - Glenmoril Requiem Patch.esp`, `Authoria - Midnight Sun Requiem Patch.esp`, landscape tweaks, navmesh patches, and other late-load overrides.
- `D:\Wabbajack\modlists\ARR\mods\Authoria - Synthesis Output`
  - Generated plugins such as `Authoria - Synthesis Gameplay.esp`, `Authoria - Synthesis Worldspace.esp`, and `Authoria - Reqtificator Lite Output.esp`.
- `D:\Wabbajack\modlists\ARR\mods\Authoria - RFTI Output`
  - Contains `Requiem for the Indifferent.esp`, which is a key finalization artifact for Requiem-style load orders.
- `D:\Wabbajack\modlists\ARR\mods\Authoria - NPC Merge`
  - Contains `Authoria - NPC Merge.esp`.
- `D:\Wabbajack\modlists\ARR\mods\Authoria - CK Output`
  - Creation Kit generated output; inspect when behavior seems authored rather than patched.
- `D:\Wabbajack\modlists\ARR\mods\Authoria - MCM and INI Settings`
  - The runtime configuration surface for many systems. Includes `MCM\Settings\Requiem.ini`, `trade & barter.ini`, `TKDodgeAddon.ini`, `Wounds.ini`, `TrueDirectionalMovement.ini`, SunHelm and Frostfall-related MCM recorder data, control maps, widget settings, and other gameplay-shaping config.
- `D:\Wabbajack\modlists\ARR\mods\Authoria - Modded Outfit Distribution`
  - SPID and SkyPatcher-style outfit distribution plus `Authoria - Haberdashery.esp`.
- `D:\Wabbajack\modlists\ARR\mods\Authoria - Custom Movesets`
  - Animation and combat presentation customizations through Open Animation Replacer content and related assets.
- `D:\Wabbajack\modlists\ARR\mods\Authoria - Custom Patches - Meshes and Scripts`
  - Late custom assets and compatibility files that may not be obvious from plugin lists alone.

Also treat seasonal and output mods as live behavior, not just build artifacts:

- `Auhoria - Seasons Patches`
- `Auhoria - Seasons Empty INIs`
- `Authoria - PG Output`
- `Authoria - Grass Cache - *`
- `Authoria - xLodGen Output`
- `Authoria - TexGen Output`
- `Authoria - Dyndolod Output`

These can materially change worldspace presentation, map readability, seasonal state, and landscape interpretation.

## User-experience evidence surfaces

If the question is "what does the player see, touch, configure, or feel," inspect these first:

- `D:\Wabbajack\modlists\ARR\mods\Authoria - MCM and INI Settings`
  - MCM defaults, keybinds, UI settings, control maps, recorder presets, map marker settings, and gameplay toggles.
- `D:\Wabbajack\modlists\ARR\mods\Authoria - UI Positioning`
  - Layout and presentation overrides if present.
- `D:\Wabbajack\modlists\ARR\mods\Authoria - Controller Configs`
  - Controller-specific experience if enabled.
- `D:\Wabbajack\modlists\ARR\mods\Authoria - FMWF Map Marker Settings`
  - Map readability and world navigation shaping.
- `D:\Wabbajack\modlists\ARR\profiles\ARSE\Skyrim.ini`
- `D:\Wabbajack\modlists\ARR\profiles\ARSE\SkyrimPrefs.ini`
- `D:\Wabbajack\modlists\ARR\profiles\ARSE\skyrimcustom.ini`
  - Profile-level user experience and runtime defaults.

When a doc claims a system is "comfortable," "harsh," "confusing," "streamlined," or "high-friction," try to back that up with one of these local surfaces, not only a subjective summary.

## Requiem and tweak interpretation rules

Assume Requiem changes baseline expectations for:

- encounter difficulty
- leveling and progression
- gear value and acquisition
- spell and stamina economy
- survival pressure
- NPC strength and role definition

Do not write documentation as if vanilla Skyrim assumptions still apply.

The user has also identified NoxCrab tweak mods and related customizations as a major interpretation problem. That means:

- look for local configs and patches before relying on upstream summaries
- expect multiple overlapping tweak layers
- document the final observed rule where possible, not only the mod that introduced it

## Generated-output bias

Late output mods are likely to be more authoritative than early upstream descriptions.

Examples:

- `Authoria - xEdit Output`
- `Authoria - Synthesis Output`
- `Authoria - RFTI Output`
- `Authoria - NPC Merge`
- `Authoria - CK Output`

If an upstream mod page says one thing but a late Authoria plugin changes the records, the documentation should describe the late Authoria result.

## Evidence discipline

When writing repo docs, prefer statements like:

- "The `ARSE` profile enables `Authoria - Requiem Master Patch.esp` through `Authoria - xEdit Output`."
- "The local MCM preset for Requiem lives in `Authoria - MCM and INI Settings\\MCM\\Settings\\Requiem.ini`."
- "The outfit distribution layer uses `_DISTR.ini` files and SkyPatcher configs inside `Authoria - Modded Outfit Distribution`."

Avoid statements like:

- "This mod probably works like the Nexus page says."
- "Requiem usually does X."

Prefer claims that connect a user experience to both source and effect:

- "The player-facing map experience is shaped by `Authoria - FMWF Map Marker Settings` plus paper map mods enabled near the top of `modlist.txt`."
- "Requiem progression expectations are further constrained by local MCM presets and late Authoria patch outputs."
- "The combat feel is not only from Requiem; it is also affected by `Authoria - Custom Movesets`, dodge settings, and late xEdit/Synthesis outputs."

When using upstream sources, call them out as upstream and confirm whether ARR still reflects them.

## First places to inspect by question type

- Mod is present or absent:
  - `modlist_report_gold.csv`, then `modlist.txt`
- Plugin is enabled or load-order relevant:
  - `plugins.txt`, then `loadorder.txt`
- A gameplay behavior looks custom:
  - `Authoria - xEdit Output`, `Authoria - Synthesis Output`, `Authoria - CK Output`, `Authoria - MCM and INI Settings`
- NPC stats, faction strength, or new-NPC compatibility under Requiem:
  - `A. Requiem - Auto NPC Patcher - Main File`, `Authoria - RFTI Output`, `Authoria - xEdit Output`
- Outfit or appearance distribution:
  - `Authoria - Modded Outfit Distribution`, relevant `_DISTR.ini`, SkyPatcher configs
- Combat animation or moveset behavior:
  - `Authoria - Custom Movesets`
- Seasonal, landscape, or worldspace presentation:
  - seasonal mods, grass cache outputs, xLODGen, TexGen, DynDOLOD, and relevant worldspace patches
- In-game UX, readability, or control burden:
  - `Authoria - MCM and INI Settings`, profile ini files, UI mods, controller configs, map marker settings

## Non-goals

This context file is not a complete mod catalog and not a promise that every upstream mod has already been audited.

Its job is to keep future work honest:

- start from ARR
- assume the active profile matters
- distinguish mods from plugins
- treat Authoria outputs as high-priority evidence
- use upstream references as support, not as the primary truth
