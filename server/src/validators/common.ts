import { z } from 'zod';

export const objectIdParam = z.object({
  id: z.string().regex(/^[a-f\d]{24}$/i, 'Invalid id format'),
});

export const slugParam = z.object({
  slug: z.string().min(1).max(300),
});

export const paginationQuery = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(50),
});

export const publicationQuery = paginationQuery.extend({
  year: z.coerce.number().int().min(1900).max(2100).optional(),
  researchArea: z.string().min(1).max(200).optional(),
  q: z.string().min(1).max(200).optional(),
  sort: z.enum(['year-desc', 'year-asc']).default('year-desc'),
});

export const contactSubmissionSchema = z.object({
  name: z.string().trim().min(2, 'Name is too short').max(200),
  email: z.string().trim().email('Invalid email address').max(254),
  subject: z.string().trim().min(3, 'Subject is too short').max(300),
  message: z.string().trim().min(10, 'Message is too short').max(5000),
  // Honeypot: real users never fill this hidden field.
  website: z.string().max(0, 'Spam detected').optional().default(''),
});

export const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8).max(200),
});
