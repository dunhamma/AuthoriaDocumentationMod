# Authoria PR Checklist

## Scope

- Linked issue:
- Change type:
  - [ ] Evidence mining only
  - [ ] Maintainer evidence or dossier
  - [ ] Public Almanac copy
  - [ ] Site behavior or validation
  - [ ] Playable ARR/modlist change
- Summary:

## Evidence Used

List the local Authoria or ARR evidence that supports the change. Prefer local
ARR files over upstream pages.

- Source path:
- Mod, plugin, config, route, or record surface:
- Claim supported:
- Verification status:

## Public Copy Boundary

- [ ] No raw local paths, plugin names, raw setting keys, or verification TODOs are visible in normal player pages.
- [ ] Source notes use plain player-facing labels.
- [ ] Unverified claims remain in maintainer notes, not public guidance.

## Validation

Run from `site/` when site content or behavior changes.

- [ ] `pnpm lint`
- [ ] `pnpm build`
- [ ] `pnpm validate:content`
- [ ] Browser spot-check of changed public page or section

If a validation step was not run, explain why:

## Review Notes

- Remaining evidence gaps:
- Manual or in-game checks still needed:
- Reviewer should focus on:
