import type {
  ArticlePublicationState,
  ReferenceEntry,
} from "@/lib/content/schema";

export type ArticleVerificationState = ArticlePublicationState;

export type ArticleVerificationDefinition = {
  state: ArticleVerificationState;
  label: string;
  description: string;
};

export type ArticleVerificationOverride = {
  state: ArticleVerificationState;
  note: string;
};

export type ArticleVerificationResult = ArticleVerificationDefinition & {
  source: "explicit" | "derived";
  note: string;
};

export const articleVerificationDefinitions: ArticleVerificationDefinition[] = [
  {
    state: "seeded",
    label: "Seeded",
    description:
      "Prose exists, but verification notes remain or the local support is still too broad.",
  },
  {
    state: "evidence-backed",
    label: "Evidence-backed",
    description: "Local files, presets, or output folders support the core claims.",
  },
  {
    state: "record-verified",
    label: "Record-verified",
    description:
      "xEdit/plugin records or exported record evidence support the risky claims.",
  },
  {
    state: "playtested",
    label: "Playtested",
    description: "In-game route or behavior checks have confirmed the risky claims.",
  },
];

export const articleVerificationOverrides: Record<
  string,
  ArticleVerificationOverride
> = {
  "first-session-setup": {
    state: "evidence-backed",
    note: "Foundation onboarding page has local preset support, while remaining checks stay in verification notes.",
  },
  "controls-hud-and-interaction": {
    state: "evidence-backed",
    note: "Controls and HUD guidance is grounded in local MCM, keybind, and interaction presets.",
  },
  "character-creation-and-starting-choices": {
    state: "evidence-backed",
    note: "Core progression framing is backed by local Experience and Static Skill Leveling presets.",
  },
  "requiem-progression": {
    state: "evidence-backed",
    note: "Local Requiem and progression presets support the core claims; record-specific checks remain queued.",
  },
  "route-readiness-and-return-rules": {
    state: "evidence-backed",
    note: "Route guidance is backed by local travel, map, economy, and follower settings.",
  },
  "combat-rhythm-and-dodge-commitment": {
    state: "evidence-backed",
    note: "Combat guidance is grounded in local dodge, movement, wounds, and recovery control presets.",
  },
  "survival-seasons-and-travel": {
    state: "evidence-backed",
    note: "Survival and travel claims are grounded in local SunHelm, camping, inn, map, and clock presets.",
  },
  "followers-and-party-power": {
    state: "evidence-backed",
    note: "Shared follower-power guidance is backed by local follower-balance and party-management surfaces.",
  },
  "preset-facts": {
    state: "evidence-backed",
    note: "This entry is directly backed by extracted runtime preset facts.",
  },
  "authoria-evidence-dossier": {
    state: "evidence-backed",
    note: "This maintainer entry describes the evidence model rather than making route-specific gameplay claims.",
  },
};

function getArticleVerificationDefinitionRequired(
  state: ArticleVerificationState,
) {
  const definition = articleVerificationDefinitions.find(
    (item) => item.state === state,
  );

  if (!definition) {
    throw new Error(`Unknown article verification state: ${state}`);
  }

  return definition;
}

export function getArticleVerificationState(entry: ReferenceEntry) {
  return getArticleVerification(entry).state;
}

export function getArticleVerification(
  entry: ReferenceEntry,
): ArticleVerificationResult {
  if (entry.publicationStatus) {
    return {
      ...getArticleVerificationDefinitionRequired(entry.publicationStatus),
      source: "explicit",
      note: "Defined by article publication status.",
    };
  }

  const explicitState = articleVerificationOverrides[entry.slug];
  if (explicitState) {
    return {
      ...getArticleVerificationDefinitionRequired(explicitState.state),
      source: "explicit",
      note: explicitState.note,
    };
  }

  if (entry.verificationNotes.length > 0) {
    return {
      ...getArticleVerificationDefinitionRequired("seeded"),
      source: "derived",
      note: "Derived from open verification notes.",
    };
  }

  if (entry.settingQuotes.length > 0 || entry.evidence.length > 0) {
    return {
      ...getArticleVerificationDefinitionRequired("evidence-backed"),
      source: "derived",
      note: "Derived from attached setting quotes or local evidence links.",
    };
  }

  return {
    ...getArticleVerificationDefinitionRequired("seeded"),
    source: "derived",
    note: "Derived from missing explicit evidence status.",
  };
}

export function getArticleVerificationDefinition(
  state: ArticleVerificationState,
) {
  return articleVerificationDefinitions.find((item) => item.state === state);
}

export function getArticleVerificationSummary(entries: ReferenceEntry[]) {
  const counts = new Map<ArticleVerificationState, number>(
    articleVerificationDefinitions.map((definition) => [
      definition.state,
      0,
    ]),
  );

  for (const entry of entries) {
    const state = getArticleVerificationState(entry);
    counts.set(state, (counts.get(state) ?? 0) + 1);
  }

  return articleVerificationDefinitions.map((definition) => ({
    ...definition,
    count: counts.get(definition.state) ?? 0,
  }));
}
