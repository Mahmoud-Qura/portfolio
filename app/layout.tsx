// ─── app/layout.tsx ──────────────────────────────────────────────────────────
// Root layout:
//  • Wraps the entire app in next-themes' ThemeProvider (class strategy)
//  • Renders the Header + Footer around each page's {children}
//  • Sets <html> metadata (title, description, OpenGraph)
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { DEV } from "@/lib/constants";
// @ts-ignore no type declarations for CSS import
import "./globals.css";

// ── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: `${DEV.name} — Full-Stack Developer`,
    template: `%s | ${DEV.name}`,
  },
  description: `${DEV.tagline} Portfolio of ${DEV.name}, a ${DEV.title} specializing in the Full stack.`,
  keywords: ["Full-Stack Developer", "React", "Next.js", "MongoDB", "Node.js", "Portfolio"],
  authors: [{ name: DEV.name }],
  openGraph: {
    title: `${DEV.name} — Full-Stack Developer`,
    description: DEV.tagline,
    type: "website",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning prevents Next.js from complaining about
    // the class attribute being set by next-themes on the client.
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to Google Fonts for faster load */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>

      <body className="min-h-screen flex flex-col">
        {/*
          ThemeProvider from next-themes:
          - attribute="class" → adds/removes the "dark" class on <html>
          - defaultTheme="light" → initial theme on first visit
          - enableSystem → respects OS preference if user hasn't toggled yet
        */}
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          {/* Sticky header with nav + theme toggle */}
          <Header />

          {/* Each page renders here */}
          <main className="flex-1">
            {children}
          </main>

          {/* Consistent footer across all pages */}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
