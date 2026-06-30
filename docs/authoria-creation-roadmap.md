# Authoria Creation Roadmap

This document is the maintainer-facing architecture for creating Authoria end to
end. It connects the playable ARR/Authoria build to the static reference site
that explains and verifies the build.

The repository already owns the reference product. The live playable product is
the ARR install at `D:\Wabbajack\modlists\ARR`, with the profile selected in
`ModOrganizer.ini` treated as the default source of truth. As of the 2026-06-14
rebaseline that profile is `Authoria - Requiem Reforged - Main Profile`.

## Product Model

Authoria has two linked products:

- **Playable product:** the ARR/Authoria modlist, active MO2 profile, plugins,
  runtime presets, custom patches, and generated outputs.
- **Reference product:** the static Next.js guide that turns local evidence into
  article-grade player guidance.

Every meaningful feature, patch, or content slice should move through the same
creation path:

1. **Intent:** define the player-facing goal and classify the work as upstream
   selection, local patching, generated output, runtime preset, documentation
   only, or mixed.
2. **Playable build work:** make the MO2/profile, plugin, preset, patch, or
   generated-output change in the owning Authoria output module.
3. **Evidence capture:** attach the local files, plugin/config surfaces, keys,
   FormIDs, or verification notes that support the claim.
4. **Documentation update:** update or add article-grade guidance without
   exposing raw mod-list inventory as the public reading path.
5. **Release note:** record what changed, which outputs were regenerated, which
   checks passed, and what still needs record or in-game verification.

The canonical gates are: design intent, MO2/profile change, generated outputs,
local verification, article update, and release note.

For friend or outside-helper contributions, use
`docs/contributing/friend-contributor-workflow.md` and keep first PRs focused on
evidence notes, narrow copy revisions, or one article promotion. Use
`docs/contributing/pr-sized-task-board.md` to split this roadmap into reviewable
GitHub issues.

## Build Output Ownership

Authoria-owned work should stay in existing separated output modules. Each
module needs a short provenance note in future release work: inputs, tool used,
expected generated files, and validation gate.

| Output module | Owns | Validation gate |
| --- | --- | --- |
| `Authoria - xEdit Output` | Conflict resolution, Requiem patches, worldspace and quest compatibility, landscape/navmesh tweaks, item/container/door adjustments. | Confirm expected plugins are enabled late enough in `loadorder.txt`; inspect high-risk records before documenting behavior as final. |
| `Authoria - Synthesis Output` | Synthesis-generated gameplay/worldspace output, Reqtificator Lite output, High Poly Head patching. | Regenerate after relevant load-order changes; confirm generated plugins exist and remain enabled. |
| `Authoria - RFTI Output` | Requiem for the Indifferent finalization. | Regenerate after Requiem-relevant plugin changes; confirm `Requiem for the Indifferent.esp` is present and enabled. |
| `Authoria - NPC Merge` | NPC merge and face/NPC consolidation output. | Confirm merge plugin presence and spot-check affected NPCs when follower, NPC, or appearance claims change. |
| `Authoria - MCM and INI Settings` | Runtime presets, keybinds, MCM Recorder profiles, SKSE plugin configs, control maps, map marker settings, SPID/BOS-style config files kept with runtime settings. | Parse quoteable settings and confirm changed presets support article claims. |
| `Authoria - Modded Outfit Distribution` | Outfit distribution, SPID/SkyPatcher-style distribution, and related haberdashery output. | Confirm distribution files and related plugin are present before writing outfit or faction-appearance claims. |
| `Authoria - Custom Movesets` | OAR/combat animation presentation and custom moveset behavior. | Confirm files exist and spot-check combat presentation when movement/readability articles change. |
| `Authoria - Nemesis Output` | Behavior output for animation behavior changes. | Regenerate after behavior-affecting animation changes; confirm output is enabled. |
| `Authoria - xLodGen Output`, `Authoria - TexGen Output`, `Authoria - Dyndolod Output`, grass cache folders | Worldspace visibility, LOD, terrain, object, grass, and seasonal presentation outputs. | Regenerate after worldspace, landscape, tree, grass, or season-impacting changes; spot-check affected routes/regions. |
| `Authoria - CK Output` | Future CK-authored files, quests, aliases, scripts, dialogue, or navmesh work that cannot be safely expressed through xEdit/generated output alone. | Currently empty except `meta.ini`; treat CK work as optional/future unless authored quests, scripts, scenes, or CK-only navmesh work require it. |

Cleanup review targets found during current planning:

- `Auhtoria - Armor Chest Distribution.esp`
- `Auhoria - Seasons Empty INIs`
- `Auhoria - Seasons Patches`
- `Authoria - Viligant Requiem Patch.esp`

These names may be harmless if already referenced by load order and dependent
metadata. Do not rename them casually; treat them as release-cleanup candidates
that require dependency and load-order checks.

## Evidence Capture

`CONTEXT.md` remains the source-of-truth policy for local evidence. File-level
citations are enough for broad provenance, but high-risk gameplay claims should
move toward record-level evidence.

Minimum evidence record:

- source path
- plugin or config surface
- key, FormID, editor ID, or record identifier when known
- claim supported
- verification status
- notes or unresolved checks

Use `docs/contributing/evidence-note-template.md` when an evidence pass needs a
durable maintainer note before a public article changes.

Record-level facts should come from exported data, not binary plugin parsing
inside the Next app. The site has a dedicated future adapter in
`site/lib/arr/record-evidence.ts` so xEdit-exported facts can be consumed as
guide-ready data later.

## Documentation Pipeline

The article-grade model from ADR 0003 remains the public content architecture:

- `systemArticle`
- `companionArticle`
- `regionGuide`
- `questArcGuide`
- `presetFactReference`
- `evidenceDossier`

Use these article states in maintainer surfaces:

- `seeded`: prose exists, but verification notes remain or local support is too
  broad.
- `evidence-backed`: local files and presets support the core claims.
- `record-verified`: xEdit/plugin or exported record checks support risky
  claims.
- `playtested`: in-game behavior or route testing has confirmed the article's
  risky claims.

Public pages should continue to read as player guidance. Raw enabled-mod lists,
MO2 separator dumps, and broad inventory views belong in maintainer evidence
surfaces, not in article copy.

## Release Flow

Playable build release gate:

1. Freeze selected profile and confirm `ModOrganizer.ini` still points at the
   intended Authoria profile.
2. Confirm `modlist.txt`, `plugins.txt`, and `loadorder.txt` reflect the
   intended build.
3. Regenerate required Authoria outputs.
4. Run tool-specific smoke checks for generated outputs.
5. Launch in game for menu, new-game, and load smoke tests.
6. Run targeted in-game or record checks for changed systems, routes,
   companions, or quest arcs.

Reference site release gate:

1. Update article or evidence content.
2. Keep verification notes visible when claims are not final.
3. Keep validation policy in `site/lib/content/validation-manifest.mjs`.
4. Run `pnpm lint` from `site/`.
5. Run `pnpm build` from `site/`.
6. Run `pnpm validate:content` from `site/`.
7. Browser-check changed sections and the evidence page.

Stage 1 friend-preview release gate:

1. Keep houseCARL read-only; do not author patch ESPs for the friend preview.
2. Promote one coherent route tranche at a time.
3. Build a static export from `site/out`.
4. Package the export with a short feedback README that asks for player-clarity
   feedback and states the evidence-backed, not playtested, boundary.

## Acceptance Standard

An Authoria change is complete only when the playable behavior and the reference
claim agree. If the playable build changes without a guide update, the reference
product is stale. If the guide claims more than the local build proves, the
article must keep a verification note.
