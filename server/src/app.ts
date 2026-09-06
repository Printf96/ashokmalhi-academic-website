import express, { type Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import hpp from 'hpp';
import mongoSanitize from 'express-mongo-sanitize';
import { env } from './config/env.js';
import apiRouter from './routes/index.js';
import seoRouter from './routes/seo.routes.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';
import { apiRateLimiter } from './middleware/rateLimiters.js';

export function createApp(): Express {
  const app = express();

  // Trust the first proxy hop (needed for correct req.ip behind Render/Railway/Vercel/etc.)
  app.set('trust proxy', 1);

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          imgSrc: ["'self'", 'data:', 'https:'],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          connectSrc: ["'self'"],
          objectSrc: ["'none'"],
          frameAncestors: ["'none'"],
          upgradeInsecureRequests: [],
        },
      },
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    })
  );

  app.use(
    cors({
      origin: env.clientOrigins,
      credentials: true,
    })
  );

  app.use(compression());
  app.use(express.json({ limit: '100kb' }));
  app.use(express.urlencoded({ extended: true, limit: '100kb' }));
  app.use(mongoSanitize());
  app.use(hpp());

  if (!env.isProduction) {
    app.use(morgan('dev'));
  } else {
    app.use(morgan('combined'));
  }

  // SEO endpoints are served at the root (not under /api) so they land at
  // https://ashokmalhi.pro/sitemap.xml and /robots.txt as search engines expect.
  app.use('/', seoRouter);

  app.get('/api', (_req, res) => {
    res.json({
      name: 'ashokmalhi-academic-website API',
      status: 'ok',
      docs: '/docs/API.md',
    });
  });

  app.use('/api', apiRateLimiter, apiRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
