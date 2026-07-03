"use client";

import { useEffect, useState } from "react";
import { getEntries } from "@/lib/storage";
import { getMostCommonMood, getStreak, getTotalEntries } from "@/lib/stats";
import { getSession } from "@/lib/auth";
import { Mood, MoodEntry, Session } from "@/types";

const MOOD_EMOJI: Record<Mood, string> = {
  happy: "😄",
  neutral: "😐",
  sad: "😔",
  angry: "😡",
};

export default function ProfilePage() {
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    setEntries(getEntries());
    setSession(getSession());
  }, []);

  const total = getTotalEntries(entries);
  const mostCommon = getMostCommonMood(entries);
  const streak = getStreak(entries);

  return (
    <main className="flex min-h-screen w-full justify-center bg-background px-4 py-10">
      <div className="flex w-full max-w-[440px] flex-col gap-8">
        <header className="text-center">
          <h1 className="font-serif text-4xl text-primaryText">Profile</h1>
          <p className="mt-2 font-sans text-sm text-secondaryText">
            {session ? `Signed in as ${session.name}` : ""}
          </p>
        </header>

        <section className="grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center gap-1 rounded-card border border-border bg-card/40 p-4 shadow-soft">
            <span className="font-serif text-2xl text-primaryText">{total}</span>
            <span className="text-center font-sans text-[11px] text-secondaryText">
              Total entries
            </span>
          </div>
          <div className="flex flex-col items-center gap-1 rounded-card border border-border bg-card/40 p-4 shadow-soft">
            <span className="text-2xl">{mostCommon ? MOOD_EMOJI[mostCommon] : "—"}</span>
            <span className="text-center font-sans text-[11px] text-secondaryText">
              Most common mood
            </span>
          </div>
          <div className="flex flex-col items-center gap-1 rounded-card border border-border bg-card/40 p-4 shadow-soft">
            <span className="font-serif text-2xl text-primaryText">{streak}</span>
            <span className="text-center font-sans text-[11px] text-secondaryText">
              Day streak
            </span>
          </div>
        </section>

        {total === 0 && (
          <p className="text-center font-sans text-sm text-secondaryText">
            Log your first mood on the Tracker page to see your stats here.
          </p>
        )}
      </div>
    </main>
  );
}
