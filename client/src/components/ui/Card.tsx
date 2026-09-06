import type { ReactNode } from 'react';
import styles from './Card.module.css';

export function Card({ children, as: As = 'div' }: { children: ReactNode; as?: 'div' | 'article' | 'li' }) {
  return <As className={styles.card}>{children}</As>;
}
