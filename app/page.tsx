// ─── app/page.tsx (Home) ─────────────────────────────────────────────────────
// Sections:
//   1. Hero      — name, tagline, CTA buttons
//   2. Skills    — MEARN + tools badge grid
//   3. Featured Projects — 3-card preview grid
// ─────────────────────────────────────────────────────────────────────────────

import Link from "next/link";
import { ArrowRight, Download, Github, Linkedin } from "lucide-react";
import Button from "@/components/Button";
import SectionTitle from "@/components/SectionTitle";
import ProjectCard from "@/components/ProjectCard";
import Hero from "@/components/Hero";
import { DEV, SKILLS, getFeaturedProjects } from "@/lib/constants";

// ── Skill badge colors by category ────────────────────────────────────────────
const categoryStyle = {
  core:      "bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/25",
  tools:     "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25",
  practices: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25",
};

export default function HomePage() {
  const featured = getFeaturedProjects();

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════
          1. HERO SECTION
          Full-viewport-ish block with name, title, tagline, CTA buttons
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">

        {/* Background photo for hero section */}
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center opacity-80 dark:opacity-40"
          style={{
            backgroundImage: `url(${DEV.heroImage})`,
            filter: "brightness(0.55)",
          }}
        />

        {/* Subtle background decoration — soft radial gradient blob */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 55% at 65% 50%, rgba(99,102,241,0.08) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 w-full py-24 grid md:grid-cols-2 gap-14 items-center">

          {/* ── Left: Text Content ─────────────────────────────────────── */}
          <div className="relative z-10 rounded-[2rem] border border-white/10 bg-white/85 dark:bg-slate-950/80 p-8 backdrop-blur-xl shadow-card">
            <div className="flex flex-col gap-7">

            {/* Eyebrow label */}
            <span className="animate-fade-up inline-flex items-center gap-2 text-sm font-mono text-[var(--accent)] bg-[var(--accent)]/10 border border-[var(--accent)]/25 px-3.5 py-1.5 rounded-full w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
              Available for work
            </span>

            {/* Headline */}
            <div className="animate-fade-up delay-100">
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-[var(--text-primary)] leading-[1.1] tracking-tight">
                {/* First name accent */}
                <span className="text-[var(--accent)]">{DEV.name.split(" ")[0]}</span>{" "}
                {DEV.name.split(" ").slice(1).join(" ")}
              </h1>
              <p className="mt-3 text-xl sm:text-2xl font-display italic text-[var(--text-secondary)] font-normal">
                {DEV.title}
              </p>
            </div>

            {/* Tagline */}
            <p className="animate-fade-up delay-200 text-[var(--text-secondary)] text-base sm:text-lg leading-relaxed max-w-md">
              {DEV.tagline}
            </p>

            {/* CTA Buttons */}
            <div className="animate-fade-up delay-300 flex flex-wrap gap-3">
              <Button href="/contact" variant="primary">
                Contact Me <ArrowRight size={16} />
              </Button>
              <Button href={DEV.cvUrl} external variant="outline">
                <Download size={16} /> Download CV
              </Button>
            </div>

            {/* Social Quick-Links */}
            <div className="animate-fade-up delay-400 flex items-center gap-4 pt-2">
              <span className="text-xs text-[var(--text-secondary)] uppercase tracking-widest">Find me on</span>
              <div className="flex gap-2">
                {[
                  { icon: Github,   href: DEV.github,   label: "GitHub"   },
                  { icon: Linkedin, href: DEV.linkedin,  label: "LinkedIn" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all duration-200"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
            </div>
          </div>

          {/* ── Right: Hero Photo Card ───────────────────────────────── */}
          <div className="animate-fade-up delay-500 hidden md:flex justify-center">
            <Hero />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          2. SKILLS SECTION
      ════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[var(--bg-secondary)] py-20 border-y border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <SectionTitle
            title="Skills & Technologies"
            subtitle="My MEARN stack toolkit — the technologies I use daily to build production-ready web applications."
            align="center"
            className="mb-12"
          />

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-4 mb-8 text-xs">
            {[
              { label: "MEARN Core",  style: categoryStyle.core      },
              { label: "Tools",       style: categoryStyle.tools      },
              { label: "Practices",   style: categoryStyle.practices  },
            ].map(({ label, style }) => (
              <span key={label} className={`px-3 py-1 rounded-full border font-medium ${style}`}>
                {label}
              </span>
            ))}
          </div>

          {/* Badge Grid */}
          <div className="flex flex-wrap justify-center gap-3">
            {SKILLS.map((skill) => (
              <span
                key={skill.name}
                className={[
                  "text-sm font-medium px-4 py-2 rounded-full border",
                  "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm",
                  categoryStyle[skill.category],
                ].join(" ")}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          3. FEATURED PROJECTS SECTION
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex items-end justify-between gap-6 mb-12 flex-wrap">
            <SectionTitle
              title="Featured Projects"
              subtitle="A selection of MEARN-stack applications I've built end-to-end."
            />
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-sm text-[var(--accent)] font-medium hover:gap-3 transition-all duration-200"
            >
              View all projects <ArrowRight size={15} />
            </Link>
          </div>

          {/* 3-column responsive grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          4. CTA BANNER
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 border-t border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="bg-gradient-to-br from-[var(--accent)]/8 to-indigo-400/5 border border-[var(--accent)]/20 rounded-3xl p-10 sm:p-14 text-center flex flex-col items-center gap-6">
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--text-primary)]">
              Let&apos;s build something great
            </h2>
            <p className="text-[var(--text-secondary)] max-w-lg text-base">
              I&apos;m always open to new projects, collaborations, or just a chat about the MEARN stack.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button href="/contact" variant="primary">Get in touch <ArrowRight size={16} /></Button>
              <Button href="/projects" variant="outline">See my work</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
