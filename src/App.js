
import './App.css';
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

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

  // Intersection Observer for locations fade-in
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
      <nav className="navbar">
        <div className="nav-logo-group">
          <img src="/Lamm+-+Co+LOGO-162w.webp" alt="Lamm & Company Logo" className="nav-logo-img" />
          <Link to="/" className="nav-logo-text" style={{ textDecoration: 'none' }}>Lamm & Company</Link>
        </div>
        <ul className="nav-list nav-right">
          <li className="nav-item"><Link to="/about">About</Link></li>
          <li className="nav-item"><Link to="/services">Services</Link></li>
          <li className="nav-item"><Link to="/resources">Resources</Link></li>
          <li className="nav-item"><a href="#locations">Locations</a></li>
          <li className="nav-item"><Link to="/reviews">Reviews</Link></li>
          <li className="nav-item"><Link to="/resources#blog">Blog</Link></li>
        </ul>
      </nav>
      <main className="main-content">
        <section className={`hero${animate ? ' fade-in-bottom' : ''}`}> 
          <h1 className={`hero-main-heading${animate ? ' fade-in-bottom' : ''}`}>Lamm & Company</h1>
          <h2 className={animate ? 'fade-in-bottom' : ''}>Expert Accounting for Idaho & Beyond</h2>
          <p className={`subtitle${animate ? ' fade-in-bottom' : ''}`}>Trusted advisors for businesses and individuals not only across Idaho, but anywhere in the world. Six locations, one commitment: your financial success—wherever you are.</p>
          <div className={`hero-cta-group${animate ? ' fade-in-bottom' : ''}`}>
            <Link to="/services" className="cta-btn">Explore Our Services</Link>
            <Link to="/resources#pay-for-services" className="cta-btn cta-btn-secondary">Pay my bill</Link>
            <Link to="/secure-upload" className="cta-btn cta-btn-secondary">Secure Document Upload</Link>
          </div>
        </section>
        <section className="locations-section" id="locations" ref={locationsRef}>
          <h2 className={locationsVisible ? 'fade-in-bottom' : ''}>Our Idaho Locations</h2>
          <div className="locations-list">
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
