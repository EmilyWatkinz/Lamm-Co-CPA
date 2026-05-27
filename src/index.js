import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

const App = lazy(() => import('./App'));
const About = lazy(() => import('./About'));
const Services = lazy(() => import('./Services'));
const Resources = lazy(() => import('./Resources'));
const Blog = lazy(() => import('./Blog'));
const SecureUpload = lazy(() => import('./SecureUpload'));
const PayBill = lazy(() => import('./PayBill'));
const Reviews = lazy(() => import('./Reviews'));
const TaxCalendar = lazy(() => import('./TaxCalendar'));
const Locations = lazy(() => import('./Locations'));

function PageLoadingState() {
  return (
    <div className="route-loading-state" role="status" aria-live="polite" aria-label="Loading page">
      <div className="route-loading-card">
        <div className="route-loading-spinner" aria-hidden="true" />
        <p>Loading your page...</p>
        <div className="route-loading-shimmer" aria-hidden="true" />
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<PageLoadingState />}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/secure-upload" element={<SecureUpload />} />
          <Route path="/pay-bill" element={<PayBill />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/tax-calendar" element={<TaxCalendar />} />
          <Route path="/locations" element={<Locations />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
