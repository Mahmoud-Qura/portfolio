import { getContactMessages } from "@/lib/contactStore";
import { Metadata } from "next";
import ContactAdminList from "@/components/ContactAdminList";

export const metadata: Metadata = {
  title: "Messages Admin",
  description: "View contact form submissions.",
};

export const dynamic = "force-dynamic";

interface Props {
  searchParams: { adminSecret?: string };
}

export default async function ContactAdminPage({ searchParams }: Props) {
  const expectedSecret = process.env.NEXT_PUBLIC_ADMIN_SECRET ?? "admin-secret";

  if (searchParams.adminSecret !== expectedSecret) {
    return (
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-10 text-center">
          <h1 className="font-display text-3xl font-semibold text-[var(--text-primary)]">
            Access Denied
          </h1>
          <p className="mt-4 text-[var(--text-secondary)]">
            You must provide a valid admin secret in the URL to view contact messages.
          </p>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Example: <code className="rounded-md bg-slate-950/10 px-2 py-1">/contact/admin?adminSecret=YOUR_SECRET</code>
          </p>
        </div>
      </div>
    );
  }

  const messages = await getContactMessages();
  const adminSecret = expectedSecret;

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
        <div>
          <h1 className="font-display text-4xl font-semibold text-[var(--text-primary)]">
            Contact Messages
          </h1>
          <p className="text-[var(--text-secondary)] mt-2">
            Messages submitted through the form appear here. Delete them once you’ve handled them.
          </p>
        </div>
      </div>

      <ContactAdminList initialMessages={messages} adminSecret={adminSecret} />
    </div>
  );
}
