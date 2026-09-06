# Architecture

## Overview

This is a MERN-family monorepo split into four workspaces:

```
client/   React 18 + TypeScript SPA (Vite build)
server/   Express + TypeScript REST API
shared/   TypeScript interfaces shared by both (the data contract)
docs/     This documentation set
```

`shared/types/academic.ts` is the single source of truth for what an
Education, Publication, Presentation, etc. record looks like. Both the
Mongoose schemas (server) and the API client / components (client)
are written to conform to it, so a field never silently drifts between
what the database stores and what the UI expects.

## Why this stack

- **React + TypeScript + Vite**: fast dev server, small production
  bundles (see docs/PERFORMANCE.md), first-class TypeScript support,
  no framework lock-in for a content-driven academic site that doesn't
  need server-side rendering to rank (see docs/TECHNICAL_SEO.md for how
  crawlability is handled without SSR).
- **Express + TypeScript**: minimal, well-understood REST layer. No
  GraphQL, no ORM beyond Mongoose — the data shapes are simple enough
  that additional abstraction would be unjustified complexity (brief
  section 6: "do not introduce unnecessary technologies").
- **MongoDB + Mongoose**: the domain is naturally document-shaped
  (a publication has variable optional fields; achievements and
  presentations are simple ordered collections) and the schema needs
  to evolve without migrations as verified content arrives incrementally.
- **Zod**: request validation at the API boundary, colocated with
  TypeScript types rather than a separate JSON-schema toolchain.
- **No heavy client data-fetching library** (react-query, SWR, Redux):
  the content update cadence is low (an admin adding a publication, not
  a live dashboard), so a small custom `useApi` hook keeps the
  dependency surface minimal.

## Request flow

```
Browser → React Router (client-side routes)
        → useApi hook → apiFetch → /api/* (same-origin or VITE_API_BASE_URL)
        → Express routes → Zod validation → Controller → Mongoose model → MongoDB
        ← JSON response ({ data, count?, meta? } | { error })
```

## Separation of concerns

- **Presentation**: `client/src/components/**` (ui/, layout/, academic/,
  seo/) and `client/src/pages/**`. Pages compose components and hooks;
  components never fetch data themselves except the small
  `AcademicProfilesList` widget, which is intentionally self-contained
  since it appears on multiple pages.
- **Business logic**: `server/src/controllers/**` and
  `server/src/validators/**`. Controllers are thin — validation happens
  in middleware, serialization in `utils/serialize.ts`, and error
  shaping in the centralized `errorHandler`.
- **Data**: `server/src/models/**` (Mongoose schemas) and
  `server/src/seed/data.ts` (the only place verified content is
  hardcoded, by design — see docs/CONTENT_UPDATE_GUIDE.md).
- **Configuration**: `server/src/config/**` reads all runtime
  configuration from environment variables; no configuration is
  hardcoded outside of `.env.example` defaults for local development.

## Future admin/CMS layer

`server/src/routes/admin.routes.ts` and `middleware/auth.ts` establish
JWT-protected route scaffolding without yet exposing full CRUD — see
docs/CONTENT_UPDATE_GUIDE.md for how to extend it. This means the data
layer (models, validators) does not need to change when an admin UI is
eventually built on top.

## Diagram

```
┌─────────────┐      HTTPS       ┌──────────────┐      Mongoose      ┌───────────┐
│   Browser    │ ───────────────▶│  Express API  │ ──────────────────▶│  MongoDB  │
│ (React SPA)  │◀─────────────── │ (TypeScript)  │◀────────────────── │           │
└─────────────┘   JSON / HTML    └──────────────┘                    └───────────┘
       │                                │
       │ static assets                  │ /sitemap.xml, /robots.txt
       ▼                                ▼
  Vite build output              Dynamically generated from
  (dist/)                        live Publication/Presentation data
```
