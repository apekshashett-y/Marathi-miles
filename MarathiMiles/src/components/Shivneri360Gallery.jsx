import React, { useState, useEffect } from "react";

/**
 * Shivneri360Gallery - Fullscreen immersive 360° experience
 * featuring multiple Google Street View locations with a Netflix-style UI.
 */
const Shivneri360Gallery = ({ onClose }) => {
  const views = [
    {
      id: "view1",
      title: "Main Entrance",
      src: "https://www.google.com/maps/embed?pb=!4v1771433427595!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJREd0SUxENGdF!2m2!1d19.1930949!2d73.8554709!3f180!4f20!5f0.7820865974627469"
    },
    {
      id: "view2",
      title: "Upper Fort Area",
      src: "https://www.google.com/maps/embed?pb=!4v1771439452684!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJRG10NEQ4Ymc.!2m2!1d19.20069203074589!2d73.85930846511371!3f219.28696267912818!4f-3.8306061333078247!5f0.7820865974627469"
    },
    {
      id: "view3",
      title: "Fort Viewpoint",
      src: "https://www.google.com/maps/embed?pb=!4v1771439904551!6m8!1m7!1sCAoSHENJQUJJaEQtWldoS1ZvcDNqaXhBcHFwVUdJOVc.!2m2!1d19.19845297391953!2d73.85944386951!3f144.94437530589434!4f5.7950577236906184!5f0.7820865974627469"
    }
  ];

  const [activeView, setActiveView] = useState(views[0]);

  // Disable page scroll when gallery is open
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  // Escape key to close
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div className="shivneri-gallery-modal">
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .shivneri-gallery-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: #0d0d0d;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            animation: fadeIn 0.4s ease-out;
            color: white;
            font-family: 'Inter', sans-serif;
          }
          .close-gallery {
            position: absolute;
            top: 30px;
            right: 40px;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: white;
            font-size: 24px;
            cursor: pointer;
            z-index: 10002;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            backdrop-filter: blur(8px);
          }
          .close-gallery:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: scale(1.1);
          }
          .view-display {
            flex: 1;
            width: 100%;
            position: relative;
          }
          .view-title-overlay {
            position: absolute;
            top: 30px;
            left: 40px;
            z-index: 10001;
            pointer-events: none;
          }
          .view-title-overlay h2 {
            font-size: 28px;
            font-weight: 700;
            margin: 0;
            text-shadow: 0 2px 10px rgba(0,0,0,0.8);
          }
          .view-title-overlay span {
            color: #a855f7;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-size: 12px;
            font-weight: 800;
          }
          .thumbnail-strip-container {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 40px;
            background: linear-gradient(transparent, rgba(0,0,0,0.9) 70%);
            z-index: 10001;
          }
          .strip-header {
            font-size: 14px;
            color: rgba(255,255,255,0.6);
            margin-bottom: 20px;
            font-weight: 600;
            letter-spacing: 1px;
          }
          .thumbnail-strip {
            display: flex;
            gap: 20px;
            overflow-x: auto;
            scrollbar-width: none;
          }
          .thumbnail-strip::-webkit-scrollbar {
            display: none;
          }
          .thumb {
            min-width: 250px;
            aspect-ratio: 16/9;
            background: #1a1a1a;
            border-radius: 12px;
            position: relative;
            cursor: pointer;
            display: flex;
            align-items: flex-end;
            padding: 20px;
            border: 2px solid transparent;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            overflow: hidden;
          }
          .thumb.active {
            border-color: #a855f7;
            transform: scale(1.05);
            box-shadow: 0 0 30px rgba(168, 85, 247, 0.3);
          }
          .thumb:hover:not(.active) {
            transform: translateY(-5px);
            background: #262626;
          }
          .thumb::after {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(transparent, rgba(0,0,0,0.8));
          }
          .thumb-label {
            position: relative;
            z-index: 2;
            font-size: 16px;
            font-weight: 600;
            letter-spacing: -0.5px;
          }
        `}
      </style>

      {/* Header Label */}
      <div className="view-title-overlay">
        <span>IMMERSIVE 360°</span>
        <h2>{activeView.title}</h2>
      </div>

      {/* Close Button */}
      <button className="close-gallery" onClick={onClose}>✕</button>

      {/* Primary Viewer */}
      <div className="view-display">
        <iframe
          key={activeView.id}
          src={activeView.src}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          title={activeView.title}
        />
      </div>

      {/* Netflix-Style Thumbnail Strip */}
      <div className="thumbnail-strip-container">
        <div className="strip-header">EXPLORE MORE SHIVNERI LOCATIONS</div>
        <div className="thumbnail-strip">
          {views.map(view => (
            <div
              key={view.id}
              className={`thumb ${activeView.id === view.id ? "active" : ""}`}
              onClick={() => setActiveView(view)}
            >
              <div className="thumb-label">{view.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shivneri360Gallery;
