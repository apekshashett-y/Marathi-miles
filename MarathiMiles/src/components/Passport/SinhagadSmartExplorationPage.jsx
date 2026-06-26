import React, { useState, useEffect, Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { computeOptimalPath } from "../../utils/pathOptimizer";
import { computeAdaptiveOptimalPath } from "../../utils/adaptivePathOptimizer";
import { fortGraphs } from "../../data/fortGraphData";
import { SINHAGAD_MAP_BOUNDS } from "../../data/sinhagadLocations";
import { latLngToSVG, convertToMapPosition } from "../../utils/geoProjection";
import { initializeDatabase, getConfig, updateConfig } from "../../services/adaptiveDatabase";
import { trackLocationClick } from "../../utils/behaviorTracking";
import AdaptiveAnalytics from "./AdaptiveAnalytics";
import "./SmartExplorationPage.css";

// SVG coordinate space dimensions
const SVG_W = 1000;
const SVG_H = 800;

const STRATEGY_THEMES = {
    balanced: { color: '#ff9f43', label: 'balanced', icon: '⚡' },
    max_culture: { color: '#ffd700', label: 'max culture', icon: '🎨' },
    min_walking: { color: '#10b981', label: 'min walking', icon: '🌿' }
};

const SinhagadSmartExplorationPage = ({ onBack }) => {
    const navigate = useNavigate();
    const fortGraph = fortGraphs["sinhagad"];
    const fortName = fortGraph?.fortName || "Sinhagad Fort";

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
        { value: "30min", label: "30m", minutes: 30 },
        { value: "1hour", label: "1h", minutes: 60 },
        { value: "1.5hours", label: "1.5h", minutes: 90 },
        { value: "2hours", label: "2h", minutes: 120 },
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
        if (nodeId) {
            trackLocationClick("sinhagad", nodeId);
        }
    };

    const handleAlternativeClick = (alt) => {
        if (alt.disabled) return;
        handleComputePath({ strategy: alt.id });
    };

    const handleClose = () => {
        if (onBack) {
            onBack();
        } else {
            navigate('/', { state: { section: 'passport' } });
        }
    };

    // Compute walking time from the path
    const totalWalkTime = optimizedPlan?.path?.reduce((sum, stop) => sum + (stop.walkTime || 0), 0) || 0;

    return (
        <div className="smart-exploration-page">
            <div className="exploration-page-header">
                <div className="exploration-header-content">
                    <div className="exploration-header-left">
                        <span className="exploration-page-brand">⚔️ PastPort</span>
                        <h1 className="exploration-page-title">{fortName} Smart Map</h1>
                        <p className="exploration-page-subtitle">
                            {adaptiveMode ? 'AI-optimized using visitor patterns' : 'Illustrated fort layout with optimized route'}
                        </p>
                    </div>
                    <div className="exploration-header-controls">
                        {/* AI Confidence Badge */}
                        <span className="raigad-ai-badge">
                            AI Confidence: {optimizedPlan ? '72%' : '...'}
                        </span>

                        {/* Adaptive Mode Toggle */}
                        <button
                            className={`adaptive-toggle-btn ${adaptiveMode ? 'active' : ''}`}
                            onClick={toggleAdaptiveMode}
                            title={adaptiveMode ? 'Learning Active' : 'Learning Inactive'}
                        >
                            <span className="toggle-icon">{adaptiveMode ? '🧠' : '📊'}</span>
                            <span className="toggle-text">Learning Active</span>
                            <span className={`toggle-status ${adaptiveMode ? 'on' : 'off'}`}>
                                {adaptiveMode ? '🟢' : 'OFF'}
                            </span>
                        </button>

                        <button className="exploration-close-btn" onClick={handleClose}>
                            <span className="close-icon">←</span> Back to Options
                        </button>
                    </div>
                </div>
            </div>

            <div className="exploration-main-content">
                <div className="exploration-left-panel">
                    {/* TIME BUDGET */}
                    <div className="control-section">
                        <label className="control-label"><span className="label-icon">⏱️</span> TIME BUDGET: {timeOptions.find(t => t.value === timeAvailable)?.minutes}M</label>
                        <div className="time-selector-grid raigad-time-grid">
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

                    {/* PACE / ENERGY */}
                    <div className="control-section">
                        <label className="control-label"><span className="label-icon">💪</span> PACE / ENERGY</label>
                        <div className="energy-selector-list raigad-energy-list">
                            {energyOptions.map(option => (
                                <button
                                    key={option.value}
                                    className={`time-option-btn ${energyLevel === option.value ? 'selected' : ''}`}
                                    onClick={() => setEnergyLevel(option.value)}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* COMPUTE ROUTE */}
                    <button className="compute-path-btn raigad-compute-btn" onClick={() => handleComputePath({ strategy: 'balanced' })} disabled={isComputing}>
                        {isComputing ? <><span className="spinner"></span> Computing...</> : <><span className="compute-icon">🔮</span> Compute Route</>}
                    </button>

                    {/* MAP MODE */}
                    <div className="map-mode-toggle">
                        <div className="map-mode-label">
                            <span className="label-icon">🗺️</span> MAP MODE
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
                                disabled
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
                    <SinhagadFortMapVisualization
                        fortGraph={fortGraph}
                        optimizedPath={optimizedPlan?.path || []}
                        onNodeClick={handleNodeClick}
                    />
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
                            <div className="strategy-selector" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                                {Object.keys(STRATEGY_THEMES).map(key => (
                                    <button
                                        key={key}
                                        className={`option-btn ${activeStrategyId === key ? 'active' : ''}`}
                                        onClick={() => handleComputePath({ strategy: key })}
                                        style={{ 
                                            display: 'flex', 
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            background: activeStrategyId === key ? STRATEGY_THEMES[key].color : '#1a1a1a', 
                                            color: activeStrategyId === key ? '#000' : STRATEGY_THEMES[key].color,
                                            border: `1px solid ${activeStrategyId === key ? 'transparent' : '#333'}`,
                                            padding: '8px 12px',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            flex: 1,
                                            transition: 'all 0.2s',
                                            fontSize: '12px',
                                            fontWeight: activeStrategyId === key ? 'bold' : 'normal'
                                        }}
                                    >
                                        <span style={{ fontSize: '14px', marginBottom: '4px' }}>{STRATEGY_THEMES[key].icon}</span>
                                        {STRATEGY_THEMES[key].label}
                                    </button>
                                ))}
                            </div>

                            <div className="glass-panel metrics-card" style={{ background: '#1a1a1a', padding: '20px', borderRadius: '12px', marginBottom: '20px', border: '1px solid #333' }}>
                                <div className="circular-metrics" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <MetricCircle label="TIME" value={optimizedPlan.stats.totalTime} max={timeOptions.find(t => t.value === timeAvailable)?.minutes || 60} color={STRATEGY_THEMES[activeStrategyId].color} suffix="m" />
                                    <MetricCircle label="CULTURE" value={Math.round((optimizedPlan.path.reduce((sum, stop) => sum + stop.node.historicalImportance, 0) / optimizedPlan.path.length) * 5)} max={50} color={STRATEGY_THEMES[activeStrategyId].color} />
                                    <MetricCircle label="WALK" value={totalWalkTime} max={optimizedPlan.stats.totalTime} color={STRATEGY_THEMES[activeStrategyId].color} suffix="m" />
                                </div>
                            </div>

                            <button className="simulate-journ-btn" style={{ width: '100%', padding: '12px', background: '#10b981', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', marginBottom: '20px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                                ▶ Simulate Journey
                            </button>

                            <div className="glass-panel timeline" style={{ background: '#1a1a1a', padding: '20px', borderRadius: '12px', border: '1px solid #333' }}>
                                {optimizedPlan.path.map((stop, idx) => (
                                    <div key={`${stop.node.id}-${idx}`} className="timeline-item" style={{ display: 'flex', gap: '15px', position: 'relative', marginBottom: idx < optimizedPlan.path.length - 1 ? '20px' : '0' }}>
                                        <div className="timeline-marker" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <div className="marker-dot" style={{ width: '12px', height: '12px', borderRadius: '50%', border: `2px solid ${STRATEGY_THEMES[activeStrategyId].color}`, background: '#1a1a1a', zIndex: 2 }} />
                                            {idx < optimizedPlan.path.length - 1 && <div className="marker-line" style={{ width: '2px', flex: 1, background: '#333', marginTop: '4px', marginBottom: '-24px' }} />}
                                        </div>
                                        <div className="timeline-content" style={{ paddingBottom: '10px' }}>
                                            <h4 style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#fff' }}>{stop.node.name}</h4>
                                            <p style={{ margin: '0', fontSize: '12px', color: '#888' }}>Visit Duration: {stop.node.visitTime} min • {stop.node.historicalImportance} pts</p>
                                        </div>
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
                    <AdaptiveAnalytics fortId="sinhagad" fortGraph={fortGraph} />
                </div>
            )}
        </div>
    );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🦁 SINHAGAD ILLUSTRATED FORT MAP — Geo-projected SVG visualization
// All node positions derived from lat/lng via geoProjection utility.
// Dark theme with the same animation system as Shivneri & Raigad.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const SinhagadFortMapVisualization = ({ fortGraph, optimizedPath, onNodeClick }) => {
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

    // Convert all nodes from lat/lng to SVG coordinates using Sinhagad bounds
    const nodePositions = {};
    Object.values(nodes).forEach((node) => {
        const { x, y } = latLngToSVG(
            node.lat,
            node.lng,
            SINHAGAD_MAP_BOUNDS,
            SVG_W,
            SVG_H
        );
        nodePositions[node.id] = { x, y };
    });

    // Node icon map for Sinhagad
    const nodeIcons = {
        mainGate: '⛩️',
        kalyanDarwaza: '🏰',
        tanajiMemorial: '⚔️',
        kondhaneshwarTemple: '🛕',
        rajaramSamadhi: '🪔',
        devTake: '💧',
        zunjarBastion: '🏰',
        hawaPoint: '🌅',
        tilakBungalow: '🏠'
    };

    return (
        <svg viewBox="0 0 1000 800" className="fort-map-svg raigad-map-svg" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
            <defs>
                <filter id="sinhagad-shadow"><feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.3" /></filter>
                <filter id="sinhagad-card-shadow"><feDropShadow dx="0" dy="4" stdDeviation="12" floodOpacity="0.2" /></filter>
                <filter id="sinhagad-glow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                {/* Dark fort terrain gradient */}
                <radialGradient id="sinhagadTerrainGrad" cx="50%" cy="50%" r="60%">
                    <stop offset="0%" stopColor="#2a2a2a" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0.8" />
                </radialGradient>
                {/* Route line gradient */}
                <linearGradient id="sinhagadRouteGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ff6b35" />
                    <stop offset="100%" stopColor="#fbbf24" />
                </linearGradient>
            </defs>

            {/* Dark background */}
            <rect width={SVG_W} height={SVG_H} fill="#1a1a1a" rx="16" />

            {/* Fort boundary silhouette — dark theme, Sinhagad plateau shape */}
            <path
                d="M 120,700 Q 50,500 180,280 Q 350,80 680,120 Q 950,200 920,520 Q 850,780 500,740 Q 280,720 120,700 Z"
                fill="url(#sinhagadTerrainGrad)" stroke="#3a3a3a" strokeWidth="2" opacity="0.85"
            />

            {/* Subtle grid lines */}
            <line x1="0" y1={SVG_H / 2} x2={SVG_W} y2={SVG_H / 2} stroke="#333" strokeWidth="0.5" strokeDasharray="4,8" opacity="0.2" />
            <line x1={SVG_W / 2} y1="0" x2={SVG_W / 2} y2={SVG_H} stroke="#333" strokeWidth="0.5" strokeDasharray="4,8" opacity="0.2" />

            {/* ━━━ Edges ━━━ */}
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
                        {/* Background dashed line */}
                        <line
                            x1={fromPos.x} y1={fromPos.y}
                            x2={toPos.x} y2={toPos.y}
                            stroke="#444" strokeWidth="2" strokeDasharray="6,6" strokeLinecap="round"
                            opacity={isPart ? 0.2 : isFaded ? 0.1 : 0.4}
                        />
                        {/* Animated route line */}
                        {isPart && (
                            <line
                                className={`map-route-line ${isActive ? 'active-segment' : ''}`}
                                x1={fromPos.x} y1={fromPos.y}
                                x2={toPos.x} y2={toPos.y}
                                stroke={isActive ? "#fbbf24" : "#e08d55"}
                                strokeWidth={isActive || isConnectedToHover ? "6" : "4"}
                                strokeLinecap="round"
                                strokeDasharray={isActive ? "8,12" : len}
                                filter={isActive ? "url(#sinhagad-glow)" : "none"}
                                style={{
                                    strokeDashoffset: isFinished ? 0 : isActive ? 0 : len,
                                    opacity: (isFinished || isActive) ? (isFaded ? 0.3 : 1) : 0,
                                    transition: 'stroke-dashoffset 0.8s ease, opacity 0.3s ease'
                                }}
                            />
                        )}
                    </g>
                );
            })}

            {/* ━━━ Nodes ━━━ */}
            {Object.values(nodes).map((node) => {
                const pos = nodePositions[node.id];
                if (!pos) return null;

                const isInPath = pathNodeIds.has(node.id);
                const pathIdx = pathIndices.get(node.id);
                const isProjected = isInPath && animationStep < pathIdx;
                const isActivePulse = isInPath && animationStep === pathIdx;
                const isHovered = hoveredNodeId === node.id;
                const isGreyedOut = optimizedPath.length > 0 && !isInPath;

                let fillColor = "#666";
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
                            opacity: isProjected ? 0.4 : isGreyedOut ? 0.35 : (hoveredNodeId && !isHovered ? 0.6 : 1),
                            transition: 'opacity 0.3s ease',
                            cursor: 'pointer'
                        }}
                    >
                        {/* Glow ring for active pulse */}
                        {isActivePulse && (
                            <circle
                                cx={pos.x} cy={pos.y}
                                r="24"
                                fill="none" stroke="#fbbf24" strokeWidth="2"
                                opacity="0.5"
                            >
                                <animate attributeName="r" from="16" to="30" dur="1s" repeatCount="indefinite" />
                                <animate attributeName="opacity" from="0.6" to="0" dur="1s" repeatCount="indefinite" />
                            </circle>
                        )}
                        <circle
                            className={`map-node-circle ${isActivePulse ? 'pulse-active' : ''}`}
                            cx={pos.x} cy={pos.y}
                            r={isInPath ? "16" : "10"}
                            fill={fillColor} stroke="white" strokeWidth={isHovered ? "5" : "3"}
                            filter={isInPath ? "url(#sinhagad-shadow)" : "none"}
                        />
                        {/* Numbered marker for path nodes */}
                        {isInPath && (
                            <text x={pos.x} y={pos.y + 5} fontSize="12" fontWeight="700" fill="white" textAnchor="middle" style={{ pointerEvents: 'none' }}>
                                {pathIdx + 1}
                            </text>
                        )}
                        {/* Name label for non-path nodes */}
                        {!isInPath && (
                            <text x={pos.x} y={pos.y + 24} fontSize="11" fill="rgba(255,255,255,0.6)" textAnchor="middle" fontWeight="500">
                                {node.name}
                            </text>
                        )}

                        {/* ━━━ Hover Tooltip ━━━ */}
                        {isHovered && (
                            <g className="sinhagad-tooltip-group">
                                {(() => {
                                    const tooltipW = 230;
                                    const tooltipH = 105;
                                    let tx = pos.x + 25;
                                    let ty = pos.y - tooltipH / 2;
                                    // Boundary clamping
                                    if (tx + tooltipW > SVG_W - 10) tx = pos.x - tooltipW - 25;
                                    if (ty < 10) ty = 10;
                                    if (ty + tooltipH > SVG_H - 10) ty = SVG_H - tooltipH - 10;

                                    return (
                                        <>
                                            <rect x={tx} y={ty} width={tooltipW} height={tooltipH} rx="10" fill="#1e1e1e" stroke="#444" strokeWidth="1" opacity="0.95" />
                                            <text x={tx + 12} y={ty + 22} fontSize="13" fontWeight="700" fill="#fbbf24">
                                                {nodeIcons[node.id] || '📍'} {node.name}
                                            </text>
                                            <text x={tx + 12} y={ty + 40} fontSize="10" fill="rgba(255,255,255,0.7)">
                                                {node.description?.substring(0, 50)}...
                                            </text>
                                            <text x={tx + 12} y={ty + 58} fontSize="10" fill="rgba(255,255,255,0.5)">
                                                ⏱ {node.visitTime} min  ·  ★ Importance: {node.historicalImportance}/10
                                            </text>
                                            <rect x={tx + 12} y={ty + 72} width={190} height="4" fill="#333" rx="2" />
                                            <rect x={tx + 12} y={ty + 72} width={(node.historicalImportance / 10) * 190} height="4" fill="#e08d55" rx="2" />
                                            <rect x={tx + 12} y={ty + 84} width={190} height="4" fill="#333" rx="2" />
                                            <rect x={tx + 12} y={ty + 84} width={(Math.min(node.visitTime * 4, 100) / 100) * 190} height="4" fill="#666" rx="2" />
                                        </>
                                    );
                                })()}
                            </g>
                        )}
                    </g>
                );
            })}

            {/* ━━━ Info cards for path nodes (appear on animation reveal) ━━━ */}
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

                // Clamp to SVG bounds
                if (cardX < 10) cardX = 10;
                if (cardX + cardWidth > SVG_W - 10) cardX = SVG_W - cardWidth - 10;
                if (cardY < 10) cardY = 10;
                if (cardY + cardHeight > SVG_H - 10) cardY = SVG_H - cardHeight - 10;

                return (
                    <g
                        key={`card-${node.id}`}
                        className={`map-card-group ${showCard ? 'visible' : ''} ${isHovered ? 'hovered' : ''}`}
                        filter="url(#sinhagad-card-shadow)"
                        onMouseEnter={() => setHoveredNodeId(node.id)}
                        onMouseLeave={() => setHoveredNodeId(null)}
                    >
                        {/* Connector line */}
                        <line
                            x1={x} y1={y}
                            x2={cardPos === 'right' ? cardX : cardPos === 'left' ? cardX + cardWidth : x}
                            y2={cardPos === 'bottom' ? cardY : cardPos === 'top' ? cardY + cardHeight : y}
                            stroke="#e08d55" strokeWidth={isHovered ? "3" : "1.5"} strokeDasharray="4,4"
                            opacity={showCard ? 0.5 : 0} style={{ transition: 'all 0.3s ease' }}
                        />
                        {/* Card background */}
                        <rect x={cardX} y={cardY} width={cardWidth} height={cardHeight} rx="10"
                            fill="#1e1e1e" stroke={isHovered ? "#fbbf24" : "#3a3a3a"} strokeWidth={isHovered ? "2" : "1"}
                            style={{ transition: 'all 0.3s ease' }}
                        />
                        {/* Icon + Name */}
                        <text x={cardX + 12} y={cardY + 24} fontSize="14" fill="#e08d55">
                            {nodeIcons[node.id] || '📍'}
                        </text>
                        <text x={cardX + 35} y={cardY + 24} className="map-card-text-title" fontSize="12" fontWeight={isHovered ? "700" : "600"} fill="white">
                            {node.name}
                        </text>
                        {/* Stats */}
                        <text x={cardX + 35} y={cardY + 40} fontSize="10" fill="rgba(255,255,255,0.5)">
                            ⏱ {node.visitTime} min   ★ {node.historicalImportance}/10
                        </text>
                        {/* Importance bar */}
                        <rect x={cardX + 12} y={cardY + 55} width={150} height="4" fill="#333" rx="2" />
                        <rect x={cardX + 12} y={cardY + 55} width={(node.historicalImportance / 10) * 150} height="4" fill="#e08d55" rx="2" />
                        {/* Visit time bar */}
                        <rect x={cardX + 12} y={cardY + 68} width={150} height="4" fill="#333" rx="2" />
                        <rect x={cardX + 12} y={cardY + 68} width={(Math.min(node.visitTime * 4, 100) / 100) * 150} height="4" fill="#666" rx="2" />
                    </g>
                );
            })}

            {/* GIS Attribution */}
            <text x={SVG_W - 10} y={SVG_H - 8} fontSize="9" fill="#555" textAnchor="end" opacity="0.6">
                Geo-projected from real lat/lng • Sinhagad Fort
            </text>
        </svg>
    );
};

const MetricCircle = ({ value, max, label, color, suffix = '' }) => { 
    const r = 32; 
    const c = 2 * Math.PI * r; 
    const p = Math.min(Math.max(value / (max > 0 ? max : 100), 0), 1); 
    return (
        <div className="circle-stat" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80px' }}>
            <div style={{ position: 'relative', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="80" height="80" style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' }}>
                    <circle cx="40" cy="40" r={r} fill="none" stroke="#333" strokeWidth="4" />
                    <motion.circle 
                        cx="40" 
                        cy="40" 
                        r={r} 
                        fill="none" 
                        stroke={color} 
                        strokeWidth="4"
                        strokeLinecap="round"
                        style={{ strokeDasharray: c }} 
                        initial={{ strokeDashoffset: c }}
                        animate={{ strokeDashoffset: c - (p * c) }} 
                        transition={{ duration: 1 }} 
                    />
                </svg>
                <div style={{ position: 'relative', zIndex: 1, fontWeight: 'bold', fontSize: '18px', color: '#fff' }}>
                    {Math.round(value)}{suffix}
                </div>
            </div>
            <div style={{ marginTop: '8px', fontSize: '11px', fontWeight: 'bold', color: '#fff', letterSpacing: '1px' }}>
                {label}
            </div>
        </div>
    ); 
};

export default SinhagadSmartExplorationPage;
