import { Router } from 'express';
import { isDatabaseConnected } from '../config/db.js';

const router = Router();

router.get('/', (_req, res) => {
  res.json({
    status: 'ok',
    database: isDatabaseConnected() ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
  });
});

export default router;
