import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";
import "leaflet/dist/leaflet.css";
import "./SmartItineraryPlanner.css";

// ── Fix Leaflet default icons ─────────────────────────────────────────────────
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// ── Custom marker icons by stop type ─────────────────────────────────────────
const makeIcon = (color) =>
    new L.Icon({
        iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
        iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34],
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        shadowSize: [41, 41],
    });

const TYPE_ICON = {
    culture: makeIcon("red"),
    food: makeIcon("orange"),
    shopping: makeIcon("gold"),
    scenic: makeIcon("green"),
};

// ── Real base coordinates ─────────────────────────────────────────────────────
const FORT = { id: "rajgad_base", lat: 18.2465, lng: 73.6815 };

// ── Activity pool — sourced from real Rajgad locations ─────
const ACTIVITY_POOL = [
    // Culture / Fort
    {
        id: "padmavatiMachi",
        name: "Padmavati Machi",
        type: "culture", icon: "🏕️",
        lat: 18.2480, lng: 73.6820,
        durationFast: 20, durationLeisure: 40, durationPhoto: 45,
        costMin: 0,
        description: "The most expansive plateau of Rajgad, housing the Padmavati Temple, Rameshwar Temple, and a lake.",
        tags: ["Culture", "Historical"],
    },
    {
        id: "suvelaMachi",
        name: "Suvela Machi",
        type: "culture", icon: "🌅",
        lat: 18.2450, lng: 73.6850,
        durationFast: 25, durationLeisure: 45, durationPhoto: 60,
        costMin: 0,
        description: "The eastern machi featuring the famous Nedhe (a natural rock hole) and commanding views of the east.",
        tags: ["Culture", "Scenic"],
    },
    {
        id: "sanjeevaniMachi",
        name: "Sanjeevani Machi",
        type: "culture", icon: "🛡️",
        lat: 18.2440, lng: 73.6780,
        durationFast: 30, durationLeisure: 50, durationPhoto: 60,
        costMin: 0,
        description: "The western machi stretching over 2.5 km with intricate triple-layered fortification.",
        tags: ["Culture", "Architecture"],
    },
    {
        id: "baleKilla",
        name: "Bale Killa (Citadel)",
        type: "culture", icon: "⛰️",
        lat: 18.2465, lng: 73.6815,
        durationFast: 30, durationLeisure: 60, durationPhoto: 60,
        costMin: 0,
        description: "The highest and most difficult part of the fort. Offers stunning panoramic views of the Sahyadris.",
        tags: ["Culture", "Adventure"],
    },
    {
        id: "padmavatiTemple",
        name: "Padmavati Temple",
        type: "culture", icon: "🛕",
        lat: 18.2485, lng: 73.6825,
        durationFast: 10, durationLeisure: 20, durationPhoto: 25,
        costMin: 0,
        description: "The central shrine dedicated to Goddess Padmavati, often used by trekkers for overnight stay.",
        tags: ["Culture", "Spiritual"],
    },
    // Scenic
    {
        id: "nedhe",
        name: "Nedhe (Rock Hole)",
        type: "scenic", icon: "🕳️",
        lat: 18.2445, lng: 73.6860,
        durationFast: 15, durationLeisure: 30, durationPhoto: 40,
        costMin: 0,
        description: "A large natural opening in the rock on Suvela Machi. The wind howling through it is an experience.",
        tags: ["Scenic", "Nature"],
    },
    {
        id: "aluDarwaza",
        name: "Alu Darwaza",
        type: "scenic", icon: "⛩️",
        lat: 18.2435, lng: 73.6790,
        durationFast: 10, durationLeisure: 20, durationPhoto: 30,
        costMin: 0,
        description: "The gateway connecting Sanjeevani Machi and the route towards Torna Fort.",
        tags: ["Scenic", "Historical"],
    },
    {
        id: "chorDarwaza",
        name: "Chor Darwaza",
        type: "scenic", icon: "🚪",
        lat: 18.2475, lng: 73.6810,
        durationFast: 10, durationLeisure: 15, durationPhoto: 25,
        costMin: 0,
        description: "A secret, steep, and narrow entrance traditionally used for stealth and escape.",
        tags: ["Scenic", "Adventure"],
    },
    // Food / Shopping
    {
        id: "zunkaBhakarMachi",
        name: "Padmavati Machi Zunka Bhakar",
        type: "food", icon: "🥘",
        lat: 18.2482, lng: 73.6822,
        durationFast: 20, durationLeisure: 45, durationPhoto: 45,
        costMin: 100,
        description: "Enjoy hot, authentic Zunka Bhakar prepared by locals right on top of the fort.",
        tags: ["Food", "Local"],
    },
    {
        id: "gunjavaneBase",
        name: "Gunjavane Village Meal",
        type: "food", icon: "🍛",
        lat: 18.2550, lng: 73.6850,
        durationFast: 30, durationLeisure: 50, durationPhoto: 50,
        costMin: 120,
        description: "A hearty traditional Maharashtrian thali at the base village before or after the trek.",
        tags: ["Food", "Meal"],
    },
    {
        id: "limbuPaani",
        name: "Fresh Nimbu Paani",
        type: "food", icon: "🍋",
        lat: 18.2470, lng: 73.6830,
        durationFast: 10, durationLeisure: 15, durationPhoto: 15,
        costMin: 30,
        description: "Refreshing lemon water available at select spots to hydrate during the grueling climb.",
        tags: ["Food", "Refreshment"],
    }
];

// ── Pure helpers ──────────────────────────────────────────────────────────────
function haversineKm(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function travelMins(fromLat, fromLng, toLat, toLng, buffer) {
    return Math.ceil((haversineKm(fromLat, fromLng, toLat, toLng) / 30) * 60) + buffer;
}

// Format total minutes since midnight → "10:30 AM"
function fmtMin(totalMin) {
    const h = Math.floor(totalMin / 60) % 24;
    const m = totalMin % 60;
    const s = h < 12 ? "AM" : "PM";
    const dh = h === 0 ? 12 : h > 12 ? h - 12 : h;
    return `${dh}:${String(m).padStart(2, "0")} ${s}`;
}

// ── Config maps ───────────────────────────────────────────────────────────────
const MODE_KEY = { "⚡ Fast Explorer": "Fast", "🌿 Leisure Explorer": "Leisure", "📸 Photographer": "Photo" };
const MODE_BUFFER = { Fast: 3, Leisure: 8, Photo: 6 };
const TIME_POOL = { "1 Hour": 60, "2–3 Hours": 150, "Half Day": 360, "Full Day": 720 };
const FORT_ENTRY = 50; // ₹

// ── Itinerary generation algorithm ───────────────────────────────────────────
function generateItinerary({ fortTime, remaining, preferences, budget, mode, startTime }) {
    const modeKey = MODE_KEY[mode];
    const totalMins = TIME_POOL[remaining];
    const buffer = MODE_BUFFER[modeKey];
    const fortMins = fortTime === "1 Hour" ? 60 : fortTime === "2 Hours" ? 120 : 180;

    const [sh, sm] = startTime.split(":").map(Number);
    let curMin = sh * 60 + sm;        // current clock position (minutes since midnight)
    let minsLeft = totalMins;
    let spent = FORT_ENTRY;
    let fromLat = FORT.lat;
    let fromLng = FORT.lng;

    // Fort is always stop #1
    const stops = [{
        id: "fort_entry",
        name: "Rajgad Fort Entry",
        type: "culture", icon: "🏰",
        lat: FORT.lat, lng: FORT.lng,
        duration: fortMins, costMin: FORT_ENTRY,
        description: "Embark on the ultimate trek to explore the three grand machis and the formidable Bale Killa.",
        tags: ["Culture"],
        startMin: curMin, travelFromPrev: 0,
    }];

    curMin += fortMins;
    minsLeft -= fortMins;

    // Preference → tag map
    const tagMap = { Food: "Food", Shopping: "Shopping", Culture: "Culture", "Relax / Scenic": "Scenic" };
    const wantedTags = preferences.map((p) => tagMap[p] || p);

    // Candidate pool: filter by preference tags
    let pool = ACTIVITY_POOL.filter(
        (a) => a.id !== "fort_entry" && a.tags.some((t) => wantedTags.includes(t))
    );

    // Greedy nearest-first placement
    while (pool.length > 0 && minsLeft > 15) {
        // Sort remaining candidates by distance from current position
        pool.sort((a, b) =>
            haversineKm(fromLat, fromLng, a.lat, a.lng) - haversineKm(fromLat, fromLng, b.lat, b.lng)
        );

        let placed = false;
        for (const cand of pool) {
            const travel = travelMins(fromLat, fromLng, cand.lat, cand.lng, buffer);
            const actTime = cand[`duration${modeKey}`];
            const cost = cand.costMin;

            if (travel + actTime <= minsLeft && spent + cost <= budget) {
                const startMin = curMin + travel;
                stops.push({ ...cand, duration: actTime, costMin: cost, startMin, travelFromPrev: travel });
                curMin = startMin + actTime;
                minsLeft -= (travel + actTime);
                spent += cost;
                fromLat = cand.lat;
                fromLng = cand.lng;
                pool = pool.filter((x) => x.id !== cand.id);
                placed = true;
                break;
            }
        }
        if (!placed) break;
    }

    return { stops, totalSpent: spent, remaining: Math.max(0, budget - spent) };
}

// ── Personalized recommendation ───────────────────────────────────────────────
function buildMessage(mode, remaining, preferences, stops) {
    const hasFoodStop = stops.some((s) => s.type === "food");
    const hasShop = stops.some((s) => s.type === "shopping");
    const hasScenic = stops.some((s) => s.type === "scenic");
    const modeDesc = mode.includes("Fast") ? "efficiently packed"
        : mode.includes("Photo") ? "beautifully paced for photography"
            : "relaxed and unhurried";
    let parts = [];
    if (hasFoodStop) parts.push("an authentic taste of Rajgad's local heritage");
    if (hasShop) parts.push("time to bring home real artisan souvenirs");
    if (hasScenic) parts.push("moments to absorb the Sahyadri's timeless beauty");
    const desc = parts.join(", ") || "a rich cultural experience";
    return `Based on your ${remaining} window and ${preferences.join(" & ")} preferences, this ${modeDesc} itinerary gives you ${desc}. ${stops.length <= 3 ? "The schedule is intentionally light — quality over quantity." : "Every stop is within short travel distance, minimising road time and maximising experience."}`;
}

// ── Map auto-fit ──────────────────────────────────────────────────────────────
function MapFitBounds({ positions }) {
    const map = useMap();
    useEffect(() => {
        if (positions && positions.length > 1) {
            map.fitBounds(L.latLngBounds(positions), { padding: [40, 40], maxZoom: 15 });
        }
    }, [positions, map]);
    return null;
}

// ── Step Dot ──────────────────────────────────────────────────────────────────
function StepDot({ n, active, done }) {
    return (
        <div className={`itin-step-dot ${active ? "active" : done ? "done" : ""}`}>
            {done ? "✓" : n}
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// ── Main Component
// ─────────────────────────────────────────────────────────────────────────────
const RajgadSmartItineraryPlanner = () => {
    const [step, setStep] = useState(1);
    const [fortTime, setFortTime] = useState("2 Hours");
    const [remaining, setRemaining] = useState("2–3 Hours");
    const [preferences, setPreferences] = useState(["Food", "Shopping"]);
    const [budget, setBudget] = useState(1500);
    const [mode, setMode] = useState("🌿 Leisure Explorer");
    const [startTime, setStartTime] = useState("09:00");
    const [itinerary, setItinerary] = useState(null);
    const [isDownloading, setIsDownloading] = useState(false);

    const FORT_TIMES = ["1 Hour", "2 Hours", "3+ Hours"];
    const REMAININGS = ["1 Hour", "2–3 Hours", "Half Day", "Full Day"];
    const PREFS = ["Food", "Shopping", "Culture", "Relax / Scenic"];
    const MODES = ["⚡ Fast Explorer", "🌿 Leisure Explorer", "📸 Photographer"];

    const togglePref = (p) =>
        setPreferences((prev) => prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]);

    const handleGenerate = () => {
        if (!preferences.length) return;
        const result = generateItinerary({ fortTime, remaining, preferences, budget, mode, startTime });
        setItinerary(result);
        setStep(2);
    };

    const mapPositions = itinerary?.stops.map((s) => [s.lat, s.lng]);

    const totalRouteKm = itinerary
        ? itinerary.stops.reduce((acc, s, i) => {
            if (i === 0) return acc;
            const p = itinerary.stops[i - 1];
            return acc + haversineKm(p.lat, p.lng, s.lat, s.lng);
        }, 0).toFixed(1)
        : 0;

    const handleDownloadPdf = async () => {
        setIsDownloading(true);
        try {
            // 1. Capture the Leaflet map manually for the PDF
            const mapElement = document.querySelector('.itin-map-card .leaflet-container');
            let mapDataUrl = '';
            if (mapElement) {
                const canvas = await html2canvas(mapElement, {
                    useCORS: true,
                    allowTaint: false,
                    scale: 2
                });
                mapDataUrl = canvas.toDataURL('image/jpeg', 0.9);
            }

            // 2. Inject this image into the hidden PDF container temporarily
            const pdfMapImg = document.getElementById('pdf-static-map');
            if (pdfMapImg && mapDataUrl) {
                pdfMapImg.src = mapDataUrl;
                pdfMapImg.style.display = 'block';
            }

            // 3. Generate PDF
            const element = document.getElementById('pdf-export-content');
            const opt = {
                margin: [15, 15, 15, 15], // array margin: top, left, bottom, right
                filename: `Rajgad_Itinerary_${new Date().toISOString().split('T')[0]}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true, letterRendering: true },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
                pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
            };

            await html2pdf().set(opt).from(element).save();

            // hide the map again so it doesn't break next time if sizes change
            if (pdfMapImg) pdfMapImg.style.display = 'none';
        } catch (err) {
            console.error("PDF generation failed:", err);
        } finally {
            setIsDownloading(false);
        }
    };

    // ── Render ─────────────────────────────────────────────────────────────────
    return (
        <section className="itin-section" id="itinerary-planner">


            {/* Header */}
            <div className="itin-header">
                <span className="itin-eyebrow">SMART PLANNING</span>
                <h2 className="itin-title">Plan Your Rajgad Day</h2>
                <p className="itin-subtitle">
                    Tell us your time, budget &amp; mood — we'll craft a personalised itinerary using real local stops.
                </p>
            </div>

            {/* Progress */}
            <div className="itin-progress">
                <StepDot n={1} active={step === 1} done={step > 1} />
                <div className={`itin-progress-line ${step > 1 ? "done" : ""}`} />
                <StepDot n={2} active={step === 2} done={false} />
            </div>

            {/* ══════ STEP 1: Inputs ══════ */}
            {step === 1 && (
                <div className="itin-inputs-wrapper">

                    {/* Mode selector */}
                    <div className="itin-card">
                        <h3 className="itin-card-title">🚀 Choose Your Explorer Mode</h3>
                        <div className="itin-mode-row">
                            {MODES.map((m) => (
                                <button key={m} onClick={() => setMode(m)}
                                    className={`itin-mode-btn ${mode === m ? "active" : ""}`}>
                                    <span className="mode-label">{m}</span>
                                    <span className="mode-desc">
                                        {m.includes("Fast") ? "Efficient — more stops, less time each"
                                            : m.includes("Photo") ? "Extra time at each spot for photography"
                                                : "Relaxed — rich experience at every stop"}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="itin-inputs-grid">
                        {/* Fort time */}
                        <div className="itin-card">
                            <h3 className="itin-card-title">🏰 Time Spent at Fort</h3>
                            <div className="chip-row">
                                {FORT_TIMES.map((t) => (
                                    <button key={t} onClick={() => setFortTime(t)}
                                        className={`itin-chip ${fortTime === t ? "active" : ""}`}>{t}</button>
                                ))}
                            </div>
                        </div>

                        {/* Remaining time */}
                        <div className="itin-card">
                            <h3 className="itin-card-title">⏱️ Remaining Time After Fort</h3>
                            <div className="chip-row">
                                {REMAININGS.map((t) => (
                                    <button key={t} onClick={() => setRemaining(t)}
                                        className={`itin-chip ${remaining === t ? "active" : ""}`}>{t}</button>
                                ))}
                            </div>
                        </div>

                        {/* Experience */}
                        <div className="itin-card">
                            <h3 className="itin-card-title">🎯 Experience Preferences <span className="multi-hint">(pick any)</span></h3>
                            <div className="chip-row">
                                {PREFS.map((p) => (
                                    <button key={p} onClick={() => togglePref(p)}
                                        className={`itin-chip itin-chip--check ${preferences.includes(p) ? "active" : ""}`}>
                                        {preferences.includes(p) ? "✓ " : ""}{p}
                                    </button>
                                ))}
                            </div>
                            {preferences.length === 0 && <p className="pref-warn">⚠️ Pick at least one preference to continue.</p>}
                        </div>

                        {/* Start time */}
                        <div className="itin-card">
                            <h3 className="itin-card-title">🕘 Start Time (Leaving Fort)</h3>
                            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)}
                                className="itin-time-input" />
                            <p className="time-hint">The clock time when you leave Rajgad and begin the rest of your day.</p>
                        </div>
                    </div>

                    {/* Budget */}
                    <div className="itin-card itin-card--full">
                        <h3 className="itin-card-title">₹ Budget for the Rest of the Day</h3>
                        <div className="budget-row">
                            <span>Your Budget:</span>
                            <span className="budget-val">₹{budget.toLocaleString("en-IN")}</span>
                        </div>
                        <input type="range" min={500} max={5000} step={50} value={budget}
                            onChange={(e) => setBudget(Number(e.target.value))} className="itin-slider" />
                        <div className="slider-labels"><span>₹500</span><span>₹5,000</span></div>
                    </div>

                    <button
                        className={`itin-generate-btn ${preferences.length === 0 ? "itin-generate-btn--disabled" : ""}`}
                        onClick={handleGenerate}
                        disabled={preferences.length === 0}
                    >
                        ✨ Generate My Smart Itinerary
                    </button>
                </div>
            )}

            {/* ══════ STEP 2: Result ══════ */}
            {step === 2 && itinerary && (
                <div className="itin-result-wrapper">
                    <div className="itin-result-actions">
                        <button className="itin-back-btn" onClick={() => { setStep(1); setItinerary(null); }}>
                            ← Change Inputs
                        </button>
                        <button
                            className={`itin-download-btn ${isDownloading ? "downloading" : ""}`}
                            onClick={handleDownloadPdf}
                            disabled={isDownloading}
                        >
                            {isDownloading ? "⏳ Generating PDF..." : "📄 Download My Plan as PDF"}
                        </button>
                    </div>

                    <div className="itin-result-grid">

                        {/* ── Left: timeline ── */}
                        <div className="itin-timeline-col">
                            <div className="result-meta-bar">
                                <span className="result-mode-chip">{mode}</span>
                                <span className="result-stats">{itinerary.stops.length} stops · {totalRouteKm} km total route</span>
                            </div>

                            {/* Timeline */}
                            <div className="itin-timeline">
                                {itinerary.stops.map((stop, i) => (
                                    <div key={stop.id} className="tl-row">
                                        {i > 0 && (
                                            <div className="tl-travel">
                                                <span>🚗</span>
                                                <span>
                                                    {stop.travelFromPrev} min drive
                                                    ({haversineKm(itinerary.stops[i - 1].lat, itinerary.stops[i - 1].lng, stop.lat, stop.lng).toFixed(1)} km)
                                                </span>
                                            </div>
                                        )}
                                        <div className={`tl-stop tl-stop--${stop.type}`}>
                                            <div className="tl-time-col">
                                                <div className="tl-time">{fmtMin(stop.startMin)}</div>
                                                <div className="tl-dur">{stop.duration} min</div>
                                            </div>
                                            <div className="tl-icon-col">
                                                <div className={`tl-dot tl-dot--${stop.type}`}>{stop.icon}</div>
                                                {i < itinerary.stops.length - 1 && <div className="tl-connector" />}
                                            </div>
                                            <div className="tl-body">
                                                <h4 className="tl-name">{stop.name}</h4>
                                                <p className="tl-desc">{stop.description}</p>
                                                <div className="tl-badges">
                                                    {stop.costMin > 0
                                                        ? <span className="tl-cost">₹{stop.costMin}+</span>
                                                        : <span className="tl-cost tl-cost--free">Free</span>}
                                                    <span className={`tl-type tl-type--${stop.type}`}>{stop.type}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="tl-end">
                                    <span>🏁</span>
                                    <span>
                                        Day ends at {fmtMin(
                                            itinerary.stops.at(-1).startMin + itinerary.stops.at(-1).duration
                                        )}
                                    </span>
                                </div>
                            </div>

                            {/* Budget breakdown */}
                            <div className="itin-budget-box">
                                <h4>💰 Budget Breakdown</h4>
                                <div className="budget-lines">
                                    <div className="b-line">
                                        <span>Fort entry &amp; all stops (min)</span>
                                        <span>₹{itinerary.totalSpent.toLocaleString("en-IN")}</span>
                                    </div>
                                    <div className="b-line b-line--remaining">
                                        <span>Remaining balance</span>
                                        <span className="b-val-green">₹{itinerary.remaining.toLocaleString("en-IN")}</span>
                                    </div>
                                </div>
                                <div className="budget-msg">
                                    You will spend approximately <strong>₹{itinerary.totalSpent.toLocaleString("en-IN")}</strong>.&nbsp;
                                    You will have <strong>₹{itinerary.remaining.toLocaleString("en-IN")}</strong> remaining
                                    for chai, tips, or impulse buys!
                                </div>
                            </div>

                            {/* Smart recommendation */}
                            <div className="itin-rec">
                                <span className="rec-spark">✨</span>
                                <p>{buildMessage(mode, remaining, preferences, itinerary.stops)}</p>
                            </div>
                        </div>


                    </div>

                    {/* ── Hidden PDF Export Template ── */}
                    <div style={{ position: "absolute", left: "-9999px", top: "-9999px", width: "800px" }}>
                        <div id="pdf-export-content" className="pdf-doc">
                            {/* 1. Cover Section */}
                            <div className="pdf-cover">
                                <h1 className="pdf-title">Rajgad Smart Itinerary</h1>
                                <p className="pdf-subtitle">Personalized Day Plan by MarathiMiles</p>

                                <div className="pdf-meta-box">
                                    <div className="pdf-meta-item"><strong>Date:</strong> {new Date().toLocaleDateString()}</div>
                                    <div className="pdf-meta-item"><strong>Mode:</strong> {mode}</div>
                                    <div className="pdf-meta-item"><strong>Prefs:</strong> {preferences.join(", ")}</div>
                                    <div className="pdf-meta-item"><strong>Total Budget:</strong> ₹{(budget).toLocaleString("en-IN")}</div>
                                </div>
                            </div>

                            {/* 2. Timeline Section */}
                            <div className="pdf-section">
                                <h2 className="pdf-section-title">Timeline</h2>
                                <div className="pdf-timeline">
                                    {itinerary.stops.map((stop, i) => (
                                        <div key={stop.id} className="pdf-tl-item">
                                            <div className="pdf-tl-time">{fmtMin(stop.startMin)}</div>
                                            <div className="pdf-tl-content">
                                                <h3>{stop.name}</h3>
                                                <div className="pdf-tl-meta">
                                                    <span><strong>Category:</strong> {stop.type.charAt(0).toUpperCase() + stop.type.slice(1)}</span>
                                                    <span><strong>Duration:</strong> {stop.duration} min</span>
                                                    <span><strong>Est. Cost:</strong> {stop.costMin > 0 ? `₹${stop.costMin}+` : "Free"}</span>
                                                </div>
                                                <p className="pdf-tl-desc">{stop.description}</p>
                                                {i > 0 && <div className="pdf-tl-travel">🏎️ Travel buffer: {stop.travelFromPrev} min driving</div>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 3. Budget Summary */}
                            <div className="pdf-section html2pdf__page-break-inside-avoid">
                                <h2 className="pdf-section-title">Budget Summary</h2>
                                <div className="pdf-budget-grid">
                                    <div><strong>Total Planned Spend:</strong> ₹{itinerary.totalSpent.toLocaleString("en-IN")}</div>
                                    <div><strong>Remaining Budget:</strong> ₹{itinerary.remaining.toLocaleString("en-IN")}</div>
                                </div>
                            </div>

                            {/* 4. Route Summary */}
                            <div className="pdf-section html2pdf__page-break-inside-avoid">
                                <h2 className="pdf-section-title">Route Summary</h2>
                                <div className="pdf-route-grid">
                                    <div><strong>Total Stops:</strong> {itinerary.stops.length}</div>
                                    <div><strong>Total Distance:</strong> {totalRouteKm} km</div>
                                    <div><strong>Est. Travel Time:</strong> ~{Math.ceil(totalRouteKm / 30 * 60)} min</div>
                                </div>
                                <img id="pdf-static-map" src="" alt="Map Route" style={{ display: 'none', width: '100%', height: 'auto', marginTop: '15px', borderRadius: '8px', border: '1px solid #ccc' }} />
                            </div>

                            {/* 5. Personalized Note */}
                            <div className="pdf-footer">
                                <p>This itinerary balances history, taste, and culture within your selected time and budget.</p>
                                <p className="pdf-brand-note">PastPort Maharashtra • Preserving Heritage Through Storytelling</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default RajgadSmartItineraryPlanner;
