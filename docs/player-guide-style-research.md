# Player Guide Style Research Notes

This appendix supports `docs/player-guide-style-bible.md`. It preserves the
research inputs without making the style bible too large to use.

## Baldur's Gate 3 Patch Note Patterns

Reference examples:

- BG3 Wiki patch note index: https://bg3.wiki/wiki/Patch_notes
- Larian Patch 7 notes: https://baldursgate3.game/news/patch-7-now-live_121
- Larian Patch 6 notes: https://baldursgate3.game/news/patch-6-now-live_108
- Larian Patch 5 notes: https://baldursgate3.game/news/patch-5-now-live_99
- Larian Patch 1 notes: https://baldursgate3.game/news/patch-1-now-live_87

Useful patterns to adapt:

- Start with why the update matters to the player.
- Use conversational framing before dense lists.
- Group details by player concern: highlights, gameplay, combat, UI, writing,
  companions, crashes, and fixes.
- Let personality appear in safe places, but keep actual fixes readable.
- Use plain labels and scannable sections.
- Keep long technical lists beneath a human summary.

Patterns not to copy directly:

- Do not use constant jokes in survival warnings or route advice.
- Do not assume the reader shares BG3-specific community in-jokes.
- Do not use patch-note structure for every article; Authoria needs guide
  structure first.

## Plain-Language Patterns

References:

- Digital.gov plain-language principles:
  https://digital.gov/guides/plain-language/principles
- PlainLanguage.gov guidelines:
  https://www.plainlanguage.gov/guidelines/

Useful patterns to adapt:

- Put the reader's need first.
- Use familiar words.
- Use active voice.
- Make headings describe the task, not the internal system.
- Keep paragraphs short.
- Avoid requiring readers to understand internal process before they can act.

## Game Onboarding Patterns

References:

- Apple game onboarding:
  https://developer.apple.com/app-store/onboarding-for-games/
- Nielsen Norman Group progressive disclosure:
  https://www.nngroup.com/articles/progressive-disclosure/
- Xbox accessibility guidance for UI context:
  https://learn.microsoft.com/en-us/gaming/accessibility/xbox-accessibility-guidelines/114

Useful patterns to adapt:

- Introduce complexity when it becomes useful.
- Prioritize the first successful loop.
- Avoid overwhelming players with every system at once.
- Provide enough context for a player to understand why an action matters.
- Keep warnings close to the moment where the player needs them.

## Sister Repository UX Patterns

Reference repo:

- `C:\Users\Admin\Documents\SkyrimGameplayReference`
- `modding-ux/immersive-ux-lessons.md`
- `modding-ux/implementation-risk-notes.md`

Useful patterns to adapt:

- Immersive systems should be quiet, legible, and recoverable.
- Tedium is not immersion.
- Configuration should not become the public experience.
- Rewards and punishments need restraint.
- Compatibility and technical trust matter, but normal readers should not have
  to audit the machinery.
- Failure states need recovery language.

## Authoria-Specific Style Implication

The Almanac should make the first playable loop feel understandable:

1. Start from survival and seasons.
2. Explain only the Requiem/Noxrim facts needed for that decision.
3. Use towns as recovery anchors.
4. Move exact source material into Source notes and maintainer evidence.
5. Keep unfinished pages out of the public guide until their core advice is
   evidence-backed.
