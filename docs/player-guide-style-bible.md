# Authoria Almanac Style Bible

## Purpose

The Authoria Almanac is a player-facing guide for people who know vanilla
Skyrim but are new to Requiem, Noxrim, and Authoria's local tuning.

The guide should answer the question a player has before the question an
author has. Lead with what to do, what changed from vanilla Skyrim, what is
dangerous, and how to recover. Keep technical evidence available, but do not
make readers learn the modlist before they can play the game.

## Audience Promise

Every public guide page should help a player understand:

- what to do next
- what is no longer safe to assume from vanilla Skyrim
- what can kill, strand, confuse, or overcommit them
- when an activity is safe, risky, or better delayed
- which plain-English source notes support the advice

The Almanac assumes the reader understands Skyrim basics such as towns,
quests, followers, dungeons, inns, food, combat, and map markers. It does not
assume the reader understands Requiem, Noxrim, load order behavior, MCM
presets, generated outputs, or local Authoria patches.

## Voice

Use a warm guide voice: practical, direct, and human.

Borrow from Baldur's Gate 3 patch notes in structure rather than imitation:

- open with the player impact
- group related changes into readable chunks
- use plain headings
- allow small playful asides in low-risk places
- keep warnings and readiness advice direct

Do not turn the Almanac into patch-note cosplay. A joke is only useful if it
makes the guide easier to read. Survival warnings, combat advice, route gates,
and save-safety notes should stay plain.

## Default Article Shape

Use this pattern for normal player guide pages:

1. **Do this first**
   - Immediate actions the player can take.
   - Keep this concrete: buy food, sleep, take short work, avoid remote quests.
2. **Know this before you leave town**
   - The system or route rule the player must understand before acting.
3. **Watch out for**
   - Common traps, overcommitments, false vanilla assumptions, or recovery risks.
4. **What changed from vanilla Skyrim**
   - The smallest useful explanation of Requiem, Noxrim, survival, economy,
     follower, map, or quest behavior.
5. **Source notes**
   - Plain-English support labels only. Exact paths, plugin names, settings
     keys, and verification debt belong in proof or maintainer views.

Quest arcs and region guides may start with one short mood-setting paragraph,
but they still need the practical pattern above.

## Public And Private Terms

Allowed in normal player-facing copy:

- `Authoria`
- `Requiem`
- `Noxrim`, only for the NoxCrab mod family
- familiar Skyrim terms such as inns, roads, dungeons, followers, towns, quests,
  cold, fatigue, and food

Keep these out of normal player copy unless the page is a proof or maintainer
view:

- `ARR install`
- `ARSE profile`
- `MO2`
- `load order`
- `plugin`
- `generated output`
- `late patch layer`
- exact local file paths
- raw settings keys
- verification TODOs

When a technical source matters, translate it:

- Use "local survival settings" instead of a file path.
- Use "Authoria's Requiem setup" instead of a plugin list.
- Use "map marker settings" instead of a raw INI key.
- Use "Source notes" instead of "Provenance" or "Evidence."

## Source Notes

Source notes should reassure the player without making them read the machinery.

Good:

- "Supported by Authoria's local survival settings and map marker setup."
- "Supported by the local Requiem configuration and follower balance settings."
- "Source details are available in the maintainer evidence view."

Avoid in player pages:

- full Windows paths
- plugin filenames
- raw config keys
- "needs xEdit check"
- "confirm trigger behavior"
- "record verification pending"

Unfinished claims should not be public. If a page cannot support its core
advice with local evidence, keep the page as a maintainer draft.

## Before And After Examples

### Home Lead

Before:

> This guide turns the old gameplay checklist into evidence-backed articles
> about progression, combat, survival, companions, routes, quest arcs, and
> concrete local settings.

After:

> Authoria still begins in Skyrim, but the first week asks for more care than a
> vanilla run. Eat before long roads, sleep before cold weather, use towns as
> anchors, and treat early dungeons as a decision rather than a reflex.

### Evidence Copy

Before:

> The public surface is a play guide, not a rendered mod list.

After:

> The Almanac gives you the play advice first. Source notes are there when you
> want to know what local settings or Authoria evidence support the guidance.

### Region Guidance

Before:

> Riverwood and Whiterun should be treated as the first stabilization corridor
> because they let the player test the core loop without committing to a remote
> worldspace.

After:

> Use Riverwood and Whiterun as your first safety loop. Rest, sell, buy food,
> take short work, and learn which roads you can survive before you chase a
> dungeon marker.

### Quest Arc Guidance

Before:

> This quest-arc guide frames the content as a campaign decision. It should
> connect entry timing, route burden, combat profile, and local patch authority.

After:

> Treat this arc like a campaign commitment. Go in when your character can
> survive the trip, recover after long fights, and stay away from familiar town
> support for a while.

## Review Checklist

Before publishing a page in the Almanac, confirm:

- It is at least `evidence-backed`.
- It starts with useful player action, not source explanation.
- It explains what changed from vanilla Skyrim.
- It warns about at least one likely bad assumption.
- It gives recovery or delay advice where the player can overcommit.
- It does not expose verification TODOs.
- It does not expose exact paths, plugin names, or raw settings keys in normal
  guide copy.
- Source notes are short, human, and secondary.
