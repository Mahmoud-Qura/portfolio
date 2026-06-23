// ─── app/contact/page.tsx ─────────────────────────────────────────────────────
// Contact page:
//  • Simple validated form (name, email, message)
//  • Social links row
//  • "use client" because of form state — but the page itself can stay
//    server-rendered if you move the form to a Client Component.
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import SectionTitle from "@/components/SectionTitle";
import { DEV } from "@/lib/constants";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${DEV.name}. Open to freelance work, full-time roles, and collaboration.`,
};

// ── Social / Contact Info ─────────────────────────────────────────────────────
const contactInfo = [
  { icon: Mail,    label: "Email",    value: DEV.email,   href: `mailto:${DEV.email}` },
  { icon: Github,  label: "GitHub",   value: "MahmoudQura", href: DEV.github           },
  { icon: Linkedin,label: "LinkedIn", value: "MahmoudQura", href: DEV.linkedin          },
  { icon: MapPin,  label: "Location", value: DEV.location, href: undefined             },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20">

      {/* Page header */}
      <SectionTitle
        title="Get In Touch"
        subtitle="Open to freelance projects, full-time opportunities, and interesting conversations."
        className="mb-16"
      />

      <div className="grid md:grid-cols-5 gap-16">

        {/* ── Left: Contact Info ──────────────────────────────────────── */}
        <aside className="md:col-span-2 flex flex-col gap-8">
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Whether you have a project in mind, a role to fill, or just want to talk
            about the Full stack — I&apos;d love to hear from you. I typically reply
            within one business day.
          </p>

          {/* Info chips */}
          <div className="space-y-3">
            {contactInfo.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/25 flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-[var(--accent)]" />
                </div>
                <div>
                  <div className="text-xs text-[var(--text-secondary)] font-medium uppercase tracking-wide">{label}</div>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="text-sm text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors duration-200"
                    >
                      {value}
                    </a>
                  ) : (
                    <span className="text-sm text-[var(--text-primary)]">{value}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Availability banner */}
          <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/25 rounded-2xl px-5 py-4">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
              Currently available for new projects
            </p>
          </div>
        </aside>

        {/* ── Right: Contact Form ─────────────────────────────────────── */}
        {/*
          ContactForm is extracted to a Client Component so this page can
          keep its Server Component status (for metadata generation).
        */}
        <div className="md:col-span-3">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
