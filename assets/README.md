# Assets

- `original/` — unprocessed source files (e.g. the original profile
  photograph). **Gitignored.** Never commit raw originals; keep them
  only in this local folder and in the `D:\` backup (see
  docs/BACKUP.md).
- `processed/` — web-ready processed outputs (e.g.
  `ashok-malhi-profile-bw.webp`) before they're copied into
  `client/public/images/` for the frontend to serve.

See docs/CONTENT_UPDATE_GUIDE.md, "Adding the verified profile
photograph," for the full pipeline.
