import { EnrichmentResult } from "./types";

type CacheEntry = {
  value: EnrichmentResult;
  createdAt: number;
};

const CACHE_TTL_MS = 1000 * 60 * 60 * 12;
const cache = new Map<string, CacheEntry>();

export function getCachedEnrichment(key: string): EnrichmentResult | null {
  const entry = cache.get(key);
  if (!entry) {
    return null;
  }
  if (Date.now() - entry.createdAt > CACHE_TTL_MS) {
    cache.delete(key);
    return null;
  }
  return entry.value;
}

export function setCachedEnrichment(key: string, value: EnrichmentResult) {
  cache.set(key, { value, createdAt: Date.now() });
}
