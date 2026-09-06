# Security

## Secrets management

- All secrets and environment-specific configuration are read from
  environment variables (`server/src/config/env.ts`), never hardcoded.
- `.env` is gitignored (`.gitignore`); `.env.example` documents every
  required variable with safe placeholder/default values, never real
  secrets.
- `assertProductionSecrets()` fails fast at startup if `JWT_SECRET` is
  left at its insecure development default while `NODE_ENV=production`.
- Admin passwords are stored only as bcrypt hashes (`AdminUser.passwordHash`,
  `select: false` by default) — never plaintext, never logged.

## Transport and headers

- `helmet()` is applied globally with an explicit Content-Security-Policy
  (default-src 'self', no inline scripts, images allowed from self/data/https),
  `frame-ancestors 'none'` (clickjacking protection), and
  `crossOriginResourcePolicy: cross-origin` (needed so the API can serve
  `/sitemap.xml` and JSON to the separately-hosted frontend origin).
- `app.set('trust proxy', 1)` is set so `req.ip` and rate limiting work
  correctly behind a single reverse proxy hop (typical of
  Vercel/Render/Railway) without trusting arbitrary `X-Forwarded-For`
  chains.

## Input handling

- **Validation**: every mutating/queryable endpoint validates its
  input with Zod (`server/src/validators/common.ts`) before it reaches
  a controller; invalid input never reaches a Mongoose query.
- **Sanitization**: `express-mongo-sanitize` strips any `$`/`.`
  operator-injection attempts from `req.body`/`req.query`/`req.params`,
  preventing NoSQL injection via crafted query objects.
- **HPP protection**: `hpp()` guards against HTTP Parameter Pollution
  (duplicate query keys used to bypass validation).
- **Body size limits**: `express.json({ limit: '100kb' })` and the
  equivalent for urlencoded bodies bound request payload size.
- **CORS**: restricted to the explicit `CLIENT_ORIGIN` allowlist from
  environment configuration — not a wildcard.

## Rate limiting

- General API rate limit: 100 requests / 15 minutes / IP by default
  (`RATE_LIMIT_*` env vars).
- Contact form: a stricter 5 requests / hour / IP limit
  (`CONTACT_RATE_LIMIT_*` env vars), since this is the only public
  write endpoint and the most likely abuse target.
- The contact form additionally uses a honeypot field (`website`) —
  any non-empty value is rejected as spam before hitting the database.

## Authentication (future CMS)

- `server/src/middleware/auth.ts` implements JWT verification for the
  reserved `/api/admin/*` routes. Tokens are issued by
  `/api/auth/login` after a bcrypt password comparison, and expire per
  `JWT_EXPIRES_IN`.
- No admin routes are currently exposed to any public UI — the
  scaffolding exists so the future CMS (see
  docs/CONTENT_UPDATE_GUIDE.md) can be built without changing the
  authentication approach.

## Error handling

- The centralized `errorHandler` middleware never leaks stack traces
  or internal error messages to the client when `NODE_ENV=production`
  — it returns a generic message for any non-`ApiError` (i.e.
  unexpected) failure, while logging full detail server-side.
- 404s for unmatched API routes return a structured JSON error rather
  than an HTML stack trace.

## Known accepted risk

`npm audit` on the server workspace currently reports a moderate
advisory in `qs` (a transitive dependency of `express@4.22.2` via
`body-parser`) with no non-breaking fix available as of this build —
resolving it fully requires migrating to Express 5, which is a larger,
deliberate upgrade out of scope for this initial build. This is
tracked here rather than silently ignored; re-run `npm audit
--workspace=server` periodically and reassess when Express 5 or an
upstream patch is available. A second set of advisories affects only
`vite`/`esbuild`/`vitest` (dev-time tooling, never shipped to
production) and is not a production risk.

## What is intentionally not yet implemented

- CSRF protection is not yet added because the only mutating public
  endpoint (`POST /api/contact`) is not cookie-authenticated (no
  session state to forge) — this should be revisited once/if the admin
  CMS UI is built with cookie-based sessions.
- No WAF/DDoS layer is configured at the application level; this is
  expected to be handled by the hosting platform (see
  docs/DEPLOYMENT.md).
