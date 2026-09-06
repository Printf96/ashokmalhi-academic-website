import { Schema, model, type InferSchemaType } from 'mongoose';

const educationSchema = new Schema(
  {
    degree: { type: String, default: null, trim: true },
    fieldOfStudy: { type: String, default: null, trim: true },
    institution: { type: String, default: null, trim: true },
    institutionCountry: { type: String, default: null, trim: true },
    startYear: { type: Number, default: null },
    endYear: { type: Number, default: null },
    grade: { type: String, default: null, trim: true },
    gradeLabel: { type: String, default: null, trim: true },
    description: { type: String, default: null },
    /**
     * Set only when two verified sources disagree on a fact for this
     * record and the discrepancy has not been resolved (e.g. LinkedIn
     * vs. the official personal website disagreeing on a completion
     * year). Never silently reconciled — surfaced verbatim in the UI.
     */
    provenanceNote: { type: String, default: null },
    order: { type: Number, default: 0, index: true },
    /** True only once this record has been confirmed against a verified source. */
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export type EducationDocument = InferSchemaType<typeof educationSchema>;
export const Education = model('Education', educationSchema);
