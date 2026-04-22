import React, { useState, useRef, useEffect } from "react";
import MeetTheGuide from "./MeetTheGuide";
import SmartItineraryPlanner from "./SmartItineraryPlanner";
import SmartExplorationV2 from "./SmartExplorationV2";
import "./ItineraryPlanner.css";

const ItineraryPlanner = () => {
    const [subView, setSubView] = useState(null); // 'guide' | 'planner' | 'exploration'
    const contentRef = useRef(null);

    // Scroll to content when a subview is selected
    useEffect(() => {
        if (subView && contentRef.current) {
            contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [subView]);

    const renderSubView = () => {
        if (!subView) return null;

        return (
            <div className="itin-subview-container" ref={contentRef}>
                <div className="itin-subview-header">
                    <button className="itin-close-btn" onClick={() => setSubView(null)}>
                        ✕ Close Section
                    </button>
                </div>
                {subView === 'guide' && <MeetTheGuide />}
                {subView === 'planner' && <SmartItineraryPlanner />}
                {subView === 'exploration' && <SmartExplorationV2 />}
            </div>
        );
    };

    return (
        <section className="itin-wrapper-section">
            <div className="itin-selection-menu">
                <div className="itin-header">
                    <span className="itin-eyebrow">TRAVEL ITINERARY</span>
                    <h2 className="itin-title">Plan Your Perfect Day</h2>
                    <p className="itin-subtitle">
                        Choose an option below to explore expert guides, AI day plans, or smart fort navigation.
                    </p>
                </div>

                <div className="itin-selection-grid">
                    <div 
                        className={`itin-selection-card ${subView === 'guide' ? 'active' : ''}`} 
                        onClick={() => setSubView('guide')}
                    >
                        <div className="selection-icon">🧔</div>
                        <h3>Meet the Guide</h3>
                        <p>Connect with local experts and historians for a personalized tour of Shivneri.</p>
                        <button className="selection-cta">{subView === 'guide' ? 'Viewing' : 'Browse Guides →'}</button>
                    </div>

                    <div 
                        className={`itin-selection-card highlight ${subView === 'planner' ? 'active' : ''}`} 
                        onClick={() => setSubView('planner')}
                    >
                        <div className="selection-icon">📅</div>
                        <h3>Smart Day Planner</h3>
                        <p>Tell us your time and budget, and we'll craft a complete day plan with food and shopping.</p>
                        <button className="selection-cta">{subView === 'planner' ? 'Viewing' : 'Create Plan →'}</button>
                    </div>

                    <div 
                        className={`itin-selection-card ${subView === 'exploration' ? 'active' : ''}`} 
                        onClick={() => setSubView('exploration')}
                    >
                        <div className="selection-icon">🧭</div>
                        <h3>Smart Exploration</h3>
                        <p>Optimize your movement inside the fort with AI-powered routes based on your energy.</p>
                        <button className="selection-cta">{subView === 'exploration' ? 'Viewing' : 'Start Navigation →'}</button>
                    </div>
                </div>
            </div>

            {/* Sub-content renders here, below the menu */}
            {renderSubView()}
        </section>
    );
};

export default ItineraryPlanner;
