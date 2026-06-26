import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { maharashtraForts as staticForts } from "../../services/fortData";
import { fetchForts } from "../../services/supabaseService";
import { shivneriData } from "../../data/shivneriData";
import Timeline from "./Timeline";
import Shivneri360Gallery from "../Shivneri360Gallery";
import FlavorsSection from "./FlavorsSection";
import BazaarSection from "./BazaarSection";
import CultureSection from "./CultureSection";
import ItineraryPlanner from "./ItineraryPlanner";

import "./PastPort.css";

const HOUR_OPTIONS = [2, 3, 4, 6];

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

const PastPort = () => {
  const navigate = useNavigate();
  const [forts, setForts] = useState(staticForts);
  const [loading, setLoading] = useState(true);
  const [selectedFort, setSelectedFort] = useState(null);
  const [expandedChapter, setExpandedChapter] = useState(null);
  const [selectedHours, setSelectedHours] = useState(null);
  const [timelineLanguage, setTimelineLanguage] = useState("en");

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchForts();
        if (data && data.length > 0) {
          setForts(data);
          setSelectedFort(prev => {
            if (!prev) return null;
            return data.find(f => f.id === prev.id) || prev;
          });
        }
      } catch (err) {
        console.warn("Failed to load forts from Supabase, using local fallback:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCardId, setActiveCardId] = useState(null);
  const [activeFacet, setActiveFacet] = useState(null);

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

  const startAutoPlay = () => {
    if (!selectedFort?.images360?.length) return;
    clearInterval(autoPlayRef.current);
    setIsAutoPlaying(true);
    autoPlayRef.current = setInterval(() => {
      setActive360Index((prev) =>
        prev === (selectedFort.images360 || []).length - 1 ? 0 : prev + 1
      );
    }, 4000);
  };

  const stopAutoPlay = () => {
    clearInterval(autoPlayRef.current);
    autoPlayRef.current = null;
    setIsAutoPlaying(false);
  };

  const resumeAutoPlayAfterDelay = () => {
    clearTimeout(userInteractionTimerRef.current);
    userInteractionTimerRef.current = setTimeout(() => {
      if (selectedFort?.images360?.length) startAutoPlay();
    }, 8000);
  };

  useEffect(() => {
    if (selectedFort?.images360?.length) startAutoPlay();
    return () => {
      clearInterval(autoPlayRef.current);
      clearTimeout(userInteractionTimerRef.current);
    };
  }, [selectedFort?.id, isFullImmersive]);

  useEffect(() => {
    const handleReset = () => {
      setSelectedFort(null);
      setExpandedChapter(null);
      setActiveCardId(null);
      setActiveFacet(null);
      setActive360Index(0);
      setIsFullImmersive(false);
      stopAutoPlay();
    };
    window.addEventListener("resetPastPort", handleReset);
    return () => window.removeEventListener("resetPastPort", handleReset);
  }, []);

  useEffect(() => {
    if (selectedFort) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedFort]);

  useEffect(() => {
    setTimeout(() => {
      if (selectedFort?.images360?.length) startAutoPlay();
    }, 300);
  }, [isFullImmersive]);

  const handleMouseDown = (e) => {
    stopAutoPlay();
    setIsDragging(true);
    dragStartX.current = e.clientX;
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
  };

  const handleMouseUp = (e) => {
    if (!isDragging || dragStartX.current === null) return;
    const diff = e.clientX - dragStartX.current;
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
    resumeAutoPlayAfterDelay();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      dragStartX.current = null;
      resumeAutoPlayAfterDelay();
    }
  };

  const handleTouchStart = (e) => {
    stopAutoPlay();
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
    resumeAutoPlayAfterDelay();
  };

  const handleCardClick = (index) => {
    stopAutoPlay();
    setActive360Index(index);
    resumeAutoPlayAfterDelay();
  };

  const enterFullImmersive = () => {
    const element = immersiveRef.current;
    if (!element) return;
    if (element.requestFullscreen) element.requestFullscreen();
    else if (element.webkitRequestFullscreen) element.webkitRequestFullscreen();
    else if (element.msRequestFullscreen) element.msRequestFullscreen();
    setTimeout(() => {
      if (selectedFort?.images360?.length) startAutoPlay();
    }, 100);
  };

  const exitFullImmersive = () => {
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    else if (document.msExitFullscreen) document.msExitFullscreen();
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreen = !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
      );
      setIsFullImmersive(isFullscreen);
      if (selectedFort?.images360?.length) {
        setTimeout(() => startAutoPlay(), 500);
      }
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("msfullscreenchange", handleFullscreenChange);
    };
  }, [selectedFort?.images360]);

  const toggleChapter = (index) => {
    setExpandedChapter(expandedChapter === index ? null : index);
  };

  const handleBackToForts = () => {
    setSelectedFort(null);
    setExpandedChapter(null);
    setActiveCardId(null);
    setActiveFacet(null);
    setSelectedHours(null);
    setActive360Index(0);
    setIsFullImmersive(false);
    stopAutoPlay();
    setTimeout(() => {
      document.getElementById('fort-selection-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
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
    if (selectedFort?.images360?.length) startAutoPlay();
  }, [selectedFort?.id]);

  // ─── FORT SELECTION VIEW ───────────────────────────────────────────────────
  if (!selectedFort) {
    const scrollToForts = () => {
      document.getElementById('fort-selection-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
      <div className="pastport-storytelling" style={{ paddingTop: '80px' }}>
        <div
          className="scroll-progress"
          style={{ transform: `scaleX(${scrollProgress / 100})`, top: '80px' }}
        />
        
        {/* Full-screen Hero for Fort Selection */}
        <div
          className="fort-hero"
          style={{
            height: 'calc(100vh - 80px)',
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8)), url('/marathi_vibe_fort_bg.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="hero-overlay hero-overlay--center-bottom">
            <h1 className="fort-hero-name" style={{ fontSize: '5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>PastPort</h1>
            <p className="fort-hero-subtitle" style={{ maxWidth: '600px', margin: '0 auto 3rem' }}>
              Choose a fort and walk through its story — from past to present.
            </p>
            <div className="scroll-hint" onClick={scrollToForts} style={{ cursor: 'pointer', padding: '1rem', transition: 'transform 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
              <span className="scroll-hint-text">Scroll to explore</span>
              <span className="scroll-hint-icon">↓</span>
            </div>
          </div>
        </div>

        <section id="fort-selection-section" className="fort-selection-section" style={{ padding: '5rem 2rem' }}>
          <h2 className="fort-selection-heading" style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>Choose Your Fort</h2>
          <div className="fort-selection-grid">
            {forts.map((fort) => {
              const isActive = activeCardId === fort.id;
              return (
              <div
                key={fort.id}
                className={`fort-card interactive-card ${isActive ? 'active-card' : ''}`}
                onClick={() => setActiveCardId(isActive ? null : fort.id)}
                style={{
                  transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  cursor: 'pointer',
                  transform: isActive ? 'scale(1.05)' : 'scale(1)',
                  gridColumn: isActive ? '1 / -1' : 'auto',
                  zIndex: isActive ? 10 : 1,
                  display: 'flex',
                  flexDirection: isActive ? 'row' : 'column',
                  gap: isActive ? '2rem' : '0',
                  boxShadow: isActive ? '0 25px 50px rgba(0,0,0,0.2)' : '0 4px 20px rgba(0, 0, 0, 0.06)'
                }}
              >
                <div
                  className="fort-card-image"
                  style={{
                    flex: isActive ? '1' : 'none',
                    backgroundImage: `url(${fort.imageUrl || fort.image || ""})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: isActive ? "100%" : "250px",
                    minHeight: isActive ? "300px" : "250px",
                    position: "relative",
                    borderRadius: isActive ? "16px 0 0 16px" : "16px 16px 0 0"
                  }}
                >
                  <div className="fort-card-overlay" style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                    opacity: isActive ? 1 : 0,
                    transition: 'opacity 0.3s',
                    borderRadius: isActive ? "16px 0 0 16px" : "16px 16px 0 0"
                  }}/>
                </div>
                <div className="fort-card-content" style={{ 
                  flex: isActive ? '1' : 'none',
                  position: 'relative', 
                  zIndex: 2, 
                  background: 'white', 
                  padding: isActive ? '3rem 2rem' : '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  borderRadius: isActive ? "0 16px 16px 0" : "0 0 16px 16px"
                }}>
                  {isActive && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); setActiveCardId(null); }}
                      style={{
                        position: 'absolute',
                        top: '1.5rem',
                        right: '1.5rem',
                        background: 'transparent',
                        border: 'none',
                        fontSize: '1.5rem',
                        color: '#8b5a2b',
                        cursor: 'pointer',
                        padding: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'transform 0.3s, color 0.3s',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#c62828'; e.currentTarget.style.transform = 'scale(1.2)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = '#8b5a2b'; e.currentTarget.style.transform = 'scale(1)'; }}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  )}
                  <h3 className="fort-card-name" style={{ fontSize: isActive ? '2.5rem' : '1.8rem', marginBottom: '0.5rem', color: '#2c1810' }}>{fort.name}</h3>
                  <p className="fort-card-subtitle" style={{ fontSize: '1.1rem', color: '#666', fontStyle: 'italic', marginBottom: isActive ? '1.5rem' : '0' }}>
                    {fort.era || fort.subtitle}
                  </p>
                  
                  {isActive && (
                    <div style={{ animation: 'fadeInModal 0.5s ease forwards' }}>
                      <p style={{ color: '#3e2c1c', lineHeight: 1.6, marginBottom: '1.5rem', fontSize: '1.05rem' }}>
                        {fort.significance}
                      </p>
                      {fort.quickFacts && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
                          <span style={{ background: '#f5e9d9', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.9rem', color: '#8b5a2b', fontWeight: '600' }}>
                            📍 {fort.location}
                          </span>
                        </div>
                      )}
                      <button 
                        className="immersive-cta" 
                        onClick={(e) => { e.stopPropagation(); setSelectedFort(fort); }}
                        style={{ marginTop: '0', width: 'auto', padding: '1rem 2rem' }}
                      >
                        Enter PastPort Experience
                      </button>
                    </div>
                  )}

                  {!isActive && (
                    <div className="fort-explore-btn" style={{
                      marginTop: '1.5rem',
                      color: '#b37a4e',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      fontSize: '0.9rem',
                      letterSpacing: '1px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      opacity: 0.8,
                      transition: 'opacity 0.3s'
                    }}>
                      View Details <span style={{ transition: 'transform 0.3s' }}>→</span>
                    </div>
                  )}
                </div>
              </div>
            )})}
          </div>
        </section>
        {/* Footer is rendered by App.jsx — no duplicate footer here */}
      </div>
    );
  }

  // ─── FORT DETAIL VIEW ─────────────────────────────────────────────────────
  if (activeFacet) {
    return (
      <div className="facet-page-container" style={{ minHeight: '100vh', background: '#fdfaf3', fontFamily: "'DM Sans', sans-serif", position: 'relative' }}>
        <button 
          onClick={() => { 
            setActiveFacet(null); 
            setTimeout(() => {
              const el = document.getElementById('explore-facets');
              if (el) {
                const y = el.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top: y, behavior: 'smooth' });
              }
            }, 10);
          }}
          style={{ 
            margin: '0', padding: '8px 20px', background: 'rgba(0, 0, 0, 0.6)', color: '#fff', 
            border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer', borderRadius: '30px',
            fontSize: '0.95rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px',
            transition: 'all 0.3s ease', zIndex: 1000, position: 'fixed', top: '88px', left: '40px',
            backdropFilter: 'blur(4px)'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateX(-4px)'; e.currentTarget.style.background = 'rgba(0, 0, 0, 0.8)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.background = 'rgba(0, 0, 0, 0.6)'; }}
        >
          ← Back to {selectedFort?.name || "Fort"}
        </button>
        {activeFacet === 'cuisine' && <FlavorsSection fort={selectedFort} />}
        {activeFacet === 'bazaar' && <BazaarSection fort={selectedFort} />}
        {activeFacet === 'culture' && <CultureSection fort={selectedFort} />}
        {activeFacet === 'itinerary' && <ItineraryPlanner fort={selectedFort} />}
      </div>
    );
  }

  const images360 = selectedFort.images360 || [];
  const has360Images = images360.length > 0;

  return (
    <div className="pastport-storytelling">
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${scrollProgress / 100})`, top: '80px' }}
      />

      {/* Back to fort selection grid */}
      <button 
        className="back-to-forts" 
        onClick={handleBackToForts}
        style={{
          position: 'fixed',
          top: '88px',
          right: '2rem',
          zIndex: 1000,
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          color: '#fff',
          padding: '0.8rem 1.5rem',
          borderRadius: '30px',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '1rem',
          fontWeight: 'bold',
          width: 'fit-content',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'; e.currentTarget.style.transform = 'translateY(0)'; }}
      >
        <i className="fas fa-arrow-left"></i> Back to Forts
      </button>

      {/* Hero */}
      <div
        className="fort-hero"
        style={{
          height: 'calc(100vh - 80px)',
          backgroundImage: `url(${selectedFort.imageUrl || selectedFort.image || ""})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          marginTop: '80px'
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

      {/* Timeline */}
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
        "History is not just about dates and events; it's about the people who
        lived them, the stones that witnessed them, and the stories that survive
        them."
      </div>

      {/* 360° Immersive Experience */}
      <div
        className={`immersive-experience ${isFullImmersive ? "full-immersive-mode" : ""}`}
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
                      backgroundImage: `url(${item.src || item.url || item.image || ""})`,
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

            {isFullImmersive && (
              <div className="auto-play-indicator">
                <span className="auto-play-icon">▶️</span>
                <span className="auto-play-status">
                  {isAutoPlaying ? "Auto-playing" : "Paused"}
                </span>
              </div>
            )}

            {!isFullImmersive && (
              <div className="immersive-viewport-overlay">
                <div className="immersive-drag-icon">↔️</div>
                <div className="immersive-drag-text">Drag to Explore 360°</div>
                <div className="immersive-drag-hint">
                  Swipe left/right to rotate view
                </div>
              </div>
            )}

            <div className="immersive-viewport-controls">
              <button
                type="button"
                className="immersive-control-btn"
                aria-label={isAutoPlaying ? "Pause auto-play" : "Play auto-play"}
                onClick={() => {
                  if (isAutoPlaying) stopAutoPlay();
                  else startAutoPlay();
                }}
              >
                <span className="immersive-control-icon">
                  {isAutoPlaying ? "⏸️" : "▶️"}
                </span>
              </button>

              <button
                type="button"
                className="immersive-control-btn"
                aria-label={isFullImmersive ? "Exit Fullscreen" : "Fullscreen"}
                onClick={isFullImmersive ? exitFullImmersive : enterFullImmersive}
              >
                <span className="immersive-control-icon">
                  {isFullImmersive ? "✕" : "⛶"}
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
                <span className="immersive-card-label">
                  {item.label || `View ${index + 1}`}
                </span>
                {item.subtitle && (
                  <span className="immersive-card-subtitle">{item.subtitle}</span>
                )}
              </button>
            ))}
          </div>
        )}

        {!isFullImmersive && (
          <button
            type="button"
            className="immersive-cta"
            onClick={enterFullImmersive}
          >
            Enter Full Immersive Mode
          </button>
        )}

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

      {/* 360° Interactive Viewer Modal */}
      {show360 && <Shivneri360Gallery onClose={() => setShow360(false)} />}

      {/* Explore Every Facet - 4 Cards UI */}
      <div id="explore-facets" style={{
        padding: '80px 40px',
        maxWidth: '1400px',
        margin: '0 auto',
        fontFamily: "'DM Sans', sans-serif"
      }}>
        <div style={{ textAlign: 'center', margin: '60px 0 50px' }}>
          <span style={{ display: 'block', fontSize: '0.8rem', letterSpacing: '0.24em', color: '#c0622a', fontWeight: '700', textTransform: 'uppercase', marginBottom: '12px' }}>DISCOVER MORE</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.4rem, 4vw, 3.2rem)', fontWeight: '800', color: '#2c1810', margin: '0 0 16px' }}>Explore Every Facet</h2>
          <p style={{ fontSize: '1.1rem', color: '#666666', fontWeight: '400', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>Delve deeper into the rich heritage, culinary wonders, and vibrant culture of {selectedFort.name}.</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '30px'
        }}>
          {/* Card 1: Famous Cuisine */}
          <div 
            onClick={() => { setActiveFacet('cuisine'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            style={{
              background: '#ffffff', borderRadius: '24px', cursor: 'pointer',
              position: 'relative', overflow: 'hidden',
              transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
              display: 'flex', flexDirection: 'column',
              boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
              border: '1px solid rgba(0,0,0,0.05)'
            }}
            onMouseEnter={(e) => { 
              e.currentTarget.style.transform = 'translateY(-12px)'; 
              e.currentTarget.style.boxShadow = '0 30px 60px rgba(192,98,42,0.15)'; 
              e.currentTarget.style.borderColor = 'rgba(192,98,42,0.2)';
              e.currentTarget.querySelector('.facet-img-1').style.transform = 'scale(1.1)';
              e.currentTarget.querySelector('.facet-icon-1').style.transform = 'scale(1.1) rotate(8deg)';
              e.currentTarget.querySelector('.facet-icon-1').style.color = '#fff';
              e.currentTarget.querySelector('.facet-icon-1').style.background = '#c0622a';
              e.currentTarget.querySelector('.facet-arrow-1').style.transform = 'translateX(8px)';
            }}
            onMouseLeave={(e) => { 
              e.currentTarget.style.transform = 'translateY(0)'; 
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.06)'; 
              e.currentTarget.style.borderColor = 'rgba(0,0,0,0.05)';
              e.currentTarget.querySelector('.facet-img-1').style.transform = 'scale(1)';
              e.currentTarget.querySelector('.facet-icon-1').style.transform = 'scale(1) rotate(0)';
              e.currentTarget.querySelector('.facet-icon-1').style.color = '#c0622a';
              e.currentTarget.querySelector('.facet-icon-1').style.background = '#ffffff';
              e.currentTarget.querySelector('.facet-arrow-1').style.transform = 'translateX(0)';
            }}
          >
            {/* Image Section */}
            <div style={{ width: '100%', height: '220px', overflow: 'hidden', position: 'relative' }}>
              <img 
                className="facet-img-1"
                src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=600&auto=format&fit=crop" 
                alt="Cuisine" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)' }} 
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.3))' }}></div>
              <div 
                className="facet-icon-1"
                style={{ 
                  position: 'absolute', bottom: '-20px', right: '24px', 
                  width: '56px', height: '56px', borderRadius: '50%', 
                  background: '#ffffff', color: '#c0622a', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  fontSize: '1.6rem', boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                  transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)', zIndex: 2
                }}>
                🍽️
              </div>
            </div>

            {/* Content Section */}
            <div style={{ padding: '36px 30px 30px', display: 'flex', flexDirection: 'column', flex: 1, position: 'relative', zIndex: 1 }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', color: '#2c1810', margin: '0 0 12px' }}>Famous Cuisine</h3>
              <p style={{ color: '#666666', fontSize: '0.95rem', lineHeight: '1.6', margin: '0 0 24px', flex: 1, fontWeight: '400' }}>
                Taste the heritage. Discover local delicacies, traditional recipes, and where to find the best food around the fort.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', color: '#c0622a', fontSize: '0.9rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Explore <span className="facet-arrow-1" style={{ marginLeft: '8px', transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)' }}>→</span>
              </div>
            </div>
          </div>

          {/* Card 2: Heritage Bazaar */}
          <div 
            onClick={() => { setActiveFacet('bazaar'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            style={{
              background: '#ffffff', borderRadius: '24px', cursor: 'pointer',
              position: 'relative', overflow: 'hidden',
              transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
              display: 'flex', flexDirection: 'column',
              boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
              border: '1px solid rgba(0,0,0,0.05)'
            }}
            onMouseEnter={(e) => { 
              e.currentTarget.style.transform = 'translateY(-12px)'; 
              e.currentTarget.style.boxShadow = '0 30px 60px rgba(46,204,113,0.15)'; 
              e.currentTarget.style.borderColor = 'rgba(46,204,113,0.2)';
              e.currentTarget.querySelector('.facet-img-2').style.transform = 'scale(1.1)';
              e.currentTarget.querySelector('.facet-icon-2').style.transform = 'scale(1.1) rotate(8deg)';
              e.currentTarget.querySelector('.facet-icon-2').style.color = '#fff';
              e.currentTarget.querySelector('.facet-icon-2').style.background = '#2ecc71';
              e.currentTarget.querySelector('.facet-arrow-2').style.transform = 'translateX(8px)';
            }}
            onMouseLeave={(e) => { 
              e.currentTarget.style.transform = 'translateY(0)'; 
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.06)'; 
              e.currentTarget.style.borderColor = 'rgba(0,0,0,0.05)';
              e.currentTarget.querySelector('.facet-img-2').style.transform = 'scale(1)';
              e.currentTarget.querySelector('.facet-icon-2').style.transform = 'scale(1) rotate(0)';
              e.currentTarget.querySelector('.facet-icon-2').style.color = '#2ecc71';
              e.currentTarget.querySelector('.facet-icon-2').style.background = '#ffffff';
              e.currentTarget.querySelector('.facet-arrow-2').style.transform = 'translateX(0)';
            }}
          >
            <div style={{ width: '100%', height: '220px', overflow: 'hidden', position: 'relative' }}>
              <img 
                className="facet-img-2"
                src="/heritage_bazaar_maharashtra.png"
                alt="Maharashtrian Heritage Bazaar - Kolhapuri crafts, Paithani sarees and traditional handicrafts" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)' }} 
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.3))' }}></div>
              <div 
                className="facet-icon-2"
                style={{ 
                  position: 'absolute', bottom: '-20px', right: '24px', 
                  width: '56px', height: '56px', borderRadius: '50%', 
                  background: '#ffffff', color: '#2ecc71', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  fontSize: '1.6rem', boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                  transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)', zIndex: 2
                }}>
                🛍️
              </div>
            </div>

            <div style={{ padding: '36px 30px 30px', display: 'flex', flexDirection: 'column', flex: 1, position: 'relative', zIndex: 1 }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', color: '#2c1810', margin: '0 0 12px' }}>Heritage Bazaar</h3>
              <p style={{ color: '#666666', fontSize: '0.95rem', lineHeight: '1.6', margin: '0 0 24px', flex: 1, fontWeight: '400' }}>
                Take a piece of history home. Shop for traditional handicrafts, souvenirs, and local artifacts.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', color: '#2ecc71', fontSize: '0.9rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Explore <span className="facet-arrow-2" style={{ marginLeft: '8px', transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)' }}>→</span>
              </div>
            </div>
          </div>

          {/* Card 3: Cultural Experience */}
          <div 
            onClick={() => { setActiveFacet('culture'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            style={{
              background: '#ffffff', borderRadius: '24px', cursor: 'pointer',
              position: 'relative', overflow: 'hidden',
              transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
              display: 'flex', flexDirection: 'column',
              boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
              border: '1px solid rgba(0,0,0,0.05)'
            }}
            onMouseEnter={(e) => { 
              e.currentTarget.style.transform = 'translateY(-12px)'; 
              e.currentTarget.style.boxShadow = '0 30px 60px rgba(155,89,182,0.15)'; 
              e.currentTarget.style.borderColor = 'rgba(155,89,182,0.2)';
              e.currentTarget.querySelector('.facet-img-3').style.transform = 'scale(1.1)';
              e.currentTarget.querySelector('.facet-icon-3').style.transform = 'scale(1.1) rotate(8deg)';
              e.currentTarget.querySelector('.facet-icon-3').style.color = '#fff';
              e.currentTarget.querySelector('.facet-icon-3').style.background = '#9b59b6';
              e.currentTarget.querySelector('.facet-arrow-3').style.transform = 'translateX(8px)';
            }}
            onMouseLeave={(e) => { 
              e.currentTarget.style.transform = 'translateY(0)'; 
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.06)'; 
              e.currentTarget.style.borderColor = 'rgba(0,0,0,0.05)';
              e.currentTarget.querySelector('.facet-img-3').style.transform = 'scale(1)';
              e.currentTarget.querySelector('.facet-icon-3').style.transform = 'scale(1) rotate(0)';
              e.currentTarget.querySelector('.facet-icon-3').style.color = '#9b59b6';
              e.currentTarget.querySelector('.facet-icon-3').style.background = '#ffffff';
              e.currentTarget.querySelector('.facet-arrow-3').style.transform = 'translateX(0)';
            }}
          >
            <div style={{ width: '100%', height: '220px', overflow: 'hidden', position: 'relative' }}>
              <img 
                className="facet-img-3"
                src="/cultural_dhol_tasha_maharashtra.png" 
                alt="Maharashtrian Cultural Experience - Dhol Tasha Pathak during Ganesh festival" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)' }} 
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.3))' }}></div>
              <div 
                className="facet-icon-3"
                style={{ 
                  position: 'absolute', bottom: '-20px', right: '24px', 
                  width: '56px', height: '56px', borderRadius: '50%', 
                  background: '#ffffff', color: '#9b59b6', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  fontSize: '1.6rem', boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                  transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)', zIndex: 2
                }}>
                🎭
              </div>
            </div>

            <div style={{ padding: '36px 30px 30px', display: 'flex', flexDirection: 'column', flex: 1, position: 'relative', zIndex: 1 }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', color: '#2c1810', margin: '0 0 12px' }}>Cultural Experience</h3>
              <p style={{ color: '#666666', fontSize: '0.95rem', lineHeight: '1.6', margin: '0 0 24px', flex: 1, fontWeight: '400' }}>
                Immerse yourself in local traditions, art forms, and cultural festivals unique to this region.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', color: '#9b59b6', fontSize: '0.9rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Explore <span className="facet-arrow-3" style={{ marginLeft: '8px', transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)' }}>→</span>
              </div>
            </div>
          </div>

          {/* Card 4: Travel Itinerary */}
          <div 
            onClick={() => { setActiveFacet('itinerary'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            style={{
              background: '#ffffff', borderRadius: '24px', cursor: 'pointer',
              position: 'relative', overflow: 'hidden',
              transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
              display: 'flex', flexDirection: 'column',
              boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
              border: '1px solid rgba(0,0,0,0.05)'
            }}
            onMouseEnter={(e) => { 
              e.currentTarget.style.transform = 'translateY(-12px)'; 
              e.currentTarget.style.boxShadow = '0 30px 60px rgba(52,152,219,0.15)'; 
              e.currentTarget.style.borderColor = 'rgba(52,152,219,0.2)';
              e.currentTarget.querySelector('.facet-img-4').style.transform = 'scale(1.1)';
              e.currentTarget.querySelector('.facet-icon-4').style.transform = 'scale(1.1) rotate(8deg)';
              e.currentTarget.querySelector('.facet-icon-4').style.color = '#fff';
              e.currentTarget.querySelector('.facet-icon-4').style.background = '#3498db';
              e.currentTarget.querySelector('.facet-arrow-4').style.transform = 'translateX(8px)';
            }}
            onMouseLeave={(e) => { 
              e.currentTarget.style.transform = 'translateY(0)'; 
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.06)'; 
              e.currentTarget.style.borderColor = 'rgba(0,0,0,0.05)';
              e.currentTarget.querySelector('.facet-img-4').style.transform = 'scale(1)';
              e.currentTarget.querySelector('.facet-icon-4').style.transform = 'scale(1) rotate(0)';
              e.currentTarget.querySelector('.facet-icon-4').style.color = '#3498db';
              e.currentTarget.querySelector('.facet-icon-4').style.background = '#ffffff';
              e.currentTarget.querySelector('.facet-arrow-4').style.transform = 'translateX(0)';
            }}
          >
            <div style={{ width: '100%', height: '220px', overflow: 'hidden', position: 'relative' }}>
              <img 
                className="facet-img-4"
                src="/travel_itinerary_maharashtra.png"
                alt="Travel Itinerary - Sahyadri Western Ghats winding roads and Maratha fort hilltop" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)' }} 
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.3))' }}></div>
              <div 
                className="facet-icon-4"
                style={{ 
                  position: 'absolute', bottom: '-20px', right: '24px', 
                  width: '56px', height: '56px', borderRadius: '50%', 
                  background: '#ffffff', color: '#3498db', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  fontSize: '1.6rem', boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                  transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)', zIndex: 2
                }}>
                🗺️
              </div>
            </div>

            <div style={{ padding: '36px 30px 30px', display: 'flex', flexDirection: 'column', flex: 1, position: 'relative', zIndex: 1 }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', color: '#2c1810', margin: '0 0 12px' }}>Travel Itinerary</h3>
              <p style={{ color: '#666666', fontSize: '0.95rem', lineHeight: '1.6', margin: '0 0 24px', flex: 1, fontWeight: '400' }}>
                Plan your perfect visit with expert guides, smart exploration routes, and budget planners.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', color: '#3498db', fontSize: '0.9rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Explore <span className="facet-arrow-4" style={{ marginLeft: '8px', transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)' }}>→</span>
              </div>
            </div>
          </div>


        </div>
      </div>

      {/* Footer is rendered by App.jsx — no duplicate footer needed here */}
    </div>
  );
};

export default PastPort;