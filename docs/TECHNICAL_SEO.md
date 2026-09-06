# Technical SEO

## Sitemap and robots.txt

Both are served **dynamically from the Express API**, not as static
files, so they always reflect live data and the configured `SITE_URL`:

- `GET /sitemap.xml` — `server/src/controllers/seoController.ts`.
  Includes all static routes (Home, About, Education, Experience,
  Research, Publications, Presentations, Achievements, Contact) plus
  one `<url>` entry per published Publication and Presentation, with
  `<lastmod>` taken from each document's `updatedAt`. Degrades
  gracefully to static-routes-only if the database is unreachable
  (never throws a 500 that would break crawler access).
- `GET /robots.txt` — allows all crawlers, points to the sitemap.

A static fallback `client/public/robots.txt` exists only for the case
where the client is previewed standalone without the API in front
(e.g. `vite preview`); it is not used in the normal production
topology where the API serves both.

## Canonical URLs

Every route sets `<link rel="canonical">` via `SeoHead`, always
pointing at the `https://ashokmalhi.pro` origin regardless of how the
page was reached, preventing duplicate-content issues from any
alternate hostnames.

## Crawlability without SSR

This is a client-rendered SPA (Vite + React Router), not
server-rendered. To keep content crawlable:

- All primary content (bios, publication titles/abstracts, research
  areas) is rendered as real DOM text on initial React render — nothing
  critical is hidden behind user interaction (accordions default open
  where used, filters are additive not gating).
- `/sitemap.xml` and `/robots.txt` are served independently of the SPA
  bundle, so they're available even to crawlers that don't execute JS.
- If broader guaranteed indexing is required later (e.g. for AI
  crawlers that don't execute JavaScript at all), the recommended next
  step is prerendering (e.g. `vite-plugin-ssr`/a prerender step) or
  migrating the client build to a framework with SSG (Next.js/Astro)
  without changing the API or data layer — see docs/DEPLOYMENT.md.

## Structured data (JSON-LD)

Implemented in `client/src/lib/seo.ts` and injected per-page via
`SeoHead`:

| Schema type | Where | Purpose |
|---|---|---|
| `Person` | About, referenced by Home | Canonical entity: name + alternates, jobTitle, affiliation, alumniOf, sameAs |
| `WebSite` | Home | Site-level entity |
| `ProfilePage` | Home | Marks the homepage as the identity's profile page |
| `BreadcrumbList` | Every content route | Navigation breadcrumb trail |
| `ScholarlyArticle` | Publication detail | Per-publication structured data (title, year, authors, DOI when available) |

`sameAs` links (used in the `Person` schema) connect: ORCID, Scopus,
Google Scholar, ResearchGate, LinkedIn, Facebook, Instagram, YouTube —
exactly the identifiers supplied and verified, no more, no fewer.
GitHub, Reddit, Discord, Telegram, and Blogger are visible in the icon
rail (see below) but deliberately excluded from `sameAs` until a real
URL is supplied for each — see `client/src/lib/socialConfig.ts`.

## Social / academic / contact icon rail

`IconRail.tsx` (in `client/src/components/layout/`) renders a fixed
vertical rail (desktop) / compact row (mobile) from one central
configuration, `client/src/lib/socialConfig.ts` → `SOCIAL_LINKS`. This
is deliberately a separate list from `SAME_AS_LINKS` above: the icon
rail shows every platform the brief specifies, including ones with no
verified URL yet (GitHub, Reddit, Discord, Telegram, Blogger — rendered
as accessible, non-navigating "coming soon" placeholders, never a
fabricated URL) and contact channels (email/phone/WhatsApp) that are
never appropriate as `sameAs` social identity data. See
docs/CONTENT_UPDATE_GUIDE.md, "Updating a coming-soon social link," for
how to activate one once its real URL is supplied.

**Department is deliberately excluded from the `Person` JSON-LD.** The
only department/school value available ("Mittal School of Business")
was read from the Google Scholar profile's affiliation field, not
independently confirmed as an institutional record. Structured data
can't carry a "not independently verified" qualifier the way visible
page copy can (see `AboutPage.tsx`, which does show it, labeled
"Department (per Google Scholar)"), so it is intentionally left out of
`buildPersonSchema()` until confirmed directly. See
`client/src/lib/seo.ts` for the code comment explaining this.

**`alumniOf` includes institution names only, no degree detail.** The
three confirmed educational institutions (Sharda University, IMS
Ghaziabad, IPEM Ghaziabad) are asserted as plain organization names.
Degree type, specialization, and completion date are intentionally
left out of structured data — the PhD completion date has an unresolved
conflict between two verified sources (see docs/DATABASE.md), and no
specialization/thesis was ever supplied — see docs/ACADEMIC_SEO.md.

## Open Graph and Twitter Cards

Set per-route by `SeoHead`. `og:image` defaults to
`/og-default.png` (a placeholder path — see docs/CONTENT_UPDATE_GUIDE.md
for supplying a real Open Graph image once the profile photograph is
processed).

## Performance-related technical SEO

See docs/PERFORMANCE.md for Core Web Vitals work (code splitting,
image lazy-loading, bundle size). Fast, stable pages are themselves a
ranking factor.

## Favicon and web manifest

`client/public/favicon.svg` (monogram) and
`client/public/site.webmanifest` are wired in `index.html`.

## HTTPS / status codes / redirects

The Express app is deployment-target agnostic regarding TLS
termination (expected to sit behind a platform that terminates HTTPS,
e.g. Vercel/Render/Railway — see docs/DEPLOYMENT.md). The SPA's React
Router `NotFoundPage` renders for unmatched client routes; the API
returns a proper `404` JSON body via `notFoundHandler` for unmatched
API routes. Convenience redirects (`/scholar`, `/orcid`,
`/researchgate`, `/linkedin`) are implemented client-side in
`client/src/pages/redirects/ProfileRedirects.tsx`; if server-side
hosting is added later these can be promoted to real HTTP 301s at that
layer.

## No duplicate content / no orphan pages

Every Publication and Presentation has exactly one canonical URL
(`/publications/:slug`, `/presentations/:slug`), linked from its
respective list page and included in the sitemap — nothing is
reachable only by direct link guessing.
