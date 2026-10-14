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

## Contact form — delivery status
- `ContactForm.tsx` (shared by `/contact` page + header modal) posts to
  `SITE_CONFIG.formEndpoint` with honeypot field `company_website`, real
  success/error states, GA4 `form_submit` event.
- **Interim endpoint is Formspree `mjknarak`** (old config comment called it
  "Dummy" — deliverability to inbox UNVERIFIED, must test post-deploy).
- **Planned: Google Apps Script** owned by `ethercraftguild@gmail.com`.
  Set `NEXT_PUBLIC_FORM_ENDPOINT` to the `/exec` URL when deployed; the form
  auto-switches to no-cors GAS mode. Do NOT commit the exec URL.

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
1. `NEXT_PUBLIC_GA_MEASUREMENT_ID` — GA4 component + consent banner coded, inert without it.
2. Week-1 Audit price / any pricing anchor (task item 7 skipped).
3. Remote-work claims in `RemoteClientGuide.tsx` (tool stack, report cadence, NDA terms) — owner-confirmed before treating as fact.
4. Clutch profile `clutch.co/profile/ethercraft-guild` returns 403 (bot-block, existence unverified) — removed from `sameAs`; re-add if confirmed. LinkedIn URL also disagrees between `config.ts` (`ethercraftguild`) and `StructuredData.tsx` (`ethercraft-guild`) — confirm canonical.
5. Toronto is an owner-confirmed past-customer city; it is NOT in `projects.json` (no listed project). Keep in `CLIENT_CITIES`, don't attach to a case study.

## SEO / assets
- `src/lib/seo.ts` `pageMetadata()` gives every route OG/Twitter/canonical.
  Shared image `public/og.png` (1200×630, generated with sharp from brand
  tokens — script deleted after; regenerate similarly if identity changes).
- `public/logo.png` rendered from `favicon.svg` — `StructuredData` + about page reference it.
- Sitemap = next-sitemap manifest auto-discovery; `additionalPaths` intentionally `[]`
  (re-adding walked routes duplicates every URL; root `page.tsx` edge case emits bogus `/page.tsx`).
- `public/robots.txt`, `public/sitemap*.xml` are gitignored build artifacts.
  Route `src/app/robots.ts` owns robots.txt in both modes.
- Client logos self-hosted in `public/clients/` (88KB total, Oct 2026 favicons);
  hotlinking was rejected (availability + NDA optics). `src/data/clients.ts`
  is the single source for logo bar + cities.

## Hygiene
- Lint baseline has ~31 pre-existing errors (`any` types, unescaped entities in old files). Don't chase them; keep new/edited files clean.
- Verify with `npx tsc --noEmit` + `npx next build` (30 routes). ESLint count should not rise above baseline.
- Keep the visual identity: tokens `bg-card/border-border/rounded-[1.5rem]/rounded-pill`, mono labels, existing hover treatments.
