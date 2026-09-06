import { Link } from 'react-router-dom';
import { SeoHead } from '@/components/seo/SeoHead';
import { Section } from '@/components/ui/Section';
import { ProfileImage } from '@/components/ui/ProfileImage';
import { AsyncBoundary } from '@/components/ui/AsyncBoundary';
import { AcademicProfilesList } from '@/components/academic/AcademicProfilesList';
import { PublicationCard } from '@/components/academic/PublicationCard';
import { useApi } from '@/hooks/useApi';
import { api } from '@/lib/api';
import {
  buildProfilePageSchema,
  buildWebsiteSchema,
  IDENTITY,
} from '@/lib/seo';
import styles from './HomePage.module.css';

export function HomePage() {
  const person = useApi(() => api.getPerson(), []);
  const interests = useApi(() => api.listResearchInterests(), []);
  const featuredPubs = useApi(() => api.listPublications({ limit: 4, sort: 'year-desc' }), []);

  return (
    <>
      <SeoHead
        title="Dr. Ashok Malhi | Assistant Professor, Lovely Professional University"
        description="Official academic profile of Dr. Ashok Malhi, Assistant Professor at Lovely Professional University, India. Explore research in AI, digital marketing, blockchain, IoT, and technology adoption, along with publications and academic identifiers."
        path="/"
        jsonLd={[buildWebsiteSchema(), buildProfilePageSchema()]}
      />

      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <ProfileImage
            src={person.data?.data.profileImage?.variants?.webBw ?? null}
            src1x={person.data?.data.profileImage?.variants?.webBw1x ?? null}
            alt={
              person.data?.data.profileImage?.altText ??
              `${IDENTITY.displayName}, ${IDENTITY.professionalTitle} and academic researcher`
            }
          />
          <div className={styles.heroText}>
            <p className={`mono-label ${styles.eyebrow}`}>Academic Identity</p>
            <h1 className={styles.name}>{IDENTITY.displayName}</h1>
            <p className={styles.titleLine}>
              <strong>{IDENTITY.professionalTitle}</strong> · {IDENTITY.affiliation}, {IDENTITY.affiliationCountry}
            </p>
            <AsyncBoundary
              loading={person.loading}
              error={null}
              data={person.data}
              emptyTitle=""
              emptyMessage=""
            >
              {(res) =>
                res.data.shortBio ? (
                  <p className={styles.bio}>{res.data.shortBio}</p>
                ) : (
                  <p className={styles.bio}>
                    Researcher and educator working at the intersection of artificial
                    intelligence, digital transformation, and technology adoption. A full
                    biography will be published as verified details become available.
                  </p>
                )
              }
            </AsyncBoundary>
            <div className={styles.ctaRow}>
              <Link to="/publications" className={`${styles.btn} ${styles.btnPrimary}`}>
                View Publications
              </Link>
              <Link to="/contact" className={`${styles.btn} ${styles.btnSecondary}`}>
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Section eyebrow="Focus Areas" title="Research Interests" id="research-interests">
        <AsyncBoundary
          loading={interests.loading}
          error={interests.error}
          data={interests.data}
          isEmpty={(d) => d.data.length === 0}
          emptyMessage="Research interests will be listed here once confirmed."
        >
          {(res) => (
            <div className={styles.interestGrid}>
              {res.data.map((interest) => (
                <div key={interest._id} className={styles.interestChip}>
                  {interest.name}
                </div>
              ))}
            </div>
          )}
        </AsyncBoundary>
      </Section>

      <Section eyebrow="Selected Work" title="Recent Publications" id="selected-publications">
        <AsyncBoundary
          loading={featuredPubs.loading}
          error={featuredPubs.error}
          data={featuredPubs.data}
          isEmpty={(d) => d.data.length === 0}
          emptyMessage="Publications will appear here once verified records are added."
        >
          {(res) => (
            <>
              <div className={styles.pubGrid}>
                {res.data.map((pub) => (
                  <PublicationCard key={pub._id} publication={pub} />
                ))}
              </div>
              <div className={styles.viewAllRow}>
                <Link to="/publications" className={`${styles.btn} ${styles.btnSecondary}`}>
                  View all publications
                </Link>
              </div>
            </>
          )}
        </AsyncBoundary>
      </Section>

      <Section eyebrow="Identity Graph" title="Academic & Professional Profiles" id="profiles">
        <AcademicProfilesList />
      </Section>
    </>
  );
}
