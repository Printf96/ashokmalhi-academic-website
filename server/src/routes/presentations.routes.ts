import { Router } from 'express';
import { listPresentations, getPresentationBySlug } from '../controllers/presentationController.js';
import { validate } from '../middleware/validate.js';
import { slugParam } from '../validators/common.js';

const router = Router();

router.get('/', listPresentations);
router.get('/:slug', validate(slugParam, 'params'), getPresentationBySlug);

export default router;
