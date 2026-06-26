import React from 'react';
import './MeetTheGuide.css';

const GUIDES = [
    {
        id: 'sagar',
        name: 'Sagar Deshmukh',
        initials: 'SD',
        avatarColor: '#c0392b',
        role: 'Chief Historian & Archaeologist',
        experience: '12+ Years',
        specialty: 'Maratha Architecture & Siege Warfare',
        bio: 'Sagar has spent over a decade studying the stone carvings and defensive structures of Shivneri. He brings history to life with stories of the seven gates and the tactical genius of the Maratha Empire.',
        rating: 4.9,
        reviews: 124
    },
    {
        id: 'priya',
        name: 'Priya Kulkarni',
        initials: 'PK',
        avatarColor: '#8e44ad',
        role: 'Nature & Trekking Specialist',
        experience: '8 Years',
        specialty: 'Sahyadri Flora & Hidden Trails',
        bio: 'Priya is an expert in the biodiversity of the Junnar region. She knows every secret trail that avoids the crowds and leads to the best viewpoints for photography and birdwatching.',
        rating: 4.8,
        reviews: 98
    },
    {
        id: 'rahul',
        name: 'Rahul Patil',
        initials: 'RP',
        avatarColor: '#1a6b3a',
        role: 'Local Cultural Ambassador',
        experience: '15+ Years',
        specialty: 'Oral Traditions & Local Cuisine',
        bio: 'A native of Junnar, Rahul knows the stories passed down through generations. He\'ll show you the best spots for authentic Misal and introduce you to the local artisans in the bazaar.',
        rating: 5.0,
        reviews: 215
    }
];

const MeetTheGuide = () => {
    return (
        <div className="guide-section">
            <div className="guide-header">
                <span className="guide-eyebrow">EXPERT COMPANIONS</span>
                <h2 className="guide-title">Meet Your Local Guides</h2>
                <p className="guide-subtitle">Our certified experts help you uncover the layers of history and culture that stay hidden to the casual traveler.</p>
            </div>

            <div className="guide-grid">
                {GUIDES.map((guide) => (
                    <div key={guide.id} className="guide-card">
                        <div className="guide-img-container">
                            <div className="guide-avatar" style={{ backgroundColor: guide.avatarColor }}>
                                <span className="guide-initials">{guide.initials}</span>
                            </div>
                            <div className="guide-overlay">
                                <button className="book-guide-btn">Book a Session</button>
                            </div>
                        </div>
                        <div className="guide-info">
                            <div className="guide-meta">
                                <span className="guide-experience">{guide.experience} Exp.</span>
                                <span className="guide-rating">⭐ {guide.rating} ({guide.reviews})</span>
                            </div>
                            <h3 className="guide-name">{guide.name}</h3>
                            <span className="guide-role">{guide.role}</span>
                            <div className="guide-specialty">
                                <strong>Specialty:</strong> {guide.specialty}
                            </div>
                            <p className="guide-bio">{guide.bio}</p>
                            <div className="guide-footer">
                                <div className="guide-languages">
                                    <span>Marathi</span>
                                    <span>Hindi</span>
                                    <span>English</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="guide-cta-banner">
                <div className="cta-content">
                    <h3>Want a Private Heritage Tour?</h3>
                    <p>Book a full-day immersive experience with our senior historians starting from ₹1,200.</p>
                </div>
                <button className="cta-button">Check Availability</button>
            </div>
        </div>
    );
};

export default MeetTheGuide;
