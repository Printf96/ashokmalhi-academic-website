import styles from './EmptyState.module.css';

interface EmptyStateProps {
  title?: string;
  message?: string;
}

/**
 * Professional placeholder for sections without verified content yet.
 * Used instead of "Coming soon!" or leaving a blank gap — see brief
 * section 48 (Error / Empty States).
 */
export function EmptyState({
  title = 'Not yet available',
  message = 'Additional academic information will be added as verified records become available.',
}: EmptyStateProps) {
  return (
    <div className={styles.empty} role="status">
      <div className={styles.icon} aria-hidden="true">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect x="1" y="1" width="26" height="26" rx="6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M14 9v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="14" cy="19" r="1.1" fill="currentColor" />
        </svg>
      </div>
      <p className={styles.title}>{title}</p>
      <p className={styles.message}>{message}</p>
    </div>
  );
}
