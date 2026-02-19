/**
 * 🌍 PROFESSIONAL GIS MODE — Leaflet Map Component
 * Real-world map rendering of Shivneri Fort using OpenStreetMap tiles.
 * Uses real lat/lng from shivneriLocations.js — no pixel values.
 */

import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { shivneriLocations, SHIVNERI_CENTER } from "../../data/shivneriLocations";

// Fix Leaflet's default icon broken by bundlers (Vite/Webpack)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

/**
 * Create a custom styled marker icon for each location.
 */
function createCustomIcon(importance, isHighlighted) {
    const color = isHighlighted
        ? "#fbbf24"
        : importance >= 9
            ? "#ef4444"
            : importance >= 7
                ? "#f97316"
                : "#8b5a2b";

    const size = importance >= 9 ? 36 : importance >= 7 ? 30 : 24;

    return L.divIcon({
        className: "",
        html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 4px 12px rgba(0,0,0,0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${size * 0.45}px;
        cursor: pointer;
        transition: transform 0.2s ease;
      ">
      </div>
    `,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
        popupAnchor: [0, -(size / 2) - 4],
    });
}

/**
 * Inner component to draw route polylines when a path is given.
 */
function RoutePolyline({ optimizedPath }) {
    const map = useMap();

    useEffect(() => {
        if (!optimizedPath || optimizedPath.length < 2) return;

        const latlngs = optimizedPath.map((stop) => {
            const loc = shivneriLocations.find((l) => l.id === stop.node.id);
            return loc ? [loc.lat, loc.lng] : null;
        }).filter(Boolean);

        if (latlngs.length < 2) return;

        const polyline = L.polyline(latlngs, {
            color: "#e08d55",
            weight: 5,
            opacity: 0.85,
            dashArray: "10, 8",
            lineCap: "round",
            lineJoin: "round",
        }).addTo(map);

        // Animate route drawing
        const totalLength = polyline.getElement()?.getTotalLength?.() || 0;
        if (totalLength > 0) {
            polyline.getElement().style.strokeDasharray = totalLength;
            polyline.getElement().style.strokeDashoffset = totalLength;
            polyline.getElement().style.animation = "drawRoute 2s ease forwards";
        }

        return () => {
            map.removeLayer(polyline);
        };
    }, [optimizedPath, map]);

    return null;
}

/**
 * Main Leaflet Map Component
 */
export default function ShivneriLeafletMap({ optimizedPath = [] }) {
    const pathNodeIds = new Set((optimizedPath || []).map((s) => s.node.id));
    const pathIndices = new Map((optimizedPath || []).map((s, i) => [s.node.id, i]));

    return (
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <style>{`
        .leaflet-popup-content-wrapper {
          background: #2c1810;
          border: 1px solid rgba(251,191,36,0.4);
          border-radius: 12px;
          color: white;
          box-shadow: 0 8px 24px rgba(0,0,0,0.5);
        }
        .leaflet-popup-tip {
          background: #2c1810;
        }
        .leaflet-popup-content {
          margin: 12px 16px;
          min-width: 180px;
        }
        .shivneri-popup-title {
          font-size: 14px;
          font-weight: 700;
          color: #fbbf24;
          margin: 0 0 6px;
          font-family: 'Playfair Display', serif;
        }
        .shivneri-popup-desc {
          font-size: 12px;
          color: rgba(255,255,255,0.75);
          line-height: 1.4;
          margin: 0 0 8px;
        }
        .shivneri-popup-badges {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }
        .shivneri-popup-badge {
          background: rgba(255,255,255,0.1);
          padding: 3px 8px;
          border-radius: 20px;
          font-size: 11px;
          color: rgba(255,255,255,0.85);
        }
        .shivneri-popup-badge.route {
          background: rgba(251,191,36,0.2);
          color: #fbbf24;
          border: 1px solid rgba(251,191,36,0.4);
        }
        .leaflet-control-attribution {
          background: rgba(0,0,0,0.6) !important;
          color: rgba(255,255,255,0.5) !important;
          font-size: 10px;
        }
        .leaflet-control-attribution a {
          color: rgba(255,255,255,0.7) !important;
        }
        @keyframes drawRoute {
          to { stroke-dashoffset: 0; }
        }
      `}</style>

            <MapContainer
                center={[SHIVNERI_CENTER.lat, SHIVNERI_CENTER.lng]}
                zoom={16}
                style={{ height: "100%", width: "100%" }}
                zoomControl={true}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Route Polyline */}
                <RoutePolyline optimizedPath={optimizedPath} />

                {/* Location Markers */}
                {shivneriLocations.map((loc) => {
                    const isInPath = pathNodeIds.has(loc.id);
                    const pathIdx = pathIndices.get(loc.id);

                    return (
                        <Marker
                            key={loc.id}
                            position={[loc.lat, loc.lng]}
                            icon={createCustomIcon(loc.importance, isInPath)}
                        >
                            <Popup>
                                <div>
                                    <p className="shivneri-popup-title">
                                        {loc.icon} {loc.fullName}
                                    </p>
                                    <p className="shivneri-popup-desc">{loc.description}</p>
                                    <div className="shivneri-popup-badges">
                                        <span className="shivneri-popup-badge">
                                            ⏱ {loc.visitTime} min
                                        </span>
                                        <span className="shivneri-popup-badge">
                                            ★ {loc.importance}/10
                                        </span>
                                        {isInPath && (
                                            <span className="shivneri-popup-badge route">
                                                #{pathIdx + 1} on route
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
        </div>
    );
}
