import React, { useEffect, useState } from 'react';
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
          <article className="blog-post-card">
            <h2>New posts coming soon</h2>
            <p>We are preparing practical tax and business articles for this section. Check back shortly for updates.</p>
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

export default Blog;
