# City hub release — 2026-10-31

## Published scope

- Russian: https://munamedia.uz/ru/shaharlar
- Uzbek: https://munamedia.uz/shaharlar
- Active Worker version: `3aad75e7-e31f-4f62-b2ae-2e3e737a9a0e`, verified at 100% traffic.
- Previous version: `a6e66950-cb35-4553-a5e8-63a3d7b426fe`.
- Source branch: `release/uzbek-local-20261027`.

Replaced the technical flat directory with a client-facing page: branded navigation, purpose-led introduction, searchable city and region selection, 14 existing planning-guide links, service directions, briefing steps and contacts. All 120 verified city choices and their existing locale-specific form-prefill links remain available. Regions use localized display names; classifier codes, null parents and repeated technical warnings are no longer visible on the hubs. Source geography and differentiated guides are unchanged. No offices, inventory, local projects, prices or coverage guarantees were invented.

The directory is server-rendered with native region disclosures. Search progressively enhances it; without JavaScript city links, guides and contact actions remain usable. New CSS/JS filenames include their SHA-256 content hashes, respecting the existing immutable asset policy.

## Verification

- `npm run build`: passed during implementation.
- Parent rerun `npm test`: **155 passed, zero failures**.
- Local browser acceptance: **23 groups passed** including before-state reproduction; parent independently reran **22 current-state groups**, without the optional before-state group.
- Local and public browser checks exercised RU/UZ at 320, 390, 768 and 1440 pixels; no horizontal overflow.
- Public browser checks passed: real loaded logos, metadata, 120 cities, 14 guides, city aliases, combined region/search filter, no-results recovery, reset and actual live homepage form prefill. No form was submitted; all non-GET/HEAD browser requests were blocked, with zero attempts.
- Exact approved telephone link checked on both hubs.
- Public GET readback: **74/74 routes returned 200**. Of **91 before/after requests**, only the two hub HTML bodies changed; the other **89 bodies and all statuses were preserved**. The comparison excludes only the exact injected Cloudflare analytics script. New CSS/JS served bytes equal the frozen local files.
- Read-only readiness remained `{"available":true}`. No new Telegram/email test lead was sent for this content-only change.

## Runtime preservation

This release did not ship the rebuilt Pages Functions module, whose temporary-path source comment varies between builds. It downloaded and retained the exact previously deployed Worker entry and source map, checked dry-run byte equality, then published the new static assets with that frozen entry using an explicit no-build config, `--no-bundle` and `--keep-vars`.

Readback confirmed:

- Worker entry SHA-256 unchanged: `96b62431d400ba4ae4f6daccf831dd97b96691bea6cfeea381723b202bc62fa2`.
- Source map SHA-256 unchanged: `494b2a9f78fe78ecfaab0d934b06c40a7007904647de11c4ceb58a3dc2a741ec`.
- All binding descriptors, including the existing delivery Durable Object and protected secret names/types, unchanged.
- Compatibility settings, zone routes and custom-domain attachments unchanged; only the release annotation changed.
- Existing eight UI bundles, all 28 guide HTML documents, sitemap, redirect controls and other source pages preserved.

No Worker/API/DO/contact source, secret value, migration history, DNS, Access, Digital site or `.com` site was modified. The upload contained exactly two changed hub HTML assets and two new content-addressed assets.

## Evidence and limitations

Detailed implementation report and screenshots are stored in the private parent project workspace, together with parent local/public browser results and before/after runtime and HTTP receipts. Credentials, private snapshots and raw runtime evidence are not committed.

Browser verification used Chromium, not Safari/Firefox or physical devices. No screen-reader speech test or paid penetration scan is claimed. Existing `www`/Access behavior was outside this change; it was not repaired.

To undo this static UI release, the previous Worker version is recorded above. Resource data is not restored by a code/assets rollback; this release made no resource-data changes.
