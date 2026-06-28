# Stage 1 Region Route Atlas Evidence

Maintainer evidence for the Stage 1 route-atlas expansion that promotes
Solitude, Windhelm, Winterhold, and Markarth as public region guides.

This dossier supports high-level, spoiler-light player guidance only. It does
not prove exact route feel, encounter difficulty, quest solutions, hidden
locations, reward outcomes, or companion recommendations.

## Baseline

- Evidence date: 2026-06-14.
- ARR install: `D:\Wabbajack\modlists\ARR`.
- MO2 selected profile: `Authoria - Requiem Reforged - Main Profile`.
- Required profile files exist for the selected profile:
  - `modlist.txt`
  - `plugins.txt`
  - `loadorder.txt`
  - `modlist_report_gold.csv`
- Generated snapshot: `docs/evidence/arr-snapshot.json`.
- houseCARL status confirmed against the Authoria profile:
  - Profile: `Authoria - Requiem Reforged - Main Profile`.
  - Mods: 3207 enabled, 41 disabled.
  - Plugins in load order: 3449.
  - Active plugins: 3449.
  - Resolver: 3449 plugins resolved.
- houseCARL use in this tranche was read-only:
  - `housecarl_load_order_status`
  - `housecarl_cross_plugin_query`
  - conflict trees on record queries

## Cross-System Route Evidence

These local preset surfaces support the public route rules shared across the new
hub pages.

### Missives

Source: `D:\Wabbajack\modlists\ARR\mods\Authoria - MCM and INI Settings\MCM\Settings\Missives.ini`

- `iEasyQuestChance = 75`
- `iVeryHardQuestChance = 0`
- Delivery work has modest fixed rewards:
  - Letter delivery: easy 100, normal 150, hard 200.
  - Weapon delivery: easy 100, normal 200, hard 350.
  - Potion delivery: easy 150, normal 250, hard 350.
- Gathering work can be meaningful early money:
  - Ingredient: easy 300, normal 400, hard 750.
  - Soul gem: easy 300, normal 400, hard 750.
  - Ore: easy 200, normal 400, hard 800.
  - Food: 200.

Public implication: towns can support low-commitment money through deliveries,
gathering requests, nearby errands, and one-road jobs. Do not imply every board
destination is safe.

### SunHelm

Source: `D:\Wabbajack\modlists\ARR\mods\Authoria - MCM and INI Settings\SunHelm\Config\normal.json`

- `DisableFastTravel`: 0.
- `ColdRate`: 1.0.
- `HungerRate`: 7.
- `ThirstRate`: 7.
- `FatigueRate`: 7.

Public implication: route planning should keep food, thirst, fatigue, cold,
weather, and recovery buffers visible. Fast travel being enabled does not
remove survival pressure from normal road planning.

### Map Readability

Source: `D:\Wabbajack\modlists\ARR\mods\Authoria - MCM and INI Settings\SKSE\Plugins\MapMarkerFramework.ini`

- Map: `bObscuredUndiscovered=0`.
- HUD compass: `bObscuredUndiscovered=1`.
- Marker scale: `fMarkerScale=1.3`.

Public implication: map planning is supported, but the compass is not a full
spoiler layer. Public copy can say visible markers help planning, not that a
marker means safety.

### Requiem And Economy

Sources:

- `D:\Wabbajack\modlists\ARR\mods\Authoria - MCM and INI Settings\MCM\Settings\Requiem.ini`
- `D:\Wabbajack\modlists\ARR\mods\Authoria - MCM and INI Settings\MCM\Settings\trade & barter.ini`

Relevant values:

- Requiem respawn timer: 336 hours.
- Requiem cleared respawn timer: 7200 hours.
- Requiem fast travel atmosphere setting: enabled.
- Requiem timescale: 12.
- Trade and Barter preset: `iPresetChoice = 5`.

Public implication: the guide should keep economy, recovery, and retreat advice
conservative. Avoid exact combat or enemy-stat claims without deeper record
verification.

### Known Gaps

- `Better Carriage Destinations.ini` was not present in the expected local MCM
  export path.
- Carriage, ferry, inn, and return-route behavior still need in-game route-feel
  checks before exact travel-network claims.
- The public pages should say "travel service" or "planned return" unless a
  route has been checked in game.

## Solitude

### houseCARL Location Evidence

Query: `Location` records by Solitude name with conflict trees.

Useful support:

- `SolitudeLocation` winner: `Grand Solitude - Lux Via patch.esp`.
  - Overridden by Skyrim, Dawnguard, HearthFires, USSEP, Grand Solitude,
    BluePalaceTerrace, Snazzy Interiors Solitude AIO, Lux Via, and the Grand
    Solitude Lux Via patch.
- Service and route locations are present for:
  - Winking Skeever.
  - Bits and Pieces.
  - Angeline's Aromatics.
  - Castle Dour.
  - Bards College.
  - Blue Palace.
  - Radiant Raiments.
  - Fletcher.
  - Blacksmith.
  - Stables.
  - Docks.
  - Lighthouse.
  - Sawmill.
- `DBM_GuildHouseSolitudeLocation` winner:
  `Lux - Legacy of the Dragonborn patch.esp`.
- `SolitudeBardsCollegeLocation` winner:
  `Authoria - Master Patch - Location Merge.esp`.

### houseCARL Cell Evidence

Query: `Cell` records by Solitude name with conflict trees.

Useful support:

- Solitude interiors show broad Lux, Snazzy, Grand Solitude, and Authoria
  patch-layer resolution.
- `SolitudeTempleoftheDivines` winner:
  `Authoria - Patch - AI Overhaul - Grand Solitude.esp`.
- `SolitudeVittoriaVicisHouse` winner:
  `Authoria - Reqtificated - Snazzy Solitude AIO.esp`.
- `SolitudeLighthouse` winner:
  `Authoria - Reqtificated - Xelzaz.esp`.
- `SolitudeRedWave` is touched by Wyrmstooth and SaveTheIcerunner; winner:
  `Lux - Water for ENB patch.esp`.
- `ECSSSolitudeSewers` winner:
  `Lux - Saints and Seducers Extended Cut patch.esp`.

### Public-Safe Conclusion

Solitude has enough service, travel, faction, museum, dock, and nearby authored
content evidence to support a high-service hub page. The page should warn
against overcommitment rather than label specific quests or interiors.

### Gaps

- Board destinations, coast routes, dock routes, and museum onboarding should be
  checked before exact early-safety claims.
- Public copy should not list specific quest solutions, hidden routes, or
  companion recommendations.

## Windhelm

### houseCARL Location Evidence

Query: `Location` records by Windhelm name with conflict trees.

Useful support:

- `WindhelmLocation` winner: `Lux Orbis.esp`.
  - Overridden by Skyrim, Update, Dawnguard, HearthFires, Dragonborn, USSEP,
    USMP, Lux Via, Ryn's Farms, and Lux Orbis.
- Service and route locations are present for:
  - The White Phial.
  - Temple of Talos.
  - Sadri's Used Wares.
  - New Gnisis Cornerclub.
  - East Empire Company.
  - Palace of the Kings.
  - Hjerim.
  - Windhelm Stables.
  - Windhelm Docks.
  - Candlehearth Hall.
- `WindhelmCandlehearthHallLocation` winner:
  `Lux - JK's Candlehearth Hall patch.esp`.

### houseCARL Cell Evidence

Query: `Cell` records by Windhelm name with conflict trees.

Useful support:

- Windhelm interiors show broad Lux and Snazzy Interiors Windhelm AIO
  resolution.
- `WindhelmPalaceoftheKings` winner:
  `Snazzy Interiors - JKs Palace of the Kings - Lux patch.esp`.
- `WindhelmBlacksmith` winner:
  `Snazzy Interiors - Windhelm AIO - Lux patch.esp`.
- `WindhelmHalloftheDead` winner:
  `Lux - Legacy of the Dragonborn patch.esp`.
- `WindhelmHjerim` winner:
  `Lux - USSEP patch.esp`.

### Public-Safe Conclusion

Windhelm has enough service, dock, stable, inn, and interior evidence to support
a cold-weather city hub page. The page should focus on approach, exit,
resupply, and northern/eastern route caution.

### Gaps

- Exact cold exposure and season feel on approach roads remains manual
  route-feel work.
- Board destinations and coastal/northern travel claims need in-game checks
  before stronger route labels.

## Winterhold

### houseCARL Location Evidence

Query: `Location` records by Winterhold name with conflict trees.

Useful support:

- `WinterholdLocation` winner: `Lux Via.esp`.
- `WinterholdCollegeLocation` winner:
  `unofficial skyrim special edition patch.esp`.
- `WinterholdJarlsLonghouseLocation` winner:
  `Lux - COTN Winterhold patch.esp`.
- `WinterholdCollegeArchMageQuartersLocation` winner:
  `Authoria - Master Patch - Location Merge.esp`.
- `WinterholdCollegeMiddenLocation` winner:
  `Lux - USSEP patch.esp`.
  - Touched by Requiem and Lux.
- Hold, camp, College, and Hall locations are present.

### houseCARL Cell Evidence

Query: `Cell` records by Winterhold name with conflict trees.

Useful support:

- College Halls and Arcanaeum resolve through `Lux - JK's College patch.esp`.
- COTN Winterhold support is visible in several town cells.
- `WinterholdTheFrozenHearth` winner:
  `Authoria - Reqtificated - COTN Winterhold.esp`.
- `WinterholdRanmirshouse` winner:
  `Authoria - Reqtificated - COTN Winterhold.esp`.
  - Current name evidence: `Birna's Oddments`.
- `WinterholdKorirshouse` winner:
  `Authoria - Reqtificated - COTN Winterhold.esp`.
- `WinterholdJail` winner:
  `Lux - COTN Winterhold patch.esp`.
  - Touched by Requiem.
- `WinterholdCollegeMidden01` winner:
  `Authoria - Master Patch - Water for ENB.esp`.

### Public-Safe Conclusion

Winterhold has enough town, College, inn/shop, and cold-region evidence to
support a deliberate-trip page. The page should frame the College as a
progression choice with route cost, not as a generic first hub.

### Gaps

- Actual carriage and travel behavior with Winterhold restoration and travel
  patches must be walked in game before promising easy evacuation.
- Public copy should avoid exact College entry behavior, quest solution details,
  and northern danger tiers.

## Markarth

### houseCARL Location Evidence

Query: `Location` records by Markarth name with conflict trees.

Useful support:

- `MarkarthLocation` winner:
  `Lux Via - Markarth Entrance and Farm Overhaul.esp`.
- Service, city-pressure, and danger-adjacent locations are present for:
  - Silver-Blood Inn.
  - Arnleif and Sons.
  - Hag's Cure.
  - Understone Keep.
  - Stables.
  - Warrens.
  - Dwemer Museum.
  - Calcelmo's Laboratory.
  - Markarth Ruins.
  - Hall of the Dead.
  - Temple of Dibella.
  - Abandoned House.
- `MarkarthStablesLocation` winner:
  `Lux Via - Markarth Entrance and Farm Overhaul - USMP Patch.esp`.
- `MarkarthHalloftheDeadLocation`, `MarkarthShrineofTalosLocation`, and
  `MarkarthRuinsLocation` winners: `Requiem.esp`.
- Markarth entrance/outskirts locations are visible through
  `Lux Via - Markarth Entrance and Farm Overhaul.esp`, including Mushroom Farm,
  Mill Maintenance, East Empire Goods/Dormitory, Old Observatory, Old Dam, Old
  Temple, and Markarth Outskirts.

### houseCARL Cell Evidence

Query: `Cell` records by Markarth name with conflict trees.

Useful support:

- Markarth interiors resolve through Lux and Snazzy Interiors Markarth AIO
  layers.
- `MarkarthAbandonedHouse` winner: `Lux.esp`.
  - Touched by HouseOfHorrorsQuestExpansion and Requiem.
- `MarkarthTempleofDibella` winner:
  `Lux - Water for ENB patch.esp`.
- Calcelmo's tower/lab cells resolve through Lux/Water for ENB layers and are
  touched by Legacy/loot-locking support.
- `MarkarthHalloftheDead` winner:
  `Lux - Markarth Outskirts patch.esp`.
- Outskirts cells from `Lux Via - Markarth Entrance and Farm Overhaul.esp` are
  present.

### Public-Safe Conclusion

Markarth has enough service, terrain, ruin, mine, outskirts, Requiem, and
interior evidence to support a western hub page. The page should focus on
resupply, terrain pressure, and separating city errands from Dwemer/Forsworn
commitments.

### Gaps

- Specific mine, ruin, Forsworn, and city-quest danger labels still need route
  checks or deeper record review.
- Companion fit should stay out of the public region page until companion and
  dungeon evidence are handled in their own tranche.

## Publication Boundary

Promoted public region pages may say:

- The city has useful services.
- A route has travel, cold, recovery, terrain, or overcommitment pressure.
- Board work is best treated as deliveries, gathering requests, nearby errands,
  and one-road jobs until route feel is known.
- A hub can be used as a recovery anchor.
- A famous place, faction, ruin, road, or museum hook can be real content and
  still be wrong for today's character.

Promoted public region pages should not say:

- Exact quest solutions.
- Hidden rewards or hidden locations.
- Exact enemy stats or danger tiers.
- Companion recommendations as route answers.
- Travel-network guarantees that have not been walked in game.

## Manual Stop Point

Automation should stop after the public pages, validation, static packet, and
HTTP checks pass. Stronger states require one of these manual actions:

- In-game walking of each hub approach and return route.
- Friend-preview feedback focused on player clarity.
- Deeper record verification for exact route/dungeon danger labels.
