import { Schema, model, type InferSchemaType } from 'mongoose';

/**
 * AdminUser backs the future content-management authentication.
 * Passwords are stored as bcrypt hashes only; never plaintext.
 */
const adminUserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ['admin', 'editor'], default: 'admin' },
    lastLoginAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export type AdminUserDocument = InferSchemaType<typeof adminUserSchema>;
export const AdminUser = model('AdminUser', adminUserSchema);
