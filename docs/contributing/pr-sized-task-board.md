# PR-Sized Task Board

This board translates the current Authoria roadmap into small issues a friend
can pick up without needing to own the whole product plan.

Create GitHub issues from these rows as needed. Keep each issue to one row or
one smaller slice of a row.

## Ready For Evidence Mining

| Candidate issue | Output | Evidence to inspect | Done when |
| --- | --- | --- | --- |
| Add danger-label evidence for Riverwood/Whiterun. | `docs/evidence/` note or update. | Existing public region pages, route-atlas dossier, local Missives, survival, map, and Requiem support. | One note names supported warnings and what still needs route walking. |
| Add danger-label evidence for Falkreath. | `docs/evidence/` note or update. | Falkreath public page, route-atlas evidence, nearby dungeon and road support. | One note separates recoverable errands from claims needing in-game checks. |
| Add danger-label evidence for Riften/Ivarstead. | `docs/evidence/` note or update. | `docs/evidence/riften-ivarstead-stage1.md`, route-atlas dossier, local route support. | One note identifies supported route warnings and manual stop points. |
| Add danger-label evidence for Solitude. | `docs/evidence/` note or update. | `docs/evidence/region-route-atlas-stage1.md`, Solitude page, board work and travel support. | One note distinguishes hub services from cave, coast, faction, and museum overcommitment. |
| Add danger-label evidence for Windhelm. | `docs/evidence/` note or update. | Route-atlas dossier, cold/weather support, Windhelm public page. | One note names what is locally supported and what needs route feel. |
| Add danger-label evidence for Winterhold. | `docs/evidence/` note or update. | Route-atlas dossier, College route support, survival and map evidence. | One note distinguishes planned College trip advice from exact weather/playtest claims. |
| Add danger-label evidence for Markarth. | `docs/evidence/` note or update. | Route-atlas dossier, Markarth public page, terrain and nearby-risk support. | One note separates hub recovery advice from Dwemer/Forsworn/dungeon danger claims. |

## Companion And Quest Tranches

| Candidate issue | Output | Evidence to inspect | Done when |
| --- | --- | --- | --- |
| Check Xelzaz recruitment timing for public readiness. | Evidence note. | Active profile inventory, companion support mods, Wyrmstooth/Sirenroot support, existing seeded Xelzaz content. | Recruitment timing is marked supported, needs-record-check, needs-playtest, or unsupported. |
| Check Wyrmstooth trigger and route burden for a future linked tranche. | Evidence note. | Quest support files, profile inventory, relevant dossiers, upstream only as secondary. | Trigger/readiness claims are separated from route-feel claims. |
| Check Sirenroot trigger and route burden for a future linked tranche. | Evidence note. | Quest support files, profile inventory, relevant dossiers, upstream only as secondary. | Trigger/readiness claims are separated from route-feel claims. |
| Check Olenveld as a compact new-land readiness page. | Evidence note. | Local quest/new-land support, route burden, map/travel support. | The note says whether a player-facing readiness page is evidence-backed or needs more proof. |
| Check Auri plus Vigilant commentary/readiness boundaries. | Evidence note. | Auri support, Vigilant support, follower commentary surfaces if available. | The note avoids overclaiming commentary or combat behavior without local support. |

## Site And Validation Work

| Candidate issue | Output | Evidence to inspect | Done when |
| --- | --- | --- | --- |
| Add an evidence dossier index plan for maintainer pages. | Design note or small site PR. | `site/lib/evidence/dashboard.ts`, `site/components/evidence-dashboard-view.tsx`, existing dossiers. | The next implementation step is clear without changing public guide copy. |
| Tighten validation wording for contributor PRs. | Site validation or docs PR. | `site/lib/content/validation-manifest.mjs`, `site/scripts/validate-content.mjs`. | The PR explains which public leaks or slug checks are newly covered. |
| Add a friend-safe copy pass to one public article. | One content PR. | `docs/player-guide-style-bible.md`, target article, existing Source notes. | The article is more actionable and validation still passes. |

## Not Starter Tasks

Do not assign these until the friend has landed at least one evidence or copy
PR:

- Regenerating playable ARR outputs.
- Changing active MO2 profile assumptions.
- Promoting multiple public pages in one PR.
- Editing generated site export files directly.
- Making broad Requiem, Noxrim, or quest-difficulty claims without local proof.
