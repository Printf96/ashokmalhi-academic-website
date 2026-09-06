import { Schema, model, type InferSchemaType } from 'mongoose';

const achievementSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ['award', 'recognition', 'certification', 'milestone', 'invited-talk', 'other'],
      default: 'other',
    },
    issuer: { type: String, default: null, trim: true },
    date: { type: Date, default: null },
    description: { type: String, default: null },
    url: { type: String, default: null },
    order: { type: Number, default: 0, index: true },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export type AchievementDocument = InferSchemaType<typeof achievementSchema>;
export const Achievement = model('Achievement', achievementSchema);
