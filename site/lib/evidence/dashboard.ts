import { getArrInstallData, type ArrInstallData } from "@/lib/arr/install";
import { getPresetFacts } from "@/lib/arr/presets";
import {
  getArrRecordEvidence,
  type ArrRecordEvidenceData,
} from "@/lib/arr/record-evidence";
import { getArrSnapshot, type ArrSnapshot } from "@/lib/arr/snapshot";
import {
  getAllEntries,
  sectionDefinitions,
} from "@/lib/content/catalog";
import { getArticleHref } from "@/lib/content/routes";
import type {
  ReferenceEntry,
  SectionDefinition,
} from "@/lib/content/schema";
import {
  getArticleVerification,
  getArticleVerificationSummary,
  type ArticleVerificationDefinition,
  type ArticleVerificationResult,
  type ArticleVerificationState,
} from "@/lib/content/verification";

export type ArticleVerificationSummaryItem = ArticleVerificationDefinition & {
  count: number;
};

export type EvidenceDashboardCounts = {
  articles: number;
  settingQuotes: number;
  evidenceLinks: number;
  seededArticles: number;
  highConfidenceFacts: number;
};

export type EvidenceArticleCoverage = SectionDefinition & {
  articleCount: number;
  stateCounts: ArticleVerificationSummaryItem[];
};

export type EvidenceVerificationQueueItem = {
  slug: string;
  title: string;
  href: string;
  firstVerificationNote: string;
  verification: ArticleVerificationResult;
};

export type EvidenceDashboard = {
  install: ArrInstallData;
  recordEvidence: ArrRecordEvidenceData;
  snapshot: ArrSnapshot;
  counts: EvidenceDashboardCounts;
  verificationSummary: ArticleVerificationSummaryItem[];
  articleCoverage: EvidenceArticleCoverage[];
  verificationQueue: EvidenceVerificationQueueItem[];
};

function countSettingQuotes(entries: ReferenceEntry[]) {
  return entries.reduce(
    (total, entry) => total + entry.settingQuotes.length,
    0,
  );
}

function countEvidenceLinks(entries: ReferenceEntry[]) {
  return entries.reduce((total, entry) => total + entry.evidence.length, 0);
}

function buildArticleCoverage(
  entries: ReferenceEntry[],
): EvidenceArticleCoverage[] {
  return sectionDefinitions.map((section) => {
    const sectionEntries = entries.filter(
      (entry) => entry.section === section.slug,
    );

    return {
      ...section,
      articleCount: sectionEntries.length,
      stateCounts: getArticleVerificationSummary(sectionEntries).filter(
        (item) => item.count > 0,
      ),
    };
  });
}

function buildVerificationQueue(
  entries: ReferenceEntry[],
): EvidenceVerificationQueueItem[] {
  return entries
    .filter((entry) => entry.verificationNotes.length > 0)
    .slice(0, 10)
    .map((entry) => ({
      slug: entry.slug,
      title: entry.title,
      href: getArticleHref(entry),
      firstVerificationNote: entry.verificationNotes[0],
      verification: getArticleVerification(entry),
    }));
}

function countState(
  summary: ArticleVerificationSummaryItem[],
  state: ArticleVerificationState,
) {
  return summary.find((item) => item.state === state)?.count ?? 0;
}

export async function getEvidenceDashboard(): Promise<EvidenceDashboard> {
  const [install, recordEvidence, snapshot, facts] = await Promise.all([
    getArrInstallData(),
    getArrRecordEvidence(),
    getArrSnapshot(),
    getPresetFacts(),
  ]);
  const entries = getAllEntries();
  const verificationSummary = getArticleVerificationSummary(entries);
  const highConfidenceFacts = facts.filter(
    (fact) => fact.confidence === "high",
  );

  return {
    install,
    recordEvidence,
    snapshot,
    counts: {
      articles: entries.length,
      settingQuotes: countSettingQuotes(entries),
      evidenceLinks: countEvidenceLinks(entries),
      seededArticles: countState(verificationSummary, "seeded"),
      highConfidenceFacts: highConfidenceFacts.length,
    },
    verificationSummary,
    articleCoverage: buildArticleCoverage(entries),
    verificationQueue: buildVerificationQueue(entries),
  };
}
