import { Link } from 'react-router-dom';
import type { PublicationRecord } from '@shared/types/academic';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import styles from './PublicationCard.module.css';

export function PublicationCard({ publication }: { publication: PublicationRecord }) {
  return (
    <Card as="article">
      <div className={styles.card}>
        <div className={styles.meta}>
          <span className={styles.year}>{publication.year}</span>
          {publication.publicationType && (
            <Badge tone="neutral">{publication.publicationType.replace('-', ' ')}</Badge>
          )}
        </div>

        <h3 className={styles.title}>
          <Link to={`/publications/${publication.slug}`} className={styles.titleLink}>
            {publication.title}
          </Link>
        </h3>

        {publication.researchAreas.length > 0 && (
          <div className={styles.tagsRow}>
            {publication.researchAreas.map((area) => (
              <Badge key={area} tone="accent">
                {area}
              </Badge>
            ))}
            {publication.researchAreasSource === 'inferred-from-title' && (
              <span className={styles.inferredNote}>(inferred from title)</span>
            )}
          </div>
        )}

        {typeof publication.citationCount === 'number' && (
          <span className={styles.citations}>
            Citations (snapshot): {publication.citationCount}
          </span>
        )}
      </div>
    </Card>
  );
}
