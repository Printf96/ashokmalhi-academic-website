# Performance

## Measured production build

```
dist/index.html                   1.50 kB  (gzip 0.75 kB)
dist/assets/index-*.css          19.50 kB  (gzip 4.11 kB)
dist/assets/index-*.js           56.20 kB  (gzip 17.08 kB)
dist/assets/vendor-*.js         163.96 kB  (gzip 53.55 kB)
```

Total first-load JS (gzipped) is ~71 KB — well within a healthy budget
for a Core Web Vitals-friendly site. No component-level code splitting
was needed yet given the page count and simplicity; `vendor` (React +
ReactDOM + React Router) is split from application code via
`manualChunks` in `vite.config.ts` so it caches independently of
day-to-day content/UI changes.

## Techniques applied

- **Minimal dependency surface**: no UI kit, no animation library, no
  client-side data-fetching library — see docs/ARCHITECTURE.md for the
  rationale. Every dependency in `client/package.json` is used.
- **System/self-hosted-adjacent fonts**: Inter + IBM Plex Mono loaded
  from Google Fonts with `rel="preconnect"` hints in `index.html`; only
  the specific weights used are requested.
- **Code splitting**: route-based chunking is available for free via
  Vite/Rollup if routes grow; the vendor/app chunk split is already in
  place.
- **Lazy image loading**: the profile image uses `loading="eager"`
  (it's above the fold, in the hero) — future gallery/media additions
  should default to `loading="lazy"`.
- **Image variants**: `MediaAsset.variants` (original/webBw/thumbnail)
  exists specifically so the frontend can request an appropriately
  sized image rather than shipping a single oversized original — see
  docs/CONTENT_UPDATE_GUIDE.md for the photo pipeline.
- **Compression**: the Express server applies `compression()`
  middleware (gzip) to all API responses.
- **Efficient queries**: `.lean()` is used on every read-only Mongoose
  query, skipping hydration overhead for data that's serialized
  straight to JSON. The Publications endpoint computes
  `availableYears`/`availableResearchAreas` via `distinct()` rather
  than pulling full documents.
- **Indexes**: see docs/DATABASE.md — text and standard indexes back
  the search/filter/sort paths used by the Publications page so those
  queries don't degrade as the publication count grows.
- **HTTP caching headers**: static assets built by Vite are
  content-hashed (`index-D1B_iFhd.css`), so they are safe to cache
  aggressively at the CDN/hosting layer (see docs/DEPLOYMENT.md for the
  recommended `Cache-Control` configuration).

## Core Web Vitals expectations

Given the bundle size, absence of render-blocking heavy scripts, and
static-first content model, this build is positioned to score well on
LCP (small hero, no large unoptimized images by default), CLS (no
layout-shifting ads/embeds, fixed-size image containers), and INP (no
heavy client-side computation on interaction).

## Known follow-ups

A live Lighthouse/PageSpeed Insights run against a deployed instance
with a populated database and the real profile photograph is the
correct final verification step — this sandboxed build environment
does not have outbound access to run that against a live deployment
(see docs/DEPLOYMENT.md, "Environment limitations"). Once the real
profile photograph is added, ensure its processed `webBw` variant is
served as WebP/AVIF with explicit `width`/`height` (already wired in
`ProfileImage.tsx`) to preserve CLS performance.
