# ADR 0002: ARR Evidence Module

## Status

Accepted

## Context

The project needs to explain how Authoria actually plays, not only which mods are installed. That means the frontend must repeatedly answer questions like:

- which gameplay stack a topic belongs to
- which local presets shape the player experience
- which files should be treated as the source of truth

If every page parses `modlist.txt`, `modlist_report_gold.csv`, and the local preset folders independently, the app becomes shallow and repetitive. The reading burden moves into the callers.

## Decision

Concentrate local ARR parsing behind a single module in `site/lib/arr/install.ts`.

That module owns:

- selected profile resolution from `ModOrganizer.ini`
- report parsing from `modlist_report_gold.csv`
- MO2 grouping extraction from `modlist.txt`
- runtime surface scanning for MCM, recorder, and SKSE plugin configs
- topic-cluster derivation for reader-first atlas views

Smaller consumers such as the home page, evidence page, and atlas page should depend on this module rather than each reimplementing file parsing.

## Consequences

Good:

- more locality for ARR-specific parsing rules
- a smaller interface for pages that only need guide-ready structures
- easier future expansion into richer extraction without touching every route

Tradeoff:

- the ARR module becomes a load-bearing adapter and should stay disciplined about returning guide-ready shapes rather than leaking raw filesystem details everywhere
