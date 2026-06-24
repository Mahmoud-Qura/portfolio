"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import Button from "./Button";
import {
  type ContactErrors,
  type ContactField,
  type ContactSubmission,
  validateContactSubmission,
} from "@/lib/contact";

type Status = "idle" | "submitting" | "success" | "error";

const initialForm: ContactSubmission = {
  name: "",
  email: "",
  message: "",
};

type FieldProps = {
  label: string;
  id: ContactField;
  type: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
};

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactSubmission>(initialForm);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  const updateField = (field: ContactField, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));

    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateContactSubmission(formData);
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

      const result = (await response.json()) as { error?: string };
      if (!response.ok || result.error) {
        throw new Error(result.error || "Failed to send message");
      }

      setStatus("success");
      setFormData(initialForm);
      setErrors({});
    } catch {
      setStatus("error");
    }
  };

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

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-8 shadow-[var(--shadow-card)] space-y-6"
    >
      <Field
        label="Your Name"
        id="name"
        type="text"
        value={formData.name}
        onChange={(value) => updateField("name", value)}
        error={errors.name}
        placeholder="Jane Smith"
        required
      />

      <Field
        label="Email Address"
        id="email"
        type="email"
        value={formData.email}
        onChange={(value) => updateField("email", value)}
        error={errors.email}
        placeholder="jane@example.com"
        required
      />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium text-[var(--text-primary)]">
          Message <span className="text-[var(--accent)]">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          value={formData.message}
          onChange={(event) => updateField("message", event.target.value)}
          placeholder="Tell me about your project or opportunity..."
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

      {status === "error" && (
        <p className="text-sm text-red-500 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 px-4 py-3 rounded-xl">
          Something went wrong. Please try again or email me directly.
        </p>
      )}

      <Button
        type="submit"
        variant="primary"
        disabled={status === "submitting"}
        className="w-full justify-center"
      >
        {status === "submitting" ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Sending...
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

function Field({ label, id, type, value, onChange, error, placeholder, required }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-[var(--text-primary)]">
        {label} {required && <span className="text-[var(--accent)]">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
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
