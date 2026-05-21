# Authoria Reference Site

Static-first Next.js guide for the live ARR-based Authoria build.

The public site is an article-grade gameplay reference, not a mod catalog. It
organizes content by player questions and experience areas:

- `Start Here`
- `Progression`
- `Combat`
- `Survival`
- `Companions`
- `Regions`
- `Quest Arcs`
- `Settings`
- `Evidence`

## Local Development

```bash
pnpm dev
```

Open `http://localhost:3000`.

## Verification

```bash
pnpm lint
pnpm build
pnpm validate:content
```

The build uses `output: "export"`, so all article routes must be statically
generated. The content validator runs against `site/out` after a build and
checks public article counts plus banned public scaffolding/removed-companion
terms.

## Content Rules

- Write for how Authoria plays, not for which mods are installed.
- Keep raw mod/plugin names in evidence, maintainer context, or citations.
- Do not render enabled-mod lists, MO2 separator dumps, or representative mod
  lists as public guide content.
- Quote concrete preset values through the ARR preset extraction layer when a
  setting materially supports an article claim.
- Mark unverified gameplay interpretation as a verification note instead of
  presenting it as final.
