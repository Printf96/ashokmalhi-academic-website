import type { Request, Response } from 'express';
import { FilterQuery } from 'mongoose';
import { Publication } from '../models/Publication.js';
import type { PublicationDocument } from '../models/Publication.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { toJSON, toJSONList } from '../utils/serialize.js';
import { ApiError } from '../utils/ApiError.js';

export const listPublications = asyncHandler(async (req: Request, res: Response) => {
  const { page, limit, year, researchArea, q, sort } = req.query as unknown as {
    page: number;
    limit: number;
    year?: number;
    researchArea?: string;
    q?: string;
    sort: 'year-desc' | 'year-asc';
  };

  const filter: FilterQuery<PublicationDocument> = {};
  if (year) filter.year = year;
  if (researchArea) filter.researchAreas = researchArea;
  if (q) filter.$text = { $search: q };

  const sortSpec: Record<string, 1 | -1> =
    sort === 'year-asc' ? { year: 1, title: 1 } : { year: -1, title: 1 };

  const [docs, count, years, researchAreas] = await Promise.all([
    Publication.find(filter)
      .sort(sortSpec)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Publication.countDocuments(filter),
    Publication.distinct('year'),
    Publication.distinct('researchAreas'),
  ]);

  res.json({
    data: toJSONList(docs as any),
    count,
    meta: {
      page,
      limit,
      totalPages: Math.max(1, Math.ceil(count / limit)),
      availableYears: (years as number[]).sort((a, b) => b - a),
      availableResearchAreas: (researchAreas as string[]).sort(),
    },
  });
});

export const getPublicationBySlug = asyncHandler(async (req: Request, res: Response) => {
  const { slug } = req.params as { slug: string };
  const doc = await Publication.findOne({ slug }).lean();
  if (!doc) throw ApiError.notFound('Publication');
  res.json({ data: toJSON(doc as any) });
});
