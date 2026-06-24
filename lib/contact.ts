export interface ContactSubmission {
  name: string;
  email: string;
  message: string;
}

export interface ContactMessage extends ContactSubmission {
  id: string;
  createdAt: string;
}

export type ContactField = keyof ContactSubmission;
export type ContactErrors = Partial<Record<ContactField, string>>;

export const CONTACT_FIELDS = ["name", "email", "message"] as const satisfies readonly ContactField[];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

export function isContactSubmission(value: unknown): value is ContactSubmission {
  return (
    isRecord(value) &&
    isString(value.name) &&
    isString(value.email) &&
    isString(value.message)
  );
}

export function validateContactSubmission(data: ContactSubmission): ContactErrors {
  const errors: ContactErrors = {};

  if (!data.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_PATTERN.test(data.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!data.message.trim()) {
    errors.message = "Message is required.";
  } else if (data.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }

  return errors;
}
