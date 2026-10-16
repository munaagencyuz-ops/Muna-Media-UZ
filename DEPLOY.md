# Muna Media UZ — source-only release notes

## Review and release boundary

This implementation copy is not a deployment approval. Do not deploy until the
parent/owner completes the anonymous production crawl and dirty-artifact parity
review. Keep CMS/Studio Access protection and all existing runtime bindings.
Never copy production credentials into this checkout or synthetic tests.

```sh
npm ci --ignore-scripts --no-audit --no-fund
npm run build
npm test
```

The build regenerates all eight browser bundles, content-versions their HTML URLs,
copies only `scripts/public-files.json` to `dist/`, and compiles the existing Pages
Functions into `dist/_worker.js` with generated `dist/_routes.json`. The advanced-mode
Worker retains the file-based dispatcher and its `ASSETS` fallback; it is not a new
handwritten router. `.build/public-manifest.json` records every upload file/hash.
Do not upload the repository root, JSX, node_modules, tests, studio source, env files
or `.build/`. Existing **compiled** `cms/` artifacts remain allowlisted to preserve
that separately protected application; `studio/` source never enters `dist/`.

Run local runtimes from a frozen build. Restart them after rebuilding the compiled
Worker, and use distinct `--persist-to` directories for parallel source/staged
servers to avoid SQLite lock collisions. Local acceptance scripts:

```sh
# Start in separate terminals, no remote bindings or production .dev.vars:
npx --no-install wrangler pages dev . --ip 127.0.0.1 --port 8791 --inspector-port 9291 --persist-to .build/state-source
npx --no-install wrangler pages dev dist --ip 127.0.0.1 --port 8792 --inspector-port 9292 --persist-to .build/state-staged
python3 tests/runtime_equivalence.py --source http://127.0.0.1:8791 --staged http://127.0.0.1:8792 --out <new-evidence-dir>
python3 tests/browser_acceptance.py --base http://127.0.0.1:8792 --out <new-browser-dir> --forms
```

Browser tests require Python Playwright plus its Chromium browser. They intercept
all form sends with explicitly synthetic payloads, block analytics and reject any
non-loopback acceptance base. Handler unit tests replace fetch with recording
fixtures. Passing these tests does not prove production lead delivery.

The source `robots.txt` retains the captured training/content policy and restores
Sitemap/rendering-asset access. If Cloudflare managed robots replaces origin content,
the parent must restore those directives in the **actual anonymous edge response**;
a local file alone is not live acceptance.

## What is already prepared

- Static Muna Media website can be deployed directly to Cloudflare Pages.
- `functions/api/contact.js` accepts contact-form submissions at `/api/contact`.
- Contact submissions are saved into Sanity as `lead` documents when Cloudflare env vars are configured.
- `studio/` contains a Sanity Studio with schemas for leads, services, cases, testimonials, FAQ, and site settings.

## Cloudflare Pages settings

Create/import a Pages project from this repo:

- Framework preset: `None`
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `/`
- Node version: `22`

Environment variables for Production and Preview:

- `SANITY_PROJECT_ID`
- `SANITY_DATASET` = `production`
- `SANITY_API_VERSION` = `2025-01-01`
- `SANITY_API_TOKEN` = token with write access to create `lead` documents
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

Preserve the existing Production/Preview values through readback; do not overwrite
them from placeholder examples. Compilation does not embed these bindings. No
compatibility-date or binding migration is required by the staging layout change.

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
