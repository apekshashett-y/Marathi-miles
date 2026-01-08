// src/utils/geolocationService.js

export class GeolocationService {
  static async getCurrentLocation() {
    return new Promise((resolve, reject) => {
      // ✅ First check if geolocation is available
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'));
        return;
      }

      // ✅ Show permission dialog and get precise location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy,
            source: 'gps',
            timestamp: new Date().toISOString()
          };
          console.log('📍 GPS Location detected:', location);
          resolve(location);
        },
        (error) => {
          console.log('📍 GPS Location failed:', this.getErrorMessage(error));
          reject(error);
        },
        {
          enableHighAccuracy: true, // ✅ High accuracy for precise distance
          timeout: 15000, // ✅ 15 seconds timeout
          maximumAge: 60000 // ✅ 1 minute cache
        }
      );
    });
  }

  static getErrorMessage(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return 'Location access denied by user. Using approximate location instead.';
      case error.POSITION_UNAVAILABLE:
        return 'Your location is currently unavailable.';
      case error.TIMEOUT:
        return 'Location request timed out. Please try again.';
      default:
        return 'Unable to detect your location.';
    }
  }

  // ✅ Fallback: Get approximate location by IP
  static async getApproximateLocation() {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      const location = {
        lat: data.latitude,
        lng: data.longitude,
        city: data.city,
        region: data.region,
        country: data.country_name,
        source: 'ip',
        accuracy: 50000, // ✅ IP location is approximate (50km accuracy)
        isApproximate: true
      };
      
      console.log('📍 Approximate location by IP:', location);
      return location;
    } catch (error) {
      // ✅ Ultimate fallback - Mumbai coordinates
      return {
        lat: 19.0760,
        lng: 72.8777,
        city: 'Mumbai',
        region: 'Maharashtra', 
        country: 'India',
        source: 'fallback',
        accuracy: 100000,
        isApproximate: true
      };
    }
  }
}