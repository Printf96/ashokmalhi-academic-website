import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { EducationPage } from '@/pages/EducationPage';
import { ExperiencePage } from '@/pages/ExperiencePage';
import { ResearchPage } from '@/pages/ResearchPage';
import { PublicationsPage } from '@/pages/PublicationsPage';
import { PublicationDetailPage } from '@/pages/PublicationDetailPage';
import { PresentationsPage } from '@/pages/PresentationsPage';
import { AchievementsPage } from '@/pages/AchievementsPage';
import { ContactPage } from '@/pages/ContactPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ScholarRedirect } from '@/pages/redirects/ProfileRedirects';
import { IDENTITY } from '@/lib/seo';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/education" element={<EducationPage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/publications" element={<PublicationsPage />} />
        <Route path="/publications/:slug" element={<PublicationDetailPage />} />
        <Route path="/presentations" element={<PresentationsPage />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Optional profile redirects (brief section 43) */}
        <Route path="/scholar" element={<ScholarRedirect url={IDENTITY.googleScholarUrl} />} />
        <Route path="/orcid" element={<ScholarRedirect url={IDENTITY.orcid} />} />
        <Route
          path="/researchgate"
          element={<ScholarRedirect url={IDENTITY.researchGateUrl} />}
        />
        <Route path="/linkedin" element={<ScholarRedirect url={IDENTITY.linkedinUrl} />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}
