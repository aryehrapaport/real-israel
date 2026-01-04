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
