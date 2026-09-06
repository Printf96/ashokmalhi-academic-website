# Academic SEO

## Goal

Make the site legible to academic-focused discovery systems (Google
Scholar, institutional repositories, citation managers) as well as
general search engines and AI assistants answering questions like "who
is Dr. Ashok Malhi" or "what has Ashok Malhi published."

## Individually indexable publication pages

Every publication has its own canonical, crawlable HTML page at
`/publications/:slug` (see `PublicationDetailPage.tsx`), carrying:

- Full title, year, and (when verified) authors, journal/conference,
  DOI, abstract, indexing, and citation snapshot.
- `ScholarlyArticle` JSON-LD (see docs/TECHNICAL_SEO.md).
- A canonical URL and breadcrumb trail back to the Publications list
  and Home.

This matches the brief's requirement that publication pages be
indexable individually and that important academic content never be
hidden behind JavaScript-only interactions — the detail page renders
full content as real DOM text on load.

## Author identity reconciliation

The site explicitly distinguishes and links three name forms:

| Name | Role |
|---|---|
| **Dr. Ashok Malhi** | Primary public display identity (never the publication author string) |
| **Ashok Malhi** | Academic author name |
| **Ashok Singh Malhi** | Publication/author-identity variant, used for identity reconciliation and structured metadata only |

This mirrors how Google Scholar / ORCID / Scopus already resolve name
variants for this author, so the site reinforces rather than
contradicts those external records. See `Person.alternateName` in the
JSON-LD (docs/TECHNICAL_SEO.md).

## Academic identifiers surfaced

ORCID (`0000-0001-9756-5865`), Scopus Author ID (`57833141600`),
Google Scholar profile, and ResearchGate profile are all rendered
as visible links (`AcademicProfilesList` component) and included in
`sameAs` structured data — the two most important entity-resolution
signals academic search systems use.

## Research area taxonomy

The eight confirmed research/technology domains (Artificial
Intelligence, Artificial Intelligence of Things (AIoT), Internet of
Things, Blockchain, Data Analytics, Digital Transformation, Digital
Marketing, Technology Adoption — per the v1.0 data package) function as
a lightweight taxonomy: each Publication carries a `researchAreas`
array, the Research page lists each area with a link to its filtered
publication set, and the Publications page exposes a research-area
filter — this creates a coherent internal topic cluster rather than a
flat list.

**Important distinction**: the *taxonomy itself* (the 8 area names) is
confirmed — it was explicitly supplied. Which publications belong to
which area was *not* supplied for any of the 10 confirmed
publications; both the original brief and the v1.0 package list
"research area" as a future per-publication field. The per-publication
tags currently in the seed are an editorial reading of each title
against this taxonomy, marked `researchAreasSource:
'inferred-from-title'` and rendered with a visible "(inferred from
title)" qualifier everywhere they appear (`PublicationCard`,
`PublicationDetailPage`) — see docs/CONTENT_UPDATE_GUIDE.md. This
qualifier is deliberately part of the public-facing SEO content: it is
more accurate, and therefore safer for entity/topical SEO, than
presenting an inference as confirmed classification.

## Affiliation consistency

"Assistant Professor, Lovely Professional University" (and
"Lovely Professional University, India" for full context) is used
identically across the Home hero, About page, Person JSON-LD, and
Experience record — consistent affiliation strings across a site are a
known entity-resolution signal for both search engines and LLM-based
systems building knowledge graphs.

## Alumni affiliation (`alumniOf`)

The Person JSON-LD includes `alumniOf` for the three confirmed
educational institutions (Sharda University, IMS Ghaziabad, IPEM
Ghaziabad — from the v2.0 Education data package), as plain
organization names. This deliberately excludes degree type,
specialization, and completion date: the PhD completion date has an
unresolved cross-source conflict (see docs/DATABASE.md,
`provenanceNote`) and no thesis/specialization was ever supplied, so
neither is asserted in structured data — the same "omit rather than
assert an unverified qualifier" rule applied to `Person.department`.

## What's deliberately not claimed yet

Detailed bibliographic fields (journal name, publisher, volume, issue,
pages, full author lists, indexing databases) are left `null` for the
10 confirmed publications because they were not supplied as verified
data. Populating them is a pure data-entry task once available — see
docs/CONTENT_UPDATE_GUIDE.md — and requires no code changes.

Quantitative claims that were used on the prior external personal
website ("15+ Research Publications", "8+ International
Presentations") are **not** reproduced anywhere in this codebase. This
site instead states plain, verifiable counts from the data actually
seeded — 10 confirmed Google Scholar publications, 6 documented
international presentations — rather than a round-number claim that
exceeds the currently confirmed record count.
