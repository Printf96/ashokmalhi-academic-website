export const SITE_URL = 'https://ashokmalhi.pro';
export const SITE_NAME = 'Dr. Ashok Malhi — Official Academic Profile';

export const IDENTITY = {
  displayName: 'Dr. Ashok Malhi',
  authorName: 'Ashok Malhi',
  authorNameVariant: 'Ashok Singh Malhi',
  professionalTitle: 'Assistant Professor',
  affiliation: 'Lovely Professional University',
  affiliationCountry: 'India',
  // Deliberately no static `department` constant here. The only
  // department/school value available ("Mittal School of Business")
  // is Scholar-sourced, not independently confirmed, and lives only in
  // the database (Person.department) so there is exactly one source
  // of truth — components that need it fetch the live Person record
  // (see AboutPage.tsx) rather than duplicating it as a hardcoded
  // constant here, which risked silently drifting out of sync.
  orcid: 'https://orcid.org/0000-0001-9756-5865',
  scopusId: '57833141600',
  googleScholarUrl: 'https://scholar.google.com/citations?user=Uf8bU5sAAAAJ',
  researchGateUrl: 'https://www.researchgate.net/profile/Ashok-Malhi',
  linkedinUrl: 'https://www.linkedin.com/in/ashok-malhi/',
  facebookUrl: 'https://www.facebook.com/official.ashok.malhi',
  instagramUrl: 'https://www.instagram.com/dr.ashok_malhi/',
  youtubeUrl: 'https://www.youtube.com/@Dr_ashok_malhi',
  // Institution names only (from the v2.0 Education data package),
  // used for the `alumniOf` JSON-LD property below. Deliberately
  // excludes degree, specialization, and thesis details — those are
  // not independently confirmed institutional records the way the
  // institution names themselves are.
  alumniInstitutions: ['Sharda University', 'IMS Ghaziabad', 'IPEM Ghaziabad'],
} as const;

// Only verified, active profile URLs belong here — never a coming-soon
// or null placeholder (GitHub/Reddit/Discord/Telegram/Blogger are not
// included until a real URL is supplied), and never a contact channel
// (phone/WhatsApp/email are not `sameAs` social entries). See
// client/src/lib/socialConfig.ts for the full icon-rail configuration,
// which includes both this verified set and the coming-soon platforms.
export const SAME_AS_LINKS: string[] = [
  IDENTITY.orcid,
  `https://www.scopus.com/authid/detail.uri?authorId=${IDENTITY.scopusId}`,
  IDENTITY.googleScholarUrl,
  IDENTITY.researchGateUrl,
  IDENTITY.linkedinUrl,
  IDENTITY.facebookUrl,
  IDENTITY.instagramUrl,
  IDENTITY.youtubeUrl,
];

/**
 * Schema.org Person object representing the canonical identity of
 * Dr. Ashok Malhi. Reused (with page-specific wrapping) across the
 * Home, About, and Publication detail JSON-LD blocks so search engines
 * and AI systems consistently resolve one entity across the site.
 *
 * Deliberately does NOT include `affiliation.department`. The only
 * department/school value currently available ("Mittal School of
 * Business", stored in Person.department) was read off a Google
 * Scholar profile field, not independently confirmed as an
 * institutional record. Structured data has no mechanism to attach a
 * "not independently verified" qualifier the way visible UI copy can,
 * so an unverified fact must not be asserted here — only the confirmed
 * university-level affiliation is included. Add department back once
 * confirmed directly (e.g. by the institution or the user).
 *
 * DOES include `alumniOf` (institution names only — Sharda University,
 * IMS Ghaziabad, IPEM Ghaziabad, from the v2.0 Education data package).
 * Unlike department, these are being asserted as plain organization
 * names, not degree-specific claims — no degree type, specialization,
 * or completion date is attached in structured data, since the PhD
 * completion date has an unresolved source conflict (see
 * server/src/seed/data.ts) and specialization was never supplied.
 */
export function buildPersonSchema() {
  return {
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: IDENTITY.displayName,
    alternateName: [IDENTITY.authorName, IDENTITY.authorNameVariant],
    jobTitle: IDENTITY.professionalTitle,
    affiliation: {
      '@type': 'CollegeOrUniversity',
      name: IDENTITY.affiliation,
      address: {
        '@type': 'PostalAddress',
        addressCountry: IDENTITY.affiliationCountry,
      },
    },
    alumniOf: IDENTITY.alumniInstitutions.map((name) => ({
      '@type': 'CollegeOrUniversity',
      name,
    })),
    url: SITE_URL,
    sameAs: SAME_AS_LINKS,
  };
}

export function buildWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { '@id': `${SITE_URL}/#person` },
    inLanguage: 'en',
  };
}

export function buildProfilePageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${SITE_URL}/#profilepage`,
    url: SITE_URL,
    mainEntity: buildPersonSchema(),
    inLanguage: 'en',
  };
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export interface ScholarlyArticleInput {
  title: string;
  slug: string;
  year: number;
  authors?: string[] | null;
  journal?: string | null;
  doi?: string | null;
  url?: string | null;
  abstract?: string | null;
}

export function buildScholarlyArticleSchema(pub: ScholarlyArticleInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: pub.title,
    name: pub.title,
    url: `${SITE_URL}/publications/${pub.slug}`,
    datePublished: String(pub.year),
    author: pub.authors?.length
      ? pub.authors.map((name) => ({ '@type': 'Person', name }))
      : { '@id': `${SITE_URL}/#person` },
    ...(pub.journal ? { isPartOf: { '@type': 'Periodical', name: pub.journal } } : {}),
    ...(pub.doi ? { sameAs: `https://doi.org/${pub.doi}` } : {}),
    ...(pub.abstract ? { abstract: pub.abstract } : {}),
    ...(pub.url ? { mainEntityOfPage: pub.url } : {}),
  };
}
