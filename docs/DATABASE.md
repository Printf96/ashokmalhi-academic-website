# Database

MongoDB via Mongoose. All schemas live in `server/src/models/`.

## Collections

| Model | Kind | Notes |
|---|---|---|
| `Person` | Singleton | Core identity: display name, author name variants, affiliation, department (Scholar-sourced), bio, positioning statement, technical/research/soft skills, specializations, languages, profile image ref, Scholar metrics snapshot |
| `Education` | Ordered collection | `verified` flag; `provenanceNote` for unresolved cross-source date conflicts; seeded with 3 confirmed degrees (PhD, PGDM, BCA) |
| `Experience` | Ordered collection | `responsibilities` array, `provenanceNote` for flagged date overlaps; seeded with 5 confirmed roles (current + 4 prior) |
| `ResearchInterest` | Ordered collection | Slugified; seeded from the 8 confirmed domains (incl. AIoT) |
| `Publication` | Collection, text-indexed | Slugified `title-year`; only verified fields populated; `researchAreasSource` marks per-publication topic tags as confirmed vs. inferred |
| `Presentation` | Collection | `dateDisplay` for published date ranges, `scope` for "International" etc.; seeded with 6 confirmed records |
| `Achievement` | Ordered collection | Also used for professional certifications (`type: 'certification'`); seeded with 8 confirmed certifications |
| `AcademicProfile` | Collection | One document per network (orcid, scopus, google-scholar, researchgate, linkedin, facebook, instagram, website) |
| `ContactInformation` | Singleton | Public-facing contact fields |
| `ContactSubmission` | Collection | Stores contact form submissions (not publicly readable) |
| `MediaAsset` | Collection | Tracks the profile photo and its processed variants (`webBw` 2x, `webBw1x` 1x, `thumbnail`); the current profile photo is real (`isPlaceholder: false`), linked from `Person.profileImage` |
| `AdminUser` | Collection | Future CMS authentication; bcrypt password hashes only |

## Design principles

1. **Optional over invented.** Every content field that isn't currently
   verified is `null`/empty rather than populated with a plausible
   guess. The frontend renders these as explicit "not yet available"
   states (see `client/src/components/ui/EmptyState.tsx`), never as
   `undefined`, `null`, or blank gaps.
2. **`verified` flags** on Education, Experience, Presentation, and
   Achievement mark whether a record has been cross-checked against a
   verified source, supporting a future editorial workflow without a
   schema change. **`researchAreasSource`** on Publication plays the
   same role for per-publication topic tags specifically: `'confirmed'`
   only when the user or the venue itself supplied the classification,
   `'inferred-from-title'` when it's an editorial reading with no
   verified source — the frontend renders an explicit qualifier for the
   latter so an inference is never presented as confirmed metadata.
   **`Person.department`** is a third case: always Scholar-sourced
   here, never independently confirmed, so it is deliberately excluded
   from JSON-LD structured data (see docs/TECHNICAL_SEO.md) even though
   it's shown, correctly labeled, in visible UI copy.
3. **`provenanceNote`** (Education, Experience) is a fourth provenance
   mechanism, distinct from the three above: it holds a specific,
   human-readable note for a genuine cross-source *conflict* (e.g. the
   PhD completion year: 2024 per the official personal website vs.
   2019–2023 per LinkedIn) or an intentionally-preserved anomaly (e.g.
   overlapping employment dates as publicly published). It is never
   used to resolve the conflict — both source values stay discoverable,
   and the frontend always renders the note as a visible qualifier next
   to the record it applies to. Null when no such conflict exists.
4. **Slugs are generated, not authored**, from title (+ year, for
   Publications) via `slugify`, giving stable, SEO-friendly URLs
   (`/publications/machine-intelligence-versus-terrorism-2021`).
5. **Text index** on `Publication.title/abstract/keywords` powers the
   Publications page search without a separate search service.
6. **Timestamps** (`createdAt`/`updatedAt`) are enabled on every schema
   via Mongoose's `{ timestamps: true }`, and used directly in
   `sitemap.xml`'s `<lastmod>` values.

## Seeding

`npm run seed` runs `server/src/seed/run.ts`, which is **idempotent**:
singleton collections are upserted, and array-based collections are
upserted per-record by a natural unique key (title+year for
publications, `network` for profiles, role+organization for
experience, degree+institution for education, title+event for
presentations, title+type for achievements) rather than dropped and
recreated. This means:

- Re-running the seed after adding new verified data via the future
  admin API never deletes those additions.
- The seed script can be safely re-run in CI or after a fresh clone
  without duplicating records.

All seed content lives in `server/src/seed/data.ts`, annotated with
exactly which fields are verified and which are intentionally left
`null`. See docs/CONTENT_UPDATE_GUIDE.md for how to extend it safely.

## Indexes

- `Publication`: text index on `title, abstract, keywords`; standard
  index on `year` and unique index on `slug`.
- `ResearchInterest`, `Presentation`: unique index on `slug`.
- `AcademicProfile`: unique index on `network`.
- `AdminUser`: unique index on `email`.

## Connection handling

`server/src/config/db.ts` connects once at startup and exposes
`isDatabaseConnected()`. Route handlers that can degrade gracefully
without the database (currently: `/sitemap.xml`) check this before
querying, so a temporary database outage does not take down SEO
infrastructure — it just serves the static routes only.
