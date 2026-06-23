// ─── components/ProjectCard.tsx ───────────────────────────────────────────────
// Displays a single project with:
//  • Title and description
//  • Tech stack badges
//  • GitHub + Live Demo links
//  • Subtle hover lift effect
// ─────────────────────────────────────────────────────────────────────────────

import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";
import type { Project } from "@/lib/constants";

interface ProjectCardProps {
  project: Project;
  showLong?: boolean; // show full description on /projects page
}

export default function ProjectCard({ project, showLong = false }: ProjectCardProps) {
  return (
    <article
      className={[
        "group relative flex flex-col gap-4 p-6 rounded-2xl",
        "bg-[var(--bg-card)]",
        "border border-[var(--border)]",
        "shadow-[var(--shadow-card)]",
        // Hover: lift + stronger shadow
        "transition-all duration-300 ease-out",
        "hover:-translate-y-1 hover:shadow-[var(--shadow-hover)]",
        "hover:border-[var(--accent)]/40",
      ].join(" ")}
    >
      {/* ── Header: Title + Links ──────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-semibold text-[var(--text-primary)] leading-snug group-hover:text-[var(--accent)] transition-colors duration-200">
          {project.title}
        </h3>

        {/* Icon links — GitHub and optional Live Demo */}
        <div className="flex items-center gap-2 shrink-0 mt-0.5">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} GitHub repository`}
            className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-200 p-1 rounded-md hover:bg-[var(--bg-secondary)]"
          >
            <Github size={18} />
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
              className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-200 p-1 rounded-md hover:bg-[var(--bg-secondary)]"
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>

      {/* ── Description ───────────────────────────────────────────────── */}
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed flex-1">
        {showLong ? project.longDescription : project.description}
      </p>

      {/* ── Tech Stack Badges ──────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-2 mt-auto pt-2 border-t border-[var(--border)]">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="text-xs font-mono px-2.5 py-1 rounded-full bg-[var(--bg-secondary)] text-[var(--accent)] border border-[var(--accent)]/20"
          >
            {tech}
          </span>
        ))}
      </div>
    </article>
  );
}
