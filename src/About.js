import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function About() {
  const [selectedTeam, setSelectedTeam] = useState('Management');
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 200);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  useEffect(() => {
    const revealNodes = Array.from(document.querySelectorAll(
      '.about-content .about-hero-img, .about-content .about-title, .about-content .about-description, .about-content .team-button-group, .about-content .team-cards-container'
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
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );

    revealNodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, [selectedTeam]);

  const teams = [
    'Management',
    'Accounting Team',
    'Tax Team',
    'Payroll Team',
    'Admin Team',
    'Accounts Receivable',
    'Human Resources',
  ];
  return (
    <div className="about-page classy-about-bg">
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
      <div className="about-content">
        <img
          src="/Staff+minus+Barrett-2880w.webp"
          alt="Lamm & Company Staff"
          className="about-hero-img"
        />
        <h2 className="about-title">Meet our Team</h2>
        <div className="about-description">
          We service clients throughout the state of Idaho as well as different parts of the country. Many of our clients are farmers or small business owners. We want to relate to our clients on their level and help them achieve their goals by providing top-shelf service and advice. We are a growing company, come grow with us and let us build a long-lasting business relationship.
        </div>
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
        {selectedTeam === 'Management' && (
          <div className="team-cards-container slow-fade" style={{ flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', width: '100%', marginBottom: '2rem', flexWrap: 'wrap' }}>
              {/* Barrett left */}
              <div className="team-card slow-fade-up delay-0">
                <img src="/Barrett-Pic.webp" alt="Barrett Lamm" className="team-card-img" />
                <div className="team-card-title">Barrett Lamm</div>
                <div className="team-card-role">President</div>
                <div className="team-card-bio">
                  {`Barrett grew up in McCall and started his accounting journey at his dad’s CPA firm. After earning his Accounting degree from Boise State and his CPA license, he took over the family practice in 2014 and expanded it in 2017.\n\nOutside the office, Barrett enjoys time with his wife and kids, outdoor activities, woodworking, and volunteering in the community.`.split('\n').map((para, i) => (
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
                  {`Tyler is a co-owner of Lamm & Company with a strong background in accounting and real-world experience. He earned his Masters in Accounting from BYU and worked at a Big Four firm before joining Lamm & Company.\n\nTyler provides practical guidance to clients and enjoys spending time outdoors with his family.`.split('\n').map((para, i) => (
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
                  {`Derek has been with Lamm & Company for five years. His favorite thing about the company is the teamwork and dedication to staff.\n\nIn his free time, Derek loves spending time with his big family—he has five children and counting!`.split('\n').map((para, i) => (
                    <p key={i} style={{ margin: i === 0 ? 0 : '1em 0 0 0' }}>{para}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {selectedTeam === 'Accounting Team' && (
          <div className="team-cards-container slow-fade" style={{ flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', display: 'flex', marginTop: '2rem' }}>
            {/* Jolene Johnson */}
            <div className="team-card slow-fade-up delay-0">
              <img src="/Jolene-Pic.webp" alt="Jolene Johnson" className="team-card-img" />
              <div className="team-card-title">Jolene Johnson</div>
              <div className="team-card-role">Accounting Specialist</div>
              <div className="team-card-bio">
                {[
                  "Jolene has been with Lamm & Company for six years.",
                  "Her favorite thing about working at the company is employee development.",
                  "A fun fact about Jolene is that she has had so many stitches in the past that they had to count boxes rather than individual stitches."
                ].map((para, i) => (
                  <p key={i} style={{ margin: i === 0 ? 0 : '1em 0 0 0' }}>{para}</p>
                ))}
              </div>
            </div>
            {/* Rebecca Balken */}
            <div className="team-card slow-fade-up delay-1">
              <img src="/Rebecca-Pic.webp" alt="Rebecca Balken" className="team-card-img" />
              <div className="team-card-title">Rebecca Balken</div>
              <div className="team-card-role">Accounting Associate III</div>
              <div className="team-card-bio">
                {[
                  "Rebecca has been with the company since 2022.",
                  "She enjoys working with Lamm & Company because she likes and appreciates the people she works with. Lamm & Company has provided a structured, yet caring and learning environment to grow in.",
                  "Something interesting about Rebecca is that she enjoys spending time with her family in her spare time."
                ].map((para, i) => (
                  <p key={i} style={{ margin: i === 0 ? 0 : '1em 0 0 0' }}>{para}</p>
                ))}
              </div>
            </div>
            {/* Kelsey Ritch */}
            <div className="team-card slow-fade-up delay-2">
              <img src="/Kelsey-Pic.webp" alt="Kelsey Ritch" className="team-card-img" />
              <div className="team-card-title">Kelsey Ritch</div>
              <div className="team-card-role">Accounting Associate II</div>
              <div className="team-card-bio">
                {[
                  "Kelsey has been with the company for five years.",
                  "Her favorite thing about working with the company is the fall family fee.",
                  "A fun fact about Kelsey is that she enjoys being outside and in nature as much as she possibly can."
                ].map((para, i) => (
                  <p key={i} style={{ margin: i === 0 ? 0 : '1em 0 0 0' }}>{para}</p>
                ))}
              </div>
            </div>
            {/* Mayson Bell */}
            <div className="team-card slow-fade-up delay-3">
              <img src="/Unknown Man.jpg" alt="Mayson Bell" className="team-card-img" />
              <div className="team-card-title">Mayson Bell</div>
              <div className="team-card-role">Accounting Associate I</div>
              <div className="team-card-bio">
                {[
                  "Mayson began working for Lamm & Co in 2024 while continuing his education and growing his experience in accounting and bookkeeping.",
                  "His favorite thing about working at Lamm & Company is the opportunity to continue learning, solve problems, and work alongside a great team while helping clients and businesses succeed.",
                  "Outside of work he enjoys working on vehicles, riding dirt bikes, and spending time with his family."
                ].map((para, i) => (
                  <p key={i} style={{ margin: i === 0 ? 0 : '1em 0 0 0' }}>{para}</p>
                ))}
              </div>
            </div>
            {/* More accounting team cards here... */}
          </div>
        )}
        {selectedTeam === 'Tax Team' && (
          <div className="team-cards-container slow-fade" style={{ flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', display: 'flex', marginTop: '2rem' }}>
            {/* Tammi Cox */}
            <div className="team-card slow-fade-up delay-0">
              <img src="/Tammie-Pic.webp" alt="Tammi Cox" className="team-card-img" />
              <div className="team-card-title">Tammi Cox</div>
              <div className="team-card-role">Senior Associate | Enrolled Agent</div>
              <div className="team-card-bio">
                {[
                  "Tammi has been with Lamm & Company for almost four years.",
                  "She loves working with the company because she loves working with a team that cares about their clients.",
                  "Outside the office Tammi owns and operates a Kettle Corn booth.",
                  "In her free time she is either at a hotspring or rockhounding."
                ].map((para, i) => (
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
                {[
                  "Jordyn has been with the company since 2026.",
                  "So far she has enjoyed being a part of a team that is collaborative, encouraging, and committed to doing great work.",
                  "A fun fact about Jordyn is that she loves going on road trips and finding unique antiques and vintage pieces at antique stores and thrift shops."
                ].map((para, i) => (
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
                {[
                  "Brookelyn has been with the company since the beginning of 2026.",
                  "Her favorite part about being a part of the Lamm team is the relationships she's built with her coworkers, along with being part of a firm that values integrity and honest work for their clients.",
                  "An interesting fact about Brookelyn is that she has farmed her entire life. When she's not farming, she loves to bake and enjoys finding time to be creative in the kitchen."
                ].map((para, i) => (
                  <p key={i} style={{ margin: i === 0 ? 0 : '1em 0 0 0' }}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        )}
        {selectedTeam === 'Payroll Team' && (
          <div className="team-cards-container slow-fade" style={{ flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', display: 'flex', marginTop: '2rem' }}>
            {/* Shaely Robison */}
            <div className="team-card slow-fade-up delay-0">
              <img src="/Shaely-Pic.webp" alt="Shaely Robison" className="team-card-img" />
              <div className="team-card-title">Shaely Robison</div>
              <div className="team-card-role">Payroll Associate II</div>
              <div className="team-card-bio">
                {[
                  "Shaely has been with Lamm & Company since Sept. of 2024.",
                  "Her favorite thing about working with the company is there is always new things to learn.",
                  "A fun fact about Shaely is that she enjoys design, creativity, and making things look aesthetically put together."
                ].map((para, i) => (
                  <p key={i} style={{ margin: i === 0 ? 0 : '1em 0 0 0' }}>{para}</p>
                ))}
              </div>
            </div>
            {/* Heidi Carter */}
            <div className="team-card slow-fade-up delay-1">
              <img src="/NoPic-Pic.webp" alt="Heidi Carter" className="team-card-img" />
              <div className="team-card-title">Heidi Carter</div>
              <div className="team-card-role">Payroll Associate I</div>
              <div className="team-card-bio">
                {[
                  "Heidi has been with the company since the end of 2025.",
                  "She loves working at Lamm & Company because of the detail-oriented work and responsibility, as well as the people she gets to work with daily.",
                  "A fun fact about Heidi is that she enjoys lifting weights at the gym."
                ].map((para, i) => (
                  <p key={i} style={{ margin: i === 0 ? 0 : '1em 0 0 0' }}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        )}
        {selectedTeam === 'Admin Team' && (
          <div className="team-cards-container slow-fade" style={{ flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', display: 'flex', marginTop: '2rem' }}>
            {/* Annie Adamson */}
            <div className="team-card slow-fade-up delay-0">
              <img src="/Annie-Pic.webp" alt="Annie Adamson" className="team-card-img" />
              <div className="team-card-title">Annie Adamson</div>
              <div className="team-card-role">Admin Associate III</div>
              <div className="team-card-bio">
                {[
                  "Annie has been with Lamm & Company for years, starting her journey in the Emmett office before transferring to the Fruitland office.",
                  "Her favorite thing about working at Lamm & Company is, number one, the team, and number two, getting to know and recognize clients and being able to make connections.",
                  "A fun fact about Annie is that she has a favorite place to fish with her dog and a good book."
                ].map((para, i) => (
                  <p key={i} style={{ margin: i === 0 ? 0 : '1em 0 0 0' }}>{para}</p>
                ))}
              </div>
            </div>
            {/* Rhonda Stockton */}
            <div className="team-card slow-fade-up delay-1">
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
            {/* Sharon King */}
            <div className="team-card slow-fade-up delay-2">
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
            {/* Chris Heidbrink */}
            <div className="team-card slow-fade-up delay-3">
              <img src="/Chris-Pic.webp" alt="Chris Heidbrink" className="team-card-img" />
              <div className="team-card-title">Chris Heidbrink</div>
              <div className="team-card-role">Admin Associate I</div>
              <div className="team-card-bio">
                {[
                  "Chris has been a valued member of Lamm & Company for four years.",
                  "He truly appreciates the welcoming, small-office atmosphere that comes with working for Lamm & Company.",
                  "Outside of work, Chris enjoys juggling-a unique talent!"
                ].map((para, i) => (
                  <p key={i} style={{ margin: i === 0 ? 0 : '1em 0 0 0' }}>{para}</p>
                ))}
              </div>
            </div>
            {/* Natalee Stone */}
            <div className="team-card slow-fade-up delay-4">
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
            {/* Aspen Degenstein */}
            <div className="team-card slow-fade-up delay-5">
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
          </div>
        )}
        {selectedTeam === 'Accounts Receivable' && (
          <div className="team-cards-container slow-fade" style={{ flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', display: 'flex', marginTop: '2rem' }}>
            <div className="team-card slow-fade-up delay-0">
              <img src="/Profile Pic.jpg" alt="Emily Watkins" className="team-card-img" />
              <div className="team-card-title">Emily Watkins</div>
              <div className="team-card-role">Accounts Receivable Associate</div>
              <div className="team-card-bio">
                  {[
                    "Emily has been with Lamm & Company since January of 2026.",
                    "Her favorite thing about working with the company are all the opportunities for growth and learning. Sky's the limit here!",
                    "Outside of work, Emily enjoys going to Cross Fit and spending time with her two children."
                  ].map((para, i) => (
                  <p key={i} style={{ margin: i === 0 ? 0 : '1em 0 0 0' }}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        )}
        {selectedTeam === 'Human Resources' && (
          <div className="team-cards-container slow-fade" style={{ flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', display: 'flex', marginTop: '2rem' }}>
            <div className="team-card slow-fade-up delay-0">
              <img src="/Lori-Pic.webp" alt="Lori Colligan" className="team-card-img" />
              <div className="team-card-title">Lori Colligan</div>
              <div className="team-card-role">Director of HR & Administration</div>
              <div className="team-card-bio">
                {[
                  "Lori has been with the company since January 2022.",
                  "Her favorite thing about working at Lamm & Company is the comradery with staff and clients.",
                  "A fun fact about Lori is that she collects little dogs! She has three Shihtzus and one Pekingese."
                ].map((para, i) => (
                  <p key={i} style={{ margin: i === 0 ? 0 : '1em 0 0 0' }}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
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

export default About;
