// src/components/MoodRecommendation/MoodRecommendation.jsx - COMPLETELY FIXED
import React, { useState, useCallback } from 'react';
import FaceRecognition from './FaceRecognition';
import PlaceRecommendations from './PlaceRecommendations';
import TravelPlan from './TravelPlan';
import TripQuestionnaire from './TripQuestionnaire.jsx';
import getAutomatedTravelPlan from '../../services/automatedTravelApi';
import './MoodRecommendation.css';

const MoodRecommendation = () => {
  const [currentStep, setCurrentStep] = useState('welcome');
  const [detectedMood, setDetectedMood] = useState(null);
  const [recommendedPlaces, setRecommendedPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [travelPlan, setTravelPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userPreferences, setUserPreferences] = useState(null); // ✅ Store user preferences

  // ✅ STEP 1: Face detection
  const handleMoodDetected = useCallback((mood) => {
    console.log('🎭 Mood detected:', mood);
    if (!mood) {
      console.error('❌ No mood detected');
      return;
    }
    setDetectedMood(mood);
    setCurrentStep('questionnaire');
  }, []);

  // ✅ STEP 2: CRITICAL FIX - Handle questionnaire submit with PROPER user preferences storage
  const handleQuestionnaireSubmit = async (questionnaireData) => {
    console.log('📋 Raw questionnaire data received:', questionnaireData);
    
    try {
      setIsLoading(true);
      
      // ✅ EXTRACT USER PROFILE PROPERLY
      const userProfile = questionnaireData.userProfile || questionnaireData.profile || questionnaireData;
      
      console.log('👤 Extracted user profile:', userProfile);
      
      // ✅ CRITICAL: STORE USER PREFERENCES IMMEDIATELY
      const preferences = {
        mood: userProfile.mood || detectedMood,
        ageGroup: userProfile.ageGroup,
        travelGroup: userProfile.travelGroup,
        tripType: userProfile.tripType,
        duration: userProfile.duration, // ✅ Keep original format (e.g., "2 Weeks")
        budget: userProfile.budget,
        interests: userProfile.interests || []
      };
      
      console.log('💾 Storing user preferences:', preferences);
      setUserPreferences(preferences); // ✅ STORE HERE
      
      // ✅ Prepare API data
      const apiData = {
        mood: detectedMood,
        userProfile: preferences
      };
      
      console.log('📤 Sending to API:', apiData);
      
      const result = await getAutomatedTravelPlan(apiData, 5);
      
      if (result?.success && result.data) {
        console.log('✅ API Success:', result.data);
        
        const recommendations = result.data.recommendations || result.data.plan || [];
        
        // ✅ ENSURE DURATION & BUDGET ARE PROPAGATED TO ALL PLACES
        const updatedRecommendations = recommendations.map(rec => ({
          ...rec,
          place: {
            ...rec.place,
            duration: preferences.duration, // ✅ Force user's duration
            budget: preferences.budget      // ✅ Force user's budget
          },
          userPreferences: preferences // ✅ Attach preferences to each recommendation
        }));
        
        console.log('📍 Updated recommendations with user preferences:', updatedRecommendations);
        
        setRecommendedPlaces(updatedRecommendations);
        setCurrentStep('recommendations');
      } else {
        console.log('⚠️ API failed, using fallback');
        const fallbackPlaces = generateFallbackPlaces(detectedMood, preferences);
        setRecommendedPlaces(fallbackPlaces);
        setCurrentStep('recommendations');
      }
    } catch (error) {
      console.error('❌ Error in handleQuestionnaireSubmit:', error);
      
      const userProfile = questionnaireData.userProfile || questionnaireData.profile || questionnaireData || {};
      const preferences = {
        mood: detectedMood,
        duration: userProfile.duration || '2-3 Days',
        budget: userProfile.budget || 'Medium',
        ...userProfile
      };
      
      setUserPreferences(preferences);
      
      const emergencyPlaces = generateFallbackPlaces(detectedMood, preferences);
      setRecommendedPlaces(emergencyPlaces);
      setCurrentStep('recommendations');
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ UPDATED: Fallback places with CORRECT budget (₹5,000)
  const generateFallbackPlaces = (mood, userProfile) => {
    console.log('🔄 Generating fallback places');
    console.log('  Mood:', mood);
    console.log('  User Profile:', userProfile);
    
    const duration = userProfile?.duration || '2-3 Days';
    const budget = userProfile?.budget || 'Medium';
    
    console.log('  Using duration:', duration);
    console.log('  Using budget:', budget);
    
    const moodPlaces = {
      happy: [
        {
          place: {
            id: 1,
            name: "Alibaug Beach",
            location: "Raigad, Maharashtra",
            category: ["beach"],
            interests: ["Beaches", "Water Sports"],
            budget: budget,
            duration: duration,
            recommendedFor: ["Friends", "Couple"],
            moodTags: ["happy", "excited"],
            highlights: ["Beach Activities", "Water Sports", "Local Food"],
            description: "Perfect beach destination for fun and relaxation",
            matchScore: 85,
            matchPercentage: 85,
            coordinates: { lat: 18.6414, lng: 72.8722 },
            baseBudget: calculateBaseBudget(budget, duration), // ✅ Calculate based on duration
            image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop"
          },
          itinerary: generateFallbackItinerary("Alibaug Beach", duration),
          userPreferences: userProfile // ✅ Attach user preferences
        }
      ],
      sad: [
        {
          place: {
            id: 11,
            name: "Kaas Plateau",
            location: "Satara, Maharashtra", 
            category: ["nature"],
            interests: ["Nature", "Photography"],
            budget: budget,
            duration: duration,
            recommendedFor: ["Solo", "Couple"],
            moodTags: ["sad", "calm"],
            highlights: ["Valley of Flowers", "Scenic Views"],
            description: "Peaceful natural retreat for quiet contemplation",
            matchScore: 82,
            matchPercentage: 82,
            coordinates: { lat: 17.7190, lng: 73.8204 },
            baseBudget: calculateBaseBudget(budget, duration),
            image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop"
          },
          itinerary: generateFallbackItinerary("Kaas Plateau", duration),
          userPreferences: userProfile
        }
      ],
      excited: [
        {
          place: {
            id: 16, 
            name: "Kolad River Rafting",
            location: "Raigad, Maharashtra",
            category: ["adventure"],
            interests: ["Rafting", "Adventure"],
            budget: budget,
            duration: duration,
            recommendedFor: ["Friends", "Adventure Seekers"],
            moodTags: ["excited", "happy"],
            highlights: ["White Water Rafting", "Adventure Sports"],
            description: "Thrilling adventure experience for excitement",
            matchScore: 88,
            matchPercentage: 88,
            coordinates: { lat: 18.4330, lng: 73.1116 },
            baseBudget: calculateBaseBudget(budget, duration),
            image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=400&fit=crop"
          },
          itinerary: generateFallbackItinerary("Kolad River Rafting", duration),
          userPreferences: userProfile
        }
      ],
      calm: [
        {
          place: {
            id: 21,
            name: "Bhimashankar Temple",
            location: "Pune, Maharashtra",
            category: ["spiritual"],
            interests: ["Spiritual", "Nature"],
            budget: budget,
            duration: duration,
            recommendedFor: ["Solo", "Family"],
            moodTags: ["calm", "sad"],
            highlights: ["Jyotirlinga Temple", "Forest Trek"],
            description: "Sacred temple for peace and spiritual connection",
            matchScore: 80,
            matchPercentage: 80,
            coordinates: { lat: 19.0700, lng: 73.5330 },
            baseBudget: calculateBaseBudget(budget, duration),
            image: "https://images.unsplash.com/photo-1547996160-81dfd9c9a0c9?w=600&h=400&fit=crop"
          },
          itinerary: generateFallbackItinerary("Bhimashankar Temple", duration),
          userPreferences: userProfile
        }
      ],
      stressed: [
        {
          place: {
            id: 26,
            name: "Matheran Hill Station",
            location: "Raigad, Maharashtra",
            category: ["hill-station"],
            interests: ["Nature", "Peace"],
            budget: budget,
            duration: duration,
            recommendedFor: ["Solo", "Couple"],
            moodTags: ["stressed", "calm"],
            highlights: ["Toy Train", "Scenic Points", "Vehicle-free Zone"],
            description: "Vehicle-free hill station perfect for stress relief",
            matchScore: 85,
            matchPercentage: 85,
            coordinates: { lat: 18.9840, lng: 73.2650 },
            baseBudget: calculateBaseBudget(budget, duration),
            image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop"
          },
          itinerary: generateFallbackItinerary("Matheran Hill Station", duration),
          userPreferences: userProfile
        }
      ]
    };

    const places = moodPlaces[mood?.toLowerCase()] || moodPlaces.happy;
    console.log('✅ Generated fallback places:', places);
    return places;
  };

  // ✅ CRITICAL FIX: Budget calculation based on DURATION and BUDGET LEVEL
  const calculateBaseBudget = (userBudget, duration) => {
    console.log('💰 Calculating budget for:', { userBudget, duration });
    
    // ✅ Per-day budget based on user's budget selection
    const dailyBudgetMap = {
      'Low': 2500,       // ₹2,500 per day for budget travelers
      'Budget': 2500,
      'Medium': 3500,    // ₹3,500 per day for mid-range
      'Mid-range': 3500,
      'High': 7000,      // ₹7,000 per day for luxury
      'Luxury': 7000
    };
    
    const dailyBudget = dailyBudgetMap[userBudget] || 2500;
    
    // ✅ Calculate days from duration
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
    const totalBudget = dailyBudget * days;
    
    console.log('💵 Budget calculation:', {
      dailyBudget,
      days,
      totalBudget
    });
    
    return totalBudget;
  };

  // ✅ UPDATED: Itinerary generation with full 14-day support
  const generateFallbackItinerary = (placeName, duration) => {
    const getDaysFromDuration = (duration) => {
      if (!duration) return 2;
      const durationLower = duration.toLowerCase();
      if (durationLower.includes('1 day')) return 1;
      if (durationLower.includes('weekend') || durationLower.includes('2-3')) return 2;
      if (durationLower.includes('1 week') || durationLower.includes('7 days')) return 7;
      if (durationLower.includes('2 week') || durationLower.includes('14 days')) return 14;
      return 2;
    };

    const days = getDaysFromDuration(duration);
    console.log(`📋 Generating ${days}-day itinerary for ${placeName}`);
    
    const itinerary = [];
    
    for (let i = 1; i <= days; i++) {
      let dayPlan;

      if (i === 1) {
        dayPlan = {
          day: i,
          title: "Arrival & First Impressions",
          activities: [
            `Travel to ${placeName}`,
            "Check into accommodation", 
            "Explore local attractions",
            "Evening relaxation and local cuisine"
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
      } else if (i === 2) {
        dayPlan = {
          day: i,
          title: "Deep Exploration Day",
          activities: [
            "Breakfast with local delicacies",
            "Explore main attractions",
            "Lunch and relaxation", 
            "Evening cultural activities"
          ]
        };
      } else if (i === 7 && days >= 7) {
        dayPlan = {
          day: i,
          title: "Mid-trip Relaxation",
          activities: [
            "Wellness and spa activities",
            "Leisurely lunch",
            "Free time for personal activities",
            "Evening entertainment"
          ]
        };
      } else {
        const themes = [
          "Cultural immersion", "Nature walks", "Historical exploration",
          "Food tours", "Adventure activities", "Wellness day",
          "Shopping spree", "Photography session", "Local experiences",
          "Scenic viewpoints", "Heritage sites", "Culinary delights"
        ];
        const theme = themes[(i - 1) % themes.length];
        
        dayPlan = {
          day: i,
          title: `Day ${i}: ${theme}`,
          activities: [
            `Morning: ${theme} activities`,
            "Local food experience",
            "Afternoon sightseeing",
            "Evening relaxation"
          ]
        };
      }

      itinerary.push(dayPlan);
    }

    return {
      placeId: 1,
      placeName: placeName,
      totalDays: days,
      itinerary
    };
  };

  // ✅ CRITICAL FIX: Place selection with userPreferences
  const handlePlaceSelect = (placeWithItinerary) => {
    console.log('📍 Place selected:', placeWithItinerary);
    console.log('👤 Current user preferences:', userPreferences);
    
    if (!placeWithItinerary) {
      console.error('❌ No place data received');
      return;
    }
    
    try {
      // ✅ CRITICAL: Attach userPreferences to the place
      const placeWithPreferences = {
        ...placeWithItinerary,
        userPreferences: userPreferences // ✅ ATTACH USER PREFERENCES
      };
      
      console.log('✅ Place with attached preferences:', placeWithPreferences);
      
      setSelectedPlace(placeWithItinerary.place || placeWithItinerary);
      setTravelPlan(placeWithPreferences); // ✅ Pass with preferences
      setCurrentStep('plan');
    } catch (error) {
      console.error('❌ Error selecting place:', error);
      
      // Emergency fallback
      const emergencyPlan = {
        place: {
          name: "Maharashtra Destination",
          location: "Maharashtra, India",
          description: "Amazing destination",
          duration: userPreferences?.duration || '2-3 Days',
          budget: userPreferences?.budget || 'Medium',
          image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop"
        },
        itinerary: generateFallbackItinerary("Maharashtra", userPreferences?.duration || '2-3 Days'),
        userPreferences: userPreferences
      };
      
      setSelectedPlace(emergencyPlan.place);
      setTravelPlan(emergencyPlan);
      setCurrentStep('plan');
    }
  };

  // ✅ Navigation handlers
  const restartProcess = () => {
    console.log('🔄 Restarting process');
    setCurrentStep('welcome');
    setDetectedMood(null);
    setRecommendedPlaces([]);
    setSelectedPlace(null);
    setTravelPlan(null);
    setUserPreferences(null);
  };

  const backToRecommendations = () => {
    console.log('⬅️ Back to recommendations');
    if (recommendedPlaces.length > 0) {
      setCurrentStep('recommendations');
      setTravelPlan(null);
    } else {
      setCurrentStep('questionnaire');
    }
  };

  return (
    <div className="mood-recommendation">
      <div className="mood-container">
        {currentStep === 'welcome' && (
          <div className="welcome-step">
            <div className="welcome-content">
              <h1>AI-Powered Maharashtra Travel Guide</h1>
              <p>Let AI analyze your mood and suggest perfect destinations across Maharashtra with detailed travel plans!</p>
              
              <div className="features-grid">
                <div className="feature-card">
                  <i className="fas fa-brain"></i>
                  <h3>Smart Mood Analysis</h3>
                  <p>Advanced AI matches your expression with ideal destinations</p>
                </div>
                <div className="feature-card">
                  <i className="fas fa-database"></i>
                  <h3>Real Maharashtra Data</h3>
                  <p>Comprehensive database of 50+ tourist places</p>
                </div>
                <div className="feature-card">
                  <i className="fas fa-route"></i>
                  <h3>Detailed Itineraries</h3>
                  <p>Complete travel plans with routes and budgets</p>
                </div>
              </div>

              <button 
                className="start-btn"
                onClick={() => setCurrentStep('camera')}
              >
                <i className="fas fa-camera"></i>
                Start Mood Analysis
              </button>


            </div>
          </div>
        )}

        {currentStep === 'camera' && (
          <FaceRecognition 
            onMoodDetected={handleMoodDetected}
            onBack={() => setCurrentStep('welcome')}
            isLoading={isLoading}
          />
        )}

        {currentStep === 'questionnaire' && detectedMood && (
          <TripQuestionnaire 
            onQuestionnaireSubmit={handleQuestionnaireSubmit}
            detectedMood={detectedMood}
            isLoading={isLoading}
            onBack={() => setCurrentStep('camera')}
          />
        )}

        {currentStep === 'recommendations' && (
          <PlaceRecommendations 
            places={recommendedPlaces}
            mood={detectedMood}
            userPreferences={userPreferences} // ✅ PASS USER PREFERENCES
            onPlaceSelect={handlePlaceSelect}
            onBack={() => setCurrentStep('questionnaire')}
          />
        )}

        {currentStep === 'plan' && travelPlan && (
          <TravelPlan 
            plan={travelPlan}
            userPreferences={userPreferences} // ✅ CRITICAL: PASS USER PREFERENCES
            selectedPlace={selectedPlace}
            onRestart={restartProcess}
            onBack={backToRecommendations}
          />
        )}
        
        {/* Loading Overlay */}
        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
            <p>Generating your perfect travel plan...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodRecommendation;