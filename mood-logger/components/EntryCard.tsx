import { MoodEntry } from "@/types";

const MOOD_EMOJI: Record<MoodEntry["mood"], string> = {
  happy: "😄",
  neutral: "😐",
  sad: "😔",
  angry: "😡",
};

function formatDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface EntryCardProps {
  entry: MoodEntry;
}

export default function EntryCard({ entry }: EntryCardProps) {
  return (
    <div className="rounded-card border border-border bg-card/50 p-4 shadow-soft transition-all duration-200 ease-soft hover:-translate-y-0.5 hover:shadow-softLift">
      <div className="flex items-start gap-3">
        <span className="text-2xl" role="img" aria-label={entry.mood}>
          {MOOD_EMOJI[entry.mood]}
        </span>
        <div className="flex-1">
          <p className="font-sans text-xs text-secondaryText">
            {formatDate(entry.createdAt)}
          </p>
          {entry.note && (
            <p className="mt-1 font-sans text-sm leading-relaxed text-primaryText">
              {entry.note}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
