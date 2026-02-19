import React, { useEffect } from "react";

/**
 * Shivneri360Modal - A full-screen immersive Google Street View modal
 * for the Shivneri Fort section.
 */
const Shivneri360Modal = ({ onClose }) => {
    // Lock document scroll on mount, restore on unmount
    useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = originalStyle;
        };
    }, []);

    // Handle Escape key to close
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    return (
        <div className="shivneri-360-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
            {/* Dynamic Keyframes for the modal */}
            <style>
                {`
          @keyframes modalFadeIn {
            from { opacity: 0; transform: scale(1.05); }
            to { opacity: 1; transform: scale(1); }
          }
          @keyframes pulseGlow {
            0% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.2); }
            50% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.4); }
            100% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.2); }
          }
          .shivneri-360-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.95);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: modalFadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            backdrop-filter: blur(8px);
          }
          .shivneri-360-container {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .shivneri-360-close {
            position: absolute;
            top: 30px;
            right: 30px;
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: white;
            font-size: 24px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            transition: all 0.3s ease;
            box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
          }
          .shivneri-360-close:hover {
            transform: scale(1.1) rotate(90deg);
            background: rgba(255, 255, 255, 0.2);
            box-shadow: 0 0 25px rgba(255, 255, 255, 0.3);
          }
          .shivneri-360-iframe-wrapper {
            width: 100%;
            height: 100%;
            overflow: hidden;
          }
          .shivneri-badge {
            position: absolute;
            top: 30px;
            left: 30px;
            background: rgba(0, 0, 0, 0.6);
            padding: 8px 16px;
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: white;
            font-size: 14px;
            font-weight: 500;
            pointer-events: none;
            backdrop-filter: blur(4px);
            display: flex;
            align-items: center;
            gap: 8px;
            z-index: 10000;
          }
          .live-dot {
            width: 8px;
            height: 8px;
            background: #ff4444;
            border-radius: 50%;
            animation: pulseGlow 1.5s infinite;
          }
        `}
            </style>

            <div className="shivneri-360-container">
                {/* Floating Badge */}
                <div className="shivneri-badge">
                    <span className="live-dot"></span>
                    Shivneri Fort — 360° Interactive View
                </div>

                {/* Close Button */}
                <button
                    className="shivneri-360-close"
                    onClick={onClose}
                    aria-label="Close interactive view"
                >
                    &times;
                </button>

                {/* Street View Iframe */}
                <div className="shivneri-360-iframe-wrapper">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!4v1771433427595!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJREd0SUxENGdF!2m2!1d19.1930949!2d73.8554709!3f180!4f20!5f0.7820865974627469"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Shivneri Fort 360 View"
                    />
                </div>
            </div>
        </div>
    );
};

export default Shivneri360Modal;
