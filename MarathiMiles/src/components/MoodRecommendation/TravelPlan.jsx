// src/components/MoodRecommendation/TravelPlan.jsx - FIXED VERSION
import React, { useState, useEffect } from 'react';
import { 
  calculateDistance, 
  getDetailedBudget,
  calculateTransportTime, 
  getTransportCost,
  getPerDayBudget,
  initializeUserLocation,
  getUserLocation,
  getLocationSource
} from '../../utils/travelCalculations';
import './TravelPlan.css';

const TravelPlan = ({ plan, selectedPlace, onRestart, onBack, userPreferences }) => {
  const [currentTab, setCurrentTab] = useState('overview');
  const [selectedTransport, setSelectedTransport] = useState('Bus');
  const [dynamicData, setDynamicData] = useState({});
  const [userLocation, setUserLocation] = useState(null);
  const [isLocating, setIsLocating] = useState(true);
  const [locationStatus, setLocationStatus] = useState('detecting');
  const [hotelRecommendations, setHotelRecommendations] = useState([]);
  const [isLoadingHotels, setIsLoadingHotels] = useState(false);

  console.log('🧩 TravelPlan Props:', { userPreferences, selectedPlace, plan });

  // ✅ Extract user preferences
  const getUserDuration = () => {
    if (userPreferences?.duration) return userPreferences.duration;
    if (plan?.userPreferences?.duration) return plan.userPreferences.duration;
    if (selectedPlace?.duration) return selectedPlace.duration;
    return '2-3 Days';
  };

  const getUserBudget = () => {
    if (userPreferences?.budget) return userPreferences.budget;
    if (plan?.userPreferences?.budget) return plan.userPreferences.budget;
    if (selectedPlace?.budget) return selectedPlace.budget;
    return 'Medium';
  };

  const userDuration = getUserDuration();
  const userBudget = getUserBudget();

  const getDaysFromDuration = (duration) => {
    if (!duration) return 2;
    const d = duration.toLowerCase();
    if (d.includes('1 day')) return 1;
    if (d.includes('2-3') || d.includes('weekend')) return 2;
    if (d.includes('1 week') || d.includes('7 days')) return 7;
    if (d.includes('2 week') || d.includes('14 days')) return 14;
    return 2;
  };

  const days = getDaysFromDuration(userDuration);

  const calculateBaseBudget = (budget, duration) => {
    const dailyMap = {
      'Low': 2500, 'Budget': 2500,
      'Medium': 3500, 'Mid-range': 3500,
      'High': 7000, 'Luxury': 7000
    };
    return (dailyMap[budget] || 2500) * getDaysFromDuration(duration);
  };

  // ✅ Get place data with rich details
  const getPlaceData = () => {
    let place = selectedPlace || plan?.place || plan || {
      name: 'Maharashtra Destination',
      location: 'Maharashtra, India',
      description: 'Beautiful destination',
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop',
      coordinates: { lat: 19.0760, lng: 72.8777 },
      transportOptions: [{
        mode: "Bus", costPerKm: 1.5, durationPer100Km: 2.5,
        features: ["Direct service", "Comfortable", "Economical"]
      }],
      detailedHighlights: [{
        name: "Main Attraction", duration: "2-3 hours", cost: 0,
        description: "Scenic spot", bestTime: "Morning"
      }],
      bestSeason: "October to March",
      weatherTips: "Pleasant weather, carry light woolens",
      packingList: ["Comfortable shoes", "Water bottle", "Camera"]
    };

    const prefs = userPreferences || plan?.userPreferences;
    if (prefs) {
      place = {
        ...place,
        duration: prefs.duration || userDuration,
        budget: prefs.budget || userBudget,
        baseBudget: calculateBaseBudget(prefs.budget || userBudget, prefs.duration || userDuration)
      };
    }

    return place;
  };

  const placeData = getPlaceData();

  // Location detection
  useEffect(() => {
    const init = async () => {
      try {
        setIsLocating(true);
        const loc = await initializeUserLocation();
        setUserLocation(loc);
        setLocationStatus(getLocationSource() === 'gps' ? 'precise' : 'approximate');
        
        // ✅ Load hotel recommendations based on user location
        await loadHotelRecommendations(loc);
      } catch (error) {
        console.error('Location detection failed:', error);
        setLocationStatus('failed');
        // Load default hotels if location fails
        loadDefaultHotelRecommendations();
      } finally {
        setIsLocating(false);
      }
    };
    init();
  }, []);

  // Load hotel recommendations based on user location
  const loadHotelRecommendations = async (location) => {
    setIsLoadingHotels(true);
    try {
      // Simulate API call - in real app, replace with actual API
      const userCity = location?.city || 'Mumbai';
      const destination = placeData.name;
      
      // Mock hotel data based on budget
      const hotels = generateHotelRecommendations(userCity, destination, userBudget);
      setHotelRecommendations(hotels);
    } catch (error) {
      console.error('Failed to load hotels:', error);
      loadDefaultHotelRecommendations();
    } finally {
      setIsLoadingHotels(false);
    }
  };

  const loadDefaultHotelRecommendations = () => {
    const defaultHotels = [
      {
        name: 'OYO Flagship Hotel',
        location: placeData.name,
        price: userBudget === 'Low' ? 1200 : userBudget === 'Medium' ? 2500 : 5000,
        rating: 4.2,
        type: userBudget === 'Low' ? 'Budget Hotel' : '3-Star Hotel',
        link: 'https://www.oyorooms.com',
        website: 'OYO',
        amenities: ['Free WiFi', 'AC', 'Breakfast']
      },
      {
        name: 'FabHotel Premium',
        location: `${placeData.name} City Center`,
        price: userBudget === 'Low' ? 1500 : userBudget === 'Medium' ? 3000 : 6000,
        rating: 4.5,
        type: userBudget === 'Medium' ? 'Premium Hotel' : '4-Star Hotel',
        link: 'https://www.fabhotels.com',
        website: 'FabHotels',
        amenities: ['Swimming Pool', 'Restaurant', 'Spa']
      }
    ];
    setHotelRecommendations(defaultHotels);
  };

  const generateHotelRecommendations = (userCity, destination, budget) => {
    const budgetMultiplier = {
      'Low': 1,
      'Medium': 1.8,
      'High': 3.5
    };
    
    const multiplier = budgetMultiplier[budget] || 1.5;
    
    return [
      {
        name: `Luxury ${destination} Resort`,
        location: `${destination} Beach Road`,
        price: Math.round(3000 * multiplier),
        rating: 4.7,
        type: budget === 'High' ? '5-Star Resort' : 'Premium Hotel',
        link: 'https://www.makemytrip.com/hotels',
        website: 'MakeMyTrip',
        amenities: ['Beach View', 'Infinity Pool', 'Spa', 'Fine Dining']
      },
      {
        name: `${destination} Heritage Hotel`,
        location: `${destination} Old City`,
        price: Math.round(1800 * multiplier),
        rating: 4.3,
        type: 'Boutique Hotel',
        link: 'https://www.goibibo.com/hotels',
        website: 'Goibibo',
        amenities: ['Heritage Style', 'Garden', 'Cultural Tours']
      },
      {
        name: `Budget Stay ${destination}`,
        location: `${destination} Station Road`,
        price: Math.round(800 * multiplier),
        rating: 3.8,
        type: 'Budget Hotel',
        link: 'https://www.booking.com',
        website: 'Booking.com',
        amenities: ['Free WiFi', '24/7 Check-in', 'Basic Breakfast']
      },
      {
        name: `${destination} Business Hotel`,
        location: `${destination} Commercial Area`,
        price: Math.round(2200 * multiplier),
        rating: 4.4,
        type: 'Business Hotel',
        link: 'https://www.tripadvisor.com/Hotels',
        website: 'TripAdvisor',
        amenities: ['Business Center', 'Conference Room', 'Gym']
      }
    ];
  };

  // Calculate dynamic data
  useEffect(() => {
    if (!isLocating && placeData.coordinates) {
      const distance = calculateDistance(placeData.coordinates);
      const budgetData = getDetailedBudget(placeData, userBudget, userDuration, selectedTransport);
      
      setDynamicData({
        distance,
        budget: budgetData.total,
        transportCost: budgetData.transportCost,
        stayCost: budgetData.stayCost,
        foodCost: budgetData.foodCost,
        activityCost: budgetData.activityCost,
        stayAndFood: budgetData.stayAndFood,
        transportTime: calculateTransportTime(placeData, selectedTransport),
        perDayBudget: getPerDayBudget(userBudget, userDuration),
        userCity: userLocation?.city || 'Mumbai',
        days
      });
    }
  }, [placeData, selectedTransport, isLocating, userLocation, userDuration, userBudget, days]);

  // ✅ Helper function for activity suggestions
  const getActivitySuggestion = (interest, placeName) => {
    const suggestions = {
      'Beaches': `Try water sports, beach volleyball, or sunset photography at ${placeName}`,
      'Trekking': `Explore nearby trekking trails and viewpoints`,
      'Food': `Food tour of local markets and authentic restaurants`,
      'Photography': `Best spots: Sunrise viewpoints, local markets, heritage sites`,
      'Nature': `Nature walks, bird watching, and scenic photography`,
      'Shopping': `Local handicrafts, traditional items, and souvenirs`,
      'Spiritual': `Temple visits, meditation sessions, and yoga classes`,
      'Adventure': `Rock climbing, rappelling, and adventure sports`
    };
    return suggestions[interest] || `Explore local ${interest.toLowerCase()} activities`;
  };

  // ✅ FIXED: PROFESSIONAL ITINERARY GENERATOR
  const generateProfessionalItinerary = (totalDays) => {
    const itinerary = [];
    const highlights = placeData.detailedHighlights || [];
    
    // Calculate per day budget safely
    const totalBudget = dynamicData.budget || calculateBaseBudget(userBudget, userDuration);
    const perDayBudget = Math.round(totalBudget / totalDays) || 2500;
    
    for (let i = 1; i <= totalDays; i++) {
      let dayPlan;
      
      if (i === 1) {
        dayPlan = {
          day: i,
          title: `Arrival at ${placeData.name}`,
          theme: "Journey & Settlement",
          activities: [
            {
              time: "06:00 AM",
              activity: `Depart from ${dynamicData.userCity || userLocation?.city || 'Mumbai'}`,
              type: "travel",
              duration: dynamicData.transportTime || "3-4 hours",
              cost: 0,
              icon: "🚗"
            },
            {
              time: "10:00 AM",
              activity: `Arrive at ${placeData.name}`,
              type: "arrival",
              duration: "30 mins",
              cost: 0,
              icon: "📍"
            },
            {
              time: "11:00 AM",
              activity: "Check-in to accommodation",
              type: "accommodation",
              duration: "1 hour",
              cost: Math.round((dynamicData.stayCost || 3000) / totalDays) || 1500,
              icon: "🏨",
              tip: "Book in advance for better rates"
            },
            {
              time: "01:00 PM",
              activity: "Lunch at local restaurant",
              type: "food",
              duration: "1 hour",
              cost: 300,
              icon: "🍽️",
              suggestions: ["Try local Maharashtrian thali", "Fresh coastal seafood"]
            },
            {
              time: "03:00 PM",
              activity: highlights[0]?.name || "Explore main attraction",
              type: "sightseeing",
              duration: highlights[0]?.duration || "2-3 hours",
              cost: highlights[0]?.cost || 100,
              icon: "🎯",
              description: highlights[0]?.description || "Main local attraction",
              tip: highlights[0]?.bestTime || "Best visited in afternoon"
            },
            {
              time: "06:00 PM",
              activity: "Sunset viewing at scenic point",
              type: "leisure",
              duration: "1 hour",
              cost: 0,
              icon: "🌅",
              tip: "Bring camera for amazing photos"
            },
            {
              time: "08:00 PM",
              activity: "Dinner & local cuisine experience",
              type: "food",
              duration: "1-2 hours",
              cost: 400,
              icon: "🍜",
              suggestions: ["Local street food tour", "Authentic Maharashtra cuisine"]
            }
          ],
          dayBudget: perDayBudget,
          tips: [
            "Start early to avoid traffic",
            "Keep copies of hotel booking",
            "Exchange some cash for local expenses"
          ]
        };
      } else if (i === totalDays) {
        dayPlan = {
          day: i,
          title: "Departure & Farewell",
          theme: "Last Memories",
          activities: [
            {
              time: "07:00 AM",
              activity: "Breakfast at hotel/local cafe",
              type: "food",
              duration: "1 hour",
              cost: 200,
              icon: "☕"
            },
            {
              time: "09:00 AM",
              activity: "Last-minute sightseeing/photography",
              type: "leisure",
              duration: "2 hours",
              cost: 0,
              icon: "📸",
              tip: "Capture memories of favorite spots"
            },
            {
              time: "11:00 AM",
              activity: "Souvenir shopping",
              type: "shopping",
              duration: "1 hour",
              cost: 500,
              icon: "🛍️",
              suggestions: ["Local handicrafts", "Traditional items", "Food specialties"]
            },
            {
              time: "01:00 PM",
              activity: "Lunch with local specialties",
              type: "food",
              duration: "1 hour",
              cost: 350,
              icon: "🍽️"
            },
            {
              time: "03:00 PM",
              activity: "Check-out from accommodation",
              type: "accommodation",
              duration: "30 mins",
              cost: 0,
              icon: "🏨"
            },
            {
              time: "04:00 PM",
              activity: `Depart for ${dynamicData.userCity || userLocation?.city || 'Mumbai'}`,
              type: "travel",
              duration: dynamicData.transportTime || "3-4 hours",
              cost: 0,
              icon: "🚗"
            }
          ],
          dayBudget: perDayBudget,
          tips: [
            "Pack previous night to save time",
            "Keep some buffer time for delays",
            "Check for items left behind"
          ]
        };
      } else {
        // Middle days - Exploration days
        const highlightIdx = (i - 1) % Math.max(highlights.length, 1);
        const currentHighlight = highlights[highlightIdx] || highlights[0];
        
        dayPlan = {
          day: i,
          title: `Day ${i}: ${currentHighlight?.name || 'Exploration'} Adventure`,
          theme: "Full Day Exploration",
          activities: [
            {
              time: "07:00 AM",
              activity: "Breakfast & morning preparation",
              type: "food",
              duration: "1 hour",
              cost: 200,
              icon: "☕"
            },
            {
              time: "08:30 AM",
              activity: currentHighlight?.name || "Morning attraction visit",
              type: "sightseeing",
              duration: currentHighlight?.duration || "3 hours",
              cost: currentHighlight?.cost || 150,
              icon: "🎯",
              description: currentHighlight?.description || "Major attraction",
              tip: currentHighlight?.bestTime || "Best visited in morning"
            },
            {
              time: "12:00 PM",
              activity: "Lunch at local eatery",
              type: "food",
              duration: "1 hour",
              cost: 300,
              icon: "🍽️"
            },
            {
              time: "02:00 PM",
              activity: highlights[highlightIdx + 1]?.name || "Secondary attraction visit",
              type: "sightseeing",
              duration: "2 hours",
              cost: 100,
              icon: "📍"
            },
            {
              time: "05:00 PM",
              activity: "Leisure time & local market exploration",
              type: "leisure",
              duration: "2 hours",
              cost: 200,
              icon: "🛍️",
              suggestions: ["Local handicrafts", "Street food", "Cultural items"]
            },
            {
              time: "08:00 PM",
              activity: "Dinner & cultural experience",
              type: "food",
              duration: "2 hours",
              cost: 400,
              icon: "🍜",
              tip: "Try local specialties"
            }
          ],
          dayBudget: perDayBudget,
          tips: [
            "Wear comfortable walking shoes",
            "Carry water and snacks",
            "Bargain at local markets"
          ]
        };
      }
      
      itinerary.push(dayPlan);
    }
    
    return itinerary;
  };

  // FIXED: Safely get itinerary data
  const itineraryData = plan?.itinerary?.itinerary || generateProfessionalItinerary(days);
  
  const totalBudget = dynamicData.budget || calculateBaseBudget(userBudget, userDuration);
  const transportCost = dynamicData.transportCost || Math.round(totalBudget * 0.2);
  const stayAndFood = dynamicData.stayAndFood || Math.round(totalBudget * 0.7);
  const activityCost = dynamicData.activityCost || Math.round(totalBudget * 0.1);
  const perDayBudget = dynamicData.perDayBudget || Math.round(totalBudget / days);

  // ✅ AI SUGGESTIONS GENERATOR
  const generateAISuggestions = () => {
    const suggestions = [];
    
    // Weather-based suggestions
    const month = new Date().getMonth();
    if (month >= 5 && month <= 9) {
      suggestions.push({
        type: "weather",
        icon: "🌧️",
        title: "Monsoon Season Alert",
        text: "Carry rain gear and waterproof bags. Some activities may be affected.",
        priority: "high"
      });
    } else if (month >= 10 || month <= 2) {
      suggestions.push({
        type: "weather",
        icon: "☀️",
        title: "Perfect Weather",
        text: "Ideal time to visit! Pleasant weather expected.",
        priority: "low"
      });
    }
    
    // Budget-based suggestions
    if (userBudget === 'Low' || userBudget === 'Budget') {
      suggestions.push({
        type: "budget",
        icon: "💰",
        title: "Money Saving Tips",
        text: "Use local transport, eat at local dhabas, book accommodation in advance for 20-30% discount.",
        priority: "medium"
      });
    }
    
    // Duration-based suggestions
    if (days >= 7) {
      suggestions.push({
        type: "planning",
        icon: "📅",
        title: "Extended Stay Benefits",
        text: "Consider weekly accommodation packages for better rates. Explore nearby places too.",
        priority: "medium"
      });
    }
    
    // Transport-based suggestions
    suggestions.push({
      type: "transport",
      icon: "🚗",
      title: "Best Transport Mode",
      text: `For ${dynamicData.distance || 150}km distance, ${selectedTransport} is recommended. Consider booking return tickets together for discounts.`,
      priority: "high"
    });
    
    // Safety suggestions
    suggestions.push({
      type: "safety",
      icon: "🛡️",
      title: "Safety First",
      text: "Share your itinerary with family. Keep emergency contacts handy. Avoid isolated areas after dark.",
      priority: "high"
    });
    
    return suggestions;
  };

  const aiSuggestions = generateAISuggestions();

  // ✅ Hotel Booking Component
  const renderHotelRecommendations = () => (
    <div className="hotel-recommendations-section">
      <h4>🏨 Recommended Hotels in {placeData.name}</h4>
      <p>Based on your {userBudget} budget and preferences</p>
      
      {isLoadingHotels ? (
        <div className="loading-hotels">
          <div className="spinner-small"></div>
          <p>Loading hotel recommendations...</p>
        </div>
      ) : (
        <div className="hotels-grid">
          {hotelRecommendations.slice(0, 4).map((hotel, index) => (
            <div key={index} className="hotel-card">
              <div className="hotel-header">
                <h5>{hotel.name}</h5>
                <span className="hotel-rating">⭐ {hotel.rating}</span>
              </div>
              <p className="hotel-location">📍 {hotel.location}</p>
              <div className="hotel-details">
                <div className="hotel-price">
                  <strong>₹{hotel.price}/night</strong>
                  <small>{hotel.type}</small>
                </div>
                <div className="hotel-amenities">
                  {hotel.amenities.slice(0, 3).map((amenity, i) => (
                    <span key={i} className="amenity-tag">{amenity}</span>
                  ))}
                </div>
              </div>
              <div className="hotel-booking">
                <a 
                  href={hotel.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="booking-button"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(hotel.link, '_blank', 'noopener,noreferrer');
                  }}
                >
                  Book on {hotel.website} →
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="hotel-booking-platforms">
        <h5>🌐 Also check these platforms:</h5>
        <div className="platform-links">
          <a href="https://www.makemytrip.com/hotels" target="_blank" rel="noopener noreferrer" className="platform-link">
            🏨 MakeMyTrip Hotels
          </a>
          <a href="https://www.goibibo.com/hotels" target="_blank" rel="noopener noreferrer" className="platform-link">
            🏩 Goibibo Hotels
          </a>
          <a href="https://www.booking.com" target="_blank" rel="noopener noreferrer" className="platform-link">
            📅 Booking.com
          </a>
          <a href="https://www.agoda.com" target="_blank" rel="noopener noreferrer" className="platform-link">
            🔍 Agoda
          </a>
        </div>
      </div>
    </div>
  );

  if (isLocating) {
    return (
      <div className="loading-overlay">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <h3>📍 Detecting Your Location...</h3>
          <p>Getting precise distance and route information from {userLocation?.city || 'your location'}</p>
          <button className="skip-btn" onClick={() => setIsLocating(false)}>
            Skip & Use Default Location
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="travel-plan professional">
      {/* Header */}
      <div className="plan-header">
        <div className="plan-nav">
          <button className="back-btn" onClick={onBack}>
            ← Back to Places
          </button>
          <button className="restart-btn" onClick={onRestart}>
            🔄 Start Over
          </button>
        </div>
        
        <h2>Your {userDuration} Travel Plan</h2>
        
        <div className="destination-header">
          <img src={placeData.image} alt={placeData.name} className="destination-image" />
          <div className="destination-info">
            <h3>{placeData.name}</h3>
            <p className="location">📍 {placeData.location}</p>
            
            <div className="user-preferences-badge">
              <span>📅 {userDuration} ({days} days)</span>
              <span>💰 {userBudget} Budget</span>
              <span>📍 {dynamicData.distance || 150} km from {dynamicData.userCity || userLocation?.city || 'Mumbai'}</span>
            </div>
            
            {locationStatus === 'precise' && (
              <div className="location-badge precise">
                ✅ Precise location detected from {userLocation?.city} • Accurate route calculated
              </div>
            )}
            {locationStatus === 'approximate' && (
              <div className="location-badge approximate">
                📍 Approximate location: {userLocation?.city || 'Mumbai'} • Using estimated distances
              </div>
            )}
            
            <p className="description">{placeData.description}</p>
            
            <div className="quick-stats">
              <div className="stat">
                <span className="value">₹{totalBudget.toLocaleString()}</span>
                <span className="label">Total Budget</span>
              </div>
              <div className="stat">
                <span className="value">{days}</span>
                <span className="label">Days</span>
              </div>
              <div className="stat">
                <span className="value">{dynamicData.distance || 150} km</span>
                <span className="label">Distance</span>
              </div>
              <div className="stat">
                <span className="value">{dynamicData.transportTime || '3-4 hrs'}</span>
                <span className="label">Travel Time</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="plan-tabs">
        <button 
          className={currentTab === 'overview' ? 'active' : ''} 
          onClick={() => setCurrentTab('overview')}
        >
          📊 Overview
        </button>
        <button 
          className={currentTab === 'itinerary' ? 'active' : ''} 
          onClick={() => setCurrentTab('itinerary')}
        >
          🗓️ Itinerary ({days} days)
        </button>
        <button 
          className={currentTab === 'budget' ? 'active' : ''} 
          onClick={() => setCurrentTab('budget')}
        >
          💰 Budget Breakdown
        </button>
        <button 
          className={currentTab === 'hotels' ? 'active' : ''} 
          onClick={() => setCurrentTab('hotels')}
        >
          🏨 Hotel Booking
        </button>
        <button 
          className={currentTab === 'transport' ? 'active' : ''} 
          onClick={() => setCurrentTab('transport')}
        >
          🚗 Transport & Route
        </button>
        <button 
          className={currentTab === 'ai-tips' ? 'active' : ''} 
          onClick={() => setCurrentTab('ai-tips')}
        >
          🤖 AI Suggestions
        </button>
      </div>

      {/* Tab Content */}
      <div className="plan-content">
        
        {/* OVERVIEW TAB */}
        {currentTab === 'overview' && (
          <div className="tab-content overview-tab">
            <div className="overview-grid">
              
              <div className="overview-card">
                <h3>🎯 Trip Summary</h3>
                <div className="summary-details">
                  <p><strong>Destination:</strong> {placeData.name}</p>
                  <p><strong>Duration:</strong> {days} days ({userDuration})</p>
                  <p><strong>Budget Level:</strong> {userBudget}</p>
                  <p><strong>Total Cost:</strong> ₹{totalBudget.toLocaleString()}</p>
                  <p><strong>Per Day:</strong> ₹{perDayBudget.toLocaleString()}</p>
                  <p><strong>Distance:</strong> {dynamicData.distance || 150} km</p>
                  <p><strong>Best Season:</strong> {placeData.bestSeason || 'October to March'}</p>
                  <p><strong>Your Location:</strong> {userLocation?.city || 'Mumbai'}</p>
                </div>
              </div>

              <div className="overview-card">
                <h3>🌤️ Weather & Season</h3>
                <p>{placeData.weatherTips || 'Pleasant weather expected. Check forecast before traveling.'}</p>
                <div className="packing-checklist">
                  <h4>📋 Packing Essentials:</h4>
                  <ul>
                    {(placeData.packingList || [
                      'Comfortable walking shoes',
                      'Light clothing',
                      'Water bottle',
                      'Sunscreen & sunglasses',
                      'Camera/phone charger',
                      'Basic medicines'
                    ]).map((item, i) => (
                      <li key={i}>✓ {item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="overview-card highlights-card">
                <h3>⭐ Top Attractions</h3>
                {(placeData.detailedHighlights || []).slice(0, 3).map((highlight, i) => (
                  <div key={i} className="highlight-item">
                    <h4>{highlight.name}</h4>
                    <p>{highlight.description}</p>
                    <div className="highlight-meta">
                      <span>⏱️ {highlight.duration}</span>
                      <span>💰 ₹{highlight.cost}</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
            
            {/* Add hotel preview to overview */}
            {renderHotelRecommendations()}
          </div>
        )}

        {/* ITINERARY TAB - FIXED VERSION */}
        {currentTab === 'itinerary' && (
          <div className="tab-content itinerary-tab">
            <div className="itinerary-header">
              <h3>🗓️ Your {days}-Day Detailed Itinerary</h3>
              <p>Complete day-wise plan with timings, costs, and tips</p>
            </div>

            {Array.isArray(itineraryData) && itineraryData.map((day, idx) => {
              // FIX: Safely get dayBudget with default value
              const dayBudget = day?.dayBudget || perDayBudget;
              
              return (
                <div key={idx} className="day-plan-professional">
                  <div className="day-header">
                    <div className="day-number">Day {day?.day || idx + 1}</div>
                    <div className="day-info">
                      <h4>{day?.title || `Day ${idx + 1}: Exploration`}</h4>
                      <p className="day-theme">{day?.theme || "Day Adventure"}</p>
                      <span className="day-budget">Budget: ₹{dayBudget.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="day-activities">
                    {(Array.isArray(day?.activities) ? day.activities : []).map((activity, actIdx) => (
                      <div key={actIdx} className={`activity-item ${activity.type || 'sightseeing'}`}>
                        <div className="activity-time">
                          <span className="time">{activity.time || "09:00 AM"}</span>
                          <span className="icon">{activity.icon || "📍"}</span>
                        </div>
                        <div className="activity-details">
                          <h5>{activity.activity || "Activity"}</h5>
                          {activity.description && (
                            <p className="activity-desc">{activity.description}</p>
                          )}
                          <div className="activity-meta">
                            <span>⏱️ {activity.duration || "2 hours"}</span>
                            {activity.cost > 0 && (
                              <span>💰 ₹{(activity.cost || 0).toLocaleString()}</span>
                            )}
                          </div>
                          {activity.tip && (
                            <div className="activity-tip">
                              💡 <em>{activity.tip}</em>
                            </div>
                          )}
                          {activity.suggestions && activity.suggestions.length > 0 && (
                            <div className="activity-suggestions">
                              <strong>Suggestions:</strong>
                              <ul>
                                {activity.suggestions.map((sug, i) => (
                                  <li key={i}>{sug}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {day?.tips && day.tips.length > 0 && (
                    <div className="day-tips">
                      <h5>💡 Day {day.day || idx + 1} Tips:</h5>
                      <ul>
                        {day.tips.map((tip, i) => (
                          <li key={i}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
            
            {/* Add hotel booking CTA at the end of itinerary */}
            <div className="itinerary-footer">
              <h4>🏨 Need Accommodation?</h4>
              <p>Check out our curated hotel recommendations for your stay in {placeData.name}</p>
              <button className="view-hotels-btn" onClick={() => setCurrentTab('hotels')}>
                View Hotel Recommendations →
              </button>
            </div>
          </div>
        )}

        {/* BUDGET TAB */}
        {currentTab === 'budget' && (
          <div className="tab-content budget-tab">
            <h3>💰 Complete Budget Breakdown</h3>
            <p className="budget-subtitle">Comprehensive {days}-day budget for {userBudget} travelers from {userLocation?.city || 'Mumbai'}</p>

            <div className="budget-cards">
              <div className="budget-card transport">
                <div className="card-icon">🚗</div>
                <h4>Transport</h4>
                <div className="amount">₹{transportCost.toLocaleString()}</div>
                <p>{selectedTransport} (round trip)</p>
                <small>{dynamicData.distance || 150} km × 2 = {(dynamicData.distance || 150) * 2} km</small>
              </div>

              <div className="budget-card accommodation">
                <div className="card-icon">🏨</div>
                <h4>Stay & Food</h4>
                <div className="amount">₹{stayAndFood.toLocaleString()}</div>
                <p>Accommodation + Meals</p>
                <small>₹{Math.round(stayAndFood / days)}/day × {days} days</small>
              </div>

              <div className="budget-card activities">
                <div className="card-icon">🎯</div>
                <h4>Activities</h4>
                <div className="amount">₹{activityCost.toLocaleString()}</div>
                <p>Entry fees & experiences</p>
                <small>Sightseeing, tickets, etc.</small>
              </div>

              <div className="budget-card total">
                <div className="card-icon">💰</div>
                <h4>Total Budget</h4>
                <div className="amount large">₹{totalBudget.toLocaleString()}</div>
                <p>{days} days • {userBudget} budget</p>
                <small>₹{perDayBudget.toLocaleString()}/day average</small>
              </div>
            </div>

            <div className="budget-details">
              <h4>📊 Detailed Breakdown</h4>
              <table className="budget-table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Percentage</th>
                    <th>Per Day</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>🚗 Transport</td>
                    <td>₹{transportCost.toLocaleString()}</td>
                    <td>{Math.round((transportCost / totalBudget) * 100)}%</td>
                    <td>₹{Math.round(transportCost / days)}</td>
                  </tr>
                  <tr>
                    <td>🏨 Accommodation</td>
                    <td>₹{Math.round(stayAndFood * 0.6).toLocaleString()}</td>
                    <td>{Math.round((stayAndFood * 0.6 / totalBudget) * 100)}%</td>
                    <td>₹{Math.round((stayAndFood * 0.6) / days)}</td>
                  </tr>
                  <tr>
                    <td>🍽️ Food</td>
                    <td>₹{Math.round(stayAndFood * 0.4).toLocaleString()}</td>
                    <td>{Math.round((stayAndFood * 0.4 / totalBudget) * 100)}%</td>
                    <td>₹{Math.round((stayAndFood * 0.4) / days)}</td>
                  </tr>
                  <tr>
                    <td>🎯 Activities</td>
                    <td>₹{activityCost.toLocaleString()}</td>
                    <td>{Math.round((activityCost / totalBudget) * 100)}%</td>
                    <td>₹{Math.round(activityCost / days)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            {/* Hotel booking section in budget tab */}
            {renderHotelRecommendations()}
          </div>
        )}

        {/* NEW HOTEL BOOKING TAB */}
        {currentTab === 'hotels' && (
          <div className="tab-content hotels-tab">
            <div className="hotels-header">
              <h3>🏨 Hotel Recommendations for {placeData.name}</h3>
              <p>Curated based on your {userBudget} budget and preferences</p>
              <div className="location-info">
                <span>📍 Your location: <strong>{userLocation?.city || 'Mumbai'}</strong></span>
                <span>🎯 Destination: <strong>{placeData.name}</strong></span>
                <span>💰 Budget: <strong>{userBudget}</strong></span>
              </div>
            </div>
            
            {renderHotelRecommendations()}
            
            <div className="hotel-booking-tips">
              <h4>💡 Hotel Booking Tips</h4>
              <div className="tips-grid">
                <div className="tip-card">
                  <span className="tip-icon">📅</span>
                  <h5>Best Time to Book</h5>
                  <p>Book 7-14 days in advance for best rates. Last-minute bookings can be 30% more expensive.</p>
                </div>
                <div className="tip-card">
                  <span className="tip-icon">💰</span>
                  <h5>Budget Saving Tips</h5>
                  <p>Look for "Free Cancellation" options. Consider guesthouses or homestays for authentic experience.</p>
                </div>
                <div className="tip-card">
                  <span className="tip-icon">⭐</span>
                  <h5>Check Reviews</h5>
                  <p>Always read recent guest reviews. Check photos uploaded by guests, not just hotel photos.</p>
                </div>
                <div className="tip-card">
                  <span className="tip-icon">📍</span>
                  <h5>Location Matters</h5>
                  <p>Choose hotels near main attractions or public transport to save time and transportation costs.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TRANSPORT & ROUTE TAB */}
        {currentTab === 'transport' && (
          <div className="tab-content transport-tab">
            <h3>🚗 Transport Options & Route</h3>
            <p>From {userLocation?.city || 'Mumbai'} to {placeData.name}</p>

            {/* Route Summary */}
            <div className="route-summary">
              <div className="route-line">
                <div className="route-point start">
                  <div className="point-icon">📍</div>
                  <div className="point-info">
                    <strong>{userLocation?.city || 'Mumbai'}</strong>
                    <small>Starting Point</small>
                  </div>
                </div>
                
                <div className="route-distance">
                  <div className="distance-line"></div>
                  <span>{dynamicData.distance || 150} km</span>
                </div>
                
                <div className="route-point end">
                  <div className="point-icon">🎯</div>
                  <div className="point-info">
                    <strong>{placeData.name}</strong>
                    <small>Destination</small>
                  </div>
                </div>
              </div>
            </div>

            {/* Transport Comparison Table */}
            <h4>🚗 Compare Transport Modes</h4>
            <div className="transport-comparison">
              <table className="transport-table">
                <thead>
                  <tr>
                    <th>Mode</th>
                    <th>Time</th>
                    <th>Cost (Round Trip)</th>
                    <th>Comfort</th>
                    <th>Best For</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {(placeData.transportOptions || []).map((transport, idx) => {
                    const cost = getTransportCost(placeData, transport.mode);
                    const time = calculateTransportTime(placeData, transport.mode);
                    const isSelected = selectedTransport === transport.mode;
                    
                    return (
                      <tr key={idx} className={isSelected ? 'selected' : ''}>
                        <td>
                          <div className="transport-mode">
                            {transport.mode === 'Bus' && '🚌'}
                            {transport.mode === 'Train' && '🚆'}
                            {transport.mode === 'Car' && '🚗'}
                            {transport.mode === 'Bike' && '🏍️'}
                            <strong>{transport.mode}</strong>
                          </div>
                        </td>
                        <td>{time}</td>
                        <td>
                          <strong>₹{cost.toLocaleString()}</strong>
                          <br/>
                          <small>₹{Math.round(cost/2)} one-way</small>
                        </td>
                        <td>
                          {transport.mode === 'Car' && '⭐⭐⭐⭐⭐'}
                          {transport.mode === 'Train' && '⭐⭐⭐⭐'}
                          {transport.mode === 'Bus' && '⭐⭐⭐'}
                          {transport.mode === 'Bike' && '⭐⭐'}
                        </td>
                        <td>
                          <div className="best-for">
                            {(transport.features || []).map((feat, i) => (
                              <span key={i} className="feature-tag">{feat}</span>
                            ))}
                          </div>
                        </td>
                        <td>
                          <button
                            className={`select-btn ${isSelected ? 'selected' : ''}`}
                            onClick={() => setSelectedTransport(transport.mode)}
                          >
                            {isSelected ? '✓ Selected' : 'Select'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* AI Recommendation */}
            <div className="ai-transport-recommendation">
              <div className="ai-badge">🤖 AI Recommendation</div>
              <h4>Recommended: {selectedTransport}</h4>
              <p>
                Based on your {userBudget} budget and {days}-day trip, <strong>{selectedTransport}</strong> offers 
                the best balance of cost (₹{getTransportCost(placeData, selectedTransport).toLocaleString()}) 
                and travel time ({calculateTransportTime(placeData, selectedTransport)}).
              </p>
              {selectedTransport === 'Bus' && (
                <div className="transport-tips">
                  <p>💡 <strong>Bus Travel Tips:</strong></p>
                  <ul>
                    <li>Book sleeper/semi-sleeper for long journeys</li>
                    <li>Popular operators: Maharashtra State Transport, Private AC buses</li>
                    <li>Book 2-3 days in advance for better seats</li>
                    <li>Morning buses (6-8 AM) are usually on time</li>
                  </ul>
                </div>
              )}
              {selectedTransport === 'Train' && (
                <div className="transport-tips">
                  <p>💡 <strong>Train Travel Tips:</strong></p>
                  <ul>
                    <li>Book AC 3-tier or 2-tier for comfort</li>
                    <li>Check train schedules on IRCTC app</li>
                    <li>Arrive 30 mins before departure</li>
                    <li>Trains are usually more punctual</li>
                  </ul>
                </div>
              )}
              {selectedTransport === 'Car' && (
                <div className="transport-tips">
                  <p>💡 <strong>Car Travel Tips:</strong></p>
                  <ul>
                    <li>Start early morning to avoid traffic</li>
                    <li>Take breaks every 2 hours</li>
                    <li>Check vehicle condition before trip</li>
                    <li>Use Google Maps for real-time traffic</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Booking Links */}
            <div className="booking-section">
              <h4>🎫 Book Your Transport</h4>
              <div className="booking-links">
                <a href="https://www.redbus.in" target="_blank" rel="noopener noreferrer" className="booking-link">
                  🚌 Book Bus on RedBus
                </a>
                <a href="https://www.irctc.co.in" target="_blank" rel="noopener noreferrer" className="booking-link">
                  🚆 Book Train on IRCTC
                </a>
                <a href="https://www.zoomcar.com" target="_blank" rel="noopener noreferrer" className="booking-link">
                  🚗 Rent Car on ZoomCar
                </a>
                <a href="https://www.uber.com" target="_blank" rel="noopener noreferrer" className="booking-link">
                  🚖 Book Cab on Uber
                </a>
              </div>
            </div>
          </div>
        )}

        {/* AI SUGGESTIONS TAB */}
        {currentTab === 'ai-tips' && (
          <div className="tab-content ai-tips-tab">
            <div className="ai-header">
              <h3>🤖 AI-Powered Travel Suggestions</h3>
              <p>Smart recommendations based on your trip profile from {userLocation?.city || 'Mumbai'}</p>
            </div>

            <div className="suggestions-grid">
              {aiSuggestions.map((suggestion, idx) => (
                <div key={idx} className={`suggestion-card ${suggestion.priority}`}>
                  <div className="suggestion-icon">{suggestion.icon}</div>
                  <div className="suggestion-content">
                    <h4>{suggestion.title}</h4>
                    <p>{suggestion.text}</p>
                  </div>
                  <div className={`priority-badge ${suggestion.priority}`}>
                    {suggestion.priority === 'high' && '🔴 Important'}
                    {suggestion.priority === 'medium' && '🟡 Recommended'}
                    {suggestion.priority === 'low' && '🟢 Good to Know'}
                  </div>
                </div>
              ))}
            </div>

            {/* Additional AI Insights */}
            <div className="ai-insights">
              <h4>💡 Smart Travel Insights</h4>
              
              <div className="insight-section">
                <h5>📅 Best Time to Book</h5>
                <p>
                  For <strong>{userDuration}</strong> trips, book accommodation 
                  <strong> 7-10 days in advance</strong> for best prices.
                  Weekend rates may be 20-30% higher.
                </p>
              </div>

              <div className="insight-section">
                <h5>💰 Budget Optimization</h5>
                <p>
                  Your <strong>{userBudget}</strong> budget of <strong>₹{totalBudget.toLocaleString()}</strong> is 
                  {userBudget === 'Low' && ' tight but manageable. Focus on street food and budget hotels.'}
                  {userBudget === 'Medium' && ' well-balanced for a comfortable trip with some splurges.'}
                  {userBudget === 'High' && ' generous! You can enjoy premium experiences.'}
                </p>
                {userBudget === 'Low' && (
                  <div className="budget-tips">
                    <strong>Money-Saving Tips:</strong>
                    <ul>
                      <li>🏨 Stay in hostels or budget hotels (₹800-1200/night)</li>
                      <li>🍽️ Eat at local dhabas (₹80-150/meal)</li>
                      <li>🚌 Use public transport</li>
                      <li>🎫 Look for combo deals on attractions</li>
                    </ul>
                  </div>
                )}
              </div>

              <div className="insight-section">
                <h5>🎯 Activity Recommendations</h5>
                <p>Based on your preferences:</p>
                <ul>
                  {(userPreferences?.interests || []).map((interest, i) => (
                    <li key={i}>
                      <strong>{interest}:</strong> {getActivitySuggestion(interest, placeData.name)}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="insight-section">
                <h5>📱 Essential Apps</h5>
                <div className="app-recommendations">
                  <div className="app-card">
                    <span className="app-icon">🗺️</span>
                    <strong>Google Maps</strong>
                    <small>Navigation & local places</small>
                  </div>
                  <div className="app-card">
                    <span className="app-icon">🍽️</span>
                    <strong>Zomato</strong>
                    <small>Restaurant reviews</small>
                  </div>
                  <div className="app-card">
                    <span className="app-icon">🏨</span>
                    <strong>OYO/Goibibo</strong>
                    <small>Budget hotels</small>
                  </div>
                  <div className="app-card">
                    <span className="app-icon">💳</span>
                    <strong>Paytm/PhonePe</strong>
                    <small>Digital payments</small>
                  </div>
                </div>
              </div>

              <div className="insight-section safety">
                <h5>🛡️ Safety & Emergency</h5>
                <div className="emergency-contacts">
                  <p><strong>Emergency Numbers:</strong></p>
                  <ul>
                    <li>🚨 Police: 100</li>
                    <li>🚑 Ambulance: 108</li>
                    <li>🔥 Fire: 101</li>
                    <li>🆘 Women Helpline: 1091</li>
                    <li>🚓 Tourist Police: 1800-111-363</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Download Itinerary */}
            <div className="download-section">
              <button className="download-btn" onClick={() => alert('Download feature coming soon!')}>
                📥 Download Complete Itinerary PDF
              </button>
              <button className="share-btn" onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: `My ${userDuration} Trip to ${placeData.name}`,
                    text: `Check out my ${days}-day travel plan to ${placeData.name}!`
                  });
                } else {
                  alert('Share feature not supported on this browser');
                }
              }}>
                📤 Share This Plan
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelPlan;