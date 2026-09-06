import { IDENTITY } from './seo';

/**
 * Central social/academic/contact link configuration — the ONE place
 * to update any icon-rail link on the site (brief: "Social / Academic
 * Icon Rail", Part 11 "Social Profile Data Architecture"). No component
 * hardcodes a platform URL directly; every icon renders from an entry
 * in `SOCIAL_LINKS` below.
 *
 * NON-NEGOTIABLE RULE: never invent a URL, username, or handle. A
 * platform with no verified URL yet gets `url: null` and
 * `status: 'coming-soon'` — it stays visible (the user explicitly
 * wants the complete arrangement shown), but renders as a
 * non-navigating, clearly-labeled placeholder until a real URL is
 * supplied here.
 *
 * `sameAs` JSON-LD (see seo.ts) must draw ONLY from entries with
 * `status: 'active'` in the `sameAs`-eligible categories (academic,
 * professional, social) — see `SAME_AS_ELIGIBLE_URLS` at the bottom of
 * this file, which `seo.ts`'s `SAME_AS_LINKS` is built from. Contact
 * entries (email/phone/whatsapp) are never included, per the brief's
 * explicit instruction.
 */

export type SocialCategory = 'academic' | 'social' | 'contact';
export type SocialStatus = 'active' | 'coming-soon';

export interface SocialLinkConfig {
  platform: string;
  label: string;
  /** Icon key — see `SocialIcon.tsx` for the matching SVG glyph. */
  icon: string;
  /** Verified URL, or null when not yet supplied — never invented. */
  url: string | null;
  category: SocialCategory;
  status: SocialStatus;
  ariaLabel: string;
  tooltip: string;
  order: number;
  /** True for mailto:/tel:/wa.me links — these open a native handler, not a new tab. */
  isDirectAction?: boolean;
}

// Order follows the brief's Part 13 "Recommended Complete Icon Set"
// exactly: Academic/Professional first, then Social, then Contact.
export const SOCIAL_LINKS: SocialLinkConfig[] = [
  // ---- Academic / Professional ----
  {
    platform: 'linkedin',
    label: 'LinkedIn',
    icon: 'linkedin',
    url: IDENTITY.linkedinUrl,
    category: 'academic',
    status: 'active',
    ariaLabel: 'Dr. Ashok Malhi on LinkedIn (opens in a new tab)',
    tooltip: 'LinkedIn',
    order: 0,
  },
  {
    platform: 'google-scholar',
    label: 'Google Scholar',
    icon: 'google-scholar',
    url: IDENTITY.googleScholarUrl,
    category: 'academic',
    status: 'active',
    ariaLabel: 'Dr. Ashok Malhi on Google Scholar (opens in a new tab)',
    tooltip: 'Google Scholar',
    order: 1,
  },
  {
    platform: 'researchgate',
    label: 'ResearchGate',
    icon: 'researchgate',
    url: IDENTITY.researchGateUrl,
    category: 'academic',
    status: 'active',
    ariaLabel: 'Dr. Ashok Malhi on ResearchGate (opens in a new tab)',
    tooltip: 'ResearchGate',
    order: 2,
  },
  {
    platform: 'orcid',
    label: 'ORCID',
    icon: 'orcid',
    url: IDENTITY.orcid,
    category: 'academic',
    status: 'active',
    ariaLabel: 'Dr. Ashok Malhi on ORCID (opens in a new tab)',
    tooltip: 'ORCID',
    order: 3,
  },
  {
    platform: 'github',
    label: 'GitHub',
    icon: 'github',
    // Not supplied as verified data — never guessed. Icon stays visible
    // per the brief's explicit instruction; becomes a live link the
    // moment a real URL is added here.
    url: null,
    category: 'academic',
    status: 'coming-soon',
    ariaLabel: 'GitHub — link coming soon',
    tooltip: 'GitHub — Link coming soon',
    order: 4,
  },

  // ---- Social ----
  {
    platform: 'youtube',
    label: 'YouTube',
    icon: 'youtube',
    url: IDENTITY.youtubeUrl,
    category: 'social',
    status: 'active',
    ariaLabel: "Dr. Ashok Malhi's YouTube channel (opens in a new tab)",
    tooltip: 'YouTube',
    order: 5,
  },
  {
    platform: 'instagram',
    label: 'Instagram',
    icon: 'instagram',
    url: IDENTITY.instagramUrl,
    category: 'social',
    status: 'active',
    ariaLabel: 'Dr. Ashok Malhi on Instagram (opens in a new tab)',
    tooltip: 'Instagram',
    order: 6,
  },
  {
    platform: 'facebook',
    label: 'Facebook',
    icon: 'facebook',
    url: IDENTITY.facebookUrl,
    category: 'social',
    status: 'active',
    ariaLabel: 'Dr. Ashok Malhi on Facebook (opens in a new tab)',
    tooltip: 'Facebook',
    order: 7,
  },
  {
    platform: 'reddit',
    label: 'Reddit',
    icon: 'reddit',
    url: null,
    category: 'social',
    status: 'coming-soon',
    ariaLabel: 'Reddit — link coming soon',
    tooltip: 'Reddit — Link coming soon',
    order: 8,
  },
  {
    platform: 'discord',
    label: 'Discord',
    icon: 'discord',
    url: null,
    category: 'social',
    status: 'coming-soon',
    ariaLabel: 'Discord — server link coming soon',
    tooltip: 'Discord — Server link coming soon',
    order: 9,
  },
  {
    platform: 'telegram',
    label: 'Telegram',
    icon: 'telegram',
    url: null,
    category: 'social',
    status: 'coming-soon',
    ariaLabel: 'Telegram — link coming soon',
    tooltip: 'Telegram — Link coming soon',
    order: 10,
  },
  {
    platform: 'blogger',
    label: 'Blogger',
    icon: 'blogger',
    url: null,
    category: 'social',
    status: 'coming-soon',
    ariaLabel: 'Blogger — blog link coming soon',
    tooltip: 'Blogger — Blog link coming soon',
    order: 11,
  },

  // ---- Contact ----
  {
    platform: 'email',
    label: 'Email',
    icon: 'email',
    url: 'mailto:ashok.singh.malhi@gmail.com',
    category: 'contact',
    status: 'active',
    ariaLabel: 'Email Dr. Ashok Malhi at ashok.singh.malhi@gmail.com',
    tooltip: 'Email — ashok.singh.malhi@gmail.com',
    order: 12,
    isDirectAction: true,
  },
  {
    platform: 'phone',
    label: 'Phone',
    icon: 'phone',
    url: 'tel:+917011115411',
    category: 'contact',
    status: 'active',
    ariaLabel: 'Call Dr. Ashok Malhi',
    tooltip: 'Call Dr. Ashok Malhi',
    order: 13,
    isDirectAction: true,
  },
  {
    platform: 'whatsapp',
    label: 'WhatsApp',
    icon: 'whatsapp',
    // Same number as Phone above (confirmed by the user to be both
    // mobile and WhatsApp Business) — never a second, different number.
    url: 'https://wa.me/917011115411',
    category: 'contact',
    status: 'active',
    ariaLabel: 'Message Dr. Ashok Malhi on WhatsApp',
    tooltip: 'WhatsApp — Message Dr. Ashok Malhi',
    order: 14,
  },
];

/**
 * URLs eligible for JSON-LD `sameAs` — active, non-contact entries
 * only. Contact channels (email/phone/WhatsApp) and any coming-soon
 * placeholder are excluded even though they appear in the visible icon
 * rail (brief Part 16). `seo.ts`'s `SAME_AS_LINKS` is the actual value
 * used in structured data; this export exists so the two lists can be
 * cross-checked in tests rather than drifting apart silently.
 */
export const SAME_AS_ELIGIBLE_URLS: string[] = SOCIAL_LINKS.filter(
  (link) => link.status === 'active' && link.category !== 'contact' && link.url
).map((link) => link.url as string);
