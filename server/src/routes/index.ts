import { Router } from 'express';
import personRoutes from './person.routes.js';
import publicationsRoutes from './publications.routes.js';
import presentationsRoutes from './presentations.routes.js';
import contactRoutes from './contact.routes.js';
import authRoutes from './auth.routes.js';
import adminRoutes from './admin.routes.js';
import healthRoutes from './health.routes.js';
import {
  educationRouter,
  experienceRouter,
  researchInterestsRouter,
  achievementsRouter,
  academicProfilesRouter,
  contactInformationRouter,
} from './reference.routes.js';

const router = Router();

router.use('/health', healthRoutes);
router.use('/person', personRoutes);
router.use('/education', educationRouter);
router.use('/experience', experienceRouter);
router.use('/research-interests', researchInterestsRouter);
router.use('/publications', publicationsRoutes);
router.use('/presentations', presentationsRoutes);
router.use('/achievements', achievementsRouter);
router.use('/academic-profiles', academicProfilesRouter);
router.use('/contact-information', contactInformationRouter);
router.use('/contact', contactRoutes);
router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);

export default router;
