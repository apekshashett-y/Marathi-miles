import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { shivneriFortLocations, shivneriGraphEdges, shivneriFortMetadata } from '../../data/shivneriFortData.js';
import {
    optimizeRoute,
    generateAlternativeRoutes,
    addStopToRoute,
    rerouteFromNode
} from '../../engines/routeEngine.js';
import {
    initializeAdaptiveLearning,
    calculateAdaptiveBoosts,
} from '../../engines/adaptiveEngine.js';
import { getPredictionConfidence, trainModel } from '../../engines/behaviorPredictionEngine.js';
import { updateQValue } from '../../engines/reinforcementEngine.js';
import { interactionTracker } from '../../engines/interactionTracker.js';
import { SHIVNERI_CENTER } from '../../data/shivneriLocations.js';

// Lazy-load Leaflet map to avoid bundle bloat on first render
const ShivneriLeafletMap = lazy(() => import('./ShivneriLeafletMap'));

import './SmartExplorationV2.css';

const STRATEGY_THEMES = {
    balanced: { color: '#ff9f43', label: 'Balanced Mode', summary: 'Optimized for Overall Experience', icon: '⚡' },
    max_culture: { color: '#ffd700', label: 'Culture First', summary: 'High Value Focused Route', icon: '🎨' },
    min_walking: { color: '#10b981', label: 'Minimum Walk', summary: 'Low Effort Route (Shortest Path Priority)', icon: '🌿' }
};

const SmartExplorationV2 = () => {
    const navigate = useNavigate();

    // User Inputs
    const [timeAvailable, setTimeAvailable] = useState(60);
    const [energyLevel, setEnergyLevel] = useState('medium');
    const [adaptiveMode, setAdaptiveMode] = useState(true);

    // Engine State
    const [sessionWeights, setSessionWeights] = useState({ h: 0.4, s: 0.2, a: 0.2, e: 0.2 });
    const [visitedHistory, setVisitedHistory] = useState([]);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [lastLocationId, setLastLocationId] = useState('mahaDarwaja');
    const [predictionConfidence, setPredictionConfidence] = useState(0);
    const [interactionMode, setInteractionMode] = useState('normal'); // 'normal' | 'soft_include' | 'reroute'

    // System State
    const [isComputing, setIsComputing] = useState(false);
    const [optimizationResult, setOptimizationResult] = useState(null);
    const [alternatives, setAlternatives] = useState(null);
    const [selectedStrategy, setSelectedStrategy] = useState('balanced');
    const [showDebug, setShowDebug] = useState(false);
    const [rerouteBanner, setRerouteBanner] = useState(null);
    const [extensionModal, setExtensionModal] = useState(null);

    // Interactive Panel State
    const [selectedLocationId, setSelectedLocationId] = useState(null);
    const [forcedLocationId, setForcedLocationId] = useState(null);

    // Simulation State
    const [isSimulating, setIsSimulating] = useState(false);
    const [simStep, setSimStep] = useState(0);
    const [simPhase, setSimPhase] = useState('idle');
    const [simSpeed, setSimSpeed] = useState(1);

    // 🎯 Dual Map Mode: 'illustrated' | 'leaflet'
    const [mapMode, setMapMode] = useState('illustrated');

    useEffect(() => {
        initializeAdaptiveLearning();
        setPredictionConfidence(getPredictionConfidence());
    }, []);

    const estimateTravelTime = (fromId, toId) => {
        if (fromId === toId) return 0;
        const edge = shivneriGraphEdges.find(e =>
            (e.from === fromId && e.to === toId) || (e.to === fromId && e.from === toId)
        );
        return edge ? edge.walkingTime : 10;
    };

    const handleComputeRoute = (forceId = null, deviationStart = null, isReroute = false, callback = null, explicitStrategy = null) => {
        setIsComputing(true);
        if (isReroute) { setIsSimulating(false); setSimStep(0); }

        setTimeout(() => {
            // Use explicit strategy if provided, otherwise use current state
            const activeStrategy = explicitStrategy || selectedStrategy;

            console.log("🎯 UI: Selected Strategy:", activeStrategy);
            console.log("🎯 UI: Calling route engine with strategy:", activeStrategy);

            // Simplified context - no adaptive boosts
            const context = {
                timeAvailable: Math.max(15, timeAvailable - timeElapsed),
                energyLevel,
                entryPoint: deviationStart || lastLocationId,
                previousVisited: isReroute ? [] : [...visitedHistory],
                locations: shivneriFortLocations,
                edges: shivneriGraphEdges,
                strategy: activeStrategy
            };

            let result;
            if (isReroute) {
                result = rerouteFromNode(deviationStart, context);
                setInteractionMode('reroute');
            } else if (forceId) {
                result = addStopToRoute(forceId, context);
                setInteractionMode('soft_include');
            } else {
                result = optimizeRoute(shivneriFortLocations, shivneriGraphEdges, context);
                setInteractionMode('normal');
            }

            setOptimizationResult(result);

            if (isReroute) {
                setLastLocationId(deviationStart);
                setVisitedHistory([]);
                setTimeElapsed(0);
            }

            setIsComputing(false);
            if (callback) callback(result);
        }, 800);
    };

    const handleStrategyChange = (strategy) => {
        console.log("🔄 UI: Strategy changed to:", strategy);
        setSelectedStrategy(strategy);
        // Pass strategy explicitly to avoid stale state
        handleComputeRoute(forcedLocationId, null, false, null, strategy);
    };

    const handleAddToRoute = (id) => {
        console.log("Current Route before update:", currentRoute ? currentRoute.route : "None");
        console.log("Checking membership for target ID:", id);

        if (forcedLocationId === id) {
            setForcedLocationId(null);
            handleComputeRoute(null);
            return;
        }
        setForcedLocationId(id);
        trainModel(shivneriFortLocations[id], 'positive');

        handleComputeRoute(id, null, false, (result) => {
            console.log("Optimization finished. New Route:", result.route);
            const included = result.route.includes(id);
            if (!included) {
                setExtensionModal({ open: true, locationId: id });
            } else {
                setRerouteBanner({
                    message: `✔ Included ${shivneriFortLocations[id].name} (Soft Inclusion)`,
                    delta: { oldScore: 0, type: 'i' }
                });
                setTimeout(() => setRerouteBanner(null), 4000);
            }
        });
    };

    const handleConfirmExtension = () => {
        if (!extensionModal) return;
        const id = extensionModal.locationId;
        setTimeAvailable(prev => prev + 30);
        setExtensionModal(null);
        setTimeout(() => {
            handleComputeRoute(id);
            setRerouteBanner({ message: "Time extended! Recalculating...", delta: { oldScore: 0, type: 'i' } });
            setTimeout(() => setRerouteBanner(null), 4000);
        }, 100);
    };

    const handleRerouteFromLocation = (targetId) => {
        updateQValue(lastLocationId, targetId, timeAvailable, energyLevel, 1.0);
        handleComputeRoute(null, targetId, true);
        setSelectedLocationId(null);
        setRerouteBanner({
            message: `🔄 Route restarted from ${shivneriFortLocations[targetId].name}`,
            delta: { oldScore: 0, type: 'r' }
        });
        setTimeout(() => setRerouteBanner(null), 4000);
    };

    const handleSimulationComplete = () => {
        setIsSimulating(false);
        setSimStep(0);
    };

    useEffect(() => {
        if (!isSimulating || !optimizationResult) return;
        const routeIds = optimizationResult.route;
        if (simStep >= routeIds.length) { setSimPhase('finished'); handleSimulationComplete(); return; }
        const currentLocationId = routeIds[simStep];
        const nextLocationId = routeIds[simStep + 1];
        const location = shivneriFortLocations[currentLocationId];
        if (!location) { setIsSimulating(false); return; }
        const BASE_SCALE = 200;
        let timer;
        const runStep = async () => {
            setSimPhase('visiting');
            const visitDuration = (location.avgVisitTime * BASE_SCALE) / simSpeed;
            timer = setTimeout(() => {
                if (nextLocationId) {
                    setSimPhase('walking');
                    const walkTime = estimateTravelTime(currentLocationId, nextLocationId);
                    const walkDuration = (walkTime * BASE_SCALE) / simSpeed;
                    timer = setTimeout(() => { setSimStep(prev => prev + 1); }, walkDuration);
                } else {
                    setSimPhase('finished'); handleSimulationComplete();
                }
            }, visitDuration);
        };
        runStep();
        return () => clearTimeout(timer);
    }, [isSimulating, simStep, simSpeed, optimizationResult]);

    const currentRoute = optimizationResult;
    const theme = STRATEGY_THEMES[selectedStrategy] || STRATEGY_THEMES['balanced'];

    const handleSimulateJourney = () => { setSimStep(0); setSimPhase('idle'); setIsSimulating(true); setSelectedLocationId(null); };

    const handleLocationClick = (id) => {
        if (!shivneriFortLocations[id]) return;
        interactionTracker.recordClick(id);
        setSelectedLocationId(id);
    };

    return (
        <div className={`smart-exploration-v2 theme-${selectedStrategy}`}>
            <header className="exploration-header">
                <div className="header-left">
                    <span className="brand">⚔️ PastPort</span>
                    <h1>{shivneriFortMetadata.fortName} Smart Map</h1>
                    <span style={{ fontSize: '10px', color: '#10b981', marginLeft: '10px', background: 'rgba(16,185,129,0.1)', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(16,185,129,0.2)' }}>
                        AI Confidence: {predictionConfidence}%
                    </span>
                </div>
                <div className="header-controls">
                    <motion.button
                        className={`adaptive-badge ${adaptiveMode ? 'active' : ''}`}
                        onClick={() => setAdaptiveMode(!adaptiveMode)}
                        whileHover={{ scale: 1.05 }}
                    >
                        <span className="brain-icon">{adaptiveMode ? '🧠' : '📊'}</span>
                        <span className="text">Learning Active</span>
                        {adaptiveMode && <div className="learning-dot" />}
                    </motion.button>
                    <motion.button className="option-btn" onClick={() => navigate('/')}>✕</motion.button>
                </div>
            </header>

            <AnimatePresence>
                {rerouteBanner && (
                    <motion.div className="reroute-banner" initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -50, opacity: 0 }}>
                        <span>{rerouteBanner.message}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {extensionModal && (
                    <div className="modal-backdrop">
                        <motion.div className="modal-content" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                            <h3>Time Limit Exceeded</h3>
                            <p>Adding <strong>{shivneriFortLocations[extensionModal.locationId]?.name}</strong> exceeds your remaining time budget.</p>
                            <div className="modal-actions">
                                <button className="btn-primary" onClick={handleConfirmExtension}>Extend (+30m) & Add</button>
                                <button className="btn-secondary" onClick={() => { setExtensionModal(null); setForcedLocationId(null); }}>Cancel</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <main className="exploration-main">
                <aside className="glass-panel left-panel">
                    <div className="control-group">
                        <label>⏱️ Time Budget: {timeAvailable}m</label>
                        <div className="time-options">{[30, 60, 90, 120].map(t => (<button key={t} className={`option-btn ${timeAvailable >= t && timeAvailable < t + 30 ? 'active' : ''}`} onClick={() => setTimeAvailable(t)}>{t < 60 ? `${t}m` : `${t / 60}h`}</button>))}</div>
                    </div>
                    <div className="control-group">
                        <label>💪 Pace / Energy</label>
                        <div className="energy-options">{['low', 'medium', 'high'].map(e => (<button key={e} className={`option-btn ${energyLevel === e ? 'active' : ''}`} onClick={() => setEnergyLevel(e)}>{e.charAt(0).toUpperCase() + e.slice(1)}</button>))}</div>
                    </div>

                    <motion.button className="compute-btn" onClick={() => handleComputeRoute(forcedLocationId)} whileHover={{ scale: 1.02 }}>{isComputing ? 'Computing...' : '🔮 Compute Route'}</motion.button>

                    {/* 🎯 Dual Map Mode Toggle */}
                    <div className="v2-map-mode-toggle">
                        <div className="v2-map-mode-label">🗺️ Map Mode</div>
                        <div className="v2-map-mode-btns">
                            <button
                                className={`v2-mode-btn ${mapMode === 'illustrated' ? 'active' : ''}`}
                                onClick={() => setMapMode('illustrated')}
                                title="Illustrated Fort View"
                            >
                                🎨 Illustrated
                            </button>
                            <button
                                className={`v2-mode-btn ${mapMode === 'leaflet' ? 'active' : ''}`}
                                onClick={() => setMapMode('leaflet')}
                                title="Real GIS Map"
                            >
                                🌍 Real Map
                            </button>
                        </div>
                        {mapMode === 'leaflet' && (
                            <p className="v2-mode-note">✅ Professional GIS — OpenStreetMap</p>
                        )}
                    </div>
                </aside>

                <section className="center-panel">
                    {mapMode === 'illustrated' ? (
                        <RouteVisualization
                            locations={shivneriFortLocations}
                            route={currentRoute}
                            isComputing={isComputing}
                            theme={theme}
                            selectedId={selectedLocationId}
                            simState={{ isSimulating, simStep, simPhase, simSpeed }}
                            onLocationClick={handleLocationClick}
                            interactionMode={interactionMode}
                            startNodeId={lastLocationId}
                        />
                    ) : (
                        <div className="v2-leaflet-wrapper">
                            <Suspense fallback={
                                <div className="v2-leaflet-loading">
                                    <div className="v2-loading-spinner" />
                                    <p>Loading GIS Map…</p>
                                </div>
                            }>
                                <ShivneriLeafletMap
                                    optimizedPath={currentRoute ? currentRoute.route.map(id => ({ node: { ...shivneriFortLocations[id], id } })) : []}
                                />
                            </Suspense>
                        </div>
                    )}
                    <AnimatePresence>{mapMode === 'illustrated' && isSimulating && currentRoute && (<SimulationOverlay phase={simPhase} step={simStep} route={currentRoute} locations={shivneriFortLocations} speed={simSpeed} setSpeed={setSimSpeed} setStep={setSimStep} stop={() => setIsSimulating(false)} />)}</AnimatePresence>
                    <AnimatePresence>{isComputing && <LoadingOverlay />}</AnimatePresence>
                </section>

                <aside className="right-panel">
                    {currentRoute ? (
                        <>
                            <div className="strategy-selector">{Object.keys(STRATEGY_THEMES).map(key => (<motion.button key={key} className={`option-btn ${selectedStrategy === key ? 'active' : ''}`} onClick={() => handleStrategyChange(key)}><span style={{ marginRight: '5px' }}>{STRATEGY_THEMES[key].icon}</span> {key.replace('_', ' ')}</motion.button>))}</div>
                            <div className="glass-panel metrics-card">
                                <div className="circular-metrics">
                                    <MetricCircle label="Time" value={currentRoute.metrics.totalTime} max={timeAvailable} color={theme.color} suffix="m" />
                                    <MetricCircle label="Culture" value={currentRoute.metrics.culturalScore} max={50} color={theme.color} />
                                    <MetricCircle label="Walk" value={currentRoute.metrics.walkTime} max={currentRoute.metrics.totalTime} color="#a0a0a0" suffix="m" />
                                </div>
                            </div>
                            {!isSimulating && <motion.button className="simulate-journ-btn" onClick={handleSimulateJourney} whileHover={{ scale: 1.02 }}>▶ Simulate Journey</motion.button>}
                            <div className="glass-panel timeline">
                                {currentRoute.route.map((id, idx) => {
                                    const loc = shivneriFortLocations[id];
                                    const isCurrent = isSimulating && simStep === idx;
                                    const isPast = (isSimulating && simStep > idx) || (visitedHistory.includes(id) && !isSimulating);
                                    return (
                                        <motion.div key={`${id}-${idx}`} className={`timeline-item ${isCurrent ? 'highlight' : ''} ${isPast ? 'dimmed' : ''}`} initial={{ opacity: 0, x: -10 }} animate={{ opacity: isPast ? 0.5 : 1, x: 0, scale: isCurrent ? 1.05 : 1 }}>
                                            <div className="timeline-marker"><div className={`marker-dot ${isCurrent ? 'pulse' : ''}`} style={{ borderColor: theme.color, background: isCurrent ? theme.color : '#000' }} />{idx < currentRoute.route.length - 1 && <div className="marker-line" />}</div>
                                            <div className="timeline-content"><h4>{loc.name}</h4><p>Visit Duration: {loc.avgVisitTime} min • {loc.historicalScore} pts</p></div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </>
                    ) : (
                        <div className="empty-state"><h3 style={{ color: '#fff' }}>Plan Your Adventure</h3><p>Select your time and energy preferences to generate a personalized route.</p></div>
                    )}
                </aside>
            </main>

            <AnimatePresence>
                {selectedLocationId && (
                    <LocationIntelligencePanel
                        locationId={selectedLocationId}
                        route={currentRoute}
                        isForced={forcedLocationId === selectedLocationId}
                        weights={sessionWeights}
                        onClose={() => setSelectedLocationId(null)}
                        onAddToRoute={() => handleAddToRoute(selectedLocationId)}
                        onReroute={() => handleRerouteFromLocation(selectedLocationId)}
                        interactionMode={interactionMode}
                    />
                )}
            </AnimatePresence>
            <InsightsPanel isOpen={showDebug} toggle={() => setShowDebug(!showDebug)} route={currentRoute} />
        </div>
    );
};

const RouteVisualization = ({ locations, route, isComputing, theme, selectedId, simState, onLocationClick, interactionMode, startNodeId }) => {
    const { isSimulating, simStep, simPhase, simSpeed } = simState;
    const getTravelerPos = () => { if (!route || !route.route || simStep >= route.route.length) return { x: 0, y: 0 }; const c = route.route[simStep]; const n = route.route[simStep + 1]; const cLoc = locations[c]; if (!cLoc) return { x: 0, y: 0 }; const nLoc = locations[n]; if (simPhase === 'visiting' || !n || !nLoc) return cLoc.coordinates; return nLoc.coordinates; };
    const travelerPos = isSimulating ? getTravelerPos() : null;

    return (
        <div className="map-container"><svg className="fort-svg-layer" viewBox="0 0 900 800"><defs><filter id="glow"><feGaussianBlur stdDeviation="3" /><feComposite in="SourceGraphic" operator="over" /></filter></defs><path d="M150,200 Q300,50 600,100 T850,350 T700,750 T200,700 T50,450 Z" fill="rgba(50, 45, 40, 0.3)" stroke="rgba(255,255,255,0.1)" />
            <AnimatePresence>{route && !isComputing && route.route.map((locId, idx) => { if (idx === route.route.length - 1) return null; const n = route.route[idx + 1]; return (<motion.line key={`e-${locId}-${n}`} x1={locations[locId].coordinates.x} y1={locations[locId].coordinates.y} x2={locations[n].coordinates.x} y2={locations[n].coordinates.y} stroke={theme.color} strokeWidth="3" strokeDasharray="6 4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: idx * 0.2 }} />); })}</AnimatePresence>

            {Object.values(locations).map(loc => {
                const isSel = route ? route.route.includes(loc.id) : false;
                const isForced = interactionMode === 'soft_include' && selectedId === loc.id;
                const isNewStart = interactionMode === 'reroute' && startNodeId === loc.id;

                return (
                    <motion.g key={loc.id} animate={{ opacity: route ? (isSel || selectedId === loc.id ? 1 : 0.4) : 0.8 }} onClick={(e) => { e.stopPropagation(); onLocationClick(loc.id) }} style={{ cursor: 'pointer' }}>
                        {(isSel || selectedId === loc.id) && (
                            <circle cx={loc.coordinates.x} cy={loc.coordinates.y} r="15" fill="none" stroke={isForced ? '#FFD700' : theme.color} opacity="0.5" filter="url(#glow)">
                                <animate attributeName="r" values="15;20;15" dur="2s" repeatCount="indefinite" />
                            </circle>
                        )}
                        {isNewStart && (
                            <circle cx={loc.coordinates.x} cy={loc.coordinates.y} r="25" fill="none" stroke={theme.color} strokeWidth="2" opacity="0.8">
                                <animate attributeName="r" values="10;30;10" dur="1.5s" repeatCount="indefinite" />
                                <animate attributeName="opacity" values="0.8;0;0.8" dur="1.5s" repeatCount="indefinite" />
                            </circle>
                        )}
                        <circle cx={loc.coordinates.x} cy={loc.coordinates.y} r={6} fill={isForced ? '#FFD700' : (isSel ? theme.color : '#888')} />
                        <text x={loc.coordinates.x} y={loc.coordinates.y + 20} fill="#fff" fontSize="10" textAnchor="middle">{loc.name}</text>
                    </motion.g>
                );
            })}
            {isSimulating && travelerPos && (<motion.circle cx={travelerPos.x} cy={travelerPos.y} r="8" fill="#fff" stroke={theme.color} strokeWidth="3" animate={{ cx: travelerPos.x, cy: travelerPos.y }} transition={{ duration: simPhase === 'walking' ? 1.5 / simSpeed : 0, ease: "linear" }} />)}</svg></div>
    );
};

const InsightsPanel = ({ isOpen, toggle, route }) => {
    const hasData = route && route.decisionLog;
    if (!hasData && !isOpen) return null;
    const [viewMode, setViewMode] = useState('simple');
    const modeLabel = STRATEGY_THEMES[route?.strategy]?.label || 'Standard Mode';
    const modeColor = STRATEGY_THEMES[route?.strategy]?.color || '#fff';
    const getSummary = () => { if (!route) return "No data."; return `A personalized itinerary visiting key locations, optimizing the trade-off between walking time and cultural value.`; };

    return (<><button className="insights-trigger" onClick={toggle}>{isOpen ? '✕ Close' : '🧠 AI Insights'}</button><AnimatePresence>{isOpen && (<motion.div className="insights-panel" initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }} transition={{ duration: 0.3 }}><div className="insights-header"><div className="insights-title"><h2>🧠 AI Intelligence<span className={`strategy-pill ${route.strategy}`} style={{ color: modeColor, borderColor: modeColor }}>{route.strategy.replace('_', ' ')}</span></h2><p style={{ marginTop: '4px', fontSize: '10px', color: modeColor, fontStyle: 'italic' }}>{STRATEGY_THEMES[route.strategy]?.summary}</p><p>{modeLabel} active</p></div></div><div className="panel-toggle"><button className={`toggle-btn ${viewMode === 'simple' ? 'active' : ''}`} onClick={() => setViewMode('simple')}>Simple</button><button className={`toggle-btn ${viewMode === 'technical' ? 'active' : ''}`} onClick={() => setViewMode('technical')}>Technical</button></div>

        {viewMode === 'technical' && hasData && (<div className="weight-section"><h4>Optimization Weights</h4><WeightBar label="Culture" value={route.scoringWeights.cultureWeight} color="#ff9f43" max={4} /><WeightBar label="Walking" value={route.scoringWeights.walkingWeight} color="#2f80ed" max={3} /><WeightBar label="Time" value={route.scoringWeights.timeWeight} color="#ef4444" max={2} /></div>)}<div className="decision-timeline">{route.decisionLog.map((step, i) => (<div key={i} className="decision-card"><div className="decision-header"><span className="step-badge">Step {i + 1}</span><span className="ai-score">AI Score: {step.score}</span></div><div className="decision-body"><div className="route-leg">{step.from} <span>➝</span> {step.to}</div><div className="decision-factors"><span className="factor-tag" style={{ borderColor: '#ff9f43' }}>⭐ <strong>{step.factors.culture}</strong> Culture</span><span className="factor-tag">⏱️ <strong>{step.factors.cost}m</strong> Cost</span>
            {parseFloat(step.factors.adapt) !== 0 && <span className="factor-tag" style={{ borderColor: parseFloat(step.factors.adapt) > 0 ? '#10b981' : '#ef4444', color: parseFloat(step.factors.adapt) > 0 ? '#10b981' : '#ef4444' }}>⚙️ <strong>{step.factors.adapt}</strong> Adapt</span>}
            {parseFloat(step.factors.rl) > 0.5 && <span className="factor-tag" style={{ borderColor: '#10b981', color: '#10b981' }}>🤖 <strong>+{step.factors.rl}</strong> RL</span>}
        </div></div></div>))}</div>{viewMode === 'technical' && route.rejectedLocations.length > 0 && (<div className="rejection-list"><h4 style={{ fontSize: '11px', color: '#aaa', textTransform: 'uppercase', margin: '10px 0 5px 0' }}>🚫 Processed & Rejected</h4>{route.rejectedLocations.slice(0, 3).map((rej, i) => (<div key={i} className="rejection-item"><span className="rej-name">{rej.name}</span><span className="rej-reason">{rej.reason}</span></div>))}</div>)}<div className="ai-summary"><div className="summary-title">🧠 AI Summary</div><p className="summary-text">{getSummary()}</p></div></motion.div>)}</AnimatePresence></>);
};

const LocationIntelligencePanel = ({ locationId, route, isForced, weights, onClose, onAddToRoute, onReroute, interactionMode }) => {
    const loc = shivneriFortLocations[locationId];
    useEffect(() => {
        interactionTracker.startTimer(locationId);
        return () => interactionTracker.stopTimer(locationId);
    }, [locationId]);
    if (!loc) return null;
    const inRoute = route ? route.route.includes(locationId) : false;
    console.log("Checking membership for:", locationId, "Result:", inRoute);

    return (<><motion.div className="panel-backdrop" onClick={onClose} initial={{ opacity: 0 }} /><motion.div className="location-intel-panel" initial={{ x: "100%" }} animate={{ x: 0 }}><div className="intel-header"><h2>Location Intelligence</h2><button className="close-icon" onClick={onClose}>✕</button></div><div className="intel-hero"><h3>{loc.name}</h3><span style={{ color: '#aaa' }}>⏱️ Visit Duration: {loc.avgVisitTime} min • ⭐ {loc.historicalScore}</span></div>

        {interactionMode === 'soft_include' && inRoute && <div className="interaction-tag soft">✔ Included in Route (Soft Inclusion)</div>}
        {interactionMode === 'reroute' && inRoute && route.route[0] === locationId && <div className="interaction-tag hard">🔄 Route restarted from here</div>}

        <div className="intel-section"><h4>Score Breakdown (Adapted)</h4><ScoreBar label="Historical" value={loc.historicalScore} max={10} color="#ff9f43" weight={weights.h.toFixed(1)} /><ScoreBar label="Spiritual" value={loc.spiritualScore} max={10} color="#a55eea" weight={weights.s.toFixed(1)} /></div><div className="intel-actions-row" style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}><motion.button className={`add-to-route-btn ${inRoute ? 'active' : ''}`} onClick={onAddToRoute} whileTap={{ scale: 0.98 }}>{inRoute ? '✅ In Your Route' : '➕ Add to My Route'}</motion.button><p className="reroute-notice">Re-optimizes remaining journey from current position</p><button className="reroute-btn" onClick={onReroute} style={{ padding: '12px', background: '#2F80ED', border: 'none', borderRadius: '12px', color: 'white', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}>📍 Reroute from Here (Deviation)</button></div></motion.div></>);
};

const ScoreBar = ({ label, value, max, color, weight }) => (<div className="score-row"><div className="score-meta-row"><span className="score-label">{label}</span><span className="score-val">{value} ({weight}x)</span></div><div className="bar-track"><motion.div className="bar-fill" initial={{ width: 0 }} animate={{ width: `${(value / max) * 100}%` }} style={{ background: color }} /></div></div>);
const SimulationOverlay = ({ phase, step, route, locations, speed, setSpeed, setStep, stop }) => { const safeStep = Math.min(step, route.route.length - 1); const locName = locations[route.route[safeStep]]?.name; const pct = ((safeStep + (phase === 'walking' ? 0.5 : 0)) / route.route.length) * 100; return (<motion.div className="simulation-overlay" initial={{ y: 50 }} animate={{ y: 0 }}><div className="sim-status">{phase === 'visiting' ? `Exploring ${locName}...` : `Traveling to next stop...`}</div><div className="sim-controls"><button onClick={stop}>⏹ Stop</button><div className="speed-toggles"><button className={speed === 1 ? 'active' : ''} onClick={() => setSpeed(1)}>1x</button><button className={speed === 2 ? 'active' : ''} onClick={() => setSpeed(2)}>2x</button></div></div><div className="sim-progress-bar"><motion.div className="sim-progress-fill" animate={{ width: `${pct}%` }} /></div></motion.div>); };
const LoadingOverlay = () => (<motion.div className="loading-overlay"><div className="loading-spinner" /><p className="loading-text">Optimizing Path...</p></motion.div>);
const MetricCircle = ({ value, max, label, color, suffix = '' }) => { const r = 32; const c = 2 * Math.PI * r; const p = Math.min(Math.max(value / (max > 0 ? max : 100), 0), 1); return (<div className="circle-stat"><svg width="80" height="80"><circle className="circle-bg" cx="40" cy="40" r={r} /><motion.circle className="circle-progress" cx="40" cy="40" r={r} stroke={color} style={{ strokeDasharray: c }} animate={{ strokeDashoffset: c - (p * c) }} transition={{ duration: 1 }} /></svg><div className="stat-value">{Math.round(value)}{suffix}</div><div className="stat-label">{label}</div></div>); };
const WeightBar = ({ label, value, color, max }) => (<div className="weight-row"><div className="weight-label"><span>{label}</span><span>{value}</span></div><div className="w-bar-bg"><div className="w-bar-fill" style={{ width: `${Math.min((value / max) * 100, 100)}%`, background: color }} /></div></div>);

export default SmartExplorationV2;
