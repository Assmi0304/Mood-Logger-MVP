"use client";

interface NoteInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function NoteInput({ value, onChange }: NoteInputProps) {
  return (
    <div className="w-full">
      <label
        htmlFor="mood-note"
        className="mb-3 block font-sans text-sm text-secondaryText"
      >
        A few words about your day
      </label>
      <textarea
        id="mood-note"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write how your day felt…"
        rows={4}
        className="w-full resize-none rounded-card border border-border bg-card/40 p-4 font-sans text-sm text-primaryText placeholder:text-secondaryText/70 outline-none transition-all duration-200 ease-soft focus:-translate-y-0.5 focus:border-accent focus:shadow-soft"
      />
    </div>
  );
}
