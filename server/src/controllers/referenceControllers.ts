import { Education } from '../models/Education.js';
import { Experience } from '../models/Experience.js';
import { ResearchInterest } from '../models/ResearchInterest.js';
import { Achievement } from '../models/Achievement.js';
import { AcademicProfile } from '../models/AcademicProfile.js';
import { ContactInformation } from '../models/ContactInformation.js';
import { listController, singletonController } from './factory.js';

export const listEducation = listController(Education, { sort: { order: 1, startYear: 1 } });
export const listExperience = listController(Experience, { sort: { order: 1, startDate: -1 } });
export const listResearchInterests = listController(ResearchInterest, { sort: { order: 1 } });
export const listAchievements = listController(Achievement, { sort: { order: 1, date: -1 } });
export const listAcademicProfiles = listController(AcademicProfile, { sort: { order: 1 } });
export const getContactInformation = singletonController(ContactInformation, 'ContactInformation');
