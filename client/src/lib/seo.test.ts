import { describe, it, expect } from 'vitest';
import {
  buildPersonSchema,
  buildWebsiteSchema,
  buildBreadcrumbSchema,
  buildScholarlyArticleSchema,
  SAME_AS_LINKS,
  IDENTITY,
} from './seo';

describe('buildPersonSchema', () => {
  it('includes both name variants and the correct affiliation', () => {
    const schema = buildPersonSchema();
    expect(schema.name).toBe('Dr. Ashok Malhi');
    expect(schema.alternateName).toContain('Ashok Malhi');
    expect(schema.alternateName).toContain('Ashok Singh Malhi');
    expect(schema.affiliation.name).toBe(IDENTITY.affiliation);
    expect(schema.sameAs).toEqual(SAME_AS_LINKS);
  });

  it('never displays the author name variant as the primary name', () => {
    const schema = buildPersonSchema();
    expect(schema.name).not.toBe(IDENTITY.authorNameVariant);
  });

  it('never asserts a department in structured data (Scholar-sourced, not independently confirmed)', () => {
    const schema = buildPersonSchema() as Record<string, unknown>;
    const affiliation = schema.affiliation as Record<string, unknown>;
    expect(affiliation.department).toBeUndefined();
    expect(JSON.stringify(schema)).not.toContain('Mittal School of Business');
  });

  it('includes alumniOf institution names but never a degree, specialization, or thesis detail', () => {
    const schema = buildPersonSchema() as Record<string, unknown>;
    const alumniOf = schema.alumniOf as Array<Record<string, unknown>>;
    const names = alumniOf.map((a) => a.name);
    expect(names).toEqual(['Sharda University', 'IMS Ghaziabad', 'IPEM Ghaziabad']);
    const serialized = JSON.stringify(schema);
    expect(serialized).not.toMatch(/PhD|PGDM|BCA|thesis/i);
  });
});

describe('buildWebsiteSchema', () => {
  it('references the canonical person entity', () => {
    const schema = buildWebsiteSchema();
    expect(schema.publisher).toEqual({ '@id': 'https://ashokmalhi.pro/#person' });
  });
});

describe('buildBreadcrumbSchema', () => {
  it('builds a positioned itemListElement array', () => {
    const schema = buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Publications', path: '/publications' },
    ]);
    expect(schema.itemListElement).toHaveLength(2);
    expect(schema.itemListElement[0]?.position).toBe(1);
    expect(schema.itemListElement[1]?.item).toBe('https://ashokmalhi.pro/publications');
  });
});

describe('buildScholarlyArticleSchema', () => {
  it('falls back to the canonical Person when no author list is supplied', () => {
    const schema = buildScholarlyArticleSchema({
      title: 'Machine intelligence versus terrorism',
      slug: 'machine-intelligence-versus-terrorism-2021',
      year: 2021,
    });
    expect(schema.author).toEqual({ '@id': 'https://ashokmalhi.pro/#person' });
  });

  it('never fabricates a DOI or journal when none is supplied', () => {
    const schema = buildScholarlyArticleSchema({
      title: 'Sample title',
      slug: 'sample-title-2024',
      year: 2024,
    }) as Record<string, unknown>;
    expect(schema.sameAs).toBeUndefined();
    expect(schema.isPartOf).toBeUndefined();
  });
});
