export type ReferenceKind = "system" | "experience" | "mod";

export type EvidenceItem = {
  label: string;
  path: string;
  note: string;
};

export type InsightSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type ReferenceEntry = {
  slug: string;
  kind: ReferenceKind;
  title: string;
  strapline: string;
  summary: string;
  questionsAnswered: string[];
  tags: string[];
  playerExperience: string[];
  progressionImpact: string[];
  uxTouchpoints: string[];
  implementationChain: {
    upstream: string[];
    requiem: string[];
    authoria: string[];
  };
  sections: InsightSection[];
  evidence: EvidenceItem[];
  related: string[];
};

