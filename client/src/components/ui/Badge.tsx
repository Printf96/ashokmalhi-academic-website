import type { ReactNode } from 'react';
import styles from './Badge.module.css';

interface BadgeProps {
  children: ReactNode;
  tone?: 'accent' | 'success' | 'warning' | 'error' | 'neutral';
  icon?: ReactNode;
}

/**
 * Never communicates meaning through color alone: every tone pairs an
 * icon + text label, and each tone additionally gets a distinct border
 * style so the badge remains legible under any color-vision deficiency
 * or in grayscale print.
 */
export function Badge({ children, tone = 'neutral', icon }: BadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[tone]}`} data-tone={tone}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </span>
  );
}
