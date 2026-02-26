import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { motion, AnimatePresence } from "framer-motion";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./SpiritSection.css";

const MONTHS = ["All", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const EVENT_DATA = [
    {
        id: "shivjayanti",
        month: "February",
        name: "Shiv Jayanti",
        location: "Shivneri Fort",
        date: "February 19",
        duration: "1 day celebration",
        description: "Grand celebration at the birthplace of the great warrior king Chhatrapati Shivaji Maharaj.",
        culturalImportance: "Birth anniversary of the founder of Maratha Empire.",
        historicalSignificance: "Commemorates the legacy of Hindavi Swarajya and the ideals of a just ruler.",
        coords: [19.1989, 73.8617]
    },
    {
        id: "gudhipadwa",
        month: "March",
        name: "Gudhi Padwa",
        location: "Throughout Maharashtra",
        date: "March/April (Varies)",
        duration: "1 day celebration",
        description: "The Marathi New Year, celebrated with traditional fervor and hoisting of the Gudhi.",
        culturalImportance: "Symbol of victory and luck, commemorating the return of Rama to Ayodhya or Satavahana's victory.",
        historicalSignificance: "Significant as a day of new beginnings in Maratha history.",
        coords: [18.5204, 73.8567] // Centered at Pune
    },
    {
        id: "ganesh",
        month: "August",
        name: "Ganesh Chaturthi",
        location: "Pune / Mumbai",
        date: "August/September (Varies)",
        duration: "10 days",
        description: "Maharashtra's biggest festival, popularized by Lokmanya Tilak to unite people against colonial rule.",
        culturalImportance: "Devotional festival for Lord Ganesha, the elephant-headed deity of wisdom.",
        historicalSignificance: "The Peshwas were great devotees; traditionally celebrated at Shaniwar Wada.",
        coords: [18.5193, 73.8553] // Shaniwar Wada
    },
    {
        id: "dasara",
        month: "October",
        name: "Dasara (Vijayadashami)",
        location: "Various Forts",
        date: "October (Varies)",
        duration: "1 day",
        description: "Celebration of victory of good over evil. Historically, Maratha warriors performed Shastra Puja (weapon worship).",
        culturalImportance: "Exchange of Apta leaves (Sona), symbolic of gold and goodwill.",
        historicalSignificance: "The day Maratha armies would traditionally set out for military campaigns after the monsoon.",
        coords: [19.1989, 73.8617]
    },
    {
        id: "diwali",
        month: "November",
        name: "Diwali Fort Building",
        location: "Residential Areas",
        date: "October/November",
        duration: "5 days",
        description: "A unique tradition where children build miniature mud forts (killis) to honor Maharashtra's history.",
        culturalImportance: "Instilling historical awareness and craftsmanship in the younger generation.",
        historicalSignificance: "Focuses on the importance of hill forts in Swarajya.",
        coords: [19.0760, 72.8777] // Mumbai
    },
    {
        id: "junnaryatra",
        month: "April",
        name: "Junnar Yatra",
        location: "Junnar Town",
        date: "Local dates",
        duration: "3 days",
        description: "Local fair showcasing traditional Mawali wrestling, folk art, and regional commerce.",
        culturalImportance: "Preserving local Junnar traditions and communal harmony.",
        historicalSignificance: "Junnar was a prime trade hub since the Satavahana era.",
        coords: [19.2100, 73.8700]
    }
];

function ChangeView({ center }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, map.getZoom());
    }, [center, map]);
    return null;
}

const SpiritSection = () => {
    const [selectedMonth, setSelectedMonth] = useState("All");
    const [activeEvent, setActiveEvent] = useState(null);
    const [modalEvent, setModalEvent] = useState(null);
    const [mapCenter, setMapCenter] = useState([19.7515, 75.7139]); // Central Maharashtra

    const filteredEvents = selectedMonth === "All"
        ? EVENT_DATA
        : EVENT_DATA.filter(e => e.month === selectedMonth);

    const glowIcon = new L.DivIcon({
        className: 'glow-marker',
        html: `<div class="marker-pin"></div><div class="marker-glow"></div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
    });

    const activeGlowIcon = new L.DivIcon({
        className: 'glow-marker active',
        html: `<div class="marker-pin active"></div><div class="marker-glow active"></div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 20]
    });

    return (
        <section className="spirit-section">
            <div className="section-header">
                <h2 className="serif-title">Spirit of Swarajya</h2>
                <p className="section-subtitle">Experience living traditions and cultural celebrations throughout the year</p>
            </div>

            <div className="month-selector-wrapper">
                <div className="month-selector">
                    {MONTHS.map(m => (
                        <button
                            key={m}
                            className={`month-btn ${selectedMonth === m ? 'active' : ''}`}
                            onClick={() => setSelectedMonth(m)}
                        >
                            {m === "All" ? "All" : m}
                        </button>
                    ))}
                </div>
            </div>

            <div className="spirit-container">
                <div className="spirit-left">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedMonth}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="event-list"
                        >
                            {filteredEvents.length > 0 ? (
                                filteredEvents.map(event => (
                                    <motion.div
                                        key={event.id}
                                        className={`event-card ${activeEvent?.id === event.id ? 'active' : ''}`}
                                        onClick={() => {
                                            setActiveEvent(event);
                                            setMapCenter(event.coords);
                                        }}
                                    >
                                        <div className="event-month-badge">{event.month}</div>
                                        <h3>{event.name}</h3>
                                        <div className="event-meta">
                                            <span>📍 {event.location}</span>
                                            <span>📅 {event.date}</span>
                                            <span>⏱️ {event.duration}</span>
                                        </div>
                                        <p>{event.description}</p>
                                        <button className="expand-btn" onClick={() => setModalEvent(event)}>Learn More</button>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="no-events">No major events recorded for this month.</div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="spirit-right">
                    <div className="event-map-container">
                        <h3>Event Locations</h3>
                        <p className="map-desc">Across Maharashtra</p>
                        <div className="map-view">
                            <MapContainer center={mapCenter} zoom={7} style={{ height: "100%", width: "100%" }}>
                                <TileLayer
                                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                                />
                                {filteredEvents.map(event => (
                                    <Marker
                                        key={event.id}
                                        position={event.coords}
                                        icon={activeEvent?.id === event.id ? activeGlowIcon : glowIcon}
                                        eventHandlers={{
                                            click: () => setActiveEvent(event)
                                        }}
                                    >
                                        <Popup>{event.name}</Popup>
                                    </Marker>
                                ))}
                                <ChangeView center={mapCenter} />
                            </MapContainer>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detail Modal */}
            <AnimatePresence>
                {modalEvent && (
                    <div className="spirit-modal-overlay" onClick={() => setModalEvent(null)}>
                        <motion.div
                            className="spirit-modal"
                            onClick={e => e.stopPropagation()}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                        >
                            <button className="close-modal" onClick={() => setModalEvent(null)}>×</button>
                            <div className="modal-header">
                                <div className="modal-month">{modalEvent.month} • {modalEvent.date}</div>
                                <h2>{modalEvent.name}</h2>
                            </div>
                            <div className="modal-body">
                                <div className="modal-section">
                                    <h4>📍 Location</h4>
                                    <p>{modalEvent.location}</p>
                                </div>
                                <div className="modal-section">
                                    <h4>✨ Cultural Importance</h4>
                                    <p>{modalEvent.culturalImportance}</p>
                                </div>
                                <div className="modal-section">
                                    <h4>📜 Historical Significance</h4>
                                    <p>{modalEvent.historicalSignificance}</p>
                                </div>
                                <div className="modal-section">
                                    <h4>Description</h4>
                                    <p>{modalEvent.description}</p>
                                </div>
                                <button className="cta-btn">Visit During This Festival</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default SpiritSection;
