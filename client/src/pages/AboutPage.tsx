import { Link } from 'react-router-dom';
import { SeoHead } from '@/components/seo/SeoHead';
import { Section } from '@/components/ui/Section';
import { AsyncBoundary } from '@/components/ui/AsyncBoundary';
import { ProfileImage } from '@/components/ui/ProfileImage';
import { AcademicProfilesList } from '@/components/academic/AcademicProfilesList';
import { ScholarMetricsCard } from '@/components/academic/ScholarMetricsCard';
import { useApi } from '@/hooks/useApi';
import { api } from '@/lib/api';
import { buildBreadcrumbSchema, buildPersonSchema, IDENTITY } from '@/lib/seo';
import styles from './AboutPage.module.css';

export function AboutPage() {
  const person = useApi(() => api.getPerson(), []);

  return (
    <>
      <SeoHead
        title="About Dr. Ashok Malhi | Assistant Professor, Lovely Professional University"
        description="Academic biography, professional identity, and research background of Dr. Ashok Malhi, Assistant Professor at Lovely Professional University."
        path="/about"
        jsonLd={[
          { '@context': 'https://schema.org', ...buildPersonSchema() },
          buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
          ]),
        ]}
      />

      <Section eyebrow="Biography" title="About" id="about">
        <div className={styles.profileRow}>
          <ProfileImage
            src={person.data?.data.profileImage?.variants?.webBw ?? null}
            src1x={person.data?.data.profileImage?.variants?.webBw1x ?? null}
            alt={
              person.data?.data.profileImage?.altText ??
              `${IDENTITY.displayName}, ${IDENTITY.professionalTitle} and academic researcher`
            }
          />
        </div>

        <div className={styles.identityGrid}>
          <div className={styles.identityItem}>
            <p className={styles.identityLabel}>Public Identity</p>
            <p className={styles.identityValue}>{IDENTITY.displayName}</p>
          </div>
          <div className={styles.identityItem}>
            <p className={styles.identityLabel}>Position</p>
            <p className={styles.identityValue}>
              {IDENTITY.professionalTitle}, {IDENTITY.affiliation}
            </p>
          </div>
          <div className={styles.identityItem}>
            <p className={styles.identityLabel}>Academic Author Name</p>
            <p className={styles.identityValue}>{IDENTITY.authorName}</p>
          </div>
          <div className={styles.identityItem}>
            <p className={styles.identityLabel}>Publication Name Variant</p>
            <p className={styles.identityValue}>{IDENTITY.authorNameVariant}</p>
          </div>
        </div>

        <AsyncBoundary
          loading={person.loading}
          error={person.error}
          data={person.data}
          emptyTitle="Biography pending"
          emptyMessage="A full academic biography will be published as verified details become available."
        >
          {(res) => (
            <>
              {res.data.department && (
                <div className={styles.identityItem} style={{ marginBottom: '1.5rem', maxWidth: 360 }}>
                  <p className={styles.identityLabel}>Department (per Google Scholar)</p>
                  <p className={styles.identityValue}>{res.data.department}</p>
                </div>
              )}

              {res.data.professionalPositioning && (
                <p className={styles.bioBlock} style={{ marginBottom: '1.5rem' }}>
                  {res.data.professionalPositioning}
                </p>
              )}

              {res.data.shortBio ? (
                <p className={styles.bioBlock}>{res.data.shortBio}</p>
              ) : (
                <p className={styles.bioBlock}>
                  A detailed academic biography — covering academic journey, teaching
                  philosophy, and the intersection of technology and business that shapes
                  {' '}{IDENTITY.displayName}'s research — will be published here once verified
                  content is available.
                </p>
              )}

              {res.data.fullBio && (
                <p className={styles.bioBlock} style={{ marginTop: '1.5rem' }}>
                  {res.data.fullBio}
                </p>
              )}
            </>
          )}
        </AsyncBoundary>
      </Section>

      {person.data?.data.scholarMetrics && (
        <Section eyebrow="Impact" title="Scholar Metrics" id="scholar-metrics">
          <ScholarMetricsCard metrics={person.data.data.scholarMetrics} />
        </Section>
      )}

      <Section eyebrow="Academic Identity" title="Career at a Glance" id="career-at-a-glance">
        <p className={styles.bioBlock} style={{ marginBottom: '1.5rem' }}>
          A fuller account of academic identity, research focus, teaching, and industry
          experience is organized across the site rather than repeated here:{' '}
          <Link to="/education">Education</Link>, <Link to="/experience">Professional Journey</Link>,{' '}
          <Link to="/research">Research Focus</Link>, <Link to="/publications">Research &amp; Publications</Link>,{' '}
          <Link to="/presentations">Academic Presentations</Link>, and{' '}
          <Link to="/achievements">Certifications</Link>.
        </p>
      </Section>

      <AsyncBoundary
        loading={person.loading}
        error={null}
        data={person.data}
        emptyTitle=""
        emptyMessage=""
      >
        {(res) => {
          const hasSkills =
            res.data.technicalSkills.length > 0 ||
            res.data.researchSkills.length > 0 ||
            res.data.softSkills.length > 0;
          const hasSpecializations = res.data.specializations.length > 0;
          const hasLanguages = res.data.languages.length > 0;

          if (!hasSkills && !hasSpecializations && !hasLanguages) return null;

          return (
            <Section eyebrow="Focus &amp; Capabilities" title="Skills &amp; Specializations" id="skills">
              {hasSpecializations && (
                <>
                  <p className={styles.skillGroupLabel}>Areas of Specialization / Professional Focus</p>
                  <div className={styles.chipGrid}>
                    {res.data.specializations.map((s) => (
                      <span key={s} className={styles.chip}>
                        {s}
                      </span>
                    ))}
                  </div>
                  <p className={styles.qualifierNote}>
                    Presented as areas of focus, not confirmed publication-level research
                    classifications — see <Link to="/research">Research</Link> for the
                    confirmed research-interest taxonomy.
                  </p>
                </>
              )}

              {res.data.technicalSkills.length > 0 && (
                <>
                  <p className={styles.skillGroupLabel}>Technical</p>
                  <div className={styles.chipGrid}>
                    {res.data.technicalSkills.map((s) => (
                      <span key={s} className={styles.chip}>
                        {s}
                      </span>
                    ))}
                  </div>
                </>
              )}

              {res.data.researchSkills.length > 0 && (
                <>
                  <p className={styles.skillGroupLabel}>Research &amp; Analytics</p>
                  <div className={styles.chipGrid}>
                    {res.data.researchSkills.map((s) => (
                      <span key={s} className={styles.chip}>
                        {s}
                      </span>
                    ))}
                  </div>
                </>
              )}

              {res.data.softSkills.length > 0 && (
                <>
                  <p className={styles.skillGroupLabel}>Soft Skills</p>
                  <div className={styles.chipGrid}>
                    {res.data.softSkills.map((s) => (
                      <span key={s} className={styles.chip}>
                        {s}
                      </span>
                    ))}
                  </div>
                </>
              )}

              {hasLanguages && (
                <>
                  <p className={styles.skillGroupLabel}>Languages</p>
                  <div className={styles.chipGrid}>
                    {res.data.languages.map((l) => (
                      <span key={l.name} className={styles.chip}>
                        {l.name}
                        {l.proficiency ? ` — ${l.proficiency}` : ''}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </Section>
          );
        }}
      </AsyncBoundary>

      <Section eyebrow="Identity Graph" title="Academic & Professional Profiles" id="about-profiles">
        <AcademicProfilesList />
      </Section>
    </>
  );
}
