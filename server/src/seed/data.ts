/**
 * VERIFIED SEED DATA ONLY.
 *
 * Every value in this file was explicitly supplied by the user, across
 * three data packages:
 *   - The original project brief.
 *   - "Complete Academic Knowledge & Content Data Package v1.0"
 *     (2026-09-06): department/affiliation string as shown on Google
 *     Scholar, the Google Scholar metrics snapshot, and a provisional
 *     contact email.
 *   - "Academic Profile Data Package v2.0" (2026-09-06): education,
 *     experience, biography, presentations, certifications, skills,
 *     specializations, and languages, all sourced from the official
 *     personal website (with LinkedIn cited only for one flagged
 *     provenance conflict).
 *   - "Final Profile Photo + Social Media + Contact Integration"
 *     (2026-09-06): the real profile photograph (see `mediaAssetsSeed`
 *     below), the YouTube channel URL, and the verified email/phone/
 *     WhatsApp contact channels (see client/src/lib/socialConfig.ts —
 *     these live in that frontend config, not in this seed file, since
 *     they are not database-backed AcademicProfile records).
 *
 * The contact email is explicitly flagged as provisional pending the
 * user's confirmation or replacement — do not present it as verified
 * without qualification anywhere in the UI.
 *
 * Do NOT add journals, DOIs, publishers, volumes, pages, author lists,
 * abstracts, degree specializations/thesis titles, consulting clients,
 * or presentation collateral (slides/certificates/video/DOI) that were
 * not explicitly verified. When new verified information arrives,
 * extend these arrays — do not guess intermediate values to "complete"
 * a record.
 *
 * PROVENANCE CONFLICT (v2.0 package, section 3.1): LinkedIn shows the
 * Sharda University PhD as 2019–2023, while the official personal
 * website states completion in 2024. Per the v2.0 package's explicit
 * source-priority rule (§24: official personal website > LinkedIn for
 * public-profile presentation) and its explicit instruction not to
 * silently merge conflicting dates, this file uses the official
 * website's "2024" for display, and records the LinkedIn figure in
 * `provenanceNote` on that Education record so the discrepancy is
 * never lost — the frontend renders that note as a visible qualifier.
 *
 * Fields not listed here remain `null`/empty in the database, which the
 * frontend renders as an honest "not yet available" state rather than
 * inventing content.
 */

/**
 * The real, user-supplied black-and-white profile photograph (confirmed
 * by the user as an actual photograph, not AI-generated), processed
 * into web-ready variants — resized and re-encoded as WebP only, with
 * no facial editing, retouching, or generation. The unedited source
 * lives in assets/original/ (gitignored, never served publicly). See
 * docs/CONTENT_UPDATE_GUIDE.md, "Adding the verified profile
 * photograph."
 */
export const mediaAssetsSeed = [
  {
    slug: 'ashok-malhi-profile-bw',
    kind: 'profile-photo' as const,
    altText: 'Dr. Ashok Malhi, Assistant Professor and academic researcher',
    url: '/images/ashok-malhi-profile-bw.webp',
    variants: {
      original: null, // Original is intentionally not served publicly.
      webBw: '/images/ashok-malhi-profile-bw.webp',
      webBw1x: '/images/ashok-malhi-profile-bw@1x.webp',
      thumbnail: '/images/ashok-malhi-profile-bw-thumb.webp',
    },
    mimeType: 'image/webp',
    width: 440,
    height: 440,
    isPlaceholder: false,
  },
];

export const personSeed = {
  displayName: 'Dr. Ashok Malhi',
  authorName: 'Ashok Malhi',
  authorNameVariant: 'Ashok Singh Malhi',
  professionalTitle: 'Assistant Professor',
  affiliation: 'Lovely Professional University',
  affiliationCountry: 'India',
  // As shown on the Google Scholar profile's affiliation field, not
  // separately confirmed as an institutional record.
  department: 'Mittal School of Business',
  // v2.0 §7 "Biography — short version", used verbatim as supplied.
  shortBio:
    'Dr. Ashok Malhi is an academic researcher and Assistant Professor at Lovely Professional University, India. His work sits at the intersection of emerging technologies, business, digital transformation, and technology adoption, with research interests spanning Artificial Intelligence, Artificial Intelligence of Things (AIoT), Internet of Things, Blockchain, Digital Marketing, Data Analytics, and related technology applications. His professional journey combines academic experience with prior industry exposure in banking, management, consulting, and business development. He has taught students across MBA, BBA, and LLB programs and has contributed to academic seminars, conferences, research activities, faculty development, and university events. His research and academic interests focus on understanding how emerging technologies can be applied to business, organizations, consumer behavior, and digital transformation.',
  // No long-form About-page narrative has been supplied yet — the v2.0
  // package (§8) specifies a section *structure* for a long biography
  // (Academic Identity, Research Focus, Professional Journey, Teaching,
  // Industry Experience, Research & Publications, Academic
  // Presentations, Future Research Interests), not prose to fill it
  // with. The About page renders that structure from the underlying
  // records themselves (education/experience/presentations/research
  // interests) rather than a single invented paragraph.
  fullBio: null,
  // Previously associated with the public academic website. Flagged
  // in both the v1.0 and v2.0 source packages as provisional pending
  // explicit confirmation/replacement by the user.
  email: 'ashok.singh.malhi@gmail.com',
  scholarMetrics: {
    citations: 23,
    hIndex: 2,
    i10Index: 1,
    // Snapshot date as supplied with the v1.0 data package, not a live value.
    asOf: '2026-09-06',
    source: 'google-scholar' as const,
  },
  // v2.0 §2, "Current public professional positioning" — verbatim.
  professionalPositioning:
    'Dr. Ashok Malhi is an academic researcher and educator working at the intersection of emerging technologies, business, digital transformation, and technology adoption.',
  // v2.0 §13 "Skills / Expertise — Technical", as listed on the official website.
  technicalSkills: [
    'MS Access',
    'Oracle 8i',
    'SPSS v21',
    'SmartPLS v4.0',
    'Tableau',
    'Python',
    'SQL',
    'HTML/CSS',
    'C/C++',
    'Visual Basic',
  ],
  // v2.0 §13 "Research & Analytics", as listed on the official website.
  researchSkills: [
    'Data Analysis',
    'Statistical Modeling',
    'Qualitative Research',
    'Academic Publishing',
    'Literature Review',
    'SEM Analysis',
  ],
  // v2.0 §13 "Soft Skills", as listed on the official website.
  softSkills: [
    'Leadership',
    'Public Speaking',
    'Problem Solving',
    'Team Management',
    'Academic Writing',
    'Mentoring',
    'Project Management',
  ],
  // v2.0 §14 "Specializations" — presented as areas of focus, not
  // exclusive-expertise claims, and deliberately kept distinct from
  // the confirmed 8-domain ResearchInterest taxonomy (researchInterestsSeed
  // below), per the package's explicit instruction (§22) not to treat
  // every specialization term as a confirmed publication-level
  // research classification.
  specializations: [
    'AI in Business',
    'IoT Applications',
    'Blockchain Technology',
    'Digital Banking',
    'Innovation Management',
    'Sustainable Development',
  ],
  // v2.0 §15 "Languages" — "German (Basic)" kept as an explicit
  // proficiency qualifier rather than implying fluency.
  languages: [
    { name: 'English', proficiency: null },
    { name: 'Hindi', proficiency: null },
    { name: 'Punjabi', proficiency: null },
    { name: 'German', proficiency: 'Basic' },
  ],
};

/**
 * v2.0 §3 Education, in the reverse-chronological order the package's
 * §4 specifies for display (PhD, then PGDM, then BCA). Only degree,
 * institution, year(s), grade, and (for PhD) the explicit provenance
 * conflict are populated. No thesis title, specialization, supervisor,
 * or department is added for the PhD — the package explicitly
 * prohibits inventing those.
 */
export const educationSeed = [
  {
    degree: 'PhD',
    fieldOfStudy: null,
    institution: 'Sharda University',
    institutionCountry: 'India',
    startYear: null,
    endYear: 2024,
    grade: null,
    gradeLabel: null,
    description: null,
    // Per v2.0 §3.1: LinkedIn shows this PhD as 2019–2023, while the
    // official personal website (the higher-priority source per §24)
    // states completion in 2024, which is what's displayed above.
    // Preserved here rather than silently resolved.
    provenanceNote:
      'Completion year shown here (2024) follows the official personal website. LinkedIn lists this degree as 2019–2023. This discrepancy has not been resolved and is flagged for confirmation.',
    order: 0,
    verified: true,
  },
  {
    degree: 'PGDM',
    fieldOfStudy: 'Marketing & IT',
    institution: 'IMS Ghaziabad',
    institutionCountry: 'India',
    startYear: null,
    endYear: 2011,
    grade: '6.77',
    gradeLabel: 'CGPA',
    description: null,
    provenanceNote: null,
    order: 1,
    verified: true,
  },
  {
    degree: 'BCA',
    fieldOfStudy: null,
    institution: 'IPEM Ghaziabad',
    institutionCountry: 'India',
    startYear: null,
    endYear: 2007,
    grade: '64.46%',
    gradeLabel: 'Percentage',
    description: null,
    provenanceNote: null,
    order: 2,
    verified: true,
  },
];

/**
 * v2.0 §5 Professional Experience, in the order the package lists them
 * (current role first). The Assistant Professor / Teaching Assistant
 * date overlap is explicitly allowed by the package (§5, "IMPORTANT")
 * and is preserved with a `provenanceNote` rather than "corrected."
 * The Deputy Manager "best outperformer" note is kept as descriptive
 * text, not promoted into a formal Achievement record, per the
 * package's explicit instruction.
 */
export const experienceSeed = [
  {
    role: 'Assistant Professor',
    organization: 'Lovely Professional University',
    organizationCountry: 'India',
    type: 'academic' as const,
    startDate: '2023-08-01',
    endDate: null,
    isCurrent: true,
    description: null,
    responsibilities: [
      'Teaching and research in AI, IoT, and Blockchain',
      "Guiding PhD and Master's-level students",
      'Contributing to faculty development programs',
    ],
    provenanceNote:
      'This role’s start date (August 2023) overlaps with the Teaching Assistant role at Sharda University (September 2019 – December 2024) below, exactly as both are publicly published. This overlap has not been independently explained and is not treated as an error in either record.',
    order: 0,
    verified: true,
  },
  {
    role: 'Teaching Assistant',
    organization: 'Sharda University',
    organizationCountry: 'India',
    type: 'academic' as const,
    startDate: '2019-09-01',
    endDate: '2024-12-01',
    isCurrent: false,
    description: null,
    responsibilities: [
      'Managing seminars',
      'Managing conferences',
      'Managing PhD research club',
      'Teaching MBA/BBA/LLB students',
      'Teaching in online, offline, and hybrid formats',
      'Conducting examinations',
      'Academic evaluations',
      'Managing university events',
      'Managing publications',
    ],
    provenanceNote:
      'This role’s end date (December 2024) overlaps with the Assistant Professor role at Lovely Professional University (August 2023 – present) above, exactly as both are publicly published. This overlap has not been independently explained and is not treated as an error in either record.',
    order: 1,
    verified: true,
  },
  {
    role: 'Deputy Manager',
    organization: 'HDFC Bank Ltd',
    organizationCountry: 'India',
    type: 'professional' as const,
    startDate: '2015-08-01',
    endDate: '2018-07-01',
    isCurrent: false,
    // "Best outperformer in 2015 recruitment batch" is kept as
    // descriptive text per the package's explicit instruction not to
    // convert it into a formal Achievement record without a
    // certificate/official record.
    description: 'Publicly stated achievement: best outperformer in 2015 recruitment batch.',
    responsibilities: [
      'Managed team of associates and network partners',
      'Generated business volume from existing clients',
      'Created brand awareness',
      'Cross-sold banking products',
    ],
    provenanceNote: null,
    order: 2,
    verified: true,
  },
  {
    role: 'Assistant Manager',
    organization: 'Earth Infra Pvt. Ltd.',
    organizationCountry: 'India',
    type: 'professional' as const,
    startDate: '2013-07-01',
    endDate: '2015-07-01',
    isCurrent: false,
    description: null,
    responsibilities: [
      'Team management',
      'Client relationship building',
      'Business development',
      'Brand awareness',
      'Business-volume generation from existing clients',
    ],
    provenanceNote: null,
    order: 3,
    verified: true,
  },
  {
    role: 'Professional Consultant (Freelance)',
    organization: 'Self-employed',
    organizationCountry: 'India',
    type: 'other' as const,
    startDate: '2013-07-01',
    endDate: '2019-08-01',
    isCurrent: false,
    // The package explicitly withholds client/project names, revenue,
    // and achievements for this role — none are invented here.
    description:
      'Freelance professional consulting. Specific clients, projects, and outcomes are not currently supplied as verified data.',
    responsibilities: [],
    provenanceNote: null,
    order: 4,
    verified: true,
  },
];

/**
 * Research/technology domains as explicitly listed across the brief,
 * the v1.0 package, and reconfirmed unchanged by the v2.0 package's
 * §22. This is the confirmed 8-domain taxonomy only — do not add the
 * broader specialization/focus terms from personSeed.specializations
 * (Machine Learning, Cloud Computing, Digital Banking, Innovation
 * Management, Sustainable Development, AI in Business, IoT
 * Applications) here; the package explicitly distinguishes them (§22).
 */
export const researchInterestsSeed = [
  { name: 'Artificial Intelligence', order: 0 },
  { name: 'Artificial Intelligence of Things (AIoT)', order: 1 },
  { name: 'Internet of Things', order: 2 },
  { name: 'Blockchain', order: 3 },
  { name: 'Data Analytics', order: 4 },
  { name: 'Digital Transformation', order: 5 },
  { name: 'Digital Marketing', order: 6 },
  { name: 'Technology Adoption', order: 7 },
];

/**
 * The 10 confirmed Google Scholar publications. Only title, year, and
 * (where explicitly supplied) a citation snapshot are populated.
 * publicationType/journal/conference/doi/etc. are intentionally left
 * null pending verified bibliographic detail. Unchanged by the v2.0
 * package, which explicitly states (§26) that publication pages remain
 * based on this previously-supplied 10-publication dataset.
 *
 * `researchAreas` was NOT supplied by the user for any publication —
 * both the original brief and the v1.0/v2.0 data packages explicitly
 * list "research area" as a future/not-yet-supplied publication field
 * (v2.0 §23 reiterates: existing inferred tags must remain marked
 * 'inferred-from-title' and never be converted to confirmed metadata
 * without an explicit future confirmation). The tags below are an
 * editorial reading of each title against the 8 confirmed research
 * interests, included only because they make the Research-page
 * "related publications" links and the Publications-page filter
 * functional. Every non-empty array here is marked
 * `researchAreasSource: 'inferred-from-title'`, and the frontend
 * always renders an explicit "inferred from title" qualifier next to
 * these tags so they are never mistaken for confirmed bibliographic
 * metadata.
 */
export const publicationsSeed = [
  {
    title:
      'A Study on Responsible AI Awareness and Learning Engagement in Higher Education: The Mediating Roles of Trust in AI, AI Literacy, AI Usage Self-Efficacy, and Human–AI Collaboration',
    year: 2026,
    citationCount: null,
    researchAreas: ['Artificial Intelligence'],
    researchAreasSource: 'inferred-from-title' as const,
  },
  {
    title: 'Green by Design AI in Fashion Retail and the Rise of the Conscious Consumer',
    year: 2026,
    citationCount: null,
    researchAreas: ['Artificial Intelligence'],
    researchAreasSource: 'inferred-from-title' as const,
  },
  {
    title:
      'Exploring Narrative Constructions of Market Sentiment: A Systematic Literature Review of Media Influence on Financial Behaviors and Economic Outcomes',
    year: 2026,
    citationCount: null,
    researchAreas: [],
    researchAreasSource: null,
  },
  {
    title:
      'Game On: Cutting Edge Gamification Techniques to Boost Service Quality and Maximize Ecosystem Engagement',
    year: 2026,
    citationCount: null,
    researchAreas: [],
    researchAreasSource: null,
  },
  {
    title:
      "A Study on Digital Intelligence and Influencer Marketing for Sustainable Diversification of India's Retail Economy: A Qualitative Study",
    year: 2025,
    citationCount: 12,
    researchAreas: ['Digital Marketing'],
    researchAreasSource: 'inferred-from-title' as const,
  },
  {
    title:
      'Artificial Intelligence of Things (AIoT)-Enabled Personalized Banking: Investigating Intention to Adopt',
    year: 2024,
    citationCount: 2,
    researchAreas: ['Artificial Intelligence of Things (AIoT)', 'Technology Adoption'],
    researchAreasSource: 'inferred-from-title' as const,
  },
  {
    title: 'Assessing the Role of Digital Awareness in Promoting Polymer-Based Sustainability',
    year: 2024,
    citationCount: 5,
    researchAreas: ['Digital Transformation'],
    researchAreasSource: 'inferred-from-title' as const,
  },
  {
    title:
      'Wearable Technologies for Health: Investigating Behavioral Intention to Adopt Cloud-Based Smartwatch',
    year: 2022,
    citationCount: 1,
    researchAreas: ['Technology Adoption', 'Internet of Things'],
    researchAreasSource: 'inferred-from-title' as const,
  },
  {
    title:
      'What Drives Adoption of Cloud-Based Online Games in an Emerging Market? An Investigation Using Flow Theory',
    year: 2022,
    citationCount: 2,
    researchAreas: ['Technology Adoption'],
    researchAreasSource: 'inferred-from-title' as const,
  },
  {
    title: 'Machine intelligence versus terrorism',
    year: 2021,
    citationCount: 1,
    researchAreas: ['Artificial Intelligence'],
    researchAreasSource: 'inferred-from-title' as const,
  },
];

/**
 * v2.0 §10, the six presentation/conference records currently listed
 * on the official personal website. No slides/certificates/video/DOI/
 * keynote-status/awards are added, per the package's explicit
 * prohibition (§11). `dateDisplay` preserves the published date range
 * verbatim; `date` is left null where only a range (not a single day)
 * is verified. `scope` carries "International" as publicly stated —
 * not a claim of keynote or award status.
 */
export const presentationsSeed = [
  {
    title:
      "Why Indian Should Adopt Japan's Garbage Disposal System for A Longer Run to Achieve 12th Goal of the Sustainable Development Plan",
    event: '6th International Conference CSR & Sustainable Development',
    organization: 'Sharda University',
    dateDisplay: '10–11 October 2019',
    date: null,
    location: 'Delhi, India',
    type: 'conference-talk' as const,
    scope: 'International',
    description: null,
    slidesUrl: null,
    certificateUrl: null,
    videoUrl: null,
    verified: true,
  },
  {
    title:
      'Artificial Intelligence (AI) Enabled Organization Has Competitive Advantages In Cutthroat Environment (Red Ocean)',
    event:
      'International Conference on Volatility, Uncertainty, Complexity, and Ambiguity in Business (IC-VUCA 2019)',
    organization: 'MIET',
    dateDisplay: '23–24 November 2019',
    date: null,
    location: 'Meerut, India',
    type: 'conference-talk' as const,
    scope: 'International',
    description: null,
    slidesUrl: null,
    certificateUrl: null,
    videoUrl: null,
    verified: true,
  },
  {
    title: 'Recent Research Trends in AI and IoT',
    event: 'International Conference on Computing, Communication & Intelligent System (ICCCIS-2021)',
    organization: 'Sharda University',
    dateDisplay: '19–20 February 2021',
    date: null,
    location: 'Greater Noida, India',
    type: 'conference-talk' as const,
    scope: 'International',
    description: null,
    slidesUrl: null,
    certificateUrl: null,
    videoUrl: null,
    verified: true,
  },
  {
    title: 'A Study on Adoption of Cloud of things by Small and Medium Enterprises',
    event: '2nd Research Clinic and Doctoral Consortium',
    organization: "FIIB, New Delhi & Taylor's University, Malaysia",
    dateDisplay: '7 August 2021',
    date: '2021-08-07',
    location: null,
    type: 'conference-talk' as const,
    scope: 'International',
    description: null,
    slidesUrl: null,
    certificateUrl: null,
    videoUrl: null,
    verified: true,
  },
  {
    title: 'Using Multi-Theory Model to Investigate Behavioral Intention to Use Cloud-Enabled Games',
    event: 'International Conference on Digital Marketing Experiences (DIGMAR 2021)',
    organization: 'Jain (Deemed to be) University',
    dateDisplay: '27–29 October 2021',
    date: null,
    location: 'Bangalore, India',
    type: 'conference-talk' as const,
    scope: 'International',
    description: null,
    slidesUrl: null,
    certificateUrl: null,
    videoUrl: null,
    verified: true,
  },
  {
    title: 'What Drives Adoption of Cloud-based Online Games in an Emerging Market? An Investigation Using Flow Theory',
    event: 'Machine Intelligence and Data Science Applications (MIDAS-2021)',
    organization: 'Comilla University',
    dateDisplay: '26–27 December 2021',
    date: null,
    location: 'Cumilla, Bangladesh',
    type: 'conference-talk' as const,
    scope: 'International',
    description: null,
    slidesUrl: null,
    certificateUrl: null,
    videoUrl: null,
    verified: true,
  },
];

/**
 * v2.0 §12, the eight professional certifications currently listed on
 * the official personal website, modeled as `type: 'certification'`
 * Achievement records (the existing Achievement schema already
 * supports this type — no new model was needed). No credential IDs,
 * certificate URLs, scores, or grades are added, per the package's
 * explicit prohibition (§12).
 */
export const achievementsSeed = [
  {
    title: 'IITK Blockchain Certificate Program',
    type: 'certification' as const,
    issuer: null,
    date: '2025-06-01',
    description: null,
    url: null,
    order: 0,
    verified: true,
  },
  {
    title: 'Core Java Foundations',
    type: 'certification' as const,
    issuer: null,
    date: '2025-04-01',
    description: null,
    url: null,
    order: 1,
    verified: true,
  },
  {
    title: 'Linux Training',
    type: 'certification' as const,
    issuer: null,
    date: '2025-04-01',
    description: null,
    url: null,
    order: 2,
    verified: true,
  },
  {
    title: 'Fundamentals of Blockchain',
    type: 'certification' as const,
    issuer: null,
    date: '2025-04-01',
    description: null,
    url: null,
    order: 3,
    verified: true,
  },
  {
    title: 'UGC NET Qualified',
    type: 'certification' as const,
    issuer: null,
    date: '2018-12-01',
    description: null,
    url: null,
    order: 4,
    verified: true,
  },
  {
    title: 'NISM VA Certification',
    type: 'certification' as const,
    issuer: null,
    date: '2017-06-01',
    description: null,
    url: null,
    order: 5,
    verified: true,
  },
  {
    title: 'NISM VI Certification',
    type: 'certification' as const,
    issuer: null,
    date: '2016-01-01',
    description: null,
    url: null,
    order: 6,
    verified: true,
  },
  {
    title: 'IRDA Certification',
    type: 'certification' as const,
    issuer: null,
    date: '2015-09-01',
    description: null,
    url: null,
    order: 7,
    verified: true,
  },
];

/**
 * Academic / professional / social identifiers as explicitly supplied.
 */
export const academicProfilesSeed = [
  {
    network: 'orcid' as const,
    category: 'academic' as const,
    label: 'ORCID',
    url: 'https://orcid.org/0000-0001-9756-5865',
    identifier: '0000-0001-9756-5865',
    order: 0,
  },
  {
    network: 'scopus' as const,
    category: 'academic' as const,
    label: 'Scopus',
    url: 'https://www.scopus.com/authid/detail.uri?authorId=57833141600',
    identifier: '57833141600',
    order: 1,
  },
  {
    network: 'google-scholar' as const,
    category: 'academic' as const,
    label: 'Google Scholar',
    url: 'https://scholar.google.com/citations?user=Uf8bU5sAAAAJ',
    identifier: 'Uf8bU5sAAAAJ',
    order: 2,
  },
  {
    network: 'researchgate' as const,
    category: 'academic' as const,
    label: 'ResearchGate',
    url: 'https://www.researchgate.net/profile/Ashok-Malhi',
    identifier: null,
    order: 3,
  },
  {
    network: 'linkedin' as const,
    category: 'professional' as const,
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/ashok-malhi/',
    identifier: null,
    order: 4,
  },
  {
    network: 'website' as const,
    category: 'professional' as const,
    label: 'Official Website',
    url: 'https://ashokmalhi.pro/',
    identifier: null,
    order: 5,
  },
  {
    network: 'facebook' as const,
    category: 'social' as const,
    label: 'Facebook',
    url: 'https://www.facebook.com/official.ashok.malhi',
    identifier: null,
    order: 6,
  },
  {
    network: 'instagram' as const,
    category: 'social' as const,
    label: 'Instagram',
    url: 'https://www.instagram.com/dr.ashok_malhi/',
    identifier: null,
    order: 7,
  },
  {
    network: 'youtube' as const,
    category: 'social' as const,
    label: 'YouTube',
    url: 'https://www.youtube.com/@Dr_ashok_malhi',
    identifier: null,
    order: 8,
  },
];

export const contactInformationSeed = {
  // Previously associated with the public academic website. Supplied
  // as provisional — both source data packages explicitly ask that the
  // system stay flexible so this can be confirmed or replaced later
  // rather than treated as final.
  professionalEmail: 'ashok.singh.malhi@gmail.com',
  // Intentionally left null here (not "Mittal School of Business").
  // That value is a Google Scholar profile field, not a confirmed
  // contact-routing department, and ContactInformation is meant to
  // carry only confirmed institutional contact details. The
  // Scholar-sourced affiliation string is shown, correctly labeled as
  // such, on the About page via Person.department instead — see
  // AboutPage.tsx ("Department (per Google Scholar)"). The v2.0
  // package (§20) explicitly reconfirms this exact treatment.
  department: null,
  institution: 'Lovely Professional University',
  officeLocation: null,
  officeHours: null,
};
