# Riften/Ivarstead Stage 1 Evidence

This maintainer note records the evidence used to promote
`riften-ivarstead-corridor` to the Stage 1 friend-preview packet.

## Baseline

- ARR root: `D:\Wabbajack\modlists\ARR`
- Selected profile: `Authoria - Requiem Reforged - Main Profile`
- `ModOrganizer.ini`, `modlist.txt`, `plugins.txt`, `loadorder.txt`, and
  `modlist_report_gold.csv` are present for the selected profile.
- houseCARL could not parse the live ARR `ModOrganizer.ini` because its parser
  rejected the spaced `key = value` form. A temporary mirror at
  `%TEMP%\AuthoriaARR_houseCARL_mirror` was created with a normalized
  `ModOrganizer.ini` plus junctions to ARR `mods`, `profiles`, and
  `Stock Game`. houseCARL then resolved the Authoria profile read-only.
- houseCARL status through the mirror: 3,207 enabled mods, 3,449 active plugins,
  and 3,449 plugins resolved to real files.

## Record Evidence

- Riften's main location record `RiftenLocation` resolves to `Lux Orbis.esp`
  after touches from Skyrim, Dawnguard, HearthFires, Fishing CC, USSEP, Lux Via,
  Ryn's Farms, and JK's Riften Outskirts.
- Riften service and interior cells are heavily patched by Lux, Riften
  Expansion, Authoria Reqtificated patches, Authoria water/worldspace output,
  and Authoria lock/key patches. This supports saying Riften is a patched
  service hub, not a vanilla-only city assumption.
- `RiftenBeeandBarb`, `RiftenHaelgasBunkhouse`, `RiftenPawnedPrawn`,
  `RiftenFishery`, `RiftenBlacksmith`, `RiftenStables`, and multiple Riften
  Expansion service cells resolve to late Lux or Authoria winners.
- `IvarsteadLocation` resolves to `Thuldor's Ivarstead.esp` after touches from
  Skyrim, USSEP, Natural Waterfalls, and Lux Via.
- Ivarstead service records from Thuldor's Ivarstead include Pilgrim's
  Purchases, The Mountain's Anvil, Breadsmith, Mara's Chapel, Vilemyr Inn, and
  Fellstar Farm. Several are then finalized by Lux/Thuldor or Authoria patches.
- `IvarsteadVilemyrInn`, `IvarsteadFellstarFarm`, and Thuldor service cells
  confirm Ivarstead can be described as a checkpoint with services, not merely a
  road marker.
- `HighHrothgarLocation` resolves to `Authoria - Master Patch - Location
  Merge.esp` after Requiem and Serana Dialogue Add-On touches. This supports
  treating the mountain route as campaign pressure rather than casual travel.
- `ShroudHearthBarrowLocation`, `RiftenRatwayLocation`, and
  `TrevasWatchLocation` exist as nearby temptation/danger anchors, but the
  Stage 1 page should not publish exact danger tiers before in-game route feel
  or deeper record checks.

## File Evidence

- `Missives.ini`: `iEasyQuestChance = 75`, `iVeryHardQuestChance = 0`.
- `SunHelm/Config/normal.json`: `HungerRate = 7`, `ThirstRate = 7`,
  `FatigueRate = 7`, `ColdRate = 1.0`, `DisableFastTravel = 0`.
- `MapMarkerFramework.ini`: map undiscovered marker obscuring is disabled,
  HUD undiscovered marker obscuring is enabled, and marker scale is `1.3`.
- `Requiem.ini`: local timescale is `12`.
- `trade & barter.ini`: local barter preset is `5`.
- `Follower Stats.ini`: follower stat scale is `50`.

## Publication Boundary

The Riften/Ivarstead page can be `evidence-backed` for Stage 1 player clarity.
It is not `record-verified` for exact danger tiers and not `playtested` for route
feel. Keep exact dungeon safety, encounter difficulty, ferry/carriage behavior,
and route weather feel as manual follow-up checks.
