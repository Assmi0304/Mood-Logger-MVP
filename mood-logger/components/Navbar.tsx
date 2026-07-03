"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getSession, logout } from "@/lib/auth";
import { Session } from "@/types";

const LINKS = [
  { href: "/tracker", label: "Tracker" },
  { href: "/thought", label: "Thought of the Day" },
  { href: "/profile", label: "Profile" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);

  // Read session client-side only, after mount, to avoid SSR/client mismatch.
  useEffect(() => {
    setSession(getSession());
  }, []);

  function handleLogout() {
    logout();
    router.push("/");
  }

  return (
    <nav className="w-full border-b border-border bg-card/40">
      <div className="mx-auto flex w-full max-w-[440px] items-center justify-between px-4 py-3">
        <div className="flex gap-4">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-sans text-xs transition-colors duration-200 ease-soft ${
                pathname === link.href
                  ? "font-semibold text-accent"
                  : "text-secondaryText hover:text-primaryText"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="font-sans text-xs text-secondaryText transition-colors duration-200 ease-soft hover:text-accent"
        >
          Log out{session ? ` (${session.name})` : ""}
        </button>
      </div>
    </nav>
  );
}
