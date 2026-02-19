import React, { useEffect, useRef, useState } from "react";
import { Viewer } from "@photo-sphere-viewer/core";
import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";
import "@photo-sphere-viewer/core/index.css";
import "@photo-sphere-viewer/markers-plugin/index.css";

// ✅ ES MODULE IMPORT
import shivneri360 from "@/assets/forts/shivneri/shivneri360.jpg";

/**
 * Shivneri360Viewer
 * Real 360° panoramic viewer with PhotoSphereViewer
 * - Full immersive experience
 * - Interactive hotspot for Shivai Devi Temple
 * - Optional Smart Planner integration
 */
const Shivneri360Viewer = ({ onClose, addLocationToRoute }) => {
    const viewerContainerRef = useRef(null);
    const viewerRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showSidePanel, setShowSidePanel] = useState(false);

    console.log("360 image loaded:", shivneri360);

    useEffect(() => {
        if (!viewerContainerRef.current) return;

        // Disable background scroll
        document.body.style.overflow = "hidden";

        // Initialize PhotoSphereViewer
        const viewer = new Viewer({
            container: viewerContainerRef.current,
            panorama: shivneri360,
            navbar: false,
            mousewheel: true,
            touchmoveTwoFingers: false,
            mousemove: true,
            defaultZoomLvl: 50,
            fisheye: 0,
            autoResize: true,
            plugins: [
                [MarkersPlugin, {
                    // Markers configuration
                }]
            ]
        });

        viewerRef.current = viewer;

        // Handle ready event
        viewer.addEventListener("ready", () => {
            console.log("PhotoSphereViewer is ready");
            setIsLoading(false);

            // Add hotspot marker after viewer is ready
            const markersPlugin = viewer.getPlugin(MarkersPlugin);

            markersPlugin.addMarker({
                id: "shivai",
                longitude: 0.5,
                latitude: -0.1,
                html: createHotspotHTML(),
                anchor: "center center",
                style: {
                    cursor: "pointer"
                }
            });

            // Handle marker click
            markersPlugin.addEventListener("select-marker", (e, marker) => {
                if (marker.id === "shivai") {
                    setShowSidePanel(true);
                }
            });
        });

        // Cleanup on unmount
        return () => {
            if (viewerRef.current) {
                viewerRef.current.destroy();
                viewerRef.current = null;
            }
            document.body.style.overflow = "";
        };
    }, []);

    // Create hotspot HTML
    const createHotspotHTML = () => {
        return `
      <div class="shivneri-hotspot">
        <div class="hotspot-pulse"></div>
        <div class="hotspot-core"></div>
      </div>
    `;
    };

    // Handle Add to Smart Route
    const handleAddToRoute = () => {
        if (addLocationToRoute && typeof addLocationToRoute === "function") {
            addLocationToRoute("shivaiDeviTemple");
        } else {
            console.log("Added Shivai Temple to Smart Planner queue");
        }
        setShowSidePanel(false);
    };

    return (
        <>
            {/* Dark Modal Overlay */}
            <div className="shivneri-360-overlay">
                {/* Close Button */}
                <button className="shivneri-360-close" onClick={onClose} aria-label="Close 360 Viewer">
                    ✕
                </button>

                {/* Viewer Container */}
                <div ref={viewerContainerRef} className="shivneri-360-container" />

                {/* Loading State */}
                {isLoading && (
                    <div className="shivneri-360-loader">
                        <div className="loader-spinner"></div>
                        <p>Loading immersive experience...</p>
                    </div>
                )}

                {/* Side Panel */}
                {showSidePanel && (
                    <div className="shivneri-360-side-panel">
                        <button
                            className="side-panel-close"
                            onClick={() => setShowSidePanel(false)}
                            aria-label="Close panel"
                        >
                            ✕
                        </button>

                        <div className="side-panel-content">
                            <h3 className="side-panel-title">Shivai Devi Temple</h3>

                            <p className="side-panel-description">
                                A revered shrine dedicated to Goddess Shivai, mother of Chhatrapati Shivaji Maharaj.
                                This sacred site represents the spiritual core of Shivneri Fort.
                            </p>

                            <div className="side-panel-score">
                                <span className="score-label">Cultural Score</span>
                                <span className="score-value">9.4</span>
                            </div>

                            <div className="side-panel-buttons">
                                <button className="btn-primary" onClick={handleAddToRoute}>
                                    Add to Smart Route
                                </button>
                                <button className="btn-secondary" onClick={() => setShowSidePanel(false)}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Inline CSS */}
                <style>{`
          /* Dark Immersive Overlay */
          .shivneri-360-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: #0a0a0a;
            z-index: 10000;
            animation: fadeIn 0.4s ease;
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          /* Close Button */
          .shivneri-360-close {
            position: absolute;
            top: 24px;
            right: 24px;
            width: 48px;
            height: 48px;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            color: white;
            font-size: 24px;
            cursor: pointer;
            z-index: 10001;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .shivneri-360-close:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: rotate(90deg);
          }

          /* Viewer Container */
          .shivneri-360-container {
            width: 100%;
            height: 100%;
          }

          /* Loading State */
          .shivneri-360-loader {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            z-index: 10002;
            color: white;
          }

          .loader-spinner {
            width: 64px;
            height: 64px;
            border: 4px solid rgba(255, 255, 255, 0.1);
            border-top-color: #ff8c42;
            border-radius: 50%;
            margin: 0 auto 16px;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            to { transform: rotate(360deg); }
          }

          .shivneri-360-loader p {
            font-size: 14px;
            color: rgba(255, 255, 255, 0.7);
            font-weight: 500;
          }

          /* Hotspot Styling */
          .shivneri-hotspot {
            position: relative;
            width: 32px;
            height: 32px;
          }

          .hotspot-pulse {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, rgba(255, 140, 66, 0.6), rgba(255, 140, 66, 0));
            border-radius: 50%;
            animation: pulse 2s ease infinite;
          }

          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.5);
              opacity: 0.5;
            }
          }

          .hotspot-core {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 16px;
            height: 16px;
            background: #ff8c42;
            border: 2px solid white;
            border-radius: 50%;
            box-shadow: 0 4px 12px rgba(255, 140, 66, 0.5);
          }

          /* Side Panel */
          .shivneri-360-side-panel {
            position: absolute;
            top: 50%;
            right: 32px;
            transform: translateY(-50%);
            width: 360px;
            max-height: 80vh;
            background: rgba(20, 20, 30, 0.85);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 16px;
            padding: 32px;
            z-index: 10001;
            animation: slideInRight 0.4s ease;
            overflow-y: auto;
          }

          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateY(-50%) translateX(40px);
            }
            to {
              opacity: 1;
              transform: translateY(-50%) translateX(0);
            }
          }

          .side-panel-close {
            position: absolute;
            top: 16px;
            right: 16px;
            width: 32px;
            height: 32px;
            background: rgba(255, 255, 255, 0.1);
            border: none;
            border-radius: 50%;
            color: white;
            font-size: 18px;
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .side-panel-close:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: rotate(90deg);
          }

          .side-panel-content {
            color: white;
          }

          .side-panel-title {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 16px;
            color: #ff8c42;
            letter-spacing: -0.5px;
          }

          .side-panel-description {
            font-size: 15px;
            line-height: 1.7;
            color: rgba(255, 255, 255, 0.85);
            margin-bottom: 24px;
          }

          .side-panel-score {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px;
            background: rgba(255, 140, 66, 0.1);
            border-left: 3px solid #ff8c42;
            border-radius: 8px;
            margin-bottom: 24px;
          }

          .score-label {
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: rgba(255, 255, 255, 0.6);
            font-weight: 600;
          }

          .score-value {
            font-size: 28px;
            font-weight: 700;
            color: #ff8c42;
          }

          .side-panel-buttons {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }

          .btn-primary {
            padding: 14px 24px;
            background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
            border: none;
            border-radius: 10px;
            color: white;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 16px rgba(139, 92, 246, 0.3);
          }

          .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(139, 92, 246, 0.4);
          }

          .btn-secondary {
            padding: 14px 24px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 10px;
            color: white;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .btn-secondary:hover {
            background: rgba(255, 255, 255, 0.15);
          }

          /* Mobile Responsive */
          @media (max-width: 768px) {
            .shivneri-360-side-panel {
              width: 90%;
              right: 50%;
              transform: translate(50%, -50%);
            }

            .shivneri-360-close {
              top: 16px;
              right: 16px;
              width: 40px;
              height: 40px;
              font-size: 20px;
            }
          }
        `}</style>
            </div>
        </>
    );
};

export default Shivneri360Viewer;
