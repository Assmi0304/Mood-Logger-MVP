"use client";

import { useEffect, useState } from "react";

interface SaveButtonProps {
  moodSelected: boolean;
  onSave: () => void;
  /** Parent increments this counter after every successful save, telling
   * the button to (re)play its "boom" confirmation animation. */
  saveTick: number;
}

export default function SaveButton({
  moodSelected,
  onSave,
  saveTick,
}: SaveButtonProps) {
  const [showWarning, setShowWarning] = useState(false);
  const [shake, setShake] = useState(false);
  const [showBoom, setShowBoom] = useState(false);

  function handleClick() {
    if (!moodSelected) {
      setShowWarning(true);
      setShake(true);
      window.setTimeout(() => setShake(false), 350);
      window.setTimeout(() => setShowWarning(false), 2200);
      return;
    }
    onSave();
  }

  // Play the "boom" confirmation every time the parent bumps saveTick,
  // i.e. every time a save actually succeeds.
  useEffect(() => {
    if (saveTick === 0) return; // skip on initial mount
    setShowBoom(true);
    const hide = window.setTimeout(() => setShowBoom(false), 1400);
    return () => window.clearTimeout(hide);
  }, [saveTick]);

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={handleClick}
        className={`w-full rounded-card border border-accent bg-accent py-3 font-sans text-sm font-medium text-background transition-all duration-200 ease-soft hover:-translate-y-0.5 hover:shadow-soft active:translate-y-0 ${
          shake ? "animate-shake" : ""
        }`}
      >
        Save Entry
      </button>

      {showWarning && (
        <p className="mt-2 text-center font-sans text-xs text-accent">
          Please select a mood first 🌿
        </p>
      )}

      {showBoom && (
        <div className="pointer-events-none absolute left-1/2 top-full mt-3 -translate-x-1/2">
          <span className="inline-block animate-boomIn rounded-card border border-border bg-highlight/60 px-4 py-1.5 font-sans text-xs font-medium text-primaryText shadow-soft">
            Saved ✓
          </span>
        </div>
      )}
    </div>
  );
}
