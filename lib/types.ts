export interface Company {
  id: string;
  name: string;
  website: string;
  sector: string;
  stage: string;
  location: string;
  description: string;
  tags: string[];
}

export interface EnrichmentSource {
  url: string;
  timestamp: string;
}

export interface EnrichmentResult {
  summary: string;
  whatTheyDo: string[];
  keywords: string[];
  derivedSignals: string[];
  sources: EnrichmentSource[];
}

export interface ThesisScore {
  score: number;
  explanations: string[];
}

export interface SavedSearch {
  id: string;
  name: string;
  query: string;
  filters: {
    sector: string;
    stage: string;
    location: string;
  };
  createdAt: string;
}

export interface SavedList {
  id: string;
  name: string;
  companyIds: string[];
  createdAt: string;
}
