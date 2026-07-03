"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authenticate, getSession, getStoredUser } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isNewProfile, setIsNewProfile] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (getSession()) {
      router.replace("/tracker");
      return;
    }
    setIsNewProfile(!getStoredUser());
    setReady(true);
  }, [router]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const result = authenticate(name, password);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setError("");
    router.push("/tracker");
  }

  if (!ready) {
    return (
      <main className="flex min-h-screen w-full items-center justify-center bg-background">
        <p className="font-sans text-sm text-secondaryText">Loading…</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-background px-4">
      <div className="flex w-full max-w-[380px] flex-col gap-8">
        <header className="text-center">
          <h1 className="font-serif text-4xl text-primaryText">🪵 Mood Logger</h1>
          <p className="mt-2 font-sans text-sm text-secondaryText">
            {isNewProfile
              ? "Set up your local profile to begin."
              : "Welcome back. Sign in to continue."}
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-card border border-border bg-card/30 p-6 shadow-soft"
        >
          <div>
            <label
              htmlFor="name"
              className="mb-1 block font-sans text-xs text-secondaryText"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
              className="w-full rounded-card border border-border bg-background/60 p-3 font-sans text-sm text-primaryText outline-none transition-all duration-200 ease-soft focus:-translate-y-0.5 focus:border-accent focus:shadow-soft"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block font-sans text-xs text-secondaryText"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isNewProfile ? "Choose a password" : "Enter your password"}
              required
              className="w-full rounded-card border border-border bg-background/60 p-3 font-sans text-sm text-primaryText outline-none transition-all duration-200 ease-soft focus:-translate-y-0.5 focus:border-accent focus:shadow-soft"
            />
          </div>

          {error && <p className="font-sans text-xs text-accent">{error}</p>}

          <button
            type="submit"
            className="mt-2 w-full rounded-card border border-accent bg-accent py-3 font-sans text-sm font-medium text-background transition-all duration-200 ease-soft hover:-translate-y-0.5 hover:shadow-soft"
          >
            {isNewProfile ? "Create profile & continue" : "Sign in"}
          </button>

          <p className="text-center font-sans text-[11px] text-secondaryText/80">
            Stored locally on this device only — not secure, just a soft gate.
          </p>
        </form>
      </div>
    </main>
  );
}
