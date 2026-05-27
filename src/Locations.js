import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Locations() {
  const [showScroll, setShowScroll] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 200);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  useEffect(() => {
    const timer = window.setTimeout(() => setAnimateIn(true), 80);
    return () => window.clearTimeout(timer);
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
          <li className="nav-item"><Link to="/locations">Locations</Link></li>
          <li className="nav-item"><Link to="/reviews">Reviews</Link></li>
          <li className="nav-item"><Link to="/resources#blog">Blog</Link></li>
        </ul>
      </nav>

      <main className="locations-page-wrap">
        <section className="locations-section">
          <div className="locations-hero">
            <div className="locations-hero-content">
              <h2
                className={`locations-fade-item${animateIn ? ' locations-fade-visible' : ''}`}
                style={{ animationDelay: '60ms' }}
              >
                Our Locations
              </h2>
              <p
                className={`locations-fade-item${animateIn ? ' locations-fade-visible' : ''}`}
                style={{ animationDelay: '180ms' }}
              >
                We are proud to call Idaho home and deeply value the local families, business owners,
                and communities we serve every day through our six Idaho locations. At the same time,
                our team is fully equipped to serve clients across the U.S.A. and around the world with
                the same responsive guidance, trusted expertise, and personal care.
              </p>
            </div>
            <img
              src="/Idaho.webp"
              alt="Idaho"
              className={`locations-hero-image locations-fade-item${animateIn ? ' locations-fade-visible' : ''}`}
              style={{ animationDelay: '260ms' }}
            />
          </div>

          <div className="locations-list">
            <a href="https://share.google/ZHSlrttd60SkRzbQG" target="_blank" rel="noopener noreferrer" className={`location-card locations-fade-item${animateIn ? ' locations-fade-visible' : ''}`} style={{ animationDelay: '360ms' }}>
              <div className="location-card-title">McCall</div>
              <div className="location-card-line"><strong>Call Us:</strong> (208) 634-2351</div>
              <div className="location-card-line"><strong>Visit Us:</strong> 311 Deinhard Lane, McCall ID 83638</div>
              <div className="location-card-line"><strong>Mail Us:</strong> P.O. Box 2069 McCall, ID 83638</div>
              <div className="location-card-line"><strong>Hours:</strong> M-Th 8am - 4pm</div>
            </a>
            <a href="https://share.google/YvDbl3CTSWZlQ9vcX" target="_blank" rel="noopener noreferrer" className={`location-card locations-fade-item${animateIn ? ' locations-fade-visible' : ''}`} style={{ animationDelay: '460ms' }}>
              <div className="location-card-title">Grangeville</div>
              <div className="location-card-line"><strong>Call Us:</strong> (208) 983-2570</div>
              <div className="location-card-line"><strong>Visit Us:</strong> 132 W Main Street, Grangeville ID 83530</div>
              <div className="location-card-line"><strong>Hours:</strong> M-Th 9am - 5pm</div>
            </a>
            <a href="https://share.google/sv1g7A3yNR8OGALoF" target="_blank" rel="noopener noreferrer" className={`location-card locations-fade-item${animateIn ? ' locations-fade-visible' : ''}`} style={{ animationDelay: '560ms' }}>
              <div className="location-card-title">Fruitland</div>
              <div className="location-card-line"><strong>Call Us:</strong> (208) 452-5700</div>
              <div className="location-card-line"><strong>Visit Us:</strong> 2400 Alder Dr., Fruitland, ID 83619</div>
              <div className="location-card-line"><strong>Hours:</strong> M-Th 8am - 4pm</div>
            </a>
            <a href="https://share.google/kTxCndtOhKjkrSdLr" target="_blank" rel="noopener noreferrer" className={`location-card locations-fade-item${animateIn ? ' locations-fade-visible' : ''}`} style={{ animationDelay: '660ms' }}>
              <div className="location-card-title">Emmett</div>
              <div className="location-card-line"><strong>Call Us:</strong> (208) 365-2817</div>
              <div className="location-card-line"><strong>Visit Us:</strong> 316 E. Main St. Emmett, ID 83617</div>
              <div className="location-card-line"><strong>Hours:</strong> M-Th 8am - 4pm</div>
            </a>
            <a href="https://share.google/FYp4TdM4WrTPmQjVA" target="_blank" rel="noopener noreferrer" className={`location-card locations-fade-item${animateIn ? ' locations-fade-visible' : ''}`} style={{ animationDelay: '760ms' }}>
              <div className="location-card-title">Weiser</div>
              <div className="location-card-line"><strong>Call Us:</strong> (208) 907-4500</div>
              <div className="location-card-line"><strong>Visit Us:</strong> 402 E. 7th Street, Suite 2, Weiser, ID 83672</div>
              <div className="location-card-line"><strong>Hours:</strong> M-Th 8am - 4pm</div>
            </a>
            <a href="https://share.google/wEQ4Obz6sRiR2Rnvj" target="_blank" rel="noopener noreferrer" className={`location-card locations-fade-item${animateIn ? ' locations-fade-visible' : ''}`} style={{ animationDelay: '860ms' }}>
              <div className="location-card-title">Kuna</div>
              <div className="location-card-line"><strong>Call Us:</strong> (208) 510-6326</div>
              <div className="location-card-line"><strong>Visit Us:</strong> 1579 N. Linder Road, Kuna, ID 83634</div>
              <div className="location-card-line"><strong>Hours:</strong> M-Th 8am - 4pm</div>
            </a>
          </div>

          <p className="locations-contact-note">
            For general inquiries &amp; questions, contact us via email at{' '}
            <a
              href="mailto:info@lammcocpa.com?subject=General%20Inquiry&body=Hello%20Lamm%20%26%20Company%2C%0D%0A%0D%0A"
              title="Open your email app to contact info@lammcocpa.com"
            >
              info@lammcocpa.com
            </a>
          </p>
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

export default Locations;
