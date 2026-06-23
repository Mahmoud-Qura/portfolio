// ─── app/projects/page.tsx ────────────────────────────────────────────────────
// Full project listing with:
//  • All projects from constants.ts
//  • Expanded descriptions (showLong=true)
//  • Filter by category (future extension)
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import SectionTitle from "@/components/SectionTitle";
import ProjectCard from "@/components/ProjectCard";
import { PROJECTS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Projects",
  description: "Full stack projects — task managers, social dashboards, e-commerce, and more.",
};

export default function ProjectsPage() {
  // Separate featured from others for visual hierarchy
  const featured = PROJECTS.filter((p) => p.featured);
  const others   = PROJECTS.filter((p) => !p.featured);

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20">

      {/* Page Header */}
      <SectionTitle
        title="Projects"
        subtitle="End-to-end Full stack applications — from idea and architecture to deployment."
        className="mb-16"
      />

      {/* ── Featured Projects ──────────────────────────────────────────── */}
      <section>
        <h3 className="text-xs font-mono font-medium uppercase tracking-widest text-[var(--text-secondary)] mb-6">
          Featured
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} showLong />
          ))}
        </div>
      </section>

      {/* ── Other Projects ─────────────────────────────────────────────── */}
      {others.length > 0 && (
        <section className="mt-16">
          <h3 className="text-xs font-mono font-medium uppercase tracking-widest text-[var(--text-secondary)] mb-6">
            Other Work
          </h3>
          <div className="grid sm:grid-cols-2 gap-6">
            {others.map((project) => (
              <ProjectCard key={project.id} project={project} showLong />
            ))}
          </div>
        </section>
      )}

      {/* ── GitHub CTA ─────────────────────────────────────────────────── */}
      <div className="mt-20 text-center">
        <p className="text-[var(--text-secondary)] mb-4 text-sm">
          More experiments and open-source contributions on GitHub.
        </p>
        <a
          href="https://github.com/Zom3a"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[var(--border)] text-[var(--text-secondary)] text-sm font-medium hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-200"
        >
          View GitHub Profile →
        </a>
      </div>
    </div>
  );
}
