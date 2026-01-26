// src/services/backendApi.js
// Backend API service for mood recommendations

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Get mood-based travel recommendations from backend
 * @param {Object} data - { mood, userProfile, userLocation }
 * @returns {Promise} API response
 */
export async function getMoodRecommendations(data) {
  try {
    const response = await fetch(`${API_BASE_URL}/recommendations/mood-based`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('❌ Error fetching mood recommendations:', error);
    throw error;
  }
}

/**
 * Get all places from backend
 * @returns {Promise} API response
 */
export async function getAllPlaces() {
  try {
    const response = await fetch(`${API_BASE_URL}/places`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('❌ Error fetching places:', error);
    throw error;
  }
}

/**
 * Get place by ID
 * @param {number} id - Place ID
 * @returns {Promise} API response
 */
export async function getPlaceById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/places/${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('❌ Error fetching place:', error);
    throw error;
  }
}

/**
 * Get places by mood
 * @param {string} mood - Mood (happy, sad, excited, calm, stressed)
 * @returns {Promise} API response
 */
export async function getPlacesByMood(mood) {
  try {
    const response = await fetch(`${API_BASE_URL}/places/mood/${mood}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('❌ Error fetching places by mood:', error);
    throw error;
  }
}

/**
 * Calculate distance from user location to a place
 * @param {Object} data - { userLocation: { lat, lng }, placeId }
 * @returns {Promise} API response
 */
export async function calculateDistance(data) {
  try {
    const response = await fetch(`${API_BASE_URL}/recommendations/calculate-distance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('❌ Error calculating distance:', error);
    throw error;
  }
}

/**
 * Get user's current location using browser geolocation API
 * @returns {Promise} { lat, lng }
 */
export function getUserLocation() {
  return new Promise((resolve, reject) => {
    // Check if we're in a secure context (required for geolocation)
    if (typeof window !== 'undefined' && window.location) {
      const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname === '';
      const isHttps = window.location.protocol.includes('https');

      console.log('🌐 Location context check:', {
        hostname: window.location.hostname,
        protocol: window.location.protocol,
        isLocalhost,
        isHttps
      });

      if (!isHttps && !isLocalhost) {
        console.warn('⚠️ Geolocation requires HTTPS (or localhost). Using Mumbai as default.');
        resolve({
          lat: 19.0760,
          lng: 72.8777,
        });
        return;
      }
    }

    if (!navigator.geolocation) {
      console.warn('⚠️ Geolocation is not supported by your browser');
      // Default to Mumbai coordinates
      resolve({
        lat: 19.0760,
        lng: 72.8777,
      });
      return;
    }

    // First try with high accuracy and longer timeout
    const highAccuracyOptions = {
      enableHighAccuracy: true,
      timeout: 20000, // 20 seconds timeout
      maximumAge: 300000 // Accept cached position up to 5 minutes old
    };

    console.log('📍 Requesting user location with high accuracy...');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('✅ Successfully got user location:', {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: new Date(position.timestamp).toLocaleString()
        });
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.warn('⚠️ High accuracy location failed:', {
          code: error.code,
          message: error.message
        });

        // Fallback to low accuracy if high accuracy fails
        const lowAccuracyOptions = {
          enableHighAccuracy: false,
          timeout: 15000, // 15 seconds timeout
          maximumAge: 600000 // Accept cached position up to 10 minutes old
        };

        console.log('📍 Retrying with low accuracy...');

        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log('✅ Successfully got user location (low accuracy):', {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              accuracy: position.coords.accuracy,
              timestamp: new Date(position.timestamp).toLocaleString()
            });
            resolve({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (fallbackError) => {
            console.warn('⚠️ Low accuracy location also failed:', {
              code: fallbackError.code,
              message: fallbackError.message
            });

            let fallbackLocation = {
              lat: 19.0760, // Mumbai coordinates as fallback
              lng: 72.8777,
            };

            switch(fallbackError.code) {
              case fallbackError.PERMISSION_DENIED:
                console.warn('📍 Location access denied by user, using Mumbai as default');
                break;
              case fallbackError.POSITION_UNAVAILABLE:
                console.warn('📍 Location information unavailable, using Mumbai as default');
                break;
              case fallbackError.TIMEOUT:
                console.warn('📍 Location request timed out, using Mumbai as default');
                break;
              default:
                console.warn('📍 Unknown location error, using Mumbai as default');
                break;
            }

            resolve(fallbackLocation);
          },
          lowAccuracyOptions
        );
      },
      highAccuracyOptions
    );
  });
}

export default {
  getMoodRecommendations,
  getAllPlaces,
  getPlaceById,
  getPlacesByMood,
  calculateDistance,
  getUserLocation,
};
