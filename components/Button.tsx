import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/ui";

type ButtonBaseProps = {
  children: ReactNode;
  variant?: "primary" | "outline";
  className?: string;
  disabled?: boolean;
};

type ButtonLinkProps = ButtonBaseProps & {
  href: string;
  external?: boolean;
  onClick?: never;
  type?: never;
};

type ButtonActionProps = ButtonBaseProps & {
  href?: never;
  external?: never;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

type ButtonProps = ButtonLinkProps | ButtonActionProps;

const baseStyles = [
  "inline-flex items-center gap-2 px-6 py-2.5 rounded-full",
  "text-sm font-medium tracking-wide",
  "transition-all duration-200 ease-out",
  "focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2",
];

const variantStyles = {
  primary: [
    "bg-[var(--accent)] text-white",
    "hover:bg-[var(--accent-hover)] hover:shadow-md hover:-translate-y-0.5",
    "active:translate-y-0",
  ],
  outline: [
    "border border-[var(--accent)] text-[var(--accent)]",
    "hover:bg-[var(--accent)] hover:text-white",
    "hover:shadow-md hover:-translate-y-0.5",
    "active:translate-y-0",
  ],
} as const;

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
  const classes = cn(
    baseStyles,
    variantStyles[variant],
    disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
    className,
  );

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
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
