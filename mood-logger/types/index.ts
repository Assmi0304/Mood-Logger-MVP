export type Mood = "happy" | "neutral" | "sad" | "angry";

export interface MoodEntry {
  id: string;
  mood: Mood;
  note: string;
  createdAt: string;
}

export interface MoodOption {
  value: Mood;
  emoji: string;
  label: string;
}

/** Locally-stored "account" — not secure, just a soft device-level gate. */
export interface StoredUser {
  name: string;
  password: string;
}

export interface Session {
  name: string;
}

export interface Quote {
  quote: string;
  author: string;
}
