# Content Update Guide

This is the process for adding or correcting verified academic
information — the workflow this entire architecture was built to
support without requiring code changes for routine content updates.

## The workflow

```
Verified information is supplied (e.g. by the designated content source)
        ↓
Validate the information (cross-check spelling, dates, URLs)
        ↓
Add it to server/src/seed/data.ts (or, once built, the admin API)
        ↓
Run `npm run seed` (idempotent — safe to re-run)
        ↓
The API immediately serves the new data — no frontend changes needed
        ↓
SEO metadata/JSON-LD picks it up automatically (built from live data)
        ↓
Rebuild + redeploy the frontend only if a *new page/route* was added
```

Adding a new publication, education entry, presentation, or
achievement **never requires touching a React component** — every list
and detail page renders directly from the API response.

## Where each kind of content lives

| Content | File / mechanism |
|---|---|
| Biography (short/full), positioning, skills, specializations, languages, email | `server/src/seed/data.ts` → `personSeed`, then `npm run seed` |
| Education | `server/src/seed/data.ts` → `educationSeed` (3 confirmed degrees) |
| Experience | `server/src/seed/data.ts` → `experienceSeed` (5 confirmed roles) |
| Research interests | `server/src/seed/data.ts` → `researchInterestsSeed` |
| Publications | `server/src/seed/data.ts` → `publicationsSeed` |
| Presentations | `server/src/seed/data.ts` → `presentationsSeed` (6 confirmed records) |
| Achievements / certifications | `server/src/seed/data.ts` → `achievementsSeed` (8 confirmed certifications) |
| Academic/social profile links (JSON-LD `sameAs`) | `server/src/seed/data.ts` → `academicProfilesSeed` |
| Contact information (institution, department, office) | `server/src/seed/data.ts` → `contactInformationSeed` |
| Icon-rail links (LinkedIn, GitHub, Reddit, Discord, Telegram, Blogger, email, phone, WhatsApp, etc.) | `client/src/lib/socialConfig.ts` → `SOCIAL_LINKS` (ONE central place — see "Updating a coming-soon social link" below) |
| Profile photograph | See "Adding the verified profile photograph" below |

## Flagging a cross-source conflict (worked example)

When two verified sources disagree on a fact for an Education or
Experience record (e.g. LinkedIn and the official personal website
citing different years), **never silently pick one and discard the
other**. Instead:

1. Populate the record with the value from the higher-priority source
   (see the source-priority order below).
2. Set that record's `provenanceNote` to a specific, human-readable
   sentence stating both values and which one is displayed — see
   `educationSeed`'s PhD entry in `server/src/seed/data.ts` for a
   worked example (2024 per the official website vs. 2019–2023 per
   LinkedIn).
3. The frontend (`EducationPage.tsx`, `ExperiencePage.tsx`) always
   renders `provenanceNote` as a visible qualifier — never omit it once
   set, and never clear it just because it's inconvenient to display.

### Source priority (when sources conflict)

1. Explicit user-provided information
2. Current official personal website records
3. User-provided academic profile data (e.g. Google Scholar)
4. Public professional profiles such as LinkedIn
5. Other reputable publication/academic sources

This order decides which value is *displayed*; it never licenses
deleting the losing source's value — that always goes into
`provenanceNote` instead.

## Adding a publication (worked example)

1. Open `server/src/seed/data.ts`.
2. Add a new object to `publicationsSeed`:
   ```ts
   {
     title: 'Exact verified title',
     year: 2027,
     citationCount: null, // or a verified number
     // Only set researchAreas if the user has actually supplied a
     // subject classification for this publication, or you are
     // deliberately inferring one from the title (in which case set
     // researchAreasSource to 'inferred-from-title', never 'confirmed').
     // Tags from the confirmed research-interest list only, or extend
     // ResearchInterest first.
     researchAreas: ['Artificial Intelligence'],
     researchAreasSource: 'inferred-from-title', // or 'confirmed' only if the user supplied it
   }
   ```
3. If additional verified bibliographic detail is available (journal,
   DOI, authors, abstract, etc.), include those fields too — every
   field in the `Publication` schema (see docs/DATABASE.md) accepts
   them; omit anything not yet verified rather than guessing.
4. **Never set `researchAreasSource: 'confirmed'` unless the user (or
   the venue's own classification) actually supplied the research area**
   — the frontend suppresses the "(inferred from title)" qualifier for
   `'confirmed'` tags, so marking a guess as confirmed would present an
   editorial inference as verified fact.
4. Run `npm run seed`. The upsert key is `title + year`, so re-running
   is always safe and never duplicates.
5. The new publication is immediately available at
   `GET /api/publications` and gets its own page at
   `/publications/<generated-slug>` — no other changes required.

## Adding the verified profile photograph

**Status: done.** The real, user-confirmed black-and-white photograph
was integrated on 2026-09-06. The steps below are recorded for anyone
replacing the photograph in the future:

1. Place the original, unedited photograph in `assets/original/`
   (gitignored — never committed). Current original:
   `assets/original/ashok-malhi-profile-original.png`.
2. Produce a professional black-and-white web version — resize and
   re-encode ONLY, never retouch or regenerate the face:
   - The source here was already true grayscale, so no color→grayscale
     conversion was needed; if a future replacement is in color, convert
     to true grayscale (not just a CSS filter) before resizing.
   - Export as WebP at 220×220 (1x) and 440×440 (2x/retina), filename
     `ashok-malhi-profile-bw.webp` (2x/canonical) and
     `ashok-malhi-profile-bw@1x.webp` (1x) per the brief's naming
     convention, plus a small thumbnail variant.
   - Save the processed files to `assets/processed/` and to
     `client/public/images/` so Vite serves them directly.
3. Create or update the `MediaAsset` seed entry (`mediaAssetsSeed` in
   `server/src/seed/data.ts`) with `kind: 'profile-photo'`,
   `isPlaceholder: false`, and both `variants.webBw` /
   `variants.webBw1x` pointing at the served paths.
4. `server/src/seed/run.ts` upserts the MediaAsset first, then links its
   generated `_id` into the `Person` document's `profileImage` field
   automatically — no manual ID copying needed.
5. `ProfileImage.tsx` automatically switches from the placeholder state
   to rendering the real photograph (with `srcSet` for 1x/2x) — no
   component changes needed for a routine photo replacement.
6. Keep the original in the local backup structure (docs/BACKUP.md);
   never expose the unprocessed original publicly.

## Updating a coming-soon social link

GitHub, Reddit, Discord, Telegram, and Blogger currently have no
verified URL and render as visible, non-navigating "coming soon"
placeholders in the icon rail (`IconRail.tsx`). To activate one once a
real URL is supplied:

1. Open `client/src/lib/socialConfig.ts`.
2. Find that platform's entry in `SOCIAL_LINKS` and change `url: null`
   to the exact verified URL, and `status: 'coming-soon'` to
   `status: 'active'`.
3. That's the only change needed — `IconRail.tsx` automatically renders
   it as a live link (correct `target`/`rel`, tooltip, aria-label) the
   moment `status` is `'active'` and `url` is non-null.
4. If the platform should also appear in JSON-LD `sameAs`, add its URL
   to `SAME_AS_LINKS` in `client/src/lib/seo.ts` as well — the icon
   rail and `sameAs` are deliberately separate lists (see
   `socialConfig.ts`'s doc comment) so a link can appear in the visible
   rail without being asserted as machine-readable identity data, or
   vice versa (e.g. Scopus is in `sameAs` but not in the Part 13 icon
   set).
5. Never invent the URL to "complete" the rail early — leave `url: null`
   until the user supplies the exact verified link.

## Extending the schema for new fields

If genuinely new information doesn't fit an existing field (e.g. a
grant or funded-project record type not currently modeled):

1. Add the field/model to `shared/types/academic.ts` first (the
   contract).
2. Mirror it in the corresponding Mongoose schema in
   `server/src/models/`.
3. Extend the relevant controller/route only if new query behavior is
   needed (most additions need none).
4. Update the frontend component that renders that record type.
5. Document the new field in docs/DATABASE.md.

## Future: admin API instead of editing seed data directly

`server/src/routes/admin.routes.ts` and `middleware/auth.ts` already
provide JWT-protected route scaffolding. To turn this into a real CMS:

1. Create an `AdminUser` (bcrypt-hash a password, insert directly or
   via a one-off script — never commit a real password anywhere).
2. Implement `POST/PUT/DELETE` handlers per resource in
   `server/src/controllers/`, reusing the existing Zod validators as a
   base.
3. Mount them under `admin.routes.ts` behind `requireAuth`.
4. Build a minimal authenticated admin UI (a new set of routes under
   `client/src/pages/admin/`) that calls these endpoints.

This is deliberately not built out fully yet since no verified content
volume currently justifies a full CMS UI — direct seed-data edits are
faster and equally safe while the dataset is small.

## Non-negotiable rule for anyone updating content

**Never invent a value to fill a gap.** If a fact is not yet verified,
leave the field `null`/omitted. The frontend is designed to render that
honestly (see `EmptyState.tsx`) rather than show fabricated content.
