// ─── components/Button.tsx ───────────────────────────────────────────────────
// Reusable button with two variants:
//   "primary"  → filled accent background (main CTAs)
//   "outline"  → transparent with accent border (secondary actions)
//
// Also supports an "href" prop to render as a Next.js <Link>.
// ─────────────────────────────────────────────────────────────────────────────

import Link from "next/link";
import { type ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "outline";
  href?: string;
  external?: boolean;   // opens in new tab if href is external
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  href,
  external = false,
  onClick,
  className = "",
  type = "button",
  disabled = false,
}: ButtonProps) {
  // ── Base styles shared by both variants ────────────────────────────────────
  const base = [
    "inline-flex items-center gap-2 px-6 py-2.5 rounded-full",
    "text-sm font-medium tracking-wide",
    "transition-all duration-200 ease-out",
    "focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2",
    disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
  ].join(" ");

  // ── Per-variant styles ─────────────────────────────────────────────────────
  const variants = {
    primary: [
      "bg-[var(--accent)] text-white",
      "hover:bg-[var(--accent-hover)] hover:shadow-md hover:-translate-y-0.5",
      "active:translate-y-0",
    ].join(" "),

    outline: [
      "border border-[var(--accent)] text-[var(--accent)]",
      "hover:bg-[var(--accent)] hover:text-white",
      "hover:shadow-md hover:-translate-y-0.5",
      "active:translate-y-0",
    ].join(" "),
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  // Render as <Link> when href is provided, otherwise as <button>
  if (href) {
    return (
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={classes}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
