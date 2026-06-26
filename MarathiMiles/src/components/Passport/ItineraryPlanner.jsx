import React, { useState, useRef, useEffect } from "react";
import MeetTheGuide from "./MeetTheGuide";
import SmartItineraryPlanner from "./SmartItineraryPlanner";
import SmartExplorationV2 from "./SmartExplorationV2";
import RaigadSmartExplorationV2 from "./RaigadSmartExplorationPage";
import SinhagadSmartExplorationPage from "./SinhagadSmartExplorationPage";
import PratapgadSmartExplorationPage from "./PratapgadSmartExplorationPage";
import LohagadSmartExplorationPage from "./LohagadSmartExplorationPage";
import { generateFortPDF } from "../../utils/generateFortPDF";
import "./ItineraryPlanner.css";

const ItineraryPlanner = ({ fort }) => {
    const [subView, setSubView] = useState(null); // 'guide' | 'planner' | 'exploration'
    const [pdfLoading, setPdfLoading] = useState(false);
    const contentRef = useRef(null);

    // Scroll to content when a subview is selected
    useEffect(() => {
        if (subView && contentRef.current) {
            contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [subView]);

    const handlePdfDownload = async () => {
        if (!fort || pdfLoading) return;
        setPdfLoading(true);
        try {
            await new Promise(r => setTimeout(r, 80)); // let UI repaint
            generateFortPDF(fort);
        } catch (err) {
            console.error('PDF generation failed:', err);
            alert('Could not generate PDF. Please try again.');
        } finally {
            setPdfLoading(false);
        }
    };

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
                {subView === 'exploration' && fort?.id === 2 && <RaigadSmartExplorationV2 onBack={() => setSubView(null)} />}
                {subView === 'exploration' && fort?.id === 3 && <SinhagadSmartExplorationPage onBack={() => setSubView(null)} />}
                {subView === 'exploration' && fort?.id === 4 && <PratapgadSmartExplorationPage onBack={() => setSubView(null)} />}
                {subView === 'exploration' && fort?.id === 5 && <LohagadSmartExplorationPage onBack={() => setSubView(null)} />}
                {subView === 'exploration' && fort?.id !== 2 && fort?.id !== 3 && fort?.id !== 4 && fort?.id !== 5 && <SmartExplorationV2 onBack={() => setSubView(null)} />}
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

                <div className="itin-selection-grid itin-four-col">
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

                    {/* PDF Download Card */}
                    {fort && (
                        <div
                            className="itin-selection-card"
                            onClick={handlePdfDownload}
                            style={{ cursor: pdfLoading ? 'wait' : 'pointer', position: 'relative' }}
                        >
                            {/* Free Download badge */}
                            <span className="itin-pdf-badge">Free Download</span>

                            <div className="selection-icon">
                                {pdfLoading ? '⏳' : '📄'}
                            </div>
                            <h3>{pdfLoading ? 'Generating…' : 'Get your PDF'}</h3>
                            <p>
                                Download your complete <strong>{fort.name}</strong> journey guide — timings, food, shopping &amp; insider tips.
                            </p>

                            <button className="selection-cta" disabled={pdfLoading}>
                                {pdfLoading ? 'Please wait…' : 'Download PDF →'}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Sub-content renders here, below the menu */}
            {renderSubView()}
        </section>
    );
};

export default ItineraryPlanner;
