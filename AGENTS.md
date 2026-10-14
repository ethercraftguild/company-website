# AGENTS.md — Ethercraft Guild company website

## Deployment (read this first)
- **Production is Vercel, branch `next`.** Verified 2026-10-14 in Vercel dashboard.
  The live site was once a stale build (Mar 10) while SEO pages sat undeployed —
  if `/about`, `/blog`, `/robots.txt` 404 again, check Vercel Production Branch first.
- `main` branch is the old Astro-era history → rename to `deprecated/astro-v1`
  in GitHub browser (can't be done from CLI while it's default). Set `next` as default first.
- No `.vercel/` link locally, no `vercel.json`. Two build modes:
  - Vercel server: `yarn build` (+ `postbuild: next-sitemap`).
  - Static export (GitHub Pages workflow): `yarn export`.
    `.github/workflows/deploy.yml` runs next-sitemap AFTER export then `cp`s
    sitemaps into `out/` (next-sitemap needs the `.next` manifest).

## Contact form — Google Apps Script (server contract verified 2026-10-14; client JSONP fix awaiting deploy)
Submission path is **JSONP**, not fetch: Apps Script's ContentService cannot be read
cross-origin. Files: `src/components/ContactForm.tsx` (UI), `src/lib/jsonp.ts`
(transport), `src/lib/contactPayload.ts` (pure payload + validation, unit-tested),
`src/lib/jsonp.test.ts` (DOM-shim regression suite).

**Honest history, do not rewrite it.** Until 2026-10-15 this section claimed the
form was "verified against the live /exec" — that was curl-true and browser-false.
`jsonp.ts` registered the global as `{}` instead of a function, so the server's
`cb({...})` threw, `onload` resolved `{}`, and EVERY submission showed the generic
error. Proved with a DOM shim, fixed by resolving inside the injected callback,
regression-tested, then confirmed with a real browser submit that landed in the
owner's inbox. curl is never acceptance for this form.

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
- Rate limit **10/hour** per submitter email (AGENTS.md said 5 until 2026-10-15;
  live `diag` reports `limits.perHour: 10`). Eleventh returns `rate`.
- Ping returns `serverEpoch` (use it; `time` is the legacy fallback), plus
  `minAge: 4` and `maxAge: 1800` explicitly. `diag` also reports `autoreply`,
  `throttle_keys`, `timeZone`. `diag` omits `executeAs`/`userAccess`
  (ScriptApp.getService().getConfig() throws inside its try/catch — known server
  quirk, do not chase; confirm ME/Anyone in the Apps Script console instead).
- Auto-reply fires to every address used — test with mail you read.

### Behaviours that are deliberate, do not "simplify" them
- **Branch on `ok` first, code second.** `ok:true` covers a real accept *and* the
  honeypot's fake success. An unrecognised code must never strand the UI.
- **Clock skew is corrected.** Mount pings `?action=ping` -> `serverEpoch`
  (fallback `time`); `skew = serverEpoch - now`; `ts` is stamped with that skew.
  A client clock running *ahead* yields a negative age and a permanent `too_soon`.
  `ts` is re-stamped on every field edit — a form left open past `maxAge`
  (30 min) would otherwise submit stale and eat a `too_old`.
- **No state writes after unmount.** The header modal can close mid-request;
  `mountedRef` guards every post-await write. `jsonp()` cleanup is independent
  of React and always runs.
- **Ping failure renders the mailto/Calendly fallback**, never a submit button
  that cannot work.
- **Retry once on `too_soon`/`too_old`, waiting 4.5s.** Re-stamping `ts` to "now"
  gives age 0, which is still under the 4s floor, so the wait is required.
- **Resolve inside the callback, never in `onload`.** `onload`/`onerror` are
  guards that settle failure (HTML error page, ORB/MIME block). One `settled`
  flag across callback/onload/onerror/timeout; callback name matches the server
  sanitizer `^[A-Za-z_$][A-Za-z0-9_$]{0,63}$`; global + `<script>` removed in
  cleanup. `jsonp.test.ts` covers all four exits plus single-fire.
- **20s timeout, no resend.** Cold start plus Gmail send is slow. On timeout show
  "we may have received it, check for the confirmation email" and restore the button.
  Re-sending risks a duplicate mail.
- **Message capped at 600 chars with a live counter.** JSONP is a GET. Measured:
  600 non-ASCII chars = 3.5 KB URL and works; ~14.6 KB returns an HTML error page
  instead of JSONP. That failure degrades to the generic error, never a hang.

## Identity authority (owner-supplied, treat as final)
- **Business name: "Ethercraft Guild"** — the Trade-Licence name. Emitted as BOTH
  `name` and `legalName`. It is **not** a cooperative: never add `alternateName`
  or any explanatory schema field about the word "Guild".
- **Founder: "Mohammad Mustakim Hassan"** — `{ "@type": "Person", "name": ... }`
  as `founder` of the ProfessionalService. No `jobTitle` (none supplied), no
  `foundingDate` (none supplied), no Person-level `sameAs`.
- **PUBLICATION BAN:** the owner's nicknames (study-years Chinese name), personal
  nickname and any gaming/professional handle must never appear in JSON-LD, copy,
  comments or commit messages. Verified absent from `src/` as of 2026-10-15.
- All identity strings live in the single config module **`src/config.ts:1`
  (`SITE_CONFIG`)**. `src/components/StructuredData.tsx`, `src/lib/schema.ts`,
  `src/lib/schemaPaths.ts` and `src/data/clients.ts` contain **zero** literals.
  `config.knowsAboutOverride` — when set, published verbatim; when unset, terms
  are derived from repo data only. Never invent the list.
- Legacy support deliberately removed 2026-10-15: the `time`-field fallback is
  kept (`serverEpoch ?? time`) because the server still ships both; everything
  else legacy is gone — no `telephone` key, no `identifier` key, no
  `siteHost` derivation, no `alternateName`, no BlogPosting `author`.

## One node per @id (schema rule)
Every route emits ONE `@graph` containing exactly one `ProfessionalService` node
(`@id` = `<origin>/#organization`) plus one page node whose `@id` is THAT route's
canonical URL. Other nodes (`Service`, `FAQPage`) may coexist but must carry
`provider: {"@id": "<origin>/#organization"}` references, never a second copy of
the organization. **Cautionary tale:** `src/lib/blog/schema.ts` once embedded its
own `Organization` inside `BlogPosting.publisher` and `Service.provider`, and set
`BlogPosting.author` to a `Person` named after the *company*. Both are the exact
class of bug the (a) assertion exists to catch. `author` is now absent until the
byline question is answered.

## Hard rule: no invented proof
- Never publish metrics, prices, client names, testimonials, or guarantees
  without owner approval. Past asks to "generate real data" were refused —
  anonymous role-based testimonials + "reference call under NDA" is the design.
- Metrics plumbing LIVE 2026-10-15, zero numbers published. `projects.json`
  entries carry `metrics: []`; type is `CaseMetric {label, value, source}` in
  `src/data/clients.ts` (`source` = approval trail, never rendered).
  `ProjectCard` renders `Result` callouts (max 3) only when values exist — empty
  array renders no frame. Process metrics ("Delivered in N weeks") are
  spec-sanctioned once MoJin confirms N (Part 3 Q2); outcome callouts replace them
  later with zero layout change.
- Testimonial quote provenance (pre-existing copy) still needs owner confirmation.
- `stack` values in `projects.json` were detected from live client sites
  (generator meta + script signatures), Oct 2026 — re-verify if a client rebuilds.

## Blocked on owner (do not invent)
1. ~~GA4~~ — DONE 2026-10-15. `G-5LXJ3CHHEP` verified inlined in live JS chunks.
   No hits until a visitor clicks Accept on the consent banner.
2. Week-1 Audit price (task item 7) — IN PROGRESS 2026-10-15. `AuditOffer`
   section built and placed after the hero + on /contact; price renders only
   when `NEXT_PUBLIC_AUDIT_PRICE` / `config.auditPrice` holds confirmed text.
   Draft on the table: $1,900 international / ৳120,000 BD. Until confirmed, the
   section shows scope + deliverables with NO price. No strikethrough anchors.
3. Remote-work claims in `RemoteClientGuide.tsx` (tool stack, report cadence, NDA terms) — owner-confirmed before treating as fact.
4. Clutch profile `clutch.co/profile/ethercraft-guild` returns 403 (bot-block, existence unverified) — removed from `sameAs`; re-add if confirmed. LinkedIn URL also disagrees between `config.ts` (`ethercraftguild`) and `StructuredData.tsx` (`ethercraft-guild`) — confirm canonical.
5. Toronto is an owner-confirmed past-customer city; it is NOT in `projects.json` (no listed project). Keep in `CLIENT_CITIES`, don't attach to a case study.
6. ~~Fallback email~~ — RESOLVED 2026-10-15. `hello@ethercraft.guild` cannot
   receive mail (.guild TLD not delegated, no MX possible). `config.ts` email is
   now `ethercraftguild@gmail.com`, matching Apps Script OWNER_EMAIL. Single
   source: every mailto in footer/contact/modal/noscript interpolates it.
   Client email regex mirrors the server rule `/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/`
   exactly — not stricter, not looser. Inputs carry `inputMode`/`autoComplete`.

## SEO / assets
- `src/lib/seo.ts` `pageMetadata()` gives every route OG/Twitter/canonical
  plus `icons` (ico/SVG/96px), `apple` (180px), `manifest`. `themeColor` lives in
  `export const viewport` in `layout.tsx` — Next 15+ ignores `metadata.themeColor`.
  `metadataBase` set in `pageMetadata()` so canonical/og:url are absolute on every
  host. Blog `[slug]` keeps its own metadata (article type): fixed 2026-10-15 to
  `og.png` 1200×630 (was `logo.png` with false 1200×630 dims) + Twitter card.
- Favicons (RealFaviconGenerator, Oct 2026): `favicon.ico`, `favicon.svg`,
  `favicon-96x96.png`, `apple-touch-icon.png`, `web-app-manifest-{192,512}.png`,
  `site.webmanifest` in `public/`. Manifest theme/background = `#F7F7F7` (site bg).
- **`src/app/favicon.ico` must not exist.** An App Router icon file silently wins
  over `public/favicon.ico` (verified by md5 in `out/`); the old one was deleted.
- **`public/favicon.svg` is not a vector logo** — 1000×1000, ~502 KB, JPEG(s)
  base64-embedded in an SVG shell with light/dark `prefers-color-scheme` variants
  (re-uploaded 2026-10-15; was 1024×1024/250 KB single). Fine for the favicon slot,
  never for in-page use. Header + drawer use `public/logo.png` instead (128×128,
  7 KB; rendered from the pre-theme mark — re-render from MoJin's canonical light
  or dark variant when he picks, Part 3 Q10). `StructuredData` + about page also
  reference `logo.png`.
- `site.webmanifest` carries `start_url: "/"`, `scope: "/"`, theme/background
  `#F7F7F7`. The 2026-10-15 re-upload reset theme to `#ffffff`; convention is the
  site bg unless MoJin overrides. Manifest icon filenames are
  `web-app-manifest-192x192.png` / `-512x512.png` — canonical as-is, do not
  "fix" to RFG defaults.
- Dead placeholder SVGs deleted Oct 2026: `next`, `vercel`, `globe`, `file`, `window`.
- Sitemap = next-sitemap manifest auto-discovery; `additionalPaths` intentionally `[]`
  (re-adding walked routes duplicates every URL; root `page.tsx` edge case emits bogus `/page.tsx`).
- `public/robots.txt`, `public/sitemap*.xml` are gitignored build artifacts.
  Route `src/app/robots.ts` owns robots.txt in both modes.
- Client logos self-hosted in `public/clients/` (88KB total, Oct 2026 favicons);
  hotlinking was rejected (availability + NDA optics). `src/data/clients.ts`
  is the single source for logo bar + cities.

## Spec wording — items 6 & 7 (verbatim, quote this, not memory)
> **6.** /work: turn each project into a mini case study layout:
> Client | Problem | What we built (stack) | Measurable result | Live link.
> Add metric callouts per project (e.g. "-60% checkout latency", "0 critical CVEs",
> "+220% organic traffic") — collect real numbers from the clients first; use
> process metrics ("delivered in 6 weeks") until outcome numbers are approved.
>
> **7.** Add at least one pricing anchor or "starting from" figure, or a fixed-price
> entry offer (e.g. "Week-1 Product Audit — fixed fee") near the hero and on /contact.
> Right now the only CTA is a high-commitment "Start Consultation."

## Verification
- `yarn test` — **32 tests**, no alias shim, no bundler. `node --test src/lib/*.test.ts`
  with Node 24 native type stripping (`allowImportingTsExtensions` in tsconfig).
  - `contactPayload.test.ts` (9) — required field names, optional-field forwarding,
    trimming, validation. Pure module, relative import.
  - `jsonp.test.ts` (10) — DOM-shim transport suite: callable global, payload resolves
    before onload, junk-onload settles failure, single-fire, cleanup, sanitizer.
  - `schemaPaths.test.ts` (4) — pure route helpers.
  - `schema.test.ts` (9) — walks built `out/**/*.html`: (a) one node per @id,
    (a2) same @id = same content, (b) no `""`/`[]` values, (c) page @id ==
    rel=canonical, (d) no missing asset, (e) every content route has a block.
    Error pages (`404.html`, `_not-found.html`) are excluded by design.
  - The old `test/alias-resolver.mjs` loader shim was **deleted** 2026-10-15. Pure
    modules are imported relatively; impure app code is tested through built HTML.
- `yarn test` -> `tsc --noEmit` -> `next build` (29 routes) -> `export`, then the
  prerender gate: `grep -rl 'application/ld+json' out --include='*.html' | wc -l`
  must equal the number of CONTENT html files (27, not 29 — `next build` counts
  /_not-found as a route and emits robots.txt as a non-HTML route).
- Contact form: real browser submit against live `/exec` 2026-10-15 landed in
  the owner's inbox (success UI + counter reset + form cleared; owner confirmed
  receipt). `hp=x` remains the free UI-test path (no mail, no rate cost).
  Remaining: owner does one final end-to-end submit post-deploy as closing proof.

## Hygiene
- **Package manager: yarn.** No `npm` commands from 2026-10-15 onward.
- Lint baseline, **measured 2026-10-15: 37 problems (28 errors, 9 warnings)** — not
  the `~31` or `36` previously recorded. All 37 pre-date this session; none are in
  files authored or edited this pass (`eslint` clean on every T5/T6 file). Do not
  move this number silently — re-measure and attribute.
- Don't chase pre-existing errors (`any` types, unescaped entities in old files);
  keep new/edited files clean.
- Verify with `tsc --noEmit` + `next build` (29 routes). ESLint count should not rise above the measured 37.
- Keep the visual identity: tokens `bg-card/border-border/rounded-[1.5rem]/rounded-pill`, mono labels, existing hover treatments.
