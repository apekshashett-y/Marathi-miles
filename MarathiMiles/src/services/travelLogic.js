// Path: src/services/travelLogic.js
// Recommendation & itinerary generation logic.
// Input: userProfile {
//   mood: "Happy", tripType: "beach" or null, budget: "budget|mid-range|high",
//   interests: ["Beaches", "Trekking"], duration: "1-2 days" etc.
// }
// Output: { recommendations: [...], itinerary: {...} }

import places from "./maharashtraData";

/**
 * Score each place against user profile and return top N
 */
export function recommendPlaces(profile, topN = 5) {
  const { mood, tripType, budget, interests = [], duration } = profile;

  // normalize inputs
  const userMood = (mood || "").toLowerCase();
  const userTripType = tripType ? tripType.toLowerCase() : null;
  const userBudget = (budget || "").toLowerCase();
  const userInterests = (interests || []).map(i => i.toLowerCase());

  const scored = places.map(place => {
    let score = 0;

    // 1) Mood tag match — strong weight
    if (place.moodTags && place.moodTags.map(m => m.toLowerCase()).includes(userMood)) {
      score += 40;
    }

    // 2) Interest intersection — medium weight
    if (userInterests.length > 0 && place.interests) {
      const common = place.interests.filter(i => userInterests.includes(String(i).toLowerCase()));
      score += common.length * 10;
    }

    // 3) Trip type match — medium weight
    if (userTripType && place.category && place.category.map(c => c.toLowerCase()).includes(userTripType)) {
      score += 12;
    }

    // 4) Budget compatibility — small weight
    if (userBudget && place.budget && place.budget.toLowerCase() === userBudget) {
      score += 8;
    } else if (userBudget && place.budget) {
      // if not exact but compatible (e.g., user mid-range and place budget is budget)
      const mapping = { budget: 1, "mid-range": 2, high: 3 };
      const diff = Math.abs((mapping[userBudget] || 2) - (mapping[place.budget] || 2));
      score += Math.max(0, 5 - diff); // smaller diff -> higher score
    }

    // 5) Duration filter (prefer places that fit user's duration)
    if (duration && place.duration) {
      // simple check: if durations share a number or "1" etc.
      if (place.duration.toLowerCase().includes(duration.toLowerCase().split(" ")[0])) {
        score += 6;
      }
    }

    // 6) Popular fallback: small random component to vary results
    score += Math.random() * 3;

    return { place, score };
  });

  // sort by score desc
  scored.sort((a, b) => b.score - a.score);

  // pick topN and return only place objects
  const recommendations = scored.slice(0, topN).map(s => ({
    ...s.place,
    score: Math.round(s.score * 100) / 100
  }));

  return recommendations;
}

/**
 * Generate a simple day-wise itinerary for a single place based on duration.
 * duration input examples: "1-2 days", "2-3 days", "1 day", "1 week"
 */
export function generateItineraryForPlace(place, durationLabel) {
  // Normalize number of days
  let days = 2;
  if (!durationLabel) durationLabel = place.duration || "2 days";

  const label = durationLabel.toLowerCase();
  if (label.includes("1 day") || label.includes("1-day")) days = 1;
  else if (label.includes("2-3") || label.includes("2-3 days")) days = 3;
  else if (label.includes("1 week") || label.includes("7")) days = 7;
  else if (label.includes("2-3") || label.includes("2-3")) days = 3;
  else if (label.includes("2") || label.includes("2 days")) days = 2;

  // base activities (customizable)
  const activities = [
    `Visit main highlights of ${place.name} (${place.highlights?.slice(0, 2).join(", ") || "sightseeing"})`,
    `Experience local cuisine and markets`,
    `Visit a nearby cultural / heritage site`,
    `Relax at recommended spot (beach/lake/viewpoint) / local photo spots`
  ];

  // create day-wise list
  const itinerary = [];
  for (let i = 1; i <= days; i++) {
    const dayPlan = {
      day: i,
      plans: []
    };

    // Always include a morning activity, afternoon, evening template
    const morning = activities[0];
    const afternoon = activities[1];
    const evening = activities.length > 2 ? activities[2] : "Relax and explore local area";

    // Fine tune by day number
    if (days === 1) {
      dayPlan.plans.push(
        `Morning: ${morning}`,
        `Afternoon: ${afternoon}`,
        `Evening: ${evening}`
      );
    } else {
      dayPlan.plans.push(
        `Morning: ${morning}`,
        `Afternoon: ${afternoon}`,
        `Evening: ${evening}`
      );

      // Add a special activity on middle days if multi-day
      if (i === Math.ceil(days / 2) && place.highlights && place.highlights.length > 2) {
        dayPlan.plans.push(`Special: Explore ${place.highlights.slice(2, 4).join(", ")}`);
      }

      // Last day wind-down
      if (i === days) {
        dayPlan.plans.push("Wrap up: Checkout and plan return journey");
      }
    }

    itinerary.push(dayPlan);
  }

  return {
    placeId: place.id,
    placeName: place.name,
    days,
    itinerary
  };
}

/**
 * Helper: generate full plan for profile: recommended places + itinerary per place
 */
export function generatePlan(profile, topN = 5) {
  const recs = recommendPlaces(profile, topN);
  const plan = recs.map(place => {
    const itinerary = generateItineraryForPlace(place, profile.duration || place.duration);
    return { place, itinerary };
  });

  return { profile, generatedAt: new Date().toISOString(), plan };
}
