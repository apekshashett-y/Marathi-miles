// ═══════════════════════════════════════════════════════
//  ExploreMore.jsx  —  Heritage Gateway Cards
//  Stunning dark UI with cinematic animations
// ═══════════════════════════════════════════════════════

import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CARDS = [
  {
    id: "cuisine",
    icon: "🍛",
    label: "Famous Cuisine",
    tagline: "Taste the Heritage",
    description: "Authentic dishes born in the shadow of the fort — from smoky bhakri to royal thalis passed down through centuries.",
    gradient: "linear-gradient(160deg, #7c1d00 0%, #c94a00 45%, #f07200 100%)",
    glowColor: "rgba(240, 114, 0, 0.6)",
    accentColor: "#f07200",
    imgUrl: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=900&auto=format&fit=crop&q=80",
    number: "01",
    tag: "FOOD & FLAVOURS",
  },
  {
    id: "shopping",
    icon: "🛍️",
    label: "Heritage Bazaar",
    tagline: "Shop the Legacy",
    description: "Warli art, Kolhapuri crafts, wild honey, and fort miniatures handcrafted by local artisans keeping traditions alive.",
    gradient: "linear-gradient(160deg, #2d0a5e 0%, #6b3fa0 45%, #9b5fc4 100%)",
    glowColor: "rgba(155, 95, 196, 0.6)",
    accentColor: "#9b5fc4",
    imgUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&auto=format&fit=crop&q=80",
    number: "02",
    tag: "CRAFT & CULTURE",
  },
  {
    id: "experience",
    icon: "🎭",
    label: "Cultural Experience",
    tagline: "Live the History",
    description: "Shiv Jayanti celebrations, folk performances, immersive fort walks and tribal storytelling under open skies.",
    gradient: "linear-gradient(160deg, #0a3d20 0%, #1a6b3a 45%, #27ae60 100%)",
    glowColor: "rgba(39, 174, 96, 0.6)",
    accentColor: "#27ae60",
    imgUrl: "https://images.unsplash.com/photo-1567591370429-9c7527c82459?w=900&auto=format&fit=crop&q=80",
    number: "03",
    tag: "EVENTS & FESTIVALS",
  },
  {
    id: "itinerary",
    icon: "🗺️",
    label: "Travel Itinerary",
    tagline: "Plan Your Journey",
    description: "Smart day plans, local guides, budget planner and perfectly optimised exploration routes for every traveller.",
    gradient: "linear-gradient(160deg, #4a1500 0%, #8b3a00 45%, #c0622a 100%)",
    glowColor: "rgba(192, 98, 42, 0.6)",
    accentColor: "#c0622a",
    imgUrl: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=900&auto=format&fit=crop&q=80",
    number: "04",
    tag: "ROUTES & GUIDES",
  },
];

const CSS_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

.em2-section {
  position: relative;
  padding: 100px 48px 80px;
  background: #0e0a05;
  overflow: hidden;
  font-family: 'DM Sans', sans-serif;
}

.em2-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
  opacity: 0.18;
  z-index: 0;
}
.em2-orb--1 {
  width: 600px; height: 600px;
  background: radial-gradient(circle, #c94a00, transparent);
  top: -200px; left: -100px;
  animation: em2OrbFloat 12s ease-in-out infinite;
}
.em2-orb--2 {
  width: 500px; height: 500px;
  background: radial-gradient(circle, #6b3fa0, transparent);
  bottom: -150px; right: -80px;
  animation: em2OrbFloat 15s ease-in-out infinite reverse;
}
.em2-orb--3 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, #1a6b3a, transparent);
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  animation: em2OrbFloat 18s ease-in-out infinite 3s;
}
@keyframes em2OrbFloat {
  0%, 100% { transform: translate(0, 0); }
  33% { transform: translate(30px, -20px); }
  66% { transform: translate(-20px, 30px); }
}

.em2-header {
  text-align: center;
  margin-bottom: 64px;
  position: relative;
  z-index: 2;
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.em2-header--in {
  opacity: 1;
  transform: translateY(0);
}
.em2-eyebrow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 20px;
}
.em2-eyebrow__line {
  display: block;
  width: 40px; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(192,98,42,0.8));
}
.em2-eyebrow__line:last-child {
  background: linear-gradient(90deg, rgba(192,98,42,0.8), transparent);
}
.em2-eyebrow__text {
  font-size: 0.68rem;
  letter-spacing: 0.3em;
  color: #c0622a;
  font-weight: 700;
  text-transform: uppercase;
}
.em2-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.8rem, 5vw, 4.5rem);
  font-weight: 800;
  color: #f5ede0;
  line-height: 1.05;
  margin: 0 0 16px;
  letter-spacing: -0.02em;
}
.em2-title__italic {
  font-style: italic;
  color: #c0622a;
  position: relative;
}
.em2-title__italic::after {
  content: '';
  position: absolute;
  bottom: 4px; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, #c0622a, transparent);
  border-radius: 1px;
}
.em2-subtitle {
  font-size: 1.05rem;
  color: rgba(245,237,224,0.5);
  font-weight: 300;
  max-width: 420px;
  margin: 0 auto;
  line-height: 1.65;
}
.em2-subtitle strong {
  color: rgba(245,237,224,0.85);
  font-weight: 600;
}

.em2-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  max-width: 1360px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}
@media (max-width: 1100px) { .em2-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; } }
@media (max-width: 600px)  { .em2-grid { grid-template-columns: 1fr; gap: 14px; } }
@media (max-width: 768px)  { .em2-section { padding: 60px 20px 60px; } }

.em2-card {
  position: relative;
  height: 420px;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  border: none;
  padding: 0;
  text-align: left;
  background: var(--c-gradient);
  outline: none;
  opacity: 0;
  transform: translateY(60px) scale(0.96);
  transition:
    opacity 0.7s cubic-bezier(0.22,0.61,0.36,1) var(--c-delay),
    transform 0.7s cubic-bezier(0.22,0.61,0.36,1) var(--c-delay),
    box-shadow 0.4s ease;
  box-shadow: 0 4px 20px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06);
}
.em2-card--in {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.em2-card--hovered {
  transform: translateY(-12px) scale(1.025) !important;
  box-shadow:
    0 32px 64px rgba(0,0,0,0.5),
    0 0 60px var(--c-glow),
    0 0 0 1px rgba(255,255,255,0.12);
  z-index: 10;
}
.em2-card--clicked {
  transform: scale(0.96) !important;
  transition: transform 0.15s ease !important;
}

.em2-card__img-wrap {
  position: absolute;
  inset: 0; z-index: 0;
}
.em2-card__img {
  width: 100%; height: 100%;
  object-fit: cover;
  opacity: 0.28;
  transition: opacity 0.5s ease, transform 0.65s cubic-bezier(0.22,0.61,0.36,1);
}
.em2-card--hovered .em2-card__img {
  opacity: 0.45;
  transform: scale(1.1);
}

.em2-card__overlay {
  position: absolute;
  inset: 0; z-index: 1;
  background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.05) 100%);
  transition: background 0.4s ease;
}
.em2-card--hovered .em2-card__overlay {
  background: linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.38) 55%, rgba(0,0,0,0.08) 100%);
}

.em2-card__glow {
  position: absolute;
  inset: 0; z-index: 2;
  opacity: 0;
  background: radial-gradient(ellipse at 50% 110%, var(--c-glow) 0%, transparent 65%);
  transition: opacity 0.4s ease;
  pointer-events: none;
}
.em2-card--hovered .em2-card__glow { opacity: 0.55; }

.em2-card__top {
  position: absolute;
  top: 22px; left: 22px; right: 22px;
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.em2-card__number {
  font-size: 0.68rem;
  font-weight: 700;
  color: rgba(255,255,255,0.35);
  letter-spacing: 0.1em;
}
.em2-card__tag {
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.6);
  background: rgba(255,255,255,0.1);
  padding: 4px 10px;
  border-radius: 100px;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.14);
  transition: all 0.3s ease;
}
.em2-card--hovered .em2-card__tag {
  background: rgba(255,255,255,0.18);
  color: #fff;
  border-color: rgba(255,255,255,0.28);
}

.em2-card__body {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  z-index: 4;
  padding: 28px 24px 26px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  transform: translateY(0);
  transition: transform 0.4s cubic-bezier(0.22,0.61,0.36,1);
}
.em2-card--hovered .em2-card__body { transform: translateY(-6px); }

.em2-card__icon {
  font-size: 2rem;
  display: block;
  filter: drop-shadow(0 2px 8px rgba(0,0,0,0.5));
  transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
  margin-bottom: 6px;
}
.em2-card--hovered .em2-card__icon { transform: scale(1.15) rotate(-5deg); }

.em2-card__title {
  font-family: 'Playfair Display', serif;
  font-size: 1.55rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
  line-height: 1.2;
  text-shadow: 0 2px 16px rgba(0,0,0,0.5);
}
.em2-card__tagline {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--c-accent);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin: 0;
  opacity: 0.9;
}
.em2-card__desc {
  font-size: 0.83rem;
  color: rgba(255,255,255,0.68);
  line-height: 1.6;
  margin: 0;
  font-weight: 300;
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: max-height 0.45s ease, opacity 0.45s ease, margin 0.3s ease;
}
.em2-card--hovered .em2-card__desc {
  max-height: 100px;
  opacity: 1;
  margin-top: 4px;
}

.em2-card__cta {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  padding-top: 12px;
  border-top: 1px solid rgba(255,255,255,0.1);
  transition: border-color 0.3s ease;
}
.em2-card--hovered .em2-card__cta { border-color: rgba(255,255,255,0.2); }
.em2-card__cta-text {
  font-size: 0.78rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  flex: 1;
}
.em2-card__cta-arrow {
  width: 34px; height: 34px;
  border-radius: 50%;
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  flex-shrink: 0;
  transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1);
}
.em2-card--hovered .em2-card__cta-arrow {
  background: var(--c-accent);
  border-color: var(--c-accent);
  transform: translateX(4px) scale(1.1);
}

.em2-card__border {
  position: absolute;
  inset: 0; z-index: 5;
  border-radius: 20px;
  pointer-events: none;
  border: 1px solid rgba(255,255,255,0.06);
  transition: border-color 0.4s ease;
}
.em2-card--hovered .em2-card__border { border-color: rgba(255,255,255,0.16); }

.em2-card__ripple {
  position: absolute;
  inset: 0; z-index: 6;
  pointer-events: none;
  background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.18) 0%, transparent 65%);
  opacity: 0;
  transform: scale(0.8);
}
.em2-card--clicked .em2-card__ripple {
  opacity: 1;
  transform: scale(1.6);
  transition: opacity 0.35s ease, transform 0.45s ease;
}

.em2-footer {
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: center;
  margin-top: 64px;
  position: relative;
  z-index: 2;
  opacity: 0;
  transition: opacity 0.8s ease 0.6s;
}
.em2-footer--in { opacity: 1; }
.em2-footer__line {
  flex: 1; max-width: 120px; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(192,98,42,0.35));
}
.em2-footer__line:last-child {
  background: linear-gradient(90deg, rgba(192,98,42,0.35), transparent);
}
.em2-footer__text {
  font-size: 0.68rem;
  color: rgba(245,237,224,0.25);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  white-space: nowrap;
}

@media (max-width: 600px) {
  .em2-card { height: 320px; }
  .em2-card__desc { display: none; }
  .em2-title { font-size: 2.2rem; }
}
`;

const ExploreMore = ({ fort, onCardClick, openInNewPage = true }) => {
  const [hovered, setHovered] = useState(null);
  const [visible, setVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const id = "em2-styles";
    if (!document.getElementById(id)) {
      const el = document.createElement("style");
      el.id = id;
      el.textContent = CSS_STYLES;
      document.head.appendChild(el);
    }
    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleClick = (card) => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/4b918fcf-66d5-4693-bf0e-7c84cd888395',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({runId:'pre-fix',hypothesisId:'A',location:'ExploreMore.jsx:handleClick',message:'ExploreMore card click',data:{cardId:card?.id,fortId:fort?.id,fortName:fort?.name},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    setActiveCard(card.id);
    setTimeout(() => {
      if (typeof onCardClick === "function") {
        onCardClick(card.id);
      } else if (openInNewPage) {
        const fortKey =
          (typeof fort?.cuisineKey === "string" && fort.cuisineKey) ||
          (typeof fort?.key === "string" && fort.key) ||
          (typeof fort?.slug === "string" && fort.slug) ||
          fort?.id ||
          fort?.name ||
          "shivneri";

        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/4b918fcf-66d5-4693-bf0e-7c84cd888395',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({runId:'pre-fix',hypothesisId:'B',location:'ExploreMore.jsx:navigate',message:'ExploreMore navigating to new page',data:{cardId:card?.id,fortKey},timestamp:Date.now()})}).catch(()=>{});
        // #endregion

        if (card.id === "cuisine") navigate(`/cuisine/${fortKey}`);
        else if (card.id === "shopping") navigate(`/shopping-areas`, { state: { fortKey } });
        else if (card.id === "experience") navigate(`/cultural-experience`, { state: { fortKey } });
        else if (card.id === "itinerary") navigate(`/travel-itinerary`, { state: { fortKey } });
      }
      setActiveCard(null);
    }, 380);
  };

  return (
    <section className="em2-section" ref={sectionRef}>
      <div className="em2-orb em2-orb--1" />
      <div className="em2-orb em2-orb--2" />
      <div className="em2-orb em2-orb--3" />

      <div className={`em2-header ${visible ? "em2-header--in" : ""}`}>
        <div className="em2-eyebrow">
          <span className="em2-eyebrow__line" />
          <span className="em2-eyebrow__text">DISCOVER MORE</span>
          <span className="em2-eyebrow__line" />
        </div>
        <h2 className="em2-title">
          Explore <span className="em2-title__italic">Every Facet</span>
        </h2>
        <p className="em2-subtitle">
          Dive deep into the culture, flavours and heritage of{" "}
          <strong>{fort?.name || "this fort"}</strong>
        </p>
      </div>

      <div className="em2-grid">
        {CARDS.map((card, i) => (
          <button
            key={card.id}
            className={[
              "em2-card",
              visible ? "em2-card--in" : "",
              hovered === card.id ? "em2-card--hovered" : "",
              activeCard === card.id ? "em2-card--clicked" : "",
            ].join(" ")}
            style={{
              "--c-gradient": card.gradient,
              "--c-glow": card.glowColor,
              "--c-accent": card.accentColor,
              "--c-delay": `${i * 0.14}s`,
            }}
            onMouseEnter={() => setHovered(card.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => handleClick(card)}
            aria-label={`Explore ${card.label}`}
          >
            <div className="em2-card__img-wrap">
              <img src={card.imgUrl} alt="" className="em2-card__img" loading="lazy" />
            </div>
            <div className="em2-card__overlay" />
            <div className="em2-card__glow" />

            <div className="em2-card__top">
              <span className="em2-card__number">{card.number}</span>
              <span className="em2-card__tag">{card.tag}</span>
            </div>

            <div className="em2-card__body">
              <span className="em2-card__icon">{card.icon}</span>
              <h3 className="em2-card__title">{card.label}</h3>
              <p className="em2-card__tagline">{card.tagline}</p>
              <p className="em2-card__desc">{card.description}</p>
              <div className="em2-card__cta">
                <span className="em2-card__cta-text">Explore Now</span>
                <span className="em2-card__cta-arrow">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </div>

            <div className="em2-card__border" />
            <div className="em2-card__ripple" />
          </button>
        ))}
      </div>

      <div className={`em2-footer ${visible ? "em2-footer--in" : ""}`}>
        <div className="em2-footer__line" />
        <span className="em2-footer__text">PastPort Maharashtra · Heritage through storytelling</span>
        <div className="em2-footer__line" />
      </div>
    </section>
  );
};

export default ExploreMore;