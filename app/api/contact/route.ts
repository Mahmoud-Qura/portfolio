import { NextRequest, NextResponse } from "next/server";
import { deleteContactMessage, getContactMessages, saveContactMessage } from "@/lib/contactStore";
import { sendContactNotification } from "@/lib/email";
import { sendTelegramNotification } from "@/lib/telegram";

const ADMIN_SECRET = process.env.ADMIN_SECRET ?? "admin-secret";

function getRequestSecret(request: NextRequest) {
  const fromQuery = request.nextUrl.searchParams.get("adminSecret");
  const authHeader = request.headers.get("authorization");
  const fromHeader = authHeader?.replace(/^Bearer\s+/i, "");
  return fromQuery || fromHeader || "";
}

function isAdmin(request: NextRequest) {
  return getRequestSecret(request) === ADMIN_SECRET;
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
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const saved = await saveContactMessage({ name, email, message });

    try {
      await sendContactNotification({ name, email, message });
    } catch (sendError) {
      console.warn("Contact notification failed:", sendError);
    }

    try {
      // prefer an explicit TELEGRAM_QR_URL, otherwise try to use the public base url + /qr.png
      const qrUrl = process.env.TELEGRAM_QR_URL ?? (process.env.NEXT_PUBLIC_BASE_URL ? `${process.env.NEXT_PUBLIC_BASE_URL.replace(/\/$/, "")}/qr.png` : undefined);
      await sendTelegramNotification({ name, email, message }, qrUrl);
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
