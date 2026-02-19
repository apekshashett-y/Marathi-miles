/**
 * PHASE 3 — Accurate Lat/Lng → Percent Conversion
 * GIS-grade projection utility for illustrated fort map rendering.
 *
 * Converts geographic coordinates to percentage-based CSS positions
 * for accurate overlay on a custom illustrated fort image/SVG.
 *
 * @param {number} lat - Latitude of the location
 * @param {number} lng - Longitude of the location
 * @param {Object} bounds - Geographic bounding box { north, south, east, west }
 * @returns {{ xPercent: number, yPercent: number }} CSS percentage positions
 */
export function convertToMapPosition(lat, lng, bounds) {
    // X (left): west=0%, east=100%
    const xPercent =
        ((lng - bounds.west) / (bounds.east - bounds.west)) * 100;

    // Y (top): north=0%, south=100% (inverted because CSS top increases downward)
    const yPercent =
        ((bounds.north - lat) / (bounds.north - bounds.south)) * 100;

    return { xPercent, yPercent };
}

/**
 * Convert all locations in an array to map positions.
 * Logs each location's geo-projection for verification.
 *
 * @param {Array} locations - Array of location objects with lat/lng
 * @param {Object} bounds - Geographic bounding box
 * @returns {Array} Locations enriched with { xPercent, yPercent }
 */
export function projectLocations(locations, bounds) {
    return locations.map((loc) => {
        const { xPercent, yPercent } = convertToMapPosition(loc.lat, loc.lng, bounds);

        // PHASE 5 — Logging Verification
        console.log(
            `GeoPosition: ${loc.name} → x: ${xPercent.toFixed(2)}%, y: ${yPercent.toFixed(2)}%`
        );

        return {
            ...loc,
            xPercent,
            yPercent,
        };
    });
}

/**
 * Build an SVG viewBox coordinate for a given lat/lng and bounds,
 * mapping into an SVG coordinate space of given width/height.
 *
 * @param {number} lat
 * @param {number} lng
 * @param {Object} bounds
 * @param {number} svgWidth  - e.g. 1000
 * @param {number} svgHeight - e.g. 800
 * @returns {{ x: number, y: number }}
 */
export function latLngToSVG(lat, lng, bounds, svgWidth, svgHeight) {
    const { xPercent, yPercent } = convertToMapPosition(lat, lng, bounds);
    return {
        x: (xPercent / 100) * svgWidth,
        y: (yPercent / 100) * svgHeight,
    };
}
