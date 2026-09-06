import { Schema, model, type InferSchemaType } from 'mongoose';

const experienceSchema = new Schema(
  {
    role: { type: String, required: true, trim: true },
    organization: { type: String, required: true, trim: true },
    organizationCountry: { type: String, default: null, trim: true },
    type: {
      type: String,
      enum: ['academic', 'research', 'administrative', 'professional', 'other'],
      default: 'academic',
    },
    startDate: { type: Date, default: null },
    endDate: { type: Date, default: null },
    isCurrent: { type: Boolean, default: false },
    description: { type: String, default: null },
    responsibilities: { type: [String], default: [] },
    /**
     * Set when this record's dates overlap another verified record and
     * the overlap has not been independently explained (e.g. concurrent
     * academic + transitional roles as publicly published). Both
     * overlapping records are kept and flagged rather than "corrected."
     */
    provenanceNote: { type: String, default: null },
    order: { type: Number, default: 0, index: true },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export type ExperienceDocument = InferSchemaType<typeof experienceSchema>;
export const Experience = model('Experience', experienceSchema);
