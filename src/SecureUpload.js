import React, { useEffect, useState } from 'react';
import './App.css';
import SiteNavbar from './components/SiteNavbar';

function SecureUpload() {
  const [showScroll, setShowScroll] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState('info');
  const uploadEndpoint = process.env.REACT_APP_UPLOAD_API_URL || (window.location.port === '3000'
    ? 'http://localhost:5001/api/secure-upload'
    : '/api/secure-upload');

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 200);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleFileChange = (event) => {
    setUploadComplete(false);
    setSelectedFiles(Array.from(event.target.files || []));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFiles.length) {
      setStatusType('error');
      setStatusMessage('Please choose at least one file to upload.');
      return;
    }

    setIsUploading(true);
    setStatusMessage('');

    try {
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append('files', file);
      });

      if (clientName) formData.append('clientName', clientName);
      if (clientEmail) formData.append('clientEmail', clientEmail);
      if (notes) formData.append('notes', notes);

      const response = await fetch(uploadEndpoint, {
        method: 'POST',
        body: formData,
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload.message || `Upload failed with status ${response.status}`);
      }

      setStatusType('success');
      setStatusMessage(payload.message || 'Upload received and queued for delivery.');
      setUploadComplete(true);
      setSelectedFiles([]);
      setClientName('');
      setClientEmail('');
      setNotes('');
    } catch (error) {
      setStatusType('error');
      setStatusMessage(error.message || 'We could not send the documents by email. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="resources-page classy-about-bg">
      <SiteNavbar blogTo="/blog" />

      <main className="blog-page-wrap">
        <section className="blog-page-hero">
          <h1>Secure Document Upload</h1>
          <p>
            Choose files from your computer and send them directly to our office inbox.
            Your documents are transmitted through a secure server process and emailed to our team.
          </p>
          <form className="secure-upload-form" onSubmit={handleSubmit}>
            <div className="secure-upload-grid">
              <label className="upload-field">
                <span>Name</span>
                <input
                  type="text"
                  value={clientName}
                  onChange={(event) => {
                    setUploadComplete(false);
                    setClientName(event.target.value);
                  }}
                  placeholder="Your name"
                  autoComplete="name"
                />
              </label>
              <label className="upload-field">
                <span>Email</span>
                <input
                  type="email"
                  value={clientEmail}
                  onChange={(event) => {
                    setUploadComplete(false);
                    setClientEmail(event.target.value);
                  }}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </label>
            </div>

            <label className="upload-field upload-field-full">
              <span>Notes</span>
              <textarea
                value={notes}
                onChange={(event) => {
                  setUploadComplete(false);
                  setNotes(event.target.value);
                }}
                placeholder="Optional message about the documents"
                rows={4}
              />
            </label>

            <label className="upload-field upload-field-full file-picker-field">
              <span>Choose documents</span>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.heic,.txt,.csv"
              />
              <small>Accepted files include PDF, Word, Excel, images, text, and CSV files.</small>
            </label>

            <div className="selected-files" aria-live="polite">
              {selectedFiles.length > 0 ? (
                <ul>
                  {selectedFiles.map((file) => (
                    <li key={`${file.name}-${file.size}-${file.lastModified}`}>{file.name}</li>
                  ))}
                </ul>
              ) : (
                <p>No files selected yet.</p>
              )}
            </div>

            <div className="upload-actions">
              <button type="submit" className="cta-btn" disabled={isUploading}>
                {isUploading ? 'Sending...' : uploadComplete ? 'Sent ✓' : 'Send Documents'}
              </button>

            </div>
          </form>
          {statusMessage && <p className={`upload-status upload-status-${statusType}`}>{statusMessage}</p>}
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

export default SecureUpload;
