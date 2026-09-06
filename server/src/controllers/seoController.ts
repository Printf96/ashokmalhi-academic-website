import type { Request, Response } from 'express';
import { Publication } from '../models/Publication.js';
import { Presentation } from '../models/Presentation.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { env } from '../config/env.js';
import { isDatabaseConnected } from '../config/db.js';

const STATIC_ROUTES = [
  { path: '/', changefreq: 'monthly', priority: 1.0 },
  { path: '/about', changefreq: 'monthly', priority: 0.9 },
  { path: '/education', changefreq: 'yearly', priority: 0.7 },
  { path: '/experience', changefreq: 'yearly', priority: 0.7 },
  { path: '/research', changefreq: 'monthly', priority: 0.8 },
  { path: '/publications', changefreq: 'weekly', priority: 0.9 },
  { path: '/presentations', changefreq: 'monthly', priority: 0.6 },
  { path: '/achievements', changefreq: 'monthly', priority: 0.6 },
  { path: '/contact', changefreq: 'yearly', priority: 0.5 },
];

function xmlEscape(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * Dynamically generates sitemap.xml, including individual publication and
 * presentation detail pages so they are independently indexable. Falls
 * back gracefully to static routes only if the database is unreachable.
 */
export const getSitemap = asyncHandler(async (_req: Request, res: Response) => {
  const baseUrl = env.siteUrl.replace(/\/$/, '');
  const now = new Date().toISOString();

  let dynamicUrls: { loc: string; lastmod?: string; changefreq: string; priority: number }[] = [];

  try {
    if (!isDatabaseConnected()) {
      throw new Error('Database not connected');
    }
    const [publications, presentations] = await Promise.all([
      Publication.find().select('slug updatedAt').lean(),
      Presentation.find().select('slug updatedAt').lean(),
    ]);

    dynamicUrls = [
      ...publications.map((p) => ({
        loc: `${baseUrl}/publications/${p.slug}`,
        lastmod: (p as any).updatedAt?.toISOString?.() ?? now,
        changefreq: 'yearly',
        priority: 0.6,
      })),
      ...presentations.map((p) => ({
        loc: `${baseUrl}/presentations/${p.slug}`,
        lastmod: (p as any).updatedAt?.toISOString?.() ?? now,
        changefreq: 'yearly',
        priority: 0.5,
      })),
    ];
  } catch {
    dynamicUrls = [];
  }

  const staticEntries = STATIC_ROUTES.map(
    (route) => `  <url>
    <loc>${xmlEscape(baseUrl + route.path)}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(1)}</priority>
  </url>`
  ).join('\n');

  const dynamicEntries = dynamicUrls
    .map(
      (entry) => `  <url>
    <loc>${xmlEscape(entry.loc)}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticEntries}${dynamicEntries ? '\n' + dynamicEntries : ''}
</urlset>`;

  res.set('Content-Type', 'application/xml');
  res.send(xml);
});

export const getRobotsTxt = asyncHandler(async (_req: Request, res: Response) => {
  const baseUrl = env.siteUrl.replace(/\/$/, '');
  const body = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;
  res.set('Content-Type', 'text/plain');
  res.send(body);
});
