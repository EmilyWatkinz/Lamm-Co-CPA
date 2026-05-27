import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const baseReviews = [
  {
    quote:
      'Tyler was very helpful and personable. He was sure to answer all of our questions during the consultation and worked promptly to meet our timeframe. The office was very comfortable and the staff were kind and welcoming.',
    author: 'Serena Henry',
  },
  {
    quote:
      'Anytime I have questions, concerns or last minute issues, it takes one simple call and Lamm & Co is there to the rescue. Seriously a tax superhero. Recommend them to anyone. Their rates, customer service, and tax support are 5 star!',
    author: 'Pamela Vasquez',
  },
  {
    quote:
      'I have had great experiences with Lamm & Co doing my taxes the last few years. They have been completed in a timely manner and the customer service has been excellent. Highly recommend!',
    author: 'McKaylee Robison',
  },
  {
    quote:
      'Used Lamm and Co this year and had the honor to work with Jolene. She was able to get my taxes done fast. The whole process was super comfortable and she made sure to get most our money back. Will be using them in the future. Thank you!',
    author: 'Flingem Ingham',
  },
  {
    quote:
      'Seriously can thank these guys enough. Tyler and Barrett helped my wife and I out of an ugly tax situation. We have gone to them for 2 years now and we have received awesome returns! If you want your taxes done correctly and fast there is not a better option!',
    author: 'Garrett Henderson',
  },
];

const GOOGLE_REVIEW_URL = 'https://share.google/8igRpqd2HglNZCrFC';

function Reviews() {
  const [showScroll, setShowScroll] = useState(false);
  const [allReviews, setAllReviews] = useState(baseReviews);
  const [visibleCount, setVisibleCount] = useState(window.innerWidth <= 700 ? 1 : 3);
  const [carouselGap, setCarouselGap] = useState(window.innerWidth <= 700 ? 0.8 : 1);
  const [displayIndex, setDisplayIndex] = useState(window.innerWidth <= 700 ? 1 : 3);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isSliding, setIsSliding] = useState(false);
  const [slideStep, setSlideStep] = useState(0);
  const [formName, setFormName] = useState('');
  const [formRating, setFormRating] = useState(0);
  const [formReview, setFormReview] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');
  const viewportRef = useRef(null);
  const carouselItems = [
    ...allReviews.slice(-visibleCount),
    ...allReviews,
    ...allReviews.slice(0, visibleCount),
  ];

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem('lammUserReviews');
      if (!stored) return;

      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        setAllReviews([...parsed, ...baseReviews]);
      }
    } catch {
      setAllReviews(baseReviews);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 200);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 700;
      setVisibleCount(isMobile ? 1 : 3);
      setCarouselGap(isMobile ? 0.8 : 1);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setDisplayIndex(visibleCount);
    setTransitionEnabled(true);
    setIsSliding(false);
  }, [visibleCount, allReviews.length]);

  useEffect(() => {
    const measureSlideStep = () => {
      if (!viewportRef.current) return;

      const viewportWidth = viewportRef.current.clientWidth;
      const gapPx = carouselGap * 16;
      const cardWidth = (viewportWidth - gapPx * (visibleCount - 1)) / visibleCount;
      setSlideStep(cardWidth + gapPx);
    };

    measureSlideStep();
    window.addEventListener('resize', measureSlideStep);
    return () => window.removeEventListener('resize', measureSlideStep);
  }, [visibleCount, carouselGap]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const goPrev = () => {
    if (isSliding) return;
    setIsSliding(true);
    setDisplayIndex((prev) => prev - 1);
  };

  const goNext = () => {
    if (isSliding) return;
    setIsSliding(true);
    setDisplayIndex((prev) => prev + 1);
  };

  const handleTransitionEnd = (event) => {
    if (event.propertyName !== 'transform') return;

    const firstRealIndex = visibleCount;
    const lastRealIndex = visibleCount + allReviews.length - 1;
    setIsSliding(false);

    let normalizedIndex = displayIndex;

    if (displayIndex < firstRealIndex) {
      normalizedIndex = displayIndex + allReviews.length;
    }

    if (displayIndex > lastRealIndex) {
      normalizedIndex = displayIndex - allReviews.length;
    }

    if (normalizedIndex !== displayIndex) {
      setTransitionEnabled(false);
      setDisplayIndex(normalizedIndex);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setTransitionEnabled(true));
      });
    }
  };

  const handleSubmitReview = (event) => {
    event.preventDefault();

    const trimmedName = formName.trim();
    const trimmedReview = formReview.trim();

    if (!trimmedName || !trimmedReview) {
      setSubmitMessage('Please add your name and review before submitting.');
      return;
    }

    if (Number(formRating) < 1) {
      setSubmitMessage('Please select a star rating before submitting.');
      return;
    }

    const newReview = {
      quote: trimmedReview,
      author: trimmedName,
      rating: Number(formRating) || 5,
    };

    const userReviews = [newReview, ...allReviews.filter((item) => item.userSubmitted)];
    const normalizedUserReviews = userReviews.map((item) => ({ ...item, userSubmitted: true }));
    window.localStorage.setItem('lammUserReviews', JSON.stringify(normalizedUserReviews));

    setAllReviews([newReview, ...allReviews]);
    setFormName('');
    setFormRating(0);
    setFormReview('');
    setSubmitMessage('Thank you. Your review is now shown on this page. Next, please submit it to Google in the tab that opens.');
    setDisplayIndex(visibleCount);

    window.open(GOOGLE_REVIEW_URL, '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    const revealNodes = Array.from(document.querySelectorAll(
      '.reviews-page-wrap .reviews-hero, .reviews-page-wrap .review-actions'
    ));

    revealNodes.forEach((node) => node.classList.add('reveal-on-scroll'));

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
      <nav className="navbar">
        <div className="nav-logo-group">
          <img src="/Lamm+-+Co+LOGO-162w.webp" alt="Lamm & Company Logo" className="nav-logo-img" />
          <Link to="/" className="nav-logo-text" style={{ textDecoration: 'none' }}>Lamm & Company</Link>
        </div>
        <ul className="nav-list nav-right">
          <li className="nav-item"><Link to="/about">About</Link></li>
          <li className="nav-item"><Link to="/services">Services</Link></li>
          <li className="nav-item"><Link to="/resources">Resources</Link></li>
          <li className="nav-item"><Link to="/locations">Locations</Link></li>
          <li className="nav-item"><Link to="/reviews">Reviews</Link></li>
          <li className="nav-item"><Link to="/resources#blog">Blog</Link></li>
        </ul>
      </nav>

      <main className="reviews-page-wrap">
        <section className="reviews-hero">
          <div className="reviews-hero-content">
            <h1>See why our clients love us!</h1>
            <p>Real feedback from clients who trust Lamm & Company for dependable, high-quality accounting support.</p>
          </div>
          <img src="/Love Reviews.jpg" alt="Love Reviews" className="reviews-hero-image" />
        </section>

        <section className="reviews-section reviews-section-page" aria-label="Client reviews">
          <div className="reviews-carousel">
            <button
              type="button"
              className="review-carousel-arrow"
              onClick={goPrev}
              aria-label="Previous review"
            >
              &#10094;
            </button>
            <div className="reviews-viewport" ref={viewportRef}>
              <div
                className="reviews-track"
                onTransitionEnd={handleTransitionEnd}
                style={{
                  transform: slideStep > 0 ? `translateX(-${displayIndex * slideStep}px)` : 'translateX(0)',
                  transition: transitionEnabled ? undefined : 'none',
                }}
              >
                {carouselItems.map((review, index) => (
                  <article className="review-card review-card-carousel" key={`${review.author}-${index}`}>
                    <div className="review-stars" aria-label={`${review.rating || 5} star review`}>{'★'.repeat(review.rating || 5)}</div>
                    <p>"{review.quote}"</p>
                    <div className="review-author">- {review.author}</div>
                  </article>
                ))}
              </div>
            </div>
            <button
              type="button"
              className="review-carousel-arrow"
              onClick={goNext}
              aria-label="Next review"
            >
              &#10095;
            </button>
          </div>
          <div className="review-actions">
            <a
              href="https://www.google.com/search?q=Lamm+%26+Company+CPA+Reviews&rlz=1C1QYVO_enUS1184US1184&oq=Lamm+%26+Company+CPA+Reviews&gs_lcrp=EgZjaHJvbWUyCggAEEUYFhgeGDkyCAgBEAAYFhgeMgoIAhAAGIAEGKIEMgcIAxAAGO8FMgoIBBAAGIAEGKIEMgcIBRAAGO8F0gEJMTExOTBqMGo5qAIGsAIB8QWD3akd7xhhRQ&sourceid=chrome&ie=UTF-8#sv=CAESzQEKuQEStgEKd0FNbjMteVFBdUxfSnVBSFRhRS1VMlY0OXRIWUx5Z0NadHFtdXJ0Y0tSRXV6ejQ1djhnRGh1d0FyR3BsNmFZWENyZVNKa2ZVaHhYSmRxbFkyaXFtcFVYakx1WDFheWNyQ3lBWE9hU1RsOWhHTVpkOWF4a2J4LVVJEhdEeDhYYXFHTE1leU04TDBQMllhOXdBcxoiQUpLTEZtTFIwcllPSk9TMHNLbktZdVlvb1ZHa0FXeUNtdxIEODA1MRoBMyoAMAA4AUAAGAAgltvVmAtKAhAC"
              target="_blank"
              rel="noopener noreferrer"
              className="review-action-btn"
            >
              More Reviews
            </a>
          </div>

          <section className="review-form-wrap" aria-label="Write a review form">
            <h2>Write a review - We love hearing from you!</h2>
            <form className="review-form" onSubmit={handleSubmitReview}>
              <label htmlFor="reviewer-name">Name</label>
              <input
                id="reviewer-name"
                type="text"
                value={formName}
                onChange={(event) => setFormName(event.target.value)}
                placeholder="Your name"
                required
              />

              <label htmlFor="review-stars-picker">Stars</label>
              <div
                id="review-stars-picker"
                className="review-stars-picker"
                role="radiogroup"
                aria-label="Select a star rating"
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`review-star-btn${star <= formRating ? ' is-selected' : ''}`}
                    onClick={() => setFormRating(star)}
                    role="radio"
                    aria-checked={formRating === star}
                    aria-label={`${star} star${star > 1 ? 's' : ''}`}
                  >
                    {star <= formRating ? '★' : '☆'}
                  </button>
                ))}
              </div>

              <label htmlFor="review-text">Your Review</label>
              <textarea
                id="review-text"
                value={formReview}
                onChange={(event) => setFormReview(event.target.value)}
                placeholder="Share your experience"
                rows={5}
                required
              />

              <button type="submit" className="review-action-btn review-submit-btn">Submit Review</button>
            </form>
            {submitMessage && <p className="review-submit-message">{submitMessage}</p>}
          </section>
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

export default Reviews;