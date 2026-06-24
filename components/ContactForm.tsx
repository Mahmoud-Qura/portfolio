// ─── components/ContactForm.tsx ───────────────────────────────────────────────
// Client Component: handles form state, validation, and submission UX.
// Uses controlled inputs + simple in-component validation (no library needed
// for 3 fields). Replace the "submit" handler with a real API call or
// a service like Formspree / Resend when going to production.
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { useState, FormEvent } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import Button from "./Button";

// ── Form State Types ──────────────────────────────────────────────────────────
type FormData   = { name: string; email: string; message: string };
type FormErrors = Partial<FormData>;
type Status     = "idle" | "submitting" | "success" | "error";

// ── Validation ────────────────────────────────────────────────────────────────
function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim())          errors.name    = "Name is required.";
  if (!data.email.trim())         errors.email   = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
                                  errors.email   = "Enter a valid email address.";
  if (!data.message.trim())       errors.message = "Message is required.";
  else if (data.message.length < 10)
                                  errors.message = "Message must be at least 10 characters.";
  return errors;
}

// ─────────────────────────────────────────────────────────────────────────────
export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", message: "" });
  const [errors,   setErrors]   = useState<FormErrors>({});
  const [status,   setStatus]   = useState<Status>("idle");

  // ── Update a single field ──────────────────────────────────────────────────
  const update = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error on change
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  // ── Submit handler ─────────────────────────────────────────────────────────
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (!response.ok || result.error) {
        throw new Error(result.error || "Failed to send message");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  // ── Success state ──────────────────────────────────────────────────────────
  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl shadow-[var(--shadow-card)]">
        <CheckCircle2 size={48} className="text-emerald-500" />
        <h3 className="font-display text-2xl font-semibold text-[var(--text-primary)]">
          Message sent!
        </h3>
        <p className="text-[var(--text-secondary)] max-w-xs text-sm">
          Thanks for reaching out. I&apos;ll get back to you within one business day.
        </p>
        <Button onClick={() => setStatus("idle")} variant="outline" className="mt-2">
          Send another message
        </Button>
      </div>
    );
  }

  // ── Form state ─────────────────────────────────────────────────────────────
  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-8 shadow-[var(--shadow-card)] space-y-6"
    >
      {/* ── Name ───────────────────────────────────────────────────────── */}
      <Field
        label="Your Name"
        id="name"
        type="text"
        value={formData.name}
        onChange={(v) => update("name", v)}
        error={errors.name}
        placeholder="Jane Smith"
        required
      />

      {/* ── Email ──────────────────────────────────────────────────────── */}
      <Field
        label="Email Address"
        id="email"
        type="email"
        value={formData.email}
        onChange={(v) => update("email", v)}
        error={errors.email}
        placeholder="jane@example.com"
        required
      />

      {/* ── Message ────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium text-[var(--text-primary)]">
          Message <span className="text-[var(--accent)]">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          value={formData.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="Tell me about your project or opportunity…"
          required
          className={[
            "w-full px-4 py-3 rounded-xl text-sm resize-none",
            "bg-[var(--bg-secondary)] border text-[var(--text-primary)]",
            "placeholder:text-[var(--text-secondary)]/50",
            "outline-none transition-all duration-200",
            "focus:ring-2 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)]",
            errors.message ? "border-red-400" : "border-[var(--border)]",
          ].join(" ")}
        />
        {errors.message && <p className="text-xs text-red-500 mt-0.5">{errors.message}</p>}
      </div>

      {/* ── Error banner ───────────────────────────────────────────────── */}
      {status === "error" && (
        <p className="text-sm text-red-500 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 px-4 py-3 rounded-xl">
          Something went wrong. Please try again or email me directly.
        </p>
      )}

      {/* ── Submit ─────────────────────────────────────────────────────── */}
      <Button
        type="submit"
        variant="primary"
        disabled={status === "submitting"}
        className="w-full justify-center"
      >
        {status === "submitting" ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send Message <Send size={15} />
          </>
        )}
      </Button>
    </form>
  );
}

// ── Reusable text input field ──────────────────────────────────────────────────
function Field({
  label, id, type, value, onChange, error, placeholder, required,
}: {
  label: string; id: string; type: string; value: string;
  onChange: (v: string) => void; error?: string; placeholder?: string; required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-[var(--text-primary)]">
        {label} {required && <span className="text-[var(--accent)]">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className={[
          "w-full px-4 py-3 rounded-xl text-sm",
          "bg-[var(--bg-secondary)] border text-[var(--text-primary)]",
          "placeholder:text-[var(--text-secondary)]/50",
          "outline-none transition-all duration-200",
          "focus:ring-2 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)]",
          error ? "border-red-400" : "border-[var(--border)]",
        ].join(" ")}
      />
      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
    </div>
  );
}
