/**
 * Shared academic domain types.
 *
 * These interfaces are the contract between the MongoDB/Mongoose layer,
 * the Express API responses, and the React frontend. They intentionally
 * make every "content" field optional/nullable so that missing verified
 * information can be represented honestly as structured absence rather
 * than invented data.
 *
 * DO NOT hardcode instances of these types with invented data anywhere
 * in the codebase. Real data enters only via the database (seed scripts
 * or the future admin API) using verified information.
 */

export type ISODateString = string;

/** Generic wrapper so every list endpoint has a consistent shape. */
export interface ApiListResponse<T> {
  data: T[];
  count: number;
  meta?: Record<string, unknown>;
}

export interface ApiItemResponse<T> {
  data: T;
}

export interface ApiErrorResponse {
  error: {
    message: string;
    code: string;
    details?: unknown;
  };
}

/* ------------------------------------------------------------------ */
/* Person / core identity                                             */
/* ------------------------------------------------------------------ */

export interface PersonRecord {
  _id: string;
  /** Primary public display name, e.g. "Dr. Ashok Malhi" */
  displayName: string;
  /** Academic author name used on publications, e.g. "Ashok Malhi" */
  authorName: string;
  /** Alternate publication/name variant, e.g. "Ashok Singh Malhi" */
  authorNameVariant: string | null;
  /** Professional identity line, e.g. "Assistant Professor | Lovely Professional University" */
  professionalTitle: string;
  affiliation: string;
  affiliationCountry: string;
  /**
   * Department/school as shown on an external academic profile (e.g.
   * Google Scholar), not necessarily an independently confirmed
   * institutional record. Null until verified.
   */
  department: string | null;
  /** Short biography. Null when not yet verified/supplied. */
  shortBio: string | null;
  /** Longer biography for the About page. Null when not yet verified/supplied. */
  fullBio: string | null;
  email: string | null;
  profileImage: MediaAssetRef | null;
  scholarMetrics: ScholarMetrics | null;
  /**
   * Short editorial description of the current professional
   * positioning (e.g. "researcher and educator working at the
   * intersection of X, Y, Z"), distinct from `shortBio`/`fullBio`
   * which are reserved for a personally-written biography. Null until
   * supplied.
   */
  professionalPositioning: string | null;
  /** Technical/software skills as explicitly listed on a verified source. */
  technicalSkills: string[];
  /** Research & analytics method skills as explicitly listed on a verified source. */
  researchSkills: string[];
  /** Soft skills as explicitly listed on a verified source. */
  softSkills: string[];
  /**
   * Broader specialization/focus terms distinct from the confirmed
   * `ResearchInterest` taxonomy (e.g. "AI in Business", "Digital
   * Banking") — presented as areas of focus, never as exclusive
   * expertise claims.
   */
  specializations: string[];
  /** Spoken/written languages, each with an optional proficiency qualifier (e.g. "Basic"). */
  languages: LanguageEntry[];
  updatedAt: ISODateString;
  createdAt: ISODateString;
}

export interface LanguageEntry {
  name: string;
  /** e.g. "Basic". Null when full/native proficiency is implied by omission. */
  proficiency: string | null;
}

/**
 * A point-in-time snapshot of Google Scholar metrics. Never treated as
 * live/current — always rendered with an explicit "snapshot" label and
 * the date it was captured.
 */
export interface ScholarMetrics {
  citations: number | null;
  hIndex: number | null;
  i10Index: number | null;
  /** When this snapshot was captured/supplied, not a live-updated value. */
  asOf: ISODateString | null;
  source: 'google-scholar';
}

export interface MediaAssetRef {
  _id: string;
  slug: string;
  altText: string;
  url: string | null;
  variants?: {
    original?: string | null;
    /** Retina/2x web-ready black-and-white variant (440px). */
    webBw?: string | null;
    /** 1x web-ready black-and-white variant (220px), for `srcSet`. */
    webBw1x?: string | null;
    thumbnail?: string | null;
  };
}

/* ------------------------------------------------------------------ */
/* Education                                                          */
/* ------------------------------------------------------------------ */

export interface EducationRecord {
  _id: string;
  degree: string | null;
  fieldOfStudy: string | null;
  institution: string | null;
  institutionCountry: string | null;
  startYear: number | null;
  endYear: number | null;
  /** Numeric grade if supplied (e.g. CGPA). Kept separate from `gradeLabel` so units are never guessed. */
  grade: string | null;
  /** Human-readable grade label, e.g. "CGPA" or "Percentage", paired with `grade`. */
  gradeLabel: string | null;
  description: string | null;
  /**
   * Set only when two verified sources disagree on a fact for this
   * record (e.g. a completion year) and the discrepancy has not been
   * resolved. Never silently merged away — surfaced verbatim in the UI
   * as a visible qualifier so a reader knows the field shown is the
   * higher-priority source's value pending confirmation, not an
   * undisputed fact.
   */
  provenanceNote: string | null;
  order: number;
  verified: boolean;
}

/* ------------------------------------------------------------------ */
/* Experience                                                         */
/* ------------------------------------------------------------------ */

export type ExperienceType =
  | 'academic'
  | 'research'
  | 'administrative'
  | 'professional'
  | 'other';

export interface ExperienceRecord {
  _id: string;
  role: string;
  organization: string;
  organizationCountry: string | null;
  type: ExperienceType;
  startDate: ISODateString | null;
  endDate: ISODateString | null;
  isCurrent: boolean;
  description: string | null;
  /**
   * Publicly stated responsibilities for this role, as explicitly
   * supplied — never expanded with invented duties.
   */
  responsibilities: string[];
  /**
   * Set when this record's dates overlap another verified record and
   * the overlap has not been independently explained. Never used to
   * silently "correct" or drop either record — both stay as published,
   * with the overlap flagged for later confirmation.
   */
  provenanceNote: string | null;
  order: number;
  verified: boolean;
}

/* ------------------------------------------------------------------ */
/* Research interests                                                 */
/* ------------------------------------------------------------------ */

export interface ResearchInterestRecord {
  _id: string;
  name: string;
  slug: string;
  description: string | null;
  order: number;
}

/* ------------------------------------------------------------------ */
/* Publications                                                       */
/* ------------------------------------------------------------------ */

export type PublicationType =
  | 'journal-article'
  | 'conference-paper'
  | 'book-chapter'
  | 'preprint'
  | 'other';

export interface PublicationRecord {
  _id: string;
  slug: string;
  title: string;
  authors: string[] | null;
  year: number;
  publicationType: PublicationType | null;
  journal: string | null;
  conference: string | null;
  publisher: string | null;
  volume: string | null;
  issue: string | null;
  pages: string | null;
  doi: string | null;
  url: string | null;
  abstract: string | null;
  keywords: string[];
  researchAreas: string[];
  /**
   * Whether `researchAreas` came from a confirmed source (e.g. supplied
   * directly, or the publication venue's own subject classification)
   * or was inferred editorially from the title/abstract because no
   * verified classification exists yet. Null when `researchAreas` is
   * empty. Always surfaced in the UI when 'inferred-from-title' so a
   * reader never mistakes an editorial guess for confirmed metadata.
   */
  researchAreasSource: 'confirmed' | 'inferred-from-title' | null;
  citationCount: number | null;
  citationCountSource: 'google-scholar' | 'scopus' | 'manual' | null;
  citationCountUpdatedAt: ISODateString | null;
  indexing: string[];
  featured: boolean;
  verified: boolean;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

/* ------------------------------------------------------------------ */
/* Presentations                                                      */
/* ------------------------------------------------------------------ */

export type PresentationType =
  | 'conference-talk'
  | 'invited-talk'
  | 'workshop'
  | 'poster'
  | 'panel'
  | 'other';

export interface PresentationRecord {
  _id: string;
  slug: string;
  title: string;
  event: string | null;
  organization: string | null;
  /**
   * Free-text date range as published (e.g. "10–11 October 2019").
   * Kept as a string rather than forced into a single ISO date because
   * the source records span date ranges, not single days.
   */
  dateDisplay: string | null;
  date: ISODateString | null;
  location: string | null;
  type: PresentationType | null;
  /** e.g. "International" — the scope/level as publicly stated, not a claim of keynote/award status. */
  scope: string | null;
  description: string | null;
  slidesUrl: string | null;
  certificateUrl: string | null;
  videoUrl: string | null;
  verified: boolean;
}

/* ------------------------------------------------------------------ */
/* Achievements                                                       */
/* ------------------------------------------------------------------ */

export type AchievementType =
  | 'award'
  | 'recognition'
  | 'certification'
  | 'milestone'
  | 'invited-talk'
  | 'other';

export interface AchievementRecord {
  _id: string;
  title: string;
  type: AchievementType;
  issuer: string | null;
  date: ISODateString | null;
  description: string | null;
  url: string | null;
  order: number;
  verified: boolean;
}

/* ------------------------------------------------------------------ */
/* Academic / social / professional profiles                          */
/* ------------------------------------------------------------------ */

export type ProfileCategory = 'academic' | 'professional' | 'social';

export type ProfileNetwork =
  | 'orcid'
  | 'scopus'
  | 'google-scholar'
  | 'researchgate'
  | 'linkedin'
  | 'facebook'
  | 'instagram'
  | 'youtube'
  | 'website'
  | 'other';

export interface AcademicProfileRecord {
  _id: string;
  network: ProfileNetwork;
  category: ProfileCategory;
  label: string;
  url: string;
  identifier: string | null;
  order: number;
}

/* ------------------------------------------------------------------ */
/* Contact information                                                */
/* ------------------------------------------------------------------ */

export interface ContactInformationRecord {
  _id: string;
  professionalEmail: string | null;
  department: string | null;
  institution: string | null;
  officeLocation: string | null;
  officeHours: string | null;
}

export interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
  /** Honeypot field name; must remain empty. Not persisted. */
  website?: string;
}
