import type { Request, Response } from 'express';
import { Presentation } from '../models/Presentation.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { toJSON, toJSONList } from '../utils/serialize.js';
import { ApiError } from '../utils/ApiError.js';

export const listPresentations = asyncHandler(async (_req: Request, res: Response) => {
  // Sort by `date` first (when a single verified day is known), then
  // fall back to insertion order (`createdAt`). Most current records
  // only have a verified date *range* (`dateDisplay`) rather than a
  // single day, so `date` is null for them — sorting by `date` alone
  // would scatter those records arbitrarily instead of preserving the
  // reverse-chronological order they were seeded in.
  const docs = await Presentation.find().sort({ date: -1, createdAt: -1 }).lean();
  res.json({ data: toJSONList(docs as any), count: docs.length });
});

export const getPresentationBySlug = asyncHandler(async (req: Request, res: Response) => {
  const { slug } = req.params as { slug: string };
  const doc = await Presentation.findOne({ slug }).lean();
  if (!doc) throw ApiError.notFound('Presentation');
  res.json({ data: toJSON(doc as any) });
});
