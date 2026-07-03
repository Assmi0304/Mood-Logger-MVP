"use client";

import { useEffect, useState } from "react";
import { getThoughtOfTheDay, refreshQuote } from "@/lib/quotes";
import { Quote } from "@/types";

export default function ThoughtPage() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [fromFallback, setFromFallback] = useState(false);

  useEffect(() => {
    let active = true;
    getThoughtOfTheDay().then((result) => {
      if (!active) return;
      setQuote(result.quote);
      setFromFallback(result.fromFallback);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  async function handleRefresh() {
    setLoading(true);
    const result = await refreshQuote();
    setQuote(result.quote);
    setFromFallback(result.fromFallback);
    setLoading(false);
  }

  return (
    <main className="flex min-h-screen w-full justify-center bg-background px-4 py-10">
      <div className="flex w-full max-w-[440px] flex-col gap-8">
        <header className="text-center">
          <h1 className="font-serif text-4xl text-primaryText">Thought of the Day</h1>
          <p className="mt-2 font-sans text-sm text-secondaryText">
            A little something to sit with today.
          </p>
        </header>

        <section className="flex min-h-[180px] flex-col items-center justify-center gap-4 rounded-card border border-border bg-card/40 p-8 text-center shadow-soft">
          {loading ? (
            <p className="font-sans text-sm text-secondaryText">Finding a thought…</p>
          ) : (
            <>
              <p className="font-serif text-xl leading-relaxed text-primaryText">
                “{quote?.quote}”
              </p>
              <p className="font-sans text-sm text-secondaryText">— {quote?.author}</p>
            </>
          )}
        </section>

        {fromFallback && !loading && (
          <p className="text-center font-sans text-[11px] text-secondaryText/70">
            Showing an offline thought — couldn&apos;t reach the quote service.
          </p>
        )}

        <button
          type="button"
          onClick={handleRefresh}
          className="w-full rounded-card border border-accent bg-transparent py-3 font-sans text-sm font-medium text-accent transition-all duration-200 ease-soft hover:-translate-y-0.5 hover:bg-accent hover:text-background hover:shadow-soft"
        >
          New quote
        </button>
      </div>
    </main>
  );
}
