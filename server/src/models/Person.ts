import { Schema, model, type InferSchemaType } from 'mongoose';

/**
 * Person is a singleton collection (exactly one document expected) holding
 * the core identity fields for Dr. Ashok Malhi. Content fields default to
 * null rather than fabricated text; the seed script only writes fields
 * that have been explicitly verified.
 */
const personSchema = new Schema(
  {
    displayName: {
      type: String,
      required: true,
      trim: true,
      default: 'Dr. Ashok Malhi',
    },
    authorName: {
      type: String,
      required: true,
      trim: true,
      default: 'Ashok Malhi',
    },
    authorNameVariant: {
      type: String,
      trim: true,
      default: 'Ashok Singh Malhi',
    },
    professionalTitle: {
      type: String,
      required: true,
      trim: true,
      default: 'Assistant Professor',
    },
    affiliation: {
      type: String,
      required: true,
      trim: true,
      default: 'Lovely Professional University',
    },
    affiliationCountry: {
      type: String,
      trim: true,
      default: 'India',
    },
    /**
     * Department/school as shown on an external academic profile (e.g.
     * Google Scholar's affiliation field), not independently confirmed
     * as an institutional record unless separately verified.
     */
    department: { type: String, default: null, trim: true },
    shortBio: { type: String, default: null },
    fullBio: { type: String, default: null },
    email: { type: String, default: null, trim: true, lowercase: true },
    profileImage: { type: Schema.Types.ObjectId, ref: 'MediaAsset', default: null },
    /**
     * Point-in-time Google Scholar metrics snapshot. Never treated as
     * live — the frontend always labels this as a snapshot with its
     * capture date, never as a currently-updating counter.
     */
    scholarMetrics: {
      type: new Schema(
        {
          citations: { type: Number, default: null },
          hIndex: { type: Number, default: null },
          i10Index: { type: Number, default: null },
          asOf: { type: Date, default: null },
          source: { type: String, enum: ['google-scholar'], default: 'google-scholar' },
        },
        { _id: false }
      ),
      default: null,
    },
    /**
     * Short editorial description of current professional positioning,
     * distinct from shortBio/fullBio (a personally-written biography).
     */
    professionalPositioning: { type: String, default: null },
    technicalSkills: { type: [String], default: [] },
    researchSkills: { type: [String], default: [] },
    softSkills: { type: [String], default: [] },
    /**
     * Broader focus/specialization terms distinct from the confirmed
     * ResearchInterest taxonomy — presented as areas of focus, not
     * exclusive-expertise claims.
     */
    specializations: { type: [String], default: [] },
    languages: {
      type: [
        new Schema(
          { name: { type: String, required: true }, proficiency: { type: String, default: null } },
          { _id: false }
        ),
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export type PersonDocument = InferSchemaType<typeof personSchema>;
export const Person = model('Person', personSchema);
