import type { ReactNode } from 'react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { IconRail } from './IconRail';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navigation />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <IconRail />
      <Footer />
    </>
  );
}
