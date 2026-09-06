import { Router } from 'express';
import { submitContactForm } from '../controllers/contactController.js';
import { validate } from '../middleware/validate.js';
import { contactSubmissionSchema } from '../validators/common.js';
import { contactRateLimiter } from '../middleware/rateLimiters.js';

const router = Router();

router.post('/', contactRateLimiter, validate(contactSubmissionSchema), submitContactForm);

export default router;
