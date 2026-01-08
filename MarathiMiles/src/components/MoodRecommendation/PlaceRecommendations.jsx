// src/components/MoodRecommendation/PlaceRecommendations.jsx
import React from 'react';
import RecommendationCard from './RecommendationCard.jsx'
import './PlaceRecommendations.css';

const PlaceRecommendations = ({ 
  places, 
  mood, 
  userPreferences, 
  onPlaceSelect, 
  onBack 
}) => {
  
  // Ensure places is an array and handle the new data structure
  const placesData = Array.isArray(places) ? places : [];
  
  // Extract place objects from the new structure
  const placeItems = placesData.map(item => ({
    ...item.place,
    itinerary: item.itinerary
  }));

  console.log('PlaceRecommendations props:', {
    mood,
    validatedMood: mood?.toLowerCase(),
    places: `Array with ${placesData.length} items`,
    placesData: placesData
  });

  const getMoodColor = (mood) => {
    const moodColors = {
      happy: '#4CAF50',
      sad: '#9C27B0', 
      excited: '#FF9800',
      calm: '#2196F3',
      stressed: '#F44336',
      relaxed: '#4CAF50'
    };
    return moodColors[mood?.toLowerCase()] || '#667eea';
  };

  const getMoodIcon = (mood) => {
    const moodIcons = {
      happy: '😊',
      sad: '😔',
      excited: '🎉',
      calm: '🧘',
      stressed: '😥',
      relaxed: '😌'
    };
    return moodIcons[mood?.toLowerCase()] || '🎯';
  };

  const getBudgetColor = (budget) => {
    const budgetColors = {
      'low': '#4CAF50',
      'budget': '#4CAF50',
      'medium': '#FF9800',
      'mid-range': '#FF9800',
      'high': '#F44336',
      'luxury': '#F44336'
    };
    return budgetColors[budget?.toLowerCase()] || '#666';
  };

  const handlePlaceClick = (placeWithItinerary) => {
    console.log('Place selected:', placeWithItinerary);
    onPlaceSelect(placeWithItinerary);
  };

  if (placeItems.length === 0) {
    return (
      <div className="place-recommendations">
        <div className="recommendations-header">
          <button className="back-btn" onClick={onBack}>
            <i className="fas fa-arrow-left"></i> Back
          </button>
          <h2>Recommended Places for {mood} Mood</h2>
        </div>
        <div className="no-places">
          <i className="fas fa-search"></i>
          <h3>No recommendations found</h3>
          <p>Try adjusting your preferences or mood</p>
          <button className="retry-btn" onClick={onBack}>
            Adjust Preferences
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="place-recommendations">
      <div className="recommendations-header">
        <button className="back-btn" onClick={onBack}>
          <i className="fas fa-arrow-left"></i> Back
        </button>
        <div className="header-content">
          <h2>
            <span className="mood-icon">{getMoodIcon(mood)}</span>
            Perfect Places for Your {mood} Mood
          </h2>
          <p className="recommendations-subtitle">
            AI-curated destinations matching your preferences
            {userPreferences && (
              <span className="preferences-summary">
                • {userPreferences.tripType} • {userPreferences.budget} • {userPreferences.duration}
              </span>
            )}
          </p>
        </div>
      </div>

      <div className="recommendations-stats">
        <div className="stat-card">
          <div className="stat-number">{placeItems.length}</div>
          <div className="stat-label">Perfect Matches</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {Math.max(...placeItems.map(p => p.matchPercentage || 0))}%
          </div>
          <div className="stat-label">Best Match Score</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {userPreferences?.interests?.length || 0}
          </div>
          <div className="stat-label">Your Interests</div>
        </div>
      </div>

      {/* ✅ YEH NAYA CODE - REPLACE THE ENTIRE places-grid SECTION */}
<div className="recommendations-grid">
  {placeItems.map((place, index) => {
    const placeWithItinerary = placesData[index];
    
    // Generate match reasons based on real data
    const matchReasons = generateMatchReasons(place, userPreferences, mood);
    
    return (
      <RecommendationCard 
        key={place.id || index}
        place={place}
        matchDetails={{
          matchPercentage: place.matchPercentage || calculateMatchPercentage(place, userPreferences),
          matchReasons: matchReasons
        }}
        onClick={() => handlePlaceClick(placeWithItinerary)}
      />
    );
  })}
</div>

      <div className="recommendations-footer">
        <p className="footer-note">
          💡 <strong>Pro Tip:</strong> These destinations are specially curated based on your 
          <strong> {mood} mood</strong> and personal preferences for the perfect travel experience!
        </p>
        <button className="back-to-prefs-btn" onClick={onBack}>
          <i className="fas fa-sliders-h"></i>
          Adjust Preferences
        </button>
      </div>
    </div>
  );
};
// ✅ YEH HELPER FUNCTIONS ADD KARO (export default se pehle)

const generateMatchReasons = (place, userPreferences, mood) => {
  const reasons = [];
  
  // Mood match
  if (mood && place.moodCompatibility?.includes(mood.toLowerCase())) {
    reasons.push(`Perfect for ${mood} mood`);
  }
  
  // Travel group match
  if (userPreferences?.travelGroup && place.suitableTravelGroups?.includes(userPreferences.travelGroup)) {
    reasons.push(`Great for ${userPreferences.travelGroup}`);
  }
  
  // Trip type match
  if (userPreferences?.tripType && place.tripTypeTags?.includes(userPreferences.tripType)) {
    reasons.push(`Ideal for ${userPreferences.tripType} trips`);
  }
  
  // Budget match
  if (userPreferences?.budget) {
    const userBudget = userPreferences.budget === 'Low' ? 'budget' : 
                      userPreferences.budget === 'Medium' ? 'mid-range' : 'high';
    if (place.budgetCompatibility === userBudget) {
      reasons.push(`Fits your ${userPreferences.budget} budget`);
    }
  }
  
  // Interest match
  if (userPreferences?.interests && place.interestTags) {
    const matchingInterests = userPreferences.interests.filter(interest => 
      place.interestTags.includes(interest)
    );
    if (matchingInterests.length > 0) {
      reasons.push(`Matches: ${matchingInterests.slice(0, 2).join(', ')}`);
    }
  }
  
  // Fallback reasons if no specific matches
  if (reasons.length === 0) {
    reasons.push(
      'Popular destination in Maharashtra',
      'Great value for money',
      'Perfect for your travel style'
    );
  }
  
  return reasons.slice(0, 3); // Max 3 reasons
};

const calculateMatchPercentage = (place, userPreferences) => {
  let score = 70; // Base score
  
  // Add points for matches
  if (userPreferences?.travelGroup && place.suitableTravelGroups?.includes(userPreferences.travelGroup)) score += 10;
  if (userPreferences?.tripType && place.tripTypeTags?.includes(userPreferences.tripType)) score += 10;
  if (userPreferences?.budget && place.budgetCompatibility) {
    const userBudget = userPreferences.budget === 'Low' ? 'budget' : 
                      userPreferences.budget === 'Medium' ? 'mid-range' : 'high';
    if (place.budgetCompatibility === userBudget) score += 10;
  }
  
  return Math.min(score, 95); // Cap at 95%
};

export default PlaceRecommendations;