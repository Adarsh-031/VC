import { SavedList, SavedSearch } from "./types";

const LISTS_KEY = "vc_lists";
const SEARCHES_KEY = "vc_saved_searches";
const NOTES_KEY = "vc_notes";
const ENRICHMENT_KEY = "vc_enrichment_cache";

function safeParse<T>(value: string | null, fallback: T): T {
  if (!value) {
    return fallback;
  }
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function loadLists(): SavedList[] {
  if (typeof window === "undefined") {
    return [];
  }
  return safeParse(localStorage.getItem(LISTS_KEY), [] as SavedList[]);
}

export function saveLists(lists: SavedList[]) {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem(LISTS_KEY, JSON.stringify(lists));
}

export function loadSavedSearches(): SavedSearch[] {
  if (typeof window === "undefined") {
    return [];
  }
  return safeParse(localStorage.getItem(SEARCHES_KEY), [] as SavedSearch[]);
}

export function saveSavedSearches(searches: SavedSearch[]) {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem(SEARCHES_KEY, JSON.stringify(searches));
}

export function loadNotes(): Record<string, string> {
  if (typeof window === "undefined") {
    return {};
  }
  return safeParse(localStorage.getItem(NOTES_KEY), {} as Record<string, string>);
}

export function saveNotes(notes: Record<string, string>) {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

export function loadEnrichmentCache<T>(): Record<string, T> {
  if (typeof window === "undefined") {
    return {};
  }
  return safeParse(localStorage.getItem(ENRICHMENT_KEY), {} as Record<string, T>);
}

export function saveEnrichmentCache<T>(cache: Record<string, T>) {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem(ENRICHMENT_KEY, JSON.stringify(cache));
}
