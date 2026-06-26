import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './MeetTheGuide.css';

// 🏯 Shivneri Guides
const SHIVNERI_GUIDES = [
    {
        id: 'sagar',
        fortId: 1,
        name: 'Sagar Deshmukh',
        initials: 'SD',
        avatarColor: '#c0392b',
        role: 'Chief Historian & Archaeologist',
        experience: '12+ Years',
        specialty: 'Maratha Architecture & Siege Warfare',
        bio: 'Sagar has spent over a decade studying the stone carvings and defensive structures of Shivneri. He brings history to life with stories of the seven gates and the tactical genius of the Maratha Empire.',
        rating: 4.9,
        reviews: 124,
        basePrice: 1000,
        languages: ['Marathi', 'Hindi', 'English'],
        phone: '+91 98234 56789'
    },
    {
        id: 'priya',
        fortId: 1,
        name: 'Priya Kulkarni',
        initials: 'PK',
        avatarColor: '#8e44ad',
        role: 'Nature & Trekking Specialist',
        experience: '8 Years',
        specialty: 'Sahyadri Flora & Hidden Trails',
        bio: 'Priya is an expert in the biodiversity of the Junnar region. She knows every secret trail that avoids the crowds and leads to the best viewpoints for photography and birdwatching.',
        rating: 4.8,
        reviews: 98,
        basePrice: 800,
        languages: ['Marathi', 'Hindi', 'English'],
        phone: '+91 98765 43210'
    },
    {
        id: 'rahul',
        fortId: 1,
        name: 'Rahul Patil',
        initials: 'RP',
        avatarColor: '#1a6b3a',
        role: 'Local Cultural Ambassador',
        experience: '15+ Years',
        specialty: 'Oral Traditions & Local Cuisine',
        bio: 'A native of Junnar, Rahul knows the stories passed down through generations. He\'ll show you the best spots for authentic Misal and introduce you to the local artisans in the bazaar.',
        rating: 5.0,
        reviews: 215,
        basePrice: 900,
        languages: ['Marathi', 'Hindi'],
        phone: '+91 99123 45678'
    }
];

// 🏰 Raigad Guides
const RAIGAD_GUIDES = [
    {
        id: 'abhijit_r',
        fortId: 2,
        name: 'Abhijit Sawant',
        initials: 'AS',
        avatarColor: '#d35400',
        role: 'Royal Court Historian',
        experience: '14+ Years',
        specialty: 'Shivrajyabhishek (Coronation) & Administration',
        bio: 'Abhijit is a leading authority on Chhatrapati Shivaji Maharaj\'s coronation. He leads immersive walks through the Raj Sabha and Raj Sadar, illustrating the grandeur of the Maratha capital.',
        rating: 4.9,
        reviews: 168,
        basePrice: 1200,
        languages: ['Marathi', 'Hindi', 'English'],
        phone: '+91 91234 56780'
    },
    {
        id: 'snehal_r',
        fortId: 2,
        name: 'Snehal Jadhav',
        initials: 'SJ',
        avatarColor: '#2980b9',
        role: 'Fortifications & Trekking Guide',
        experience: '10 Years',
        specialty: 'Takmak Tok History & Escape Routes',
        bio: 'Snehal specializes in the military architecture of Raigad. She guides visitors down the paths near Takmak Tok and describes the strategic escape routes built into the fort wall.',
        rating: 4.8,
        reviews: 112,
        basePrice: 950,
        languages: ['Marathi', 'Hindi', 'English'],
        phone: '+91 92345 67891'
    },
    {
        id: 'manoj_r',
        fortId: 2,
        name: 'Manoj Rane',
        initials: 'MR',
        avatarColor: '#27ae60',
        role: 'Konkan Heritage Ambassador',
        experience: '18 Years',
        specialty: 'Raigad Folk Lore & Konkani Cuisine',
        bio: 'Manoj grew up in Pachad village at the base of Raigad. He tells legendary stories of Hirkani\'s courage and introduces guests to authentic Konkani rustic thalis.',
        rating: 5.0,
        reviews: 245,
        basePrice: 1100,
        languages: ['Marathi', 'Hindi'],
        phone: '+91 93456 78902'
    }
];

// 🦁 Sinhagad Guides
const SINHAGAD_GUIDES = [
    {
        id: 'tanaji_s',
        fortId: 3,
        name: 'Tanaji Rao',
        initials: 'TR',
        avatarColor: '#c0392b',
        role: 'Military History Expert',
        experience: '15+ Years',
        specialty: 'Battle of Sinhagad (1670) & Guerrilla Tactics',
        bio: 'Tanaji leads walks recounting the legendary night attack by Tanaji Malusare. He details the scaling of Kalyan Darwaza and the military significance of the Lion\'s Fort.',
        rating: 4.9,
        reviews: 184,
        basePrice: 1100,
        languages: ['Marathi', 'Hindi', 'English'],
        phone: '+91 94567 89012'
    },
    {
        id: 'rohini_s',
        fortId: 3,
        name: 'Rohini Joshi',
        initials: 'RJ',
        avatarColor: '#16a085',
        role: 'Flora & Valley Trek Specialist',
        experience: '9 Years',
        specialty: 'Sahyadri Avifauna & Dev Take Spring',
        bio: 'Rohini guides nature lovers through the Sinhagad valley. She points out endemic Sahyadri birds and explains the natural water filtration systems carved into the hilltop basalt.',
        rating: 4.7,
        reviews: 89,
        basePrice: 850,
        languages: ['Marathi', 'Hindi', 'English'],
        phone: '+91 95678 90123'
    },
    {
        id: 'sanjay_s',
        fortId: 3,
        name: 'Sanjay Shinde',
        initials: 'SS',
        avatarColor: '#f39c12',
        role: 'Local Gastronomy Guide',
        experience: '12 Years',
        specialty: 'Pithla Bhakri Stalls & Hill Folk Tales',
        bio: 'Sanjay knows every viewpoint on Sinhagad. He shares local folklore and guides you to the finest traditional Pitla Bhakri and Matka Dahi stalls on the fort summit.',
        rating: 4.9,
        reviews: 190,
        basePrice: 900,
        languages: ['Marathi', 'Hindi'],
        phone: '+91 96789 01234'
    }
];

// ⚔️ Pratapgad Guides
const PRATAPGAD_GUIDES = [
    {
        id: 'vijay_p',
        fortId: 4,
        name: 'Vijay Gharge',
        initials: 'VG',
        avatarColor: '#7f8c8d',
        role: 'Battle of Pratapgad Specialist',
        experience: '16 Years',
        specialty: 'Afzal Khan Confrontation & Jawli Forests',
        bio: 'Vijay is an expert on the historic Battle of Pratapgad (1659). He walks you through the dense Jawli forest routes and the tower bastions, recounting Maratha military strategy.',
        rating: 4.9,
        reviews: 156,
        basePrice: 1150,
        languages: ['Marathi', 'Hindi', 'English'],
        phone: '+91 97890 12345'
    },
    {
        id: 'ananya_p',
        fortId: 4,
        name: 'Ananya Deshpande',
        initials: 'AD',
        avatarColor: '#130f40',
        role: 'Heritage & Photography Guide',
        experience: '7 Years',
        specialty: 'Bhavani Temple Carvings & Sunset Vantages',
        bio: 'Ananya guides visitors through Bhavani Temple and the inner fort walls, offering deep context on 17th-century carvings. Perfect for photography enthusiasts.',
        rating: 4.8,
        reviews: 76,
        basePrice: 900,
        languages: ['Marathi', 'Hindi', 'English'],
        phone: '+91 98901 23456'
    },
    {
        id: 'babaji_p',
        fortId: 4,
        name: 'Babaji Kadam',
        initials: 'BK',
        avatarColor: '#27ae60',
        role: 'Agro-tourism Ambassador',
        experience: '20 Yrs',
        specialty: 'Jawli Valley Lore & Satara Cuisine',
        bio: 'A lifelong resident of the foothills, Babaji narrates the heritage of the Jawli valley. He guides visitors to organic strawberry farms and local home-cooks.',
        rating: 5.0,
        reviews: 280,
        basePrice: 1000,
        languages: ['Marathi', 'Hindi'],
        phone: '+91 99012 34567'
    }
];

// ⛰️ Lohagad Guides
const LOHAGAD_GUIDES = [
    {
        id: 'karan_l',
        fortId: 5,
        name: 'Karan Shinde',
        initials: 'KS',
        avatarColor: '#2c3e50',
        role: 'Cave & Fort Archaeologist',
        experience: '11 Years',
        specialty: 'Bhaja Caves & Vinchu Kata Trek',
        bio: 'Karan specializes in the dual history of Lohagad and the nearby Bhaja Buddhist caves. He leads treks along the iconic Vinchu Kata (Scorpion\'s Tail) spur.',
        rating: 4.8,
        reviews: 104,
        basePrice: 950,
        languages: ['Marathi', 'Hindi', 'English'],
        phone: '+91 90123 45678'
    },
    {
        id: 'meera_l',
        fortId: 5,
        name: 'Meera Deshmukh',
        initials: 'MD',
        avatarColor: '#d35400',
        role: 'Monsoon Trail Specialist',
        experience: '8 Years',
        specialty: 'Monsoon Safety Routes & Rainwater Harvesting',
        bio: 'Meera is a certified trekker who knows the safest and most scenic monsoon routes up Lohagad. She explains the elaborate water tanks and rain-harvesting methods.',
        rating: 4.9,
        reviews: 92,
        basePrice: 800,
        languages: ['Marathi', 'Hindi', 'English'],
        phone: '+91 91234 56789'
    },
    {
        id: 'santosh_l',
        fortId: 5,
        name: 'Santosh Bhau',
        initials: 'SB',
        avatarColor: '#7f8c8d',
        role: 'Trade Route Historian',
        experience: '14 Years',
        specialty: 'Ancient Trade Routes & Maval Food',
        bio: 'Santosh shares tales of the ancient trade routes connecting the Konkan port to the Deccan plateau. He guides guests to authentic Maval-style meals near Pawna.',
        rating: 4.9,
        reviews: 140,
        basePrice: 850,
        languages: ['Marathi', 'Hindi'],
        phone: '+91 92345 67890'
    }
];

const FORT_GUIDES_MAP = {
    1: SHIVNERI_GUIDES,
    2: RAIGAD_GUIDES,
    3: SINHAGAD_GUIDES,
    4: PRATAPGAD_GUIDES,
    5: LOHAGAD_GUIDES,
    6: RAIGAD_GUIDES // default to Raigad if Rajgad selected by mistake
};

const FORT_MEETUP_POINTS = {
    1: '📍 Maha Darwaza Main Gate, Shivneri Fort base (10m prior)',
    2: '📍 Raigad Ropeway Lower Station or Nana Darwaza base (10m prior)',
    3: '📍 Pune Darwaza Main Gate, Sinhagad Fort parking lot (10m prior)',
    4: '📍 Pratapgad Lower Lawn Tourist Reception Desk (10m prior)',
    5: '📍 Bhaje Village Lohagad Fort Trek Start Point (10m prior)'
};

const TIME_SLOTS = [
    { id: 'morning', label: '🌅 Sunrise Trek', time: '06:00 AM - 09:00 AM', availability: 'Available' },
    { id: 'midday', label: '🏛️ Historical Walk', time: '10:00 AM - 01:00 PM', availability: 'Almost Full' },
    { id: 'evening', label: '🌇 Sunset Heritage', time: '04:00 PM - 07:00 PM', availability: 'Available' }
];

const MeetTheGuide = ({ fort }) => {
    // Determine guide list based on current fort ID
    const activeFortId = fort?.id || 1;
    const guides = FORT_GUIDES_MAP[activeFortId] || SHIVNERI_GUIDES;
    const fortName = fort?.name || 'Shivneri Fort';

    // Booking States
    const [bookingModalOpen, setBookingModalOpen] = useState(false);
    const [selectedGuide, setSelectedGuide] = useState(null);
    const [bookingDate, setBookingDate] = useState('');
    const [bookingTime, setBookingTime] = useState('morning');
    const [peopleCount, setPeopleCount] = useState(2);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [bookingStep, setBookingStep] = useState(1); // 1: form, 2: processing, 3: ticket
    const [loadingMessage, setLoadingMessage] = useState('');
    const [confirmedBooking, setConfirmedBooking] = useState(null);
    const [myBookings, setMyBookings] = useState([]);

    // Reset selection modal on guide list or fort change
    useEffect(() => {
        setBookingModalOpen(false);
    }, [activeFortId]);

    // Generate next 7 days for booking calendar
    const [availableDates, setAvailableDates] = useState([]);
    useEffect(() => {
        const dates = [];
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        for (let i = 0; i < 7; i++) {
            const d = new Date();
            d.setDate(d.getDate() + i);
            dates.push({
                formatted: `${daysOfWeek[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}`,
                raw: d.toISOString().split('T')[0]
            });
        }
        setAvailableDates(dates);
        if (dates.length > 0) setBookingDate(dates[0].formatted);
    }, []);

    const handleOpenBooking = (guide) => {
        setSelectedGuide(guide);
        setSelectedLanguages(guide.languages);
        setBookingStep(1);
        setBookingModalOpen(true);
    };

    const handleLanguageToggle = (lang) => {
        if (selectedLanguages.includes(lang)) {
            if (selectedLanguages.length > 1) {
                setSelectedLanguages(prev => prev.filter(l => l !== lang));
            }
        } else {
            setSelectedLanguages(prev => [...prev, lang]);
        }
    };

    const calculatePrice = () => {
        if (!selectedGuide) return 0;
        return selectedGuide.basePrice + (peopleCount - 1) * 150;
    };

    const handleConfirmBooking = () => {
        setBookingStep(2);
        
        const messages = [
            'Verifying guide schedule...',
            'Calculating travel parameters...',
            'Generating digital ticket receipt...',
            'Finalizing reservation...'
        ];

        let msgIdx = 0;
        setLoadingMessage(messages[0]);

        const msgInterval = setInterval(() => {
            msgIdx++;
            if (msgIdx < messages.length) {
                setLoadingMessage(messages[msgIdx]);
            }
        }, 500);

        setTimeout(() => {
            clearInterval(msgInterval);
            const ticketId = `MM-GD-${Math.floor(100000 + Math.random() * 900000)}`;
            const newBooking = {
                ticketId,
                guide: selectedGuide,
                date: bookingDate,
                slot: TIME_SLOTS.find(s => s.id === bookingTime),
                people: peopleCount,
                languages: selectedLanguages,
                price: calculatePrice()
            };

            setConfirmedBooking(newBooking);
            setMyBookings(prev => [...prev, newBooking]);
            setBookingStep(3);
        }, 2200);
    };

    const handleCancelBooking = (ticketId) => {
        setMyBookings(prev => prev.filter(b => b.ticketId !== ticketId));
        if (confirmedBooking?.ticketId === ticketId) {
            setConfirmedBooking(null);
        }
    };

    const meetupPoint = confirmedBooking 
        ? (FORT_MEETUP_POINTS[confirmedBooking.guide.fortId] || '📍 Fort Base Main Gate (10m prior)') 
        : '';

    return (
        <div className="guide-section">
            <div className="guide-header">
                <span className="guide-eyebrow">EXPERT COMPANIONS</span>
                <h2 className="guide-title">Meet Your Local Guides</h2>
                <p className="guide-subtitle">Our certified experts help you uncover the layers of history and culture that stay hidden to the casual traveler at {fortName}.</p>
            </div>

            {myBookings.length > 0 && (
                <div className="active-bookings-section">
                    <h3 className="active-bookings-title">📅 Your Active Guide Bookings</h3>
                    <div className="active-bookings-grid">
                        {myBookings.map((b) => (
                            <div key={b.ticketId} className="active-booking-mini-card">
                                <div className="mini-card-left">
                                    <div className="mini-card-avatar" style={{ backgroundColor: b.guide.avatarColor }}>
                                        {b.guide.initials}
                                    </div>
                                    <div className="mini-card-info">
                                        <h4>{b.guide.name}</h4>
                                        <p>🗓️ {b.date} • {b.slot.time}</p>
                                        <span className="ticket-id-badge">ID: {b.ticketId}</span>
                                    </div>
                                </div>
                                <div className="mini-card-right">
                                    <span className="mini-price">₹{b.price}</span>
                                    <button className="mini-cancel-btn" onClick={() => handleCancelBooking(b.ticketId)}>Cancel</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="guide-grid">
                {guides.map((guide) => {
                    const isBooked = myBookings.some(b => b.guide.id === guide.id);
                    return (
                        <div key={guide.id} className="guide-card">
                            <div className="guide-img-container">
                                <div className="guide-avatar" style={{ backgroundColor: guide.avatarColor }}>
                                    <span className="guide-initials">{guide.initials}</span>
                                    {isBooked && <div className="guide-booked-overlay">Session Booked ✓</div>}
                                </div>
                                <div className="guide-overlay">
                                    <button 
                                        className="book-guide-btn" 
                                        onClick={() => handleOpenBooking(guide)}
                                    >
                                        {isBooked ? 'Book Another Session' : 'Book a Session'}
                                    </button>
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
                                        {guide.languages.map(l => (
                                            <span key={l}>{l}</span>
                                        ))}
                                    </div>
                                    <button 
                                        className="card-book-action-btn"
                                        onClick={() => handleOpenBooking(guide)}
                                    >
                                        {isBooked ? 'Book Another' : 'Book Session • ₹' + guide.basePrice}
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="guide-cta-banner">
                <div className="cta-content">
                    <h3>Want a Private Heritage Tour?</h3>
                    <p>Book a full-day immersive experience with our senior historians starting from ₹1,200.</p>
                </div>
                <button className="cta-button" onClick={() => handleOpenBooking(guides[0])}>Check Availability</button>
            </div>

            {/* Interactive Booking Modal */}
            <AnimatePresence>
                {bookingModalOpen && selectedGuide && (
                    <div className="guide-modal-overlay">
                        <motion.div 
                            className="guide-modal-card"
                            initial={{ scale: 0.9, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 30 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        >
                            <button className="modal-close-x" onClick={() => setBookingModalOpen(false)}>✕</button>

                            {bookingStep === 1 && (
                                <div className="modal-step-form">
                                    <div className="modal-guide-header">
                                        <div className="modal-guide-avatar" style={{ backgroundColor: selectedGuide.avatarColor }}>
                                            {selectedGuide.initials}
                                        </div>
                                        <div className="modal-guide-meta">
                                            <h3>Book a Session with {selectedGuide.name}</h3>
                                            <p className="modal-guide-role">{selectedGuide.role}</p>
                                            <p className="modal-guide-rating">⭐ {selectedGuide.rating} ({selectedGuide.reviews} reviews)</p>
                                        </div>
                                    </div>

                                    <div className="modal-body-scrollable">
                                        {/* Date Picker */}
                                        <div className="booking-field-group">
                                            <label className="field-label">📅 Select Date</label>
                                            <div className="horizontal-date-row">
                                                {availableDates.map((date) => (
                                                    <button
                                                        key={date.raw}
                                                        type="button"
                                                        className={`date-chip-btn ${bookingDate === date.formatted ? 'selected' : ''}`}
                                                        onClick={() => setBookingDate(date.formatted)}
                                                    >
                                                        <span className="date-chip-day">{date.formatted.split(',')[0]}</span>
                                                        <span className="date-chip-date">{date.formatted.split(',')[1].trim()}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Time Slots */}
                                        <div className="booking-field-group">
                                            <label className="field-label">🕒 Choose Time Slot</label>
                                            <div className="time-slots-grid">
                                                {TIME_SLOTS.map((slot) => (
                                                    <button
                                                        key={slot.id}
                                                        type="button"
                                                        className={`time-slot-btn-card ${bookingTime === slot.id ? 'selected' : ''}`}
                                                        onClick={() => setBookingTime(slot.id)}
                                                    >
                                                        <div className="slot-badge-row">
                                                            <span className="slot-label">{slot.label}</span>
                                                            <span className={`slot-availability ${slot.availability === 'Almost Full' ? 'alert' : ''}`}>
                                                                {slot.availability}
                                                            </span>
                                                        </div>
                                                        <p className="slot-time-str">{slot.time}</p>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Guest Count & Languages */}
                                        <div className="booking-fields-row">
                                            <div className="booking-field-group half-width">
                                                <label className="field-label">👥 Number of Guests</label>
                                                <div className="guests-counter">
                                                    <button 
                                                        type="button" 
                                                        disabled={peopleCount <= 1}
                                                        onClick={() => setPeopleCount(prev => prev - 1)}
                                                    >
                                                        -
                                                    </button>
                                                    <span className="guests-value">{peopleCount} {peopleCount === 1 ? 'Guest' : 'Guests'}</span>
                                                    <button 
                                                        type="button" 
                                                        disabled={peopleCount >= 10}
                                                        onClick={() => setPeopleCount(prev => prev + 1)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="booking-field-group half-width">
                                                <label className="field-label">🗣️ Languages Preferred</label>
                                                <div className="languages-checkbox-group">
                                                    {selectedGuide.languages.map((lang) => (
                                                        <button
                                                            key={lang}
                                                            type="button"
                                                            className={`lang-check-btn ${selectedLanguages.includes(lang) ? 'checked' : ''}`}
                                                            onClick={() => handleLanguageToggle(lang)}
                                                        >
                                                            {lang}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Pricing Summary */}
                                        <div className="booking-price-summary">
                                            <div className="price-row">
                                                <span>Base Guided Fee ({selectedGuide.name})</span>
                                                <span>₹{selectedGuide.basePrice}</span>
                                            </div>
                                            {peopleCount > 1 && (
                                                <div className="price-row">
                                                    <span>Co-traveller Surcharge (+{peopleCount - 1} people)</span>
                                                    <span>₹{(peopleCount - 1) * 150}</span>
                                                </div>
                                            )}
                                            <div className="price-row total">
                                                <span>Total Amount Payable</span>
                                                <span>₹{calculatePrice()}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="modal-actions-row">
                                        <button 
                                            type="button" 
                                            className="modal-cancel-btn" 
                                            onClick={() => setBookingModalOpen(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button 
                                            type="button" 
                                            className="modal-submit-btn" 
                                            onClick={handleConfirmBooking}
                                        >
                                            Confirm Booking (₹{calculatePrice()})
                                        </button>
                                    </div>
                                </div>
                            )}

                            {bookingStep === 2 && (
                                <div className="modal-step-processing">
                                    <div className="booking-spinner-wrapper">
                                        <div className="booking-spinner"></div>
                                    </div>
                                    <h3>Processing Your Reservation</h3>
                                    <p className="processing-message-text">{loadingMessage}</p>
                                    <p className="processing-sub-text">Please do not refresh or close this view.</p>
                                </div>
                            )}

                            {bookingStep === 3 && confirmedBooking && (
                                <div className="modal-step-ticket">
                                    <div className="ticket-success-header">
                                        <div className="success-icon-badge">✓</div>
                                        <h3>Booking Confirmed!</h3>
                                        <p>Your session with {confirmedBooking.guide.name} is successfully secured.</p>
                                    </div>

                                    {/* Digital Ticket Representation */}
                                    <div className="digital-ticket-container">
                                        <div className="ticket-cutout left"></div>
                                        <div className="ticket-cutout right"></div>
                                        
                                        <div className="ticket-top-section">
                                            <div className="ticket-brand-header">
                                                <span>⚔️ PastPort Companion Pass</span>
                                                <span className="ticket-id">{confirmedBooking.ticketId}</span>
                                            </div>
                                            <h4 className="ticket-guide-title">{confirmedBooking.guide.name}</h4>
                                            <span className="ticket-guide-role">{confirmedBooking.guide.role}</span>
                                        </div>

                                        <div className="ticket-divider-line"></div>

                                        <div className="ticket-details-grid">
                                            <div className="ticket-detail-item">
                                                <span className="item-label">DATE</span>
                                                <span className="item-val">{confirmedBooking.date}</span>
                                            </div>
                                            <div className="ticket-detail-item">
                                                <span className="item-label">TIME</span>
                                                <span className="item-val">{confirmedBooking.slot.time}</span>
                                            </div>
                                            <div className="ticket-detail-item">
                                                <span className="item-label">GUESTS</span>
                                                <span className="item-val">{confirmedBooking.people} {confirmedBooking.people === 1 ? 'Person' : 'People'}</span>
                                            </div>
                                            <div className="ticket-detail-item">
                                                <span className="item-label">LANGUAGES</span>
                                                <span className="item-val">{confirmedBooking.languages.join(', ')}</span>
                                            </div>
                                            <div className="ticket-detail-item full-width">
                                                <span className="item-label">MEETUP POINT</span>
                                                <span className="item-val">{meetupPoint}</span>
                                            </div>
                                        </div>

                                        <div className="ticket-divider-line"></div>

                                        <div className="ticket-footer-section">
                                            <div className="ticket-qr-and-instructions">
                                                <div className="ticket-mock-qr">
                                                    <div className="qr-box corner-tl"></div>
                                                    <div className="qr-box corner-tr"></div>
                                                    <div className="qr-box corner-bl"></div>
                                                    <div className="qr-box inner-dot"></div>
                                                </div>
                                                <div className="ticket-instructions">
                                                    <p>Show this pass at the fort tourist reception center. Carry trekking footwear and water.</p>
                                                    <p className="guide-phone">📞 Contact Guide: {confirmedBooking.guide.phone}</p>
                                                </div>
                                            </div>
                                            <div className="ticket-price-badge">
                                                <span>PAID</span>
                                                <h3>₹{confirmedBooking.price}</h3>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="ticket-actions-row">
                                        <button 
                                            type="button" 
                                            className="ticket-close-btn" 
                                            onClick={() => setBookingModalOpen(false)}
                                        >
                                            Done
                                        </button>
                                        <button 
                                            type="button" 
                                            className="ticket-print-btn" 
                                            onClick={() => window.print()}
                                        >
                                            🖨️ Print Ticket
                                        </button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MeetTheGuide;
