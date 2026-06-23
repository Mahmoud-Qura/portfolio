// ─── components/Header.tsx ───────────────────────────────────────────────────
// Sticky top navigation bar:
//  • Logo / name on the left
//  • Nav links in the center (hidden on mobile, shown in mobile menu)
//  • ThemeToggle on the right
//  • Subtle border appears when the user scrolls down (glass effect)
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { NAV_LINKS, DEV } from "@/lib/constants";

export default function Header() {
  const pathname = usePathname();

  // Track scroll position to add border on scroll
  const [scrolled, setScrolled] = useState(false);
  // Mobile menu open state
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header
      className={[
        "sticky top-0 z-50 w-full",
        "bg-[var(--bg-primary)]/90 backdrop-blur-md",
        "transition-all duration-300",
        scrolled
          ? "border-b border-[var(--border)] shadow-sm"
          : "border-b border-transparent",
      ].join(" ")}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16">

        {/* ── Logo / Name ─────────────────────────────────────────────── */}
        <Link
          href="/"
          className="font-display text-xl font-semibold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors duration-200"
        >
          {/* First initial in accent color for a subtle logo feel */}
          <span className="text-[var(--accent)]">{DEV.name.charAt(0)}</span>
          {DEV.name.slice(1)}
        </Link>

        {/* ── Desktop Nav ─────────────────────────────────────────────── */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, href }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={[
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                  active
                    ? "bg-[var(--accent)] text-white"            // active pill
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]",
                ].join(" ")}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* ── Right Side: Theme Toggle + Mobile Hamburger ──────────────── */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle mobile menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu Drawer ─────────────────────────────────────────── */}
      <div
        className={[
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <nav className="flex flex-col px-5 pb-5 pt-2 gap-1 border-t border-[var(--border)]">
          {NAV_LINKS.map(({ label, href }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={[
                  "px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                  active
                    ? "bg-[var(--accent)] text-white"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]",
                ].join(" ")}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
