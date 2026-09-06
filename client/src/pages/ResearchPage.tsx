import { Link } from 'react-router-dom';
import { SeoHead } from '@/components/seo/SeoHead';
import { Section } from '@/components/ui/Section';
import { AsyncBoundary } from '@/components/ui/AsyncBoundary';
import { Card } from '@/components/ui/Card';
import { useApi } from '@/hooks/useApi';
import { api } from '@/lib/api';
import { buildBreadcrumbSchema, IDENTITY } from '@/lib/seo';
import styles from './ResearchPage.module.css';

export function ResearchPage() {
  const interests = useApi(() => api.listResearchInterests(), []);

  return (
    <>
      <SeoHead
        title="Research Areas | Dr. Ashok Malhi"
        description={`Research interests and focus areas of ${IDENTITY.displayName}, including artificial intelligence, digital marketing, blockchain, IoT, data analytics, digital transformation, and technology adoption.`}
        path="/research"
        jsonLd={[
          buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Research', path: '/research' },
          ]),
        ]}
      />

      <Section eyebrow="Focus Areas" title="Research" id="research">
        <AsyncBoundary
          loading={interests.loading}
          error={interests.error}
          data={interests.data}
          isEmpty={(d) => d.data.length === 0}
          emptyTitle="Research areas pending"
          emptyMessage="Research areas will be listed here once confirmed."
        >
          {(res) => (
            <div className={styles.grid}>
              {res.data.map((interest) => (
                <Card key={interest._id}>
                  <div className={styles.areaCard}>
                    <h3 className={styles.areaName}>{interest.name}</h3>
                    <p className={styles.areaDescription}>
                      {interest.description ??
                        'A detailed description of this research area will be added as verified content becomes available.'}
                    </p>
                    <Link
                      to={`/publications?researchArea=${encodeURIComponent(interest.name)}`}
                      className={styles.link}
                    >
                      View related publications →
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </AsyncBoundary>
      </Section>
    </>
  );
}
