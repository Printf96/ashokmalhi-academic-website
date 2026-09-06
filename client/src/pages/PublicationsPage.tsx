import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SeoHead } from '@/components/seo/SeoHead';
import { Section } from '@/components/ui/Section';
import { AsyncBoundary } from '@/components/ui/AsyncBoundary';
import { PublicationCard } from '@/components/academic/PublicationCard';
import { useApi } from '@/hooks/useApi';
import { api } from '@/lib/api';
import { buildBreadcrumbSchema, IDENTITY } from '@/lib/seo';
import styles from './PublicationsPage.module.css';

export function PublicationsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(searchParams.get('q') ?? '');

  const year = searchParams.get('year') ?? '';
  const researchArea = searchParams.get('researchArea') ?? '';
  const q = searchParams.get('q') ?? '';
  const sort = (searchParams.get('sort') as 'year-desc' | 'year-asc') ?? 'year-desc';

  const publications = useApi(
    () =>
      api.listPublications({
        year: year ? Number(year) : undefined,
        researchArea: researchArea || undefined,
        q: q || undefined,
        sort,
        limit: 50,
      }),
    [year, researchArea, q, sort]
  );

  function updateParam(key: string, value: string) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
  }

  return (
    <>
      <SeoHead
        title="Publications | Dr. Ashok Malhi"
        description={`Peer-reviewed publications by ${IDENTITY.displayName} (${IDENTITY.authorName}), Assistant Professor at ${IDENTITY.affiliation}. Search and filter by year and research area.`}
        path="/publications"
        jsonLd={[
          buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Publications', path: '/publications' },
          ]),
        ]}
      />

      <Section eyebrow="Bibliography" title="Publications" id="publications">
        <form
          className={styles.toolbar}
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            updateParam('q', searchInput.trim());
          }}
        >
          <div className={styles.searchRow}>
            <label className="visually-hidden" htmlFor="pub-search">
              Search publications by title or keyword
            </label>
            <input
              id="pub-search"
              type="search"
              className={styles.input}
              placeholder="Search by title or keyword…"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit" className={styles.select}>
              Search
            </button>
          </div>

          <div className={styles.filterRow}>
            <label className={styles.label} htmlFor="year-filter">
              Year
              <select
                id="year-filter"
                className={styles.select}
                value={year}
                onChange={(e) => updateParam('year', e.target.value)}
              >
                <option value="">All years</option>
                {(publications.data?.meta?.availableYears as number[] | undefined)?.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </label>

            <label className={styles.label} htmlFor="area-filter">
              Research area
              <select
                id="area-filter"
                className={styles.select}
                value={researchArea}
                onChange={(e) => updateParam('researchArea', e.target.value)}
              >
                <option value="">All areas</option>
                {(publications.data?.meta?.availableResearchAreas as string[] | undefined)?.map(
                  (area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  )
                )}
              </select>
            </label>

            <label className={styles.label} htmlFor="sort-order">
              Sort
              <select
                id="sort-order"
                className={styles.select}
                value={sort}
                onChange={(e) => updateParam('sort', e.target.value)}
              >
                <option value="year-desc">Newest first</option>
                <option value="year-asc">Oldest first</option>
              </select>
            </label>
          </div>
        </form>

        <AsyncBoundary
          loading={publications.loading}
          error={publications.error}
          data={publications.data}
          isEmpty={(d) => d.data.length === 0}
          emptyTitle="No publications match these filters"
          emptyMessage="Try clearing a filter, or check back later as new verified publications are added."
        >
          {(res) => (
            <>
              <p className={styles.resultsCount}>
                {res.count} publication{res.count === 1 ? '' : 's'}
              </p>
              <div className={styles.grid}>
                {res.data.map((pub) => (
                  <PublicationCard key={pub._id} publication={pub} />
                ))}
              </div>
            </>
          )}
        </AsyncBoundary>
      </Section>
    </>
  );
}
