class ItineraryService {
  /**
   * Generate itinerary for a place based on duration and user preferences
   * @param {Object} place - Place object
   * @param {string} duration - Trip duration (e.g., "1 Day", "2-3 Days", "1 Week")
   * @param {Object} userProfile - User profile with preferences
   * @returns {Object} Itinerary object
   */
  generateItinerary(place, duration, userProfile = {}) {
    const days = this.getDaysFromDuration(duration);
    const itinerary = [];

    // Use place's itinerary template if available and matches duration
    if (place.itineraryTemplate && place.itineraryTemplate.length > 0) {
      return this.generateFromTemplate(place, days, userProfile);
    }

    // Generate custom itinerary based on place type and duration
    for (let i = 1; i <= days; i++) {
      let dayPlan;

      if (i === 1) {
        dayPlan = this.generateArrivalDay(place, userProfile);
      } else if (i === days) {
        dayPlan = this.generateDepartureDay(place, days, userProfile);
      } else {
        dayPlan = this.generateActivityDay(place, i, days, userProfile);
      }

      itinerary.push(dayPlan);
    }

    return {
      placeId: place.id,
      placeName: place.name,
      totalDays: days,
      itinerary
    };
  }

  generateFromTemplate(place, days, userProfile) {
    const template = place.itineraryTemplate || [];
    const itinerary = [];

    // If requested days match template length, use template as-is
    if (days <= template.length) {
      return {
        placeId: place.id,
        placeName: place.name,
        totalDays: days,
        itinerary: template.slice(0, days)
      };
    }

    // Use all template days
    itinerary.push(...template);

    // Generate additional days that follow the template's style and activities
    for (let i = template.length + 1; i <= days; i++) {
      if (i === days) {
        // Last day is always departure
        itinerary.push(this.generateDepartureDay(place, days, userProfile));
      } else {
        // Generate extension day based on template style
        itinerary.push(this.generateTemplateExtensionDay(place, i, days, userProfile, template));
      }
    }

    return {
      placeId: place.id,
      placeName: place.name,
      totalDays: days,
      itinerary
    };
  }

  generateTemplateExtensionDay(place, dayNumber, totalDays, userProfile, template) {
    // Analyze template to understand the place's activity patterns
    const templateActivities = template.flatMap(day => day.activities);
    const hasBeachActivities = templateActivities.some(activity =>
      activity.toLowerCase().includes('beach') || activity.toLowerCase().includes('water')
    );
    const hasCulturalActivities = templateActivities.some(activity =>
      activity.toLowerCase().includes('fort') || activity.toLowerCase().includes('temple') ||
      activity.toLowerCase().includes('cultural') || activity.toLowerCase().includes('historical')
    );
    const hasNatureActivities = templateActivities.some(activity =>
      activity.toLowerCase().includes('nature') || activity.toLowerCase().includes('scenic') ||
      activity.toLowerCase().includes('view') || activity.toLowerCase().includes('trek')
    );

    // Create varied titles for extension days
    const extensionTitles = [
      'Extended Exploration',
      'Deep Discovery',
      'Local Adventures',
      'Hidden Gems',
      'Cultural Immersion',
      'Nature & Relaxation',
      'Adventure Day'
    ];
    const titleIndex = (dayNumber - template.length - 1) % extensionTitles.length;
    const dayTitle = extensionTitles[titleIndex];

    const activities = [
      `Breakfast with local cuisine`,
    ];

    // Add main activities based on place type with more variety
    if (hasBeachActivities && place.detailedHighlights) {
      const beachHighlights = place.detailedHighlights.filter(h =>
        h.name.toLowerCase().includes('beach') || h.description.toLowerCase().includes('beach')
      );
      if (beachHighlights.length > 0) {
        const highlightIndex = (dayNumber - template.length - 1) % beachHighlights.length;
        const highlight = beachHighlights[highlightIndex];

        // Vary the activity based on day
        const beachActivities = [
          `Visit ${highlight.name} for ${highlight.duration}`,
          `Explore ${highlight.name} and nearby coastal areas`,
          `Relax at ${highlight.name} with water activities`,
          `Discover ${highlight.name} at different times of day`
        ];
        const activityIndex = (dayNumber - template.length - 1) % beachActivities.length;
        activities.push(beachActivities[activityIndex]);

        // Add complementary activities
        const complementaryActivities = [
          `Enjoy water activities and relaxation`,
          `Try local beachside cuisine`,
          `Photography and scenic exploration`,
          `Swimming and beach games`
        ];
        const compIndex = (dayNumber - template.length - 1) % complementaryActivities.length;
        activities.push(complementaryActivities[compIndex]);
      }
    } else if (hasCulturalActivities && place.detailedHighlights) {
      const culturalHighlights = place.detailedHighlights.filter(h =>
        h.name.toLowerCase().includes('fort') || h.name.toLowerCase().includes('temple') ||
        h.description.toLowerCase().includes('historical') || h.description.toLowerCase().includes('cultural')
      );
      if (culturalHighlights.length > 0) {
        const highlightIndex = (dayNumber - template.length - 1) % culturalHighlights.length;
        const highlight = culturalHighlights[highlightIndex];
        activities.push(`Explore ${highlight.name} (${highlight.duration})`);
        activities.push(`Learn about local history and culture`);
      }
    } else if (hasNatureActivities) {
      const natureActivities = [
        `Nature walk and scenic exploration`,
        `Hiking and viewpoint discovery`,
        `Wildlife observation and photography`,
        `Forest trails and natural beauty`
      ];
      const activityIndex = (dayNumber - template.length - 1) % natureActivities.length;
      activities.push(natureActivities[activityIndex]);
      activities.push(`Photography and relaxation in nature`);
    }

    // Add lunch and evening activities
    activities.push(`Lunch featuring local specialties`);

    // Add afternoon activities for variety
    if (dayNumber % 2 === 0) { // Even days get special activities
      const specialActivities = [
        `Visit local artisan workshops`,
        `Explore nearby villages`,
        `Try traditional crafts and shopping`,
        `Meet local community members`
      ];
      const specialIndex = (dayNumber - template.length - 1) % specialActivities.length;
      activities.push(specialActivities[specialIndex]);
    } else {
      activities.push(`Free time for personal activities`);
    }

    activities.push(`Evening relaxation and local experiences`);

    return {
      day: dayNumber,
      title: `Day ${dayNumber}: ${dayTitle}`,
      activities
    };
  }

  generateArrivalDay(place, userProfile) {
    const activities = [
      `Travel to ${place.name} via chosen transport mode`
    ];

    // Add accommodation check-in
    activities.push('Check into accommodation and settle in');

    // Add first activity based on place highlights and user interests
    if (place.detailedHighlights && place.detailedHighlights.length > 0) {
      const firstHighlight = place.detailedHighlights[0];
      const interests = userProfile.interests || [];

      // Prioritize highlights that match user interests
      let prioritizedHighlight = firstHighlight;
      for (const highlight of place.detailedHighlights) {
        if (interests.some(interest =>
          highlight.name.toLowerCase().includes(interest.toLowerCase()) ||
          highlight.description.toLowerCase().includes(interest.toLowerCase())
        )) {
          prioritizedHighlight = highlight;
          break;
        }
      }

      activities.push(`Visit ${prioritizedHighlight.name} (${prioritizedHighlight.duration})`);
    } else if (place.highlights && place.highlights.length > 0) {
      activities.push(`Explore ${place.highlights[0]}`);
    }

    // Add evening activity
    activities.push('Evening relaxation with local cuisine');

    return {
      day: 1,
      title: 'Arrival & First Impressions',
      activities
    };
  }

  generateDepartureDay(place, totalDays, userProfile) {
    const activities = [
      'Breakfast at accommodation'
    ];

    // Add final exploration based on trip length
    if (totalDays <= 2) {
      activities.push('Quick visit to any missed attractions');
    } else {
      activities.push('Final exploration and photography');
    }

    // Add souvenir shopping for longer trips
    if (totalDays >= 3) {
      activities.push('Souvenir shopping at local markets');
    }

    activities.push('Check-out from accommodation');
    activities.push('Return journey with beautiful memories');

    return {
      day: totalDays,
      title: 'Departure & Final Memories',
      activities
    };
  }

  generateActivityDay(place, dayNumber, totalDays, userProfile) {
    const interests = userProfile.interests || [];
    const placeInterests = place.interests || [];
    const activities = [];

    // Morning activity
    activities.push('Breakfast with local cuisine');

    // Main activity based on day number and interests
    const dayProgression = this.getDayProgression(dayNumber, totalDays);
    const mainActivity = this.getMainActivityForDay(place, dayProgress, interests, placeInterests, dayNumber);
    activities.push(mainActivity);

    // Lunch
    activities.push('Lunch featuring local specialties');

    // Afternoon activity
    const afternoonActivity = this.getAfternoonActivityForDay(place, dayProgress, interests, placeInterests, dayNumber);
    if (afternoonActivity) {
      activities.push(afternoonActivity);
    }

    // Evening activity
    activities.push('Evening relaxation and local experiences');

    return {
      day: dayNumber,
      title: `Day ${dayNumber}: ${this.getDayTitle(dayProgress, place)}`,
      activities
    };
  }

  getDayProgression(dayNumber, totalDays) {
    if (totalDays <= 2) return 'intensive'; // Pack everything in
    if (dayNumber === 2) return 'exploration'; // Deep dive
    if (dayNumber === totalDays - 1) return 'relaxation'; // Wind down
    if (totalDays >= 7 && dayNumber > totalDays / 2) return 'extended'; // Longer stays
    return 'balanced'; // Default
  }

  getMainActivityForDay(place, progression, interests, placeInterests, dayNumber) {
    // Get available highlights
    const highlights = place.detailedHighlights || [];
    const highlightIndex = (dayNumber - 1) % Math.max(highlights.length, 1);

    if (highlights.length > 0 && highlightIndex < highlights.length) {
      const highlight = highlights[highlightIndex];
      return `Visit ${highlight.name} (${highlight.duration})`;
    }

    // Fallback to interest-based activities with more variety
    if (placeInterests.includes('Beaches') || interests.includes('Beaches')) {
      const beachActivities = [
        'Beach activities and swimming',
        'Water sports and marine adventures',
        'Coastal exploration and photography',
        'Sunset beach relaxation',
        'Beachside cultural experiences'
      ];
      return beachActivities[(dayNumber - 1) % beachActivities.length];
    }

    if (placeInterests.includes('Trekking') || interests.includes('Trekking')) {
      const trekActivities = [
        'Trekking adventure to viewpoints',
        'Nature walks through scenic trails',
        'Mountain exploration and photography',
        'Forest trekking and wildlife spotting',
        'Hill station exploration'
      ];
      return trekActivities[(dayNumber - 1) % trekActivities.length];
    }

    if (place.category && place.category.includes('spiritual')) {
      const spiritualActivities = [
        'Temple visits and spiritual experience',
        'Meditation and peaceful contemplation',
        'Sacred site exploration',
        'Religious ceremonies and festivals',
        'Spiritual retreats and learning'
      ];
      return spiritualActivities[(dayNumber - 1) % spiritualActivities.length];
    }

    // Default activities with more variety
    const defaultActivities = [
      'Explore main attractions and landmarks',
      'Cultural immersion and local interactions',
      'Nature exploration and scenic beauty',
      'Historical site visits and heritage tours',
      'Local experience activities and traditions',
      'Adventure activities and exploration',
      'Photography and artistic pursuits',
      'Culinary tours and food experiences'
    ];
    return defaultActivities[(dayNumber - 1) % defaultActivities.length];
  }

  getAfternoonActivityForDay(place, progression, interests, placeInterests, dayNumber) {
    // For intensive/short trips, skip afternoon activity
    if (progression === 'intensive') return null;

    // For relaxation days, lighter activities
    if (progression === 'relaxation') {
      return 'Free time for relaxation and personal activities';
    }

    // Interest-based afternoon activities
    if (interests.includes('Photography') || placeInterests.includes('Photography')) {
      return 'Photography session and scenic exploration';
    }

    if (interests.includes('Food') || placeInterests.includes('Food')) {
      return 'Local food tour and culinary experiences';
    }

    if (placeInterests.includes('Adventure')) {
      return 'Adventure activities and exploration';
    }

    // Default afternoon activity for longer trips
    if (progression === 'extended') {
      return 'Extended exploration and free time';
    }

    return null; // No afternoon activity for balanced days
  }

  getDayTitle(progression, place) {
    const titles = {
      intensive: 'Full Day Exploration',
      exploration: 'Deep Discovery',
      balanced: 'Balanced Experience',
      relaxation: 'Relaxed Exploration',
      extended: 'Extended Adventure'
    };

    return titles[progression] || 'Daily Exploration';
  }



  getDaysFromDuration(duration) {
    if (!duration) return 2;

    const durationLower = duration.toLowerCase();
    
    if (durationLower.includes('1 day') || durationLower.includes('day trip')) {
      return 1;
    }
    if (durationLower.includes('weekend') || durationLower.includes('2-3')) {
      return 2;
    }
    if (durationLower.includes('1 week') || durationLower.includes('7 days')) {
      return 7;
    }
    if (durationLower.includes('2 week') || durationLower.includes('14 days')) {
      return 14;
    }

    return 2; // Default to 2 days
  }
}

module.exports = new ItineraryService();
