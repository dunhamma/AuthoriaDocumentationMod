# Issue tracker: GitHub

Issues and PRDs for this repo live as GitHub issues in `dunhamma/AuthoriaDocumentationMod`. Use the `gh` CLI for all operations.

## Conventions

- **Create an issue**: `gh issue create --repo dunhamma/AuthoriaDocumentationMod --title "..." --body "..."`
- **Read an issue**: `gh issue view <number> --repo dunhamma/AuthoriaDocumentationMod --comments`, filtering comments by `jq` and also fetching labels.
- **List issues**: `gh issue list --repo dunhamma/AuthoriaDocumentationMod --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'` with appropriate `--label` and `--state` filters.
- **Comment on an issue**: `gh issue comment <number> --repo dunhamma/AuthoriaDocumentationMod --body "..."`
- **Apply / remove labels**: `gh issue edit <number> --repo dunhamma/AuthoriaDocumentationMod --add-label "..."` / `--remove-label "..."`
- **Close**: `gh issue close <number> --repo dunhamma/AuthoriaDocumentationMod --comment "..."`

## When a skill says "publish to the issue tracker"

Create a GitHub issue in `dunhamma/AuthoriaDocumentationMod`.

## When a skill says "fetch the relevant ticket"

Run `gh issue view <number> --repo dunhamma/AuthoriaDocumentationMod --comments`.
