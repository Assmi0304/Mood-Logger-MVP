import { Mood, MoodEntry } from "@/types";

export function getTotalEntries(entries: MoodEntry[]): number {
  return entries.length;
}

export function getMostCommonMood(entries: MoodEntry[]): Mood | null {
  if (entries.length === 0) return null;

  const counts: Record<Mood, number> = {
    happy: 0,
    neutral: 0,
    sad: 0,
    angry: 0,
  };

  for (const entry of entries) {
    counts[entry.mood] += 1;
  }

  return (Object.keys(counts) as Mood[]).reduce((best, mood) =>
    counts[mood] > counts[best] ? mood : best,
  );
}

function toDayString(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

/**
 * Counts consecutive days (ending today or yesterday) with at least one
 * entry. Today is allowed to be "missing" without breaking the streak,
 * since the day isn't over yet — it only resets once a full day is skipped.
 */
export function getStreak(entries: MoodEntry[]): number {
  if (entries.length === 0) return 0;

  const uniqueDays = new Set(entries.map((e) => toDayString(e.createdAt)));
  const cursor = new Date();

  if (!uniqueDays.has(toDayString(cursor.toISOString()))) {
    cursor.setDate(cursor.getDate() - 1);
  }

  let streak = 0;
  while (uniqueDays.has(toDayString(cursor.toISOString()))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}
