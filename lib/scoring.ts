import { EnrichmentResult, ThesisScore } from "./types";

const THESIS_KEYWORDS = [
  "infra",
  "developer",
  "security",
  "automation",
  "compliance",
  "workflow",
  "data",
  "ai",
  "enterprise",
  "analytics",
  "platform",
];

export function scoreEnrichment(enrichment: EnrichmentResult | null): ThesisScore {
  if (!enrichment) {
    return { score: 0, explanations: ["Run enrichment to score this company."] };
  }

  const keywords = enrichment.keywords.map((k) => k.toLowerCase());
  const matches = THESIS_KEYWORDS.filter((keyword) =>
    keywords.some((k) => k.includes(keyword))
  );
  const score = Math.min(100, Math.round((matches.length / THESIS_KEYWORDS.length) * 100));

  const explanations = matches.length
    ? matches.map((keyword) => `Matches thesis keyword: ${keyword}`)
    : ["No thesis keyword matches detected."];

  return { score, explanations };
}
