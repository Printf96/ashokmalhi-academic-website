import { describe, it, expect } from 'vitest';
import { SOCIAL_LINKS, SAME_AS_ELIGIBLE_URLS } from './socialConfig';
import { SAME_AS_LINKS } from './seo';

describe('SOCIAL_LINKS configuration', () => {
  it('gives every coming-soon entry a null URL and a "coming soon" tooltip', () => {
    const comingSoon = SOCIAL_LINKS.filter((l) => l.status === 'coming-soon');
    expect(comingSoon.length).toBeGreaterThan(0);
    for (const link of comingSoon) {
      expect(link.url).toBeNull();
      expect(link.tooltip.toLowerCase()).toContain('coming soon');
    }
  });

  it('never has a fabricated URL for GitHub, Reddit, Discord, Telegram, or Blogger', () => {
    for (const platform of ['github', 'reddit', 'discord', 'telegram', 'blogger']) {
      const link = SOCIAL_LINKS.find((l) => l.platform === platform);
      expect(link).toBeDefined();
      expect(link?.url).toBeNull();
      expect(link?.status).toBe('coming-soon');
    }
  });

  it('gives every active entry a real, non-empty URL', () => {
    const active = SOCIAL_LINKS.filter((l) => l.status === 'active');
    expect(active.length).toBeGreaterThan(0);
    for (const link of active) {
      expect(link.url).toBeTruthy();
    }
  });

  it('uses the exact verified phone number for both phone and WhatsApp, and never a second number', () => {
    const phone = SOCIAL_LINKS.find((l) => l.platform === 'phone');
    const whatsapp = SOCIAL_LINKS.find((l) => l.platform === 'whatsapp');
    expect(phone?.url).toBe('tel:+917011115411');
    expect(whatsapp?.url).toBe('https://wa.me/917011115411');
    // Same digits (917011115411) in both, confirming one shared number.
    expect(phone?.url).toContain('917011115411');
    expect(whatsapp?.url).toContain('917011115411');
  });

  it('uses the exact verified email address for mailto', () => {
    const email = SOCIAL_LINKS.find((l) => l.platform === 'email');
    expect(email?.url).toBe('mailto:ashok.singh.malhi@gmail.com');
  });

  it('never includes a contact channel (email/phone/whatsapp) in the sameAs-eligible set', () => {
    for (const url of SAME_AS_ELIGIBLE_URLS) {
      expect(url.startsWith('mailto:')).toBe(false);
      expect(url.startsWith('tel:')).toBe(false);
      expect(url).not.toContain('wa.me');
    }
  });

  it('never includes a coming-soon (null) URL in the sameAs-eligible set', () => {
    expect(SAME_AS_ELIGIBLE_URLS.every((url) => typeof url === 'string' && url.length > 0)).toBe(
      true
    );
  });

  it('keeps the icon-rail sameAs-eligible URLs consistent with the actual JSON-LD sameAs list', () => {
    // Every sameAs-eligible URL from the icon rail config must also
    // appear in the JSON-LD sameAs list (seo.ts) — they are maintained
    // separately (by design — Scopus appears in sameAs but not in the
    // Part 13 icon set) but the rail must never advertise a verified
    // profile that structured data omits.
    for (const url of SAME_AS_ELIGIBLE_URLS) {
      expect(SAME_AS_LINKS).toContain(url);
    }
  });
});
