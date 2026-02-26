import React, { useState, useEffect, useRef, useCallback } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Polyline,
    useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./BazaarSection.css";

// ── Asset imports ─────────────────────────────────────────────────────────────
import shivajiIdol from "../../assets/bazaar/shivaji_idol.png";
import kolhapuriImg from "../../assets/bazaar/kolhapuri_chappals.png";
import warliImg from "../../assets/bazaar/warli_painting.png";
import honeyImg from "../../assets/bazaar/wild_honey.png";
import fortModelImg from "../../assets/bazaar/fort_miniature.png";

// ── Fix Leaflet default marker icons ──────────────────────────────────────────
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// ── Constants ─────────────────────────────────────────────────────────────────
const FORT_COORDS = { lat: 19.1923, lng: 73.8638 };
const MAP_CENTER = [19.2010, 73.8710]; // mid-point overview

// ── Market definitions ────────────────────────────────────────────────────────
const MARKETS = {
    shivneri_base: {
        id: "shivneri_base",
        name: "Shivneri Base Market",
        lat: 19.2006,
        lng: 73.8746,
    },
    junnar_weekly: {
        id: "junnar_weekly",
        name: "Junnar Weekly Bazaar",
        lat: 19.2095,
        lng: 73.8782,
    },
    junnar_main: {
        id: "junnar_main",
        name: "Junnar Main Market Road",
        lat: 19.2080,
        lng: 73.8755,
    },
};

// ── Build Google Maps DIRECTIONS URL (Fort → Market via lat/lng) ──────────────
function buildGMapsUrl(market) {
    return (
        `https://www.google.com/maps/dir/?api=1` +
        `&origin=${FORT_COORDS.lat},${FORT_COORDS.lng}` +
        `&destination=${market.lat},${market.lng}` +
        `&travelmode=driving`
    );
}

// ── Haversine distance in km ──────────────────────────────────────────────────
function haversineKm(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) ** 2;
    return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(2);
}

// ── Travel time estimate at 30 km/h ──────────────────────────────────────────
function travelMinutes(distKm) {
    return Math.ceil((parseFloat(distKm) / 30) * 60);
}

// ── Product data ──────────────────────────────────────────────────────────────
const PRODUCTS = [
    {
        id: "shivaji_idol",
        name: "Shivaji Maharaj Miniature Idol",
        category: "Fort Souvenirs",
        description:
            "Cast in traditional Panchdhatu (five-metal alloy) by Junnar artisans, this miniature idol depicts Chhatrapati Shivaji Maharaj in his Abhishek pose — the moment of royal coronation at Raigad Fort in 1674. Each piece is hand-engraved with intricate Maratha battle motifs and comes wrapped in saffron cloth, a colour sacred to the Swarajya legacy.",
        priceRange: "₹450 – ₹1,200",
        priceMin: 450, priceMax: 1200,
        nearestMarket: "shivneri_base",
        artisanInfo: "Made by Dnyaneshwar Kale, a 3rd-generation brass sculptor whose family has crafted temple idols in Junnar for over 70 years.",
        image: shivajiIdol,
    },
    {
        id: "kolhapuri_chappals",
        name: "Kolhapuri Chappals",
        category: "Traditional Items",
        description:
            "Handstitched from single-piece vegetable-tanned leather following the medieval Kolhapuri craft tradition, these sandals carry the hallmark of Maharashtrian artisan guilds. Each pair uses naturally dyed leather — free of synthetic chemicals — and is shaped directly on a wooden last, ensuring a fit that softens perfectly with wear. A registered GI (Geographical Indication) craft of Maharashtra.",
        priceRange: "₹600 – ₹1,800",
        priceMin: 600, priceMax: 1800,
        nearestMarket: "junnar_weekly",
        artisanInfo: "Sourced from Kolhapuri craft cooperatives represented at the Junnar Weekly Bazaar every Tuesday.",
        image: kolhapuriImg,
    },
    {
        id: "warli_painting",
        name: "Warli Art Painting",
        category: "Handicrafts",
        description:
            "Warli painting is among India's oldest surviving tribal art forms, practiced by the Warli tribe of the Sahyadri foothills since at least the 10th century CE. Using rice paste on handmade cloth, these paintings encode stories of harvests, marriages, and forest spirits through geometric symbols — circles for the sun, triangles for mountains, and spirals for the cyclical nature of life.",
        priceRange: "₹300 – ₹1,500",
        priceMin: 300, priceMax: 1500,
        nearestMarket: "junnar_main",
        artisanInfo: "Painted by the Warli Women's Self-Help Cooperative based in Ambivali village, 12 km from Shivneri Fort.",
        image: warliImg,
    },
    {
        id: "wild_honey",
        name: "Local Shivneri Wild Honey",
        category: "Local Food Products",
        description:
            "Harvested from rock-bee (Apis dorsata) colonies that nest in the Sahyadri limestone cliffs surrounding Shivneri Fort, this raw forest honey is entirely unprocessed. The bees forage on Karvi, Hirda, and wild turmeric blossoms unique to the Junnar hill ecosystem, giving the honey its distinctive amber colour and medicinal bitterness.",
        priceRange: "₹400 – ₹900",
        priceMin: 400, priceMax: 900,
        nearestMarket: "shivneri_base",
        artisanInfo: "Collected by Mangal Patil and her cooperative of 12 women honey-hunters from Narayangaon taluka.",
        image: honeyImg,
    },
    {
        id: "fort_miniature",
        name: "Shivneri Fort Miniature Model",
        category: "Fort Souvenirs",
        description:
            "Sculpted from reinforced red laterite clay — the same geological material as Shivneri's original bastions — this scale replica faithfully reproduces the fort's Maha Darwaja (main gateway), watch towers, water cisterns, and Shivaji's birth chamber. Each model is kiln-fired and hand-painted by architectural craftsmen from Junnar.",
        priceRange: "₹600 – ₹2,000",
        priceMin: 600, priceMax: 2000,
        nearestMarket: "shivneri_base",
        artisanInfo: "Crafted by Ravi Shinde, a self-taught architectural model maker who has been recreating Deccan forts for 15 years.",
        image: fortModelImg,
    },
];

// ── Budget items ──────────────────────────────────────────────────────────────
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

// ── Artisans ──────────────────────────────────────────────────────────────────
const ARTISANS = [
    {
        id: "savita",
        name: "Savita Jadhav",
        craft: "Warli Tribal Art",
        experience: 18,
        location: "Ambivali village, Junnar",
        description:
            "A founding member of the Warli Women's Self-Help Cooperative, Savita learned painting from her mother at age 9. Her works are displayed at the Tribal Research Institute, Pune. She uses only rice paste and charcoal on hand-woven cloth.",
        avatar: "🎨", color: "#c0392b",
    },
    {
        id: "dnyaneshwar",
        name: "Dnyaneshwar Kale",
        craft: "Brass & Panchdhatu Sculpting",
        experience: 35,
        location: "Junnar town, craft quarter",
        description:
            "Third-generation metal sculptor whose grandfather supplied temple idols to the Lenyadri Buddhist caves complex. Dnyaneshwar uses traditional lost-wax casting (cire perdue) to create Shivaji idols and Maratha warrior figurines.",
        avatar: "⚒️", color: "#d4a017",
    },
    {
        id: "mangal",
        name: "Mangal Patil",
        craft: "Wild Honey Harvesting & Bamboo Craft",
        experience: 22,
        location: "Narayangaon taluka, Junnar",
        description:
            "A certified forest honey harvester licensed by the Maharashtra Forest Department, Mangal leads 12 women who sustainably harvest rock-bee honey from the Sahyadri cliffs without disturbing the colony.",
        avatar: "🍯", color: "#2ecc71",
    },
];

const CATEGORIES = ["All", "Handicrafts", "Fort Souvenirs", "Local Food Products", "Traditional Items"];

// ── Custom Leaflet Icons ──────────────────────────────────────────────────────
const makeColorIcon = (color) =>
    new L.Icon({
        iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        shadowSize: [41, 41],
    });

const ICON_FORT = makeColorIcon("red");
const ICON_ACTIVE = makeColorIcon("orange");
const ICON_HOVER = makeColorIcon("gold");
const ICON_DEFAULT = makeColorIcon("grey");

// ── MapController: flyTo + route polyline ─────────────────────────────────────
function MapController({ activeMarket, showRoute, showAll }) {
    const map = useMap();

    useEffect(() => {
        if (showAll || (!activeMarket && !showRoute)) {
            map.flyTo(MAP_CENTER, 13, { duration: 1.0 });
        } else if (activeMarket) {
            // fly to midpoint between fort and market for a good view of the route
            const midLat = (FORT_COORDS.lat + activeMarket.lat) / 2;
            const midLng = (FORT_COORDS.lng + activeMarket.lng) / 2;
            map.flyTo([midLat, midLng], 14, { duration: 1.2 });
        }
    }, [activeMarket, showRoute, showAll, map]);

    return null;
}

// ── Google Maps button with "Opening…" tooltip ────────────────────────────────
function GMapsButton({ market, className = "detail-gmaps-btn" }) {
    const [tooltip, setTooltip] = useState(false);
    const timerRef = useRef(null);
    const url = buildGMapsUrl(market);

    const handleClick = (e) => {
        e.preventDefault();
        setTooltip(true);
        timerRef.current = setTimeout(() => {
            setTooltip(false);
            window.open(url, "_blank", "noopener,noreferrer");
        }, 1200);
    };

    useEffect(() => () => clearTimeout(timerRef.current), []);

    return (
        <div className="gmaps-btn-wrap">
            {tooltip && (
                <div className="gmaps-tooltip">
                    🗺️ Opening live navigation from Shivneri Fort…
                </div>
            )}
            <a
                href={url}
                className={className}
                onClick={handleClick}
                target="_blank"
                rel="noopener noreferrer"
            >
                Open in Google Maps →
            </a>
        </div>
    );
}

// ── BudgetPlanner ─────────────────────────────────────────────────────────────
function BudgetPlanner() {
    const [budget, setBudget] = useState(2000);
    const affordable = BUDGET_ITEMS.filter((i) => i.price <= budget).sort((a, b) => a.price - b.price);
    let total = 0;
    const selected = [];
    for (const item of affordable) {
        if (total + item.price <= budget) { selected.push(item); total += item.price; }
    }
    const remaining = budget - total;

    return (
        <div className="budget-planner">
            <div className="budget-planner-header">
                <span className="budget-icon">₹</span>
                <div>
                    <h3>Plan Your Souvenir Budget</h3>
                    <p>Slide to set your budget and get personalised shopping recommendations.</p>
                </div>
            </div>
            <div className="budget-slider-row">
                <label>Your Budget:</label>
                <span className="budget-value">₹{budget.toLocaleString("en-IN")}</span>
            </div>
            <input type="range" min={500} max={5000} step={50} value={budget}
                onChange={(e) => setBudget(Number(e.target.value))} className="budget-slider" />
            <div className="budget-range-labels"><span>₹500</span><span>₹5,000</span></div>
            <div className="budget-results">
                <h4 className="budget-results-title">Recommended Items ({selected.length})</h4>
                {selected.length === 0
                    ? <p className="no-items-msg">Increase budget to see recommendations.</p>
                    : <ul className="budget-item-list">
                        {selected.map((item, i) => (
                            <li key={i} className="budget-item-row">
                                <div>
                                    <span className="budget-item-name">{item.name}</span>
                                    <span className="budget-item-cat">{item.category}</span>
                                </div>
                                <span className="budget-item-price">₹{item.price}</span>
                            </li>
                        ))}
                    </ul>
                }
                <div className="budget-summary">
                    <div className="budget-summary-row"><span>Total:</span><span className="total-val">₹{total.toLocaleString("en-IN")}</span></div>
                    <div className="budget-summary-row"><span>Remaining:</span><span className="remaining-val">₹{remaining.toLocaleString("en-IN")}</span></div>
                </div>
                {remaining >= 0 && (
                    <div className="budget-tip">
                        🎉 You still have ₹{remaining.toLocaleString("en-IN")} left for small snacks or add-ons!
                    </div>
                )}
            </div>
        </div>
    );
}

// ── ProductCard ───────────────────────────────────────────────────────────────
function ProductCard({ product, isActive, isHovered, onClick, onMouseEnter, onMouseLeave }) {
    const market = MARKETS[product.nearestMarket];
    return (
        <div
            className={`bazaar-card ${isActive ? "bazaar-card--active" : ""} ${isHovered ? "bazaar-card--hovered" : ""}`}
            onClick={() => onClick(product)}
            onMouseEnter={() => onMouseEnter(product)}
            onMouseLeave={onMouseLeave}
        >
            <div className="bazaar-card-img-wrap">
                <img src={product.image} alt={product.name} className="bazaar-card-img" />
                <span className="price-badge">{product.priceRange}</span>
                {isActive && <div className="active-ring" />}
            </div>
            <div className="bazaar-card-body">
                <h3 className="bazaar-card-name">{product.name}</h3>
                <p className="bazaar-card-desc">{product.description.slice(0, 110)}…</p>
                <div className="bazaar-card-market">
                    <span className="market-pin">📍</span>
                    <span>{market.name}</span>
                </div>
                <div className="bazaar-card-tap-hint">
                    {isActive ? "Tap again to view full details →" : "Tap to highlight on map →"}
                </div>
            </div>
        </div>
    );
}

// ── ProductDetail modal ────────────────────────────────────────────────────────
function ProductDetail({ product, onClose }) {
    if (!product) return null;
    const market = MARKETS[product.nearestMarket];
    const distKm = haversineKm(FORT_COORDS.lat, FORT_COORDS.lng, market.lat, market.lng);
    const minutes = travelMinutes(distKm);

    return (
        <div className="product-detail-overlay" onClick={onClose}>
            <div className="product-detail-panel" onClick={(e) => e.stopPropagation()}>
                <button className="detail-close" onClick={onClose}>✕</button>
                <img src={product.image} alt={product.name} className="detail-img" />
                <div className="detail-body">
                    <span className="detail-category">{product.category}</span>
                    <h2 className="detail-name">{product.name}</h2>
                    <p className="detail-price">{product.priceRange}</p>
                    <p className="detail-desc">{product.description}</p>
                    <div className="detail-divider" />
                    <div className="detail-market-info">
                        <div className="detail-market-row"><span>🏪</span><strong>{market.name}</strong></div>
                        <div className="detail-market-row">
                            <span>📏</span>
                            <span>Distance from Fort: <strong>{distKm} km</strong></span>
                        </div>
                        <div className="detail-market-row">
                            <span>🚗</span>
                            <span>Est. Travel Time: <strong>~{minutes} mins</strong> at 30 km/h</span>
                        </div>
                        <GMapsButton market={market} className="detail-gmaps-btn" />
                    </div>
                    <div className="detail-divider" />
                    <div className="detail-artisan">
                        <span className="artisan-label">🧵 Artisan Note</span>
                        <p>{product.artisanInfo}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ── ArtisanCard ───────────────────────────────────────────────────────────────
function ArtisanCard({ artisan }) {
    return (
        <div className="artisan-card">
            <div className="artisan-avatar" style={{ background: artisan.color + "22", color: artisan.color }}>
                {artisan.avatar}
            </div>
            <div className="artisan-body">
                <h4 className="artisan-name">{artisan.name}</h4>
                <span className="artisan-craft">{artisan.craft}</span>
                <div className="artisan-meta">
                    <span>📌 {artisan.location}</span>
                    <span>⏳ {artisan.experience} years experience</span>
                </div>
                <p className="artisan-desc">{artisan.description}</p>
            </div>
        </div>
    );
}

// ── Main BazaarSection ────────────────────────────────────────────────────────
const BazaarSection = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [activeProduct, setActiveProduct] = useState(null);
    const [hoveredProduct, setHoveredProduct] = useState(null);
    const [detailProduct, setDetailProduct] = useState(null);
    const [mapCollapsed, setMapCollapsed] = useState(false);
    const [showRoute, setShowRoute] = useState(false);
    const [showAll, setShowAll] = useState(false);

    const activeMarket = activeProduct ? MARKETS[activeProduct.nearestMarket] : null;
    const hoveredMarket = hoveredProduct ? MARKETS[hoveredProduct.nearestMarket] : null;

    // polyline points: Fort → selected market
    const routePoints = activeMarket && showRoute
        ? [[FORT_COORDS.lat, FORT_COORDS.lng], [activeMarket.lat, activeMarket.lng]]
        : [];

    const filteredProducts =
        activeCategory === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === activeCategory);

    const handleCardClick = useCallback((product) => {
        if (activeProduct?.id === product.id) {
            setDetailProduct(product);   // second tap = detail modal
        } else {
            setActiveProduct(product);
            setShowRoute(true);          // auto-draw route on first tap
            setShowAll(false);
        }
    }, [activeProduct]);

    const handleClearRoute = () => {
        setActiveProduct(null);
        setShowRoute(false);
        setShowAll(false);
    };

    const handleViewAll = () => {
        setActiveProduct(null);
        setShowRoute(false);
        setShowAll(true);
    };

    // Popup distances
    const getMarketInfo = (market) => {
        const distKm = haversineKm(FORT_COORDS.lat, FORT_COORDS.lng, market.lat, market.lng);
        const minutes = travelMinutes(distKm);
        return { distKm, minutes };
    };

    return (
        <section className="bazaar-section" id="heritage-bazaar">

            {/* ── Header ── */}
            <div className="bazaar-header">
                <span className="bazaar-eyebrow">SHOP THE HERITAGE</span>
                <h2 className="bazaar-title">Shivneri Heritage Bazaar</h2>
                <p className="bazaar-subtitle">
                    Discover authentic local markets, handicrafts &amp; souvenirs near Shivneri Fort
                </p>
            </div>

            {/* ── Filters ── */}
            <div className="bazaar-filters">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        className={`filter-btn ${activeCategory === cat ? "filter-btn--active" : ""}`}
                        onClick={() => setActiveCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* ── Body: grid + map ── */}
            <div className="bazaar-body">

                {/* Product Grid */}
                <div className="bazaar-grid">
                    {filteredProducts.length === 0
                        ? <p className="no-products">No products in this category yet.</p>
                        : filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                isActive={activeProduct?.id === product.id}
                                isHovered={hoveredProduct?.id === product.id && activeProduct?.id !== product.id}
                                onClick={handleCardClick}
                                onMouseEnter={(p) => setHoveredProduct(p)}
                                onMouseLeave={() => setHoveredProduct(null)}
                            />
                        ))
                    }
                    <p className="tap-hint-global">Tap once to draw route on map · Tap again to view details</p>
                </div>

                {/* Map Sidebar */}
                <div className={`bazaar-map-sidebar ${mapCollapsed ? "map-collapsed" : ""}`}>
                    <button className="map-toggle-btn" onClick={() => setMapCollapsed((v) => !v)}>
                        {mapCollapsed ? "🗺️ Show Map" : "🗺️ Hide Map"}
                    </button>

                    {!mapCollapsed && (
                        <div className="bazaar-map-container">
                            <div className="bazaar-map-label">
                                <span>📍</span>
                                <span>Market Locations &amp; Routes</span>
                            </div>

                            {/* Active info chip */}
                            {activeMarket && (
                                <div className="active-market-chip">
                                    <div>
                                        <strong>{activeMarket.name}</strong>
                                        <span>{getMarketInfo(activeMarket).distKm} km · ~{getMarketInfo(activeMarket).minutes} min drive</span>
                                    </div>
                                    {showRoute && <span className="route-live-badge">Route Active</span>}
                                </div>
                            )}

                            {/* Leaflet Map */}
                            <MapContainer
                                center={MAP_CENTER}
                                zoom={13}
                                style={{ height: "400px", width: "100%" }}
                                scrollWheelZoom={false}
                                className="bazaar-leaflet-map"
                            >
                                <TileLayer
                                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
                                />

                                {/* Shivneri Fort marker */}
                                <Marker position={[FORT_COORDS.lat, FORT_COORDS.lng]} icon={ICON_FORT}>
                                    <Popup className="bazaar-popup">
                                        <div className="popup-inner">
                                            <strong>🏰 Shivneri Fort</strong>
                                            <span className="popup-dist">Origin of your journey</span>
                                        </div>
                                    </Popup>
                                </Marker>

                                {/* Market markers */}
                                {Object.values(MARKETS).map((market) => {
                                    const isActive = activeMarket?.id === market.id;
                                    const isHovered = hoveredMarket?.id === market.id && !isActive;
                                    const { distKm, minutes } = getMarketInfo(market);
                                    const icon = isActive ? ICON_ACTIVE : isHovered ? ICON_HOVER : ICON_DEFAULT;

                                    return (
                                        <Marker
                                            key={market.id}
                                            position={[market.lat, market.lng]}
                                            icon={icon}
                                            zIndexOffset={isActive ? 1000 : isHovered ? 500 : 0}
                                        >
                                            <Popup className="bazaar-popup">
                                                <div className="popup-inner">
                                                    <strong>{market.name}</strong>
                                                    <span className="popup-dist">📏 Distance from Fort: {distKm} km</span>
                                                    <span className="popup-dist">🚗 Est. Travel: ~{minutes} mins</span>
                                                    <GMapsButton market={market} className="popup-gmaps" />
                                                </div>
                                            </Popup>
                                        </Marker>
                                    );
                                })}

                                {/* Animated dashed polyline route */}
                                {routePoints.length === 2 && (
                                    <Polyline
                                        positions={routePoints}
                                        pathOptions={{
                                            color: "#c0622a",
                                            weight: 3,
                                            opacity: 0.85,
                                            dashArray: "10, 8",
                                            dashOffset: "0",
                                            lineCap: "round",
                                        }}
                                        className="route-polyline"
                                    />
                                )}

                                <MapController
                                    activeMarket={activeMarket}
                                    showRoute={showRoute}
                                    showAll={showAll}
                                />
                            </MapContainer>

                            {/* ── Action Panel ── */}
                            <div className="map-action-panel">
                                <button
                                    className={`map-action-btn ${showRoute && activeMarket ? "map-action-btn--active" : ""}`}
                                    onClick={() => {
                                        if (activeProduct) setShowRoute(true);
                                    }}
                                    disabled={!activeProduct}
                                    title={activeProduct ? "Draw route from Fort to selected market" : "Select a product first"}
                                >
                                    🗺️ Show Route
                                </button>
                                <button
                                    className="map-action-btn"
                                    onClick={handleClearRoute}
                                    disabled={!activeProduct && !showRoute}
                                    title="Clear route and reset map"
                                >
                                    ✕ Clear Route
                                </button>
                                <button
                                    className={`map-action-btn ${showAll ? "map-action-btn--active" : ""}`}
                                    onClick={handleViewAll}
                                    title="Zoom out to view all markets"
                                >
                                    👁️ View All Markets
                                </button>
                            </div>

                            {/* Legend */}
                            <div className="market-legend">
                                <div className="legend-item">
                                    <span className="legend-dot dot-red" />
                                    <span>Shivneri Fort (Origin)</span>
                                </div>
                                {Object.values(MARKETS).map((m) => (
                                    <div key={m.id} className={`legend-item ${activeMarket?.id === m.id ? "legend-item--active" : ""}`}>
                                        <span className={`legend-dot ${activeMarket?.id === m.id ? "dot-orange" : "dot-grey"}`} />
                                        <span>{m.name}</span>
                                    </div>
                                ))}
                                {showRoute && routePoints.length === 2 && (
                                    <div className="legend-item">
                                        <span className="legend-dash" />
                                        <span>Route (Fort → Market)</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ── Meet the Makers ── */}
            <div className="makers-section">
                <div className="makers-header">
                    <h3 className="makers-title">Meet the Makers</h3>
                    <p className="makers-subtitle">Supporting local artisans and their centuries-old traditions</p>
                </div>
                <div className="makers-grid">
                    {ARTISANS.map((a) => <ArtisanCard key={a.id} artisan={a} />)}
                </div>
            </div>

            {/* ── Budget Planner ── */}
            <BudgetPlanner />

            {/* ── Detail Modal ── */}
            {detailProduct && (
                <ProductDetail product={detailProduct} onClose={() => setDetailProduct(null)} />
            )}
        </section>
    );
};

export default BazaarSection;
