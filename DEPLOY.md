# Muna Media UZ — deploy notes

## What is already prepared

- Static Muna Media website can be deployed directly to Cloudflare Pages.
- `functions/api/contact.js` accepts contact-form submissions at `/api/contact`.
- Contact submissions are saved into Sanity as `lead` documents when Cloudflare env vars are configured.
- `studio/` contains a Sanity Studio with schemas for leads, services, cases, testimonials, FAQ, and site settings.

## Cloudflare Pages settings

Create/import a Pages project from this repo:

- Framework preset: `None`
- Build command: `npm run build`
- Build output directory: `/` or `.`
- Root directory: `/`
- Node version: `22`

Environment variables for Production and Preview:

- `SANITY_PROJECT_ID`
- `SANITY_DATASET` = `production`
- `SANITY_API_VERSION` = `2025-01-01`
- `SANITY_API_TOKEN` = token with write access to create `lead` documents

## Sanity Studio

From `studio/`:

```bash
npm install
SANITY_STUDIO_PROJECT_ID=<project-id> SANITY_STUDIO_DATASET=production npm run dev
```

Deploy Studio to Sanity hosting:

```bash
SANITY_STUDIO_PROJECT_ID=<project-id> SANITY_STUDIO_DATASET=production npm run deploy
```

## Domain from Ahost

After Cloudflare Pages project is live:

1. Add the custom domain in Cloudflare Pages → Custom domains.
2. In Ahost, change nameservers to the two Cloudflare nameservers Cloudflare gives you.
3. Wait for DNS propagation.

If you do not want to move the whole DNS zone to Cloudflare, add only the DNS records Cloudflare Pages gives you at Ahost. Moving nameservers is usually cleaner.
