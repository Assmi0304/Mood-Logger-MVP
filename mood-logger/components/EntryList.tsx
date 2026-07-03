import { MoodEntry } from "@/types";
import EntryCard from "./EntryCard";

interface EntryListProps {
  entries: MoodEntry[];
}

export default function EntryList({ entries }: EntryListProps) {
  if (entries.length === 0) {
    return (
      <div className="w-full rounded-card border border-dashed border-border py-10 text-center">
        <p className="font-sans text-sm text-secondaryText">
          No entries yet. Your journal will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-3">
      {entries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} />
      ))}
    </div>
  );
}
