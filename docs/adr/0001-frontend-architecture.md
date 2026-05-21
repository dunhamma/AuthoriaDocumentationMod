# ADR 0001: Static-first frontend with Prism UI

## Status

Accepted

## Context

This project needs a documentation experience that can present rich gameplay information, patch provenance, and player-experience analysis without becoming heavy or overengineered.

The user preference is for "Prisma UI." The current library that matches that intent is **Prism UI**, which is built on top of `shadcn/ui`, `Radix UI`, `Tailwind CSS`, and `Next.js`.

The experience should be:

- visually polished
- lightweight to load
- friendly to long-form reading
- structured enough to compare mods, systems, and patch chains
- able to show evidence and provenance clearly

## Decision

Use a **static-first Next.js app** with **Prism UI** components as the presentation layer.

Prefer:

- Next.js App Router
- Tailwind CSS
- `shadcn/ui` base patterns
- Prism UI components selectively, especially for navigation, panels, tabs, cards, and polished interaction states
- content stored locally as markdown, MDX, JSON, or generated data files inside the repo

Do **not** start with a database-backed architecture unless the content model clearly outgrows static content.

## Rationale

This matches the published Prism UI stack and keeps the app lightweight:

- Prism UI is designed around `shadcn/ui`, `Radix UI`, `Tailwind CSS`, and `Next.js`.
- A static-first site avoids shipping unnecessary backend complexity for a documentation-first product.
- Local files fit the evidence-first workflow because ARR extraction and manual notes can both be versioned in git.
- Next.js gives a good path to static rendering, route structure, and search-friendly content pages.

## Information architecture direction

The frontend should likely model content in these views:

- `Systems`
  - survival, combat, progression, UI, travel, economy
- `Mods`
  - upstream mod intent, ARR status, dependencies, local overrides
- `Experiences`
  - player-facing walkthroughs such as early game, follower play, map use, or magic progression
- `Patches and outputs`
  - Authoria-owned patches, generated outputs, and why they matter
- `Evidence`
  - source files, plugin references, and provenance notes

## UX principles

The app should optimize for reading and comparison, not marketing presentation.

Prefer:

- dense but calm layouts
- strong search and filtering
- side-by-side provenance and summary
- visible distinction between upstream behavior and ARR-final behavior
- compact navigation with fast drill-down

Avoid:

- oversized hero layouts
- decorative landing-page structure
- hiding evidence behind too many clicks
- card spam that makes comparison harder

## Consequences

Positive:

- fast initial build path
- low runtime complexity
- easy versioning of extracted content
- strong fit for documentation and research workflows

Tradeoffs:

- content modeling discipline is required early
- some richer interactions should wait until the underlying data model is stable
- if the project later needs user accounts, sync, or collaborative editing, the architecture may need to expand

## Follow-on implementation

When app work begins, the next practical step should be:

1. define the content schema
2. decide which ARR facts are extracted automatically versus written manually
3. scaffold a static Next.js app with Prism UI-compatible foundations
4. build one vertical slice, likely `Systems -> Requiem progression`
