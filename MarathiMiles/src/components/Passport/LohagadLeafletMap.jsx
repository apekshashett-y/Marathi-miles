/**
 * 🌍 PROFESSIONAL GIS MODE — Leaflet Map Component
 * Real-world map rendering of Lohagad Fort using OpenStreetMap tiles.
 * Uses real lat/lng from lohagadLocations.js — no pixel values.
 */

import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { lohagadLocations, LOHAGAD_CENTER } from "../../data/lohagadLocations";

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
 * Show moving marker during simulation, mimics illustrated map behavior
 */
function SimulationMarker({ optimizedPath, simState }) {
    const map = useMap();
    const markerRef = useRef(null);

    useEffect(() => {
        if (!map) return;

        const updateMarker = () => {
            if (!simState.isSimulating || !optimizedPath || optimizedPath.length === 0) {
                if (markerRef.current) {
                    map.removeLayer(markerRef.current);
                    markerRef.current = null;
                }
                return;
            }

            const idx = Math.min(simState.step, optimizedPath.length - 1);
            const stop = optimizedPath[idx];
            if (!stop) return; // safety
            let pos = null;
            if (stop.node && typeof stop.node.lat === 'number' && typeof stop.node.lng === 'number') {
                pos = [stop.node.lat, stop.node.lng];
            } else if (stop.node && stop.node.id) {
                const loc = lohagadLocations.find(l => l.id === stop.node.id);
                if (loc) pos = [loc.lat, loc.lng];
            }
            if (!pos) return;

            if (!markerRef.current) {
                markerRef.current = L.circleMarker(pos, {
                    radius: 8,
                    color: '#e08d55', // match route color
                    weight: 3,
                    fillColor: '#fff',
                    fillOpacity: 1
                }).addTo(map);
            } else {
                markerRef.current.setLatLng(pos);
            }
        };

        updateMarker();
    }, [simState, optimizedPath, map]);

    return null;
}

/**
 * Inner component to draw route polylines when a path is given.
 */
function RoutePolyline({ optimizedPath }) {
    const map = useMap();
    const polyRef = React.useRef(null);

    useEffect(() => {
        if (!optimizedPath || optimizedPath.length < 2 || !map) return;

        // ensure map is ready before drawing
        const draw = () => {
            // remove any existing line first
            if (polyRef.current) {
                map.removeLayer(polyRef.current);
                polyRef.current = null;
            }

            // build lat/lngs directly from the route data (routeEngine should supply them)
            const latlngs = optimizedPath
                .map((stop) => {
                    if (stop.node && typeof stop.node.lat === 'number' && typeof stop.node.lng === 'number') {
                        return [stop.node.lat, stop.node.lng];
                    }
                    // fallback lookup in case data is missing
                    const loc = lohagadLocations.find((l) => l.id === stop.node?.id);
                    return loc ? [loc.lat, loc.lng] : null;
                })
                .filter(Boolean);

            if (latlngs.length !== optimizedPath.length) {
                console.warn('RoutePolyline: some stops missing coordinates, result may be incomplete', {
                    expected: optimizedPath.length,
                    got: latlngs.length,
                    path: optimizedPath
                });
            }

            if (latlngs.length < 2) return; // nothing to draw

            // single polyline for the entire route
            const polyline = L.polyline(latlngs, {
                color: "#e08d55",
                weight: 6, /* slightly thicker for better visibility */
                opacity: 0.85,
                dashArray: "10, 8",
                lineCap: "round",
                lineJoin: "round",
            }).addTo(map);

            polyRef.current = polyline;

            // animate drawing if possible
            const totalLength = polyline.getElement()?.getTotalLength?.() || 0;
            if (totalLength > 0) {
                const el = polyline.getElement();
                el.style.strokeDasharray = totalLength;
                el.style.strokeDashoffset = totalLength;
                el.style.animation = "drawRoute 2s ease forwards";
            }
        };

        if (map.whenReady) {
            // Leaflet guarantees this callback runs after initialization
            map.whenReady(draw);
        } else {
            draw();
        }

        // when zooming/moving we need to adjust dash lengths so the stroke stays continuous
        const updateDash = () => {
            if (polyRef.current) {
                const totalLength = polyRef.current.getElement()?.getTotalLength?.() || 0;
                const el = polyRef.current.getElement();
                el.style.strokeDasharray = totalLength;
                el.style.strokeDashoffset = totalLength;
            }
        };
        map.on('zoomend', updateDash);
        map.on('moveend', updateDash);

        return () => {
            if (polyRef.current) {
                map.removeLayer(polyRef.current);
                polyRef.current = null;
            }
            map.off('zoomend', updateDash);
            map.off('moveend', updateDash);
        };
    }, [optimizedPath, map]);

    return null;
}

/**
 * Polyline showing progress up to current simulation step.
 */
function ProgressPolyline({ optimizedPath, simState }) {
    const map = useMap();
    const progressRef = useRef(null);

    useEffect(() => {
        if (!map || !optimizedPath || optimizedPath.length < 2) return;

        const coords = optimizedPath
            .map((stop) => {
                if (stop.node && typeof stop.node.lat === 'number' && typeof stop.node.lng === 'number') {
                    return [stop.node.lat, stop.node.lng];
                }
                const loc = lohagadLocations.find((l) => l.id === stop.node?.id);
                return loc ? [loc.lat, loc.lng] : null;
            })
            .filter(Boolean);

        const maxIdx = Math.min(simState.step, coords.length - 1);
        const segment = coords.slice(0, maxIdx + 1);
        if (segment.length < 2) {
            if (progressRef.current) {
                map.removeLayer(progressRef.current);
                progressRef.current = null;
            }
            return;
        }

        if (!progressRef.current) {
            progressRef.current = L.polyline(segment, {
                color: '#e08d55',
                weight: 6,
                opacity: 1,
                lineCap: 'round',
                lineJoin: 'round'
            }).addTo(map);
        } else {
            progressRef.current.setLatLngs(segment);
        }

        return () => {
            if (progressRef.current) {
                map.removeLayer(progressRef.current);
                progressRef.current = null;
            }
        };
    }, [optimizedPath, simState.step, map]);

    return null;
}



/**
 * Main Leaflet Map Component
 */
export default function LohagadLeafletMap({ optimizedPath = [], simState = {} }) {
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
        .lohagad-popup-title {
          font-size: 14px;
          font-weight: 700;
          color: #fbbf24;
          margin: 0 0 6px;
          font-family: 'Playfair Display', serif;
        }
        .lohagad-popup-desc {
          font-size: 12px;
          color: rgba(255,255,255,0.75);
          line-height: 1.4;
          margin: 0 0 8px;
        }
        .lohagad-popup-badges {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }
        .lohagad-popup-badge {
          background: rgba(255,255,255,0.1);
          padding: 3px 8px;
          border-radius: 20px;
          font-size: 11px;
          color: rgba(255,255,255,0.85);
        }
        .lohagad-popup-badge.route {
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
                center={[LOHAGAD_CENTER.lat, LOHAGAD_CENTER.lng]}
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
                {/* Highlight traveled portion during simulation */}
                <ProgressPolyline optimizedPath={optimizedPath} simState={simState} />
                {/* Simulation marker moves along route during simulation */}
                <SimulationMarker optimizedPath={optimizedPath} simState={simState} />

                {/* Location Markers */}
                {lohagadLocations.map((loc) => {
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
                                    <p className="lohagad-popup-title">
                                        {loc.icon} {loc.fullName}
                                    </p>
                                    <p className="lohagad-popup-desc">{loc.description}</p>
                                    <div className="lohagad-popup-badges">
                                        <span className="lohagad-popup-badge">
                                            ⏱ {loc.visitTime} min
                                        </span>
                                        <span className="lohagad-popup-badge">
                                            ★ {loc.importance}/10
                                        </span>
                                        {isInPath && (
                                            <span className="lohagad-popup-badge route">
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
