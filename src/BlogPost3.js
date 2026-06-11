import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import SiteNavbar from './components/SiteNavbar';

function BlogPost3() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 200);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="resources-page classy-about-bg">
      <SiteNavbar blogTo="/blog" />

      <main className="blog-post-page-wrap">
        <Link to="/blog" className="blog-post-back">← Back to Blog</Link>

        <article className="blog-post-article">
          <img
            src="/Third Blog Photo.png"
            alt="IRS Resources & Updates"
            className="blog-post-hero-img"
          />
          <h1>How do I file?</h1>
          <p className="blog-post-byline">By the Internal Revenue Service</p>

          <div className="blog-post-body">
            <h2>When to file your taxes</h2>
            <p>The tax deadline for 2025 tax returns is April 15, 2026.</p>
            <p>You may have more time to file if:</p>
            <ul>
              <li>You were affected by a federally-declared disaster.</li>
              <li>On the due date, you're living out of the country or a military member stationed in or supporting work for a designated combat zone.</li>
              <li>Find your deadlines if you file on a fiscal year.</li>
            </ul>
            <p>Find help if you need more time to file or pay.</p>

            <h2>Ways to file for free</h2>
            <ul>
              <li><strong>Free File</strong> – If your adjusted gross income is $89,000 or less. If higher, you can use Free File Fillable Forms.</li>
              <li><strong>Free tax services for military and veterans</strong></li>
              <li><strong>IRS-certified volunteers</strong> – If you earn $69,000 or less, have a disability, are 60 years or older or need language support.</li>
            </ul>

            <h2>Other ways to file</h2>
            <ul>
              <li><strong>Tax professional</strong> – Choose an IRS-approved tax professional.</li>
              <li><strong>Paper forms</strong> – You can file with paper forms and mail them to the IRS.
                <ul>
                  <li>If you have wages, file Form 1040, U.S. Individual Income Tax Return or Form 1040-SR, U.S. Income Tax Return for Seniors.</li>
                  <li>If you have a business or side income, file Form 1040 with a Schedule C.</li>
                  <li>Find the right form for you.</li>
                </ul>
              </li>
              <li><strong>Tax preparation software</strong> – Use tax preparation software of your choice to file your taxes electronically or on paper.</li>
            </ul>

            <h2>If you need more time to file or pay</h2>
            <p>If you need more time, you must request an extension by the April filing deadline. Filing later may add penalties.</p>
            <p>If you file an extension, you must still pay taxes you owe by the deadline. Paying later adds interest and penalties.</p>
            <p>If you can't pay, get help with tax debt.</p>

            <h2>Tax changes for this year</h2>
            <p>Find the latest tax changes.</p>

            <h2>Record these numbers</h2>
            <p>When you file your return, record these numbers so you can check your refund, e-file next year or get tax information during the year:</p>
            <ul>
              <li>Your exact refund amount</li>
              <li>Your adjusted gross income</li>
            </ul>
            <p>You can also find these numbers after we process your return in your online account.</p>

            <h2>File for prior years</h2>
            <p>If you haven't filed a past-due tax return, you can file a tax return for any prior year.</p>

            <p>
              <a
                href="https://www.irs.gov/filing/individuals/how-to-file"
                target="_blank"
                rel="noopener noreferrer"
                className="blog-post-ext-link"
              >
                Click here to read full article on IRS.gov →
              </a>
            </p>
          </div>
        </article>
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

export default BlogPost3;
