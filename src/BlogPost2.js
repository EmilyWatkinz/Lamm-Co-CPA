import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import SiteNavbar from './components/SiteNavbar';

function BlogPost2() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 200);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="resources-page classy-about-bg">
      <SiteNavbar blogTo="/blog" />

      <main className="blog-post-page-wrap">
        <Link to="/blog" className="blog-post-back">← Back to Blog</Link>

        <article className="blog-post-article">
          <img
            src="/Second Blog Photo"
            alt="Tax Prep 4 U"
            className="blog-post-hero-img"
          />
          <h1>Tax Prep 4 U</h1>
          <p className="blog-post-byline">By Tyler Lamm</p>
          <p className="blog-post-subtitle">Tax season stress? Let Lamm & Co CPA's make it easy for you!</p>

          <div className="blog-post-body">
            <p>Tax season can be overwhelming, frustrating, and time-consuming. Between gathering documents, navigating ever-changing tax laws, and worrying about making costly mistakes, it's easy to feel stressed. You may be wondering if you're maximizing deductions, filing correctly, or even missing out on refunds you deserve. Instead of spending hours sorting through paperwork and second-guessing your calculations, let Lamm & Co CPA's take the burden off your shoulders.</p>
            <p>We specialize in making tax preparation seamless and stress-free. Our experienced professionals will ensure your taxes are filed accurately and efficiently, helping you keep more of your hard-earned money. Whether you're self-employed, managing investments, or filing for your family, we tailor our services to your unique financial situation. No more guesswork—just expert guidance and peace of mind.</p>
            <p>To get started, gather essential documents like your W-2s, 1099s, mortgage interest statements, and investment income records. If you own a business or are self-employed, bring records of income, expenses, and deductions. If you had major life changes—such as buying a home, having a child, or getting married—those details can impact your return, so be sure to provide relevant documentation. We'll handle the complexities, so you can focus on what matters most.</p>
            <p>At Lamm & Co CPA's, we're not just tax preparers—we're your trusted advisors. Let us simplify your tax season, maximize your refund, and eliminate the frustration. Contact us today to schedule your tax consultation!</p>
          </div>
        </article>
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

export default BlogPost2;
