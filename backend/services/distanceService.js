class DistanceService {
  /**
   * Calculate distance between two coordinates using Haversine formula
   * @param {number} lat1 - Latitude of first point
   * @param {number} lon1 - Longitude of first point
   * @param {number} lat2 - Latitude of second point
   * @param {number} lon2 - Longitude of second point
   * @returns {Object} Distance in km and miles
   */
  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceKm = R * c;
    const distanceMiles = distanceKm * 0.621371;

    return {
      km: Math.round(distanceKm * 10) / 10, // Round to 1 decimal
      miles: Math.round(distanceMiles * 10) / 10,
      formatted: this.formatDistance(distanceKm)
    };
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  formatDistance(km) {
    if (km < 1) {
      return `${Math.round(km * 1000)}m away`;
    } else if (km < 10) {
      return `${Math.round(km * 10) / 10}km away`;
    } else if (km < 100) {
      return `${Math.round(km)}km away`;
    } else {
      return `${Math.round(km)}km away`;
    }
  }

  /**
   * Sort places by distance from user location
   * @param {Array} places - Array of places with distance property
   * @returns {Array} Sorted places
   */
  sortByDistance(places) {
    return places.sort((a, b) => {
      if (!a.distance || !b.distance) return 0;
      return a.distance.km - b.distance.km;
    });
  }
}

module.exports = new DistanceService();
