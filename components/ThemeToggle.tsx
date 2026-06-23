// ─── components/ThemeToggle.tsx ───────────────────────────────────────────────
// A smooth sun/moon toggle button.
// Uses next-themes' useTheme hook to read and set the current theme.
// The icon swaps with a small scale transition for a polished feel.
// ─────────────────────────────────────────────────────────────────────────────

"use client"; // Must be a Client Component — uses useState/useEffect

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  // Avoid hydration mismatch: don't render the icon until client-side
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Render a placeholder of the same size to prevent layout shift
    return <div className="w-9 h-9" aria-hidden />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={[
        "w-9 h-9 rounded-full flex items-center justify-center",
        "transition-all duration-300 ease-in-out",
        // Light-mode ring
        "border border-[var(--border)]",
        // Background subtlety
        "bg-[var(--bg-secondary)] hover:bg-[var(--accent)] hover:border-[var(--accent)]",
        "text-[var(--text-secondary)] hover:text-white",
        "focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
      ].join(" ")}
    >
      {/*
        Scale + opacity transition for the icon swap.
        The "key" prop forces a remount on theme change,
        triggering the CSS transition every time.
      */}
      <span
        key={isDark ? "moon" : "sun"}
        className="transition-all duration-300 scale-100 opacity-100"
      >
        {isDark ? <Sun size={16} /> : <Moon size={16} />}
      </span>
    </button>
  );
}
