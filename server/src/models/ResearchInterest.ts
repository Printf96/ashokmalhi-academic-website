import { Schema, model, type InferSchemaType } from 'mongoose';
import slugify from 'slugify';

const researchInterestSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    slug: { type: String, unique: true, index: true },
    description: { type: String, default: null },
    order: { type: Number, default: 0, index: true },
  },
  { timestamps: true }
);

researchInterestSchema.pre('validate', function preValidate(next) {
  if (this.name && !this.slug) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

export type ResearchInterestDocument = InferSchemaType<typeof researchInterestSchema>;
export const ResearchInterest = model('ResearchInterest', researchInterestSchema);
