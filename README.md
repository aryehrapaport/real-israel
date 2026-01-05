# Real Israel

Vite + React + TypeScript single-page app.

## Local development

- Install: `npm install`
- Run dev server: `npm run dev`
- Production build: `npm run build`

### Environment

This project uses FormSubmit to deliver contact form submissions.

- Copy `.env.example` → `.env`
- Set `VITE_FORMSUBMIT_EMAIL` to the inbox that should receive form submissions

Note: Vite `VITE_*` variables are embedded in the client build.

## Cloudflare Pages deployment

This repo is set up for Cloudflare Pages.

- Build command: `npm run build`
- Output directory: `dist`
- Environment variables (Cloudflare Pages → Settings → Environment variables):
  - `VITE_FORMSUBMIT_EMAIL`

### SPA routing

Client-side routes (React Router) work on refresh thanks to [public/_redirects](public/_redirects):

`/* /index.html 200`

## Admin inbox (Cloudflare D1)

This project can store form submissions in Cloudflare D1 and expose a simple inbox at `/admin`.

### What happens when a user submits

- The form is sent to FormSubmit (email notification)
- The same payload is also sent to `POST /api/intake` (saved in D1)

The client attempts both in parallel. The submission is treated as successful if either email or D1 succeeds (and only fails if both fail).

If email delivery fails, details are logged to the browser console. Common causes are missing `VITE_FORMSUBMIT_EMAIL` in Cloudflare Pages environment variables (requires a rebuild) or FormSubmit inbox/activation/spam filtering.

### Cloudflare dashboard setup

1) Create a D1 database
- Cloudflare → Workers & Pages → D1 → Create database

2) Bind D1 to your Pages project
- Pages project → Settings → Functions → D1 database bindings
- Add binding name: `DB`

3) Add an admin token (secret)
- Pages project → Settings → Environment variables → Secrets
- Add `ADMIN_TOKEN` (a long random string)

4) Set the Vite email env var
- Pages project → Settings → Environment variables
- Add `VITE_FORMSUBMIT_EMAIL`

### Create the D1 table

Run the SQL migration in [migrations/0001_init.sql](migrations/0001_init.sql).

One approach is to use Wrangler locally:

- Install: `npm i -D wrangler`
- Update `wrangler.toml` with your D1 `database_id`
- Apply migration:
  - `npx wrangler d1 execute real-israel-db --file migrations/0001_init.sql`

### Using the inbox

- Visit `/admin`
- Paste the `ADMIN_TOKEN`
- Click “Load”
