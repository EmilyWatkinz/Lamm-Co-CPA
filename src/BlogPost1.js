import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import SiteNavbar from './components/SiteNavbar';

function BlogPost1() {
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
            src="/First Blog Photo.webp"
            alt="Setting Up a New Business Correctly"
            className="blog-post-hero-img"
          />
          <h1>Setting Up a New Business Correctly</h1>
          <p className="blog-post-byline">By Lori Colligan</p>
          <p className="blog-post-subtitle">How to financially set up a new business correctly</p>

          <div className="blog-post-body">
            <p>Starting a business on the right financial footing is crucial for long-term success. Here's a step-by-step guide to ensure your business is financially structured correctly from day one.</p>

            <h2>1. Choose the Right Business Structure</h2>
            <p>Selecting the proper legal entity impacts your taxes, liability, and financial flexibility. Common options include:</p>
            <ul>
              <li><strong>Sole Proprietorship</strong> – Simple setup, but personal liability for business debts.</li>
              <li><strong>LLC (Limited Liability Company)</strong> – Protects personal assets while offering flexible tax options.</li>
              <li><strong>S-Corp or C-Corp</strong> – Best for businesses looking for scalability and potential investors.</li>
              <li><strong>Partnership</strong> – Suitable for businesses with multiple owners.</li>
            </ul>
            <p>Consult a CPA or business attorney to determine which structure best suits your needs.</p>

            <h2>2. Register Your Business & Obtain an EIN</h2>
            <ul>
              <li>Register your business with your state government and get any necessary business licenses.</li>
              <li>Apply for an Employer Identification Number (EIN) from the IRS (required for tax filing and opening a business bank account).</li>
              <li>If selling products, register for a state sales tax permit if applicable.</li>
            </ul>

            <h2>3. Open a Business Bank Account</h2>
            <ul>
              <li>Separate your personal and business finances by opening a dedicated business checking account.</li>
              <li>Consider getting a business credit card to build credit and track expenses.</li>
              <li>Establish a business savings account for taxes, emergency funds, and growth investments.</li>
            </ul>

            <h2>4. Set Up Accounting & Bookkeeping Systems</h2>
            <ul>
              <li>Use accounting software like QuickBooks, Xero, or Wave to track income and expenses.</li>
              <li>Maintain organized records of invoices, receipts, and payroll expenses.</li>
              <li>Consider hiring a CPA or bookkeeper to ensure tax compliance and financial accuracy.</li>
            </ul>

            <h2>5. Establish a Budget & Cash Flow Plan</h2>
            <ul>
              <li>Estimate startup costs (licenses, equipment, marketing, rent, etc.).</li>
              <li>Create a monthly budget that includes fixed costs (rent, salaries) and variable costs (marketing, materials).</li>
              <li>Forecast cash flow to ensure you have enough funds to cover expenses as you grow.</li>
            </ul>

            <h2>6. Secure Funding (If Needed)</h2>
            <p>If self-funding isn't enough, explore:</p>
            <ul>
              <li><strong>Business Loans</strong> (SBA loans, bank loans, online lenders).</li>
              <li><strong>Investors</strong> (Angel investors, venture capital).</li>
              <li><strong>Grants & Crowdfunding</strong> (Small business grants, Kickstarter, GoFundMe).</li>
              <li><strong>Business Line of Credit</strong> (Flexible borrowing for short-term cash needs).</li>
            </ul>

            <h2>7. Set Up a Business Tax Strategy</h2>
            <ul>
              <li>Determine your tax obligations (income tax, payroll tax, sales tax).</li>
              <li>Plan for quarterly estimated tax payments to avoid IRS penalties.</li>
              <li>Track deductible expenses (equipment, office space, business travel, advertising).</li>
              <li>Work with a CPA to develop a tax strategy that maximizes deductions and minimizes liability.</li>
            </ul>

            <h2>8. Obtain Business Insurance</h2>
            <ul>
              <li><strong>General Liability Insurance</strong> – Covers accidents, property damage, legal fees.</li>
              <li><strong>Professional Liability Insurance</strong> – Protects against service-related lawsuits.</li>
              <li><strong>Workers' Compensation Insurance</strong> – Required if you have employees.</li>
              <li><strong>Business Interruption Insurance</strong> – Protects against lost income due to unforeseen events.</li>
            </ul>
            <p>Proper insurance safeguards your finances against risks and liabilities.</p>

            <h2>9. Build Business Credit</h2>
            <ul>
              <li>Open a business credit card and pay bills on time.</li>
              <li>Establish trade credit with vendors and suppliers.</li>
              <li>Register with business credit bureaus like Dun & Bradstreet to improve your credit score.</li>
            </ul>
            <p>Good business credit can help secure better loan terms and supplier agreements.</p>

            <h2>10. Monitor and Adjust Your Financial Plan Regularly</h2>
            <ul>
              <li>Review financial statements (profit & loss, balance sheet, cash flow) monthly.</li>
              <li>Track KPIs (Key Performance Indicators) like revenue, expenses, and profit margins.</li>
              <li>Adjust pricing, expenses, and strategies based on financial performance and market trends.</li>
              <li>Work with a financial advisor or CPA to plan for growth and tax efficiency.</li>
            </ul>

            <h2>Final Thoughts</h2>
            <p>Setting up your business finances correctly from the start will save you time, stress, and money in the long run. By keeping personal and business finances separate, staying compliant with tax laws, and planning for growth, you create a solid foundation for success.</p>
            <p>If you need expert guidance, Lamm & Co CPA's is here to help with tax planning, bookkeeping, financial forecasting, and compliance—so you can focus on growing your business with confidence!</p>
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

export default BlogPost1;
