const fs = require('fs');
const path = require('path');

class RecommendationService {
  constructor() {
    this.places = this.loadPlaces();
  }

  loadPlaces() {
    try {
      const placesPath = path.join(__dirname, '../data/maharashtraPlaces.json');
      return JSON.parse(fs.readFileSync(placesPath, 'utf8'));
    } catch (error) {
      console.error('❌ Error loading places:', error);
      return [];
    }
  }

  getRecommendations(mood, userProfile) {
    // Validate inputs
    if (!mood) {
      console.warn('⚠️ No mood provided, using default');
      mood = 'happy';
    }

    if (!userProfile) {
      console.warn('⚠️ No user profile provided, using defaults');
      userProfile = {};
    }

    const {
      tripType,
      budget,
      interests = [],
      duration,
      travelGroup,
      ageGroup,
      pace
    } = userProfile;

    console.log('🔍 Generating recommendations for:', { mood, userProfile });

    // Ensure we have places loaded
    if (!this.places || this.places.length === 0) {
      console.error('❌ No places loaded');
      return [];
    }

    // Score each place based on user preferences
    const scoredPlaces = this.places.map(place => {
      let score = 0;
      const reasons = [];

      // 1. MOOD MATCHING (Highest Priority - 40 points)
      if (place.moodTags && place.moodTags.includes(mood?.toLowerCase())) {
        score += 40;
        reasons.push(`Perfect for ${mood} mood`);
      } else if (place.moodCompatibility && place.moodCompatibility.includes(mood?.toLowerCase())) {
        score += 35;
        reasons.push(`Great for ${mood} mood`);
      }

      // 2. TRIP TYPE MATCHING (30 points)
      if (tripType && place.tripTypeTags) {
        const matched = place.tripTypeTags.some(tag => 
          tag.toLowerCase().includes(tripType.toLowerCase())
        );
        if (matched) {
          score += 30;
          reasons.push(`Great for ${tripType} trips`);
        }
      }

      // 3. INTERESTS MATCHING (25 points)
      if (interests.length > 0 && place.interests) {
        const matchedInterests = interests.filter(interest =>
          place.interests.some(placeInterest =>
            placeInterest.toLowerCase().includes(interest.toLowerCase())
          )
        );
        if (matchedInterests.length > 0) {
          score += matchedInterests.length * 8;
          reasons.push(`Matches interests: ${matchedInterests.join(', ')}`);
        }
      }

      // 4. BUDGET COMPATIBILITY (20 points)
      if (budget && this.isBudgetCompatible(place.budgetCompatibility || place.budget, budget)) {
        score += 20;
        reasons.push(`Fits your ${budget} budget`);
      }

      // 5. DURATION MATCHING (15 points)
      if (duration && place.durationCompatibility) {
        const durationMatch = place.durationCompatibility.some(dur =>
          dur.toLowerCase().includes(duration.toLowerCase())
        );
        if (durationMatch) {
          score += 15;
          reasons.push(`Perfect for ${duration} trip`);
        }
      }

      // 6. TRAVEL GROUP MATCHING (10 points)
      if (travelGroup && place.suitableTravelGroups) {
        if (place.suitableTravelGroups.includes(travelGroup)) {
          score += 10;
          reasons.push(`Ideal for ${travelGroup} travel`);
        }
      }

      // 7. AGE GROUP MATCHING (5 points)
      if (ageGroup && place.suitableAgeGroups) {
        if (place.suitableAgeGroups.includes(ageGroup)) {
          score += 5;
          reasons.push(`Suitable for ${ageGroup} age group`);
        }
      }

      return {
        ...place,
        matchScore: score,
        matchPercentage: Math.min(100, Math.round(score)),
        matchReasons: reasons
      };
    });

    // Filter out places with very low scores (less than 20)
    const filteredPlaces = scoredPlaces.filter(place => place.matchScore >= 20);

    // Sort by score (highest first)
    filteredPlaces.sort((a, b) => b.matchScore - a.matchScore);

    // If no matches, return top places by mood
    if (filteredPlaces.length === 0) {
      console.log('⚠️ No matches found, returning mood-based places');
      return this.places
        .filter(place => 
          place.moodTags && place.moodTags.includes(mood?.toLowerCase())
        )
        .slice(0, 5)
        .map(place => ({
          ...place,
          matchScore: 50,
          matchPercentage: 50,
          matchReasons: [`Recommended for ${mood} mood`]
        }));
    }

    return filteredPlaces;
  }

  isBudgetCompatible(placeBudget, userBudget) {
    const budgetMap = {
      'low': ['low', 'budget'],
      'budget': ['low', 'budget'],
      'medium': ['medium', 'mid-range'],
      'mid-range': ['medium', 'mid-range'],
      'high': ['high', 'luxury'],
      'luxury': ['high', 'luxury']
    };

    const userBudgetLower = userBudget.toLowerCase();
    const placeBudgetLower = (placeBudget || '').toLowerCase();

    if (budgetMap[userBudgetLower]) {
      return budgetMap[userBudgetLower].includes(placeBudgetLower);
    }

    return true; // Default to compatible if unknown
  }
}

module.exports = new RecommendationService();
