const express = require('express');
const router = express.Router();
const recommendationService = require('../services/recommendationService');
const distanceService = require('../services/distanceService');
const itineraryService = require('../services/itineraryService');

// POST /api/recommendations/mood-based
// Body: { mood, userProfile: { ageGroup, travelGroup, tripType, duration, budget, interests }, userLocation: { lat, lng } }
router.post('/mood-based', async (req, res) => {
  try {
    const { mood, userProfile, userLocation, multiDestination } = req.body;

    // Validate required fields
    if (!mood) {
      return res.status(400).json({ 
        success: false, 
        message: 'Mood is required' 
      });
    }

    if (!userProfile) {
      return res.status(400).json({ 
        success: false, 
        message: 'User profile is required' 
      });
    }

    console.log('📥 Received recommendation request:', { mood, userProfile, userLocation });

    // Get recommendations based on mood and user profile
    const recommendations = await recommendationService.getRecommendations(
      mood,
      userProfile
    );

    // Calculate distances if user location is provided
    let recommendationsWithDistance = recommendations;
    if (userLocation && userLocation.lat && userLocation.lng) {
      recommendationsWithDistance = recommendations
        .filter(place => place.coordinates && place.coordinates.lat && place.coordinates.lng)
        .map(place => {
          const distance = distanceService.calculateDistance(
            userLocation.lat,
            userLocation.lng,
            place.coordinates.lat,
            place.coordinates.lng
          );
          return {
            ...place,
            distance: {
              km: distance.km,
              miles: distance.miles,
              formatted: distance.formatted
            }
          };
        });

      // Sort by distance (closest first) if distances were calculated
      if (recommendationsWithDistance.length > 0) {
        recommendationsWithDistance.sort((a, b) => {
          if (!a.distance || !b.distance) return 0;
          return a.distance.km - b.distance.km;
        });
      }
    }

    // Deduplicate by place id so the same place never appears twice (e.g. duplicate Lonavala in data)
    const seenPlaceIds = new Set();
    const deduped = recommendationsWithDistance.filter(place => {
      const id = place.id;
      if (id != null && seenPlaceIds.has(id)) return false;
      if (id != null) seenPlaceIds.add(id);
      return true;
    });

    // Generate itineraries for each recommendation
    const recommendationsWithItinerary = deduped.map(place => {
      const itinerary = itineraryService.generateItinerary(
        place,
        userProfile.duration,
        userProfile
      );
      return {
        place: {
          ...place,
          duration: userProfile.duration,
          budget: userProfile.budget
        },
        itinerary,
        matchScore: place.matchScore || 85,
        matchPercentage: place.matchPercentage || 85,
        matchReasons: place.matchReasons || [`Perfect for ${mood} mood`]
      };
    });

    // Limit to top 8 recommendations for better variety (already deduplicated)
    const topRecommendations = recommendationsWithItinerary.slice(0, 8);

    // Generate multi-destination itinerary when requested and duration supports it (1 Week or 2 Weeks)
    let multiDestinationItinerary = null;
    const duration = userProfile?.duration || '';
    const durationLower = duration.toLowerCase();
    const supportsMultiDest = durationLower.includes('1 week') || durationLower.includes('7 days') ||
      durationLower.includes('2 week') || durationLower.includes('14 days');

    if (multiDestination && supportsMultiDest && topRecommendations.length >= 2) {
      const placeObjects = topRecommendations.map(r => r.place);
      multiDestinationItinerary = itineraryService.generateMultiDestinationItinerary(
        placeObjects,
        duration,
        userProfile
      );
    }

    res.json({
      success: true,
      data: {
        mood,
        userProfile,
        recommendations: topRecommendations,
        totalRecommendations: topRecommendations.length,
        multiDestinationItinerary: multiDestinationItinerary,
        generatedAt: new Date().toISOString()
      },
      message: `Found ${topRecommendations.length} perfect destinations for your ${mood} mood!`
    });

  } catch (error) {
    console.error('❌ Error in mood-based recommendations:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate recommendations',
      error: error.message
    });
  }
});

// POST /api/recommendations/calculate-distance
// Body: { userLocation: { lat, lng }, placeId }
router.post('/calculate-distance', async (req, res) => {
  try {
    const { userLocation, placeId } = req.body;

    if (!userLocation || !placeId) {
      return res.status(400).json({
        success: false,
        message: 'User location and place ID are required'
      });
    }

    const places = require('../data/maharashtraPlaces.json');
    const place = places.find(p => p.id === placeId);

    if (!place) {
      return res.status(404).json({
        success: false,
        message: 'Place not found'
      });
    }

    const distance = distanceService.calculateDistance(
      userLocation.lat,
      userLocation.lng,
      place.coordinates.lat,
      place.coordinates.lng
    );

    res.json({
      success: true,
      data: {
        place: {
          id: place.id,
          name: place.name,
          location: place.location
        },
        distance
      }
    });

  } catch (error) {
    console.error('❌ Error calculating distance:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to calculate distance',
      error: error.message
    });
  }
});

module.exports = router;
