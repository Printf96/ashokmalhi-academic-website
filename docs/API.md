# API Reference

Base URL: `/api` (same-origin in production, proxied from `localhost:5173`
to `localhost:5000` in development — see `client/vite.config.ts`).

All responses are JSON with the shape:

```jsonc
// success (list)
{ "data": [ /* ... */ ], "count": 10, "meta": { /* optional */ } }

// success (single item)
{ "data": { /* ... */ } }

// error
{ "error": { "message": "...", "code": "NOT_FOUND", "details": {} } }
```

## Public endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/api/health` | Liveness + database connection status |
| GET | `/api/person` | The singleton Person identity record |
| GET | `/api/education` | All Education records, ordered |
| GET | `/api/experience` | All Experience records, ordered |
| GET | `/api/research-interests` | All Research Interest records |
| GET | `/api/publications` | Paginated, filterable, searchable publication list |
| GET | `/api/publications/:slug` | Single publication by slug |
| GET | `/api/presentations` | All Presentation records |
| GET | `/api/presentations/:slug` | Single presentation by slug |
| GET | `/api/achievements` | All Achievement records |
| GET | `/api/academic-profiles` | All academic/professional/social profile links |
| GET | `/api/contact-information` | Public contact information |
| POST | `/api/contact` | Submit the contact form (rate-limited) |
| GET | `/sitemap.xml` | Dynamic XML sitemap (root-level, not under `/api`) |
| GET | `/robots.txt` | Dynamic robots.txt (root-level) |

### `GET /api/publications` query parameters

| Param | Type | Default | Description |
|---|---|---|---|
| `page` | number | 1 | 1-indexed page number |
| `limit` | number | 50 | Page size (max 100) |
| `year` | number | — | Filter to a single publication year |
| `researchArea` | string | — | Filter to publications tagged with this research area |
| `q` | string | — | Full-text search across title/abstract/keywords |
| `sort` | `year-desc` \| `year-asc` | `year-desc` | Sort order |

Response `meta` additionally includes `availableYears` and
`availableResearchAreas`, computed from the full unfiltered dataset, so
the frontend can populate filter dropdowns without a second request.

### `POST /api/contact`

Body:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "subject": "Collaboration inquiry",
  "message": "...",
  "website": ""
}
```

`website` is a honeypot field — it must be submitted empty (or
omitted); a non-empty value is treated as spam and rejected with 400.
Rate-limited to 5 requests/hour/IP by default (configurable via
`CONTACT_RATE_LIMIT_*` env vars).

## Reserved / future endpoints

`/api/auth/login` and `/api/admin/*` exist as scaffolding for the
future content-management system (see docs/CONTENT_UPDATE_GUIDE.md).
`/api/admin/*` requires `Authorization: Bearer <JWT>` obtained from
`/api/auth/login`. No public UI currently calls these.

## Error codes

| Code | HTTP status | Meaning |
|---|---|---|
| `BAD_REQUEST` | 400 | Validation failed (see `details` for field errors) |
| `UNAUTHORIZED` | 401 | Missing/invalid credentials or token |
| `FORBIDDEN` | 403 | Authenticated but not permitted |
| `NOT_FOUND` | 404 | Resource or route does not exist |
| `TOO_MANY_REQUESTS` | 429 | Rate limit exceeded |
| `INTERNAL_ERROR` | 500 | Unexpected server error (message is generic in production) |
