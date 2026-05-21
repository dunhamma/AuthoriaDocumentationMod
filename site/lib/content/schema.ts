export type ReferenceKind =
  | "systemArticle"
  | "companionArticle"
  | "regionGuide"
  | "questArcGuide"
  | "presetFactReference"
  | "evidenceDossier";

export type ReferenceSection =
  | "start-here"
  | "progression"
  | "combat"
  | "survival"
  | "companions"
  | "regions"
  | "quest-arcs"
  | "settings"
  | "evidence";

export type EvidenceItem = {
  label: string;
  path: string;
  note: string;
};

export type SettingQuote = {
  factId: string;
  label: string;
  value: string;
  interpretation: string;
};

export type EvidenceDossierItem = {
  publicLabel: string;
  internalSources: string[];
};

export type InsightSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type ReferenceEntry = {
  slug: string;
  kind: ReferenceKind;
  section: ReferenceSection;
  title: string;
  strapline: string;
  summary: string;
  questionsAnswered: string[];
  tags: string[];
  playerExperience: string[];
  progressionImpact: string[];
  practicalGuidance: string[];
  uxTouchpoints: string[];
  evidenceDossier: EvidenceDossierItem[];
  settingQuotes: SettingQuote[];
  sections: InsightSection[];
  evidence: EvidenceItem[];
  verificationNotes: string[];
  related: string[];
};

export type SectionDefinition = {
  slug: ReferenceSection;
  title: string;
  description: string;
};
