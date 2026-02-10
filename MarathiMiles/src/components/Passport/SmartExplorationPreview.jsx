import React from "react";
import "./SmartExplorationPreview.css";

const SmartExplorationPreview = ({ fortName, onOpenExploration }) => {
    return (
        <div className="smart-exploration-preview-section">
            <div className="exploration-preview-container">
                <div className="exploration-preview-content">
                    <span className="exploration-eyebrow">EXPLORE SMART</span>
                    <h2 className="exploration-preview-title">Smart Exploration Planner</h2>
                    <p className="exploration-preview-description">
                        Not just when to visit, but how to move inside the fort.
                    </p>

                    <div className="exploration-feature-list">
                        <div className="exploration-feature">
                            <span className="feature-icon">🗺️</span>
                            <span className="feature-text">Illustrated fort map</span>
                        </div>
                        <div className="exploration-feature">
                            <span className="feature-icon">🎯</span>
                            <span className="feature-text">AI-free route optimization</span>
                        </div>
                        <div className="exploration-feature">
                            <span className="feature-icon">⚡</span>
                            <span className="feature-text">Maximize historical value</span>
                        </div>
                    </div>

                    <button
                        className="exploration-preview-cta"
                        onClick={onOpenExploration}
                    >
                        <span className="cta-icon">→</span>
                        Open Smart Exploration
                    </button>
                </div>

                <div className="exploration-preview-visual">
                    <div className="preview-map-container">
                        <svg
                            viewBox="0 0 400 300"
                            className="preview-map-illustration"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {/* Fort outline (simplified) */}
                            <ellipse
                                cx="200"
                                cy="150"
                                rx="150"
                                ry="100"
                                fill="#e8d4b8"
                                stroke="#a67c52"
                                strokeWidth="3"
                            />

                            {/* Location markers */}
                            <g id="entrance">
                                <circle cx="80" cy="150" r="12" fill="#d4a574" stroke="#8b5a2b" strokeWidth="2" />
                                <text x="80" y="155" fontSize="10" fill="#2c1810" textAnchor="middle">E</text>
                            </g>

                            <g id="main-spot">
                                <circle cx="200" cy="120" r="14" fill="#ff6b35" stroke="#c44520" strokeWidth="2" />
                                <text x="200" y="125" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">S</text>
                            </g>

                            <g id="secondary-1">
                                <circle cx="280" cy="150" r="10" fill="#d4a574" stroke="#8b5a2b" strokeWidth="2" />
                                <text x="280" y="155" fontSize="9" fill="#2c1810" textAnchor="middle">B</text>
                            </g>

                            <g id="secondary-2">
                                <circle cx="240" cy="200" r="10" fill="#d4a574" stroke="#8b5a2b" strokeWidth="2" />
                                <text x="240" y="205" fontSize="9" fill="#2c1810" textAnchor="middle">V</text>
                            </g>

                            {/* Optimized path (dotted line connecting locations) */}
                            <path
                                d="M 80 150 L 200 120 L 280 150 L 240 200"
                                fill="none"
                                stroke="#ff6b35"
                                strokeWidth="3"
                                strokeDasharray="5,5"
                                strokeLinecap="round"
                            />

                            {/* Labels */}
                            <text x="200" y="30" fontSize="12" fill="#2c1810" fontWeight="600" textAnchor="middle">
                                {fortName || "Fort"}
                            </text>

                            <text x="200" y="280" fontSize="10" fill="#8b5a2b" textAnchor="middle" fontStyle="italic">
                                Optimized Route
                            </text>
                        </svg>
                    </div>

                    <div className="preview-badge">
                        <span className="badge-icon">✨</span>
                        Click to explore
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SmartExplorationPreview;
