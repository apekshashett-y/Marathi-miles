import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Header.css";
import Chatbot from "./Chatbot";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Hero section only shows on the home page
  const isHome = location.pathname === "/";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (path) => {
    if (path === "/passport" && location.pathname === "/passport") {
      window.dispatchEvent(new Event("resetPastPort"));
    }
    setActiveSection(path);
    setIsMenuOpen(false);
    navigate(path);
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="nav-container">
          <div className="logo">
            <i className="fas fa-landmark"></i>
            <span>MarathiMiles</span>
          </div>

          <ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
            <li className="nav-item">
              <span
                className={`nav-link ${activeSection === "/" ? "active" : ""}`}
                onClick={() => handleNavClick("/")}
              >
                <i className="fas fa-home"></i>
                Home
              </span>
            </li>

            <li className="nav-item">
              <span
                className={`nav-link ${activeSection === "/passport" ? "active" : ""}`}
                onClick={() => handleNavClick("/passport")}
              >
                <i className="fas fa-passport"></i>
                Passport
              </span>
            </li>

            <li className="nav-item">
              <span
                className={`nav-link ${activeSection === "/mood" ? "active" : ""}`}
                onClick={() => handleNavClick("/mood")}
              >
                <i className="fas fa-smile"></i>
                Mood Recommendations
              </span>
            </li>


          </ul>

          <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"}`}></i>
          </div>
        </div>
      </nav>

      {/* Hero section — only rendered on the home page "/" */}
      {isHome && (
        <section id="home" className="hero-section">
          <div className="hero-overlay">
            <div className="hero-content">
              <div className="hero-text">
                <div className="hero-tagline">
                  <span className="marathi-slogan">जय महाराष्ट्र!</span>
                  <span className="english-slogan">
                    Experience the Soul of Maharashtra
                  </span>
                </div>
                <h1 className="hero-title">MarathiMiles</h1>
                <p className="hero-subtitle">
                  Discover the land of warriors, festivals, and breathtaking
                  landscapes.
                </p>
              </div>

              <div className="hero-features">
                <div className="feature-card">
                  <i className="fas fa-fort-alt"></i>
                  <h4>Historic Forts</h4>
                </div>
                <div className="feature-card">
                  <i className="fas fa-umbrella-beach"></i>
                  <h4>Coastal Beauty</h4>
                </div>
                <div className="feature-card">
                  <i className="fas fa-mountain"></i>
                  <h4>Western Ghats</h4>
                </div>
                <div className="feature-card">
                  <i className="fas fa-camera"></i>
                  <h4>AI Explorer</h4>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <Chatbot />
    </>
  );
};

export default Header;