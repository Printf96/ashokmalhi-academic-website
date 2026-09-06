import { Router } from 'express';
import {
  listEducation,
  listExperience,
  listResearchInterests,
  listAchievements,
  listAcademicProfiles,
  getContactInformation,
} from '../controllers/referenceControllers.js';

export const educationRouter = Router().get('/', listEducation);
export const experienceRouter = Router().get('/', listExperience);
export const researchInterestsRouter = Router().get('/', listResearchInterests);
export const achievementsRouter = Router().get('/', listAchievements);
export const academicProfilesRouter = Router().get('/', listAcademicProfiles);
export const contactInformationRouter = Router().get('/', getContactInformation);
