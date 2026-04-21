import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (path) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        
        <div className="logo" onClick={() => navigate("/")}>
          <i className="fas fa-landmark"></i>
          <span>MarathiMiles</span>
        </div>

        <ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          
          <li className="nav-item">
            <span className="nav-link" onClick={() => handleNavClick("/")}>
              <i className="fas fa-home"></i> Home
            </span>
          </li>

          <li className="nav-item">
            <span className="nav-link" onClick={() => handleNavClick("/passport")}>
              <i className="fas fa-passport"></i> Passport
            </span>
          </li>

          <li className="nav-item">
            <span className="nav-link" onClick={() => handleNavClick("/mood")}>
              <i className="fas fa-smile"></i> Mood Recommendations
            </span>
          </li>

          <li className="nav-item">
            <span className="nav-link" onClick={() => handleNavClick("/place-explorer")}>
              <i className="fas fa-camera"></i> Place Explorer
            </span>
          </li>

        </ul>

        <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"}`}></i>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;