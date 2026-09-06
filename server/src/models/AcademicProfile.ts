import { Schema, model, type InferSchemaType } from 'mongoose';

const academicProfileSchema = new Schema(
  {
    network: {
      type: String,
      enum: [
        'orcid',
        'scopus',
        'google-scholar',
        'researchgate',
        'linkedin',
        'facebook',
        'instagram',
        'youtube',
        'website',
        'other',
      ],
      required: true,
      unique: true,
    },
    category: {
      type: String,
      enum: ['academic', 'professional', 'social'],
      required: true,
    },
    label: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true },
    identifier: { type: String, default: null, trim: true },
    order: { type: Number, default: 0, index: true },
  },
  { timestamps: true }
);

export type AcademicProfileDocument = InferSchemaType<typeof academicProfileSchema>;
export const AcademicProfile = model('AcademicProfile', academicProfileSchema);
