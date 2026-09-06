import type { Document, Types } from 'mongoose';

/**
 * Converts a Mongoose document (or plain lean object) into a JSON-safe
 * plain object with `_id` as a string. Keeps API responses consistent
 * regardless of whether `.lean()` was used upstream.
 */
export function toJSON<T extends Document | Record<string, unknown>>(doc: T) {
  const obj: any = typeof (doc as any).toObject === 'function' ? (doc as any).toObject() : doc;
  if (obj._id) obj._id = String(obj._id as Types.ObjectId);
  return obj;
}

export function toJSONList<T extends Document | Record<string, unknown>>(docs: T[]) {
  return docs.map((d) => toJSON(d));
}
