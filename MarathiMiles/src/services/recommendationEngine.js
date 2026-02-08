// src/services/recommendationEngine.js

import { maharashtraPlaces } from './maharashtraData';

export class SmartRecommendationEngine {
  
  recommendPlaces(userProfile, topN = 10) {
    const {
      mood,
      tripType,
      budget,
      interests = [],
      duration,
      travelGroup,
      ageGroup,
      pace,
      season,
      accommodation,
      foodPreference,
      physicalActivity
    } = userProfile;

    console.log('🔍 User Profile for Recommendations:', userProfile);

    // Step 1: Score each place based on user preferences
    const scoredPlaces = maharashtraPlaces.map(place => {
      let rawScore = 0; // keep raw (float) score for better tie-breaking
      const reasons = [];

      // 1. MOOD MATCHING (Highest Priority - 40 points)
      if (place.moodTags && place.moodTags.includes(mood?.toLowerCase())) {
        rawScore += 40;
        reasons.push(`Perfect for ${mood} mood`);
      }

      // 2. TRIP TYPE MATCHING (30 points)
      if (tripType && place.category?.some(cat => 
        cat.toLowerCase().includes(tripType.toLowerCase()))) {
        rawScore += 30;
        reasons.push(`Great for ${tripType} trips`);
      }

      // 3. INTERESTS MATCHING (25 points)
      if (interests.length > 0 && place.interests) {
        const matchedInterests = interests.filter(interest =>
          place.interests.some(placeInterest =>
            placeInterest.toLowerCase().includes(interest.toLowerCase())
          )
        );
        rawScore += matchedInterests.length * 8;
        if (matchedInterests.length > 0) {
          reasons.push(`Matches interests: ${matchedInterests.join(', ')}`);
        }
      }

      // 4. BUDGET COMPATIBILITY (20 points)
      if (budget && this.isBudgetCompatible(place.budget, budget)) {
        rawScore += 20;
        reasons.push(`Fits your ${budget} budget`);
      }

      // 5. DURATION MATCHING (15 points)
      if (duration && this.isDurationCompatible(place.duration, duration)) {
        rawScore += 15;
        reasons.push(`Perfect for ${duration} trip`);
      }

      // 6. TRAVEL GROUP SUITABILITY (15 points)
      if (travelGroup && place.recommendedFor?.some(group =>
        group.toLowerCase().includes(travelGroup.toLowerCase()))) {
        rawScore += 15;
        reasons.push(`Ideal for ${travelGroup} travel`);
      }

      // 7. PHYSICAL ACTIVITY MATCH (10 points)
      if (physicalActivity && this.isActivityCompatible(place, physicalActivity)) {
        rawScore += 10;
        reasons.push(`Matches your ${physicalActivity} activity level`);
      }

      // 8. SEASON COMPATIBILITY (10 points)
      if (season && this.isSeasonGood(place.bestSeason, season)) {
        rawScore += 10;
        reasons.push(`Great in ${season}`);
      }

      // 9. AGE GROUP SUITABILITY (5 points)
      if (ageGroup && this.isAgeSuitable(place, ageGroup)) {
        rawScore += 5;
        reasons.push(`Suitable for ${ageGroup} age group`);
      }

      // 10. ADD RANDOMNESS FOR VARIETY (0-5 points)
      rawScore += Math.random() * 5;

      const rounded = Math.round(rawScore);

      return {
        place: {
          ...place,
          matchScore: rounded,
          matchPercentage: Math.min(100, rounded),
          // expose reasons under both keys to keep compatibility
          recommendationReasons: reasons,
          matchReasons: reasons
        },
        // keep raw score (not rounded) for sorting to reduce tied scores
        score: rawScore
      };
    });

    // Step 2: Sort by score (highest first). If scores tie, break ties randomly
    scoredPlaces.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return Math.random() - 0.5;
    });

    // Debug: log top scores to help trace why the same places are returned
    console.debug('🔢 Top scores snapshot:', scoredPlaces.slice(0, 10).map(p => ({ id: p.place.id, name: p.place.name, score: Math.round(p.score) })));

    // Step 3: Return top N with itineraries
    const topPlaces = scoredPlaces.slice(0, topN).map(item => ({
      ...item,
      itinerary: this.generateItinerary(item.place, userProfile)
    }));

    console.log('🎯 Top Recommended Places:', topPlaces);
    return topPlaces;
  }

  // Budget compatibility check
  isBudgetCompatible(placeBudget, userBudget) {
    const budgetLevels = {
      'low': 1, 'budget': 1,
      'medium': 2, 'mid-range': 2,
      'high': 3, 'luxury': 3
    };

    const placeLevel = budgetLevels[placeBudget?.toLowerCase()] || 2;
    const userLevel = budgetLevels[userBudget?.toLowerCase()] || 2;

    return placeLevel <= userLevel;
  }

  // Duration compatibility check
  isDurationCompatible(placeDuration, userDuration) {
    if (!placeDuration || !userDuration) return true;
    
    const placeDays = this.extractDays(placeDuration);
    const userDays = this.extractDays(userDuration);
    
    return placeDays <= userDays + 1; // Allow 1 day flexibility
  }

  extractDays(duration) {
    if (duration.includes('1 Day')) return 1;
    if (duration.includes('2-3') || duration.includes('Weekend')) return 2;
    if (duration.includes('1 Week')) return 7;
    if (duration.includes('2 Weeks')) return 14;
    return 2;
  }

  // Physical activity compatibility
  isActivityCompatible(place, userActivity) {
    const activityLevels = {
      'light': ['nature', 'beach', 'spiritual', 'relaxing'],
      'moderate': ['trekking', 'water-sports', 'camping'],
      'active': ['adventure', 'trek', 'wildlife'],
      'extreme': ['adventure', 'water-sports', 'trekking']
    };

    return place.category?.some(cat => 
      activityLevels[userActivity?.toLowerCase()]?.includes(cat)
    ) || false;
  }

  // Season compatibility
  isSeasonGood(placeSeason, userSeason) {
    if (!placeSeason) return true;
    
    const seasonMap = {
      'summer': ['All year', 'Oct–Jun', 'Oct–May', 'All year'],
      'monsoon': ['All year', 'Jun–Sep', 'Monsoon'],
      'winter': ['Oct–Feb', 'Oct–Mar', 'Nov–Feb', 'All year', 'Oct–Jun'],
      'spring': ['Aug–Sep', 'All year']
    };

    return seasonMap[userSeason?.toLowerCase()]?.some(goodSeason =>
      placeSeason.includes(goodSeason)
    ) || false;
  }

  // Age group suitability
  isAgeSuitable(place, ageGroup) {
    const agePreferences = {
      '<18': ['family', 'friends', 'adventure seekers'],
      '18-30': ['friends', 'couple', 'adventure seekers', 'solo'],
      '30-50': ['family', 'couple', 'friends'],
      '50+': ['family', 'couple', 'solo', 'spiritual seekers']
    };

    return place.recommendedFor?.some(group =>
      agePreferences[ageGroup]?.includes(group)
    ) || true;
  }

  // Generate dynamic itinerary
  generateItinerary(place, userProfile) {
    const days = this.extractDays(userProfile.duration || place.duration);
    
    const itinerary = [];
    for (let i = 1; i <= days; i++) {
      const dayPlan = {
        day: i,
        title: this.getDayTitle(i, days, place),
        activities: this.generateActivities(place, i, days, userProfile)
      };
      itinerary.push(dayPlan);
    }

    return {
      placeId: place.id,
      placeName: place.name,
      totalDays: days,
      itinerary
    };
  }

  getDayTitle(day, totalDays, place) {
    if (day === 1) return `Arrival at ${place.name}`;
    if (day === totalDays) return 'Departure & Final Exploration';
    if (day === 2 && totalDays > 2) return `Deep Dive into ${place.name}`;
    return `Day ${day} Adventure`;
  }

  generateActivities(place, day, totalDays, userProfile) {
    const activities = [];
    const pace = userProfile.pace || 'moderate';

    if (day === 1) {
      activities.push(
        `Travel to ${place.location} ${this.getTravelMode(userProfile.travelMode)}`,
        `Check into ${this.getAccommodation(userProfile.accommodation)}`,
        `Explore ${place.highlights?.[0] || 'the main attraction'}`,
        `Enjoy ${this.getFoodExperience(userProfile.foodPreference)} for dinner`
      );
    } else if (day === totalDays) {
      activities.push(
        `Visit ${place.highlights?.slice(1, 3).join(' and ') || 'remaining attractions'}`,
        `Last minute ${userProfile.interests?.[0] || 'sightseeing'} activities`,
        `Local shopping and souvenir collection`,
        `Departure preparation and return journey`
      );
    } else {
      // Middle days - vary based on pace
      const morningActivity = pace === 'fast' ? 
        `Early start: ${place.highlights?.[day] || 'exploration'}` :
        `Morning: ${place.highlights?.[day] || 'leisurely exploration'}`;
      
      activities.push(
        morningActivity,
        `Lunch: ${this.getFoodExperience(userProfile.foodPreference)}`,
        pace === 'relaxed' ? 
          `Relaxed afternoon at local spots` :
          `Afternoon: ${place.interests?.[day % place.interests?.length] || 'activities'}`,
        `Evening: Enjoy local culture and ${userProfile.interests?.[1] || 'entertainment'}`
      );
    }

    return activities;
  }

  getTravelMode(mode) {
    const modes = {
      'car/bike': 'by road',
      'bus': 'via bus',
      'train': 'by train', 
      'flight': 'by flight',
      'cruise': 'via cruise'
    };
    return modes[mode?.toLowerCase()] || '';
  }

  getAccommodation(acc) {
    const accommodations = {
      'budget hotel': 'budget hotel',
      'luxury hotel': 'luxury hotel',
      'homestay': 'cozy homestay',
      'resort': 'beautiful resort',
      'camping': 'camping site'
    };
    return accommodations[acc?.toLowerCase()] || 'accommodation';
  }

  getFoodExperience(food) {
    const foods = {
      'local cuisine': 'authentic local cuisine',
      'vegetarian': 'delicious vegetarian food',
      'fine dining': 'fine dining experience',
      'street food': 'local street food'
    };
    return foods[food?.toLowerCase()] || 'local food';
  }
}

// Create instance
export const recommendationEngine = new SmartRecommendationEngine();

// Main export
export function getSmartRecommendations(userProfile, topN = 10) {
  return recommendationEngine.recommendPlaces(userProfile, topN);
}

export default getSmartRecommendations;