import styles from './ErrorState.module.css';

export function ErrorState({ message }: { message: string }) {
  return (
    <div className={styles.error} role="alert">
      <strong className={styles.label}>⚠ Unable to load content</strong>
      <p>{message}</p>
    </div>
  );
}
