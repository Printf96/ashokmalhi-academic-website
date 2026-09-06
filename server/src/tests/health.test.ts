import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from '../app.js';

describe('GET /api/health', () => {
  it('returns ok status', async () => {
    const app = createApp();
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});

describe('GET /robots.txt', () => {
  it('returns a text robots file referencing the sitemap', async () => {
    const app = createApp();
    const res = await request(app).get('/robots.txt');
    expect(res.status).toBe(200);
    expect(res.text).toContain('Sitemap:');
  });
});

describe('GET /sitemap.xml', () => {
  it('returns valid XML with static routes', async () => {
    const app = createApp();
    const res = await request(app).get('/sitemap.xml');
    expect(res.status).toBe(200);
    expect(res.text).toContain('<urlset');
    expect(res.text).toContain('/publications');
  });
});

describe('POST /api/contact', () => {
  it('rejects a submission with an invalid email', async () => {
    const app = createApp();
    const res = await request(app).post('/api/contact').send({
      name: 'Test User',
      email: 'not-an-email',
      subject: 'Hello',
      message: 'This is a test message body.',
    });
    expect(res.status).toBe(400);
  });

  it('rejects a submission caught by the honeypot field', async () => {
    const app = createApp();
    const res = await request(app).post('/api/contact').send({
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Hello',
      message: 'This is a test message body.',
      website: 'http://spam.example.com',
    });
    expect(res.status).toBe(400);
  });
});
