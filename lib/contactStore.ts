import { promises as fs } from "fs";
import path from "path";
import type { ContactMessage, ContactSubmission } from "@/lib/contact";

const dataFile = path.resolve(process.cwd(), "contact-messages.json");

async function readMessages(): Promise<ContactMessage[]> {
  try {
    const json = await fs.readFile(dataFile, "utf8");
    return JSON.parse(json) as ContactMessage[];
  } catch (error) {
    console.warn("Unable to read contact messages file, returning empty list:", error);
    return [];
  }
}

async function writeMessages(messages: ContactMessage[]) {
  try {
    await fs.writeFile(dataFile, JSON.stringify(messages, null, 2), "utf8");
  } catch (error) {
    console.error("Unable to write contact messages file:", error);
    throw error;
  }
}

export async function getContactMessages() {
  return readMessages();
}

export async function saveContactMessage(message: ContactSubmission) {
  const messages = await readMessages();
  const newMessage: ContactMessage = {
    id: String(Date.now()),
    createdAt: new Date().toISOString(),
    ...message,
  };
  messages.unshift(newMessage);
  await writeMessages(messages);
  return newMessage;
}

export async function deleteContactMessage(id: string) {
  const messages = await readMessages();
  const filtered = messages.filter((message) => message.id !== id);
  if (filtered.length === messages.length) {
    return false;
  }
  await writeMessages(filtered);
  return true;
}
