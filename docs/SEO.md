# SEO Strategy

This document is the overview; see docs/TECHNICAL_SEO.md,
docs/ACADEMIC_SEO.md, and docs/OFF_PAGE_SEO.md for the detailed
implementations.

## Goal

Establish `ashokmalhi.pro` as the canonical, authoritative digital
identity for **Dr. Ashok Malhi** across search engines and AI systems,
and help those systems understand that "Dr. Ashok Malhi", "Ashok
Malhi", and "Ashok Singh Malhi" refer to the same person (entity
resolution / entity SEO).

## Primary and secondary keywords

Primary identity keyword: **Dr. Ashok Malhi**

Secondary variants used naturally in page titles, headings, and copy
(never stuffed):

- Ashok Malhi
- Ashok Singh Malhi
- Dr Ashok Malhi
- Ashok Malhi Assistant Professor
- Ashok Malhi Lovely Professional University
- Ashok Malhi researcher

Research-area keywords are drawn only from the confirmed research
interests (Artificial Intelligence, Digital Marketing, Blockchain,
Internet of Things, Data Analytics, Digital Transformation, Technology
Adoption) — no invented specialty terms.

## On-page SEO implementation

Every route renders through `client/src/components/seo/SeoHead.tsx`
(react-helmet-async), which sets, per route:

- Unique `<title>`
- Unique meta description
- `<link rel="canonical">`
- Open Graph tags (`og:title`, `og:description`, `og:url`, `og:image`, `og:type`, `og:site_name`)
- Twitter Card tags
- Page-specific JSON-LD (see docs/TECHNICAL_SEO.md)

Every page has exactly one `<h1>` (in its hero/header) and a logical
`<h2>`/`<h3>` hierarchy via the shared `Section` component. URLs are
descriptive and hyphenated (`/publications/machine-intelligence-versus-terrorism-2021`),
never query-string-only or ID-only.

## Internal linking

- Home → Publications (selected work), Home → Research → Publications
  (research-area filter link), Home/About → Academic Profiles →
  Contact, Publication detail → back to Publications list, Research
  area cards → filtered Publications view.
- No artificial/hidden keyword links are used anywhere.

## What this build does NOT do

Per brief section 49 (SEO Safety) and section 59, this build never:
keyword-stuffs, fabricates publications/reviews/backlinks, creates
doorway or hidden-text pages, claims unverified awards, or invents
structured data properties. Every JSON-LD field traces back to
verified data or is omitted.
