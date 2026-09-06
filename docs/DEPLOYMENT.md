# Deployment

**The production domain (`ashokmalhi.pro`) must not be pointed at this
project until it has been reviewed and explicitly approved for launch.**
This document describes how deployment *would* work; it does not
authorize performing it.

## Target platform

Vercel is the anticipated host, per the brief. Two important
constraints:

- **Do not modify** the existing `myportfolio` Vercel project or its
  DNS/domain configuration.
- This project must be deployed as a **new, separate** Vercel project
  connected to the new repository, `Printf96/ashokmalhi-academic-website`.

## Repository setup

1. Create the repository `Printf96/ashokmalhi-academic-website` on
   GitHub (empty, fresh — never fork or copy from the old repositories).
2. Push this project's git history to it:
   ```bash
   git remote add origin https://github.com/Printf96/ashokmalhi-academic-website.git
   git push -u origin main
   ```
3. Verify in GitHub that the repository is indeed new and unrelated to
   `Printf96/myportfolio`, `Printf96/ashokmalhi-website`, or
   `growthwealthwithme-tech/ashokmalhi-website`.

## Suggested hosting topology

| Component | Suggested host | Notes |
|---|---|---|
| `client/` (static build) | Vercel (new project) | `npm run build --workspace=client`; output `client/dist` |
| `server/` (API) | Render, Railway, or a Vercel serverless/Node function | Needs a persistent Node process or serverless adapter; also needs network access to MongoDB |
| MongoDB | MongoDB Atlas (free/shared tier is sufficient initially) | Use a dedicated database user with least-privilege access scoped to this one database |

If deploying the API as Vercel serverless functions, the Express app
in `server/src/app.ts` can be wrapped with a serverless adapter (e.g.
`@vercel/node` or `serverless-http`) — this was not pre-wired because
the brief left the deployment target open ("Vercel *may* be used"),
and prematurely coupling to one serverless adapter would be an
unjustified dependency if a traditional Node host is chosen instead.

## Environment variables to configure at the host

Copy every key from `server/.env.example` into the hosting platform's
environment variable configuration (never commit `.env`):

- `MONGODB_URI` — the Atlas (or other) connection string
- `SITE_URL` — `https://ashokmalhi.pro` in production
- `CLIENT_ORIGIN` — the deployed frontend's origin
- `JWT_SECRET` — a strong random value (`openssl rand -hex 32`); the
  app refuses to start in production with the default dev value
- Rate limit and SMTP variables as needed

For the client (`client/.env.example`): set `VITE_API_BASE_URL` only
if the client and API are deployed to different origins.

## Build commands

```bash
# Server
npm run build --workspace=server   # → server/dist
npm run start --workspace=server   # node server/dist/index.js

# Client
npm run build --workspace=client   # → client/dist (static files)
```

## DNS / domain

Per brief section 54: **do not** change DNS or domain settings during
development. Complete and fully test the new application on its
Vercel-assigned preview URL first. Domain migration
(`ashokmalhi.pro` → the new deployment) is a separate, explicit,
later step requiring direct authorization.

## Pre-launch checklist

- [ ] `npm run build` succeeds for both workspaces
- [ ] `npm run typecheck` passes for both workspaces
- [ ] `npm run test` passes for both workspaces
- [ ] `npm run seed` has been run against the production database
- [ ] All environment variables are set on the host (no defaults left)
- [ ] `/sitemap.xml` and `/robots.txt` return correct content against
      the production `SITE_URL`
- [ ] A real Lighthouse/PageSpeed run against the deployed preview URL
      (see "Environment limitations" below)
- [ ] A real axe-core/manual screen-reader pass against the deployed
      preview URL
- [ ] The real profile photograph has been added (docs/CONTENT_UPDATE_GUIDE.md)
- [ ] Domain migration is explicitly authorized before proceeding

## Environment limitations encountered during this build

This project was built in a sandboxed cloud environment without
outbound network access to MongoDB's binary CDN or a local MongoDB
daemon/Docker runtime, so:

- The seed script, live API-to-database integration, and a running
  frontend-against-live-API smoke test could not be executed end-to-end
  in this environment. What **was** verified: full TypeScript
  typechecking (client + server), production builds (client + server),
  and the server's route-level test suite (Express app + middleware +
  validation + SEO endpoints) via Vitest + Supertest, all passing.
- A live Lighthouse/PageSpeed and axe-core accessibility run requires a
  deployed or locally-served instance and was not performed here for
  the same reason.

**Recommended first step after receiving this repository:** run
`npm install && cp server/.env.example server/.env` (pointing
`MONGODB_URI` at a real or local MongoDB instance), `npm run seed`,
`npm run dev`, and manually verify every route in a browser before
deploying.
