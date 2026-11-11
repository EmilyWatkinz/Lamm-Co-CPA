import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import SiteNavbar from './components/SiteNavbar';

function EmployeePortal() {
  const [employeeEmail, setEmployeeEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [timeOffType, setTimeOffType] = useState('Vacation');
  const [hoursRequested, setHoursRequested] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [timeOffStatus, setTimeOffStatus] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    const trimmedEmail = employeeEmail.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setLoginError('Please enter your company email and password.');
      return;
    }

    const companyEmailPattern = /^[A-Za-z0-9._%+\-]+@lammcocpa\.com$/i;
    if (!companyEmailPattern.test(trimmedEmail)) {
      setLoginError('Use your employee email address ending in @lammcocpa.com.');
      return;
    }

    setLoginError('');
    setIsLoggedIn(true);
    setPassword('');
  };

  const handleLogout = () => {
    let shouldLogout = true;

    if (typeof window !== 'undefined' && typeof window.confirm === 'function') {
      try {
        shouldLogout = window.confirm('Are you sure you want to log out?');
      } catch {
        shouldLogout = true;
      }
    }

    if (!shouldLogout) {
      return;
    }

    setIsLoggedIn(false);
    setEmployeeEmail('');
    setPassword('');
    setLoginError('');
  };

  const handleTimeOffSubmit = async (event) => {
    event.preventDefault();

    if (!startDate || !endDate || !hoursRequested || !reason.trim()) {
      setTimeOffStatus('Please complete the hours requested, start date, end date, and reason before submitting.');
      return;
    }

    try {
      const response = await fetch('/api/employee-timeoff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employeeEmail,
          timeOffType,
          hoursRequested,
          startDate,
          endDate,
          reason,
        }),
      });

      const payload = await response.json().catch(() => ({ message: 'Time off request sent.' }));

      if (!response.ok) {
        throw new Error(payload.message || 'Unable to submit time off request.');
      }

      setTimeOffStatus(payload.message || 'Time off request sent successfully.');
      setReason('');
      setHoursRequested('');
      setStartDate('');
      setEndDate('');
    } catch (error) {
      setTimeOffStatus(error.message || 'Unable to submit time off request.');
    }
  };

  return (
    <div className="resources-page classy-about-bg">
      <SiteNavbar blogTo="/blog" />

      <main className="employee-portal-page">
        <section className="employee-portal-hero">
          <p className="employee-portal-kicker">Team Access</p>
          <h1>Employee Portal</h1>
        </section>

        <section className="employee-portal-grid">
          <div className="employee-portal-card employee-login-card slow-fade-up delay-0">
            <h2>Employee Login</h2>
            <form onSubmit={handleLogin} className="employee-login-form">
              <label className="employee-field">
                <span>Employee Email</span>
                <input
                  type="email"
                  value={employeeEmail}
                  onChange={(event) => setEmployeeEmail(event.target.value)}
                  placeholder="Employee email"
                  autoComplete="username"
                />
              </label>

              <label className="employee-field">
                <span>Password</span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Password"
                  autoComplete="current-password"
                />
              </label>

              {loginError && <p className="employee-login-error">{loginError}</p>}

              <button type="submit" className="employee-portal-btn">Log In</button>
            </form>
          </div>

          <div className="employee-portal-card employment-card slow-fade-up delay-1">
            <h2>Join Our Team</h2>
            <div className="employment-card-content">
              <div className="employment-copy">
                <p>We are always looking for talented professionals who want to grow with our firm.</p>
                <a
                  href="mailto:lcolligan@lammcocpa.com?subject=Employment%20Application&body=Hello%20Lamm%20%26%20Company%2C%0D%0A%0D%0AI%20would%20like%20to%20apply%20for%20an%20open%20position.%20Please%20let%20me%20know%20what%20opportunities%20are%20available.%0D%0A%0D%0AThank%20you%2C%0D%0A"
                  className="employee-hiring-link"
                >
                  We&apos;re Hiring
                </a>
              </div>

              <img
                src="/successful-happy-business-team_53876-74892.avif"
                alt="Happy team smiling in the office"
                className="employment-team-image"
              />
            </div>
          </div>
        </section>

        {isLoggedIn && (
          <>
            <section className="employee-portal-authenticated-actions">
              <button type="button" className="employee-portal-btn employee-portal-btn-alt" onClick={handleLogout}>
                Log Out
              </button>
            </section>

            <section className="employee-portal-grid employee-portal-authenticated-grid">
              <div className="employee-portal-card employee-timeoff-card">
                <h2>Request Time Off</h2>
                <form onSubmit={handleTimeOffSubmit} className="employee-timeoff-form">
                  <label className="employee-field">
                    <span>Type</span>
                    <select value={timeOffType} onChange={(event) => setTimeOffType(event.target.value)}>
                      <option value="Vacation">Vacation</option>
                      <option value="Sick">Sick</option>
                      <option value="Personal">Personal</option>
                      <option value="Holiday">Holiday</option>
                    </select>
                  </label>

                  <div className="employee-date-row">
                    <label className="employee-field">
                      <span>Hours requested</span>
                      <input
                        type="number"
                        min="1"
                        step="0.5"
                        value={hoursRequested}
                        onChange={(event) => setHoursRequested(event.target.value)}
                        placeholder="e.g. 8"
                      />
                    </label>

                    <label className="employee-field">
                      <span>Start date</span>
                      <input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} />
                    </label>
                  </div>

                  <div className="employee-date-row">
                    <label className="employee-field">
                      <span>End date</span>
                      <input type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} />
                    </label>
                  </div>

                  <label className="employee-field">
                    <span>Reason</span>
                    <textarea
                      rows="4"
                      value={reason}
                      onChange={(event) => setReason(event.target.value)}
                      placeholder="Brief reason for your request"
                    />
                  </label>

                  <button type="submit" className="employee-portal-btn employee-portal-btn-alt">Request Time Off</button>
                </form>
                <Link to="/resources/documents" className="employee-portal-btn employee-portal-btn-alt employee-portal-docs-link">
                  View Employee Documents
                </Link>
                {timeOffStatus && <p className="employee-login-error">{timeOffStatus}</p>}
              </div>

              <div className="employee-portal-card employee-announcements-card">
                <h2>Employee Updates &amp; Announcements</h2>
                <ul className="employee-announcement-list">
                  <li>Tax season readiness begins in January. Please confirm your availability for busy-season support.</li>
                  <li>We are excited to announce the opening of our new Boise location, expanding access to local support and services.</li>
                  <li>New employee handbooks and policy updates are available in the shared drive.</li>
                </ul>
              </div>
            </section>
          </>
        )}
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
    </div>
  );
}

export default EmployeePortal;
