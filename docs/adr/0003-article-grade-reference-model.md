# ADR 0003: Article-Grade Reference Model

## Status

Accepted

## Context

The original gameplay guide was useful as a practical checklist, but it was too
close to setup notes and mod-list browsing. The current goal is to explain how
Authoria plays as a full experience: progression, combat, survival, companions,
regions, quest arcs, settings, and local ARR evidence.

The public UI also must not become a user-facing inventory of installed mods.
Raw mod and plugin names remain important for provenance, but they should not
be the main reading path.

## Decision

Use article-grade reference types instead of broad `system`, `experience`, and
`mod` pages:

- `systemArticle`
- `companionArticle`
- `regionGuide`
- `questArcGuide`
- `presetFactReference`
- `evidenceDossier`

Public navigation is organized by reader intent:

- `Start Here`
- `Progression`
- `Combat`
- `Survival`
- `Companions`
- `Regions`
- `Quest Arcs`
- `Settings`
- `Evidence`

Add a thin ARR preset extraction layer that parses local settings into
quoteable facts. These facts support article claims, but interpretation still
belongs in reviewed article prose.

## Consequences

Good:

- The public guide stays focused on how to play and understand Authoria.
- Raw ARR provenance remains available without becoming the public content
  model.
- Future overnight harvest runs have clear landing zones for article drafts and
  setting facts.

Tradeoffs:

- Article shells may initially contain verification notes until xEdit or
  in-game checks fill the gaps.
- More editorial discipline is required because evidence must be translated
  into reader-facing guidance instead of copied into pages as source names.
