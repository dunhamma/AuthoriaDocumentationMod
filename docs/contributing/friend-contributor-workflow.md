# Friend Contributor Workflow

This workflow is for a trusted friend helping mine Authoria evidence and make
small pull requests. It assumes they are helping the reference product first:
the static Authoria Almanac and its maintainer evidence notes.

Do not start them with broad playable ARR changes. A good first contribution is
one evidence note, one route check, one companion check, or one narrow article
revision.

## What They Can Help With First

Good starter work:

- Mine local ARR evidence for one claim.
- Turn one seeded route, companion, system, or quest question into a maintainer
  evidence note.
- Tighten one public article so it follows the player-guide style.
- Add or update one dossier under `docs/evidence/`.
- Confirm whether a claim is supported, unsupported, or needs in-game review.

Avoid as first tasks:

- Changing the active ARR profile.
- Regenerating Requiem, Synthesis, DynDOLOD, grass, or other playable outputs.
- Promoting several public pages at once.
- Writing broad mod catalog pages.
- Publishing claims from upstream pages without checking the local install.

## Setup

1. Clone the repository.
2. Install site dependencies from `site/` with `pnpm install`.
3. Read these files before picking work:
   - `CONTEXT.md`
   - `docs/authoria-creation-roadmap.md`
   - `docs/almanac-promotion-pipeline.md`
   - `docs/article-harvest-status.md`
   - `docs/player-guide-style-bible.md`
4. Pick a GitHub issue that is scoped to one evidence or article slice.

If they do not have the local ARR install at `D:\Wabbajack\modlists\ARR`, they
can still help with source cleanup, public copy shape, and issue preparation,
but they should not mark local gameplay claims as verified.

## Branch And PR Flow

Use one branch per small task.

```powershell
git checkout main
git pull
git checkout -b friend/<short-task-name>
```

Keep each PR focused on one of these shapes:

- Evidence-only PR: adds or updates a maintainer evidence note.
- Copy PR: revises one public article without changing publication state.
- Promotion PR: promotes one page after evidence is present.
- Validation PR: improves checks, manifests, or route coverage.

PRs should not mix playable modlist changes with public site changes unless the
issue explicitly calls for both.

## Evidence Mining Shape

Use `docs/contributing/evidence-note-template.md` for evidence notes.

Minimum evidence for a useful PR:

- source path
- mod, plugin, config, route, record, or article surface
- claim supported
- confidence status
- remaining checks

Confidence statuses:

- `supported`: local evidence supports the claim.
- `unsupported`: local evidence contradicts or fails to support the claim.
- `needs-record-check`: file or route evidence exists, but risky gameplay detail
  needs record-level verification.
- `needs-playtest`: the claim depends on route feel, trigger timing, combat
  feel, weather burden, or another in-game experience.
- `upstream-only`: only an upstream page supports the claim so far.

Do not turn `upstream-only` into public player advice.

## Public Article Rules

Public pages should help the player before they explain the proof.

Before a public copy PR is ready:

- Start with what the player should do.
- Explain the vanilla Skyrim assumption that no longer holds.
- Keep warnings concrete and recoverable.
- Keep raw paths, plugin names, raw setting keys, and TODOs out of normal player
  copy.
- Use Source notes as plain-English reassurance.
- Keep unfinished claims in maintainer notes.

If a new page is promoted, update `site/lib/content/validation-manifest.mjs` so
the exact public slug is part of validation.

## Verification

For docs-only evidence notes, at least run a spelling and link sanity check by
reading the changed file in GitHub preview or locally.

For site or content changes, run from `site/`:

```powershell
pnpm lint
pnpm build
pnpm validate:content
```

Then browser-check the changed article or section when practical.

The validator reads `site/out`, so build before validating content.

## Review Expectations

The reviewer checks:

- The task stayed small.
- Evidence claims are tied to local Authoria or ARR surfaces.
- Public copy does not expose maintainer machinery.
- Validation matches the change.
- Any remaining record or playtest gap is named instead of guessed.

## Stop Rules

Stop and ask for review when:

- The local install is missing or differs from the expected profile.
- Evidence points to a playable ARR output change.
- A claim needs in-game judgment.
- A page would need multiple sections or routes promoted together.
- A public article needs raw technical detail to make sense.
