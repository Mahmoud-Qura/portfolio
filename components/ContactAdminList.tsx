"use client";

import { useState } from "react";
import { Trash2, RefreshCcw } from "lucide-react";
import Button from "@/components/Button";
import type { ContactMessage } from "@/lib/contactStore";

interface Props {
  initialMessages: ContactMessage[];
  adminSecret: string;
}

export default function ContactAdminList({ initialMessages, adminSecret }: Props) {
  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);
  const [busyId, setBusyId] = useState<string | null>(null);

  const deleteMessage = async (id: string) => {
    setBusyId(id);
    try {
      const response = await fetch(`/api/contact?id=${id}&adminSecret=${encodeURIComponent(adminSecret)}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (!response.ok || result.error) {
        throw new Error(result.error || "Delete failed");
      }
      setMessages((current) => current.filter((message) => message.id !== id));
    } catch (error) {
      console.error(error);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-[var(--text-secondary)]">There are {messages.length} message(s).</p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          <RefreshCcw size={16} /> Refresh
        </Button>
      </div>
      {messages.map((msg) => (
        <article key={msg.id} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl p-6 shadow-card">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-base font-semibold text-[var(--text-primary)]">{msg.name}</p>
              <a href={`mailto:${msg.email}`} className="text-sm text-[var(--accent)] hover:text-[var(--accent)]/80">
                {msg.email}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-xs text-[var(--text-secondary)]">{new Date(msg.createdAt).toLocaleString()}</p>
              <Button
                variant="outline"
                disabled={busyId === msg.id}
                onClick={() => deleteMessage(msg.id)}
                className="p-2 w-10 h-10 rounded-2xl"
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </div>
          <p className="mt-4 text-[var(--text-secondary)] whitespace-pre-line">{msg.message}</p>
        </article>
      ))}
    </div>
  );
}
