import React, { useEffect, useState } from 'react';
import './App.css';
import SiteNavbar from './components/SiteNavbar';

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
      <SiteNavbar />

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
                and communities we serve every day through our seven Idaho locations. At the same time,
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
            <a href="https://www.google.com/search?q=Lamm+%26+Company+Boise+location&client=ms-android-att-us-rvc3&sca_esv=c70b30f9636752de&sxsrf=AKL5yDh5j84DPuhRy2mHhmB-ahtLZQsjsg%3A1794422553451&ei=Gbf0asKGG_yt0PEP4e_GoQM&biw=1536&bih=791&uact=5&oq=Lamm+%26+Company+Boise+location&gs_lp=Egxnd3Mtd2l6LXNlcnAiHUxhbW0gJiBDb21wYW55IEJvaXNlIGxvY2F0aW9uMgUQIRigATIFECEYoAEyBRAhGKABSOMkULgHWNQjcAF4AZABAJgBeaABuxWqAQQyMC45uAEDyAEA-AEBmAIeoAKgFqgCEMICBxAjGOoCGCfCAhAQIxjwBRieBhiiBxjqAhgnwgINEC4YxwEYrwEY6gIYJ8ICFxAAGIAEGIoFGJECGOcGGOoCGLQC2AEBwgIXEC4YgAQYigUYkQIY5wYY6gIYtALYAQHCAgQQIxgnwgIEEC4YJ8ICDhAAGIAEGIoFGJECGLQHwgILEAAYgAQYigUYkQLCAgsQLhiABBiKBRiRAsICCxAuGIAEGLEDGIMBwgIKEC4YgAQYigUYQ8ICDhAAGIAEGIoFGJECGLEDwgINEC4YgAQYigUYQxixA8ICExAuGIAEGIoFGEMYsQMYxwEY0QPCAhEQLhiABBiKBRiRAhjHARivAcICBRAAGIAEwgILEC4YgAQYxwEYrwHCAgUQLhiABMICCBAAGIAEGLQHwgIGEAAYFhgewgIIEAAYFhgeGArCAggQABiJBRiiBMICCBAAGIAEGKIEwgIFEAAY7wXCAgUQIRirApgDCvEF4-MGXiNF9HW6BgYIARABGAGSBwUxOS4xMaAH1usBsgcFMTguMTG4B5UWwgcGNi4yMS4zyAc-gAgB&sclient=gws-wiz-serp" target="_blank" rel="noopener noreferrer" className={`location-card locations-fade-item${animateIn ? ' locations-fade-visible' : ''}`} style={{ animationDelay: '960ms' }}>
              <div className="location-card-title">Boise</div>
              <div className="location-card-line"><strong>Call Us:</strong> (208) 345-5383</div>
              <div className="location-card-line"><strong>Visit Us:</strong> 280 Parkcenter Blvd, Suite 100, Boise, ID 83706</div>
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
