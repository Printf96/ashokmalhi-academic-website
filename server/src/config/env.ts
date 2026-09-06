import 'dotenv/config';

interface EnvConfig {
  nodeEnv: string;
  port: number;
  mongodbUri: string;
  clientOrigins: string[];
  siteUrl: string;
  rateLimit: {
    windowMs: number;
    max: number;
  };
  contactRateLimit: {
    windowMs: number;
    max: number;
  };
  jwtSecret: string;
  jwtExpiresIn: string;
  adminEmail: string | null;
  adminPasswordHash: string | null;
  smtp: {
    host: string | null;
    port: number;
    user: string | null;
    password: string | null;
    notificationEmail: string | null;
  };
  isProduction: boolean;
}

function parseOrigins(raw: string | undefined): string[] {
  if (!raw) return ['http://localhost:5173'];
  return raw
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
}

export const env: EnvConfig = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 5000),
  mongodbUri: process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/ashokmalhi-academic',
  clientOrigins: parseOrigins(process.env.CLIENT_ORIGIN),
  siteUrl: process.env.SITE_URL ?? 'https://ashokmalhi.pro',
  rateLimit: {
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS ?? 900000),
    max: Number(process.env.RATE_LIMIT_MAX ?? 100),
  },
  contactRateLimit: {
    windowMs: Number(process.env.CONTACT_RATE_LIMIT_WINDOW_MS ?? 3600000),
    max: Number(process.env.CONTACT_RATE_LIMIT_MAX ?? 5),
  },
  jwtSecret: process.env.JWT_SECRET ?? 'dev-only-insecure-secret-change-me',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
  adminEmail: process.env.ADMIN_EMAIL || null,
  adminPasswordHash: process.env.ADMIN_PASSWORD_HASH || null,
  smtp: {
    host: process.env.SMTP_HOST || null,
    port: Number(process.env.SMTP_PORT ?? 587),
    user: process.env.SMTP_USER || null,
    password: process.env.SMTP_PASSWORD || null,
    notificationEmail: process.env.CONTACT_NOTIFICATION_EMAIL || null,
  },
  isProduction: process.env.NODE_ENV === 'production',
};

export function assertProductionSecrets(): void {
  if (!env.isProduction) return;
  if (env.jwtSecret === 'dev-only-insecure-secret-change-me') {
    throw new Error(
      'JWT_SECRET must be set to a strong random value in production. See .env.example.'
    );
  }
}
