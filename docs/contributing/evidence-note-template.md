# Evidence Note Template

Copy this shape into a new or existing maintainer evidence file when mining
Authoria evidence.

```markdown
# <Topic Or Claim>

## Question

What player or maintainer question is this evidence trying to answer?

## Scope

- Article, route, system, companion, or quest arc:
- Public route or planned slug:
- Issue:

## Claim

State the smallest claim this evidence can support.

## Local Evidence

| Source path | Surface | What it supports | Status |
| --- | --- | --- | --- |
| `D:\Wabbajack\modlists\ARR\...` | mod, plugin, config, route, record, or dossier | claim supported | supported / needs-record-check / needs-playtest / unsupported |

## Upstream Or Secondary Sources

Use this only when upstream documentation helps explain intent. It does not
override the local ARR install.

| Source | What it helps explain | Local match confirmed? |
| --- | --- | --- |
| upstream page or repo | original mod intent | yes / no / not checked |

## Player Guidance Impact

What should change in public player guidance if this claim is accepted?

## Remaining Checks

- Record checks still needed:
- In-game or route checks still needed:
- Copy or publication blockers:

## Recommendation

Choose one:

- Keep as maintainer evidence only.
- Revise existing public copy.
- Promote to `evidence-backed`.
- Wait for record verification.
- Wait for playtest.
```

## Status Vocabulary

- `supported`: local evidence supports the claim.
- `unsupported`: local evidence contradicts or fails to support the claim.
- `needs-record-check`: local support exists, but risky gameplay detail needs
  record-level verification.
- `needs-playtest`: route feel, trigger timing, combat feel, weather burden, or
  player experience still needs in-game review.
- `upstream-only`: only an upstream source supports the claim so far.
