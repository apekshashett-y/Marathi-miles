// ═══════════════════════════════════════════════════════
//  TravelItinerary.jsx
//  Travel Itinerary section for a fort
//  Includes: Guides (Meet the Makers), Budget Planner,
//            Smart Exploration Planner
// ═══════════════════════════════════════════════════════

import React, { useState, useEffect, useRef } from "react";

// ─── Data ───────────────────────────────────────────────
const GUIDES = [
  {
    id: "rajesh",
    name: "Rajesh Salvi",
    role: "Senior Heritage Guide",
    experience: 22,
    languages: ["English", "Marathi", "Hindi"],
    specialty: "Maratha Military History",
    location: "Junnar, Pune District",
    rating: 4.9,
    reviews: 248,
    avatar: "🏛️",
    color: "#c94a00",
    bio: "A former archaeology student turned heritage storyteller, Rajesh has guided over 3,000 visitors through Shivneri's seven gates. His narration of the fort's secret water system and Jijabai's story is legendary among regular visitors. He has collaborated with Pune University's history department on oral tradition documentation.",
    certifications: ["Maharashtra Tourism Board", "Archaeological Survey of India", "ICOMOS Heritage Guide"],
    tours: ["Sunrise Fort Walk", "Full Day Heritage", "Moonlight Special"],
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  },
  {
    id: "sunanda",
    name: "Sunanda Jadhav",
    role: "Folk Traditions Guide",
    experience: 14,
    languages: ["Marathi", "Hindi"],
    specialty: "Warli Art & Tribal Heritage",
    location: "Ambivali Village, Junnar",
    rating: 4.8,
    reviews: 132,
    avatar: "🎨",
    color: "#27ae60",
    bio: "Born and raised in Ambivali village 3 km from Shivneri, Sunanda bridges the gap between academic history and living folk traditions. She leads the Warli Art workshop circuit and has documented over 60 oral traditions of the Junnar tribal communities. Her monsoon fort treks include botanical knowledge passed down through generations.",
    certifications: ["Tribal Research Institute, Pune", "Maharashtra Folk Arts Council"],
    tours: ["Warli Village Walk", "Monsoon Trek", "Women's Heritage Tour"],
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  },
  {
    id: "prashant",
    name: "Prashant Bhor",
    role: "Photography & Nature Guide",
    experience: 9,
    languages: ["English", "Marathi"],
    specialty: "Landscape Photography & Birding",
    location: "Junnar",
    rating: 4.7,
    reviews: 89,
    avatar: "📷",
    color: "#4a6b9a",
    bio: "A professional wildlife photographer who fell in love with Shivneri's dramatic light, Prashant leads photography-specific tours timed around golden hour and monsoon mists. He knows every angle, every perch, every season — and his knowledge of resident bird species and endemic Sahyadri flora makes each walk a dual discovery.",
    certifications: ["Bombay Natural History Society", "Wildlife Institute of India"],
    tours: ["Sunrise Photography Trek", "Birding Walk", "Night Sky & Fort Silhouette"],
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
  },
];

const BUDGET_ITEMS = [
  { name: "Small Warli Bookmark", category: "Handicrafts", price: 80 },
  { name: "Wild Honey Sample Jar (100g)", category: "Local Food Products", price: 150 },
  { name: "Warli Art Card Set (6 cards)", category: "Handicrafts", price: 200 },
  { name: "Gavran Masala Spice Pack", category: "Local Food Products", price: 220 },
  { name: "Warli Art Painting (A5)", category: "Handicrafts", price: 350 },
  { name: "Wild Honey (250g)", category: "Local Food Products", price: 400 },
  { name: "Shivaji Idol – Small", category: "Fort Souvenirs", price: 450 },
  { name: "Kolhapuri Chappals – Basic", category: "Traditional Items", price: 600 },
  { name: "Fort Miniature – Small", category: "Fort Souvenirs", price: 650 },
  { name: "Shivaji Idol – Medium", category: "Fort Souvenirs", price: 850 },
  { name: "Warli Art Painting (A3)", category: "Handicrafts", price: 900 },
  { name: "Kolhapuri Chappals – Premium", category: "Traditional Items", price: 1200 },
  { name: "Warli Art Painting (A2 Framed)", category: "Handicrafts", price: 1400 },
  { name: "Fort Miniature – Large", category: "Fort Souvenirs", price: 1500 },
  { name: "Kolhapuri Chappals – Handmade", category: "Traditional Items", price: 1800 },
];

const ITINERARY_DATA = {
  shivneri: {
    title: "Shivneri Fort Day Planner",
    stops: [
      { label: "S", name: "Start: Junnar Bus Stand", desc: "Arrive by ST bus from Pune (2.5 hrs). Local auto to fort base.", time: "07:00 AM", type: "transit" },
      { label: "1", name: "Maha Darwaja (Main Gate)", desc: "Begin the climb through the grand fortified entrance. Seven consecutive gates.", time: "08:00 AM", type: "heritage" },
      { label: "2", name: "Shivai Devi Temple", desc: "The deity after whom Shivaji was named. Pray and take in the views.", time: "09:00 AM", type: "spiritual" },
      { label: "3", name: "Janma Sthan", desc: "The sacred birth chamber of Chhatrapati Shivaji Maharaj.", time: "10:00 AM", type: "heritage" },
      { label: "4", name: "Summit Panorama Point", desc: "360° view of Sahyadri valleys. Best photography of the day.", time: "11:00 AM", type: "nature" },
      { label: "E", name: "End: Junnar Market", desc: "Heritage Bazaar — souvenirs, local food & return transport.", time: "01:00 PM", type: "transit" },
    ],
  },
};

const EXPLORER_MODES = [
  { id: "fast", icon: "⚡", label: "Fast Explorer", desc: "Efficient — more stops, less time each" },
  { id: "leisure", icon: "🌿", label: "Leisure Explorer", desc: "Relaxed — rich experience at every stop" },
  { id: "photographer", icon: "📷", label: "Photographer", desc: "Extra time at each spot for photography" },
];

const PREFERENCES = ["Food", "Shopping", "Culture", "Relax / Scenic"];

// ─── Main Component ──────────────────────────────────────
const TravelItinerary = ({ fort, onBack }) => {
  // ── CSS Injector (enables preview without .css file) ──
  React.useEffect(() => {
    const _id = 'TravelItinerary-css';
    if (!document.getElementById(_id)) {
      const _el = document.createElement('style');
      _el.id = _id;
      _el.textContent = `/* TravelItinerary.css */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800&family=DM+Sans:wght@300;400;500;600&display=swap');

.ti-page { background: #faf5ec; min-height: 100vh; font-family: 'DM Sans', sans-serif; color: #1e120a; }

/* ── Hero ── */
.ti-hero {
  position: relative; padding: 32px 52px 56px;
  background: linear-gradient(118deg, #8b3a00 0%, #c0622a 55%, #e8956d 100%);
  overflow: hidden; isolation: isolate;
}
.ti-hero__bg { position: absolute; inset: 0; background-image: var(--hero-img,none); background-size:cover; background-position:center; opacity:0.1; z-index:0; }
.ti-hero::before { content:''; position:absolute; inset:0; background:repeating-linear-gradient(-48deg,rgba(255,255,255,0.025) 0px,rgba(255,255,255,0.025) 1px,transparent 1px,transparent 22px); pointer-events:none; z-index:1; }
.ti-back-btn { position:relative; z-index:10; display:inline-flex; align-items:center; gap:6px; background:rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.35); color:#fff; padding:8px 20px; border-radius:100px; font-family:'DM Sans',sans-serif; font-size:0.82rem; font-weight:500; cursor:pointer; transition:all 0.22s; margin-bottom:36px; }
.ti-back-btn:hover { background:rgba(255,255,255,0.27); transform:translateX(-4px); }
.ti-hero__content { position:relative; z-index:10; }
.ti-hero__eyebrow { display:block; font-size:0.72rem; letter-spacing:0.24em; color:rgba(255,255,255,0.75); font-weight:600; text-transform:uppercase; margin-bottom:10px; }
.ti-hero__title { font-family:'Playfair Display',serif; font-size:clamp(2.4rem,5vw,4rem); font-weight:800; color:#fff; margin-bottom:12px; }
.ti-hero__sub { font-size:1rem; color:rgba(255,255,255,0.88); }
.ti-hero__sub strong { font-weight:600; color:#fff; }
.ti-hero__dots { position:absolute; bottom:24px; right:52px; display:flex; align-items:center; gap:8px; z-index:10; }
.ti-hero__dots span { width:8px; height:8px; border-radius:50%; background:rgba(255,255,255,0.3); }
.ti-hero__dots span:nth-child(2) { width:13px; height:13px; background:rgba(255,255,255,0.55); }

/* ── Tabs ── */
.ti-tabs { display:flex; background:#fff; border-bottom:2px solid #f0e0c8; padding:0 52px; gap:0; }
.ti-tab {
  display:flex; align-items:center; gap:8px; padding:18px 28px;
  font-family:'DM Sans',sans-serif; font-size:0.88rem; font-weight:500; color:#7a5a40;
  border:none; background:none; cursor:pointer; border-bottom:3px solid transparent; margin-bottom:-2px;
  transition:color 0.22s, border-color 0.22s;
}
.ti-tab__icon { font-size:1.1rem; }
.ti-tab--active { color:#c0622a; border-bottom-color:#c0622a; font-weight:600; }
.ti-tab:hover:not(.ti-tab--active) { color:#5a3a1a; }
@media(max-width:640px) { .ti-tabs { padding:0 16px; } .ti-tab { padding:14px 14px; font-size:0.78rem; } }

/* ── Body ── */
.ti-body { padding:50px 52px 80px; max-width:1340px; margin:0 auto; }
@media(max-width:768px) { .ti-body { padding:36px 18px 60px; } }

/* ── Section header ── */
.ti-section-header { margin-bottom:40px; opacity:0; transform:translateY(20px); transition:opacity 0.5s ease, transform 0.5s ease; }
.ti-section-header--visible { opacity:1; transform:translateY(0); }
.ti-section-eyebrow { display:block; font-size:0.7rem; letter-spacing:0.22em; color:#c0622a; font-weight:700; text-transform:uppercase; margin-bottom:8px; }
.ti-section-title { font-family:'Playfair Display',serif; font-size:clamp(1.8rem,3vw,2.6rem); font-weight:800; color:#1e120a; margin-bottom:10px; }
.ti-section-sub { font-size:0.95rem; color:#7a5a40; line-height:1.6; max-width:560px; }

/* ════════════ GUIDES ════════════ */
.ti-guides-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:28px; }
@media(max-width:1000px) { .ti-guides-grid { grid-template-columns:repeat(2,1fr); } }
@media(max-width:620px)  { .ti-guides-grid { grid-template-columns:1fr; } }

.ti-guide-card {
  background:#fff; border-radius:22px; overflow:hidden;
  border:1px solid rgba(200,170,130,0.35); box-shadow:0 4px 18px rgba(0,0,0,0.06);
  display:flex; flex-direction:column;
  opacity:0; transform:translateY(36px);
  transition:opacity 0.55s cubic-bezier(0.22,0.61,0.36,1) var(--delay,0s), transform 0.55s cubic-bezier(0.22,0.61,0.36,1) var(--delay,0s), box-shadow 0.3s ease;
}
.ti-guide-card--visible { opacity:1; transform:translateY(0); }
.ti-guide-card--visible:hover, .ti-guide-card--hovered {
  transform:translateY(-8px) scale(1.01);
  box-shadow:0 18px 46px rgba(0,0,0,0.1);
}

.ti-guide-card__img-wrap { position:relative; height:180px; overflow:hidden; }
.ti-guide-card__img { width:100%; height:100%; object-fit:cover; transition:transform 0.5s ease; }
.ti-guide-card--visible:hover .ti-guide-card__img { transform:scale(1.08); }
.ti-guide-card__img-overlay { position:absolute; inset:0; background:linear-gradient(to top,rgba(0,0,0,0.4) 0%,transparent 60%); }
.ti-guide-card__avatar { position:absolute; bottom:14px; left:16px; width:44px; height:44px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:1.4rem; border:3px solid rgba(255,255,255,0.8); }

.ti-guide-card__body { padding:18px 18px 20px; display:flex; flex-direction:column; gap:10px; flex:1; }
.ti-guide-card__top { display:flex; justify-content:space-between; align-items:flex-start; gap:10px; }
.ti-guide-card__name { font-family:'Playfair Display',serif; font-size:1.1rem; font-weight:700; color:#1e120a; margin:0; }
.ti-guide-card__role { font-size:0.75rem; color:#9b7a5a; font-weight:500; }
.ti-guide-card__rating { display:flex; align-items:center; gap:3px; flex-shrink:0; }
.ti-guide-card__star { color:#f5a623; font-size:0.9rem; }
.ti-guide-card__rating-num { font-size:0.88rem; font-weight:700; color:#1e120a; }
.ti-guide-card__reviews { font-size:0.75rem; color:#9b7a5a; }
.ti-guide-card__meta { display:flex; flex-direction:column; gap:4px; }
.ti-guide-card__meta-item { font-size:0.76rem; color:#6b5040; }
.ti-guide-card__specialty { font-size:0.76rem; font-weight:600; border:1px solid; padding:4px 12px; border-radius:100px; width:fit-content; }
.ti-guide-card__langs { display:flex; flex-wrap:wrap; gap:5px; }
.ti-guide-card__lang-chip { background:#f5f0e8; border:1px solid #e0cba8; color:#6b5040; font-size:0.72rem; padding:2px 10px; border-radius:100px; }
.ti-guide-card__bio { font-size:0.82rem; color:#6b5040; line-height:1.6; }
.ti-guide-card__btn {
  margin-top:auto; padding:10px 16px; border-radius:10px; color:#fff;
  font-family:'DM Sans',sans-serif; font-size:0.82rem; font-weight:600;
  border:none; cursor:pointer; transition:opacity 0.22s, transform 0.22s;
}
.ti-guide-card__btn:hover { opacity:0.88; transform:translateY(-2px); }

/* Guide modal */
.ti-modal-overlay { position:fixed; inset:0; z-index:1000; background:rgba(0,0,0,0.7); backdrop-filter:blur(6px); display:flex; align-items:center; justify-content:center; padding:20px; animation:tiOverlayIn 0.25s ease; }
@keyframes tiOverlayIn { from{opacity:0} to{opacity:1} }
.ti-modal { background:#fff; border-radius:24px; overflow:hidden; max-width:600px; width:100%; max-height:88vh; overflow-y:auto; position:relative; animation:tiSlideUp 0.3s cubic-bezier(0.22,0.61,0.36,1); box-shadow:0 24px 80px rgba(0,0,0,0.35); }
@keyframes tiSlideUp { from{transform:translateY(30px);opacity:0} to{transform:translateY(0);opacity:1} }
.ti-modal__close { position:absolute; top:16px; right:16px; z-index:10; width:36px; height:36px; border-radius:50%; background:rgba(0,0,0,0.5); color:#fff; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:0.9rem; transition:background 0.2s; }
.ti-modal__close:hover { background:rgba(0,0,0,0.8); }
.ti-modal__hero { height:220px; position:relative; overflow:hidden; }
.ti-modal__hero-img { width:100%; height:100%; object-fit:cover; }
.ti-modal__hero-overlay { position:absolute; inset:0; background:linear-gradient(to top,rgba(0,0,0,0.72) 0%,transparent 60%); }
.ti-modal__hero-content { position:absolute; bottom:20px; left:22px; z-index:2; display:flex; flex-direction:column; gap:5px; }
.ti-modal__avatar { width:44px; height:44px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:1.3rem; margin-bottom:4px; }
.ti-modal__name { font-family:'Playfair Display',serif; font-size:1.4rem; font-weight:700; color:#fff; margin:0; }
.ti-modal__role { font-size:0.78rem; color:rgba(255,255,255,0.8); }
.ti-modal__rating { display:flex; gap:8px; font-size:0.82rem; color:rgba(255,215,100,0.95); font-weight:600; }
.ti-modal__body { padding:24px; display:flex; flex-direction:column; gap:20px; }
.ti-modal__meta-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:10px; }
.ti-modal__meta-item { background:#f8f3ea; border-radius:10px; padding:12px 14px; }
.ti-modal__meta-label { display:block; font-size:0.68rem; letter-spacing:0.1em; text-transform:uppercase; color:#9b7a5a; font-weight:600; margin-bottom:3px; }
.ti-modal__meta-val { font-size:0.88rem; color:#1e120a; font-weight:500; }
.ti-modal__bio { font-size:0.9rem; color:#4a3020; line-height:1.7; }
.ti-modal__section { display:flex; flex-direction:column; gap:10px; }
.ti-modal__section-title { font-family:'Playfair Display',serif; font-size:1rem; color:#1e120a; margin:0; }
.ti-modal__list { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:6px; }
.ti-modal__list li { font-size:0.88rem; color:#4a3020; padding-left:16px; position:relative; }
.ti-modal__list li::before { content:'✓'; position:absolute; left:0; color:#c0622a; font-weight:700; }
.ti-modal__tours { display:flex; flex-wrap:wrap; gap:8px; }
.ti-modal__tour-chip { border:1.5px solid; padding:5px 14px; border-radius:100px; font-size:0.8rem; font-weight:500; }

/* ════════════ BUDGET ════════════ */
.ti-budget { opacity:0; transform:translateY(20px); transition:opacity 0.5s ease, transform 0.5s ease; }
.ti-budget--visible { opacity:1; transform:translateY(0); }
.ti-budget__card { background:#fff; border-radius:20px; border:1px solid rgba(200,170,130,0.35); box-shadow:0 4px 18px rgba(0,0,0,0.06); padding:32px; max-width:680px; }
.ti-budget__slider-row { display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; }
.ti-budget__label { font-size:0.9rem; color:#6b5040; font-weight:500; }
.ti-budget__value { font-family:'Playfair Display',serif; font-size:1.4rem; font-weight:700; color:#c0622a; }
.ti-budget__slider { width:100%; appearance:none; height:6px; border-radius:3px; background:linear-gradient(to right,#c0622a 0%,#c0622a calc(var(--val,50%)),#e5d0b8 calc(var(--val,50%)),#e5d0b8 100%); outline:none; cursor:pointer; }
.ti-budget__slider::-webkit-slider-thumb { appearance:none; width:20px; height:20px; border-radius:50%; background:#c0622a; box-shadow:0 2px 8px rgba(192,98,42,0.4); cursor:pointer; }
.ti-budget__range-labels { display:flex; justify-content:space-between; font-size:0.75rem; color:#9b7a5a; margin-top:4px; margin-bottom:20px; }
.ti-budget__results { margin-top:4px; }
.ti-budget__results-title { font-family:'Playfair Display',serif; font-size:1rem; color:#1e120a; margin-bottom:14px; display:flex; align-items:center; gap:10px; }
.ti-budget__count { background:#c0622a; color:#fff; font-size:0.72rem; font-family:'DM Sans',sans-serif; font-weight:700; padding:2px 9px; border-radius:100px; }
.ti-budget__empty { font-size:0.88rem; color:#9b7a5a; }
.ti-budget__list { list-style:none; padding:0; margin:0 0 16px; display:flex; flex-direction:column; gap:1px; }
.ti-budget__item { display:flex; justify-content:space-between; align-items:center; padding:10px 14px; border-radius:8px; background:#fdf8f2; border:1px solid #f0e0c8; }
.ti-budget__item:hover { background:#f5ece0; }
.ti-budget__item-name { display:block; font-size:0.88rem; color:#1e120a; font-weight:500; }
.ti-budget__item-cat { font-size:0.73rem; color:#9b7a5a; }
.ti-budget__item-price { font-size:0.9rem; font-weight:700; color:#c0622a; flex-shrink:0; }
.ti-budget__summary { border-top:2px dashed #e5d0b8; padding-top:14px; display:flex; flex-direction:column; gap:8px; }
.ti-budget__summary-row { display:flex; justify-content:space-between; font-size:0.9rem; color:#6b5040; }
.ti-budget__total { color:#1e120a; font-size:1rem; }
.ti-budget__remaining { color:#27ae60; font-size:1rem; }
.ti-budget__tip { background:#f0faf4; border:1px solid #c8e8d0; border-radius:10px; padding:12px 16px; font-size:0.85rem; color:#1a5e38; margin-top:12px; }

/* ════════════ PLANNER ════════════ */
.ti-planner { opacity:0; transform:translateY(20px); transition:opacity 0.5s ease, transform 0.5s ease; }
.ti-planner--visible { opacity:1; transform:translateY(0); }
.ti-planner__steps { display:flex; align-items:center; gap:0; margin-bottom:36px; }
.ti-planner__step { width:36px; height:36px; border-radius:50%; background:#e5d0b8; color:#9b7a5a; font-weight:700; font-size:0.88rem; display:flex; align-items:center; justify-content:center; transition:background 0.3s, color 0.3s; }
.ti-planner__step--active { background:#c0622a; color:#fff; }
.ti-planner__step-line { flex:1; height:2px; background:#e5d0b8; max-width:60px; }

.ti-planner__form, .ti-planner__result { display:flex; flex-direction:column; gap:28px; }

.ti-planner__section { background:#fff; border-radius:16px; padding:22px 24px; border:1px solid rgba(200,170,130,0.35); box-shadow:0 2px 10px rgba(0,0,0,0.04); }
.ti-planner__section-label { font-size:0.88rem; font-weight:600; color:#1e120a; margin-bottom:14px; display:block; }
.ti-planner__section-label small { font-size:0.78rem; color:#9b7a5a; font-weight:400; }

.ti-planner__row { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
@media(max-width:680px) { .ti-planner__row { grid-template-columns:1fr; } }

.ti-planner__mode-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; }
@media(max-width:580px) { .ti-planner__mode-grid { grid-template-columns:1fr; } }
.ti-planner__mode-btn {
  display:flex; flex-direction:column; gap:4px; padding:14px 16px; border-radius:12px;
  border:2px solid #e5d0b8; background:#fdf8f2; cursor:pointer; text-align:left;
  transition:border-color 0.22s, background 0.22s;
}
.ti-planner__mode-btn--active { border-color:#c0622a; background:#fff5ee; }
.ti-planner__mode-icon { font-size:1.4rem; }
.ti-planner__mode-label { font-size:0.86rem; font-weight:600; color:#1e120a; }
.ti-planner__mode-desc { font-size:0.75rem; color:#7a5a40; }

.ti-planner__chips { display:flex; flex-wrap:wrap; gap:8px; }
.ti-planner__chip {
  padding:7px 18px; border-radius:100px; border:1.5px solid #dac8a8;
  background:#fff; color:#6b5040; font-family:'DM Sans',sans-serif; font-size:0.82rem; font-weight:500;
  cursor:pointer; transition:all 0.22s;
}
.ti-planner__chip--active { background:#c0622a; border-color:#c0622a; color:#fff; font-weight:600; }
.ti-planner__chip:hover:not(.ti-planner__chip--active) { border-color:#c0622a; color:#8b3a00; }

.ti-planner__time-input { padding:10px 14px; border:1.5px solid #dac8a8; border-radius:10px; font-family:'DM Sans',sans-serif; font-size:0.9rem; color:#1e120a; background:#fff; width:fit-content; outline:none; }
.ti-planner__time-input:focus { border-color:#c0622a; }
.ti-planner__time-hint { font-size:0.78rem; color:#9b7a5a; margin-top:6px; }

.ti-planner__budget-row { display:flex; justify-content:space-between; margin-bottom:10px; font-size:0.88rem; color:#6b5040; }
.ti-planner__budget-val { font-family:'Playfair Display',serif; font-size:1.1rem; font-weight:700; color:#c0622a; }
.ti-planner__budget-slider { width:100%; appearance:none; height:6px; border-radius:3px; background:linear-gradient(to right,#c0622a 0%,#c0622a 30%,#e5d0b8 30%,#e5d0b8 100%); outline:none; cursor:pointer; }
.ti-planner__budget-slider::-webkit-slider-thumb { appearance:none; width:20px; height:20px; border-radius:50%; background:#c0622a; box-shadow:0 2px 8px rgba(192,98,42,0.4); cursor:pointer; }
.ti-planner__budget-labels { display:flex; justify-content:space-between; font-size:0.73rem; color:#9b7a5a; margin-top:4px; }

.ti-planner__generate-btn {
  padding:16px 32px; border-radius:14px; border:none; cursor:pointer;
  background:linear-gradient(135deg,#c0622a,#8b3a00); color:#fff;
  font-family:'DM Sans',sans-serif; font-size:1rem; font-weight:700;
  box-shadow:0 6px 24px rgba(192,98,42,0.35);
  transition:transform 0.22s, box-shadow 0.22s; width:100%;
}
.ti-planner__generate-btn:hover { transform:translateY(-3px); box-shadow:0 10px 32px rgba(192,98,42,0.45); }

/* Result */
.ti-planner__result-header { background:#fff; border-radius:16px; padding:22px 24px; border:1px solid rgba(200,170,130,0.35); }
.ti-planner__result-title { font-family:'Playfair Display',serif; font-size:1.4rem; font-weight:700; color:#1e120a; margin-bottom:12px; }
.ti-planner__result-meta { display:flex; flex-wrap:wrap; gap:12px; }
.ti-planner__result-meta span { background:#f5ece0; border:1px solid #e5d0b8; color:#6b5040; font-size:0.8rem; font-weight:500; padding:5px 14px; border-radius:100px; }

/* Route visualization */
.ti-planner__route { display:flex; flex-direction:column; gap:0; background:#fff; border-radius:16px; padding:24px; border:1px solid rgba(200,170,130,0.35); }
.ti-planner__stop { display:grid; grid-template-columns:40px 1fr; gap:16px; position:relative; }
.ti-planner__stop-marker { display:flex; flex-direction:column; align-items:center; flex-shrink:0; }
.ti-planner__stop-label { width:36px; height:36px; border-radius:50%; background:#c0622a; color:#fff; font-size:0.8rem; font-weight:700; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.ti-planner__stop--transit .ti-planner__stop-label { background:#6b5040; }
.ti-planner__stop--nature .ti-planner__stop-label { background:#27ae60; }
.ti-planner__stop--spiritual .ti-planner__stop-label { background:#8e44ad; }
.ti-planner__stop-line { flex:1; width:2px; background:#f0d5b0; margin:4px 0; min-height:20px; }
.ti-planner__stop-content { padding-bottom:24px; }
.ti-planner__stop-time { font-size:0.72rem; font-weight:700; color:#c0622a; letter-spacing:0.08em; text-transform:uppercase; }
.ti-planner__stop-name { font-family:'Playfair Display',serif; font-size:1rem; font-weight:700; color:#1e120a; margin:2px 0 4px; }
.ti-planner__stop-desc { font-size:0.83rem; color:#6b5040; line-height:1.55; margin:0; }

.ti-planner__restart-btn { padding:12px 24px; border-radius:100px; border:1.5px solid #c0622a; background:transparent; color:#c0622a; font-family:'DM Sans',sans-serif; font-size:0.85rem; font-weight:600; cursor:pointer; transition:all 0.22s; width:fit-content; }
.ti-planner__restart-btn:hover { background:#c0622a; color:#fff; }
`;
      document.head.appendChild(_el);
    }
    return () => { const _el = document.getElementById(_id); if (_el) _el.remove(); };
  }, []);

  const [activeTab, setActiveTab] = useState("guides"); // guides | budget | planner
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="ti-page">
      {/* ── Hero ── */}
      <div className="ti-hero" style={{ "--hero-img": `url(${fort?.imageUrl || fort?.image || ""})` }}>
        <div className="ti-hero__bg" />
        <button className="ti-back-btn" onClick={onBack}>← Back to {fort?.name || "Fort"}</button>
        <div className="ti-hero__content">
          <span className="ti-hero__eyebrow">PLAN YOUR JOURNEY</span>
          <h1 className="ti-hero__title">Travel Itinerary</h1>
          <p className="ti-hero__sub">
            Expert guides, budget planning & smart routes for{" "}
            <strong>{fort?.name || "the fort"}</strong>
          </p>
        </div>
        <div className="ti-hero__dots"><span /><span /><span /><span /></div>
      </div>

      {/* ── Tab Nav ── */}
      <div className="ti-tabs">
        {[
          { id: "guides",  icon: "👤", label: "Meet the Guides" },
          { id: "budget",  icon: "💰", label: "Budget Planner" },
          { id: "planner", icon: "🗺️", label: "Smart Planner" },
        ].map((tab) => (
          <button
            key={tab.id}
            className={`ti-tab ${activeTab === tab.id ? "ti-tab--active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="ti-tab__icon">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ── Content ── */}
      <div className="ti-body" ref={sectionRef}>
        {activeTab === "guides"  && <GuidesSection visible={visible} />}
        {activeTab === "budget"  && <BudgetPlanner visible={visible} fortName={fort?.name} />}
        {activeTab === "planner" && <SmartPlanner visible={visible} fort={fort} />}
      </div>
    </div>
  );
};

// ─── Guides Section ──────────────────────────────────────
const GuidesSection = ({ visible }) => {
  const [selectedGuide, setSelectedGuide] = useState(null);

  return (
    <div className="ti-guides">
      <div className={`ti-section-header ${visible ? "ti-section-header--visible" : ""}`}>
        <span className="ti-section-eyebrow">LOCAL EXPERTS</span>
        <h2 className="ti-section-title">Meet the Guides</h2>
        <p className="ti-section-sub">Certified heritage storytellers who bring the fort's past to life</p>
      </div>

      <div className="ti-guides-grid">
        {GUIDES.map((guide, i) => (
          <GuideCard
            key={guide.id}
            guide={guide}
            index={i}
            visible={visible}
            onSelect={() => setSelectedGuide(guide)}
          />
        ))}
      </div>

      {selectedGuide && (
        <GuideModal guide={selectedGuide} onClose={() => setSelectedGuide(null)} />
      )}
    </div>
  );
};

const GuideCard = ({ guide, index, visible, onSelect }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`ti-guide-card ${visible ? "ti-guide-card--visible" : ""} ${hovered ? "ti-guide-card--hovered" : ""}`}
      style={{ "--delay": `${index * 0.12}s`, "--guide-color": guide.color }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="ti-guide-card__img-wrap">
        <img src={guide.img} alt={guide.name} className="ti-guide-card__img" />
        <div className="ti-guide-card__img-overlay" />
        <div className="ti-guide-card__avatar" style={{ background: guide.color + "22", color: guide.color }}>
          {guide.avatar}
        </div>
      </div>

      <div className="ti-guide-card__body">
        <div className="ti-guide-card__top">
          <div>
            <h3 className="ti-guide-card__name">{guide.name}</h3>
            <span className="ti-guide-card__role">{guide.role}</span>
          </div>
          <div className="ti-guide-card__rating">
            <span className="ti-guide-card__star">★</span>
            <span className="ti-guide-card__rating-num">{guide.rating}</span>
            <span className="ti-guide-card__reviews">({guide.reviews})</span>
          </div>
        </div>

        <div className="ti-guide-card__meta">
          <span className="ti-guide-card__meta-item">⏳ {guide.experience} yrs exp</span>
          <span className="ti-guide-card__meta-item">📍 {guide.location}</span>
        </div>

        <div className="ti-guide-card__specialty" style={{ borderColor: guide.color + "44", color: guide.color }}>
          {guide.specialty}
        </div>

        <div className="ti-guide-card__langs">
          {guide.languages.map((l) => (
            <span key={l} className="ti-guide-card__lang-chip">{l}</span>
          ))}
        </div>

        <p className="ti-guide-card__bio">{guide.bio.slice(0, 110)}…</p>

        <button
          className="ti-guide-card__btn"
          style={{ background: `linear-gradient(135deg, ${guide.color}, ${guide.color}cc)` }}
          onClick={onSelect}
        >
          View Full Profile →
        </button>
      </div>
    </div>
  );
};

const GuideModal = ({ guide, onClose }) => {
  useEffect(() => { document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = ""; }; }, []);

  return (
    <div className="ti-modal-overlay" onClick={onClose}>
      <div className="ti-modal" onClick={(e) => e.stopPropagation()}>
        <button className="ti-modal__close" onClick={onClose}>✕</button>
        <div className="ti-modal__hero">
          <img src={guide.img} alt={guide.name} className="ti-modal__hero-img" />
          <div className="ti-modal__hero-overlay" />
          <div className="ti-modal__hero-content">
            <div className="ti-modal__avatar" style={{ background: guide.color + "22", color: guide.color }}>
              {guide.avatar}
            </div>
            <h2 className="ti-modal__name">{guide.name}</h2>
            <span className="ti-modal__role">{guide.role}</span>
            <div className="ti-modal__rating">
              <span>★ {guide.rating}</span>
              <span>({guide.reviews} reviews)</span>
            </div>
          </div>
        </div>

        <div className="ti-modal__body">
          <div className="ti-modal__meta-grid">
            <div className="ti-modal__meta-item">
              <span className="ti-modal__meta-label">Experience</span>
              <span className="ti-modal__meta-val">{guide.experience} years</span>
            </div>
            <div className="ti-modal__meta-item">
              <span className="ti-modal__meta-label">Location</span>
              <span className="ti-modal__meta-val">{guide.location}</span>
            </div>
            <div className="ti-modal__meta-item">
              <span className="ti-modal__meta-label">Specialty</span>
              <span className="ti-modal__meta-val" style={{ color: guide.color }}>{guide.specialty}</span>
            </div>
            <div className="ti-modal__meta-item">
              <span className="ti-modal__meta-label">Languages</span>
              <span className="ti-modal__meta-val">{guide.languages.join(", ")}</span>
            </div>
          </div>

          <p className="ti-modal__bio">{guide.bio}</p>

          <div className="ti-modal__section">
            <h4 className="ti-modal__section-title">🎓 Certifications</h4>
            <ul className="ti-modal__list">
              {guide.certifications.map((c) => <li key={c}>{c}</li>)}
            </ul>
          </div>

          <div className="ti-modal__section">
            <h4 className="ti-modal__section-title">🗺️ Tours Offered</h4>
            <div className="ti-modal__tours">
              {guide.tours.map((t) => (
                <span key={t} className="ti-modal__tour-chip" style={{ borderColor: guide.color + "44", color: guide.color }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Budget Planner ──────────────────────────────────────
const BudgetPlanner = ({ visible, fortName }) => {
  const [budget, setBudget] = useState(2000);
  const affordable = BUDGET_ITEMS.filter((i) => i.price <= budget).sort((a, b) => a.price - b.price);
  let total = 0;
  const selected = [];
  for (const item of affordable) {
    if (total + item.price <= budget) { selected.push(item); total += item.price; }
  }
  const remaining = budget - total;

  return (
    <div className={`ti-budget ${visible ? "ti-budget--visible" : ""}`}>
      <div className="ti-section-header ti-section-header--visible">
        <span className="ti-section-eyebrow">SMART SHOPPING</span>
        <h2 className="ti-section-title">Plan Your Souvenir Budget</h2>
        <p className="ti-section-sub">Slide to set your budget and get personalised shopping recommendations for {fortName || "your visit"}.</p>
      </div>

      <div className="ti-budget__card">
        <div className="ti-budget__slider-row">
          <label className="ti-budget__label">Your Budget:</label>
          <span className="ti-budget__value">₹{budget.toLocaleString("en-IN")}</span>
        </div>
        <input
          type="range" min={500} max={5000} step={50} value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="ti-budget__slider"
        />
        <div className="ti-budget__range-labels"><span>₹500</span><span>₹5,000</span></div>

        <div className="ti-budget__results">
          <h4 className="ti-budget__results-title">
            Recommended Items
            <span className="ti-budget__count">{selected.length}</span>
          </h4>

          {selected.length === 0 ? (
            <p className="ti-budget__empty">Increase budget to see recommendations.</p>
          ) : (
            <ul className="ti-budget__list">
              {selected.map((item, i) => (
                <li key={i} className="ti-budget__item">
                  <div>
                    <span className="ti-budget__item-name">{item.name}</span>
                    <span className="ti-budget__item-cat">{item.category}</span>
                  </div>
                  <span className="ti-budget__item-price">₹{item.price}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="ti-budget__summary">
            <div className="ti-budget__summary-row">
              <span>Total:</span>
              <strong className="ti-budget__total">₹{total.toLocaleString("en-IN")}</strong>
            </div>
            <div className="ti-budget__summary-row">
              <span>Remaining:</span>
              <strong className="ti-budget__remaining">₹{remaining.toLocaleString("en-IN")}</strong>
            </div>
          </div>

          {remaining >= 0 && selected.length > 0 && (
            <div className="ti-budget__tip">
              🎉 You still have ₹{remaining.toLocaleString("en-IN")} left for snacks or add-ons!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Smart Planner ───────────────────────────────────────
const SmartPlanner = ({ visible, fort }) => {
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState("leisure");
  const [fortHours, setFortHours] = useState("2");
  const [extraHours, setExtraHours] = useState("2-3");
  const [prefs, setPrefs] = useState(["Food"]);
  const [startTime, setStartTime] = useState("09:00");
  const [budget, setBudget] = useState(1500);
  const [generated, setGenerated] = useState(false);

  const fortId = fort?.id || "shivneri";
  const itData = ITINERARY_DATA[fortId] || ITINERARY_DATA.shivneri;

  const togglePref = (p) => setPrefs((prev) => prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]);

  const handleGenerate = () => { setGenerated(true); setStep(2); };

  return (
    <div className={`ti-planner ${visible ? "ti-planner--visible" : ""}`}>
      <div className="ti-section-header ti-section-header--visible">
        <span className="ti-section-eyebrow">SMART PLANNING</span>
        <h2 className="ti-section-title">Plan Your {fort?.name || "Fort"} Day</h2>
        <p className="ti-section-sub">Tell us your time, budget & mood — we'll craft a personalised itinerary using real local stops.</p>
      </div>

      {/* Step indicator */}
      <div className="ti-planner__steps">
        <div className={`ti-planner__step ${step >= 1 ? "ti-planner__step--active" : ""}`}>1</div>
        <div className="ti-planner__step-line" />
        <div className={`ti-planner__step ${step >= 2 ? "ti-planner__step--active" : ""}`}>2</div>
      </div>

      {step === 1 && (
        <div className="ti-planner__form">

          {/* Explorer mode */}
          <div className="ti-planner__section">
            <h4 className="ti-planner__section-label">🚀 Choose Your Explorer Mode</h4>
            <div className="ti-planner__mode-grid">
              {EXPLORER_MODES.map((m) => (
                <button
                  key={m.id}
                  className={`ti-planner__mode-btn ${mode === m.id ? "ti-planner__mode-btn--active" : ""}`}
                  onClick={() => setMode(m.id)}
                >
                  <span className="ti-planner__mode-icon">{m.icon}</span>
                  <span className="ti-planner__mode-label">{m.label}</span>
                  <span className="ti-planner__mode-desc">{m.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="ti-planner__row">
            {/* Fort hours */}
            <div className="ti-planner__section">
              <h4 className="ti-planner__section-label">⏰ Time Spent at Fort</h4>
              <div className="ti-planner__chips">
                {["1 Hour", "2 Hours", "3+ Hours"].map((h) => (
                  <button
                    key={h}
                    className={`ti-planner__chip ${fortHours === h ? "ti-planner__chip--active" : ""}`}
                    onClick={() => setFortHours(h)}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>

            {/* Extra time */}
            <div className="ti-planner__section">
              <h4 className="ti-planner__section-label">🌅 Remaining Time After Fort</h4>
              <div className="ti-planner__chips">
                {["1 Hour", "2-3 Hours", "Half Day", "Full Day"].map((h) => (
                  <button
                    key={h}
                    className={`ti-planner__chip ${extraHours === h ? "ti-planner__chip--active" : ""}`}
                    onClick={() => setExtraHours(h)}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="ti-planner__row">
            {/* Preferences */}
            <div className="ti-planner__section">
              <h4 className="ti-planner__section-label">🎭 Experience Preferences <small>(pick any)</small></h4>
              <div className="ti-planner__chips">
                {PREFERENCES.map((p) => (
                  <button
                    key={p}
                    className={`ti-planner__chip ${prefs.includes(p) ? "ti-planner__chip--active" : ""}`}
                    onClick={() => togglePref(p)}
                  >
                    {prefs.includes(p) ? "✓ " : ""}{p}
                  </button>
                ))}
              </div>
            </div>

            {/* Start time */}
            <div className="ti-planner__section">
              <h4 className="ti-planner__section-label">🕘 Start Time (Leaving Fort)</h4>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="ti-planner__time-input"
              />
              <p className="ti-planner__time-hint">The clock time when you leave the fort and begin your day.</p>
            </div>
          </div>

          {/* Budget */}
          <div className="ti-planner__section">
            <h4 className="ti-planner__section-label">💰 Budget for the Rest of the Day</h4>
            <div className="ti-planner__budget-row">
              <span>Your Budget:</span>
              <span className="ti-planner__budget-val">₹{budget.toLocaleString("en-IN")}</span>
            </div>
            <input
              type="range" min={500} max={5000} step={100} value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="ti-planner__budget-slider"
            />
            <div className="ti-planner__budget-labels"><span>₹500</span><span>₹5,000</span></div>
          </div>

          <button className="ti-planner__generate-btn" onClick={handleGenerate}>
            ✨ Generate My Smart Itinerary
          </button>
        </div>
      )}

      {step === 2 && generated && (
        <div className="ti-planner__result">
          <div className="ti-planner__result-header">
            <h3 className="ti-planner__result-title">Your Personalised Itinerary</h3>
            <div className="ti-planner__result-meta">
              <span>🚀 {EXPLORER_MODES.find(m => m.id === mode)?.label}</span>
              <span>⏰ {fortHours} at fort</span>
              <span>💰 ₹{budget.toLocaleString("en-IN")} budget</span>
            </div>
          </div>

          {/* Route map visualization */}
          <div className="ti-planner__route">
            {itData.stops.map((stop, i) => (
              <div key={i} className={`ti-planner__stop ti-planner__stop--${stop.type}`}>
                <div className="ti-planner__stop-marker">
                  <span className="ti-planner__stop-label">{stop.label}</span>
                </div>
                {i < itData.stops.length - 1 && <div className="ti-planner__stop-line" />}
                <div className="ti-planner__stop-content">
                  <span className="ti-planner__stop-time">{stop.time}</span>
                  <h4 className="ti-planner__stop-name">{stop.name}</h4>
                  <p className="ti-planner__stop-desc">{stop.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="ti-planner__restart-btn" onClick={() => { setStep(1); setGenerated(false); }}>
            ← Modify Preferences
          </button>
        </div>
      )}
    </div>
  );
};

export default TravelItinerary;