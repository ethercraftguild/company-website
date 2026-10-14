# AGENTS.md — Ethercraft Guild company website

## Deployment (read this first)
- **Production is Vercel, branch `next`.** Verified 2026-10-14 in Vercel dashboard.
  The live site was once a stale build (Mar 10) while SEO pages sat undeployed —
  if `/about`, `/blog`, `/robots.txt` 404 again, check Vercel Production Branch first.
- `main` branch is the old Astro-era history → rename to `deprecated/astro-v1`
  in GitHub browser (can't be done from CLI while it's default). Set `next` as default first.
- No `.vercel/` link locally, no `vercel.json`. Two build modes:
  - Vercel server: `npm run build` (+ `postbuild: next-sitemap`).
  - Static export (GitHub Pages workflow): `npm run export`.
    `.github/workflows/deploy.yml` runs next-sitemap AFTER export then `cp`s
    sitemaps into `out/` (next-sitemap needs the `.next` manifest).

## Contact form — Google Apps Script (LIVE, verified 2026-10-14)
Submission path is **JSONP**, not fetch: Apps Script's ContentService cannot be read
cross-origin. Files: `src/components/ContactForm.tsx` (UI), `src/lib/jsonp.ts`
(transport), `src/lib/contactPayload.ts` (pure payload + validation, unit-tested).

**Env vars — never commit the values.** `NEXT_PUBLIC_FORM_ENDPOINT` (the `/exec` URL)
and `NEXT_PUBLIC_FORM_KEY`. They are public by design; the key is spam friction, not a
secret. Unset in a build = the mailto/Calendly fallback renders, by design.
Set in **Vercel Production AND Preview**, and as **GitHub repository variables**
(Settings > Secrets and variables > Actions > Variables) which `deploy.yml` forwards.
`NEXT_PUBLIC_*` is inlined at build time, so adding a var requires a redeploy.
After go-live, confirm both hosts point at the same `/exec`.

### Server contract (measured, not guessed)
- Required: `name`, `email`, `message`, `ts`, `key`. Optional: `company`, `phone`,
  `service`, `budget`. Honeypot: `hp`.
- Unknown field names are **silently dropped** (FORWARD_LABELS allowlist) — a typo
  loses data with no error. `contactPayload.test.ts` guards the exact names.
- Codes: `accepted | bad_key | invalid | too_soon | too_old | rate | error`.
  `"mail"` is documented in a comment but never returned.
- Every rejection returns the **same generic message**. `invalid` means only
  "non-empty name + non-empty message + email regex". So client-side field errors
  are the primary validation path — keep `validate()`.
- `hp` is checked **before** `ts` and before the rate limiter, and returns
  `accepted` with zero emails and zero rate cost. Use `hp=x` for UI test passes.
- Rate limit 5/hour per submitter email. Sixth returns `rate`.
- Auto-reply fires to every address used — test with mail you read.

### Behaviours that are deliberate, do not "simplify" them
- **Branch on `ok` first, code second.** `ok:true` covers a real accept *and* the
  honeypot's fake success. An unrecognised code must never strand the UI.
- **Clock skew is corrected.** Mount pings `?action=ping` -> `time`; `skew =
  time - now`; `ts` is stamped with that skew. A client clock running *ahead*
  yields a negative age and a permanent `too_soon`.
- **Ping failure renders the mailto/Calendly fallback**, never a submit button
  that cannot work.
- **Retry once on `too_soon`/`too_old`, waiting 4.5s.** Re-stamping `ts` to "now"
  gives age 0, which is still under the 4s floor, so the wait is required.
- **20s timeout, no resend.** Cold start plus Gmail send is slow. On timeout show
  "we may have received it, check for the confirmation email" and restore the button.
  Re-sending risks a duplicate mail.
- **Message capped at 600 chars with a live counter.** JSONP is a GET. Measured:
  600 non-ASCII chars = 3.5 KB URL and works; ~14.6 KB returns an HTML error page
  instead of JSONP. That failure degrades to the generic error, never a hang.

## Hard rule: no invented proof
- Never publish metrics, prices, client names, testimonials, or guarantees
  without owner approval. Past asks to "generate real data" were refused —
  anonymous role-based testimonials + "reference call under NDA" is the design.
- `TODO(result)` marker in `src/components/ProjectCard.tsx` = where approved
  outcome metrics go. `projects.json` has `problem`/`built`/`stack` only.
- Testimonial quote provenance (pre-existing copy) still needs owner confirmation.
- `stack` values in `projects.json` were detected from live client sites
  (generator meta + script signatures), Oct 2026 — re-verify if a client rebuilds.

## Blocked on owner (do not invent)
1. ~~GA4~~ — `G-5LXJ3CHHEP` supplied; set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in Vercel
   (Production + Preview) and as a repo variable, then redeploy. No hits until a
   visitor clicks Accept on the consent banner.
2. Week-1 Audit price / any pricing anchor (task item 7 skipped).
3. Remote-work claims in `RemoteClientGuide.tsx` (tool stack, report cadence, NDA terms) — owner-confirmed before treating as fact.
4. Clutch profile `clutch.co/profile/ethercraft-guild` returns 403 (bot-block, existence unverified) — removed from `sameAs`; re-add if confirmed. LinkedIn URL also disagrees between `config.ts` (`ethercraftguild`) and `StructuredData.tsx` (`ethercraft-guild`) — confirm canonical.
5. Toronto is an owner-confirmed past-customer city; it is NOT in `projects.json` (no listed project). Keep in `CLIENT_CITIES`, don't attach to a case study.

## SEO / assets
- `src/lib/seo.ts` `pageMetadata()` gives every route OG/Twitter/canonical
  plus `icons` (ico/SVG/96px), `apple` (180px), `manifest`. `themeColor` lives in
  `export const viewport` in `layout.tsx` — Next 15+ ignores `metadata.themeColor`.
- Favicons (RealFaviconGenerator, Oct 2026): `favicon.ico`, `favicon.svg`,
  `favicon-96x96.png`, `apple-touch-icon.png`, `web-app-manifest-{192,512}.png`,
  `site.webmanifest` in `public/`. Manifest theme/background = `#F7F7F7` (site bg).
- **`src/app/favicon.ico` must not exist.** An App Router icon file silently wins
  over `public/favicon.ico` (verified by md5 in `out/`); the old one was deleted.
- **`public/favicon.svg` is not a vector logo** — it is a 1024×1024 JPEG
  base64-embedded in an SVG shell (250 KB). Fine for the favicon slot, never for
  in-page use. Header + drawer use `public/logo.png` instead (128×128, 7 KB,
  regenerated from the same RFG mark via sharp when the mark changes).
  `StructuredData` + about page also reference `logo.png`.
- Dead placeholder SVGs deleted Oct 2026: `next`, `vercel`, `globe`, `file`, `window`.
- Sitemap = next-sitemap manifest auto-discovery; `additionalPaths` intentionally `[]`
  (re-adding walked routes duplicates every URL; root `page.tsx` edge case emits bogus `/page.tsx`).
- `public/robots.txt`, `public/sitemap*.xml` are gitignored build artifacts.
  Route `src/app/robots.ts` owns robots.txt in both modes.
- Client logos self-hosted in `public/clients/` (88KB total, Oct 2026 favicons);
  hotlinking was rejected (availability + NDA optics). `src/data/clients.ts`
  is the single source for logo bar + cities.

## Verification
- `npm test` — 9 tests over `contactPayload.ts` (required field names, optional-field
  forwarding, trimming, validation). Uses `node --test` with native type stripping;
  `allowImportingTsExtensions` is enabled in tsconfig for the `.ts` specifiers.
- `npx tsc --noEmit` then `npx next build` (29 routes).
- Contact form was verified against the live `/exec` with `hp=x` and IANA-reserved
  example.com addresses. **No real end-to-end submission to a live inbox has been
  performed** — owner must submit once by hand to confirm delivery and auto-reply.

## Hygiene
- Lint baseline has ~31 pre-existing errors (`any` types, unescaped entities in old files). Don't chase them; keep new/edited files clean.
- Verify with `npx tsc --noEmit` + `npx next build` (29 routes). ESLint count should not rise above baseline.
- Keep the visual identity: tokens `bg-card/border-border/rounded-[1.5rem]/rounded-pill`, mono labels, existing hover treatments.
