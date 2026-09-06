import { Schema, model, type InferSchemaType } from 'mongoose';

/**
 * MediaAsset stores metadata about images/files used across the site
 * (currently: the profile photograph). The actual binary files are
 * served as static assets; this model tracks slugs, alt text, and
 * which processed variants exist, so the frontend never needs to
 * hardcode image paths or guess whether a variant is available.
 */
const mediaAssetSchema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    kind: {
      type: String,
      enum: ['profile-photo', 'document', 'other'],
      default: 'other',
    },
    altText: {
      type: String,
      required: true,
      trim: true,
    },
    /** Relative or absolute URL to the primary web-ready asset. Null until uploaded. */
    url: { type: String, default: null },
    variants: {
      original: { type: String, default: null },
      /** Retina/2x web-ready black-and-white variant (440px). */
      webBw: { type: String, default: null },
      /** 1x web-ready black-and-white variant (220px), for srcSet. */
      webBw1x: { type: String, default: null },
      thumbnail: { type: String, default: null },
    },
    mimeType: { type: String, default: null },
    width: { type: Number, default: null },
    height: { type: Number, default: null },
    isPlaceholder: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export type MediaAssetDocument = InferSchemaType<typeof mediaAssetSchema>;
export const MediaAsset = model('MediaAsset', mediaAssetSchema);
