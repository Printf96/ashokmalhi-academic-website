import { Schema, model, type InferSchemaType } from 'mongoose';
import slugify from 'slugify';

/**
 * Publication is deliberately permissive on optional bibliographic fields
 * (journal, DOI, volume, etc.) because verified Google Scholar data
 * currently only supplies title, year, and (for some entries) a citation
 * snapshot. Do not populate these fields with guessed values.
 */
const publicationSchema = new Schema(
  {
    slug: { type: String, unique: true, index: true },
    title: { type: String, required: true, trim: true },
    authors: { type: [String], default: null },
    year: { type: Number, required: true, index: true },
    publicationType: {
      type: String,
      enum: ['journal-article', 'conference-paper', 'book-chapter', 'preprint', 'other', null],
      default: null,
    },
    journal: { type: String, default: null, trim: true },
    conference: { type: String, default: null, trim: true },
    publisher: { type: String, default: null, trim: true },
    volume: { type: String, default: null, trim: true },
    issue: { type: String, default: null, trim: true },
    pages: { type: String, default: null, trim: true },
    doi: { type: String, default: null, trim: true },
    url: { type: String, default: null, trim: true },
    abstract: { type: String, default: null },
    keywords: { type: [String], default: [] },
    researchAreas: { type: [String], default: [] },
    /**
     * Provenance of `researchAreas`: 'confirmed' when supplied directly
     * or sourced from the venue's own classification, 'inferred-from-title'
     * when editorially inferred from the title/abstract because no
     * verified classification exists yet. Never omit this when
     * researchAreas is non-empty — the frontend uses it to decide
     * whether to show an "inferred" qualifier.
     */
    researchAreasSource: {
      type: String,
      enum: ['confirmed', 'inferred-from-title', null],
      default: null,
    },
    citationCount: { type: Number, default: null },
    citationCountSource: {
      type: String,
      enum: ['google-scholar', 'scopus', 'manual', null],
      default: null,
    },
    citationCountUpdatedAt: { type: Date, default: null },
    indexing: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
    /** True once cross-checked against the verified Google Scholar snapshot. */
    verified: { type: Boolean, default: true },
  },
  { timestamps: true }
);

publicationSchema.index({ title: 'text', abstract: 'text', keywords: 'text' });

publicationSchema.pre('validate', function preValidate(next) {
  if (this.title && !this.slug) {
    const base = slugify(`${this.title}-${this.year ?? ''}`, { lower: true, strict: true });
    this.slug = base;
  }
  next();
});

export type PublicationDocument = InferSchemaType<typeof publicationSchema>;
export const Publication = model('Publication', publicationSchema);
