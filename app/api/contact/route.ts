import { NextRequest, NextResponse } from "next/server";
import { deleteContactMessage, getContactMessages, saveContactMessage } from "@/lib/contactStore";
import { sendContactNotification } from "@/lib/email";
import { sendTelegramNotification } from "@/lib/telegram";
import { isContactSubmission } from "@/lib/contact";

const ADMIN_SECRET = process.env.ADMIN_SECRET ?? "admin-secret";

function getRequestSecret(request: NextRequest) {
  return (
    request.nextUrl.searchParams.get("adminSecret") ??
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ??
    ""
  );
}

function isAdmin(request: NextRequest) {
  return getRequestSecret(request) === ADMIN_SECRET;
}

function getTelegramQrUrl() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "");
  return process.env.TELEGRAM_QR_URL ?? (baseUrl ? `${baseUrl}/qr.png` : undefined);
}

export async function GET(request: NextRequest) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const messages = await getContactMessages();
  return NextResponse.json({ success: true, messages });
}

export async function DELETE(request: NextRequest) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Message id is required." }, { status: 400 });
  }

  const deleted = await deleteContactMessage(id);
  if (!deleted) {
    return NextResponse.json({ error: "Message not found." }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json();

    if (!isContactSubmission(body)) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const saved = await saveContactMessage(body);

    try {
      await sendContactNotification(body);
    } catch (sendError) {
      console.warn("Contact notification failed:", sendError);
    }

    try {
      await sendTelegramNotification(body, getTelegramQrUrl());
    } catch (tgErr) {
      console.warn("Telegram notification failed:", tgErr);
    }

    return NextResponse.json({ success: true, message: saved });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Unable to save message. Please try again later." },
      { status: 500 },
    );
  }
}
