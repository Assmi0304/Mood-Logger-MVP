import { Session, StoredUser } from "@/types";

const USER_KEY = "mood-user";
const SESSION_KEY = "mood-session";

export function getStoredUser(): StoredUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredUser;
  } catch {
    return null;
  }
}

function saveStoredUser(user: StoredUser): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Session;
  } catch {
    return null;
  }
}

function setSession(session: Session): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function logout(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SESSION_KEY);
}

export type AuthResult =
  | { ok: true; created: boolean }
  | { ok: false; error: string };

/**
 * Single-profile local "auth": the first submission on this device creates
 * the profile (name + password), every submission after that must match
 * what's stored. This is intentionally NOT secure — it's a soft local gate,
 * not real authentication, per the app's no-backend constraint.
 */
export function authenticate(name: string, password: string): AuthResult {
  const trimmedName = name.trim();
  if (!trimmedName || !password) {
    return { ok: false, error: "Name and password are required." };
  }

  const existing = getStoredUser();

  if (!existing) {
    saveStoredUser({ name: trimmedName, password });
    setSession({ name: trimmedName });
    return { ok: true, created: true };
  }

  if (
    existing.name.toLowerCase() === trimmedName.toLowerCase() &&
    existing.password === password
  ) {
    setSession({ name: existing.name });
    return { ok: true, created: false };
  }

  return {
    ok: false,
    error:
      existing.name.toLowerCase() === trimmedName.toLowerCase()
        ? "Incorrect password."
        : "This device already has a profile under a different name.",
  };
}
