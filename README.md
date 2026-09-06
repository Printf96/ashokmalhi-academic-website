# Dr. Ashok Malhi — Official Academic Website

The official academic identity platform for **Dr. Ashok Malhi**, Assistant
Professor at Lovely Professional University, India. Production target:
**https://ashokmalhi.pro**

This is not a generic portfolio template. It is a structured academic
identity, publication, and knowledge platform designed to be the
authoritative, machine-readable digital home for "Dr. Ashok Malhi",
"Ashok Malhi", and "Ashok Singh Malhi" across search engines and AI
systems.

## Repository

- GitHub (target): `Printf96/ashokmalhi-academic-website`
- This repository is intentionally separate from, and must never modify:
  `Printf96/myportfolio`, `Printf96/ashokmalhi-website`, and
  `growthwealthwithme-tech/ashokmalhi-website`.

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + TypeScript + Vite, React Router, react-helmet-async |
| Backend | Node.js + Express + TypeScript |
| Database | MongoDB + Mongoose |
| Validation | Zod |
| Auth (future CMS) | JWT + bcrypt |
| Testing | Vitest + Supertest |

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the full rationale.

## Monorepo layout

```
client/    React + TypeScript frontend (Vite)
server/    Express + TypeScript API
shared/    Types shared between client and server (the data contract)
docs/      Architecture, SEO, security, accessibility, and process docs
assets/    Original + processed media (photo pipeline); originals are gitignored
```

## Getting started

Prerequisites: Node.js ≥ 20, npm ≥ 10, a MongoDB instance (local or Atlas).

```bash
# 1. Install all workspace dependencies
npm install

# 2. Configure environment variables
cp server/.env.example server/.env
cp client/.env.example client/.env.local
# Edit server/.env with your MongoDB URI and secrets.

# 3. Seed the database with verified content
npm run seed

# 4. Run client + server together in development
npm run dev
# Client: http://localhost:5173
# API:    http://localhost:5000/api
```

## Available scripts (root)

| Script | Purpose |
|---|---|
| `npm run dev` | Run client + server concurrently |
| `npm run build` | Production build of server then client |
| `npm run typecheck` | TypeScript project-wide type checking |
| `npm run seed` | Idempotent database seed from verified data |
| `npm run test` | Run server + client test suites |

## Environment variables

See [server/.env.example](server/.env.example) and
[client/.env.example](client/.env.example). Never commit `.env` files —
see [docs/SECURITY.md](docs/SECURITY.md).

## Content is data, not code

Every academic fact — biography, education, experience, publications,
presentations, achievements, identifiers — lives in MongoDB, populated
via `server/src/seed/data.ts` (verified data only) and, in the future,
an authenticated admin API. Adding or correcting a publication never
requires touching a React component. See
[docs/CONTENT_UPDATE_GUIDE.md](docs/CONTENT_UPDATE_GUIDE.md).

## Documentation index

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- [docs/DATABASE.md](docs/DATABASE.md)
- [docs/API.md](docs/API.md)
- [docs/SEO.md](docs/SEO.md)
- [docs/TECHNICAL_SEO.md](docs/TECHNICAL_SEO.md)
- [docs/ACADEMIC_SEO.md](docs/ACADEMIC_SEO.md)
- [docs/OFF_PAGE_SEO.md](docs/OFF_PAGE_SEO.md)
- [docs/ACCESSIBILITY.md](docs/ACCESSIBILITY.md)
- [docs/PERFORMANCE.md](docs/PERFORMANCE.md)
- [docs/SECURITY.md](docs/SECURITY.md)
- [docs/CONTENT_UPDATE_GUIDE.md](docs/CONTENT_UPDATE_GUIDE.md)
- [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)
- [docs/BACKUP.md](docs/BACKUP.md)

## Current status

This build establishes the full production architecture, data models,
API, frontend, SEO infrastructure, documentation, real profile
photograph, and social/academic/contact icon rail. As of local commit
`e8ae960`, the following are seeded and live:

- Identity: Dr. Ashok Malhi / Ashok Malhi / Ashok Singh Malhi, current
  position, and the Scholar-sourced department/affiliation string
  (Mittal School of Business), correctly qualified in UI copy and
  deliberately excluded from JSON-LD.
- 8 confirmed research/technology domains (including Artificial
  Intelligence of Things (AIoT)).
- 10 confirmed Google Scholar publications with citation snapshots;
  per-publication research-area tags are marked
  `researchAreasSource: 'inferred-from-title'` and rendered with a
  visible qualifier, never presented as confirmed metadata.
- 3 confirmed education records (PhD, PGDM, BCA) — including an
  unresolved cross-source date conflict on the PhD, preserved verbatim
  via a `provenanceNote` rather than silently picked.
- 5 confirmed professional experience records (current + 4 prior
  roles), including a publicly-published date overlap flagged the same
  way.
- 6 documented international presentations and 8 professional
  certifications.
- A short biography, professional positioning statement, technical/
  research/soft skills, specializations, and languages.
- 9 academic/professional/social profile links (ORCID, Scopus, Google
  Scholar, ResearchGate, LinkedIn, official website, Facebook,
  Instagram, YouTube) plus a Google Scholar metrics snapshot (23
  citations, h-index 2, i10-index 1) — always labeled as a snapshot,
  never a live counter.
- The real, user-confirmed black-and-white profile photograph,
  processed into 1x/2x/thumbnail WebP variants and wired into the Home
  hero and About page.
- A central social/academic/contact icon rail
  (`client/src/lib/socialConfig.ts`) with verified active links
  (LinkedIn, Google Scholar, ResearchGate, ORCID, YouTube, Instagram,
  Facebook, Email, Phone, WhatsApp) and accessible "coming soon"
  placeholders for platforms with no verified URL yet (GitHub, Reddit,
  Discord, Telegram, Blogger) — never a fabricated link.
- A provisional contact email, explicitly flagged pending the user's
  confirmation.

Still intentionally left as verified-empty or pending confirmation:
full long-form About-page narrative prose, PhD thesis/specialization,
consulting clients for the freelance role, presentation/certification
collateral (slides, certificates, video, DOI, credential IDs), and the
five coming-soon social URLs above.

**No information in this repository has been fabricated.** Every
seeded fact traces back to explicitly supplied, verified input, and
any provisional, disputed, or non-independently-confirmed value (the
Scholar metrics snapshot, the Scholar-sourced department, the
provisional contact email, the PhD date conflict, inferred
publication research-area tags) is clearly labeled as such in both the
code comments and the rendered UI. See docs/CONTENT_UPDATE_GUIDE.md for
exactly what is and is not populated and how to extend it safely.

## Manual GitHub setup

This repository has never been pushed to any remote — no remote is
configured locally, and no old repository
(`Printf96/myportfolio`, `Printf96/ashokmalhi-website`,
`growthwealthwithme-tech/ashokmalhi-website`) has been touched. To push
this project to its own new repository,
[`Printf96/ashokmalhi-academic-website`](https://github.com/Printf96/ashokmalhi-academic-website),
run the following from the extracted project root:

```bash
# 1. Create the repository on GitHub first (via github.com or `gh repo create`),
#    then, from inside the extracted project folder:

git init
git add .
git commit -m "Initial commit: Dr. Ashok Malhi academic website"

# 2. Point it at the new repository and push
git branch -M main
git remote add origin https://github.com/Printf96/ashokmalhi-academic-website.git
git push -u origin main
```

If you'd rather preserve this project's full local commit history
(recommended — it documents every verified-data integration step)
instead of squashing it into one initial commit, push the existing
`.git` history from the working copy this ZIP was exported from
instead of re-initializing:

```bash
# From the original working copy (not the ZIP), which already has
# the full commit history ending at e8ae960:
git remote add origin https://github.com/Printf96/ashokmalhi-academic-website.git
git branch -M main
git push -u origin main
```

After pushing, verify: `npm install`, `npm run seed` (against your own
MongoDB instance — see server/.env.example), then `npm run dev` to
confirm everything runs from the pushed repository before considering
any deployment step.

## License

Private/unlicensed. All content rights reserved by Dr. Ashok Malhi.
