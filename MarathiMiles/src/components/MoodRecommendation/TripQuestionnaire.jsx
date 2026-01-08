// components/MoodRecommendation/TripQuestionnaire.jsx
import React, { useState } from 'react';
import './TripQuestionnaire.css';
import getAutomatedTravelPlan from '../../services/automatedTravelApi';
import { getRealTimeRecommendations, getFallbackRecommendations } from '../../services/realTimeRecommendations.js';

const TripQuestionnaire = ({ onQuestionnaireSubmit, detectedMood, isLoading, onBack }) => {
  const [formData, setFormData] = useState({
    ageGroup: '',
    travelGroup: '',
    tripType: '',
    duration: '',
    budget: '',
    interests: []
  });

  const [isGenerating, setIsGenerating] = useState(false);

  // ✅ UPDATED: Budget calculation user ke selected budget aur duration ke according
  const calculateBaseBudget = (userBudget, duration) => {
    // Base budget by duration
    const dailyBudget = {
      'Low': 2500,      // ₹2,500 per day for budget
      'Budget': 2500,
      'Medium': 5000,   // ₹5,000 per day for mid-range  
      'Mid-range': 5000,
      'High': 10000,    // ₹10,000 per day for luxury
      'Luxury': 10000
    };
    
    const daily = dailyBudget[userBudget] || 5000;
    
    // Total budget based on duration
    const getDaysFromDuration = (dur) => {
      if (!dur) return 2;
      const durLower = dur.toLowerCase();
      if (durLower.includes('1 day')) return 1;
      if (durLower.includes('weekend') || durLower.includes('2-3')) return 2;
      if (durLower.includes('1 week') || durLower.includes('7 days')) return 7;
      if (durLower.includes('2 week') || durLower.includes('14 days')) return 14;
      return 2;
    };
    
    const days = getDaysFromDuration(duration);
    return daily * days;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleInterestToggle = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async () => {
    if (isFormValid()) {
      const userProfile = {
        mood: detectedMood,
        ageGroup: formData.ageGroup,
        travelGroup: formData.travelGroup,
        tripType: formData.tripType,
        duration: formData.duration,
        budget: formData.budget,
        interests: formData.interests
      };
      
      setIsGenerating(true);
      
      try {
        // 🎯 FIRST: Try REAL-TIME local recommendations
        console.log('🔍 Starting real-time recommendation search...');
        const realTimeResults = getRealTimeRecommendations(userProfile);
        
        if (realTimeResults.length > 0) {
          console.log('✅ Real-time recommendations found:', realTimeResults.length);
          
          const realTimePlan = {
            userProfile,
            recommendations: realTimeResults,
            totalRecommendations: realTimeResults.length,
            generatedAt: new Date().toISOString(),
            source: 'real-time-local',
            plan: generateItineraryFromRecommendations(realTimeResults, userProfile)
          };
          
          onQuestionnaireSubmit(realTimePlan);
        } else {
          // 🚀 SECOND: If no local matches, try API
          console.log('🔄 No local matches, trying API...');
          const result = await getAutomatedTravelPlan(userProfile, 5);
          
          if (result.success) {
            console.log('✅ API recommendations received');
            onQuestionnaireSubmit(result.data);
          } else {
            // 🆘 THIRD: Fallback to basic recommendations
            console.log('⚠️ API failed, using fallback');
            const fallbackResults = getFallbackRecommendations(userProfile);
            const fallbackPlan = {
              userProfile,
              recommendations: fallbackResults,
              totalRecommendations: fallbackResults.length,
              generatedAt: new Date().toISOString(),
              source: 'fallback',
              plan: generateItineraryFromRecommendations(fallbackResults, userProfile)
            };
            onQuestionnaireSubmit(fallbackPlan);
          }
        }
      } catch (error) {
        console.error('❌ Error generating travel plan:', error);
        // 🚨 ULTIMATE FALLBACK
        const emergencyResults = getFallbackRecommendations({ mood: 'happy', budget: 'mid-range' });
        const emergencyPlan = {
          userProfile,
          recommendations: emergencyResults,
          totalRecommendations: emergencyResults.length,
          generatedAt: new Date().toISOString(),
          source: 'emergency',
          plan: generateItineraryFromRecommendations(emergencyResults, userProfile)
        };
        onQuestionnaireSubmit(emergencyPlan);
      } finally {
        setIsGenerating(false);
      }
    }
  };

  const generateItineraryFromRecommendations = (recommendations, userProfile) => {
    return recommendations.map(place => ({
      place: {
        ...place,
        // ✅ USER KE ACTUAL SELECTED DURATION USE KARO
        duration: userProfile.duration,
        budget: userProfile.budget
      },
      itinerary: generateFallbackItinerary(place, userProfile.duration), // ✅ User ka duration pass karo
      matchScore: place.matchScore,
      matchPercentage: place.matchPercentage,
      matchReasons: place.matchReasons
    }));
  };

  // ✅ UPDATED: Fallback places with user's selected duration and budget
  const generateFallbackPlan = (userProfile) => {
    const duration = userProfile?.duration || '2-3 Days';
    const budget = userProfile?.budget || 'Medium';
    
    const moodPlaces = {
      happy: [
        {
          id: 1,
          name: "Alibaug Beach",
          location: "Raigad, Maharashtra",
          category: ["beach"],
          interests: ["Beaches", "Water Sports"],
          budget: budget, // ✅ User ka budget
          duration: duration, // ✅ User ka duration
          recommendedFor: ["Friends", "Couple"],
          moodTags: ["happy", "excited"],
          highlights: ["Beach Activities", "Water Sports", "Local Food"],
          description: "Perfect beach destination for fun and relaxation",
          matchScore: 85,
          matchPercentage: 85,
          baseBudget: calculateBaseBudget(budget, duration) // ✅ Calculated budget
        }
      ],
      sad: [
        {
          id: 11,
          name: "Kaas Plateau",
          location: "Satara, Maharashtra", 
          category: ["nature"],
          interests: ["Nature", "Photography"],
          budget: budget, // ✅ User ka budget
          duration: duration, // ✅ User ka duration
          recommendedFor: ["Solo", "Couple"],
          moodTags: ["sad", "calm"],
          highlights: ["Valley of Flowers", "Scenic Views"],
          description: "Peaceful natural retreat for quiet contemplation",
          matchScore: 82,
          matchPercentage: 82,
          baseBudget: calculateBaseBudget(budget, duration) // ✅ Calculated budget
        }
      ],
      excited: [
        {
          id: 16, 
          name: "Kolad River Rafting",
          location: "Raigad, Maharashtra",
          category: ["adventure"],
          interests: ["Rafting", "Adventure"],
          budget: budget, // ✅ User ka budget
          duration: duration, // ✅ User ka duration
          recommendedFor: ["Friends", "Adventure Seekers"],
          moodTags: ["excited", "happy"],
          highlights: ["White Water Rafting", "Adventure Sports"],
          description: "Thrilling adventure experience for excitement",
          matchScore: 88,
          matchPercentage: 88,
          baseBudget: calculateBaseBudget(budget, duration) // ✅ Calculated budget
        }
      ],
      calm: [
        {
          id: 21,
          name: "Bhimashankar Temple",
          location: "Pune, Maharashtra",
          category: ["spiritual"],
          interests: ["Spiritual", "Nature"],
          budget: budget, // ✅ User ka budget
          duration: duration, // ✅ User ka duration
          recommendedFor: ["Solo", "Family"],
          moodTags: ["calm", "sad"],
          highlights: ["Jyotirlinga Temple", "Forest Trek"],
          description: "Sacred temple for peace and spiritual connection",
          matchScore: 80,
          matchPercentage: 80,
          baseBudget: calculateBaseBudget(budget, duration) // ✅ Calculated budget
        }
      ],
      stressed: [
        {
          id: 26,
          name: "Matheran Hill Station",
          location: "Raigad, Maharashtra",
          category: ["hill-station"],
          interests: ["Nature", "Peace"],
          budget: budget, // ✅ User ka budget
          duration: duration, // ✅ User ka duration
          recommendedFor: ["Solo", "Couple"],
          moodTags: ["stressed", "calm"],
          highlights: ["Toy Train", "Scenic Points", "Vehicle-free Zone"],
          description: "Vehicle-free hill station perfect for stress relief",
          matchScore: 85,
          matchPercentage: 85,
          baseBudget: calculateBaseBudget(budget, duration) // ✅ Calculated budget
        }
      ]
    };

    const places = moodPlaces[userProfile.mood?.toLowerCase()] || moodPlaces.happy;
    
    return places.map(place => ({
      place,
      itinerary: generateFallbackItinerary(place, userProfile.duration)
    }));
  };

  const generateFallbackItinerary = (place, userSelectedDuration) => {
    // ✅ USER KE SELECTED DURATION KE HISAB SE DAYS CALCULATE KARO
    const getDaysFromUserDuration = (duration) => {
      if (!duration) return 2; // Default weekend
      
      const durationLower = duration.toLowerCase();
      if (durationLower.includes('1 day') || durationLower.includes('day trip')) return 1;
      if (durationLower.includes('weekend') || durationLower.includes('2-3')) return 2;
      if (durationLower.includes('1 week') || durationLower.includes('7 days')) return 7;
      if (durationLower.includes('2 week') || durationLower.includes('14 days')) return 14;
      return 2; // Default to weekend
    };

    const days = getDaysFromUserDuration(userSelectedDuration);
    const itinerary = [];
    
    for (let i = 1; i <= days; i++) {
      let dayPlan;

      if (i === 1) {
        dayPlan = {
          day: i,
          title: "Arrival & First Impressions",
          activities: [
            `Travel to ${place.name}`,
            "Check into accommodation", 
            "Explore local attractions",
            "Evening relaxation and local cuisine experience"
          ]
        };
      } else if (i === days) {
        dayPlan = {
          day: i,
          title: "Departure & Final Memories",
          activities: [
            "Final exploration and photography",
            "Last minute souvenir shopping",
            "Check-out from accommodation",
            "Return journey with beautiful memories"
          ]
        };
      } else {
        // Dynamic activities based on duration
        const activityThemes = [
          "Cultural immersion and local experiences",
          "Nature walks and scenic viewpoints", 
          "Historical sites and heritage exploration",
          "Food tours and culinary experiences",
          "Adventure activities and exploration",
          "Relaxation and wellness activities"
        ];
        
        const theme = activityThemes[(i - 1) % activityThemes.length];
        
        dayPlan = {
          day: i,
          title: `Day ${i}: ${theme.split(' ')[0]} Focus`,
          activities: [
            `Morning: ${theme}`,
            "Local food experience for lunch", 
            "Afternoon sightseeing activities",
            "Evening entertainment and relaxation"
          ]
        };
      }

      itinerary.push(dayPlan);
    }

    return {
      placeId: place.id,
      placeName: place.name,
      totalDays: days,
      itinerary
    };
  };

  // ✅ UPDATED: Emergency fallback with user's preferences
  const generateEmergencyFallback = (userProfile) => {
    const duration = userProfile?.duration || '2-3 Days';
    const budget = userProfile?.budget || 'Medium';
    
    const emergencyPlaces = [
      {
        id: 999,
        name: "Lonavala Hill Station",
        location: "Pune, Maharashtra",
        category: ["hill-station", "nature"],
        interests: ["Nature", "Waterfalls", "Relaxation"],
        budget: budget, // ✅ User ka budget
        duration: duration, // ✅ User ka duration
        recommendedFor: ["Friends", "Family", "Couple"],
        moodTags: ["happy", "calm"],
        highlights: ["Bhushi Dam", "Tiger's Leap", "Local Chikki"],
        description: "Popular hill station perfect for all types of travelers",
        matchScore: 75,
        matchPercentage: 75,
        baseBudget: calculateBaseBudget(budget, duration) // ✅ Calculated budget
      },
      {
        id: 998,
        name: "Alibaug Beach",
        location: "Raigad, Maharashtra", 
        category: ["beach"],
        interests: ["Beaches", "Water Sports", "Relaxation"],
        budget: budget, // ✅ User ka budget
        duration: duration, // ✅ User ka duration
        recommendedFor: ["Friends", "Couple", "Family"],
        moodTags: ["happy", "excited"],
        highlights: ["Beach Activities", "Water Sports", "Local Food"],
        description: "Beautiful beach destination for fun and relaxation",
        matchScore: 78,
        matchPercentage: 78,
        baseBudget: calculateBaseBudget(budget, duration) // ✅ Calculated budget
      }
    ];

    return emergencyPlaces.map(place => ({
      place,
      itinerary: generateFallbackItinerary(place, userProfile.duration)
    }));
  };

  const isFormValid = () => {
    return formData.ageGroup && 
           formData.travelGroup && 
           formData.tripType && 
           formData.duration && 
           formData.budget && 
           formData.interests.length > 0;
  };

  // Options data
  const ageGroups = [
    { value: '<18', label: 'Under 18', icon: '👦' },
    { value: '18-30', label: '18-30', icon: '👨' },
    { value: '30-50', label: '30-50', icon: '👨‍💼' },
    { value: '50+', label: '50+', icon: '👴' }
  ];

  const travelGroups = [
    { value: 'Solo', label: 'Solo', icon: '🚶', description: 'Traveling alone' },
    { value: 'Friends', label: 'Friends', icon: '👥', description: 'With friends' },
    { value: 'Family', label: 'Family', icon: '👨‍👩‍👧‍👦', description: 'Family trip' },
    { value: 'Couple', label: 'Couple', icon: '💑', description: 'Romantic getaway' }
  ];

  const tripTypes = [
    { value: 'Adventure', label: 'Adventure', icon: '🏔️', description: 'Thrilling activities & exploration' },
    { value: 'Relaxing', label: 'Relaxing', icon: '🏖️', description: 'Peaceful & stress-free getaway' },
    { value: 'Heritage', label: 'Heritage', icon: '🏛️', description: 'Historical & cultural sites' },
    { value: 'Nature', label: 'Nature', icon: '🌲', description: 'Natural landscapes & wildlife' },
    { value: 'Spiritual', label: 'Spiritual', icon: '🕉️', description: 'Religious & spiritual destinations' },
    { value: 'Luxury', label: 'Luxury', icon: '🌟', description: 'Premium experiences & comfort' },
    { value: 'Road Trip', label: 'Road Trip', icon: '🚗', description: 'Scenic drives & stops' },
    { value: 'Backpacking', label: 'Backpacking', icon: '🎒', description: 'Budget-friendly exploration' }
  ];

  const durations = [
    { value: '1 Day', label: 'Day Trip', icon: '☀️' },
    { value: '2-3 Days', label: 'Weekend', icon: '📅' },
    { value: '1 Week', label: '1 Week (7 Days)', icon: '🗓️' },
    { value: '2 Weeks', label: '2 Weeks (14 Days)', icon: '✈️' }
  ];

  const budgets = [
    { value: 'Low', label: 'Budget', icon: '💰', range: '₹5,000' },
    { value: 'Medium', label: 'Moderate', icon: '💵', range: '₹5,000 - ₹15,000' },
    { value: 'High', label: 'Luxury', icon: '💎', range: '₹15,000+' }
  ];

  const interests = [
    { value: 'Beaches', label: 'Beaches', icon: '🏖️' },
    { value: 'Forts', label: 'Forts', icon: '🏰' },
    { value: 'Food', label: 'Local Food', icon: '🍜' },
    { value: 'Waterfalls', label: 'Waterfalls', icon: '🌊' },
    { value: 'Wildlife', label: 'Wildlife', icon: '🐘' },
    { value: 'Trekking', label: 'Trekking', icon: '🥾' },
    { value: 'Photography', label: 'Photography', icon: '📸' },
    { value: 'Shopping', label: 'Shopping', icon: '🛍️' },
    { value: 'Yoga', label: 'Yoga', icon: '🧘' },
    { value: 'Museums', label: 'Museums', icon: '🏛️' },
    { value: 'Festivals', label: 'Festivals', icon: '🎉' },
    { value: 'Nightlife', label: 'Nightlife', icon: '🌃' }
  ];

  return (
    <div className="questionnaire-container">
      {/* Header */}
      <div className="questionnaire-header">
        <button className="back-btn" onClick={onBack}>
          <i className="fas fa-arrow-left"></i> Back
        </button>
        <div className="header-content">
          <h1>Plan Your Perfect Trip</h1>
          <p className="mood-indicator">
            <span className="mood">Detected Mood:</span> <span className={`mood-badge mood-${detectedMood?.toLowerCase()}`}>{detectedMood}</span>
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="form-container">
          {/* Age Group */}
          <div className="form-section">
            <div className="section-header">
              <span className="section-icon">👤</span>
              <h3>Your Age Group</h3>
            </div>
            <div className="options-grid compact">
              {ageGroups.map(age => (
                <button
                  key={age.value}
                  className={`option-card ${formData.ageGroup === age.value ? 'selected' : ''}`}
                  onClick={() => handleInputChange('ageGroup', age.value)}
                >
                  <div className="option-icon">{age.icon}</div>
                  <div className="option-label">{age.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Travel Companions */}
          <div className="form-section">
            <div className="section-header">
              <span className="section-icon">👥</span>
              <h3>Travel Companions</h3>
            </div>
            <div className="options-grid compact">
              {travelGroups.map(group => (
                <button
                  key={group.value}
                  className={`option-card ${formData.travelGroup === group.value ? 'selected' : ''}`}
                  onClick={() => handleInputChange('travelGroup', group.value)}
                >
                  <div className="option-icon">{group.icon}</div>
                  <div className="option-label">{group.label}</div>
                  <div className="option-description">{group.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Trip Type */}
          <div className="form-section">
            <div className="section-header">
              <span className="section-icon">🎯</span>
              <h3>Trip Type</h3>
            </div>
            <div className="options-grid">
              {tripTypes.map(type => (
                <button
                  key={type.value}
                  className={`option-card ${formData.tripType === type.value ? 'selected' : ''}`}
                  onClick={() => handleInputChange('tripType', type.value)}
                >
                  <div className="option-icon">{type.icon}</div>
                  <div className="option-label">{type.label}</div>
                  <div className="option-description">{type.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Trip Duration */}
          <div className="form-section">
            <div className="section-header">
              <span className="section-icon">⏱️</span>
              <h3>Trip Duration</h3>
            </div>
            <div className="options-grid compact">
              {durations.map(duration => (
                <button
                  key={duration.value}
                  className={`option-card ${formData.duration === duration.value ? 'selected' : ''}`}
                  onClick={() => handleInputChange('duration', duration.value)}
                >
                  <div className="option-icon">{duration.icon}</div>
                  <div className="option-label">{duration.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div className="form-section">
            <div className="section-header">
              <span className="section-icon">💰</span>
              <h3>Budget Range</h3>
            </div>
            <div className="options-grid compact">
              {budgets.map(budget => (
                <button
                  key={budget.value}
                  className={`option-card ${formData.budget === budget.value ? 'selected' : ''}`}
                  onClick={() => handleInputChange('budget', budget.value)}
                >
                  <div className="option-icon">{budget.icon}</div>
                  <div className="option-label">{budget.label}</div>
                  <div className="option-range">{budget.range}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="form-section">
            <div className="section-header">
              <span className="section-icon">🌟</span>
              <h3>Your Interests (Select Multiple)</h3>
            </div>
            <div className="interests-grid">
              {interests.map(interest => (
                <button
                  key={interest.value}
                  className={`interest-card ${formData.interests.includes(interest.value) ? 'selected' : ''}`}
                  onClick={() => handleInterestToggle(interest.value)}
                >
                  <div className="interest-icon">{interest.icon}</div>
                  <div className="interest-label">{interest.label}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Section */}
        <div className="navigation-section">
          <button 
            className={`submit-btn ${!isFormValid() ? 'disabled' : ''}`}
            onClick={handleSubmit}
            disabled={!isFormValid() || isLoading || isGenerating}
          >
            {(isLoading || isGenerating) ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                {isGenerating ? 'Generating Smart Recommendations...' : 'Creating Your Trip Plan...'}
              </>
            ) : (
              <>
                <i className="fas fa-magic"></i>
                Generate My Smart Trip Plan
              </>
            )}
          </button>

          {/* Quick Stats */}
          <div className="quick-stats">
            <div className="stat-item">
              <div className="stat-number">
                {Object.values(formData).filter(val => val !== '' && !Array.isArray(val)).length}/5
              </div>
              <div className="stat-label">Questions Answered</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{formData.interests.length}</div>
              <div className="stat-label">Interests Selected</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">
                {isFormValid() ? '✅' : '❌'}
              </div>
              <div className="stat-label">Ready to Submit</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripQuestionnaire;