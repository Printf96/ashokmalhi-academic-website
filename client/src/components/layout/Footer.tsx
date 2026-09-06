import { Link } from 'react-router-dom';
import { IDENTITY } from '@/lib/seo';
import styles from './Footer.module.css';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div>
            <h2 className={styles.heading}>Navigate</h2>
            <ul className={styles.linkList}>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/research">Research</Link></li>
              <li><Link to="/publications">Publications</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h2 className={styles.heading}>Academic Profiles</h2>
            <ul className={styles.linkList}>
              <li><a href={IDENTITY.orcid} target="_blank" rel="noopener noreferrer nofollow">ORCID</a></li>
              <li><a href={IDENTITY.googleScholarUrl} target="_blank" rel="noopener noreferrer nofollow">Google Scholar</a></li>
              <li><a href={IDENTITY.researchGateUrl} target="_blank" rel="noopener noreferrer nofollow">ResearchGate</a></li>
            </ul>
          </div>
          <div>
            <h2 className={styles.heading}>Professional</h2>
            <ul className={styles.linkList}>
              <li><a href={IDENTITY.linkedinUrl} target="_blank" rel="noopener noreferrer nofollow">LinkedIn</a></li>
              <li><a href={IDENTITY.facebookUrl} target="_blank" rel="noopener noreferrer nofollow">Facebook</a></li>
              <li><a href={IDENTITY.instagramUrl} target="_blank" rel="noopener noreferrer nofollow">Instagram</a></li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© {year} {IDENTITY.displayName}. All rights reserved.</span>
          <span className="mono-label">{IDENTITY.professionalTitle} · {IDENTITY.affiliation}</span>
        </div>
      </div>
    </footer>
  );
}
