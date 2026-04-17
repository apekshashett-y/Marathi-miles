import React, { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CUISINE_DATA } from "../../data/CuisineData";
import "./FamousCuisine.css";

const resolveCuisineFortKey = (fortLike) => {
  if (fortLike === 1 || fortLike === "1") return "shivneri";
  if (fortLike === 2 || fortLike === "2") return "raigad";
  if (fortLike === 3 || fortLike === "3") return "pratapgad";
  if (fortLike === 4 || fortLike === "4") return "sinhagad";

  if (typeof fortLike === "string") {
    const s = fortLike.trim().toLowerCase();
    if (["shivneri", "raigad", "pratapgad", "sinhagad"].includes(s)) return s;
    return s.replace(/fort$/i, "").replace(/[^a-z0-9]+/g, "").trim();
  }
  return "shivneri";
};

const FamousCuisine = ({ fort: fortProp, onBack }) => {
  const { fort: fortParam } = useParams();
  const navigate = useNavigate();

  const fortKey = resolveCuisineFortKey(fortParam ?? fortProp);
  const foods = CUISINE_DATA[fortKey] || [];
  const cardRefs = useRef([]);

  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/4b918fcf-66d5-4693-bf0e-7c84cd888395',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({runId:'pre-fix',hypothesisId:'A',location:'FamousCuisine.jsx:render',message:'Cuisine page resolve + foods length',data:{fortParam,fortProp,fortKey,foodsLen:foods.length,availableKeys:Object.keys(CUISINE_DATA||{}).slice(0,12)},timestamp:Date.now()})}).catch(()=>{});
  // #endregion

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [foods]);

  const handleBack = () => {
    if (onBack) onBack();
    else navigate(-1);
  };

  return (
    <div className="cuisine-page">
      {/* ── HERO ── */}
      <div className="cuisine-hero">
        <button className="back-btn" onClick={handleBack}>
          <span className="back-arrow">←</span> Back to Overview
        </button>

        <div className="hero-content">
          <span className="hero-eyebrow">TASTE THE HERITAGE</span>
          <h1 className="hero-title">Famous Cuisine</h1>
          <p className="hero-subtitle">
            Authentic Maharashtrian Flavors &amp; Delicacies
          </p>
        </div>

        <div className="hero-decor">
          <span /><span /><span /><span /><span />
        </div>
      </div>

      {/* ── GRID ── */}
      <div className="cuisine-body">
        {foods.length === 0 ? (
          <div className="cuisine-empty">
            <p>No cuisine data found for: <strong>{fortKey}</strong></p>
          </div>
        ) : (
          <div className="cuisine-grid">
            {foods.map((food, index) => (
              <article
                key={food.id ?? index}
                className="c-card"
                ref={(el) => (cardRefs.current[index] = el)}
                style={{ "--delay": `${index * 0.1}s` }}
              >
                <div className="c-card__img-wrap">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="c-card__img"
                    loading="lazy"
                  />
                  <div className="c-card__img-overlay">
                    {food.price && (
                      <span className="c-card__price">{food.price}</span>
                    )}
                  </div>
                </div>

                <div className="c-card__body">
                  <h2 className="c-card__title">{food.name}</h2>
                  <p className="c-card__desc">{food.description}</p>

                  <div className="c-card__divider" />

                  {Array.isArray(food.famousPlaces) && food.famousPlaces.length > 0 && (
                    <div className="c-card__places">
                      <span className="c-card__places-label">Famous Spots</span>
                      <div className="c-card__tags">
                        {food.famousPlaces.map((place, i) => (
                          <span key={i} className="c-card__tag">{place}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="c-card__footer">
                    {food.location && (
                      <span className="c-card__location">
                        <svg width="13" height="16" viewBox="0 0 13 16" fill="none" aria-hidden="true">
                          <path d="M6.5 0C2.91 0 0 2.91 0 6.5c0 4.875 6.5 9.5 6.5 9.5S13 11.375 13 6.5C13 2.91 10.09 0 6.5 0zm0 8.813A2.313 2.313 0 1 1 6.5 4.187a2.313 2.313 0 0 1 0 4.626z" fill="#e67e22"/>
                        </svg>
                        {food.location}
                      </span>
                    )}
                    {food.price && (
                      <span className="c-card__price-badge">{food.price}</span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FamousCuisine;