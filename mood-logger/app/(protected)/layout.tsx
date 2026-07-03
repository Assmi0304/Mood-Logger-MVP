"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { getSession } from "@/lib/auth";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!getSession()) {
      router.replace("/");
      return;
    }
    setChecked(true);
  }, [router]);

  // Same "Loading…" markup renders on server and on the first client pass,
  // so there's no hydration mismatch — real content only mounts once
  // we've confirmed a session exists.
  if (!checked) {
    return (
      <main className="flex min-h-screen w-full items-center justify-center bg-background">
        <p className="font-sans text-sm text-secondaryText">Loading…</p>
      </main>
    );
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
