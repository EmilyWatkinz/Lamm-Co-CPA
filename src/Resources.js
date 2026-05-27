import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

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
      '.resources-wrap .resources-hero, .resources-wrap .resource-card'
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
      <nav className="navbar">
        <div className="nav-logo-group">
          <img src="/Lamm+-+Co+LOGO-162w.webp" alt="Lamm & Company Logo" className="nav-logo-img" />
          <Link to="/" className="nav-logo-text" style={{ textDecoration: 'none' }}>Lamm & Company</Link>
        </div>
        <ul className="nav-list nav-right">
          <li className="nav-item"><Link to="/about">About</Link></li>
          <li className="nav-item"><Link to="/services">Services</Link></li>
          <li className="nav-item"><Link to="/resources">Resources</Link></li>
          <li className="nav-item"><a href="/#locations">Locations</a></li>
          <li className="nav-item"><Link to="/reviews">Reviews</Link></li>
          <li className="nav-item"><Link to="/resources#blog">Blog</Link></li>
        </ul>
      </nav>

      <main className="resources-wrap">
        <section className="resources-hero">
          <h1>Resources</h1>
          <p>
            Tools and insights to help you stay informed throughout the year.
          </p>
        </section>

        <section className="resources-grid" aria-label="Lamm & Company resource library">
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
                  Lamm &amp; Company makes document delivery simple, fast, and highly secure. Our encrypted upload process is designed to protect your sensitive financial information at every step, so you can share tax documents and records with confidence. Whether you are at home, at the office, or traveling anywhere in the world, you can submit everything you need from the comfort of your computer in just minutes.
                </p>
                <a href="/secure-upload" target="_blank" rel="noopener noreferrer" className="blog-cta-link">
                  <strong>Upload your documents now!</strong>
                </a>
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
