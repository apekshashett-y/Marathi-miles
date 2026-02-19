import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { computeOptimalPath } from "../../utils/pathOptimizer";
import { computeAdaptiveOptimalPath } from "../../utils/adaptivePathOptimizer";
import { fortGraphs } from "../../data/fortGraphData";
import { SHIVNERI_MAP_BOUNDS } from "../../data/shivneriLocations";
import { latLngToSVG, convertToMapPosition } from "../../utils/geoProjection";
import { initializeDatabase, getConfig, updateConfig } from "../../services/adaptiveDatabase";
import { trackLocationClick } from "../../utils/behaviorTracking";
import AdaptiveAnalytics from "./AdaptiveAnalytics";
import "./SmartExplorationPage.css";

// Lazy-load Leaflet component to avoid SSR issues & reduce initial bundle
const ShivneriLeafletMap = lazy(() => import("./ShivneriLeafletMap"));

// SVG coordinate space dimensions
const SVG_W = 1000;
const SVG_H = 800;

const SmartExplorationPage = () => {
    const { fortId } = useParams();
    const navigate = useNavigate();
    const activeFortId = fortId || "shivneri";
    const fortGraph = fortGraphs[activeFortId] || fortGraphs["shivneri"];
    const fortName = fortGraph?.fortName || "Shivneri Fort";

    const [timeAvailable, setTimeAvailable] = useState("1hour");
    const [energyLevel, setEnergyLevel] = useState("medium");
    const [optimizedPlan, setOptimizedPlan] = useState(null);
    const [isComputing, setIsComputing] = useState(false);
    const [activeStrategyId, setActiveStrategyId] = useState("balanced");
    const [adaptiveMode, setAdaptiveMode] = useState(true);
    const [showAnalytics, setShowAnalytics] = useState(false);

    // 🎨 Dual-mode: "illustrated" | "leaflet"
    const [mapMode, setMapMode] = useState("illustrated");

    const timeOptions = [
        { value: "30min", label: "30 minutes", minutes: 30 },
        { value: "1hour", label: "1 hour", minutes: 60 },
        { value: "2hours", label: "2 hours", minutes: 120 },
        { value: "3hours", label: "3+ hours", minutes: 180 },
    ];

    const energyOptions = [
        { value: "low", label: "Low", description: "Easy routes only" },
        { value: "medium", label: "Medium", description: "Moderate difficulty" },
        { value: "high", label: "High", description: "All routes accessible" },
    ];

    const handleComputePath = (overrides = {}) => {
        setIsComputing(true);
        const timeToUse = overrides.time || timeAvailable;
        const energyToUse = overrides.energy || energyLevel;
        const strategyToUse = overrides.strategy || activeStrategyId;
        const useAdaptive = overrides.adaptive !== undefined ? overrides.adaptive : adaptiveMode;

        setActiveStrategyId(strategyToUse);

        setTimeout(() => {
            const selectedTime = timeOptions.find(opt => opt.value === timeToUse);
            const computeFunction = useAdaptive ? computeAdaptiveOptimalPath : computeOptimalPath;
            const result = computeFunction(fortGraph, selectedTime.minutes, energyToUse, useAdaptive);

            const selectedPlan = result.allPlans?.find(p => p.id === strategyToUse) || result;
            const alts = result.allPlans?.filter(p => p.id !== selectedPlan.id) || [];

            setOptimizedPlan({
                ...selectedPlan,
                feasibleAlternatives: alts
            });
            setIsComputing(false);
        }, 800);
    };

    useEffect(() => {
        initializeDatabase();
        const config = getConfig();
        setAdaptiveMode(config.enabled);
        handleComputePath();
    }, []);

    useEffect(() => {
        if (optimizedPlan) {
            handleComputePath({ adaptive: adaptiveMode });
        }
    }, [adaptiveMode]);

    const toggleAdaptiveMode = () => {
        const newMode = !adaptiveMode;
        setAdaptiveMode(newMode);
        updateConfig({ enabled: newMode });
    };

    const handleNodeClick = (nodeId) => {
        if (activeFortId && nodeId) {
            trackLocationClick(activeFortId, nodeId);
        }
    };

    const handleAlternativeClick = (alt) => {
        if (alt.disabled) return;
        handleComputePath({ strategy: alt.id });
    };

    const handleClose = () => {
        navigate('/', { state: { section: 'passport' } });
    };

    return (
        <div className="smart-exploration-page">
            <div className="exploration-page-header">
                <div className="exploration-header-content">
                    <div className="exploration-header-left">
                        <span className="exploration-page-brand">⚔️ PastPort</span>
                        <h1 className="exploration-page-title">{fortName} – Smart Exploration Map</h1>
                        <p className="exploration-page-subtitle">
                            {adaptiveMode ? 'Optimized using visitor patterns' : 'Illustrated fort layout with optimized route'}
                        </p>
                    </div>
                    <div className="exploration-header-controls">
                        {/* Adaptive Mode Toggle */}
                        <button
                            className={`adaptive-toggle-btn ${adaptiveMode ? 'active' : ''}`}
                            onClick={toggleAdaptiveMode}
                            title={adaptiveMode ? 'Adaptive Mode ON' : 'Adaptive Mode OFF'}
                        >
                            <span className="toggle-icon">{adaptiveMode ? '🧠' : '📊'}</span>
                            <span className="toggle-text">Adaptive Mode</span>
                            <span className={`toggle-status ${adaptiveMode ? 'on' : 'off'}`}>
                                {adaptiveMode ? 'ON' : 'OFF'}
                            </span>
                        </button>

                        {/* Analytics Button */}
                        <button
                            className={`analytics-btn ${showAnalytics ? 'active' : ''}`}
                            onClick={() => setShowAnalytics(!showAnalytics)}
                            title="View Analytics"
                        >
                            <span className="btn-icon">📈</span>
                        </button>

                        <button className="exploration-close-btn" onClick={handleClose}>
                            <span className="close-icon">✕</span> Back to Fort
                        </button>
                    </div>
                </div>
            </div>

            <div className="exploration-main-content">
                <div className="exploration-left-panel">
                    <div className="control-section">
                        <label className="control-label"><span className="label-icon">⏱️</span> Time Available</label>
                        <div className="time-selector-grid">
                            {timeOptions.map(option => (
                                <button
                                    key={option.value}
                                    className={`time-option-btn ${timeAvailable === option.value ? 'selected' : ''}`}
                                    onClick={() => setTimeAvailable(option.value)}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="control-section">
                        <label className="control-label"><span className="label-icon">⚡</span> Energy Level</label>
                        <div className="energy-selector-list">
                            {energyOptions.map(option => (
                                <label key={option.value} className={`energy-option-label ${energyLevel === option.value ? 'selected' : ''}`}>
                                    <input
                                        type="radio"
                                        name="energy"
                                        value={option.value}
                                        checked={energyLevel === option.value}
                                        onChange={(e) => setEnergyLevel(e.target.value)}
                                        className="energy-radio"
                                    />
                                    <div className="energy-option-content">
                                        <span className="energy-option-name">{option.label}</span>
                                        <span className="energy-option-desc">{option.description}</span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    <button className="compute-path-btn" onClick={() => handleComputePath({ strategy: 'balanced' })} disabled={isComputing}>
                        {isComputing ? <><span className="spinner"></span> Computing...</> : <><span className="compute-icon">🎯</span> Compute Optimal Path</>}
                    </button>

                    {/* 🎯 Dual Mode Toggle */}
                    <div className="map-mode-toggle">
                        <div className="map-mode-label">
                            <span className="label-icon">🗺️</span> Map Mode
                        </div>
                        <div className="map-mode-buttons">
                            <button
                                className={`map-mode-btn ${mapMode === 'illustrated' ? 'active' : ''}`}
                                onClick={() => setMapMode('illustrated')}
                                title="Illustrated Fort View"
                            >
                                🎨 Illustrated
                            </button>
                            <button
                                className={`map-mode-btn ${mapMode === 'leaflet' ? 'active' : ''}`}
                                onClick={() => setMapMode('leaflet')}
                                title="Real Map (GIS Mode)"
                            >
                                🌍 Real Map
                            </button>
                        </div>
                        {mapMode === 'leaflet' && (
                            <p className="map-mode-note">
                                ✅ Professional GIS Mode — real OpenStreetMap tiles
                            </p>
                        )}
                    </div>
                </div>

                <div className="exploration-center-map">
                    {mapMode === 'illustrated' ? (
                        <FortMapVisualization
                            fortGraph={fortGraph}
                            optimizedPath={optimizedPlan?.path || []}
                            onNodeClick={handleNodeClick}
                        />
                    ) : (
                        <Suspense fallback={
                            <div className="leaflet-loading">
                                <div className="spinner"></div>
                                <p>Loading GIS Map…</p>
                            </div>
                        }>
                            <ShivneriLeafletMap optimizedPath={optimizedPlan?.path || []} />
                        </Suspense>
                    )}
                    {mapMode === 'illustrated' && (
                        <div className="map-legend">
                            <div className="legend-item"><div className="legend-marker legend-marker-start"></div><span>Start/Entrance</span></div>
                            <div className="legend-item"><div className="legend-marker legend-marker-high"></div><span>High Importance</span></div>
                            <div className="legend-item"><div className="legend-marker legend-marker-normal"></div><span>Other Locations</span></div>
                            <div className="legend-item"><div className="legend-line"></div><span>Optimized Route</span></div>
                        </div>
                    )}
                </div>

                <div className="exploration-right-panel">
                    {optimizedPlan ? (
                        <>
                            <div className="plan-header">
                                <h3 className="plan-title">Optimized Visit Plan</h3>
                                <div className="plan-stats">
                                    <div className="stat-item">
                                        <span className="stat-icon">⏱️</span>
                                        <div className="stat-content">
                                            <span className="stat-value">{optimizedPlan.stats.totalTime} min</span>
                                            <span className="stat-label">Total time</span>
                                        </div>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-icon">📍</span>
                                        <div className="stat-content">
                                            <span className="stat-value">{optimizedPlan.stats.locationsVisited}</span>
                                            <span className="stat-label">Spots covered</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="visit-sequence">
                                <h4 className="sequence-title">Visit Sequence</h4>
                                {optimizedPlan.path.map((stop, index) => (
                                    <div key={index} className="sequence-item">
                                        <div className="sequence-number">{index + 1}</div>
                                        <div className="sequence-content">
                                            <h5 className="sequence-location-name">{stop.node.name}</h5>
                                            <p className="sequence-location-desc">
                                                {index === 0
                                                    ? `Start your journey here. ${stop.node.description}`
                                                    : `Proceed from ${optimizedPlan.path[index - 1].node.name}. ${stop.node.description}`}
                                            </p>
                                            <div className="sequence-meta">
                                                <span className="meta-badge"><span className="meta-icon">⏱️</span>{stop.node.visitTime} min</span>
                                                <span className="meta-badge"><span className="meta-icon">⭐</span>{stop.node.historicalImportance}/10</span>
                                                {stop.walkTime && <span className="meta-badge meta-badge-walk">🚶 {stop.walkTime} min walk</span>}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="alternative-routes">
                                <h4 className="alternatives-title">Other Feasible Routes</h4>
                                {optimizedPlan.feasibleAlternatives.map((alt, index) => (
                                    <div
                                        key={index}
                                        className={`alternative-item ${alt.disabled ? 'disabled' : 'clickable'}`}
                                        onClick={() => handleAlternativeClick(alt)}
                                    >
                                        <div className="alternative-name">{alt.name}</div>
                                        <div className="alternative-desc">{alt.description}</div>
                                        <div className="alternative-meta">
                                            <span className="alternative-time">{alt.estimatedTime}</span>
                                            {alt.tradeoff && <span className="alternative-tradeoff">• {alt.tradeoff}</span>}
                                        </div>
                                        {alt.statusText && (
                                            <div className={`alternative-reason ${alt.disabled ? 'error' : 'warning'}`}>
                                                {alt.disabled ? '❌' : '⚠️'} {alt.statusText}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="plan-placeholder"><div className="placeholder-icon">🗺️</div><p>Generating your route...</p></div>
                    )}
                </div>
            </div>

            {/* Analytics Panel */}
            {showAnalytics && (
                <div className="analytics-panel-container">
                    <AdaptiveAnalytics fortId={activeFortId} fortGraph={fortGraph} />
                </div>
            )}
        </div>
    );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🎨 ILLUSTRATED FORT MAP — Geo-projected SVG visualization
// All node positions derived from lat/lng via geoProjection utility.
// Zero hardcoded pixel values.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const FortMapVisualization = ({ fortGraph, optimizedPath, onNodeClick }) => {
    if (!fortGraph) return null;
    const { nodes, edges } = fortGraph;
    const [animationStep, setAnimationStep] = useState(-1);
    const [hoveredNodeId, setHoveredNodeId] = useState(null);

    useEffect(() => {
        if (!optimizedPath || optimizedPath.length === 0) return;
        setAnimationStep(-1);
        const timer = setInterval(() => {
            setAnimationStep(prev => {
                if (prev >= optimizedPath.length) { clearInterval(timer); return prev; }
                return prev + 1;
            });
        }, 800);
        return () => clearInterval(timer);
    }, [optimizedPath]);

    const pathNodeIds = new Set(optimizedPath.map(stop => stop.node.id));
    const pathIndices = new Map(optimizedPath.map((stop, i) => [stop.node.id, i]));

    // PHASE 3 — Convert all nodes from lat/lng to SVG coordinates
    const nodePositions = {};
    Object.values(nodes).forEach((node) => {
        const { x, y } = latLngToSVG(
            node.lat,
            node.lng,
            SHIVNERI_MAP_BOUNDS,
            SVG_W,
            SVG_H
        );
        nodePositions[node.id] = { x, y };

        // PHASE 5 — Verification logging
        const { xPercent, yPercent } = convertToMapPosition(node.lat, node.lng, SHIVNERI_MAP_BOUNDS);
        console.log(`GeoPosition: ${node.name} → x: ${xPercent.toFixed(2)}%, y: ${yPercent.toFixed(2)}%`);
    });

    return (
        <svg viewBox="0 0 1000 800" className="fort-map-svg" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
            <defs>
                <filter id="shadow"><feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.15" /></filter>
                <filter id="card-shadow"><feDropShadow dx="0" dy="4" stdDeviation="12" floodOpacity="0.1" /></filter>
                {/* Fort terrain gradient */}
                <radialGradient id="terrainGrad" cx="50%" cy="50%" r="60%">
                    <stop offset="0%" stopColor="#d4c5a9" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#c4a882" stopOpacity="0.6" />
                </radialGradient>
            </defs>

            {/* Fort boundary silhouette - illustrative polygon scaled to SVG space */}
            <path
                d="M 150,680 Q 60,460 220,240 Q 430,100 700,160 Q 960,240 910,540 Q 820,800 460,760 Q 240,710 150,680 Z"
                fill="url(#terrainGrad)" stroke="#c4a882" strokeWidth="2.5" opacity="0.75"
            />

            {/* Coordinate grid lines (subtle) for geo-reference */}
            <line x1="0" y1={SVG_H / 2} x2={SVG_W} y2={SVG_H / 2} stroke="#c4b5a0" strokeWidth="0.5" strokeDasharray="4,8" opacity="0.3" />
            <line x1={SVG_W / 2} y1="0" x2={SVG_W / 2} y2={SVG_H} stroke="#c4b5a0" strokeWidth="0.5" strokeDasharray="4,8" opacity="0.3" />

            {/* Edges using geo-projected node positions */}
            {edges.map((edge, index) => {
                const fromPos = nodePositions[edge.from];
                const toPos = nodePositions[edge.to];
                if (!fromPos || !toPos) return null;

                const fromIdx = pathIndices.get(edge.from);
                const toIdx = pathIndices.get(edge.to);
                const isPart = typeof fromIdx === 'number' && typeof toIdx === 'number' && Math.abs(fromIdx - toIdx) === 1;

                let edgeSequenceIndex = -1;
                if (isPart) edgeSequenceIndex = Math.min(fromIdx, toIdx);

                const isActive = isPart && animationStep === edgeSequenceIndex;
                const isFinished = isPart && animationStep > edgeSequenceIndex;
                const dx = toPos.x - fromPos.x;
                const dy = toPos.y - fromPos.y;
                const len = Math.sqrt(dx * dx + dy * dy);

                const isConnectedToHover = hoveredNodeId && (edge.from === hoveredNodeId || edge.to === hoveredNodeId);
                const isFaded = hoveredNodeId && !isConnectedToHover;

                return (
                    <g key={index}>
                        <line
                            x1={fromPos.x} y1={fromPos.y}
                            x2={toPos.x} y2={toPos.y}
                            stroke="#c4b5a0" strokeWidth="3" strokeDasharray="6,6" strokeLinecap="round"
                            opacity={isPart ? 0.3 : isFaded ? 0.2 : 1}
                            className={isFaded ? 'faded' : ''}
                        />
                        {isPart && (
                            <line
                                className={`map-route-line ${isActive ? 'active-segment' : ''} ${isConnectedToHover ? 'highlight' : ''} ${isFaded ? 'faded' : ''}`}
                                x1={fromPos.x} y1={fromPos.y}
                                x2={toPos.x} y2={toPos.y}
                                stroke={isActive ? "#fbbf24" : "#e08d55"}
                                strokeWidth={isActive || isConnectedToHover ? "6" : "5"}
                                strokeLinecap="round"
                                strokeDasharray={isActive ? "8,12" : len}
                                style={{
                                    strokeDashoffset: isFinished ? 0 : isActive ? 0 : len,
                                    opacity: (isFinished || isActive) ? (isFaded ? 0.3 : 1) : 0
                                }}
                            />
                        )}
                    </g>
                );
            })}

            {/* Nodes using geo-projected positions */}
            {Object.values(nodes).map((node) => {
                const pos = nodePositions[node.id];
                if (!pos) return null;

                const isInPath = pathNodeIds.has(node.id);
                const pathIdx = pathIndices.get(node.id);
                const isProjected = isInPath && animationStep < pathIdx;
                const isActivePulse = isInPath && animationStep === pathIdx;
                const isHovered = hoveredNodeId === node.id;

                let fillColor = "#d4a574";
                let nodeType = "normal";
                if (node.id === "mainGate") { fillColor = "#86efac"; nodeType = "start"; }
                else if (isInPath) { fillColor = "#fdba74"; nodeType = "path"; }

                return (
                    <g
                        key={node.id}
                        className={`map-node-group ${isHovered ? 'hovered' : ''}`}
                        data-type={nodeType}
                        onMouseEnter={() => setHoveredNodeId(node.id)}
                        onMouseLeave={() => setHoveredNodeId(null)}
                        onClick={() => onNodeClick && onNodeClick(node.id)}
                        style={{
                            opacity: isProjected ? 0.4 : (hoveredNodeId && !isHovered ? 0.6 : 1),
                            transition: 'opacity 0.3s ease',
                            cursor: 'pointer'
                        }}
                    >
                        <circle
                            className={`map-node-circle ${isActivePulse ? 'pulse-active' : ''}`}
                            cx={pos.x} cy={pos.y}
                            r={isInPath ? "16" : "10"}
                            fill={fillColor} stroke="white" strokeWidth={isHovered ? "5" : "3"}
                        />
                        {isInPath && (
                            <text x={pos.x} y={pos.y + 5} fontSize="12" fontWeight="700" fill="white" textAnchor="middle" style={{ pointerEvents: 'none' }}>
                                {pathIdx + 1}
                            </text>
                        )}
                        {!isInPath && (
                            <text x={pos.x} y={pos.y + 22} fontSize="10" fill="#8b5a2b" textAnchor="middle" fontWeight="500">
                                {node.name}
                            </text>
                        )}
                    </g>
                );
            })}

            {/* Info cards for path nodes */}
            {optimizedPath.map((stop, index) => {
                const node = stop.node;
                const pos = nodePositions[node.id];
                if (!pos) return null;

                const { x, y } = pos;
                const cardPos = node.cardPosition || 'right';
                const isHovered = hoveredNodeId === node.id;
                const showCard = animationStep >= index || isHovered;

                const cardWidth = 180; const cardHeight = 90;
                let cardX = x, cardY = y; const offset = 30;
                if (cardPos === 'right') { cardX = x + offset; cardY = y - cardHeight / 2; }
                else if (cardPos === 'left') { cardX = x - cardWidth - offset; cardY = y - cardHeight / 2; }
                else if (cardPos === 'top') { cardX = x - cardWidth / 2; cardY = y - cardHeight - offset; }
                else if (cardPos === 'bottom') { cardX = x - cardWidth / 2; cardY = y + offset; }

                return (
                    <g
                        key={`card-${node.id}`}
                        className={`map-card-group ${showCard ? 'visible' : ''} ${isHovered ? 'hovered' : ''}`}
                        filter="url(#card-shadow)"
                        onMouseEnter={() => setHoveredNodeId(node.id)}
                        onMouseLeave={() => setHoveredNodeId(null)}
                    >
                        <line
                            x1={x} y1={y}
                            x2={cardPos === 'right' ? cardX : cardPos === 'left' ? cardX + cardWidth : x}
                            y2={cardPos === 'bottom' ? cardY : cardPos === 'top' ? cardY + cardHeight : y}
                            stroke="#d4a574" strokeWidth={isHovered ? "3" : "2"}
                            opacity={showCard ? 0.6 : 0} style={{ transition: 'all 0.3s ease' }}
                        />
                        <rect x={cardX} y={cardY} width={cardWidth} height={cardHeight} rx="12" fill="white" stroke={isHovered ? "#fbbf24" : "#e8d4b8"} strokeWidth={isHovered ? "2" : "1"} style={{ transition: 'all 0.3s ease' }} />
                        <text x={cardX + 15} y={cardY + 25} fontSize="14" fill="#d4a574">{node.id === 'mainGate' ? '⛩️' : node.id === 'viewpoint' ? '👁' : '📍'}</text>
                        <text x={cardX + 40} y={cardY + 25} className="map-card-text-title" fontSize="13" fontWeight={isHovered ? "700" : "600"} fill="#5c4033">{node.name}</text>
                        <text x={cardX + 40} y={cardY + 40} fontSize="11" fill="#9ca3af">⏱ {node.visitTime} min   ★ {node.historicalImportance}/10</text>
                        <rect x={cardX + 15} y={cardY + 62} width={140} height="4" fill="#f3f4f6" rx="2" />
                        <rect x={cardX + 15} y={cardY + 62} width={(node.historicalImportance / 10) * 140} height="4" fill="#d4a574" rx="2" />
                        <rect x={cardX + 15} y={cardY + 80} width={140} height="4" fill="#f3f4f6" rx="2" />
                        <rect x={cardX + 15} y={cardY + 80} width={(Math.min(node.visitTime * 4, 100) / 100) * 140} height="4" fill="#a8a29e" rx="2" />
                    </g>
                );
            })}

            {/* GIS Attribution */}
            <text x={SVG_W - 10} y={SVG_H - 8} fontSize="9" fill="#c4b5a0" textAnchor="end" opacity="0.6">
                Geo-projected from real lat/lng • Shivneri Fort
            </text>
        </svg>
    );
};

export default SmartExplorationPage;
