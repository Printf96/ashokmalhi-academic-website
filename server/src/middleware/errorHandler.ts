import type { NextFunction, Request, Response } from 'express';
import { ApiError } from '../utils/ApiError.js';
import { env } from '../config/env.js';

/** 404 handler for routes that don't match any defined endpoint. */
export function notFoundHandler(req: Request, res: Response): void {
  res.status(404).json({
    error: {
      message: `Route not found: ${req.method} ${req.originalUrl}`,
      code: 'NOT_FOUND',
    },
  });
}

/**
 * Central error handler. Never leaks stack traces or internal details
 * to the client in production; logs full detail server-side.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction): void {
  const isApiError = err instanceof ApiError;
  const statusCode = isApiError ? err.statusCode : 500;
  const code = isApiError ? err.code : 'INTERNAL_ERROR';
  const message =
    isApiError || !env.isProduction
      ? (err as Error)?.message ?? 'Unknown error'
      : 'An unexpected error occurred. Please try again later.';

  if (statusCode >= 500) {
    // eslint-disable-next-line no-console
    console.error('[error]', err);
  }

  res.status(statusCode).json({
    error: {
      message,
      code,
      ...(isApiError && err.details ? { details: err.details } : {}),
    },
  });
}
