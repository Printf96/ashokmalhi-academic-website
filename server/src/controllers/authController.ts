import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AdminUser } from '../models/AdminUser.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { env } from '../config/env.js';

/**
 * Admin login for the future content-management API. Not linked from any
 * public UI yet; reserved for when an admin panel is built on top of the
 * protected CRUD routes.
 */
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body as { email: string; password: string };

  const admin = await AdminUser.findOne({ email }).select('+passwordHash');
  if (!admin) {
    throw ApiError.unauthorized('Invalid credentials');
  }

  const isValid = await bcrypt.compare(password, admin.passwordHash);
  if (!isValid) {
    throw ApiError.unauthorized('Invalid credentials');
  }

  admin.lastLoginAt = new Date();
  await admin.save();

  const token = jwt.sign(
    { sub: String(admin._id), email: admin.email, role: admin.role },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn } as jwt.SignOptions
  );

  res.json({ data: { token, expiresIn: env.jwtExpiresIn } });
});
