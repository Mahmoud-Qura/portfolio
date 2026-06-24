import type { ContactSubmission } from "@/lib/contact";

function getEnv(name: string) {
  return process.env[name] ?? "";
}

export async function sendTelegramNotification(data: ContactSubmission, photoUrl?: string) {
  const token = getEnv("TELEGRAM_BOT_TOKEN");
  const chatId = getEnv("TELEGRAM_CHAT_ID");

  if (!token || !chatId) {
    throw new Error("Telegram bot token or chat id is not configured");
  }

  const apiBase = `https://api.telegram.org/bot${token}`;
  const text = `New contact message\n\nName: ${data.name}\nEmail: ${data.email}\n\n${data.message}`;

  // Send text message first
  try {
    await fetch(`${apiBase}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
    });
  } catch (err) {
    console.warn("Telegram sendMessage failed", err);
  }

  // If a photo URL is provided, send it as a photo message (useful for QR codes)
  if (photoUrl) {
    try {
      await fetch(`${apiBase}/sendPhoto`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, photo: photoUrl, caption: `QR code attached` }),
      });
    } catch (err) {
      console.warn("Telegram sendPhoto failed", err);
    }
  }
}
