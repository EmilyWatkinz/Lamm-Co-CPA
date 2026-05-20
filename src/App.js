
import './App.css';
import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

function App() {
  const [showScroll, setShowScroll] = useState(false);
  const location = useLocation();
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

  // Smooth scroll to services section if on home, else go home and then scroll
  const handleServicesClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      const section = document.getElementById("services");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.location.href = "/#services";
    }
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
    <div className="App classy-about-bg">
      <nav className="navbar">
        <div className="nav-logo-group">
          <img src="/Lamm+-+Co+LOGO-162w.webp" alt="Lamm & Company Logo" className="nav-logo-img" />
          <Link to="/" className="nav-logo-text" style={{ textDecoration: 'none' }}>Lamm & Company</Link>
        </div>
        <ul className="nav-list nav-right">
          <li className="nav-item"><Link to="/about">About</Link></li>
          <li className="nav-item"><a href="#services" onClick={handleServicesClick}>Services</a></li>
          <li className="nav-item"><a href="#resources">Resources</a></li>
          <li className="nav-item"><a href="#locations">Locations</a></li>
          <li className="nav-item"><a href="#reviews">Reviews</a></li>
          <li className="nav-item"><a href="#blog">Blog</a></li>
        </ul>
      </nav>
      <main className="main-content">
        <section className={`hero${animate ? ' fade-in-bottom' : ''}`}> 
          <h1 className={`hero-main-heading${animate ? ' fade-in-bottom' : ''}`}>Lamm & Company</h1>
          <h2 className={animate ? 'fade-in-bottom' : ''}>Expert Accounting for Idaho & Beyond</h2>
          <p className={`subtitle${animate ? ' fade-in-bottom' : ''}`}>Trusted advisors for businesses and individuals not only across Idaho, but anywhere in the world. Six locations, one commitment: your financial success—wherever you are.</p>
          <a href="#services" className={`cta-btn${animate ? ' fade-in-bottom' : ''}`} onClick={handleServicesClick}>Explore Our Services</a>
        </section>
        <section className="locations-section" id="locations" ref={locationsRef}>
          <h2 className={locationsVisible ? 'fade-in-bottom' : ''}>Our Idaho Locations</h2>
          <div className="locations-list">
            <div className={`location-card${locationsVisible ? ' fade-in-bottom' : ''}`}>McCall</div>
            <div className={`location-card${locationsVisible ? ' fade-in-bottom' : ''}`}>Grangeville</div>
            <div className={`location-card${locationsVisible ? ' fade-in-bottom' : ''}`}>Emmett</div>
            <div className={`location-card${locationsVisible ? ' fade-in-bottom' : ''}`}>Weiser</div>
            <div className={`location-card${locationsVisible ? ' fade-in-bottom' : ''}`}>Fruitland</div>
            <div className={`location-card${locationsVisible ? ' fade-in-bottom' : ''}`}>Kuna</div>
          </div>
        </section>
      </main>
      <footer className="footer">
        &copy; {new Date().getFullYear()} Lamm & Company. All rights reserved.
      </footer>
      {showScroll && (
        <button className="scroll-to-top" onClick={scrollToTop} aria-label="Scroll to top">
          &#8593;
        </button>
      )}
    </div>
  );
}

export default App;
