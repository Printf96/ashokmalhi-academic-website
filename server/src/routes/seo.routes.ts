import { Router } from 'express';
import { getSitemap, getRobotsTxt } from '../controllers/seoController.js';

const router = Router();

router.get('/sitemap.xml', getSitemap);
router.get('/robots.txt', getRobotsTxt);

export default router;
