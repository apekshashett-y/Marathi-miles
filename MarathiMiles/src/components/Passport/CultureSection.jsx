import React, { useEffect } from 'react';
import './CultureSection.css';

// Import local authentic assets
import shivjayantiHero from '../../assets/culture/shivjayanti_hero.png';
import dholTashaImg from '../../assets/culture/dhol_tasha.png';
import mahaAartiImg from '../../assets/culture/maha_aarti.png';
import palnaDetailImg from '../../assets/culture/palna_detail.png';

const CultureSection = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className="culture-section-container">
            <div className="culture-hero" style={{ backgroundImage: `linear-gradient(to right, rgba(230, 126, 34, 0.8), rgba(192, 57, 43, 0.8)), url(${shivjayantiHero})` }}>
                <div className="culture-hero-content">
                    <span className="culture-eyebrow">CULTURAL EXPERIENCE</span>
                    <h1 className="culture-title">Shivneri Janmotsav</h1>
                    <p className="culture-subtitle">Witness the majestic "Cradle Ceremony" of Chhatrapati Shivaji Maharaj at his very birthplace.</p>
                </div>
            </div>

            <div className="culture-body">
                <div className="culture-split">
                    <div className="culture-text-content">
                        <div className="date-badge">
                            <span className="date-day">19</span>
                            <span className="date-month">FEB</span>
                        </div>
                        
                        <h2>The Spirit of Swarajya Comes Alive</h2>
                        <p className="culture-desc">
                            Shivjayanti (the birth anniversary of Chhatrapati Shivaji Maharaj) is the most significant cultural event at Shivneri Fort. Thousands of "Shivbhakts" gather to pay homage at the birth chamber where the legendary Maratha King was born in 1630.
                        </p>
                        
                        <p className="culture-desc">
                            The atmosphere is electric with the beats of **Dhol-Tasha** and the waving of saffron **Bhagwa Zenda**. The entire fort is illuminated, and the "Shiv Jyot" (sacred flame) is carried by groups from all over Maharashtra to the fort top.
                        </p>

                        <div className="culture-highlights">
                            <div className="highlight-item">
                                <div className="highlight-img">
                                    <img src={palnaDetailImg} alt="Palna Ceremony" />
                                </div>
                                <div className="highlight-content">
                                    <h4>Palna (Cradle Ceremony)</h4>
                                    <p>The symbolic cradle ritual where the infant King is celebrated with traditional songs and a floral cradle.</p>
                                </div>
                            </div>
                            <div className="highlight-item">
                                <div className="highlight-img">
                                    <img src={dholTashaImg} alt="Dhol Tasha" />
                                </div>
                                <div className="highlight-content">
                                    <h4>Dhol Tasha Pathak</h4>
                                    <p>Vibrant drumming troupes perform synchronized, thunderous beats that echo through the valley.</p>
                                </div>
                            </div>
                            <div className="highlight-item">
                                <div className="highlight-img">
                                    <img src={mahaAartiImg} alt="Maha Aarti" />
                                </div>
                                <div className="highlight-content">
                                    <h4>Maha Aarti</h4>
                                    <p>A grand collective prayer and lighting of lamps at the birthplace chamber at dawn.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="culture-image-content">
                        <div className="culture-img-wrapper main-img">
                            <img src={shivjayantiHero} alt="Shivjayanti Celebration at Shivneri" />
                            <div className="img-caption">The Shivneri birth chamber adorned for the celebration</div>
                        </div>
                        <div className="culture-img-wrapper secondary-img">
                            <img src={mahaAartiImg} alt="Maha Aarti Ceremony" />
                            <div className="img-caption">The spiritual Maha Aarti at dawn</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CultureSection;
