import { MoodEntry } from "@/types";

const STORAGE_KEY = "mood-entries";

/**
 * Reads all mood entries from localStorage.
 * Safe for SSR — returns an empty array if window is unavailable
 * or if stored data is missing/corrupted.
 */
export function getEntries(): MoodEntry[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as MoodEntry[];
  } catch {
    return [];
  }
}

/**
 * Persists the full entries array to localStorage.
 */
function saveEntries(entries: MoodEntry[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

/**
 * Adds a new entry (newest first) and persists it.
 * Returns the updated list.
 */
export function addEntry(entry: MoodEntry): MoodEntry[] {
  const current = getEntries();
  const updated = [entry, ...current];
  saveEntries(updated);
  return updated;
}

/**
 * Generates a reasonably unique id without extra dependencies.
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
