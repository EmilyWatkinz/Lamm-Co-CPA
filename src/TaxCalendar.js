import React, { useEffect, useState } from 'react';
import './App.css';
import SiteNavbar from './components/SiteNavbar';

const months = [
  {
    month: 'January',
    highlights: [
      'Beginning of Q1.',
      {
        bold: 'January 15',
        text: ' - Fourth Quarter estimated tax payment (Form 1040 - ES, 2025 Tax Year).',
      },
      {
        bold: '2026 Note:',
        text: ' Standard Jan. 31 deadlines for W-2s, 1099s, and annual payroll forms are observed on Monday, February 2nd, 2026',
      },
    ],
  },
  {
    month: 'February',
    highlights: [
      {
        bold: 'Feb 2',
        text: ' - Forms W-2 to employees and SSA (extended 2026 deadline)',
      },
      {
        bold: 'Feb 2',
        text: ' - Forms 1099-NEC and recipient copies (including certain 1099-MISC)',
      },
      {
        bold: 'Feb 2',
        text: ' - Annual and quarterly payroll reports (forms 940, 941, Q4, 943, 944, and 945)',
      },
      {
        bold: 'Feb 17',
        text: ' - Renewal of withholding exemption (Form W-4)',
      },
    ],
  },
  {
    month: 'March',
    highlights: [
      {
        bold: 'March 16',
        text: ' - Annual return for Parternships and S-Corporations (Forms 1065 and 1120-S).',
      },
      {
        bold: 'March 16',
        text: ' - Final day to file Form 2553 to elect S-Coporation status for 2026.',
      },
      {
        bold: 'March 16',
        text: ' - Etension request for Partnerships and S-Corporations (Form 7004)',
      },
    ],
  },
  {
    month: 'April',
    highlights: [
      'Beginning of Q2',
      {
        bold: 'April 15',
        text: ' - Tax Day: Individual Federal Income Tax Return (Form 1040)',
      },
      {
        bold: 'April 15',
        text: ' - IRA and HSA contributions for the 2025 tax year',
      },
      {
        bold: 'April 15',
        text: ' - First estimated tax payment for 2025 (Q1)',
      },
      {
        bold: 'April 15',
        text: ' - Corporate income tax returns (Form 1120)',
      },
    ],
  },
  {
    month: 'May',
    highlights: [
      {
        bold: 'May 15',
        text: ' - Annual return for tax-exempt organizations (Form 990)',
      },
    ],
  },
  {
    month: 'June',
    highlights: [
      {
        bold: 'June 15',
        text: ' - Second estimated tax payment for 2026 (Q2)',
      },
    ],
  },
  { month: 'July', highlights: ['Beginning of Q3', 'Nothing due this month'] },
  { month: 'August', highlights: ['Nothing due this month'] },
  {
    month: 'September',
    highlights: [
      {
        bold: 'Sept 15',
        text: ' - Third estimated tax payment fo 2026 (Q3)',
      },
      {
        bold: 'Sept 15',
        text: ' - Extended filing deadline for Partnerships and S-Corporations',
      },
    ],
  },
  {
    month: 'October',
    highlights: [
      'Beginning of Q4',
      {
        bold: 'Oct 15',
        text: ' - Etended deadline for Individual income tax returns (Form 1040)',
      },
      {
        bold: 'Oct 15',
        text: ' - Extended deadline for Form 1120 (C-Corps and LLCs taxed as corporations)',
      },
    ],
  },
  {
    month: 'November',
    highlights: [
      {
        bold: 'Nov 16',
        text: ' - Extended deadline for tax-exempt organizations (Form 990)',
      },
    ],
  },
  {
    month: 'December',
    highlights: [
      {
        bold: 'Dec 31',
        text: ' - Required minimum distribution (RMD) for 2026 tax year',
      },
    ],
  },
];

function TaxCalendar() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 200);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  useEffect(() => {
    const revealNodes = Array.from(document.querySelectorAll(
      '.calendar-page-wrap .calendar-hero, .calendar-page-wrap .calendar-month-card'
    ));

    revealNodes.forEach((node) => {
      node.classList.add('reveal-on-scroll');
    });

    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    revealNodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="resources-page classy-about-bg">
      <SiteNavbar />

      <main className="calendar-page-wrap">
        <section className="calendar-hero">
          <div className="calendar-hero-content">
            <h1>Tax Calendar Dates & Deadlines</h1>
            <p>Hover over each month to preview important due dates and tax reminders. We will keep this calendar updated throughout the year.</p>
          </div>
          <img
            src={`${process.env.PUBLIC_URL}/Calendar.webp`}
            alt="Tax calendar"
            className="calendar-hero-image"
          />
        </section>

        <div className="calendar-year">Tax Year 2026</div>

        <section className="calendar-grid" aria-label="Tax calendar by month">
          {months.map(({ month, highlights }) => (
            <article key={month} className="calendar-month-card" tabIndex={0}>
              <h2>{month}</h2>
              <div className="calendar-month-hover">
                <h3>{month}</h3>
                <ul>
                  {highlights.map((item, index) => (
                    <li key={`${month}-${index}`}>
                      {typeof item === 'string' ? (
                        item
                      ) : (
                        <>
                          <strong>{item.bold}</strong>
                          {item.text}
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
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

export default TaxCalendar;