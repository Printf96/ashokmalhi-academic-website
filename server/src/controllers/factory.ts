import type { Model } from 'mongoose';
import type { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { toJSON, toJSONList } from '../utils/serialize.js';
import { ApiError } from '../utils/ApiError.js';

interface ListControllerOptions {
  sort?: Record<string, 1 | -1>;
  resourceName?: string;
}

/**
 * Generic "list all" read-only controller for reference-data resources
 * (Education, Experience, ResearchInterest, Achievement, AcademicProfile,
 * ContactInformation). These are simple ordered collections without
 * pagination/filtering needs.
 */
export function listController<T>(model: Model<T>, options: ListControllerOptions = {}) {
  const sort = options.sort ?? { order: 1, createdAt: 1 };
  return asyncHandler(async (_req: Request, res: Response) => {
    const docs = await model.find().sort(sort).lean();
    res.json({ data: toJSONList(docs as any), count: docs.length });
  });
}

/**
 * Generic "get singleton" controller for Person / ContactInformation.
 * `populate` optionally names a ref field to resolve (e.g. Person's
 * `profileImage` -> MediaAsset) so the API returns the full referenced
 * document instead of a bare ObjectId.
 */
export function singletonController<T>(
  model: Model<T>,
  resourceName: string,
  options: { populate?: string } = {}
) {
  return asyncHandler(async (_req: Request, res: Response) => {
    let query = model.findOne().sort({ createdAt: 1 });
    if (options.populate) {
      query = query.populate(options.populate) as typeof query;
    }
    const doc = await query.lean();
    if (!doc) {
      throw ApiError.notFound(resourceName);
    }
    res.json({ data: toJSON(doc as any) });
  });
}
