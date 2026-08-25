
import './App.css';
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import SiteNavbar from './components/SiteNavbar';

function App() {
  const [showScroll, setShowScroll] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [locationsVisible, setLocationsVisible] = useState(false);
  const locationsRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    setAnimate(false);
    const timeout = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLocationsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (locationsRef.current) {
      observer.observe(locationsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="App classy-about-bg home-bg">
      <SiteNavbar />
      <main className="main-content">
        <section className={`hero${animate ? ' fade-in-bottom' : ''}`}> 
          <div className="hero-content-grid">
            <div className="hero-content-main">
              <h1 className={`hero-main-heading${animate ? ' fade-in-bottom' : ''}`}>Lamm & Company CPA</h1>
              <h2 className={`hero-subheading${animate ? ' fade-in-bottom' : ''}`}>Your trusted CPa firm since 1989</h2>
              <p className={`subtitle${animate ? ' fade-in-bottom' : ''}`}>Trusted advisors for businesses and individuals not only across Idaho, but <strong>anywhere in the world</strong>. Six locations, one commitment: your financial success—<strong>wherever you are</strong>.</p>
              <div className={`hero-cta-group${animate ? ' fade-in-bottom' : ''}`}>
                <Link to="/services" className="cta-btn">Explore Our Services</Link>
                <Link to="/pay-bill" className="cta-btn cta-btn-secondary">Pay my bill</Link>
                <Link to="/secure-upload" className="cta-btn cta-btn-secondary">Secure Document Upload</Link>
              </div>
            </div>

            <aside className="hero-announcements" aria-label="Announcements">
              <div className="announcements-card hero-announcements-card">
                <p className="announcements-kicker">What&apos;s New</p>
                <h2>Announcements</h2>
                <ul className="announcements-list">
                  <li>August tax deadlines are now posted in our Tax Calendar.</li>
                  <li>Secure Document Upload is available 24/7 for current clients.</li>
                  <li>Need help quickly? Email us at <a href="mailto:info@lammcocpa.com">info@lammcocpa.com</a>.</li>
                </ul>
              </div>
            </aside>
          </div>
        </section>

        <section className={`remote-highlight-section${animate ? ' fade-in-bottom' : ''}`} aria-label="Remote Services">
          <div className="remote-highlight-card">
            <p className="remote-highlight-kicker">Remote-First Support</p>
            <h2>We Work With Clients Anywhere</h2>
            <p>
              You do not need to live in Idaho to work with us. Lamm &amp; Company provides secure, remote tax and accounting services for individuals and businesses across the United States and internationally.
            </p>
            <Link to="/resources#working-remotely" className="remote-highlight-link">Learn how our remote process works</Link>
          </div>
        </section>

        <section className="mission-section">
          <div className="mission-card mission-card-delay-1">
            <h2>Our Mission</h2>
            <p>
              To provide excellent financial and professional services while maintaining the highest level of professionalism.
              We want to understand the business of our clients and provide services that will help them achieve their
              business and personal financial goals.
            </p>
          </div>
          <div className="values-card mission-card-delay-2">
            <h2>Core Values</h2>
            <p><strong>Our People Matter</strong></p>
            <p>Integrity and Respect - Community - Relationships - Committed - Quality</p>
          </div>
        </section>

        <section className="locations-section" id="locations" ref={locationsRef}>
          <h2 className={locationsVisible ? 'fade-in-bottom' : ''}>Our Idaho Locations</h2>
          <div className="locations-list home-locations-list">
            <a
              href="https://share.google/ZHSlrttd60SkRzbQG"
              target="_blank"
              rel="noopener noreferrer"
              className={`location-card${locationsVisible ? ' fade-in-bottom' : ''}`}
            >
              McCall
            </a>
            <a
              href="https://share.google/YvDbl3CTSWZlQ9vcX"
              target="_blank"
              rel="noopener noreferrer"
              className={`location-card${locationsVisible ? ' fade-in-bottom' : ''}`}
            >
              Grangeville
            </a>
            <a
              href="https://share.google/sv1g7A3yNR8OGALoF"
              target="_blank"
              rel="noopener noreferrer"
              className={`location-card${locationsVisible ? ' fade-in-bottom' : ''}`}
            >
              Fruitland
            </a>
            <a
              href="https://share.google/kTxCndtOhKjkrSdLr"
              target="_blank"
              rel="noopener noreferrer"
              className={`location-card${locationsVisible ? ' fade-in-bottom' : ''}`}
            >
              Emmett
            </a>
            <a
              href="https://share.google/FYp4TdM4WrTPmQjVA"
              target="_blank"
              rel="noopener noreferrer"
              className={`location-card${locationsVisible ? ' fade-in-bottom' : ''}`}
            >
              Weiser
            </a>
            <a
              href="https://share.google/wEQ4Obz6sRiR2Rnvj"
              target="_blank"
              rel="noopener noreferrer"
              className={`location-card${locationsVisible ? ' fade-in-bottom' : ''}`}
            >
              Kuna
            </a>
          </div>
          <p className={`home-locations-contact${locationsVisible ? ' fade-in-bottom' : ''}`}>
            Questions? Need Assistance? Email us at{' '}
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
        </a>
        {' '}
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

export default App;
