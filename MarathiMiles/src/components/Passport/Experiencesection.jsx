// ═══════════════════════════════════════════════════════
//  ExperienceSection.jsx
//  Cultural experiences, fort history, Shiv Jayanti,
//  folk art, guided walks — for Shivneri Fort
// ═══════════════════════════════════════════════════════

import React, { useState, useEffect, useRef } from "react";
import SpiritSection from "./SpiritSection";

// ─── Data ───────────────────────────────────────────────
const EXPERIENCES = {
  shivneri: [
    {
      id: "shiv-jayanti",
      title: "Shiv Jayanti at Shivneri",
      category: "Festival",
      date: "February 19 (Gregorian) / Falgun Shuddha Tritiya",
      duration: "2-day celebration",
      intensity: "Grand",
      icon: "🎊",
      heroImg: "https://images.unsplash.com/photo-1567591370429-9c7527c82459?w=900&q=80",
      description:
        "The most sacred day at Shivneri — the birthplace of Chhatrapati Shivaji Maharaj. Thousands of devotees climb the fort before dawn, carrying saffron flags and singing 'Jai Bhavani, Jai Shivaji'. The birth chamber (Janma Sthan) is decorated with flowers, and a grand palkhi (palanquin) procession winds through Junnar town. Local schools perform historical plays, powada singers narrate Shivaji's life, and the night ends with a spectacular torch-lit aarti at the fort summit.",
      highlights: ["Dawn procession to fort", "Powada folk narration", "Palkhi through Junnar", "Torch-lit summit aarti", "Free langar by communities"],
      bestTime: "February 18–19",
      tip: "Arrive before 5 AM to witness the sunrise aarti at the Janma Sthan. Carry a torch for the pre-dawn climb.",
    },
    {
      id: "warli-workshop",
      title: "Warli Art Live Workshop",
      category: "Cultural",
      date: "Year-round (weekends)",
      duration: "3–4 hours",
      intensity: "Participatory",
      icon: "🎨",
      heroImg: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=900&q=80",
      description:
        "Join the Warli Women's Self-Help Cooperative in Ambivali village for a hands-on painting session. Using rice paste on handmade cloth — the exact technique unchanged since the 10th century — you'll learn to paint the iconic geometric figures representing harvests, dances, and nature cycles. Master artisan Savita Jadhav guides each session personally, sharing stories passed down through three generations.",
      highlights: ["Live demo by master artisan", "Paint your own Warli cloth", "Village tour included", "Take your artwork home", "Community lunch available"],
      bestTime: "October – March (cooler weather)",
      tip: "Book at least 3 days in advance through Junnar District Tourism. Sessions limited to 12 participants.",
    },
    {
      id: "fort-guided-walk",
      title: "Historian's Fort Walk",
      category: "Heritage Walk",
      date: "Daily (pre-book)",
      duration: "2.5 hours",
      intensity: "Moderate trek",
      icon: "🏰",
      heroImg: "https://images.unsplash.com/photo-1470217957101-da7150b9b681?w=900&q=80",
      description:
        "Walk through 700 years of Shivneri's layered history with a certified heritage guide. Starting at the Maha Darwaja (Great Gate), you'll pass through all seven fortified layers, visit the Shivai Devi temple, the Janma Sthan chamber where Shivaji was born, ancient water cisterns (tanks), and the panoramic watch towers. Your guide narrates stories from Yadav control to Adilshahi occupation to Maratha triumph.",
      highlights: ["All 7 fort gates explored", "Janma Sthan birth chamber", "Shivai Devi temple prayer", "Ancient water cistern system", "360° Sahyadri panorama"],
      bestTime: "October – February (best visibility)",
      tip: "Wear sturdy shoes — the climb involves uneven stone steps. Morning slots (7 AM) offer the best light for photography.",
    },
    {
      id: "powada-night",
      title: "Powada Night — Ballads of the Deccan",
      category: "Folk Performance",
      date: "Saturdays (seasonal)",
      duration: "2 hours",
      intensity: "Seated performance",
      icon: "🎵",
      heroImg: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=900&q=80",
      description:
        "Powada is the ancient ballad tradition of Maharashtra — heroic poetry-songs narrating Maratha battles, Shivaji's strategies, and fort legends. Performed under the open sky near the fort's base, the singers accompany themselves on tuntune and ektara instruments. Each session covers three major powadas: the fall of Torana Fort, the coronation at Raigad, and the legend of Shivneri itself.",
      highlights: ["Live tuntune & ektara music", "3 historical powadas performed", "English subtitles available", "Post-show artisan interaction", "Open-air atmosphere"],
      bestTime: "November – January (clear skies)",
      tip: "Arrive 20 minutes early for the best seating. Photography is welcome but no flash during the performance.",
    },
    {
      id: "monsoon-trek",
      title: "Monsoon Fort Trek",
      category: "Adventure",
      date: "July – September",
      duration: "Full day",
      intensity: "Challenging",
      icon: "⛈️",
      heroImg: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=80",
      description:
        "Experience Shivneri at its most dramatic — lush green valleys, cascading waterfalls along the Sahyadri ridge, and clouds swirling around the fort's ramparts. The monsoon trek is challenging but rewarding: misty pathways reveal ancient inscriptions normally hidden in dry season dust, and the Shivai Devi stream runs in full force. Local guides share monsoon-specific folklore and point out rare endemic plants found only in the Junnar hills.",
      highlights: ["Waterfalls en route", "Ancient hidden inscriptions", "Rare endemic flora", "Mist and cloud photography", "Hot bhakri lunch at summit"],
      bestTime: "August (peak greenery)",
      tip: "This is an advanced trek — not recommended for beginners. Leech socks are essential. Certified guide mandatory.",
    },
  ],
};

// Default experiences for forts without specific data
const DEFAULT_EXPERIENCES = [
  {
    id: "heritage-walk",
    title: "Heritage Fort Walk",
    category: "Heritage Walk",
    date: "Daily",
    duration: "2–3 hours",
    intensity: "Moderate",
    icon: "🏰",
    heroImg: "https://images.unsplash.com/photo-1470217957101-da7150b9b681?w=900&q=80",
    description: "Explore the fort's architecture, history and panoramic views with a certified heritage guide.",
    highlights: ["Guided architectural tour", "Historical narratives", "Panoramic views", "Photo opportunities"],
    bestTime: "October – February",
    tip: "Wear comfortable shoes for the stone pathways.",
  },
];

const INTENSITY_COLOR = {
  Grand: "#c94a00",
  Participatory: "#27ae60",
  "Moderate trek": "#d4a017",
  "Seated performance": "#4a6b9a",
  Challenging: "#8b3a00",
  Moderate: "#d4a017",
};

// ─── Component ───────────────────────────────────────────
const ExperienceSection = ({ fort, onBack }) => {
  // ── CSS Injector (enables preview without .css file) ──
  React.useEffect(() => {
    const _id = 'ExperienceSection-css';
    if (!document.getElementById(_id)) {
      const _el = document.createElement('style');
      _el.id = _id;
      _el.textContent = `/* ExperienceSection.css */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800&family=DM+Sans:wght@300;400;500;600&display=swap');

.exp-page { background: #faf5ec; min-height: 100vh; font-family: 'DM Sans', sans-serif; color: #1e120a; }

/* ── Hero ── */
.exp-hero {
  position: relative; padding: 32px 52px 56px;
  background: linear-gradient(118deg, #1a5e38 0%, #27ae60 55%, #52c97e 100%);
  overflow: hidden; isolation: isolate;
}
.exp-hero__bg {
  position: absolute; inset: 0;
  background-image: var(--hero-img, none);
  background-size: cover; background-position: center;
  opacity: 0.12; z-index: 0;
}
.exp-hero::before {
  content: ''; position: absolute; inset: 0;
  background: repeating-linear-gradient(-48deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 22px);
  pointer-events: none; z-index: 1;
}
.exp-back-btn {
  position: relative; z-index: 10;
  display: inline-flex; align-items: center; gap: 6px;
  background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.35);
  color: #fff; padding: 8px 20px; border-radius: 100px;
  font-family: 'DM Sans', sans-serif; font-size: 0.82rem; font-weight: 500;
  cursor: pointer; transition: all 0.22s; margin-bottom: 36px;
}
.exp-back-btn:hover { background: rgba(255,255,255,0.27); transform: translateX(-4px); }
.exp-hero__content { position: relative; z-index: 10; }
.exp-hero__eyebrow { display: block; font-size: 0.72rem; letter-spacing: 0.24em; color: rgba(255,255,255,0.75); font-weight: 600; text-transform: uppercase; margin-bottom: 10px; }
.exp-hero__title { font-family: 'Playfair Display', serif; font-size: clamp(2.4rem, 5vw, 4rem); font-weight: 800; color: #fff; margin-bottom: 12px; text-shadow: 0 3px 24px rgba(0,0,0,0.18); }
.exp-hero__sub { font-size: 1rem; color: rgba(255,255,255,0.88); margin-bottom: 16px; }
.exp-hero__sub strong { font-weight: 600; color: #fff; }
.exp-hero__count { display: inline-block; background: rgba(255,255,255,0.18); border: 1px solid rgba(255,255,255,0.3); color: #fff; font-size: 0.8rem; padding: 5px 14px; border-radius: 100px; }
.exp-hero__dots { position: absolute; bottom: 24px; right: 52px; display: flex; align-items: center; gap: 8px; z-index: 10; }
.exp-hero__dots span { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.3); }
.exp-hero__dots span:nth-child(2) { width: 13px; height: 13px; background: rgba(255,255,255,0.55); }

/* ── Body ── */
.exp-body { padding: 50px 52px 80px; max-width: 1340px; margin: 0 auto; }

/* ── Filters ── */
.exp-filters {
  display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 40px;
  opacity: 0; transform: translateY(20px); transition: opacity 0.5s ease, transform 0.5s ease;
}
.exp-filters--visible { opacity: 1; transform: translateY(0); }
.exp-filter-btn {
  padding: 8px 20px; border-radius: 100px;
  border: 1.5px solid #dac8a8; background: #fff; color: #6b5040;
  font-family: 'DM Sans', sans-serif; font-size: 0.82rem; font-weight: 500;
  cursor: pointer; transition: all 0.22s;
}
.exp-filter-btn:hover { border-color: #27ae60; color: #1a5e38; }
.exp-filter-btn--active { background: #27ae60; border-color: #27ae60; color: #fff; font-weight: 600; }

/* ── Grid ── */
.exp-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; margin-bottom: 56px; }
@media (max-width: 1050px) { .exp-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px)  { .exp-grid { grid-template-columns: 1fr; } .exp-body { padding: 36px 18px 60px; } }

/* ── Card ── */
.exp-card {
  background: #fff; border-radius: 20px; overflow: hidden;
  border: 1px solid rgba(200,170,130,0.35);
  box-shadow: 0 4px 18px rgba(0,0,0,0.06);
  display: flex; flex-direction: column;
  opacity: 0; transform: translateY(38px);
  transition:
    opacity 0.52s cubic-bezier(0.22,0.61,0.36,1) var(--delay,0s),
    transform 0.52s cubic-bezier(0.22,0.61,0.36,1) var(--delay,0s),
    box-shadow 0.3s ease;
}
.exp-card--visible { opacity: 1; transform: translateY(0); }
.exp-card--visible:hover, .exp-card--hovered {
  transform: translateY(-8px) scale(1.012);
  box-shadow: 0 20px 48px rgba(0,0,0,0.1);
}

.exp-card__img-wrap { position: relative; height: 200px; overflow: hidden; }
.exp-card__img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
.exp-card--visible:hover .exp-card__img { transform: scale(1.08); }
.exp-card__img-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%); }
.exp-card__icon { position: absolute; top: 14px; left: 14px; font-size: 1.6rem; filter: drop-shadow(0 2px 8px rgba(0,0,0,0.5)); }
.exp-card__cat-badge {
  position: absolute; top: 14px; right: 14px;
  background: rgba(0,0,0,0.55); color: #fff;
  font-size: 0.68rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;
  padding: 4px 10px; border-radius: 100px; backdrop-filter: blur(6px);
}

.exp-card__body { padding: 18px 18px 20px; display: flex; flex-direction: column; gap: 10px; flex: 1; }
.exp-card__meta { display: flex; align-items: center; justify-content: space-between; }
.exp-card__duration { font-size: 0.76rem; color: #7a5a40; font-weight: 500; }
.exp-card__intensity { font-size: 0.74rem; font-weight: 600; }
.exp-card__title { font-family: 'Playfair Display', serif; font-size: 1.18rem; font-weight: 700; color: #1e120a; line-height: 1.25; margin: 0; }
.exp-card__desc { font-size: 0.85rem; color: #6b5040; line-height: 1.6; margin: 0; }
.exp-card__date { display: flex; align-items: center; gap: 6px; font-size: 0.78rem; color: #8b6248; }

.exp-card__highlights { display: flex; flex-wrap: wrap; gap: 6px; }
.exp-card__highlight-chip {
  background: #f0f8f2; border: 1px solid #c8e8d0; color: #1a5e38;
  font-size: 0.72rem; font-weight: 500; padding: 3px 10px; border-radius: 100px;
}
.exp-card__highlight-chip--more { background: #f5f0e8; border-color: #dac8a8; color: #6b5040; }

.exp-card__btn {
  margin-top: auto; padding: 10px 16px; border-radius: 10px;
  background: linear-gradient(135deg, #27ae60, #1a5e38);
  color: #fff; font-family: 'DM Sans', sans-serif; font-size: 0.82rem; font-weight: 600;
  border: none; cursor: pointer; transition: opacity 0.22s, transform 0.22s;
  text-align: center;
}
.exp-card__btn:hover { opacity: 0.9; transform: translateY(-2px); }

/* ── Feature Banner (Shiv Jayanti) ── */
.exp-feature-banner {
  display: grid; grid-template-columns: 1fr 1fr;
  border-radius: 24px; overflow: hidden;
  box-shadow: 0 12px 40px rgba(0,0,0,0.12);
  opacity: 0; transform: translateY(30px);
  transition: opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s;
}
.exp-feature-banner--visible { opacity: 1; transform: translateY(0); }

.exp-feature-banner__left {
  background: linear-gradient(135deg, #1a0800 0%, #6b2800 100%);
  padding: 48px 40px; display: flex; flex-direction: column; gap: 20px;
}
.exp-feature-banner__badge {
  display: inline-block; background: rgba(255,215,100,0.2); border: 1px solid rgba(255,215,100,0.4);
  color: rgba(255,215,100,0.95); font-size: 0.68rem; font-weight: 700; letter-spacing: 0.14em;
  text-transform: uppercase; padding: 5px 14px; border-radius: 100px;
  width: fit-content;
}
.exp-feature-banner__title { font-family: 'Playfair Display', serif; font-size: 1.8rem; font-weight: 800; color: #fff; margin: 0; }
.exp-feature-banner__desc { font-size: 0.9rem; color: rgba(255,255,255,0.8); line-height: 1.65; margin: 0; }

.exp-feature-banner__stats { display: flex; gap: 32px; }
.exp-stat { display: flex; flex-direction: column; gap: 2px; }
.exp-stat__num { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 700; color: rgba(255,215,100,0.95); }
.exp-stat__label { font-size: 0.75rem; color: rgba(255,255,255,0.65); text-transform: uppercase; letter-spacing: 0.08em; }

.exp-feature-banner__cta {
  display: inline-flex; align-items: center; gap: 8px;
  background: linear-gradient(135deg, #c94a00, #f07200);
  color: #fff; padding: 12px 24px; border-radius: 100px;
  font-family: 'DM Sans', sans-serif; font-size: 0.88rem; font-weight: 600;
  border: none; cursor: pointer; transition: transform 0.22s, box-shadow 0.22s;
  width: fit-content;
}
.exp-feature-banner__cta:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(201,74,0,0.4); }

.exp-feature-banner__right {
  background-size: cover; background-position: center;
  min-height: 320px; position: relative;
}
.exp-feature-banner__right::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(to right, rgba(107,40,0,0.3) 0%, transparent 60%);
}

@media (max-width: 768px) { .exp-feature-banner { grid-template-columns: 1fr; } .exp-feature-banner__right { min-height: 200px; } }

/* ── Modal overlay ── */
.exp-modal-overlay {
  position: fixed; inset: 0; z-index: 1000;
  background: rgba(0,0,0,0.7); backdrop-filter: blur(6px);
  display: flex; align-items: center; justify-content: center;
  padding: 20px; animation: expFadeIn 0.25s ease;
}
@keyframes expFadeIn { from { opacity: 0; } to { opacity: 1; } }

.exp-modal {
  background: #fff; border-radius: 24px; overflow: hidden;
  max-width: 640px; width: 100%; max-height: 88vh; overflow-y: auto;
  position: relative; animation: expSlideUp 0.3s cubic-bezier(0.22,0.61,0.36,1);
  box-shadow: 0 24px 80px rgba(0,0,0,0.35);
}
@keyframes expSlideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

.exp-modal__close {
  position: absolute; top: 16px; right: 16px; z-index: 10;
  width: 36px; height: 36px; border-radius: 50%;
  background: rgba(0,0,0,0.5); color: #fff; border: none;
  font-size: 0.9rem; cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: background 0.2s;
}
.exp-modal__close:hover { background: rgba(0,0,0,0.8); }

.exp-modal__hero {
  height: 240px; background-size: cover; background-position: center;
  position: relative; display: flex; align-items: flex-end;
}
.exp-modal__hero-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%); }
.exp-modal__hero-content { position: relative; z-index: 2; padding: 20px 24px; display: flex; flex-direction: column; gap: 6px; }
.exp-modal__icon { font-size: 2rem; }
.exp-modal__cat { font-size: 0.7rem; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.75); font-weight: 600; }
.exp-modal__title { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 700; color: #fff; margin: 0; }

.exp-modal__body { padding: 24px; display: flex; flex-direction: column; gap: 20px; }
.exp-modal__meta-row { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
.exp-modal__meta-item { background: #f8f3ea; border-radius: 10px; padding: 12px 14px; }
.exp-modal__meta-label { display: block; font-size: 0.68rem; letter-spacing: 0.1em; text-transform: uppercase; color: #9b7a5a; font-weight: 600; margin-bottom: 4px; }
.exp-modal__meta-val { font-size: 0.88rem; color: #1e120a; font-weight: 500; }
.exp-modal__desc { font-size: 0.92rem; color: #4a3020; line-height: 1.7; }

.exp-modal__highlights-title { font-family: 'Playfair Display', serif; font-size: 1.05rem; color: #1e120a; margin: 0 0 12px; }
.exp-modal__highlights-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
.exp-modal__highlight-item { display: flex; align-items: center; gap: 10px; font-size: 0.88rem; color: #4a3020; }
.exp-modal__highlight-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }

.exp-modal__tip {
  background: #fffbf0; border: 1px solid #f0d5a0; border-radius: 14px;
  padding: 16px 18px; display: flex; gap: 12px; align-items: flex-start;
}
.exp-modal__tip-icon { font-size: 1.3rem; flex-shrink: 0; }
.exp-modal__tip strong { display: block; font-size: 0.82rem; color: #8b6248; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px; }
.exp-modal__tip p { margin: 0; font-size: 0.88rem; color: #4a3020; line-height: 1.6; }
`;
      document.head.appendChild(_el);
    }
    return () => { const _el = document.getElementById(_id); if (_el) _el.remove(); };
  }, []);

  const [selectedExp, setSelectedExp] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  const fortId = fort?.id || "shivneri";
  const experiences = EXPERIENCES[fortId] || DEFAULT_EXPERIENCES;

  const categories = ["All", ...new Set(experiences.map((e) => e.category))];
  const filtered = activeCategory === "All" ? experiences : experiences.filter((e) => e.category === activeCategory);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="exp-page">
      {/* ── Hero ── */}
      <div className="exp-hero" style={{ "--hero-img": `url(${fort?.imageUrl || fort?.image || ""})` }}>
        <div className="exp-hero__bg" />
        <button className="exp-back-btn" onClick={onBack}>← Back to {fort?.name || "Fort"}</button>
        <div className="exp-hero__content">
          <span className="exp-hero__eyebrow">LIVE THE HISTORY</span>
          <h1 className="exp-hero__title">Cultural Experiences</h1>
          <p className="exp-hero__sub">
            Festivals, walks, folk arts & celebrations at <strong>{fort?.name || "the fort"}</strong>
          </p>
          <div className="exp-hero__count">{experiences.length} unique experiences</div>
        </div>
        <div className="exp-hero__dots"><span /><span /><span /><span /></div>
      </div>

      {/* ── Body ── */}
      <div className="exp-body" ref={sectionRef}>

        {/* Category filter */}
        <div className={`exp-filters ${visible ? "exp-filters--visible" : ""}`}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`exp-filter-btn ${activeCategory === cat ? "exp-filter-btn--active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div className="exp-grid">
          {filtered.map((exp, i) => (
            <ExperienceCard
              key={exp.id}
              exp={exp}
              index={i}
              visible={visible}
              onSelect={() => setSelectedExp(exp)}
            />
          ))}
        </div>

        {/* Shiv Jayanti Feature Banner */}
        {fortId === "shivneri" && (
          <div className={`exp-feature-banner ${visible ? "exp-feature-banner--visible" : ""}`}>
            <div className="exp-feature-banner__left">
              <span className="exp-feature-banner__badge">⭐ MUST EXPERIENCE</span>
              <h3 className="exp-feature-banner__title">Shiv Jayanti at Shivneri</h3>
              <p className="exp-feature-banner__desc">
                The birthplace of Chhatrapati Shivaji Maharaj transforms into a living heritage festival on February 19.
                Over 50,000 devotees gather at the fort that witnessed a king's first breath.
              </p>
              <div className="exp-feature-banner__stats">
                <div className="exp-stat">
                  <span className="exp-stat__num">50,000+</span>
                  <span className="exp-stat__label">Visitors</span>
                </div>
                <div className="exp-stat">
                  <span className="exp-stat__num">48hrs</span>
                  <span className="exp-stat__label">Celebration</span>
                </div>
                <div className="exp-stat">
                  <span className="exp-stat__num">400 yrs</span>
                  <span className="exp-stat__label">Tradition</span>
                </div>
              </div>
              <button
                className="exp-feature-banner__cta"
                onClick={() => setSelectedExp(experiences.find(e => e.id === "shiv-jayanti"))}
              >
                Learn More →
              </button>
            </div>
            <div
              className="exp-feature-banner__right"
              style={{ backgroundImage: `url(${experiences[0]?.heroImg})` }}
              
            />
          </div>
          
        )}
      </div>

      {/* ── Detail Modal ── */}
      {selectedExp && (
        <ExperienceDetail exp={selectedExp} onClose={() => setSelectedExp(null)} />
      )}
    </div>
  );
};

// ─── Experience Card ─────────────────────────────────────
const ExperienceCard = ({ exp, index, visible, onSelect }) => {
  const [hovered, setHovered] = useState(false);
  const intensityColor = INTENSITY_COLOR[exp.intensity] || "#c0622a";

  return (
    <article
      className={`exp-card ${visible ? "exp-card--visible" : ""} ${hovered ? "exp-card--hovered" : ""}`}
      style={{ "--delay": `${index * 0.1}s`, "--intensity-color": intensityColor }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="exp-card__img-wrap">
        <img src={exp.heroImg} alt={exp.title} className="exp-card__img" loading="lazy" />
        <div className="exp-card__img-overlay" />
        <span className="exp-card__icon">{exp.icon}</span>
        <span className="exp-card__cat-badge">{exp.category}</span>
      </div>

      <div className="exp-card__body">
        <div className="exp-card__meta">
          <span className="exp-card__duration">⏱ {exp.duration}</span>
          <span className="exp-card__intensity" style={{ color: intensityColor }}>
            ● {exp.intensity}
          </span>
        </div>

        <h3 className="exp-card__title">{exp.title}</h3>
        <p className="exp-card__desc">{exp.description.slice(0, 130)}…</p>

        <div className="exp-card__date">
          <span className="exp-card__date-icon">📅</span>
          <span>{exp.date}</span>
        </div>

        <div className="exp-card__highlights">
          {exp.highlights.slice(0, 3).map((h, i) => (
            <span key={i} className="exp-card__highlight-chip">{h}</span>
          ))}
          {exp.highlights.length > 3 && (
            <span className="exp-card__highlight-chip exp-card__highlight-chip--more">
              +{exp.highlights.length - 3} more
            </span>
          )}
        </div>

        <button className="exp-card__btn" onClick={onSelect}>
          Discover Experience →
        </button>
      </div>
    </article>
  );
};

// ─── Experience Detail Modal ─────────────────────────────
const ExperienceDetail = ({ exp, onClose }) => {
  const intensityColor = INTENSITY_COLOR[exp.intensity] || "#c0622a";

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="exp-modal-overlay" onClick={onClose}>
      <div className="exp-modal" onClick={(e) => e.stopPropagation()}>
        <button className="exp-modal__close" onClick={onClose}>✕</button>

        <div
          className="exp-modal__hero"
          style={{ backgroundImage: `url(${exp.heroImg})` }}
        >
          <div className="exp-modal__hero-overlay" />
          <div className="exp-modal__hero-content">
            <span className="exp-modal__icon">{exp.icon}</span>
            <span className="exp-modal__cat">{exp.category}</span>
            <h2 className="exp-modal__title">{exp.title}</h2>
          </div>
        </div>

        <div className="exp-modal__body">
          <div className="exp-modal__meta-row">
            <div className="exp-modal__meta-item">
              <span className="exp-modal__meta-label">Duration</span>
              <span className="exp-modal__meta-val">⏱ {exp.duration}</span>
            </div>
            <div className="exp-modal__meta-item">
              <span className="exp-modal__meta-label">Date</span>
              <span className="exp-modal__meta-val">📅 {exp.date}</span>
            </div>
            <div className="exp-modal__meta-item">
              <span className="exp-modal__meta-label">Intensity</span>
              <span className="exp-modal__meta-val" style={{ color: intensityColor }}>
                ● {exp.intensity}
              </span>
            </div>
            <div className="exp-modal__meta-item">
              <span className="exp-modal__meta-label">Best Time</span>
              <span className="exp-modal__meta-val">🌤 {exp.bestTime}</span>
            </div>
          </div>

          <p className="exp-modal__desc">{exp.description}</p>

          <div className="exp-modal__highlights">
            <h4 className="exp-modal__highlights-title">✨ Highlights</h4>
            <ul className="exp-modal__highlights-list">
              {exp.highlights.map((h, i) => (
                <li key={i} className="exp-modal__highlight-item">
                  <span className="exp-modal__highlight-dot" style={{ background: intensityColor }} />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div className="exp-modal__tip">
            <span className="exp-modal__tip-icon">💡</span>
            <div>
              <strong>Local Tip</strong>
              <p>{exp.tip}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;