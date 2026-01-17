# BridgePoint Israel — Developer handoff

This repo contains a one-page marketing site and a lightweight admin inbox for contact submissions.

At a glance:

- Public site is a single page (`/`) with anchored navigation (`/#home`, `/#why-us`, `/#services`, `/#contact`).
- Contact form sends an email (FormSubmit) and also persists the submission to Cloudflare D1 via Pages Functions.
- Admin inbox lives at `/admin` (with `/admin/login` gating) and reads from D1. It supports search, pagination, mark-read, soft-delete, and export (CSV/XLSX).

## Tech stack

- Frontend: Vite, React, TypeScript, React Router
- UI: Tailwind + shadcn/ui, Framer Motion, Lucide icons
- Forms/validation: react-hook-form + zod
- Email notifications: FormSubmit (client-side POST)
- Persistence + API: Cloudflare Pages Functions + Cloudflare D1

## Quick start (local)

Install and run:

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

### Local environment variables

Create `.env` (Vite reads `VITE_*` variables at build time):

```bash
VITE_FORMSUBMIT_EMAIL=your-inbox@example.com
```

Notes:

- In `npm run dev`, Cloudflare Pages Functions are not running, so `POST /api/intake` will 404.
- That’s OK: the submit helper attempts **email + D1 in parallel**, and succeeds if either one succeeds. In local dev, email can still succeed and D1 will log a warning.

## What the app does (behavior)

### Public site

- Single page at `/`.
- Fixed header with anchor links (hash navigation).
- Smooth scrolling to sections with an offset so content isn’t hidden behind the fixed header.

Key files:

- `src/pages/home.tsx` — all public sections, including the contact section at the bottom.
- `src/components/site-header.tsx` — header + anchor nav + theme toggle (defaults to light).
- `src/app/scroll-to-hash.tsx` — smooth scroll on hash changes with a header offset.

Legacy routes:

Routes like `/about`, `/services`, `/contact`, etc. redirect to anchor locations. See `src/App.tsx`.

### Contact submission flow (email + D1)

One submit action triggers two independent deliveries:

1) Email notification via FormSubmit
2) D1 persistence via Cloudflare Pages Function (`POST /api/intake`)

The overall UX succeeds if either one succeeds; it only errors if both fail.

Key files:

- `src/lib/contact-intake.ts` — zod schema (`contactIntakeSchema`) and TypeScript types.
- `src/lib/formsubmit.ts` — `submitContactIntake()` and the two transports.
- `src/components/contact-section.tsx` — form UI + spam protection + submit handling.

Spam protection (lightweight):

- Honeypot input (hidden field that should remain empty)
- Minimum time-on-page before submit (prevents instant bot submits)

### Admin inbox

Admin UI:

- `/admin/login` stores the token into `localStorage.admin_token`.
- `/admin` loads submissions from the API using `Authorization: Bearer <token>`.

Features:

- List with pagination
- Read/unread filtering
- Client-side search within the loaded page
- Bulk mark as read
- Bulk soft delete
- Export selected to CSV or Excel (`xlsx`)

Key files:

- `src/pages/admin-login.tsx` — token entry screen.
- `src/pages/admin.tsx` — inbox UI.

## API (Cloudflare Pages Functions)

All functions expect a D1 binding named `DB`.

### Public endpoint

- `POST /api/intake` → `functions/api/intake.ts`
  - Validates minimally (requires a valid-looking email)
  - Inserts into D1 `submissions`

Expected request body (subset):

```json
{
  "name": "...",
  "email": "...",
  "phone": "...",
  "location": "...",
  "timeline": "...",
  "message": "...",
  "source": "contact_form",
  "subject": "Contact form — BridgePoint Israel",
  "pagePath": "/?utm_source=..."
}
```

### Admin endpoints

All admin endpoints require `ADMIN_TOKEN` in the Pages environment.

- `GET /api/admin/submissions` → `functions/api/admin/submissions.ts`
  - Query params: `limit`, `offset`, optional `status=unread|read`, optional `source`, optional `includeDeleted=1`
- `POST /api/admin/mark-read` → `functions/api/admin/mark-read.ts`
  - Body: `{ "ids": ["..."] }`
- `POST /api/admin/delete` → `functions/api/admin/delete.ts`
  - Body: `{ "ids": ["..."] }`

Auth model:

- A single shared secret token (think “admin password”), stored in Cloudflare Pages Secrets as `ADMIN_TOKEN`.
- Browser stores it in `localStorage` and sends `Authorization: Bearer <token>`.

## Database (Cloudflare D1)

Schema migrations live in `migrations/`:

- `migrations/0001_init.sql` — creates `submissions` table + indexes
- `migrations/0002_read_delete.sql` — adds `read_at` and `deleted_at` + indexes

Table: `submissions`

- `id` (TEXT, PK)
- `created_at` (TEXT ISO)
- `source` (TEXT)
- `subject` (TEXT nullable)
- `name`, `email`, `phone`, `location`, `timeline`, `message` (TEXT)
- `page_path` (TEXT)
- `user_agent` (TEXT)
- `read_at` (TEXT nullable)
- `deleted_at` (TEXT nullable)

Soft delete:

- Admin “delete” sets `deleted_at`; records are excluded from listing by default.

## Cloudflare Pages deployment (client account)

### Build settings

- Build command: `npm run build`
- Output directory: `dist`

### SPA routing (required)

Cloudflare Pages needs the SPA fallback rule in `public/_redirects`:

```txt
/* /index 200
```

### Required Pages configuration

In Cloudflare Pages → your project → Settings:

1) Environment variable (non-secret)

- `VITE_FORMSUBMIT_EMAIL` — recipient inbox for FormSubmit
  - Because it is `VITE_*`, it is baked into the JS bundle. Updating it requires a new deploy.

2) Secret

- `ADMIN_TOKEN` — shared secret used for `/api/admin/*`

3) D1 binding

- Binding name must be: `DB`

### D1 setup + migrations

Option A — Cloudflare Dashboard (simplest):

1) Cloudflare Dashboard → D1 → Create database
2) Open the database → Console
3) Run the SQL from:
   - `migrations/0001_init.sql`
   - `migrations/0002_read_delete.sql`

Option B — Wrangler CLI (works without a `wrangler.toml`):

```bash
# create DB (once)
npx wrangler d1 create <db_name>

# run migrations against the remote DB
npx wrangler d1 execute <db_name> --remote --file=./migrations/0001_init.sql
npx wrangler d1 execute <db_name> --remote --file=./migrations/0002_read_delete.sql
```

## Troubleshooting

### Contact form says it failed

- Check the browser console for `[FormSubmit]` or `[Intake]` logs.
- If you see “Missing `VITE_FORMSUBMIT_EMAIL`”, the build has no recipient configured.
- If you see “DB binding missing”, D1 isn’t bound to the Pages project as `DB`.

### Cloudflare deploy fails with “binding DB … must have a database that already exists”

- Create the D1 database in the same Cloudflare account.
- Bind it in Pages → Settings → Functions → D1 bindings with name `DB`.

### Admin redirects back to login / Unauthorized

- Ensure Pages secret `ADMIN_TOKEN` exists.
- Clear `localStorage.admin_token` (or use the “Clear” button on `/admin/login`).

### Large bundle warning

- Admin export uses `xlsx`, which increases bundle size. This is expected.
