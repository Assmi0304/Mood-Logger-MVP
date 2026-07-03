import type { Metadata } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import "../styles/globals.css";

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dm-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mood Logger",
  description: "A calm, minimal daily mood and journaling app.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${dmSerif.variable} ${inter.variable} bg-background font-sans text-primaryText antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
