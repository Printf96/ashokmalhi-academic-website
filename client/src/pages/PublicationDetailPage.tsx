import { Link, useParams } from 'react-router-dom';
import { SeoHead } from '@/components/seo/SeoHead';
import { AsyncBoundary } from '@/components/ui/AsyncBoundary';
import { Badge } from '@/components/ui/Badge';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { useApi } from '@/hooks/useApi';
import { api } from '@/lib/api';
import { buildBreadcrumbSchema, buildScholarlyArticleSchema, IDENTITY } from '@/lib/seo';
import styles from './PublicationDetailPage.module.css';

export function PublicationDetailPage() {
  const { slug = '' } = useParams();
  const publication = useApi(() => api.getPublicationBySlug(slug), [slug]);

  if (publication.notFound) {
    return <NotFoundPage />;
  }

  return (
    <AsyncBoundary
      loading={publication.loading}
      error={publication.error}
      data={publication.data}
      emptyMessage="This publication could not be found."
    >
      {(res) => {
        const pub = res.data;
        return (
          <>
            <SeoHead
              title={`${pub.title} | Publications | Dr. Ashok Malhi`}
              description={
                pub.abstract ??
                `${pub.title} (${pub.year}) by ${IDENTITY.authorName}, ${IDENTITY.professionalTitle} at ${IDENTITY.affiliation}.`
              }
              path={`/publications/${pub.slug}`}
              jsonLd={[
                buildScholarlyArticleSchema(pub),
                buildBreadcrumbSchema([
                  { name: 'Home', path: '/' },
                  { name: 'Publications', path: '/publications' },
                  { name: pub.title, path: `/publications/${pub.slug}` },
                ]),
              ]}
            />

            <header className={styles.header}>
              <div className="container">
                <Link to="/publications" className={styles.backLink}>
                  ← All publications
                </Link>
                <h1 className={styles.title}>{pub.title}</h1>
                <div className={styles.metaRow}>
                  <Badge tone="accent">{pub.year}</Badge>
                  {pub.publicationType && <Badge tone="neutral">{pub.publicationType}</Badge>}
                  {typeof pub.citationCount === 'number' && (
                    <Badge tone="neutral">Citations (snapshot): {pub.citationCount}</Badge>
                  )}
                  {pub.researchAreas.map((area) => (
                    <Badge key={area} tone="success">
                      {area}
                    </Badge>
                  ))}
                </div>
                {pub.researchAreasSource === 'inferred-from-title' && (
                  <p className={styles.inferredNote}>
                    Research area tags above are inferred from the title, not confirmed
                    bibliographic metadata.
                  </p>
                )}
              </div>
            </header>

            <div className="container">
              <div className={styles.detailGrid}>
                <div className={styles.detailItem}>
                  <p className={styles.detailLabel}>Authors</p>
                  <p className={styles.detailValue}>
                    {pub.authors?.length
                      ? pub.authors.join(', ')
                      : `Full author list not yet confirmed (${IDENTITY.authorName} is a contributing author)`}
                  </p>
                </div>
                <div className={styles.detailItem}>
                  <p className={styles.detailLabel}>Journal / Conference</p>
                  <p className={styles.detailValue}>
                    {pub.journal ?? pub.conference ?? 'To be confirmed'}
                  </p>
                </div>
                <div className={styles.detailItem}>
                  <p className={styles.detailLabel}>DOI</p>
                  <p className={styles.detailValue}>
                    {pub.doi ? (
                      <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer">
                        {pub.doi}
                      </a>
                    ) : (
                      'Not yet available'
                    )}
                  </p>
                </div>
                <div className={styles.detailItem}>
                  <p className={styles.detailLabel}>Indexing</p>
                  <p className={styles.detailValue}>
                    {pub.indexing.length ? pub.indexing.join(', ') : 'Not yet available'}
                  </p>
                </div>
              </div>

              {pub.abstract && (
                <div className={styles.detailItem} style={{ marginBottom: '2rem' }}>
                  <p className={styles.detailLabel}>Abstract</p>
                  <p className={styles.detailValue}>{pub.abstract}</p>
                </div>
              )}

              {pub.url && (
                <p style={{ marginBottom: '3rem' }}>
                  <a href={pub.url} target="_blank" rel="noopener noreferrer">
                    View publication →
                  </a>
                </p>
              )}
            </div>
          </>
        );
      }}
    </AsyncBoundary>
  );
}
