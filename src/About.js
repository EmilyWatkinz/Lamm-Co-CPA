import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './App.css';

export default function About() {
  const location = useLocation();
  const [animate, setAnimate] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState('Management');
  const teams = [
    'Management',
    'Tax Team',
    'Accounting Team',
    'Payroll Team',
    'Admin Team',
  ];
  // Smooth scroll to services section if on home, else go home and then scroll
  const handleServicesClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      const section = document.getElementById("services");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.location.href = "/#services";
    }
  };

  useEffect(() => {
    setAnimate(false);
    const timeout = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <div className="about-page classy-about-bg">
      <nav className="navbar">
        <div className="nav-logo-group">
          <img src="/Lamm+-+Co+LOGO-162w.webp" alt="Lamm & Company Logo" className="nav-logo-img" />
          <Link to="/" className="nav-logo-text" style={{ textDecoration: 'none' }}>Lamm & Company</Link>
        </div>
        <ul className="nav-list nav-right">
          <li className="nav-item"><Link to="/about">About</Link></li>
          <li className="nav-item"><a href="#services" onClick={handleServicesClick}>Services</a></li>
          <li className="nav-item"><a href="#resources">Resources</a></li>
          <li className="nav-item"><a href="#locations">Locations</a></li>
          <li className="nav-item"><a href="#reviews">Reviews</a></li>
          <li className="nav-item"><a href="#blog">Blog</a></li>
        </ul>
      </nav>

      <div className={`about-content${animate ? ' fade-in-bottom' : ''}`}>
        <img
          src="/Staff+minus+Barrett-2880w.webp" 
          alt="Lamm & Company Staff" 
          className={`about-hero-img${animate ? ' fade-in-bottom' : ''}`}
        />
        <h2 className={`about-title${animate ? ' fade-in-bottom' : ''}`}>Meet our Team</h2>
        <div className={`about-description${animate ? ' fade-in-bottom' : ''}`}>
          We service clients throughout the state of Idaho as well as different parts of the country. Many of our clients are farmers or small business owners. We want to relate to our clients on their level and help them achieve their goals by providing top-shelf service and advice. We are a growing company, come grow with us and let us build a long-lasting business relationship.
        </div>
        {/* Team selection squares */}
        <div className="team-button-group fade-in-bottom">
          {teams.map((team) => (
            <button
              key={team}
              className={`team-btn${selectedTeam === team ? ' selected' : ''}`}
              onClick={() => setSelectedTeam(team)}
              tabIndex={0}
              aria-pressed={selectedTeam === team}
            >
              {team}
            </button>
          ))}
        </div>
        {/* Accounting Team cards */}
        {selectedTeam === 'Accounting Team' && (
          <div className="team-cards-container slow-fade" style={{ flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', display: 'flex', marginTop: '2rem' }}>
            {/* Rebecca Balken */}
            <div className="team-card slow-fade-up delay-0">
              <img src="/Rebecca-Pic.webp" alt="Rebecca Balken" className="team-card-img" />
              <div className="team-card-title">Rebecca Balken</div>
              <div className="team-card-role">Accounting Associate III</div>
              <div className="team-card-bio">
                {["Rebecca is an experienced Accounting Associate III at Lamm & Company.",
                  "She is dedicated to providing accurate and timely accounting services to clients.",
                  "Fun fact: Rebecca enjoys hiking and spending time with her family."]
                  .map((para, i) => (
                    <p key={i} style={{ margin: i === 0 ? 0 : '1em 0 0 0' }}>{para}</p>
                  ))}
              </div>
            </div>
            {/* Kelsey Ritch */}
            <div className="team-card slow-fade-up delay-1">
              <img src="/Kelsey-Pic.webp" alt="Kelsey Ritch" className="team-card-img" />
              <div className="team-card-title">Kelsey Ritch</div>
              <div className="team-card-role">Accounting Associate II</div>
              <div className="team-card-bio">
                {["Kelsey is an Accounting Associate II who values teamwork and client service.",
                  "She is passionate about helping clients with their accounting needs.",
                  "Fun fact: Kelsey loves to travel and try new foods."]
                  .map((para, i) => (
                    <p key={i} style={{ margin: i === 0 ? 0 : '1em 0 0 0' }}>{para}</p>
                  ))}
              </div>
            </div>
            {/* Mayson Bell */}
            <div className="team-card slow-fade-up delay-2">
              <img src="/NoPic-Pic.webp" alt="Mayson Bell" className="team-card-img" />
              <div className="team-card-title">Mayson Bell</div>
              <div className="team-card-role">Accounting Associate I</div>
              <div className="team-card-bio">
                {["Mayson is an Accounting Associate I and a valued member of the team.",
                  "He is eager to learn and grow in the accounting field.",
                  "Fun fact: Mayson enjoys playing guitar and outdoor adventures."]
                  .map((para, i) => (
                    <p key={i} style={{ margin: i === 0 ? 0 : '1em 0 0 0' }}>{para}</p>
                  ))}
              </div>
            </div>
            {/* Jolene Johnson */}
            <div className="team-card slow-fade-up delay-3">
              <img src="/Jolene-Pic.webp" alt="Jolene Johnson" className="team-card-img" />
              <div className="team-card-title">Jolene Johnson</div>
              <div className="team-card-role">Accounting Specialist</div>
              <div className="team-card-bio">
                {["Jolene is an Accounting Specialist with a keen eye for detail.",
                  "She enjoys helping clients solve their accounting challenges.",
                  "Fun fact: Jolene is a talented baker and loves to share her creations."]
                  .map((para, i) => (
                    <p key={i} style={{ margin: i === 0 ? 0 : '1em 0 0 0' }}>{para}</p>
                  ))}
              </div>
            </div>
          </div>
        )}
        {/* Tax Team cards */}
        {selectedTeam === 'Tax Team' && (
          <div className="team-cards-container slow-fade" style={{ flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', display: 'flex', marginTop: '2rem' }}>
            {/* Tammi Cox */}
            <div className="team-card slow-fade-up delay-0">
              <img src="/Tammie-Pic.webp" alt="Tammi Cox" className="team-card-img" />
              <div className="team-card-title">Tammi Cox</div>
              <div className="team-card-role">Senior Associate | Enrolled Agent</div>
              <div className="team-card-bio">
                {["Tammi has been with Lamm & Company for several years.",
                  "She is an Enrolled Agent and Senior Associate, specializing in tax matters.",
                  "Fun fact: Tammi loves hiking and spending time with her family."]
                  .map((para, i) => (
                    <p key={i} style={{ margin: i === 0 ? 0 : '1em 0 0 0' }}>{para}</p>
                  ))}
              </div>
            </div>
            {/* Jordyn Barnes */}
            <div className="team-card slow-fade-up delay-1">
              <img src="/NoPic-Pic.webp" alt="Jordyn Barnes" className="team-card-img" />
              <div className="team-card-title">Jordyn Barnes</div>
              <div className="team-card-role">Tax Associate II</div>
              <div className="team-card-bio">
                {["Jordyn has been with the company since 2026.",
                  "So far she has enjoyed being a part of a team that is collaborative, encouraging, and committed to doing great work.",
                  "A fun fact about Jordyn is that she loves going on road trips and finding unique antiques and vintage pieces at antique stores and thrift shops."]
                  .map((para, i) => (
                    <p key={i} style={{ margin: i === 0 ? 0 : '1em 0 0 0' }}>{para}</p>
                  ))}
              </div>
            </div>
            {/* Brookelyn Rohrbacher */}
            <div className="team-card slow-fade-up delay-2">
              <img src="/NoPic-Pic.webp" alt="Brookelyn Rohrbacher" className="team-card-img" />
              <div className="team-card-title">Brookelyn Rohrbacher</div>
              <div className="team-card-role">Tax Associate I</div>
              <div className="team-card-bio">
                {["Brookelyn has been with the company since the beginning of 2026.",
                  "Her favorite part about being a part of the Lamm team is the relationships she's built with her coworkers, along with being part of a firm that values integrity and honest work for their clients.",
                  "An interesting fact about Brookelyn is that she has farmed her entire life. When she's not farming, she loves to bake and enjoys finding time to be creative in the kitchen."]
                  .map((para, i) => (
                    <p key={i} style={{ margin: i === 0 ? 0 : '1em 0 0 0' }}>{para}</p>
                  ))}
              </div>
            </div>
          </div>
        )}
        {/* Management team cards */}
      {selectedTeam === 'Management' && (
        <div className="team-cards-container slow-fade" style={{ flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', width: '100%', marginBottom: '2rem', flexWrap: 'wrap' }}>
            {/* Barrett left */}
            <div className="team-card slow-fade-up delay-0">
              <img src="/Barrett-Pic.webp" alt="Barrett Lamm" className="team-card-img" />
              <div className="team-card-title">Barrett Lamm</div>
              <div className="team-card-role">President</div>
              <div className="team-card-bio">
                {`Barrett grew up in McCall and started his accounting journey at his dad’s CPA firm. After earning his Accounting degree from Boise State and his CPA license, he took over the family practice in 2014 and expanded it in 2017.

Outside the office, Barrett enjoys time with his wife and kids, outdoor activities, woodworking, and volunteering in the community.`.split('\n').map((para, i) => (
                  <p key={i} style={{ margin: i === 0 ? 0 : '1em 0 0 0' }}>{para}</p>
                ))}
              </div>
            </div>
            {/* Tyler right */}
            <div className="team-card slow-fade-up delay-1">
              <img src="/Tyler-Pic.webp" alt="Tyler Lamm" className="team-card-img" />
              <div className="team-card-title">Tyler Lamm</div>
              <div className="team-card-role">Vice President</div>
              <div className="team-card-bio">
                {`Tyler is a co-owner of Lamm & Company with a strong background in accounting and real-world experience. He earned his Masters in Accounting from BYU and worked at a Big Four firm before joining Lamm & Company.

Tyler provides practical guidance to clients and enjoys spending time outdoors with his family.`.split('\n').map((para, i) => (
                  <p key={i} style={{ margin: i === 0 ? 0 : '1em 0 0 0' }}>{para}</p>
                ))}
              </div>
            </div>
          </div>
          {/* Derek below, centered */}
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <div className="team-card slow-fade-up delay-2">
              <img src="/Derek-Pic.webp" alt="Derek Reis" className="team-card-img" />
              <div className="team-card-title">Derek Reis</div>
              <div className="team-card-role">Senior Manager</div>
              <div className="team-card-bio">
                {`Derek has been with Lamm & Company for five years. His favorite thing about the company is the teamwork and dedication to staff.

In his free time, Derek loves spending time with his big family—he has five children and counting!`.split('\n').map((para, i) => (
                  <p key={i} style={{ margin: i === 0 ? 0 : '1em 0 0 0' }}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Admin Team cards */}
      {selectedTeam === 'Admin Team' && (
        <div className="team-cards-container slow-fade" style={{ flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', display: 'flex', marginTop: '2rem' }}>
          {/* Sharon King */}
          <div className="team-card slow-fade-up delay-0">
            <img src="/Sharon-Pic.webp" alt="Sharon King" className="team-card-img" />
            <div className="team-card-title">Sharon King</div>
            <div className="team-card-role">Admin Associate II</div>
            <div className="team-card-bio">
              {[
                "Sharon has been with the company since September 2024.",
                "Her favorite thing about working here is a tight race between the fantastic people she works with and the opportunities to grow both personally and professionally.",
                "Fun fact: If she's not working, she's probably outside or buried in a book pretending she's outside."
              ].map((para, i) => (
                <p key={i} style={{ margin: i === 0 ? 0 : '1em 0 0 0' }}>{para}</p>
              ))}
            </div>
          </div>
          {/* Natalee Stone */}
          <div className="team-card slow-fade-up delay-1">
            <img src="/NoPic-Pic.webp" alt="Natalee Stone" className="team-card-img" />
            <div className="team-card-title">Natalee Stone</div>
            <div className="team-card-role">Admin Associate I</div>
            <div className="team-card-bio">
              {[
                "Natalee started with Lamm & Company in February of 2026.",
                "Her favorite thing about working here is getting to help clients feel taken care of and making the process easier for them.",
                "Fun fact: Natalee has a serious love for cozy nights and a good movie or book."
              ].map((para, i) => (
                <p key={i} style={{ margin: i === 0 ? 0 : '1em 0 0 0' }}>{para}</p>
              ))}
            </div>
          </div>
          {/* Chris Heidbrink */}
          <div className="team-card slow-fade-up delay-2">
            <img src="/Chris-Pic.webp" alt="Chris Heidbrink" className="team-card-img" />
            <div className="team-card-title">Chris Heidbrink</div>
            <div className="team-card-role">Admin Associate I</div>
            <div className="team-card-bio">
              {[
                "Chris has been a valued member of Lamm & Company for four years.",
                "He truly appreciates the welcoming, small-office atmosphere that comes with working for Lamm & Company.",
                "Outside of work, Chris enjoys juggling—a unique talent!"
              ].map((para, i) => (
                <p key={i} style={{ margin: i === 0 ? 0 : '1em 0 0 0' }}>{para}</p>
              ))}
            </div>
          </div>
          {/* Rhonda Stockton */}
          <div className="team-card slow-fade-up delay-3">
            <img src="/Rhonda-Pic.webp" alt="Rhonda Stockton" className="team-card-img" />
            <div className="team-card-title">Rhonda Stockton</div>
            <div className="team-card-role">Admin Associate II</div>
            <div className="team-card-bio">
              {[
                "Rhonda joined Lamm & Company when Barrett purchased Thompson & Co in Grangeville in 2016, after starting there in 2011.",
                "She enjoys working with her bookkeeping and tax clients.",
                "An interesting fact about Rhonda is that she is an avid sports fan and loves the Seahawks, Mariners, OKC Thunder, and Gonzaga Bulldogs."
              ].map((para, i) => (
                <p key={i} style={{ margin: i === 0 ? 0 : '1em 0 0 0' }}>{para}</p>
              ))}
            </div>
          </div>
          {/* Aspen Degenstein */}
          <div className="team-card slow-fade-up delay-4">
            <img src="/NoPic-Pic.webp" alt="Aspen Degenstein" className="team-card-img" />
            <div className="team-card-title">Aspen Degenstein</div>
            <div className="team-card-role">Admin Associate</div>
            <div className="team-card-bio">
              {[ 
                "Aspen started with Lamm & Company in 2025.",
                "She loves the work environment, enjoys organization and data entry, and values customer interaction.",
                "A fun fact about Aspen is that she is just as obsessed with monster trucks as her four-year-old son, and she recently learned to ride a snow bike and dirt bike."
              ].map((para, i) => (
                <p key={i} style={{ margin: i === 0 ? 0 : '1em 0 0 0' }}>{para}</p>
              ))}
            </div>
          </div>
          {/* Annie Adamson */}
          <div className="team-card slow-fade-up delay-5">
            <img src="/Annie-Pic.webp" alt="Annie Adamson" className="team-card-img" />
            <div className="team-card-title">Annie Adamson</div>
            <div className="team-card-role">Admin Associate III</div>
            <div className="team-card-bio"></div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
} 
