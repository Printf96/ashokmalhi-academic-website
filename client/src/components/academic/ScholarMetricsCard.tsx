import type { ScholarMetrics } from '@shared/types/academic';
import styles from './ScholarMetricsCard.module.css';

function formatDate(value: string | null): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric', day: 'numeric' });
}

/**
 * Renders a Google Scholar metrics snapshot. Deliberately never labeled
 * as live — always paired with "snapshot" language and the capture
 * date, per the source data package's explicit instruction not to
 * imply these numbers are currently accurate.
 */
export function ScholarMetricsCard({ metrics }: { metrics: ScholarMetrics }) {
  const asOf = formatDate(metrics.asOf);

  return (
    <div className={styles.card}>
      {metrics.citations !== null && (
        <div className={styles.metric}>
          <span className={styles.value}>{metrics.citations}</span>
          <span className={styles.label}>Citations</span>
        </div>
      )}
      {metrics.hIndex !== null && (
        <div className={styles.metric}>
          <span className={styles.value}>{metrics.hIndex}</span>
          <span className={styles.label}>h-index</span>
        </div>
      )}
      {metrics.i10Index !== null && (
        <div className={styles.metric}>
          <span className={styles.value}>{metrics.i10Index}</span>
          <span className={styles.label}>i10-index</span>
        </div>
      )}
      <p className={styles.footnote}>
        Google Scholar metrics — profile snapshot{asOf ? ` as of ${asOf}` : ''}. Not a live count;
        figures may have changed since this snapshot was recorded.
      </p>
    </div>
  );
}
