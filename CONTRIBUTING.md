# Contributing To Authoria

Authoria contributions should be small, evidence-led, and easy to review.

Start here:

- `CONTEXT.md` for the project source-of-truth rules.
- `docs/contributing/friend-contributor-workflow.md` for the branch, PR, and
  review workflow.
- `docs/contributing/pr-sized-task-board.md` for small task ideas.
- `docs/contributing/evidence-note-template.md` for evidence mining notes.
- `.github/PULL_REQUEST_TEMPLATE.md` for PR expectations.

The best first contribution is an evidence-only PR or a narrow public-copy
cleanup. Do not promote gameplay claims from upstream pages alone; local ARR
evidence is the authority.

For site or content changes, run from `site/`:

```powershell
pnpm lint
pnpm build
pnpm validate:content
```
