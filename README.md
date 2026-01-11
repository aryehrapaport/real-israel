# Real Israel

Premium marketing site + lightweight admin inbox for intake submissions.

This repo contains:
- A Vite + React + TypeScript single-page app (SPA)
- Cloudflare Pages Functions endpoints
- A Cloudflare D1 database schema + inbox UI at `/admin`

## Tech stack

- Frontend: Vite, React, TypeScript, React Router
- UI: Tailwind + shadcn/ui components, Framer Motion, Lucide icons
- Forms: react-hook-form + zod
- Email notifications: FormSubmit (client-side POST)
- Persistence: Cloudflare D1 (Pages Functions)

## Quick start (local)

- Install: `npm install`
- Run: `npm run dev`
- Build: `npm run build`

### Local environment

- Copy `.env.example` → `.env`
- Set `VITE_FORMSUBMIT_EMAIL` to the inbox that should receive email notifications.

Important: Vite `VITE_*` variables are embedded into the client build at build time.

## Project structure (where things are)

High level:

- `src/` — SPA source
  - `src/App.tsx` — routes
  - `src/pages/` — page-level routes
  - `src/components/` — shared UI/sections
  - `src/lib/` — shared logic (schema + submission helpers)
- `functions/` — Cloudflare Pages Functions (API)
  - `functions/api/intake.ts` — `POST /api/intake` (store submission in D1)
  - `functions/api/admin/submissions.ts` — `GET /api/admin/submissions` (list submissions)
  - `functions/api/admin/mark-read.ts` — `POST /api/admin/mark-read` (bulk mark read)
  - `functions/api/admin/delete.ts` — `POST /api/admin/delete` (bulk soft delete)
- `migrations/` — D1 schema migrations
  - `migrations/0001_init.sql`
  - `migrations/0002_read_delete.sql`
- `public/_redirects` — SPA fallback for Cloudflare Pages

## Routes & pages

Routes are defined in [src/App.tsx](src/App.tsx).

Public pages:
- `/` — home
- `/about`, `/why-presence`, `/services`
- `/contact` — primary conversion flow

Notes:
- `/scope`, `/pricing`, `/resources` currently redirect to `/contact`.
- The “briefing PDF gate” lives inside the Contact page and can auto-open via the query param `/contact?briefing=1`.

Admin:
- `/admin/login` — admin sign-in screen (stores the admin password locally)
- `/admin` — inbox dashboard (requires being signed in)

## Intake flow (email + D1)

All intake submissions share one schema and one submit helper.

- Schema: `contactIntakeSchema` in `src/lib/contact-intake.ts`
- Submit helper: `submitContactIntake()` in `src/lib/formsubmit.ts`

What happens on submit:
- Sends email notification via FormSubmit: `submitContactIntakeToFormSubmit()`
- Saves a copy into D1 via Pages Functions: `POST /api/intake`

Behavior:
- Both are attempted in parallel.
- The overall submit succeeds if either email OR D1 succeeds.
- Only fails if both fail.

Diagnostics:
- If email delivery fails, details are logged to the browser console (status + response body snippet).
- If D1 save fails, that is also logged.

## Admin inbox (D1-backed)

The inbox is a small internal tool intended to be used by a single operator.

UI:
- Page: `src/pages/admin.tsx`
- Features:
  - filter tabs: All / Unread / Read
  - pagination
  - mark read (single + bulk)
  - soft delete (single + bulk)
  - select-all (current page)
  - export selected to CSV or Excel
  - “Email” button uses `mailto:`

Auth model:
- Admin “password” is a shared secret stored as a Cloudflare Pages secret (`ADMIN_TOKEN`).
- Browser stores the entered value in `localStorage` under `admin_token`.
- API requests include `Authorization: Bearer <token>`.

## Cloudflare Pages deployment

Build settings:
- Build command: `npm run build`
- Output directory: `dist`

SPA routing:
- Cloudflare Pages needs [public/_redirects](public/_redirects):
  - `/* /index.html 200`

### Required Cloudflare configuration

Environment variable (Pages → Settings → Environment variables):
- `VITE_FORMSUBMIT_EMAIL` — recipient inbox for FormSubmit
  - Because it is `VITE_*`, changing it requires a new build/deploy.

Secret (Pages → Settings → Environment variables → Secrets):
- `ADMIN_TOKEN` — shared secret used to access `/api/admin/*` endpoints

D1 binding (Pages → Settings → Functions → D1 database bindings):
- binding name: `DB`

### D1 database setup

1) Create a D1 database in Cloudflare.
2) Apply migrations from `migrations/`.

Apply migrations (Cloudflare UI):
- Cloudflare Dashboard → D1 → your database → Console
- Run `migrations/0001_init.sql`, then `migrations/0002_read_delete.sql`

## Troubleshooting

Email not received (but appears in admin):
- Confirm `VITE_FORMSUBMIT_EMAIL` is set in Cloudflare Pages env vars and that a new deploy ran after setting it.
- Check browser console for `[FormSubmit]` logs.
- Check spam/quarantine and FormSubmit activation requirements for the recipient inbox.

Admin shows “Unauthorized” / redirects to login:
- Confirm `ADMIN_TOKEN` secret is set in Cloudflare Pages.
- Clear stored token (use the “Clear” button on `/admin/login` or clear `localStorage.admin_token`).

Large JS bundle warning:
- Excel export uses `xlsx`, which increases bundle size. This is expected for now.
