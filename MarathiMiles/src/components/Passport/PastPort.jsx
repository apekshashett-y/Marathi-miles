import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { maharashtraForts } from "../../services/fortData";
import { shivneriData } from "../../data/shivneriData";
import Timeline from "./Timeline";
import Shivneri360Gallery from "../Shivneri360Gallery";
import SmartExplorationPreview from "./SmartExplorationPreview";
import FlavorsSection from "./FlavorsSection";
import BazaarSection from "./BazaarSection";
import ItineraryPlanner from "./ItineraryPlanner";
import SpiritSection from "./SpiritSection";
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
  const navigate = useNavigate();
  const [selectedFort, setSelectedFort] = useState(null);
  const [expandedChapter, setExpandedChapter] = useState(null);
  const [selectedHours, setSelectedHours] = useState(null);
  const [timelineLanguage, setTimelineLanguage] = useState("en");
  const [scrollProgress, setScrollProgress] = useState(0);

  const [active360Index, setActive360Index] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isFullImmersive, setIsFullImmersive] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [show360, setShow360] = useState(false);
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
  }, [selectedFort?.id, isFullImmersive]); // ✅ ADD isFullImmersive HERE

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

  // Drag handlers for 360° simulation
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
      // Swipe right → previous image
      setActive360Index((prev) =>
        prev === 0 ? (selectedFort.images360 || []).length - 1 : prev - 1
      );
    } else if (diff < -threshold) {
      // Swipe left → next image
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
          ← Back
        </button>
        <div className="story-header">
          <h1 className="story-title">PastPort</h1>
          <p className="story-subtitle">
            Choose a fort and walk through its story — from past to present.
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
                    {fort.significance && fort.significance.length > 80 ? "…" : ""}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>
        <div className="story-footer story-footer--compact">
          <p className="footer-quote">PastPort Maharashtra • Heritage through storytelling</p>
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
        ← Change Fort
      </button>

      {/* Hero: cinematic entrance with center-aligned text - Now at the top for full screen effect */}
      <div
        className="fort-hero"
        style={{
          backgroundImage: `url(${selectedFort.imageUrl || selectedFort.image || ""})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="hero-overlay hero-overlay--center-bottom">
          <div className="hero-location">{selectedFort.location}</div>
          <h1 className="fort-hero-name">{selectedFort.name}</h1>
          <p className="fort-hero-subtitle">
            {selectedFort.subtitle || selectedFort.era}
          </p>
          <div className="scroll-hint">
            <span className="scroll-hint-text">Scroll to explore</span>
            <span className="scroll-hint-icon">↓</span>
          </div>
        </div>
      </div>

      {/* Cinematic Header - Moved below hero as a section divider */}
      <div className="story-header">
        <h1 className="story-title">PastPort</h1>
        <p className="story-subtitle">
          Walk through history — explore the legacy of {selectedFort.name}.
        </p>
      </div>

      {/* Horizontal Storytelling Timeline (past → present) */}
      <div ref={timelineRef}>
        <Timeline
          chapters={selectedFort.timeline || []}
          expandedChapter={expandedChapter}
          onToggleChapter={toggleChapter}
          language={timelineLanguage}
          onLanguageChange={setTimelineLanguage}
        />
      </div>

      {/* Transition Note */}
      <div className="transition-note">
        "History is not just about dates and events; it's about the people who lived them,
        the stones that witnessed them, and the stories that survive them."
      </div>

      {/* 360° Immersive Experience */}
      <div
        className={`immersive-experience ${isFullImmersive ? 'full-immersive-mode' : ''}`}
        ref={immersiveRef}
      >

        {!isFullImmersive && (
          <>
            <span className="immersive-eyebrow">IMMERSIVE EXPERIENCE</span>
            <h2 className="immersive-title">Step Inside {selectedFort.name}</h2>
            <p className="immersive-subtitle">
              Explore every corner in stunning 360° detail.
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
                <span className="auto-play-icon">▶️</span>
                <span className="auto-play-status">
                  {isAutoPlaying ? 'Auto-playing' : 'Paused'}
                </span>
              </div>
            )}

            {/* "Drag to Explore" overlay - HIDES in full immersive mode */}
            {!isFullImmersive && (
              <div className="immersive-viewport-overlay">
                <div className="immersive-drag-icon">↔️</div>
                <div className="immersive-drag-text">Drag to Explore 360°</div>
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
                  {isAutoPlaying ? '⏸️' : '▶️'}
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
                  {isFullImmersive ? '✕' : '⛶'}
                </span>
              </button>

              {!isFullImmersive && (
                <button
                  type="button"
                  className="immersive-view-badge immersive-view-badge-btn"
                  onClick={() => setShow360(true)}
                  aria-label="Open 360° Interactive View"
                >
                  360° Interactive View
                </button>
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
                <span className="auto-play-status"> • Auto-playing</span>
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

      {/* 360° Interactive Viewer Modal — Google Street View */}
      {show360 && (
        <Shivneri360Gallery
          onClose={() => setShow360(false)}
        />
      )}

      {/* IMMERSIVE EXPLORE SECTIONS */}
      <FlavorsSection />
      <BazaarSection />
      <ItineraryPlanner />
      <SpiritSection />


      <SmartExplorationPreview
        fortName={selectedFort.name}
        onOpenExploration={() => navigate(`/pastport/${selectedFort.id}/smart-exploration`)}
      />

      {/* Story Footer */}
      <div className="story-footer">
        <p className="footer-quote">
          "We are not makers of history. We are made by history."
          <br />
          <span style={{ fontSize: '0.9rem', display: 'block', marginTop: '0.5rem' }}>
            — Martin Luther King Jr.
          </span>
        </p>
        <p style={{ color: '#8b5a2b', fontWeight: '600' }}>
          PastPort Maharashtra • Preserving Heritage Through Storytelling
        </p>
        <p style={{ fontSize: '0.9rem', color: '#5a4a3a', marginTop: '0.5rem' }}>
          All historical narratives are based on verified sources and local oral traditions
        </p>
      </div>
    </div>
  );
};

export default PastPort;