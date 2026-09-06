import { SocialIcon } from '@/components/ui/SocialIcon';
import { SOCIAL_LINKS } from '@/lib/socialConfig';
import styles from './IconRail.module.css';

/**
 * Fixed social/academic/contact icon rail (brief: "Social / Academic
 * Icon Rail"). Desktop: fixed vertical rail, visible while scrolling.
 * Mobile: collapses to a compact horizontal row above the footer so it
 * never obstructs navigation, content, or forms (brief Part 18).
 *
 * Every entry renders from the single central `SOCIAL_LINKS`
 * configuration (Part 11) — no platform URL is hardcoded here. Active
 * entries are real links; `coming-soon` entries render as an
 * accessible, clearly-labeled non-navigating placeholder rather than
 * being hidden (Part 12) or given a fabricated URL (Part 17).
 */
export function IconRail() {
  const sorted = [...SOCIAL_LINKS].sort((a, b) => a.order - b.order);

  return (
    <nav className={styles.rail} aria-label="Social, academic, and contact links">
      <ul className={styles.list}>
        {sorted.map((link) => (
          <li key={link.platform} className={styles.item}>
            {link.status === 'active' && link.url ? (
              <a
                href={link.url}
                className={styles.iconLink}
                aria-label={link.ariaLabel}
                title={link.tooltip}
                {...(link.isDirectAction
                  ? {}
                  : { target: '_blank', rel: 'noopener noreferrer' })}
              >
                <SocialIcon icon={link.icon} />
              </a>
            ) : (
              <button
                type="button"
                className={`${styles.iconLink} ${styles.comingSoon}`}
                aria-label={link.ariaLabel}
                aria-disabled="true"
                title={link.tooltip}
                onClick={(e) => e.preventDefault()}
              >
                <SocialIcon icon={link.icon} />
                <span className={styles.comingSoonDot} aria-hidden="true" />
              </button>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
