import rateLimit from 'express-rate-limit';
import { env } from '../config/env.js';

/** General API rate limiter applied to all routes. */
export const apiRateLimiter = rateLimit({
  windowMs: env.rateLimit.windowMs,
  max: env.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: {
      message: 'Too many requests. Please try again later.',
      code: 'TOO_MANY_REQUESTS',
    },
  },
});

/** Stricter limiter for the public contact form to deter spam/abuse. */
export const contactRateLimiter = rateLimit({
  windowMs: env.contactRateLimit.windowMs,
  max: env.contactRateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: {
      message: 'Too many contact form submissions. Please try again later.',
      code: 'TOO_MANY_REQUESTS',
    },
  },
});
