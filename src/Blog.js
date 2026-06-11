import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import SiteNavbar from './components/SiteNavbar';

function Blog() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 200);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  useEffect(() => {
    const revealNodes = Array.from(document.querySelectorAll(
      '.blog-page-wrap .blog-page-hero, .blog-page-wrap .blog-post-card'
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
      <SiteNavbar blogTo="/blog" />

      <main className="blog-page-wrap">
        <section className="blog-page-hero">
          <h1>Blog</h1>
          <p>Fresh tax and financial guidance from the Lamm & Co CPA team.</p>
        </section>

        <section className="blog-posts-grid" aria-label="Blog posts">
          <Link to="/blog/setting-up-new-business" className="blog-card-link">
            <article className="blog-post-card blog-card-clickable">
              <img src="/First Blog Photo.webp" alt="Setting Up a New Business Correctly" className="blog-card-img" />
              <div className="blog-card-body">
                <h2>Setting Up a New Business Correctly</h2>
                <p className="blog-card-byline">By Lori Colligan</p>
                <span className="blog-card-read-more">Read More →</span>
              </div>
            </article>
          </Link>
          <Link to="/blog/tax-prep-4-u" className="blog-card-link">
            <article className="blog-post-card blog-card-clickable">
              <img src="/Second Blog Photo" alt="Tax Prep 4 U" className="blog-card-img" />
              <div className="blog-card-body">
                <h2>Tax Prep 4 U</h2>
                <p className="blog-card-byline">By Tyler Lamm</p>
                <span className="blog-card-read-more">Read More →</span>
              </div>
            </article>
          </Link>
          <Link to="/blog/how-do-i-file" className="blog-card-link">
            <article className="blog-post-card blog-card-clickable">
              <img src="/Third Blog Photo.png" alt="How do I file?" className="blog-card-img" />
              <div className="blog-card-body">
                <h2>How do I file?</h2>
                <p className="blog-card-byline">By the Internal Revenue Service</p>
                <span className="blog-card-read-more">Read More →</span>
              </div>
            </article>
          </Link>
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

export default Blog;
