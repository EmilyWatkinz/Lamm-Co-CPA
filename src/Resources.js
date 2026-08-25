import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import SiteNavbar from './components/SiteNavbar';

function Resources() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 200);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  useEffect(() => {
    const revealNodes = Array.from(document.querySelectorAll(
      '.resources-wrap .resource-card'
    ));

    revealNodes.forEach((node, index) => {
      node.classList.remove('is-visible');
      node.classList.add('reveal-on-scroll');
      node.style.setProperty('--reveal-delay', `${Math.min(index * 90, 360)}ms`);
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
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    revealNodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="resources-page classy-about-bg">
      <SiteNavbar />

      <main className="resources-wrap">
        <section className="resources-hero">
          <div className="resources-hero-main">
            <h1>Resources</h1>
            <p>
              Tools and insights to help you stay informed throughout the year.
            </p>
          </div>
          <Link to="/tax-calendar" className="resources-deadlines-btn">
            TAX CALENDAR DATES &amp; DEADLINES
          </Link>
        </section>

        <section className="resources-grid" aria-label="Lamm & Company resource library">
          <article className="resource-card" id="downloadable-documents">
            <h2>Downloadable Documents</h2>
            <div className="documents-resource-layout">
              <img
                src={`${process.env.PUBLIC_URL}/documents%20pic.jpg`}
                alt="Downloadable client documents"
                className="resource-card-img documents-resource-img"
              />
              <div className="documents-resource-content">
                <p className="resource-placeholder-text">
                  A convenient place to find useful client documents and materials for your tax and accounting needs.
                  We will continue adding new resources as they become available.
                </p>
                <Link to="/resources/documents" className="blog-cta-link">
                  <strong>View available documents</strong>
                </Link>
              </div>
            </div>
          </article>

          <article className="resource-card remote-resource-card" id="working-remotely">
            <h2>Working Remotely</h2>
            <div className="remote-work-layout">
              <img
                src="/remote work.webp"
                alt="Remote work services"
                className="resource-card-img remote-work-img"
              />
              <div className="remote-work-content">
                <p className="resource-placeholder-text">
                  Lamm &amp; Company is set up to serve clients remotely from start to finish, including tax prep, bookkeeping, accounting support, planning, and advisory services.
                  We work with individuals, families, and businesses in Idaho, across the U.S., and internationally.
                </p>
                <p className="resource-placeholder-text remote-resource-note">
                  Our process includes secure document upload, virtual meetings, encrypted communication, and responsive support throughout the year so you can get expert guidance no matter where you are located.
                </p>
              </div>
            </div>
          </article>

          <article className="resource-card" id="track-refund">
            <h2>Track Your Refund</h2>
            <div className="track-refund-layout">
              <img
                src="/Track Refund.webp"
                alt="Track Your Refund"
                className="resource-card-img track-refund-img"
              />
              <div className="track-refund-content">
                <ul className="refund-links refund-links-inline">
                  <li><a href="https://www.irs.gov/" target="_blank" rel="noopener noreferrer">Federal</a></li>
                  <li><a href="https://idahotap.gentax.com/tap/_/" target="_blank" rel="noopener noreferrer">Idaho</a></li>
                  <li><a href="https://revenueonline.dor.oregon.gov/tap/_/" target="_blank" rel="noopener noreferrer">Oregon</a></li>
                </ul>
                <p className="resource-placeholder-text">
                  Tracking your tax refund is simple and ensures you stay informed about when to expect your money. After filing, you can check your refund status online throught <strong>IRS "Where&apos;s My Refund"</strong> tool or your state&apos;s tax website. Refunds usually take about <strong>21 days for e-filed returns</strong> and <strong>6 to 8 weeks for mailed returns</strong>. Delays can occur due to errors, audits, or IRS processing backlogs. Stay updated and plan accordingly!
                </p>
              </div>
            </div>
          </article>

          <article className="resource-card" id="secure-document-upload">
            <h2>Secure Document Upload</h2>
            <div className="secure-layout">
              <img
                src="/Secure.webp"
                alt="Secure Document Upload"
                className="resource-card-img secure-img"
              />
              <div className="secure-content">
                <p className="resource-placeholder-text">
                  Lamm &amp; Company makes document delivery simple, fast, and highly secure. Our secure upload page lets you send tax documents and records directly to our office by email from the comfort of your computer in just minutes.
                </p>
                <Link to="/secure-upload" className="blog-cta-link">
                  <strong>Upload your documents now!</strong>
                </Link>
              </div>
            </div>
          </article>

          <article className="resource-card" id="pay-for-services">
            <h2>Pay for Services</h2>
            <div className="pay-layout">
              <img
                src="/Pay for Services.png"
                alt="Pay for Services"
                className="resource-card-img pay-img"
              />
              <div className="pay-content">
                <p className="resource-placeholder-text">
                  Lamm &amp; Company makes paying for services online fast, secure, and effortless. Our streamlined payment experience is designed for convenience, giving you a simple way to handle invoices from anywhere while keeping your information protected. With just a few clicks, you can complete your payment and get back to what matters most, confident that your account is up to date.
                </p>
                <a href="/pay-bill" target="_blank" rel="noopener noreferrer" className="blog-cta-link">
                  <strong>Pay your bill now!</strong>
                </a>
              </div>
            </div>
          </article>

          <article className="resource-card" id="blog">
            <h2>Blog</h2>
            <div className="blog-layout">
              <img
                src="/Blog.jpg"
                alt="Blog"
                className="resource-card-img blog-img"
              />
              <div className="blog-content">
                <p className="resource-placeholder-text">
                  At Lamm &amp; Co CPA, our blog is your go to resource for expert insights on taxes, financial planning, and business strategies. We break down complex tax laws, offer money-saving tips, and keep you informed about important financial updates. Whether you&apos;re an individual taxpayer or a business owner, our blog provides valuable guidance to help you make smart financial decisions year-round. Stay ahead of tax season, maximize deductions, and gain peace of mind.
                </p>
                <a href="/blog" target="_blank" rel="noopener noreferrer" className="blog-cta-link">
                  <strong>Explore our latest posts today!</strong>
                </a>
              </div>
            </div>
          </article>

          <article className="resource-card" id="tax-planning-2026">
            <h2>Tax Planning 2026</h2>
            <div className="tax-planning-layout">
              <img
                src="/Tax Planning.webp"
                alt="Tax Planning 2026"
                className="resource-card-img tax-planning-img"
              />
              <div className="tax-planning-content">
                <p className="resource-placeholder-text">
                  At Lamm &amp; Co CPA, we&apos;re already looking ahead to <strong>tax planning for 2026</strong> to help you maximize savings and stay ahead of changing tax laws. Proactive planning is key to reducing your tax burden, whether you&apos;re an individual looking to optimize deductions or a business aiming to improve cash flow. Our experts will assess your financial situation, identify opportunities for tax efficiency, and develop a customized strategy to keep more of your hard-earned money. Don&apos;t wait until tax season - <strong>start planning now for a stress free 26!</strong>
                </p>
              </div>
            </div>
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

export default Resources;
