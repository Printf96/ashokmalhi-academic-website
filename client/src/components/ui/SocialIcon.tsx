/**
 * Recognizable, minimal SVG glyphs for the social/academic/contact icon
 * rail — single-color (`currentColor`) line icons on a consistent 20x20
 * grid, in the site's existing academic/technical visual language (see
 * Navigation.tsx's menu icon for the same stroke-based style). No
 * downloaded image icons, no brand wordmarks/logos reproduced — these
 * are simple geometric glyphs that read clearly at small sizes.
 */

const ICONS: Record<string, JSX.Element> = {
  linkedin: (
    <>
      <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="7" cy="7.5" r="1" fill="currentColor" />
      <path d="M7 10v4M13 14v-2.5c0-1-0.7-1.5-1.5-1.5S10 10.5 10 11.5V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 10v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  'google-scholar': (
    <>
      <path d="M10 4L2 8.5l8 4.5 8-4.5L10 4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M5 10.5v3c0 1.5 2.2 2.7 5 2.7s5-1.2 5-2.7v-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  researchgate: (
    <>
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 13V8.5M7 8.5c0-1 .8-1.5 1.6-1.5S10 8 10 9M10 13V9M13 13v-3c0-1-.7-1.5-1.5-1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </>
  ),
  orcid: (
    <>
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="7.2" cy="7" r="0.9" fill="currentColor" />
      <path d="M7.2 9.5v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 9.5v4M10 9.5h1.8a2 2 0 010 4H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  github: (
    <path
      d="M10 3a7 7 0 00-2.2 13.65c.35.06.48-.15.48-.34v-1.3c-1.95.42-2.36-.94-2.36-.94-.32-.8-.78-1.02-.78-1.02-.64-.44.05-.43.05-.43.7.05 1.07.72 1.07.72.63 1.07 1.65.76 2.05.58.06-.46.25-.76.45-.94-1.56-.18-3.2-.78-3.2-3.47 0-.77.27-1.4.72-1.9-.07-.18-.31-.9.07-1.87 0 0 .59-.19 1.94.72a6.7 6.7 0 013.53 0c1.35-.91 1.94-.72 1.94-.72.38.97.14 1.69.07 1.87.45.5.72 1.13.72 1.9 0 2.7-1.64 3.29-3.2 3.47.26.22.49.66.49 1.33v1.97c0 .19.13.41.49.34A7 7 0 0010 3z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
  ),
  youtube: (
    <>
      <rect x="2.5" y="5.5" width="15" height="9" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8.5 8.3v3.4l3-1.7-3-1.7z" fill="currentColor" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="14" height="14" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="10" r="3.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="14.2" cy="5.8" r="0.9" fill="currentColor" />
    </>
  ),
  facebook: (
    <path
      d="M12.5 3.5h-1.8A3.2 3.2 0 007.5 6.7v1.8H5.8v2.7h1.7V17h2.8v-5.8h2l.4-2.7h-2.4V7c0-.5.3-1 1.2-1h1.4V3.5z"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
  ),
  reddit: (
    <>
      <circle cx="10" cy="11.2" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 6.2L11 3l2.4.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="13" cy="3.6" r="1" fill="currentColor" />
      <circle cx="7.8" cy="11" r="0.8" fill="currentColor" />
      <circle cx="12.2" cy="11" r="0.8" fill="currentColor" />
      <path d="M7.8 13.2c.6.6 1.4.9 2.2.9s1.6-.3 2.2-.9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </>
  ),
  discord: (
    <path
      d="M6.5 5.8C8 5 9 4.8 10 4.8s2 .2 3.5 1c1.3 2 1.8 4.2 1.7 6.6-1 .8-2 1.3-3 1.6l-.5-1c.5-.15 1-.35 1.4-.6-.35-.25-.7-.5-1-.8-1.4.65-2.9.65-4.3 0-.3.3-.65.55-1 .8.4.25.9.45 1.4.6l-.5 1c-1-.3-2-.8-3-1.6-.15-2.4.35-4.6 1.7-6.6zM8.2 9.7c-.5 0-.9.5-.9 1.1s.4 1.1.9 1.1.9-.5.9-1.1-.4-1.1-.9-1.1zm3.6 0c-.5 0-.9.5-.9 1.1s.4 1.1.9 1.1.9-.5.9-1.1-.4-1.1-.9-1.1z"
      stroke="currentColor"
      strokeWidth="0.8"
      strokeLinejoin="round"
    />
  ),
  telegram: (
    <path
      d="M17 4L2.5 9.6c-.6.25-.6.9 0 1.1l3.5 1.2 1.3 4.2c.15.5.75.6 1.1.2l2-2.1 3.6 2.7c.5.35 1.2.1 1.35-.5L17.5 4.6c.15-.5-.4-.9-.5-.6zM6.5 11.4l7-4.6-5.7 5.6-.15 2.4-1.15-3.4z"
      fill="currentColor"
    />
  ),
  blogger: (
    <>
      <rect x="3" y="3" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 7.5h2.5M7 10h6M7 12.5h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </>
  ),
  email: (
    <>
      <rect x="2.5" y="4.5" width="15" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 5.5l7 5.5 7-5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  phone: (
    <path
      d="M6 3.5c.6 0 1.1.4 1.3 1l.7 1.9c.15.4.05.9-.25 1.2l-1 1c.7 1.6 2 2.9 3.6 3.6l1-1c.3-.3.8-.4 1.2-.25l1.9.7c.6.2 1 .7 1 1.3v1.6c0 .9-.75 1.6-1.65 1.5-5.3-.6-9.5-4.8-10.1-10.1-.1-.9.6-1.65 1.5-1.65H6z"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
  ),
  whatsapp: (
    <>
      <path
        d="M10 3a7 7 0 00-6 10.6L3 17l3.5-1a7 7 0 100-13z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M7.3 7.2c.15-.35.3-.35.45-.35h.35c.15 0 .3 0 .45.35s.5 1.2.55 1.3c.05.1.05.25 0 .35-.1.2-.15.3-.3.45-.15.15-.3.25-.15.5.7 1.2 1.4 1.6 2.5 2.15.2.1.3.05.45-.1.15-.15.6-.7.75-.9.15-.2.3-.15.5-.1.2.1 1.3.6 1.5.7.2.1.35.15.4.25.05.15.05.65-.15 1.15-.2.5-1.1.95-1.5 1-.4.05-.85.1-2.75-.6-2.3-.9-3.75-3.25-3.85-3.4-.1-.15-.85-1.1-.85-2.15s.55-1.55.75-1.75z"
        fill="currentColor"
      />
    </>
  ),
};

interface SocialIconProps {
  icon: string;
  size?: number;
}

export function SocialIcon({ icon, size = 20 }: SocialIconProps) {
  const glyph = ICONS[icon];
  if (!glyph) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
      {glyph}
    </svg>
  );
}
