import { Quote } from "@/types";

// Small local fallback so the page still works if the API is unreachable
// (offline, rate-limited, CORS, etc.) — the API call is still the primary path.
const FALLBACK_QUOTES: Quote[] = [
  {
    quote:
      "Feelings are much like waves: we can't stop them from coming, but we can choose which one to surf.",
    author: "Jonatan Mårtensson",
  },
  {
    quote: "You don't have to control your thoughts. You just have to stop letting them control you.",
    author: "Dan Millman",
  },
  {
    quote: "Almost everything will work again if you unplug it for a few minutes, including you.",
    author: "Anne Lamott",
  },
  { quote: "The only way out is through.", author: "Robert Frost" },
  { quote: "Be gentle with yourself. You're doing the best you can.", author: "Unknown" },
  { quote: "This too shall pass.", author: "Persian Proverb" },
  { quote: "Small steps, every day.", author: "Unknown" },
];

function pickFallback(): Quote {
  return FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
}

interface QuoteResult {
  quote: Quote;
  fromFallback: boolean;
}

/**
 * Fetches a random quote from a free, key-less public API. Falls back to a
 * local quote (and flags it via fromFallback) if the request fails.
 */
export async function fetchQuote(): Promise<QuoteResult> {
  try {
    const res = await fetch("https://dummyjson.com/quotes/random");
    if (!res.ok) throw new Error("Bad response");
    const data = await res.json();
    if (!data?.quote || !data?.author) throw new Error("Malformed response");
    return { quote: { quote: data.quote, author: data.author }, fromFallback: false };
  } catch {
    return { quote: pickFallback(), fromFallback: true };
  }
}

const QUOTE_CACHE_PREFIX = "mood-quote-";

function todayKey(): string {
  const now = new Date();
  return `${QUOTE_CACHE_PREFIX}${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}

/**
 * Returns today's quote — cached in localStorage so it stays the same for
 * the whole day, fetching a fresh one only if today doesn't have one yet.
 */
export async function getThoughtOfTheDay(): Promise<QuoteResult> {
  if (typeof window === "undefined") {
    return { quote: pickFallback(), fromFallback: true };
  }

  const key = todayKey();
  const cached = window.localStorage.getItem(key);
  if (cached) {
    try {
      return { quote: JSON.parse(cached) as Quote, fromFallback: false };
    } catch {
      // fall through and refetch
    }
  }

  const result = await fetchQuote();
  window.localStorage.setItem(key, JSON.stringify(result.quote));
  return result;
}

/**
 * Forces a brand-new random quote (used by the "New quote" button) and
 * updates today's cache so a page refresh keeps showing this new pick.
 */
export async function refreshQuote(): Promise<QuoteResult> {
  const result = await fetchQuote();
  if (typeof window !== "undefined") {
    window.localStorage.setItem(todayKey(), JSON.stringify(result.quote));
  }
  return result;
}
