import { apiFetch } from './apiClient';
import type {
  ApiItemResponse,
  ApiListResponse,
  PersonRecord,
  EducationRecord,
  ExperienceRecord,
  ResearchInterestRecord,
  PublicationRecord,
  PresentationRecord,
  AchievementRecord,
  AcademicProfileRecord,
  ContactInformationRecord,
  ContactSubmission,
} from '@shared/types/academic';

export const api = {
  getPerson: () => apiFetch<ApiItemResponse<PersonRecord>>('/api/person'),
  listEducation: () => apiFetch<ApiListResponse<EducationRecord>>('/api/education'),
  listExperience: () => apiFetch<ApiListResponse<ExperienceRecord>>('/api/experience'),
  listResearchInterests: () =>
    apiFetch<ApiListResponse<ResearchInterestRecord>>('/api/research-interests'),
  listPublications: (query?: {
    page?: number;
    limit?: number;
    year?: number;
    researchArea?: string;
    q?: string;
    sort?: 'year-desc' | 'year-asc';
  }) => {
    const params = new URLSearchParams();
    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== '') params.set(key, String(value));
      });
    }
    const qs = params.toString();
    return apiFetch<ApiListResponse<PublicationRecord>>(`/api/publications${qs ? `?${qs}` : ''}`);
  },
  getPublicationBySlug: (slug: string) =>
    apiFetch<ApiItemResponse<PublicationRecord>>(`/api/publications/${slug}`),
  listPresentations: () => apiFetch<ApiListResponse<PresentationRecord>>('/api/presentations'),
  getPresentationBySlug: (slug: string) =>
    apiFetch<ApiItemResponse<PresentationRecord>>(`/api/presentations/${slug}`),
  listAchievements: () => apiFetch<ApiListResponse<AchievementRecord>>('/api/achievements'),
  listAcademicProfiles: () =>
    apiFetch<ApiListResponse<AcademicProfileRecord>>('/api/academic-profiles'),
  getContactInformation: () =>
    apiFetch<ApiItemResponse<ContactInformationRecord>>('/api/contact-information'),
  submitContactForm: (payload: ContactSubmission) =>
    apiFetch<ApiItemResponse<{ message: string }>>('/api/contact', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
};
