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

For contributor PRs, prefer evidence-only work before promotion work. The
friend workflow lives at `docs/contributing/friend-contributor-workflow.md`, and
small candidate issues live in `docs/contributing/pr-sized-task-board.md`.

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

The first survival-route tranche proved the workflow by promoting:

- Survival and travel context.
- Route readiness and return rules.
- Riverwood and Whiterun as the first safe hub loop.
- Falkreath, Riften/Ivarstead, Solitude, Windhelm, Winterhold, and Markarth as
  spoiler-light route-first region pages.

Later companion and quest-arc waves should use the same pipeline after the
survival-route path is working well.

## Post-Rebaseline Candidate Backlog

The 2026-06-14 ARR rebaseline refreshed the source-of-truth profile. The Stage
1 route work then promoted Riften/Ivarstead and the Solitude, Windhelm,
Winterhold, and Markarth route-atlas pages.

Next candidates, in order:

1. Add route-specific danger labels for the seven public hubs where local
   evidence supports practical recovery advice.
   Evidence blocker: board destinations, dungeon entrances, travel services,
   and route feel need either deeper record review or in-game walking.
2. Promote a linked Xelzaz plus Wyrmstooth/Sirenroot route tranche.
   Evidence blocker: verify recruitment timing, route interaction, quest
   triggers, and follower-balance assumptions before setting public status.
3. Promote Olenveld as a compact new-land readiness page.
   Evidence blocker: verify trigger/readiness, travel burden, map support, and
   Requiem-facing danger expectations.
4. Promote Auri plus Vigilant as a later commentary/readiness tranche.
   Evidence blocker: verify commentary triggers and avoid overclaiming combat
   or Requiem behavior until local support is checked.
5. Expand region danger labels only where local route or dungeon evidence
   supports concrete recovery advice.

When assigning these to a friend, split each candidate into one GitHub issue per
route, companion, quest arc, or evidence surface. Use the evidence-mining issue
template for proof-gathering tasks and the article-promotion issue template only
when the intended output is public copy.

## Kickoff Lessons

- Counts are not enough. Validation should assert the exact public guide slugs
  for each section so a seeded page cannot slip into the export while the count
  still happens to match.
- Publication state is an internal routing gate, not public data. Strip
  `publicationStatus` from public guide props after routing because Next's
  static export can serialize server props into page payloads even when the
  value is not visibly rendered.
- Run `pnpm build` before `pnpm validate:content`. The validator reads
  `site/out`, so validating against a stale export can produce misleading
  article counts and leak results.
- Browser checks should cover both listing pages and article pages. Section
  cards can leak serialized data or unfinished wording even when the article
  template itself looks clean.
- Public leak checks should fail on technical paths, raw config surfaces,
  verification debt, TODO language, and visible article status terms. Those
  belong in Source notes destinations or maintainer views, not in guide copy.
- Source notes should prove confidence with plain labels first. Paths, plugin
  names, raw keys, and exact verification notes are useful, but they should
  stay one click away from the normal player reading path.
- Promote one complete route loop at a time. A small, coherent player path is
  more useful than exposing many seeded pages that still read like planning
  notes.
