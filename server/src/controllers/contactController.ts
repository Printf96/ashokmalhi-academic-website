import crypto from 'node:crypto';
import type { Request, Response } from 'express';
import { ContactSubmission } from '../models/ContactSubmission.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';

function hashIp(ip: string | undefined): string | null {
  if (!ip) return null;
  return crypto.createHash('sha256').update(ip).digest('hex');
}

export const submitContactForm = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, subject, message, website } = req.body as {
    name: string;
    email: string;
    subject: string;
    message: string;
    website?: string;
  };

  // Honeypot check: bots fill hidden fields, real users leave them blank.
  if (website && website.length > 0) {
    throw ApiError.badRequest('Submission rejected');
  }

  await ContactSubmission.create({
    name,
    email,
    subject,
    message,
    ipHash: hashIp(req.ip),
    userAgent: req.get('user-agent') ?? null,
  });

  res.status(201).json({
    data: {
      message: 'Thank you for reaching out. Your message has been received.',
    },
  });
});
