# ADR 0004: Authoria Almanac Publication Boundary

## Status

Accepted

## Context

The existing site already separates player-facing topics from raw mod-list
inventory, but the public pages still expose provenance, settings, evidence,
and verification notes as first-class reading material. That makes the site
feel like a technical reference before it feels like a gameplay guide.

The intended audience is a player who knows vanilla Skyrim but does not yet
know Requiem, Noxrim, or Authoria's local tuning. That reader needs practical
guidance first: what to do, what changed, what is risky, and how to recover.

## Decision

Reframe the public product as the **Authoria Almanac**.

Public guide pages must meet at least the existing `evidence-backed` article
state before they are visible as normal Almanac pages. `seeded` pages remain
maintainer drafts. Stronger states such as `record-verified` and `playtested`
can inform internal confidence but are not shown as public badges.

`Settings` and `Evidence` are removed from the main navigation. They remain
available as proof destinations through Source notes and maintainer evidence
flows.

Normal player pages show only plain Source notes by default. Exact paths,
plugin names, raw settings keys, and verification debt belong in proof or
maintainer views.

## Consequences

Good:

- The public experience becomes a guide before it becomes a source audit.
- Draft or unverified article seeds no longer look like finished player advice.
- Technical evidence remains available without dominating the reading path.
- The site can keep all guide sections visible while hiding individual pages
  that are not ready.

Tradeoffs:

- The first public Almanac may expose fewer article pages than the internal
  content catalog contains.
- Authors need to maintain publication state deliberately.
- Validation must distinguish normal guide pages from proof and maintainer
  routes.

## Follow-On Work

- Add a player-guide style bible.
- Add publication state to the content model.
- Filter public guide routes to `evidence-backed` or stronger.
- Update validation to catch public technical leaks and seeded page exports.
