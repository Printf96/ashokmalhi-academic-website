import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';

export interface AuthenticatedRequest extends Request {
  admin?: { id: string; email: string; role: string };
}

/**
 * Protects future admin/content-management routes. Expects
 * `Authorization: Bearer <token>`. Not currently wired to any public
 * route — reserved for the future CMS API described in the docs.
 */
export function requireAuth(req: AuthenticatedRequest, _res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    next(ApiError.unauthorized('Missing or malformed Authorization header'));
    return;
  }

  const token = header.slice('Bearer '.length);
  try {
    const payload = jwt.verify(token, env.jwtSecret) as {
      sub: string;
      email: string;
      role: string;
    };
    req.admin = { id: payload.sub, email: payload.email, role: payload.role };
    next();
  } catch {
    next(ApiError.unauthorized('Invalid or expired token'));
  }
}
