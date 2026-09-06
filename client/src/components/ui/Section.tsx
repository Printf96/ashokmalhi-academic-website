import type { ReactNode } from 'react';
import styles from './Section.module.css';

interface SectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  id?: string;
}

/** Consistent section header + container used across every page. */
export function Section({ eyebrow, title, description, children, id }: SectionProps) {
  return (
    <section className={styles.section} id={id} aria-labelledby={id ? `${id}-heading` : undefined}>
      <div className="container">
        <div className={styles.header}>
          {eyebrow && <p className="mono-label">{eyebrow}</p>}
          <h2 id={id ? `${id}-heading` : undefined}>{title}</h2>
          {description && <p className={styles.description}>{description}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
