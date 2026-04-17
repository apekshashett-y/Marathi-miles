// ═══════════════════════════════════════════════════════
//  ShoppingSection.jsx  — SELF-CONTAINED
//  BazaarSection inlined (Leaflet map replaced with static
//  market cards so preview works without extra libraries).
//  In your real project, keep:  import BazaarSection from "./BazaarSection";
// ═══════════════════════════════════════════════════════

import React, { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────
//  DATA
// ─────────────────────────────────────────────────────
const FORT_COORDS = { lat: 19.1923, lng: 73.8638 };

const MARKETS = [
  { id: "shivneri_base", name: "Shivneri Base Market",   dist: "0.5 km", time: "7 AM – 8 PM",  lat: 19.2006, lng: 73.8746, type: "Local Market",    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=70", desc: "The bustling market at the fort's base — the best place for authentic Junnar handicrafts and local produce.", items: ["Warli Art","Honey","Spices","Idols"] },
  { id: "junnar_weekly", name: "Junnar Weekly Bazaar",   dist: "3.2 km", time: "Tuesdays",      lat: 19.2095, lng: 73.8782, type: "Weekly Fair",     img: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=600&q=70", desc: "A vibrant weekly market held every Tuesday — the heart of Junnar's traditional economy for over 200 years.", items: ["Kolhapuri Chappals","Tribal Jewellery","Textiles"] },
  { id: "junnar_main",   name: "Junnar Main Market Road",dist: "3.8 km", time: "9 AM – 9 PM",  lat: 19.2080, lng: 73.8755, type: "Permanent Market",img: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&q=70", desc: "Year-round permanent market with artisan studios, souvenir shops and authentic local food stalls.", items: ["Fort Miniatures","Warli Paintings","Souvenirs"] },
];

const PRODUCTS = [
  { id:"shivaji_idol",      name:"Shivaji Maharaj Miniature Idol", category:"Fort Souvenirs",       priceRange:"₹450–₹1,200", img:"https://images.unsplash.com/photo-1582719508461-905c673771fd?w=500&q=70", market:"Shivneri Base Market",  artisan:"Dnyaneshwar Kale, 3rd-gen brass sculptor, Junnar.", desc:"Cast in traditional Panchdhatu by Junnar artisans, this miniature idol depicts Shivaji Maharaj in his Abhishek pose. Hand-engraved with intricate Maratha battle motifs." },
  { id:"kolhapuri",         name:"Kolhapuri Chappals",             category:"Traditional Items",    priceRange:"₹600–₹1,800", img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=70", market:"Junnar Weekly Bazaar",   artisan:"Kolhapuri craft cooperatives, Junnar Weekly Bazaar every Tuesday.", desc:"Handstitched from single-piece vegetable-tanned leather following the medieval Kolhapuri craft tradition. A registered GI craft of Maharashtra." },
  { id:"warli_painting",    name:"Warli Art Painting",             category:"Handicrafts",          priceRange:"₹300–₹1,500", img:"https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&q=70", market:"Junnar Main Market Road",artisan:"Warli Women's Self-Help Cooperative, Ambivali village, 12 km from Shivneri.", desc:"One of India's oldest tribal art forms — rice paste on handmade cloth encoding stories of harvests and forest spirits through geometric symbols." },
  { id:"wild_honey",        name:"Local Shivneri Wild Honey",      category:"Local Food Products",  priceRange:"₹400–₹900",   img:"https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=500&q=70", market:"Shivneri Base Market",  artisan:"Mangal Patil & 12 women honey-hunters, Narayangaon taluka.", desc:"Harvested from rock-bee colonies nesting in the Sahyadri limestone cliffs. Entirely unprocessed amber honey with medicinal bitterness." },
  { id:"fort_miniature",    name:"Shivneri Fort Miniature Model",  category:"Fort Souvenirs",       priceRange:"₹600–₹2,000", img:"https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=500&q=70", market:"Shivneri Base Market",  artisan:"Ravi Shinde, self-taught architectural model maker, 15 years experience.", desc:"Sculpted from red laterite clay — same material as Shivneri's original bastions. Faithfully reproduces the Maha Darwaja, watch towers and Shivaji's birth chamber." },
];

const ARTISANS = [
  { id:"savita",       name:"Savita Jadhav",      craft:"Warli Tribal Art",                exp:18, location:"Ambivali village, Junnar",    icon:"🎨", color:"#c0392b", desc:"A founding member of the Warli Women's Self-Help Cooperative, Savita learned painting from her mother at age 9. Her works are displayed at the Tribal Research Institute, Pune." },
  { id:"dnyaneshwar",  name:"Dnyaneshwar Kale",   craft:"Brass & Panchdhatu Sculpting",    exp:35, location:"Junnar town, craft quarter",   icon:"⚒️", color:"#d4a017", desc:"Third-generation metal sculptor whose grandfather supplied temple idols to the Lenyadri Buddhist caves. Uses traditional lost-wax casting to create Shivaji idols." },
  { id:"mangal",       name:"Mangal Patil",        craft:"Wild Honey Harvesting",           exp:22, location:"Narayangaon taluka, Junnar",   icon:"🍯", color:"#2ecc71", desc:"A certified forest honey harvester licensed by the Maharashtra Forest Department. Leads 12 women who sustainably harvest rock-bee honey from the Sahyadri cliffs." },
];

const BUDGET_ITEMS = [
  { name:"Small Warli Bookmark",           category:"Handicrafts",       price:80 },
  { name:"Wild Honey Sample Jar (100g)",   category:"Local Food Products",price:150 },
  { name:"Warli Art Card Set (6 cards)",   category:"Handicrafts",       price:200 },
  { name:"Gavran Masala Spice Pack",       category:"Local Food Products",price:220 },
  { name:"Warli Art Painting (A5)",        category:"Handicrafts",       price:350 },
  { name:"Wild Honey (250g)",              category:"Local Food Products",price:400 },
  { name:"Shivaji Idol – Small",           category:"Fort Souvenirs",    price:450 },
  { name:"Kolhapuri Chappals – Basic",     category:"Traditional Items", price:600 },
  { name:"Fort Miniature – Small",         category:"Fort Souvenirs",    price:650 },
  { name:"Shivaji Idol – Medium",          category:"Fort Souvenirs",    price:850 },
  { name:"Warli Art Painting (A3)",        category:"Handicrafts",       price:900 },
  { name:"Kolhapuri Chappals – Premium",   category:"Traditional Items", price:1200 },
  { name:"Warli Art Painting (A2 Framed)", category:"Handicrafts",       price:1400 },
  { name:"Fort Miniature – Large",         category:"Fort Souvenirs",    price:1500 },
];

const CATEGORIES = ["All","Handicrafts","Fort Souvenirs","Local Food Products","Traditional Items"];

// ─────────────────────────────────────────────────────
//  SUB-COMPONENTS
// ─────────────────────────────────────────────────────
const ProductDetail = ({ product, onClose }) => {
  if (!product) return null;
  return (
    <div onClick={onClose} style={{ position:"fixed",inset:0,zIndex:1000,background:"rgba(0,0,0,0.72)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:20 }}>
      <div onClick={e => e.stopPropagation()} style={{ background:"#fff",borderRadius:24,overflow:"hidden",maxWidth:560,width:"100%",maxHeight:"88vh",overflowY:"auto",position:"relative",boxShadow:"0 24px 80px rgba(0,0,0,0.35)" }}>
        <button onClick={onClose} style={{ position:"absolute",top:14,right:14,zIndex:10,width:34,height:34,borderRadius:"50%",background:"rgba(0,0,0,0.5)",color:"#fff",border:"none",cursor:"pointer",fontSize:"0.88rem" }}>✕</button>
        <img src={product.img} alt={product.name} style={{ width:"100%",height:240,objectFit:"cover" }} />
        <div style={{ padding:24,display:"flex",flexDirection:"column",gap:14 }}>
          <div>
            <span style={{ fontFamily:"'DM Sans',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:"#c0622a",background:"rgba(192,98,42,0.1)",padding:"3px 10px",borderRadius:100 }}>{product.category}</span>
          </div>
          <h2 style={{ fontFamily:"'Playfair Display',serif",fontSize:"1.5rem",fontWeight:700,color:"#1e120a",margin:0 }}>{product.name}</h2>
          <p style={{ fontFamily:"'Playfair Display',serif",fontSize:"1.2rem",fontWeight:600,color:"#7b3fc4",margin:0 }}>{product.priceRange}</p>
          <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:"0.9rem",color:"#4a3020",lineHeight:1.7,margin:0 }}>{product.desc}</p>
          <div style={{ borderTop:"1px dashed #e5d0b8",paddingTop:14,display:"flex",flexDirection:"column",gap:8 }}>
            <div style={{ fontFamily:"'DM Sans',sans-serif",fontSize:"0.82rem",color:"#6b5040" }}>🏪 <strong>{product.market}</strong></div>
            <div style={{ fontFamily:"'DM Sans',sans-serif",fontSize:"0.82rem",color:"#6b5040" }}>🧵 {product.artisan}</div>
          </div>
          <a href={`https://www.google.com/maps/search/${encodeURIComponent(product.market + " Junnar Maharashtra")}`} target="_blank" rel="noopener noreferrer"
            style={{ display:"inline-flex",alignItems:"center",justifyContent:"center",gap:8,background:"linear-gradient(135deg,#7b3fc4,#4a1a8a)",color:"#fff",padding:"12px 20px",borderRadius:100,fontFamily:"'DM Sans',sans-serif",fontSize:"0.85rem",fontWeight:600,textDecoration:"none",marginTop:4 }}>
            Open in Google Maps →
          </a>
        </div>
      </div>
    </div>
  );
};

const BudgetPlanner = () => {
  const [budget, setBudget] = useState(2000);
  const affordable = BUDGET_ITEMS.filter(i => i.price <= budget).sort((a,b) => a.price - b.price);
  let total = 0; const selected = [];
  for (const item of affordable) { if (total + item.price <= budget) { selected.push(item); total += item.price; } }
  const remaining = budget - total;

  return (
    <div className="ss-budget">
      <div className="ss-budget__header">
        <div className="ss-budget__icon">₹</div>
        <div>
          <h3 className="ss-budget__title">Plan Your Souvenir Budget</h3>
          <p className="ss-budget__sub">Slide to set your budget and get personalised shopping recommendations.</p>
        </div>
      </div>
      <div className="ss-budget__slider-row">
        <span className="ss-budget__label">Your Budget:</span>
        <span className="ss-budget__value">₹{budget.toLocaleString("en-IN")}</span>
      </div>
      <input type="range" min={500} max={5000} step={50} value={budget} onChange={e => setBudget(Number(e.target.value))} className="ss-budget__slider" />
      <div className="ss-budget__range-labels"><span>₹500</span><span>₹5,000</span></div>
      <h4 className="ss-budget__results-title">
        Recommended Items
        <span className="ss-budget__count">{selected.length}</span>
      </h4>
      {selected.length === 0
        ? <p className="ss-budget__empty">Increase budget to see recommendations.</p>
        : <ul className="ss-budget__list">
            {selected.map((item,i) => (
              <li key={i} className="ss-budget__item">
                <div>
                  <span className="ss-budget__item-name">{item.name}</span>
                  <span className="ss-budget__item-cat">{item.category}</span>
                </div>
                <span className="ss-budget__item-price">₹{item.price}</span>
              </li>
            ))}
          </ul>
      }
      <div className="ss-budget__summary">
        <div className="ss-budget__summary-row"><span>Total:</span><strong className="ss-budget__total">₹{total.toLocaleString("en-IN")}</strong></div>
        <div className="ss-budget__summary-row"><span>Remaining:</span><strong className="ss-budget__remaining">₹{remaining.toLocaleString("en-IN")}</strong></div>
      </div>
      {selected.length > 0 && (
        <div className="ss-budget__tip">🎉 You still have ₹{remaining.toLocaleString("en-IN")} left for small snacks or add-ons!</div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────
//  MAIN COMPONENT
// ─────────────────────────────────────────────────────
const ShoppingSection = ({ fort, onBack }) => {
  const [category, setCategory] = useState("All");
  const [detailProduct, setDetailProduct] = useState(null);
  const [hovered, setHovered] = useState(null);

  const filtered = category === "All" ? PRODUCTS : PRODUCTS.filter(p => p.category === category);

  // Inject CSS
  useEffect(() => {
    const id = "ss-injected-css";
    if (!document.getElementById(id)) {
      const el = document.createElement("style");
      el.id = id;
      el.textContent = SS_CSS;
      document.head.appendChild(el);
    }
    return () => { const el = document.getElementById(id); if (el) el.remove(); };
  }, []);

  const handleBack = () => { if (onBack) onBack(); else window.history.back(); };

  return (
    <div className="ss-page">
      {/* ── Hero ── */}
      <div className="ss-hero">
        <div className="ss-hero__bg" />
        <button className="ss-back-btn" onClick={handleBack}>← Back to Overview</button>
        <div className="ss-hero__content">
          <span className="ss-hero__eyebrow">SHOP THE HERITAGE</span>
          <h1 className="ss-hero__title">Heritage Bazaar</h1>
          <p className="ss-hero__sub">Authentic crafts, souvenirs &amp; local treasures near <strong>{fort?.name || "Shivneri Fort"}</strong></p>
        </div>
        <div className="ss-hero__dots"><span /><span /><span /></div>
      </div>

      <div className="ss-body">

        {/* ── Markets ── */}
        <div className="ss-section">
          <span className="ss-eyebrow">LOCAL MARKETS</span>
          <h2 className="ss-section-title">Where to Shop</h2>
          <div className="ss-markets-grid">
            {MARKETS.map(m => (
              <div key={m.id} className="ss-market-card"
                onMouseEnter={() => setHovered(m.id)} onMouseLeave={() => setHovered(null)}
                style={{ transform: hovered === m.id ? "translateY(-8px)" : "none", boxShadow: hovered === m.id ? "0 20px 48px rgba(0,0,0,0.1)" : "0 4px 16px rgba(0,0,0,0.06)" }}>
                <div className="ss-market-card__img-wrap">
                  <img src={m.img} alt={m.name} className="ss-market-card__img" style={{ transform: hovered === m.id ? "scale(1.08)" : "scale(1)" }} />
                </div>
                <div className="ss-market-card__body">
                  <span className="ss-market-card__type">{m.type}</span>
                  <h3 className="ss-market-card__name">{m.name}</h3>
                  <p className="ss-market-card__desc">{m.desc}</p>
                  <div className="ss-market-card__chips">{m.items.map(i => <span key={i} className="ss-market-card__chip">{i}</span>)}</div>
                  <div className="ss-market-card__meta">
                    <span>📏 {m.dist} from fort</span>
                    <span>🕐 {m.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Products ── */}
        <div className="ss-section">
          <span className="ss-eyebrow">WHAT TO BUY</span>
          <h2 className="ss-section-title">Heritage Products</h2>
          <div className="ss-filters">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`ss-filter-btn ${category === cat ? "ss-filter-btn--active" : ""}`}>
                {cat}
              </button>
            ))}
          </div>
          <div className="ss-products-grid">
            {filtered.map(p => (
              <div key={p.id} className="ss-product-card" onClick={() => setDetailProduct(p)}>
                <div className="ss-product-card__img-wrap">
                  <img src={p.img} alt={p.name} className="ss-product-card__img" />
                  <span className="ss-product-card__price">{p.priceRange}</span>
                  <div className="ss-product-card__overlay"><span>View Details →</span></div>
                </div>
                <div className="ss-product-card__body">
                  <span className="ss-product-card__cat">{p.category}</span>
                  <h3 className="ss-product-card__name">{p.name}</h3>
                  <p className="ss-product-card__desc">{p.desc.slice(0,100)}…</p>
                  <div className="ss-product-card__market">📍 {p.market}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Artisans ── */}
        <div className="ss-section">
          <span className="ss-eyebrow">MEET THE MAKERS</span>
          <h2 className="ss-section-title">Local Artisans</h2>
          <div className="ss-artisans-grid">
            {ARTISANS.map(a => (
              <div key={a.id} className="ss-artisan-card">
                <div className="ss-artisan-card__avatar" style={{ background: a.color + "22", color: a.color }}>{a.icon}</div>
                <div className="ss-artisan-card__body">
                  <h4 className="ss-artisan-card__name">{a.name}</h4>
                  <span className="ss-artisan-card__craft">{a.craft}</span>
                  <div className="ss-artisan-card__meta">
                    <span>📌 {a.location}</span>
                    <span>⏳ {a.exp} years experience</span>
                  </div>
                  <p className="ss-artisan-card__desc">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Budget Planner ── */}
        <div className="ss-section">
          <BudgetPlanner />
        </div>
      </div>

      {detailProduct && <ProductDetail product={detailProduct} onClose={() => setDetailProduct(null)} />}
    </div>
  );
};

export default ShoppingSection;

// ─────────────────────────────────────────────────────
//  INLINED CSS  (also lives in ShoppingSection.css)
// ─────────────────────────────────────────────────────
const SS_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800&family=DM+Sans:wght@300;400;500;600&display=swap');
.ss-page{background:#faf5ec;min-height:100vh;font-family:'DM Sans',sans-serif;color:#1e120a;}
.ss-hero{position:relative;width:100%;padding:32px 52px 56px;background:linear-gradient(118deg,#4a1a8a 0%,#7b3fc4 55%,#a67cf0 100%);overflow:hidden;isolation:isolate;}
.ss-hero__bg{position:absolute;inset:0;background-size:cover;background-position:center;opacity:.1;z-index:0;}
.ss-hero::before{content:'';position:absolute;inset:0;background:repeating-linear-gradient(-48deg,rgba(255,255,255,.025) 0px,rgba(255,255,255,.025) 1px,transparent 1px,transparent 22px);pointer-events:none;z-index:1;}
.ss-back-btn{position:relative;z-index:10;display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.35);color:#fff;padding:8px 20px;border-radius:100px;font-family:'DM Sans',sans-serif;font-size:.82rem;font-weight:500;cursor:pointer;transition:background .22s,transform .22s;margin-bottom:36px;}
.ss-back-btn:hover{background:rgba(255,255,255,.27);transform:translateX(-4px);}
.ss-hero__content{position:relative;z-index:10;}
.ss-hero__eyebrow{display:block;font-size:.72rem;letter-spacing:.24em;color:rgba(255,255,255,.75);font-weight:600;text-transform:uppercase;margin-bottom:10px;}
.ss-hero__title{font-family:'Playfair Display',serif;font-size:clamp(2.4rem,5vw,4rem);font-weight:800;color:#fff;margin-bottom:12px;}
.ss-hero__sub{font-size:1rem;color:rgba(255,255,255,.88);}
.ss-hero__sub strong{font-weight:600;color:#fff;}
.ss-hero__dots{position:absolute;bottom:24px;right:52px;display:flex;align-items:center;gap:8px;z-index:10;}
.ss-hero__dots span{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.3);}
.ss-hero__dots span:nth-child(2){width:13px;height:13px;background:rgba(255,255,255,.55);}
.ss-body{max-width:1340px;margin:0 auto;padding:0 40px 80px;}
.ss-section{padding-top:52px;}
.ss-eyebrow{display:block;font-size:.7rem;letter-spacing:.22em;color:#7b3fc4;font-weight:700;text-transform:uppercase;margin-bottom:8px;}
.ss-section-title{font-family:'Playfair Display',serif;font-size:2rem;font-weight:800;color:#1e120a;margin-bottom:28px;}
/* Markets */
.ss-markets-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;}
@media(max-width:900px){.ss-markets-grid{grid-template-columns:repeat(2,1fr);}}
@media(max-width:600px){.ss-markets-grid{grid-template-columns:1fr;}}
.ss-market-card{background:#fff;border-radius:20px;overflow:hidden;border:1px solid rgba(200,170,130,.3);transition:transform .35s cubic-bezier(.22,.61,.36,1),box-shadow .35s ease;cursor:default;}
.ss-market-card__img-wrap{height:160px;overflow:hidden;}
.ss-market-card__img{width:100%;height:100%;object-fit:cover;transition:transform .5s ease;}
.ss-market-card__body{padding:16px 18px 20px;}
.ss-market-card__type{display:inline-block;background:rgba(123,63,196,.1);color:#7b3fc4;font-size:.68rem;font-weight:600;padding:2px 10px;border-radius:100px;margin-bottom:8px;}
.ss-market-card__name{font-family:'Playfair Display',serif;font-size:1.05rem;font-weight:700;color:#1e120a;margin:0 0 8px;}
.ss-market-card__desc{font-size:.82rem;color:#6b5040;line-height:1.55;margin-bottom:12px;}
.ss-market-card__chips{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px;}
.ss-market-card__chip{background:#f8f3ea;border:1px solid #e0cba8;color:#6b5040;font-size:.7rem;padding:2px 9px;border-radius:100px;}
.ss-market-card__meta{display:flex;justify-content:space-between;font-size:.76rem;color:#9b7a5a;border-top:1px solid #f0e0c8;padding-top:10px;}
/* Filters */
.ss-filters{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:28px;}
.ss-filter-btn{padding:7px 18px;border-radius:100px;border:1.5px solid #dac8a8;background:#fff;color:#6b5040;font-family:'DM Sans',sans-serif;font-size:.82rem;font-weight:500;cursor:pointer;transition:all .22s;}
.ss-filter-btn--active{background:#7b3fc4;border-color:#7b3fc4;color:#fff;font-weight:600;}
/* Products */
.ss-products-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
@media(max-width:900px){.ss-products-grid{grid-template-columns:repeat(2,1fr);}}
@media(max-width:600px){.ss-products-grid{grid-template-columns:1fr;}}
.ss-product-card{background:#fff;border-radius:20px;overflow:hidden;border:1px solid rgba(200,170,130,.3);box-shadow:0 4px 16px rgba(0,0,0,.06);cursor:pointer;transition:transform .35s cubic-bezier(.22,.61,.36,1),box-shadow .35s ease;}
.ss-product-card:hover{transform:translateY(-8px) scale(1.01);box-shadow:0 20px 48px rgba(0,0,0,.1);}
.ss-product-card__img-wrap{position:relative;height:200px;overflow:hidden;}
.ss-product-card__img{width:100%;height:100%;object-fit:cover;transition:transform .5s ease;}
.ss-product-card:hover .ss-product-card__img{transform:scale(1.08);}
.ss-product-card__price{position:absolute;top:12px;right:12px;background:#7b3fc4;color:#fff;font-size:.72rem;font-weight:700;padding:4px 10px;border-radius:100px;}
.ss-product-card__overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.6) 0%,transparent 55%);display:flex;align-items:flex-end;padding:14px;opacity:0;transition:opacity .3s ease;}
.ss-product-card:hover .ss-product-card__overlay{opacity:1;}
.ss-product-card__overlay span{color:#fff;font-size:.82rem;font-weight:600;}
.ss-product-card__body{padding:16px 18px 20px;}
.ss-product-card__cat{display:inline-block;font-size:.68rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#7b3fc4;background:rgba(123,63,196,.1);padding:2px 10px;border-radius:100px;margin-bottom:8px;}
.ss-product-card__name{font-family:'Playfair Display',serif;font-size:1.05rem;font-weight:700;color:#1e120a;margin:0 0 6px;}
.ss-product-card__desc{font-size:.82rem;color:#6b5040;line-height:1.55;margin-bottom:8px;}
.ss-product-card__market{font-size:.76rem;color:#9b7a5a;}
/* Artisans */
.ss-artisans-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;}
@media(max-width:900px){.ss-artisans-grid{grid-template-columns:repeat(2,1fr);}}
@media(max-width:600px){.ss-artisans-grid{grid-template-columns:1fr;}}
.ss-artisan-card{background:#fff;border-radius:18px;padding:22px;border:1px solid rgba(200,170,130,.3);box-shadow:0 4px 14px rgba(0,0,0,.06);display:flex;gap:14px;}
.ss-artisan-card__avatar{width:52px;height:52px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:1.6rem;flex-shrink:0;}
.ss-artisan-card__body{display:flex;flex-direction:column;gap:6px;}
.ss-artisan-card__name{font-family:'Playfair Display',serif;font-size:1rem;font-weight:700;color:#1e120a;margin:0;}
.ss-artisan-card__craft{font-size:.76rem;color:#7b3fc4;font-weight:600;}
.ss-artisan-card__meta{display:flex;flex-direction:column;gap:3px;font-size:.74rem;color:#9b7a5a;}
.ss-artisan-card__desc{font-size:.82rem;color:#6b5040;line-height:1.6;}
/* Budget Planner */
.ss-budget{background:#fff;border-radius:22px;border:1px solid rgba(200,170,130,.3);box-shadow:0 4px 20px rgba(0,0,0,.06);padding:32px;max-width:680px;}
.ss-budget__header{display:flex;align-items:center;gap:16px;margin-bottom:22px;}
.ss-budget__icon{width:52px;height:52px;border-radius:14px;background:linear-gradient(135deg,#7b3fc4,#c084fc);display:flex;align-items:center;justify-content:center;color:#fff;font-size:1.4rem;font-weight:700;flex-shrink:0;}
.ss-budget__title{font-family:'Playfair Display',serif;font-size:1.2rem;font-weight:700;color:#1e120a;margin:0 0 4px;}
.ss-budget__sub{font-size:.82rem;color:#9b7a5a;margin:0;}
.ss-budget__slider-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;}
.ss-budget__label{font-size:.9rem;color:#6b5040;}
.ss-budget__value{font-family:'Playfair Display',serif;font-size:1.4rem;font-weight:700;color:#7b3fc4;}
.ss-budget__slider{width:100%;appearance:none;height:6px;border-radius:3px;background:linear-gradient(to right,#7b3fc4 0%,#7b3fc4 calc(var(--v,50%)),#e5d0b8 calc(var(--v,50%)),#e5d0b8 100%);outline:none;cursor:pointer;margin-bottom:4px;}
.ss-budget__slider::-webkit-slider-thumb{appearance:none;width:20px;height:20px;border-radius:50%;background:#7b3fc4;box-shadow:0 2px 8px rgba(123,63,196,.4);cursor:pointer;}
.ss-budget__range-labels{display:flex;justify-content:space-between;font-size:.73rem;color:#9b7a5a;margin-bottom:20px;}
.ss-budget__results-title{font-family:'Playfair Display',serif;font-size:1rem;color:#1e120a;margin:0 0 14px;display:flex;align-items:center;gap:10px;}
.ss-budget__count{background:#7b3fc4;color:#fff;font-family:'DM Sans',sans-serif;font-size:.68rem;font-weight:700;padding:2px 8px;border-radius:100px;}
.ss-budget__empty{font-size:.88rem;color:#9b7a5a;}
.ss-budget__list{list-style:none;padding:0;margin:0 0 16px;display:flex;flex-direction:column;gap:2px;}
.ss-budget__item{display:flex;justify-content:space-between;align-items:center;padding:10px 14px;border-radius:8px;background:#fdf8f2;border:1px solid #f0e0c8;}
.ss-budget__item-name{display:block;font-size:.88rem;color:#1e120a;font-weight:500;}
.ss-budget__item-cat{font-size:.73rem;color:#9b7a5a;}
.ss-budget__item-price{font-size:.9rem;font-weight:700;color:#7b3fc4;flex-shrink:0;}
.ss-budget__summary{border-top:2px dashed #e5d0b8;padding-top:14px;display:flex;flex-direction:column;gap:8px;}
.ss-budget__summary-row{display:flex;justify-content:space-between;font-size:.9rem;color:#6b5040;}
.ss-budget__total{color:#1e120a;font-size:1rem;}
.ss-budget__remaining{color:#27ae60;font-size:1rem;}
.ss-budget__tip{background:#f0faf4;border:1px solid #c8e8d0;border-radius:10px;padding:12px 16px;font-size:.85rem;color:#1a5e38;margin-top:12px;}
@media(max-width:640px){.ss-body{padding:0 18px 60px;}.ss-hero{padding:24px 20px 44px;}.ss-hero__dots{display:none;}}
`;