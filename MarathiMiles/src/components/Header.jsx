import React, { useState, useEffect } from "react";
import "./Header.css";
import Chatbot from "./Chatbot";

const Header = ({ onSectionChange, heroSectionRef }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle navigation click
  const handleNavClick = (section, e) => {
    e.preventDefault();
    setActiveSection(section);
    setIsMenuOpen(false);
    
    // Call the parent function to change section
    if (onSectionChange) {
      onSectionChange(section);
    }
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
              <a
                href="#home"
                className={`nav-link ${
                  activeSection === "home" ? "active" : ""
                }`}
                onClick={(e) => handleNavClick("home", e)}
              >
                <i className="fas fa-home"></i>
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#passport"
                className={`nav-link ${
                  activeSection === "passport" ? "active" : ""
                }`}
                onClick={(e) => handleNavClick("passport", e)}
              >
                <i className="fas fa-passport"></i>
                Passport
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#mood-recommendations"
                className={`nav-link ${
                  activeSection === "mood-recommendations" ? "active" : ""
                }`}
                onClick={(e) => handleNavClick("mood-recommendations", e)}
              >
                <i className="fas fa-smile"></i>
                Mood Recommendations
              </a>
            </li>
          </ul>

          <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"}`}></i>
          </div>
        </div>
      </nav>

      {/* Hero Section with ref */}
      <section id="home" className="hero-section" ref={heroSectionRef}>
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
                landscapes. From ancient caves to modern marvels, embark on
                unforgettable journeys through Maharashtra's rich heritage.
              </p>
            </div>

            <div className="hero-features">
              <div className="feature-card">
                <i className="fas fa-fort-alt"></i>
                <h4>Historic Forts</h4>
                <p>Explore 350+ ancient forts</p>
              </div>
              <div className="feature-card">
                <i className="fas fa-umbrella-beach"></i>
                <h4>Coastal Beauty</h4>
                <p>720km of stunning coastline</p>
              </div>
              <div className="feature-card">
                <i className="fas fa-mountain"></i>
                <h4>Western Ghats</h4>
                <p>UNESCO world heritage sites</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chatbot Component */}
      <Chatbot />
    </>
  );
};

export default Header;