"use client";

import { Mood, MoodOption } from "@/types";

const MOOD_OPTIONS: MoodOption[] = [
  { value: "happy", emoji: "😄", label: "Happy" },
  { value: "neutral", emoji: "😐", label: "Neutral" },
  { value: "sad", emoji: "😔", label: "Sad" },
  { value: "angry", emoji: "😡", label: "Angry" },
];

interface MoodSelectorProps {
  selectedMood: Mood | null;
  onSelect: (mood: Mood) => void;
}

export default function MoodSelector({
  selectedMood,
  onSelect,
}: MoodSelectorProps) {
  return (
    <div className="w-full">
      <p className="mb-3 font-sans text-sm text-secondaryText">
        How are you feeling today?
      </p>
      <div className="grid grid-cols-4 gap-3">
        {MOOD_OPTIONS.map((option) => {
          const isActive = selectedMood === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelect(option.value)}
              aria-pressed={isActive}
              className={`flex flex-col items-center justify-center gap-1 rounded-card border py-4 transition-all duration-200 ease-soft hover:-translate-y-0.5 hover:shadow-soft ${
                isActive
                  ? "border-accent bg-highlight/40 shadow-soft"
                  : "border-border bg-card/60"
              }`}
            >
              <span className="text-2xl" role="img" aria-label={option.label}>
                {option.emoji}
              </span>
              <span className="font-sans text-xs text-secondaryText">
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
