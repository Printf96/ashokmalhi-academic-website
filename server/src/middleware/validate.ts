import type { NextFunction, Request, Response } from 'express';
import type { ZodTypeAny } from 'zod';
import { ApiError } from '../utils/ApiError.js';

type RequestPart = 'body' | 'query' | 'params';

/** Validates and replaces req[part] with the parsed (and coerced) Zod result. */
export function validate(schema: ZodTypeAny, part: RequestPart = 'body') {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[part]);
    if (!result.success) {
      next(
        ApiError.badRequest('Validation failed', result.error.flatten())
      );
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (req as any)[part] = result.data;
    next();
  };
}
