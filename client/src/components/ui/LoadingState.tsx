import styles from './LoadingState.module.css';

export function LoadingState({ label = 'Loading content' }: { label?: string }) {
  return (
    <div className={styles.loading} role="status" aria-live="polite">
      <span className={styles.spinner} aria-hidden="true" />
      <span className="visually-hidden">{label}</span>
    </div>
  );
}
