# Backup Strategy

GitHub is the primary version-control remote, but per the brief it is
**not** treated as the only backup. A complete local backup must also
exist on `D:\` (Windows).

## Why this session could not write directly to `D:\`

This build was produced in a cloud development session, which cannot
write directly to a path on your local Windows machine. Instead, the
full project has been packaged as an archive (see "Restoring the
backup" below) that you copy onto `D:\` yourself.

## Recommended structure on `D:\`

```
D:\AshokMalhi-Academic-Website-Backup\
│
├── source\            ← this entire repository (client/, server/, shared/, docs/, etc.)
├── database\          ← periodic mongodump exports (see below)
├── assets\            ← original photograph + processed variants (assets/original, assets/processed)
├── documentation\      ← copies of everything in docs/ and README.md
├── deployment\         ← copies of .env.example files, deployment notes, Vercel project settings export
├── backups\            ← dated full-project archives (e.g. ashokmalhi-academic-website-2026-09-06.zip)
└── README.md           ← this file's contents, or a pointer to docs/BACKUP.md
```

## Restoring / establishing the backup

1. Extract the delivered project archive to
   `D:\AshokMalhi-Academic-Website-Backup\source\`.
2. Copy `docs/` and `README.md` into
   `D:\AshokMalhi-Academic-Website-Backup\documentation\` as well (a
   duplicate is intentional — documentation should survive even if
   `source\` is later modified independently).
3. Copy `server/.env.example` and `client/.env.example` into
   `D:\AshokMalhi-Academic-Website-Backup\deployment\` (never copy the
   real `.env` with live secrets into a backup folder that might be
   shared or synced elsewhere — keep real secrets in a password
   manager or the hosting platform's secret store only).
4. Once a real MongoDB instance is running, periodically export the
   database:
   ```bash
   mongodump --uri="<your MONGODB_URI>" --out="D:\AshokMalhi-Academic-Website-Backup\database\dump-$(date +%Y-%m-%d)"
   ```
5. Keep the original, unprocessed profile photograph only in
   `assets\` on the backup drive (and in the repository's gitignored
   `assets/original/`) — never publish the raw original.

## Backup cadence (recommended)

| What | Frequency |
|---|---|
| Full source snapshot (`backups\`) | After each significant milestone (new publication batch, redesign, pre-deployment) |
| Database dump | Weekly once live, or immediately before/after any bulk content update |
| Documentation copy | Whenever `docs/` changes |

## Non-negotiable rule

**Never delete the `D:\` backup because a GitHub repository exists.**
GitHub can be unavailable, an account can be locked out, or a
repository can be accidentally altered — the local backup is the
independent recovery path. Likewise, do not treat the local backup as
a substitute for git history: use both.
