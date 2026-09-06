import { Schema, model, type InferSchemaType } from 'mongoose';

/** Singleton collection for the public-facing contact details. */
const contactInformationSchema = new Schema(
  {
    professionalEmail: { type: String, default: null, trim: true, lowercase: true },
    department: { type: String, default: null, trim: true },
    institution: { type: String, default: null, trim: true },
    officeLocation: { type: String, default: null, trim: true },
    officeHours: { type: String, default: null, trim: true },
  },
  { timestamps: true }
);

export type ContactInformationDocument = InferSchemaType<typeof contactInformationSchema>;
export const ContactInformation = model('ContactInformation', contactInformationSchema);
