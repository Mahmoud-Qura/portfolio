// ─── components/SectionTitle.tsx ─────────────────────────────────────────────
// Consistent section heading used across all pages.
// Features:
//  • Playfair Display headline
//  • Optional subtitle
//  • A small decorative accent line beneath the title
// ─────────────────────────────────────────────────────────────────────────────

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionTitle({
  title,
  subtitle,
  align = "left",
  className = "",
}: SectionTitleProps) {
  const alignClass = align === "center"
    ? "text-center items-center"
    : "text-left items-start";

  return (
    <div className={`flex flex-col gap-3 ${alignClass} ${className}`}>
      {/* Main heading in display serif font */}
      <h2
        className="font-display text-3xl sm:text-4xl font-semibold text-[var(--text-primary)] leading-tight"
      >
        {title}
      </h2>

      {/* Decorative accent underline */}
      <span className="w-10 h-0.5 bg-[var(--accent)] rounded-full" />

      {/* Optional subtitle */}
      {subtitle && (
        <p className="text-[var(--text-secondary)] text-base leading-relaxed max-w-xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
