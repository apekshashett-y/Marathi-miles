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

    // Normalize mood to lowercase so matching is consistent (frontend may send "Happy", "Calm")
    mood = (mood || 'happy').toLowerCase().trim();

    console.log('🔍 Generating recommendations for:', { mood, userProfile });

    // Ensure we have places loaded
    if (!this.places || this.places.length === 0) {
      console.error('❌ No places loaded');
      return [];
    }

    // Deduplicate places by id (and by name if id missing) so same place never appears twice
    const seenIds = new Set();
    const seenNames = new Set();
    const uniquePlaces = this.places.filter(place => {
      const id = place.id;
      const name = (place.name || '').toLowerCase().trim();
      if (seenIds.has(id) || seenNames.has(name)) return false;
      if (id != null) seenIds.add(id);
      if (name) seenNames.add(name);
      return true;
    });

    // Score each place based on user preferences
    const scoredPlaces = uniquePlaces.map(place => {
      let score = 0;
      const reasons = [];

      // 1. MOOD MATCHING (Highest Priority - 40 points) - mood is already normalized to lowercase
      if (place.moodTags && place.moodTags.some(t => String(t).toLowerCase() === mood)) {
        score += 40;
        reasons.push(`Perfect for ${mood} mood`);
      } else if (place.moodCompatibility && place.moodCompatibility.some(t => String(t).toLowerCase() === mood)) {
        score += 35;
        reasons.push(`Great for ${mood} mood`);
      }

      // 2. TRIP TYPE MATCHING (30 points) - fallback to place.category when tripTypeTags missing
      const tripTypeRaw = place.tripTypeTags || place.category || [];
      const tripTypeTags = Array.isArray(tripTypeRaw) ? tripTypeRaw : (tripTypeRaw ? [tripTypeRaw] : []);
      if (tripType && tripTypeTags.length > 0) {
        const matched = tripTypeTags.some(tag =>
          String(tag).toLowerCase().includes(tripType.toLowerCase())
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

      // 6. TRAVEL GROUP MATCHING (10 points) - fallback to place.recommendedFor, case-insensitive
      const travelGroupsRaw = place.suitableTravelGroups || place.recommendedFor || [];
      const travelGroups = Array.isArray(travelGroupsRaw) ? travelGroupsRaw : (travelGroupsRaw ? [travelGroupsRaw] : []);
      if (travelGroup && travelGroups.length > 0) {
        const travelGroupLower = travelGroup.toLowerCase();
        const matched = travelGroups.some(g =>
          String(g).toLowerCase() === travelGroupLower ||
          String(g).toLowerCase().includes(travelGroupLower)
        );
        if (matched) {
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

    // Sort by score (highest first), then by number of match reasons (more = better), then by place id for stable order
    // This makes different inputs (mood, tripType, interests) produce different rankings
    filteredPlaces.sort((a, b) => {
      if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;
      const aReasons = (a.matchReasons || []).length;
      const bReasons = (b.matchReasons || []).length;
      if (bReasons !== aReasons) return bReasons - aReasons;
      return (a.id || 0) - (b.id || 0);
    });

    // If no matches, return top places by mood
    if (filteredPlaces.length === 0) {
      console.log('⚠️ No matches found, returning mood-based places');
      return uniquePlaces
        .filter(place => {
          const tags = place.moodTags || place.moodCompatibility || [];
          return tags.some(t => String(t).toLowerCase() === mood);
        })
        .slice(0, 8)
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
