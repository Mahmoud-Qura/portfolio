# Portfolio Contact System

This project now includes a real contact form backend and admin review UI.

## Features

- `/api/contact`
  - POST: save form submissions to `contact-messages.json`
  - GET: admin-only list of saved messages
  - DELETE: admin-only delete a message by `id`
- `/contact/admin`
  - Review messages in the browser
  - Delete individual messages
- optional email notifications via SMTP

## Setup

1. Install dependencies:

```bash
npm install
```

2. Set environment variables in `.env.local`:

```env
NEXT_PUBLIC_ADMIN_SECRET=admin-secret
ADMIN_SECRET=admin-secret
NOTIFY_EMAIL=you@example.com
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-pass
SMTP_SECURE=false
```

3. Run development server:

```bash
npm run dev
```

## Notes

- If you do not configure SMTP, the contact message still saves locally.
- Admin pages use `NEXT_PUBLIC_ADMIN_SECRET` only for the client-side request helper.
- Keep `ADMIN_SECRET` secret in production.
