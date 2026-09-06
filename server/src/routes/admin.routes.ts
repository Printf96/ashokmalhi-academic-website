import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';

/**
 * Placeholder for the future admin/content-management CRUD API
 * (create/update/delete Publications, Education, Experience,
 * Presentations, Achievements, ResearchInterests, Person, etc.).
 *
 * Intentionally not implementing full CRUD yet since no admin UI
 * consumes it — but the auth-protected mount point exists so that
 * adding e.g. `router.post('/publications', createPublication)`
 * later requires no architectural change. See docs/CONTENT_UPDATE_GUIDE.md.
 */
const router = Router();

router.use(requireAuth);

router.get('/ping', (req, res) => {
  res.json({ data: { message: 'Admin API reachable', admin: (req as any).admin } });
});

export default router;
