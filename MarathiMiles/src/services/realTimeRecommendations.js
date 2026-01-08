// src/services/realTimeRecommendations.js - FIXED INTEREST FILTERING
import { maharashtraPlaces } from './maharashtraData';

export function getRealTimeRecommendations(userProfile) {
  const { mood, tripType, budget, interests = [], duration, travelGroup } = userProfile;

  console.log('🔍 Filtering places for:', { mood, interests, budget, duration });

  // ✅ STEP 1: Filter by INTERESTS (primary filter)
  let filtered = maharashtraPlaces.filter(place => {
    // Interest match - PRIMARY FILTER
    if (interests.length > 0 && place.interests) {
      const hasInterestMatch = interests.some(userInterest =>
        place.interests.some(placeInterest =>
          placeInterest.toLowerCase().includes(userInterest.toLowerCase())
        )
      );
      if (!hasInterestMatch) return false; // Exclude if no interest match
    }

    // Mood compatibility - SECONDARY FILTER
    if (mood && place.moodCompatibility) {
      if (!place.moodCompatibility.includes(mood.toLowerCase())) {
        return false;
      }
    }

    return true;
  });

  console.log(`✅ After interest filtering: ${filtered.length} places`);

  // ✅ STEP 2: If strict filtering gives 0 results, relax to mood only
  if (filtered.length === 0) {
    console.log('⚠️ No interest matches, using mood-based filtering');
    filtered = maharashtraPlaces.filter(place =>
      place.moodCompatibility?.includes(mood?.toLowerCase())
    );
  }

  // ✅ STEP 3: If still 0 results, use top 5 popular places
  if (filtered.length === 0) {
    console.log('⚠️ No mood matches, using popular places');
    filtered = maharashtraPlaces.slice(0, 5);
  }

  // ✅ STEP 4: Calculate match scores
  const scored = filtered.map(place => {
    let score = 60;

    // Interest match (30 points)
    if (interests.length > 0 && place.interests) {
      const matches = interests.filter(int =>
        place.interests.some(pi => pi.toLowerCase().includes(int.toLowerCase()))
      );
      score += matches.length * 10;
    }

    // Mood match (20 points)
    if (mood && place.moodCompatibility?.includes(mood.toLowerCase())) {
      score += 20;
    }

    // Travel group match (10 points)
    if (travelGroup && place.suitableTravelGroups?.includes(travelGroup)) {
      score += 10;
    }

    // Budget match (10 points)
    if (budget && place.budgetCompatibility) {
      const userBudgetLevel = budget === 'Low' || budget === 'Budget' ? 'budget' :
                              budget === 'Medium' || budget === 'Mid-range' ? 'mid-range' : 'high';
      if (place.budgetCompatibility === userBudgetLevel) score += 10;
    }

    const reasons = [];
    if (interests.length > 0) reasons.push(`Matches: ${interests.slice(0, 2).join(', ')}`);
    if (mood) reasons.push(`Perfect for ${mood} mood`);
    if (budget) reasons.push(`Fits ${budget} budget`);

    return {
      ...place,
      matchScore: Math.min(100, score),
      matchPercentage: Math.min(100, score),
      matchReasons: reasons,
      duration: duration || place.duration,
      budget: budget || place.budget
    };
  });

  // ✅ STEP 5: Sort by score
  scored.sort((a, b) => b.matchScore - a.matchScore);

  console.log('🎯 Top 5 matches:', scored.slice(0, 5).map(p => ({
    name: p.name,
    score: p.matchScore,
    interests: p.interests
  })));

  return scored.slice(0, 10);
}

export function getFallbackRecommendations(userProfile) {
  const mood = userProfile.mood?.toLowerCase() || 'happy';
  const duration = userProfile.duration || '2-3 Days';
  const budget = userProfile.budget || 'Medium';

  return maharashtraPlaces.slice(0, 5).map(place => ({
    ...place,
    matchScore: 75,
    matchPercentage: 75,
    matchReasons: ['Popular destination'],
    duration,
    budget
  }));
}

export default { getRealTimeRecommendations, getFallbackRecommendations };