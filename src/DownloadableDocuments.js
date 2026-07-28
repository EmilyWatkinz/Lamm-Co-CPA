import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import SiteNavbar from './components/SiteNavbar';

const upcomingDocuments = [
  'Individual Tax Organizer',
  'Business Tax Organizer',
  'Bookkeeping Intake Checklist',
  'Payroll Onboarding Checklist',
  'Quarterly Estimated Tax Worksheet',
  'Year-End Records Checklist',
];

function DownloadableDocuments() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 200);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="resources-page classy-about-bg">
      <SiteNavbar />

      <main className="resources-wrap documents-page-wrap">
        <section className="resources-hero documents-hero">
          <div className="resources-hero-main">
            <h1>Downloadable Documents</h1>
            <p>
              This page lists the client documents you will be able to access soon.
              We will continue adding resources to make preparation faster and simpler.
            </p>
          </div>
          <Link to="/resources" className="resources-deadlines-btn">
            BACK TO RESOURCES
          </Link>
        </section>

        <section className="resources-grid" aria-label="Upcoming downloadable documents">
          <article className="resource-card documents-list-card">
            <h2>Documents You Will Have Access To</h2>
            <ul className="documents-list">
              {upcomingDocuments.map((doc) => (
                <li key={doc}>{doc}</li>
              ))}
            </ul>
            <p className="resource-placeholder-text documents-note">
              Additional forms and templates will be added here in future updates.
            </p>
          </article>
        </section>
      </main>

      <footer className="footer">
        &copy; {new Date().getFullYear()} Lamm & Company. All rights reserved.{' '}
        <a href="https://www.facebook.com/lammcocpa/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook" title="Facebook">
          <span className="social-icon social-icon-fb" aria-hidden="true">f</span>
        </a>{' '}
        <a href="https://www.linkedin.com/company/lamm-&-company-cpa/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn" title="LinkedIn">
          <span className="social-icon social-icon-in" aria-hidden="true">in</span>
        </a>
      </footer>

      {showScroll && (
        <button className="scroll-to-top" onClick={scrollToTop} aria-label="Scroll to top">
          <span className="scroll-arrow">&#8593;</span>
        </button>
      )}
    </div>
  );
}

export default DownloadableDocuments;
