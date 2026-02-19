import React, { useState, useEffect, useRef } from "react";

import { maharashtraForts } from "../../services/fortData";
import Timeline from "./Timeline";
import "./PastPort.css";

const HOUR_OPTIONS = [2, 3, 4, 6];

// Build hour-based itinerary from existing fort itinerary data
function getItineraryForHours(fort, hours) {
  const itineraries = fort.itineraries || {};
  const halfDay = itineraries.halfDay || [];
  const oneDay = itineraries.oneDay || [];
  const allActivities = [...halfDay, ...oneDay].filter((a) => a.activity || a.description);
  const count = Math.min(hours, Math.max(2, allActivities.length));
  const slice = allActivities.slice(0, count);
  const startHour = 9;
  return slice.map((item, i) => ({
    time: `${String(startHour + i).padStart(2, "0")}:00`,
    activity: item.activity || "Explore",
    description: item.description || "",
    tip: item.tip,
  }));
}

const PastPort = ({ onBack }) => {
  const [selectedFort, setSelectedFort] = useState(null);
  const [expandedChapter, setExpandedChapter] = useState(null);
  const [selectedHours, setSelectedHours] = useState(null);
  const [timelineLanguage, setTimelineLanguage] = useState("en");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [active360Index, setActive360Index] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isFullImmersive, setIsFullImmersive] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const dragStartX = useRef(null);
  const immersiveRef = useRef(null);
  const autoPlayRef = useRef(null);
  const userInteractionTimerRef = useRef(null);

  const timelineRef = useRef(null);

  // Auto-play functionality
  const startAutoPlay = () => {
    if (!selectedFort?.images360?.length) return;
    
    clearInterval(autoPlayRef.current);
    setIsAutoPlaying(true);
    
    autoPlayRef.current = setInterval(() => {
      setActive360Index((prev) =>
        prev === (selectedFort.images360 || []).length - 1 ? 0 : prev + 1
      );
    }, 4000); // Change image every 4 seconds
  };

  const stopAutoPlay = () => {
    clearInterval(autoPlayRef.current);
    autoPlayRef.current = null;
    setIsAutoPlaying(false);
  };

  const resumeAutoPlayAfterDelay = () => {
    clearTimeout(userInteractionTimerRef.current);
    
    userInteractionTimerRef.current = setTimeout(() => {
      if (selectedFort?.images360?.length) {
        startAutoPlay();
      }
    }, 8000);
  };

  // Initialize auto-play when fort is selected OR when fullscreen mode changes
  useEffect(() => {
    if (selectedFort?.images360?.length) {
      startAutoPlay();
    }
    
    return () => {
      clearInterval(autoPlayRef.current);
      clearTimeout(userInteractionTimerRef.current);
    };
  }, [selectedFort?.id, isFullImmersive]); // Γ£à ADD isFullImmersive HERE

  // Handle fullscreen mode changes
  useEffect(() => {
    if (isFullImmersive) {
      // Fullscreen mode me bhi auto-play chalega
      setTimeout(() => {
        if (selectedFort?.images360?.length) {
          startAutoPlay();
        }
      }, 300);
    } else if (selectedFort?.images360?.length) {
      // Normal mode me bhi auto-play restart
      setTimeout(() => {
        startAutoPlay();
      }, 300);
    }
  }, [isFullImmersive]);

  // Drag handlers for 360┬░ simulation
  const handleMouseDown = (e) => {
    stopAutoPlay(); // Stop auto-play when user interacts
    setIsDragging(true);
    dragStartX.current = e.clientX;
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    // Visual feedback for dragging
    const currentX = e.clientX;
    const diff = currentX - dragStartX.current;
    
    // Show visual feedback based on drag direction
    if (Math.abs(diff) > 50) {
      // Significant drag detected
    }
  };

  const handleMouseUp = (e) => {
    if (!isDragging || dragStartX.current === null) return;

    const diff = e.clientX - dragStartX.current;
    const threshold = 60;

    if (diff > threshold) {
      // Swipe right ΓåÆ previous image
      setActive360Index((prev) =>
        prev === 0 ? (selectedFort.images360 || []).length - 1 : prev - 1
      );
    } else if (diff < -threshold) {
      // Swipe left ΓåÆ next image
      setActive360Index((prev) =>
        prev === (selectedFort.images360 || []).length - 1 ? 0 : prev + 1
      );
    }

    setIsDragging(false);
    dragStartX.current = null;
    
    // Resume auto-play after delay (both modes)
    resumeAutoPlayAfterDelay();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      dragStartX.current = null;
      resumeAutoPlayAfterDelay();
    }
  };

  // Handle touch events for mobile
  const handleTouchStart = (e) => {
    stopAutoPlay(); // Stop auto-play when user interacts
    setIsDragging(true);
    dragStartX.current = e.touches[0].clientX;
    e.preventDefault();
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
  };

  const handleTouchEnd = (e) => {
    if (!isDragging || dragStartX.current === null) return;

    const touch = e.changedTouches[0];
    const diff = touch.clientX - dragStartX.current;
    const threshold = 60;

    if (diff > threshold) {
      setActive360Index((prev) =>
        prev === 0 ? (selectedFort.images360 || []).length - 1 : prev - 1
      );
    } else if (diff < -threshold) {
      setActive360Index((prev) =>
        prev === (selectedFort.images360 || []).length - 1 ? 0 : prev + 1
      );
    }

    setIsDragging(false);
    dragStartX.current = null;
    
    // Resume auto-play after delay (both modes)
    resumeAutoPlayAfterDelay();
  };

  // Handle card click (manual image selection)
  const handleCardClick = (index) => {
    stopAutoPlay(); // Stop auto-play when user interacts
    setActive360Index(index);
    resumeAutoPlayAfterDelay();
  };

  // Enter Full Immersive Mode
  const enterFullImmersive = () => {
    const element = immersiveRef.current;
    if (!element) return;
    
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) { /* Safari */
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { /* IE11 */
      element.msRequestFullscreen();
    }
    
    // Start autoplay in fullscreen immediately
    setTimeout(() => {
      if (selectedFort?.images360?.length) {
        startAutoPlay();
      }
    }, 100);
  };

  // Exit Full Immersive Mode
  const exitFullImmersive = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
  };

  // Listen for fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreen = !!(document.fullscreenElement || 
        document.webkitFullscreenElement || 
        document.msFullscreenElement);
      
      setIsFullImmersive(isFullscreen);
      
      if (!isFullscreen && selectedFort?.images360?.length) {
        // Exited fullscreen, restart auto-play
        setTimeout(() => {
          startAutoPlay();
        }, 500);
      } else if (isFullscreen && selectedFort?.images360?.length) {
        // Entered fullscreen, restart auto-play in fullscreen
        setTimeout(() => {
          startAutoPlay();
        }, 500);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, [selectedFort?.images360]);

  const toggleChapter = (index) => {
    setExpandedChapter(expandedChapter === index ? null : index);
  };

  const handleBackToForts = () => {
    setSelectedFort(null);
    setExpandedChapter(null);
    setSelectedHours(null);
    setActive360Index(0);
    setTimelineLanguage("en");
    setIsFullImmersive(false);
    stopAutoPlay();
  };

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.pageYOffset / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setActive360Index(0);
    if (selectedFort?.images360?.length) {
      startAutoPlay();
    }
  }, [selectedFort?.id]);

  // Fort selection view (default when no fort selected)
  if (!selectedFort) {
    return (
      <div className="pastport-storytelling">
        <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress / 100})` }} />
        <button className="back-to-forts" onClick={() => onBack?.()}>
          ΓåÉ Back
        </button>
        <div className="story-header">
          <h1 className="story-title">PastPort</h1>
          <p className="story-subtitle">
            Choose a fort and walk through its story ΓÇö from past to present.
          </p>
        </div>
        <section className="fort-selection-section">
          <h2 className="fort-selection-heading">Choose Your Fort</h2>
          <div className="fort-selection-grid">
            {maharashtraForts.map((fort) => (
              <button
                key={fort.id}
                type="button"
                className="fort-card"
                onClick={() => setSelectedFort(fort)}
              >
                <div
                  className="fort-card-image"
                  style={{
                    backgroundImage: `url(${fort.imageUrl || fort.image || ""})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="fort-card-content">
                  <h3 className="fort-card-name">{fort.name}</h3>
                  <p className="fort-card-subtitle">
                    {fort.subtitle || fort.era || (fort.significance ? fort.significance.slice(0, 80) : "")}
                    {fort.significance && fort.significance.length > 80 ? "ΓÇª" : ""}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>
        <div className="story-footer story-footer--compact">
          <p className="footer-quote">PastPort Maharashtra ΓÇó Heritage through storytelling</p>
        </div>
      </div>
    );
  }

  const images360 = selectedFort.images360 || [];
  const has360Images = images360.length > 0;

  return (
    <div className="pastport-storytelling">
      {/* Scroll Progress Bar */}
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />

      {/* Change Fort / Back */}
      <button className="back-to-forts" onClick={handleBackToForts}>
        ΓåÉ Change Fort
      </button>

      {/* Cinematic Header */}
      <div className="story-header">
        <h1 className="story-title">PastPort</h1>
        <p className="story-subtitle">
          Walk through history ΓÇö choose a fort and explore its story.
        </p>
      </div>

      {/* Hero: full-width bg, left-aligned, name + one emotional subtitle only */}
      <div
        className="fort-hero"
        style={{
          backgroundImage: `url(${selectedFort.imageUrl || selectedFort.image || ""})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="hero-overlay hero-overlay--left">
          <h1 className="fort-hero-name">{selectedFort.name}</h1>
          <p className="fort-hero-subtitle">
            {selectedFort.subtitle || selectedFort.era}
          </p>
        </div>
      </div>

      {/* Horizontal Storytelling Timeline (past ΓåÆ present) */}
      <div className="timeline-header-bar">
        <div className="timeline-language-toggle">
          <span className="timeline-language-label">Story language</span>
          <div className="timeline-language-toggle-buttons">
            <button
              type="button"
              className={`language-toggle-btn ${
                timelineLanguage === "en" ? "is-active" : ""
              }`}
              onClick={() => setTimelineLanguage("en")}
            >
              EN
            </button>
            <button
              type="button"
              className={`language-toggle-btn ${
                timelineLanguage === "mr" ? "is-active" : ""
              }`}
              onClick={() => setTimelineLanguage("mr")}
            >
              MR
            </button>
          </div>
        </div>
      </div>

      <div ref={timelineRef}>
        <Timeline
          key={selectedFort.id}
          chapters={selectedFort.timeline || []}
          expandedChapter={expandedChapter}
          onToggleChapter={toggleChapter}
          language={timelineLanguage}
        />
      </div>

      {/* Transition Note */}
      <div className="transition-note">
        "History is not just about dates and events; it's about the people who lived them,
        the stones that witnessed them, and the stories that survive them."
      </div>

      {/* 360┬░ Immersive Experience */}
      <div 
        className={`immersive-experience ${isFullImmersive ? 'full-immersive-mode' : ''}`}
        ref={immersiveRef}
      >
        
        {!isFullImmersive && (
          <>
            <span className="immersive-eyebrow">IMMERSIVE EXPERIENCE</span>
            <h2 className="immersive-title">Step Inside {selectedFort.name}</h2>
            <p className="immersive-subtitle">
              Explore every corner in stunning 360┬░ detail.
            </p>
          </>
        )}

        <div className="immersive-viewport">
          <div 
            className="immersive-viewport-frame"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="immersive-viewport-inner">
              {has360Images ? (
                images360.map((item, index) => (
                  <div
                    key={index}
                    className={`immersive-viewport-image ${index === active360Index ? "is-active" : ""}`}
                    style={{ 
                      backgroundImage: `url(${item.src || item.url || item.image || ''})`
                    }}
                  />
                ))
              ) : (
                <div
                  className="immersive-viewport-image is-active"
                  style={{
                    backgroundImage: `url(${selectedFort.imageUrl || selectedFort.image || ""})`,
                  }}
                />
              )}
            </div>
            
            {/* Auto-play indicator in fullscreen mode */}
            {isFullImmersive && (
              <div className="auto-play-indicator">
                <span className="auto-play-icon">Γû╢∩╕Å</span>
                <span className="auto-play-status">
                  {isAutoPlaying ? 'Auto-playing' : 'Paused'}
                </span>
              </div>
            )}
            
            {/* "Drag to Explore" overlay - HIDES in full immersive mode */}
            {!isFullImmersive && (
              <div className="immersive-viewport-overlay">
                <div className="immersive-drag-icon">Γåö∩╕Å</div>
                <div className="immersive-drag-text">Drag to Explore 360┬░</div>
                <div className="immersive-drag-hint">Swipe left/right to rotate view</div>
              </div>
            )}

            <div className="immersive-viewport-controls">
              {/* Auto-play toggle button - both modes */}
              <button 
                type="button" 
                className="immersive-control-btn" 
                aria-label={isAutoPlaying ? "Pause auto-play" : "Play auto-play"}
                onClick={() => {
                  if (isAutoPlaying) {
                    stopAutoPlay();
                  } else {
                    startAutoPlay();
                  }
                }}
              >
                <span className="immersive-control-icon">
                  {isAutoPlaying ? 'ΓÅ╕∩╕Å' : 'Γû╢∩╕Å'}
                </span>
              </button>
              
              {/* Fullscreen Toggle Button */}
              <button 
                type="button" 
                className="immersive-control-btn" 
                aria-label={isFullImmersive ? "Exit Fullscreen" : "Fullscreen"}
                onClick={isFullImmersive ? exitFullImmersive : enterFullImmersive}
              >
                <span className="immersive-control-icon">
                  {isFullImmersive ? 'Γ£ò' : 'Γ¢╢'}
                </span>
              </button>
              
              {!isFullImmersive && (
                <span className="immersive-view-badge">360┬░ Interactive View</span>
              )}
            </div>
          </div>
        </div>

        {/* Progress indicator - HIDES in full immersive mode */}
        {has360Images && !isFullImmersive && (
          <div className="immersive-progress">
            <div className="immersive-progress-track">
              {images360.map((_, index) => (
                <div 
                  key={index}
                  className={`immersive-progress-dot ${index === active360Index ? "active" : ""}`}
                  onClick={() => handleCardClick(index)}
                />
              ))}
            </div>
            <div className="immersive-progress-text">
              {active360Index + 1} / {images360.length}
              {isAutoPlaying && (
                <span className="auto-play-status"> ΓÇó Auto-playing</span>
              )}
            </div>
          </div>
        )}

        {/* Image selection cards - HIDES in full immersive mode */}
        {has360Images && !isFullImmersive && (
          <div className="immersive-cards">
            {images360.map((item, index) => (
              <button
                key={index}
                type="button"
                className={`immersive-card ${index === active360Index ? "is-active" : ""}`}
                onClick={() => handleCardClick(index)}
              >
                <span className="immersive-card-accent" />
                <span className="immersive-card-label">{item.label || `View ${index + 1}`}</span>
                {item.subtitle && (
                  <span className="immersive-card-subtitle">{item.subtitle}</span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* "Enter Full Immersive Mode" button - HIDES in full immersive mode */}
        {!isFullImmersive && (
          <button 
            type="button" 
            className="immersive-cta"
            onClick={enterFullImmersive}
          >
            Enter Full Immersive Mode
          </button>
        )}

        {/* "Exit Full Immersive Mode" button - SHOWS only in full immersive mode */}
        {isFullImmersive && (
          <button 
            type="button" 
            className="exit-immersive-btn"
            onClick={exitFullImmersive}
          >
            Exit Full Immersive Mode
          </button>
        )}
      </div>

      {/* EXPLORE MORE */}
      <div className="travel-magazine">
        <h2 className="magazine-title">Complete Travel Guide</h2>
        <p className="magazine-subtitle">
          Flavors, markets, and traditions around {selectedFort.name}.
        </p>
        {/* Cuisine Section */}
        <div className="magazine-section">
          <div className="section-header">
            <div className="section-icon">≡ƒì╜∩╕Å</div>
            <h3>Savor the Flavors</h3>
          </div>
          <p style={{ color: "#5a4a3a", marginBottom: "1.5rem" }}>
            Authentic Maharashtra cuisine awaits ΓÇö each dish tells a story of the land.
          </p>

          <div className="cuisine-showcase">
            {(selectedFort.cuisine || []).map((dish, index) => (
              <div key={index} className="cuisine-card">
                <img src={dish.image || ""} alt={dish.name} className="cuisine-image" />
                <div className="cuisine-content">
                  <h4 className="cuisine-name">{dish.name}</h4>
                  <p className="cuisine-desc">{dish.description}</p>
                  <div className="cuisine-details">
                    <span>≡ƒî╢∩╕Å {dish.spiceLevel}</span>
                    <span>ΓÅ░ {dish.bestTime}</span>
                    <span>≡ƒÆ░ {dish.priceRange}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shopping Section */}
        <div className="magazine-section">
          <div className="section-header">
            <div className="section-icon">≡ƒ¢ì∩╕Å</div>
            <h3>Local Markets & Shopping</h3>
          </div>
          <p style={{ color: '#5a4a3a', marginBottom: '1.5rem' }}>
            Discover authentic handicrafts and souvenirs that carry the spirit of the region.
          </p>

          <div className="shopping-grid">
            {(selectedFort.shopping || []).map((market, index) => (
              <div key={index} className="shopping-card">
                <h4 className="market-name">{market.name}</h4>
                <p style={{ color: '#5a4a3a', lineHeight: '1.6', marginBottom: '1rem' }}>
                  {market.description}
                </p>
                {(market.highlights || []).length > 0 && (
                  <div style={{ marginBottom: "1rem" }}>
                    <strong style={{ color: "#8b5a2b" }}>Highlights:</strong>
                    <div className="market-features">
                      {(market.highlights || []).map((item, i) => (
                        <span key={i} className="feature-tag">{item}</span>
                      ))}
                    </div>
                  </div>
                )}
                <div style={{ color: "#059669", fontSize: "0.95rem" }}>
                  <strong>Timing:</strong> {market.timing} | <strong>Best for:</strong> {market.bestFor}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cultural Experiences */}
        <div className="magazine-section">
          <div className="section-header">
            <div className="section-icon">≡ƒÄ¡</div>
            <h3>Cultural Experiences</h3>
          </div>
          <p style={{ color: '#5a4a3a', marginBottom: '1.5rem' }}>
            Immerse yourself in local traditions and create memories that last a lifetime.
          </p>

          <div className="experience-cards">
            {(selectedFort.experiences || []).map((experience, index) => (
              <div key={index} className="experience-card">
                <h4 style={{ color: '#2c1810', marginBottom: '0.5rem' }}>
                  {experience.name}
                </h4>
                <p style={{ color: '#5a4a3a', lineHeight: '1.6', marginBottom: '1rem' }}>
                  {experience.description}
                </p>
                <div className="experience-duration">
                  <span>ΓÅ▒∩╕Å</span>
                  Duration: {experience.duration}
                </div>
                {(experience.includes || []).length > 0 && (
                  <div style={{ margin: "1rem 0" }}>
                    <strong style={{ color: "#8b5a2b" }}>Includes:</strong>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.5rem" }}>
                      {(experience.includes || []).map((item, i) => (
                        <span key={i} style={{
                          background: '#f5e9d9',
                          padding: '0.3rem 0.7rem',
                          borderRadius: '12px',
                          fontSize: '0.85rem',
                          color: '#5a4a3a'
                        }}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div style={{ color: "#b37a4e", fontWeight: "600" }}>
                  Best for: {experience.bestFor}
                </div>
                <button style={{
                  marginTop: '1.5rem',
                  background: '#b37a4e',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  fontWeight: '600',
                  width: '100%',
                  cursor: 'pointer',
                  transition: 'background 0.3s'
                }}>
                  Book This Experience
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Smart Itinerary: hour-based (2h, 3h, 4h, 6h) */}
      <div className="itinerary-generator-section">
        <span className="itinerary-eyebrow">PLAN YOUR VISIT</span>
        <div className="itinerary-header">
          <h3 className="itinerary-question">How Much Time Do You Have?</h3>
          <p className="itinerary-description">
            Choose your visit length. We'll suggest a practical plan for {selectedFort.name}.
          </p>
        </div>

        <div className="time-selector">
          {HOUR_OPTIONS.map((hours) => (
            <button
              key={hours}
              type="button"
              className={`time-option ${selectedHours === hours ? "selected" : ""}`}
              onClick={() => setSelectedHours(selectedHours === hours ? null : hours)}
            >
              {hours} hours
            </button>
          ))}
        </div>

        {selectedHours && (
          <div className="generated-itinerary">
            <h3 className="itinerary-plan-title">
              Your {selectedHours}-Hour Plan
            </h3>

            {getItineraryForHours(selectedFort, selectedHours).map((item, index) => (
              <div key={index} className="time-slot">
                <div className="time-label">{item.time}</div>
                <div className="activity-details">
                  <div className="activity-title">{item.activity}</div>
                  {item.description && (
                    <p className="activity-desc">{item.description}</p>
                  )}
                  {item.tip && (
                    <div className="activity-tip">
                      <span>≡ƒÆí</span>
                      Pro Tip: {item.tip}
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div className="itinerary-tips">
              <div className="itinerary-tips-heading">
                <span>≡ƒô¥</span>
                <strong>Planning Tips</strong>
              </div>
              <ul className="itinerary-tips-list">
                <li>Wear comfortable walking shoes and carry water</li>
                <li>Carry cash for local purchases</li>
                <li>Respect photography rules in sacred areas</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Story Footer */}
      <div className="story-footer">
        <p className="footer-quote">
          "We are not makers of history. We are made by history."
          <br />
          <span style={{ fontSize: '0.9rem', display: 'block', marginTop: '0.5rem' }}>
            ΓÇö Martin Luther King Jr.
          </span>
        </p>
        <p style={{ color: '#8b5a2b', fontWeight: '600' }}>
          PastPort Maharashtra ΓÇó Preserving Heritage Through Storytelling
        </p>
        <p style={{ fontSize: '0.9rem', color: '#5a4a3a', marginTop: '0.5rem' }}>
          All historical narratives are based on verified sources and local oral traditions
        </p>
      </div>
    </div>
  );
};

export default PastPort;
