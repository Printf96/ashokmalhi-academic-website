import { Router } from 'express';
import { listPublications, getPublicationBySlug } from '../controllers/publicationController.js';
import { validate } from '../middleware/validate.js';
import { publicationQuery, slugParam } from '../validators/common.js';

const router = Router();

router.get('/', validate(publicationQuery, 'query'), listPublications);
router.get('/:slug', validate(slugParam, 'params'), getPublicationBySlug);

export default router;
