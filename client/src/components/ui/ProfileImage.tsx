import styles from './ProfileImage.module.css';

interface ProfileImageProps {
  /** Web-ready black-and-white image URL, once the real photo pipeline has run. */
  src?: string | null;
  /** 1x variant for smaller viewports/lower-density displays, if available. */
  src1x?: string | null;
  alt: string;
}

/**
 * Renders the processed black-and-white profile photograph when
 * available. Until a real, verified photograph is supplied and
 * processed (see docs/CONTENT_UPDATE_GUIDE.md and assets/), this
 * renders an honest structural placeholder — never a generated or
 * fictional likeness.
 *
 * The image itself is served as-is from the verified source photograph
 * (resized/re-encoded only — no facial editing, retouching, or
 * generation). `srcSet` supplies both a 1x and 2x/retina variant so the
 * browser picks the appropriate density without over-fetching on
 * standard displays.
 */
export function ProfileImage({ src, src1x, alt }: ProfileImageProps) {
  return (
    <div className={styles.wrapper}>
      {src ? (
        <img
          src={src}
          srcSet={src1x ? `${src1x} 1x, ${src} 2x` : undefined}
          alt={alt}
          className={styles.image}
          width={220}
          height={220}
          loading="eager"
          fetchPriority="high"
        />
      ) : (
        <div className={styles.placeholder} role="img" aria-label={alt}>
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
            <circle cx="28" cy="20" r="10" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M10 48c2-10 10-16 18-16s16 6 18 16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <span className={styles.placeholderMono}>Photograph pending</span>
        </div>
      )}
    </div>
  );
}
