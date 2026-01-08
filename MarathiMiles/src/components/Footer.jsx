import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-main">
          <div className="footer-brand">
            <div className="footer-logo">
              <i className="fas fa-landmark"></i>
              <span>MarathiMiles</span>
            </div>
            <p className="footer-description">
              Discover the soul of Maharashtra through unforgettable journeys. 
              Explore ancient forts, pristine beaches, and rich cultural heritage 
              with MarathiMiles - your trusted travel companion.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4 className="footer-title">Quick Links</h4>
              <ul className="footer-list">
                <li><a href="#home">Home</a></li>
                <li><a href="#destinations">Destinations</a></li>
                <li><a href="#experiences">Experiences</a></li>
                <li><a href="#passport">Passport Services</a></li>
                <li><a href="#recommendations">Mood Recommendations</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-title">Popular Destinations</h4>
              <ul className="footer-list">
                <li><a href="#mumbai">Mumbai</a></li>
                <li><a href="#pune">Pune</a></li>
                <li><a href="#nashik">Nashik</a></li>
                <li><a href="#aurangabad">Aurangabad</a></li>
                <li><a href="#konkan">Konkan Coast</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-title">Support</h4>
              <ul className="footer-list">
                <li><a href="#help">Help Center</a></li>
                <li><a href="#contact">Contact Us</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#terms">Terms of Service</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-title">Contact Info</h4>
              <div className="contact-info">
                <div className="contact-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>123 Travel Street, Mumbai, Maharashtra 400001</span>
                </div>
                <div className="contact-item">
                  <i className="fas fa-phone"></i>
                  <span>+91 98765 43210</span>
                </div>
                <div className="contact-item">
                  <i className="fas fa-envelope"></i>
                  <span>info@marathimiles.com</span>
                </div>
                <div className="contact-item">
                  <i className="fas fa-clock"></i>
                  <span>24/7 Customer Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="newsletter-section">
          <div className="newsletter-content">
            <div className="newsletter-text">
              <h3>Stay Updated with MarathiMiles</h3>
              <p>Get the latest travel updates, offers, and destination guides directly in your inbox.</p>
            </div>
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="newsletter-input"
              />
              <button className="newsletter-btn">
                <i className="fas fa-paper-plane"></i>
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>&copy; 2024 MarathiMiles. All rights reserved. | <span>जय महाराष्ट्र!</span></p>
            </div>
            <div className="footer-bottom-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
              <a href="#cookies">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;