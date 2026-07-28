import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import About from './About';
import Services from './Services';
import Resources from './Resources';
import DownloadableDocuments from './DownloadableDocuments';
import Blog from './Blog';
import BlogPost1 from './BlogPost1';
import BlogPost2 from './BlogPost2';
import BlogPost3 from './BlogPost3';
import SecureUpload from './SecureUpload';
import PayBill from './PayBill';
import Reviews from './Reviews';
import TaxCalendar from './TaxCalendar';
import Locations from './Locations';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/resources/documents" element={<DownloadableDocuments />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/setting-up-new-business" element={<BlogPost1 />} />
        <Route path="/blog/tax-prep-4-u" element={<BlogPost2 />} />
        <Route path="/blog/how-do-i-file" element={<BlogPost3 />} />
        <Route path="/secure-upload" element={<SecureUpload />} />
        <Route path="/pay-bill" element={<PayBill />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/tax-calendar" element={<TaxCalendar />} />
        <Route path="/locations" element={<Locations />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
