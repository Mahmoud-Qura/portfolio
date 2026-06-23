// ─── app/about/page.tsx ───────────────────────────────────────────────────────
// About page sections:
//   1. Bio & quick stats
//   2. Journey / story paragraph
//   3. Education
//   4. Soft Skills
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import { MapPin, Calendar, GraduationCap, Heart } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import Button from "@/components/Button";
import { DEV } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description: `Learn more about ${DEV.name} — a full-stack MEARN developer with 1+ years of experience.`,
};

// ── Data ──────────────────────────────────────────────────────────────────────
const education = [
  {
    degree: "B.E. Chemical Engineering",
    school: "H.T.I ",
    year: "2022",
    note: "Graduated with Honours · GPA 2.0/4.0",
  },
  {
    degree: "Frontend Web Development Bootcamp",
    school: "Route Tech Academy",
    year: "2025",
    note: "Self-directed online program (1,500+ hours)",
  },
  {
    degree: "MEAN-Stack Web Development Bootcamp",
    school: "N.T.I ,  National Telecommunication Institute",
    year: "2026",
    note: "Self-directed online program (500+ hours)",
  },
];

const softSkills = [
  "Problem-solving",
  "Team collaboration",
  "Clear communication",
  "Adaptability",
  "Attention to detail",
  "Time management",
  "Ownership mentality",
  "Continuous learning",
];

// ─────────────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20 space-y-24">

      {/* ═══════════════════════════════════════════════════════════════════
          1. HERO BIO
      ════════════════════════════════════════════════════════════════════ */}
      <section className="grid md:grid-cols-5 gap-14 items-start">

        {/* Avatar placeholder */}
        <div className="md:col-span-2 flex justify-center md:justify-start">
          <div className="relative">
            <div className="w-52 h-52 sm:w-64 sm:h-64 rounded-3xl bg-gradient-to-br from-[var(--accent)] via-indigo-400 to-purple-400 flex items-center justify-center text-white font-display text-8xl font-semibold shadow-[var(--shadow-hover)]">
              {DEV.name.charAt(0)}
            </div>
            {/* Decorative offset border */}
            <div className="absolute -bottom-3 -right-3 w-full h-full rounded-3xl border-2 border-[var(--accent)]/30 -z-10" />
          </div>
        </div>

        {/* Text content */}
        <div className="md:col-span-3 flex flex-col gap-6">
          <SectionTitle
            title={`Hi, I'm ${DEV.name.split(" ")[0]}.`}
            subtitle="Full-Stack Developer based in Banha, Egypt."
          />

          <p className="text-[var(--text-secondary)] leading-relaxed">
            I&apos;m a passionate full-stack web developer with over 1 year of hands-on experience
            building scalable, user-centric web applications. My sweet spot is the MERN stack —
            MongoDB, Express, React, Node.js, and Next.js — where I enjoy crafting everything
            from robust REST APIs to pixel-perfect, performant front-ends.
          </p>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            I take pride in writing clean, maintainable code and in treating performance and
            accessibility as first-class concerns — not afterthoughts. Whether I&apos;m designing a
            database schema, optimizing a React render tree, or collaborating on a product sprint,
            I show up with curiosity and ownership.
          </p>

          {/* Quick meta chips */}
          <div className="flex flex-wrap gap-3 pt-2">
            {[
              { icon: MapPin,    text: DEV.location       },
              { icon: Calendar,  text: "1+ Year Exp."    },
              { icon: Heart,     text: "MERN Enthusiast" },
            ].map(({ icon: Icon, text }) => (
              <span
                key={text}
                className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] bg-[var(--bg-secondary)] border border-[var(--border)] px-4 py-2 rounded-full"
              >
                <Icon size={14} className="text-[var(--accent)]" />
                {text}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-3 pt-2">
            <Button href="/contact" variant="primary">Work with me</Button>
            <Button href={DEV.cvUrl} external variant="outline">Download CV</Button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          2. MY JOURNEY
      ════════════════════════════════════════════════════════════════════ */}
      <section>
        <SectionTitle
          title="My Journey in Web Development"
          subtitle="Why I love the MEAN stack — and how I got here."
          className="mb-8"
        />
        <div className="grid md:grid-cols-2 gap-8 text-[var(--text-secondary)] leading-relaxed">
          <p>
            My journey started in college where I built a tiny PHP blog and thought &ldquo;this is magic.&rdquo;
            After graduating, I discovered the JavaScript ecosystem and never looked back. The moment I
            ran my first Express server, queried MongoDB from Node, and watched data appear in a React
            component — in a single language, end-to-end — I was hooked.
          </p>
          <p>
            The MERN stack resonates with me because it lets a small team (or a solo developer) move
            incredibly fast without sacrificing scalability. Next.js brought the final piece: SSR, image
            optimization, and the App Router model made building production-grade apps feel natural.
            Every project has deepened my appreciation for thoughtful architecture and developer empathy.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          3. EDUCATION
      ════════════════════════════════════════════════════════════════════ */}
      <section>
        <SectionTitle title="Education" className="mb-8" />
        <div className="space-y-4">
          {education.map((edu) => (
            <div
              key={edu.degree}
              className="flex gap-5 p-6 bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl shadow-[var(--shadow-card)]"
            >
              <div className="shrink-0 mt-0.5">
                <div className="w-10 h-10 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/25 flex items-center justify-center">
                  <GraduationCap size={18} className="text-[var(--accent)]" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <h3 className="font-display text-lg font-semibold text-[var(--text-primary)]">
                    {edu.degree}
                  </h3>
                  <span className="text-xs font-mono text-[var(--text-secondary)] bg-[var(--bg-secondary)] border border-[var(--border)] px-2.5 py-1 rounded-full shrink-0">
                    {edu.year}
                  </span>
                </div>
                <p className="text-sm text-[var(--accent)] font-medium mt-1">{edu.school}</p>
                <p className="text-sm text-[var(--text-secondary)] mt-1">{edu.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          4. SOFT SKILLS
      ════════════════════════════════════════════════════════════════════ */}
      <section>
        <SectionTitle
          title="Beyond the Code"
          subtitle="The interpersonal and professional qualities I bring to every team."
          className="mb-8"
        />
        <div className="flex flex-wrap gap-3">
          {softSkills.map((skill) => (
            <span
              key={skill}
              className="px-5 py-2.5 rounded-full border border-[var(--border)] bg-[var(--bg-secondary)] text-sm text-[var(--text-primary)] font-medium hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-200 cursor-default"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

    </div>
  );
}
