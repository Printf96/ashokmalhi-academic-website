import { Schema, model, type InferSchemaType } from 'mongoose';
import slugify from 'slugify';

const presentationSchema = new Schema(
  {
    slug: { type: String, unique: true, index: true },
    title: { type: String, required: true, trim: true },
    event: { type: String, default: null, trim: true },
    organization: { type: String, default: null, trim: true },
    /**
     * Free-text date range as published (e.g. "10–11 October 2019").
     * `date` below stays null when only a range, not a single day, is
     * verified — never collapsed into a guessed single date.
     */
    dateDisplay: { type: String, default: null, trim: true },
    date: { type: Date, default: null },
    location: { type: String, default: null, trim: true },
    type: {
      type: String,
      enum: ['conference-talk', 'invited-talk', 'workshop', 'poster', 'panel', 'other', null],
      default: null,
    },
    /** e.g. "International" — scope/level as publicly stated, not a keynote/award claim. */
    scope: { type: String, default: null, trim: true },
    description: { type: String, default: null },
    slidesUrl: { type: String, default: null },
    certificateUrl: { type: String, default: null },
    videoUrl: { type: String, default: null },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

presentationSchema.pre('validate', function preValidate(next) {
  if (this.title && !this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

export type PresentationDocument = InferSchemaType<typeof presentationSchema>;
export const Presentation = model('Presentation', presentationSchema);
