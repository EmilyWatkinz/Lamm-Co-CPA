import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function SiteNavbar({ blogTo = '/resources#blog' }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [menuOpen]);

  useEffect(() => {
    document.body.classList.toggle('mobile-menu-open', menuOpen);
    return () => document.body.classList.remove('mobile-menu-open');
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="nav-logo-group">
        <img src="/Lamm+-+Co+LOGO-162w.webp" alt="Lamm & Company Logo" className="nav-logo-img" />
        <Link to="/" className="nav-logo-text" style={{ textDecoration: 'none' }} onClick={closeMenu}>
          Lamm & Company
        </Link>
      </div>

      <button
        type="button"
        className={`nav-menu-btn${menuOpen ? ' is-open' : ''}`}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        <span className="nav-menu-btn-bar" />
        <span className="nav-menu-btn-bar" />
        <span className="nav-menu-btn-bar" />
      </button>

      <ul id="primary-navigation" className={`nav-list nav-right${menuOpen ? ' nav-list-open' : ''}`}>
        <li className="nav-item"><Link to="/about" onClick={closeMenu}>About</Link></li>
        <li className="nav-item"><Link to="/services" onClick={closeMenu}>Services</Link></li>
        <li className="nav-item"><Link to="/resources" onClick={closeMenu}>Resources</Link></li>
        <li className="nav-item"><Link to="/locations" onClick={closeMenu}>Locations</Link></li>
        <li className="nav-item"><Link to="/reviews" onClick={closeMenu}>Reviews</Link></li>
        <li className="nav-item"><Link to={blogTo} onClick={closeMenu}>Blog</Link></li>
      </ul>

      {menuOpen && <button type="button" className="nav-overlay" aria-label="Close menu" onClick={closeMenu} />}
    </nav>
  );
}

export default SiteNavbar;
