import React, { useEffect, useState } from 'react';
import './App.css';
import SiteNavbar from './components/SiteNavbar';

const paymentEmail = 'ar@lammcocpa.com';

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  company: '',
  amountDue: '',
  notes: '',
};

function PayBill() {
  const [showScroll, setShowScroll] = useState(false);
  const [formData, setFormData] = useState(initialForm);
  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 200);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const lines = [
      'Payment link request',
      '',
      `Full Name: ${formData.fullName}`,
      `Email Address: ${formData.email}`,
      `Phone Number: ${formData.phone}`,
      `Business or Client Name: ${formData.company}`,
      `Amount Due: ${formData.amountDue}`,
      `Additional Notes: ${formData.notes || 'None provided'}`,
    ];

    const subject = encodeURIComponent('Payment link request');
    const body = encodeURIComponent(lines.join('\n'));

    window.location.href = `mailto:${paymentEmail}?subject=${subject}&body=${body}`;
    setRequestSent(true);
    setFormData(initialForm);
  };

  return (
    <div className="resources-page classy-about-bg">
      <SiteNavbar blogTo="/blog" />

      <main className="blog-page-wrap">
        <section className="blog-page-hero">
          <h1>Pay Your Bill</h1>
          <p>Request a secure payment link and our accounts team will follow up with the details you need.</p>
        </section>

        <section className="review-form-wrap" aria-label="Payment link request form">
          <h2>Request Link for Payment</h2>
          <form className="review-form" onSubmit={handleSubmit}>
            <label htmlFor="payment-full-name">Full Name</label>
            <input
              id="payment-full-name"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Your full name"
              required
            />

            <label htmlFor="payment-email">Email Address</label>
            <input
              id="payment-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />

            <label htmlFor="payment-phone">Phone Number</label>
            <input
              id="payment-phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(208) 555-0123"
              required
            />

            <label htmlFor="payment-company">Business or Client Name</label>
            <input
              id="payment-company"
              name="company"
              type="text"
              value={formData.company}
              onChange={handleChange}
              placeholder="Business or client name"
              required
            />

            <label htmlFor="payment-amount">Amount Due</label>
            <input
              id="payment-amount"
              name="amountDue"
              type="text"
              value={formData.amountDue}
              onChange={handleChange}
              placeholder="$0.00"
              required
            />

            <label htmlFor="payment-notes">Additional Notes</label>
            <textarea
              id="payment-notes"
              name="notes"
              rows={4}
              value={formData.notes}
              onChange={handleChange}
              placeholder="Anything we should know before sending the payment link?"
            />

            <button type="submit" className="review-action-btn review-submit-btn">Request Link for Payment</button>
          </form>

          {requestSent && (
            <p className="review-submit-message">
              Your payment request is ready to send. Please complete the email prompt to send it to {paymentEmail}.
            </p>
          )}
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

export default PayBill;
