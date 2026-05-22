# Authoria Almanac Promotion Pipeline

This is the maintainer workflow for turning seeded article material into public
Almanac guidance.

The goal is not to publish every seeded page quickly. The goal is to promote
pages only when they can help a player make a better decision without exposing
technical proof work as public reading.

## Article States

- `seeded`: prose or notes exist, but the page is not public guide material.
- `evidence-backed`: the core player advice is locally supported and can be
  published.
- `record-verified`: risky claims are supported by record-level evidence.
- `playtested`: in-game behavior or route testing confirms the important
  player experience.

Public Almanac pages start at `evidence-backed`. Stronger states are welcome
but not required for the first public version of a page.

## Promotion Steps

1. **Seed review**
   - Name the player question the page answers.
   - Confirm the article type: system, region, companion, or quest arc.
   - Remove any material that is only useful to the author.

2. **Evidence pass**
   - Systems can usually start from local presets and configs.
   - Regions need route, resupply, map, weather, and danger evidence.
   - Companions need recruitment, role, follower-balance, and route interaction
     evidence.
   - Quest arcs need trigger, readiness, travel burden, spoiler policy, and
     local support evidence.

3. **Player rewrite**
   - Use the style bible's Almanac article shape.
   - Start with what to do, not what file proved it.
   - Explain the vanilla Skyrim assumption that no longer holds.
   - Keep warnings concrete and recoverable.

4. **Source notes**
   - Public Source notes use plain labels only.
   - Paths, plugin names, raw setting keys, and verification notes stay in
     proof or maintainer views.

5. **Publication gate**
   - Set `publicationStatus: "evidence-backed"` only after the page has useful
     player guidance and local support.
   - Update the expected public article counts in validation.
   - Run lint, build, content validation, and a browser check.

## First Tranche Standard

The first survival-route tranche proves the workflow by promoting:

- Survival and travel context.
- Route readiness and return rules.
- Riverwood and Whiterun as the first safe hub loop.

Later companion and quest-arc waves should use the same pipeline after the
survival-route path is working well.
