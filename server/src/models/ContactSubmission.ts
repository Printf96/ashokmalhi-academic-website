import { Schema, model, type InferSchemaType } from 'mongoose';

/** Stores contact form submissions server-side for admin review. */
const contactSubmissionSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 200 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
    subject: { type: String, required: true, trim: true, maxlength: 300 },
    message: { type: String, required: true, trim: true, maxlength: 5000 },
    ipHash: { type: String, default: null },
    userAgent: { type: String, default: null },
    status: {
      type: String,
      enum: ['new', 'read', 'archived'],
      default: 'new',
    },
  },
  { timestamps: true }
);

export type ContactSubmissionDocument = InferSchemaType<typeof contactSubmissionSchema>;
export const ContactSubmission = model('ContactSubmission', contactSubmissionSchema);
