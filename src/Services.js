import React, { useState, useEffect } from 'react';
import './App.css';
import SiteNavbar from './components/SiteNavbar';

const services = [
  {
    title: 'Federal & State Tax Preparation',
    description:
      'Accurate, timely preparation for individuals and businesses with clear guidance every step of the way.',
    image: '/Fed&State.webp',
    imageAlt: 'Federal & State Tax Preparation',
  },
  {
    title: 'Bookkeeping',
    description:
      'Reliable monthly bookkeeping to keep records clean, organized, and ready for informed decisions.',
    image: '/Bookkeeping.webp',
    imageAlt: 'Bookkeeping',
  },
  {
    title: 'Payroll Services',
    description:
      'Consistent payroll processing, reporting, and filing support to keep your team paid and compliant.',
    image: '/Payroll Services.webp',
    imageAlt: 'Payroll Services',
  },
  {
    title: 'Business Financial Consulting',
    description:
      'Practical financial insight to help improve cash flow, profitability, and long-term business health.',
    image: '/Business Financial Consulting.webp',
    imageAlt: 'Business Financial Consulting',
  },
  {
    title: 'QuickBooks Set Up',
    description:
      'Customized setup and structure so your QuickBooks file is accurate, efficient, and easy to maintain.',
    image: '/QB Setup.webp',
    imageAlt: 'QuickBooks Set Up',
  },
  {
    title: 'Business Startup Assistance',
    description:
      'Foundational guidance for new businesses, from entity considerations to financial process planning.',
    image: '/Business Startup.webp',
    imageAlt: 'Business Startup Assistance',
  },
  {
    title: 'Tax Planning Strategies',
    description:
      'Proactive planning focused on reducing tax burden and avoiding surprises throughout the year.',
    image: '/Tax Planning Strategies.webp',
    imageAlt: 'Tax Planning Strategies',
  },
  {
    title: 'External CFO Services',
    description:
      'Executive-level financial oversight and strategy without the cost of a full-time in-house CFO.',
    image: '/External CFO.webp',
    imageAlt: 'External CFO Services',
  },
];

function Services() {
  const [openIndex, setOpenIndex] = useState(null);
  const [showScroll, setShowScroll] = useState(false);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 200);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  useEffect(() => {
    const revealNodes = Array.from(document.querySelectorAll(
      '.services-wrap .services-hero, .services-wrap .service-card'
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
    <div className="services-page classy-about-bg">
      <SiteNavbar />

      <main className="services-wrap">
        <section className="services-hero">
          <div className="services-hero-content">
            <h1>Our Services</h1>
            <p>
              Professional accounting and advisory support designed to help individuals,
              families, and businesses stay confident in every financial decision.
            </p>
          </div>
          <img src="/Services.avif" alt="Services" className="services-hero-image" />
        </section>

        <section className="services-grid" aria-label="Lamm & Company services list">
          {services.map((service, i) => {
            const isOpen = openIndex === i;
            return (
              <article
                key={service.title}
                className={`service-card${isOpen ? ' service-card-open' : ''}`}
                onClick={() => toggle(i)}
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggle(i)}
              >
                <div className="service-card-header">
                  <h2>{service.title}</h2>
                </div>
                <div className={`service-card-desc${isOpen ? ' desc-open' : ''}`}>
                  {service.image && (
                    <img
                      src={service.image}
                      alt={service.imageAlt}
                      className="service-card-img"
                    />
                  )}
                  <p>{service.description}</p>
                </div>
              </article>
            );
          })}
        </section>
      </main>

      <footer className="footer">
        &copy; {new Date().getFullYear()} Lamm & Company. All rights reserved.{' '}
        <a
          href="https://www.facebook.com/lammcocpa/"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
          aria-label="Facebook"
          title="Facebook"
        >
          <span className="social-icon social-icon-fb" aria-hidden="true">f</span>
        </a>{' '}
        <a
          href="https://www.linkedin.com/company/lamm-&-company-cpa/"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
          aria-label="LinkedIn"
          title="LinkedIn"
        >
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

export default Services;
