// ─── components/Footer.tsx ───────────────────────────────────────────────────
// Simple footer with:
//  • Copyright line
//  • Social links (GitHub, LinkedIn, Email)
// ─────────────────────────────────────────────────────────────────────────────

import { Github, Linkedin, Mail } from "lucide-react";
import { DEV } from "@/lib/constants";

const socials = [
  { icon: Github,   href: DEV.github,               label: "GitHub"   },
  { icon: Linkedin, href: DEV.linkedin,              label: "LinkedIn" },
  { icon: Mail,     href: `mailto:${DEV.email}`,     label: "Email"    },
] as const;

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-primary)] mt-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">

        {/* Copyright */}
        <p className="text-sm text-[var(--text-secondary)]">
          © {new Date().getFullYear()} {DEV.name}. Built with{" "}
          <span className="text-[var(--accent)]">Next.js</span> &amp; Tailwind CSS.
        </p>

        {/* Social Links */}
        <div className="flex items-center gap-3">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={label}
              className={[
                "w-9 h-9 rounded-full flex items-center justify-center",
                "border border-[var(--border)]",
                "text-[var(--text-secondary)]",
                "hover:text-white hover:bg-[var(--accent)] hover:border-[var(--accent)]",
                "transition-all duration-200",
              ].join(" ")}
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
