"use client";

import { useEffect, useState } from "react";
import MoodSelector from "@/components/MoodSelector";
import NoteInput from "@/components/NoteInput";
import SaveButton from "@/components/SaveButton";
import EntryList from "@/components/EntryList";
import { Mood, MoodEntry } from "@/types";
import { addEntry, generateId, getEntries } from "@/lib/storage";

export default function TrackerPage() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [note, setNote] = useState("");
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [saveTick, setSaveTick] = useState(0);

  useEffect(() => {
    setEntries(getEntries());
  }, []);

  function handleSave() {
    if (!selectedMood) return;

    const newEntry: MoodEntry = {
      id: generateId(),
      mood: selectedMood,
      note: note.trim(),
      createdAt: new Date().toISOString(),
    };

    const updated = addEntry(newEntry);
    setEntries(updated);
    setSelectedMood(null);
    setNote("");
    setSaveTick((tick) => tick + 1);
  }

  return (
    <main className="flex min-h-screen w-full justify-center bg-background px-4 py-10">
      <div className="flex w-full max-w-[440px] flex-col gap-10">
        <header className="text-center">
          <h1 className="font-serif text-4xl text-primaryText">🪵 Mood Logger</h1>
          <p className="mt-2 font-sans text-sm text-secondaryText">
            A quiet place to note how today felt.
          </p>
        </header>

        <section className="flex flex-col gap-6 rounded-card border border-border bg-card/30 p-6 shadow-soft">
          <MoodSelector selectedMood={selectedMood} onSelect={setSelectedMood} />
          <NoteInput value={note} onChange={setNote} />
          <SaveButton
            moodSelected={selectedMood !== null}
            onSave={handleSave}
            saveTick={saveTick}
          />
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-serif text-2xl text-primaryText">Your entries</h2>
          <EntryList entries={entries} />
        </section>
      </div>
    </main>
  );
}
