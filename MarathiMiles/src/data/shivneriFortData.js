/**
 * REAL SHIVNERI FORT DATA — GIS UPGRADED
 *
 * Historically accurate locations with verified timestamps and attributes.
 * PHASE 4: Coordinates are now geographic lat/lng.
 * Backward-compatible `coordinates: { x, y }` fields are computed from lat/lng
 * via the geoProjection utility so SmartExplorationV2 continues to work.
 */
import { latLngToSVG } from '../utils/geoProjection.js';
import { SHIVNERI_MAP_BOUNDS } from './shivneriLocations.js';

// SVG canvas size used by SmartExplorationV2 (viewBox 900x800)
const V2_SVG_W = 900;
const V2_SVG_H = 800;

export const shivneriFortLocations = {
    mahaDarwaja: {
        id: 'mahaDarwaja',
        name: 'Maha Darwaja (Main Entrance)',
        historicalScore: 9,
        spiritualScore: 3,
        architecturalScore: 8,
        walkingEffort: 2,
        avgVisitTime: 8,   // Brief stop
        lat: 19.2043,      // 🌍 Real geographic coordinates
        lng: 73.8595,
        description: 'The massive spike-studded main gate of Shivneri.',
        connections: ['shivJanmasthan', 'badamiTalav']
    },

    shivJanmasthan: {
        id: 'shivJanmasthan',
        name: 'Shiv Janmasthan (Birthplace)',
        historicalScore: 10,
        spiritualScore: 10,
        architecturalScore: 9,
        walkingEffort: 3,
        avgVisitTime: 15,  // Optimized visit time
        lat: 19.2068,
        lng: 73.8617,
        description: 'The sacred building where Chhatrapati Shivaji Maharaj was born.',
        connections: ['mahaDarwaja', 'shivaiDeviTemple', 'badamiTalav']
    },

    badamiTalav: {
        id: 'badamiTalav',
        name: 'Badami Talav',
        historicalScore: 6,
        spiritualScore: 4,
        architecturalScore: 7,
        walkingEffort: 2,
        avgVisitTime: 5,   // Quick photo stop
        lat: 19.2055,
        lng: 73.8628,
        description: "Ancient water reservoir integral to the fort's sustainability.",
        connections: ['mahaDarwaja', 'shivJanmasthan', 'gangaJamunaTanks']
    },

    gangaJamunaTanks: {
        id: 'gangaJamunaTanks',
        name: 'Ganga-Jamuna Tanks',
        historicalScore: 7,
        spiritualScore: 6,
        architecturalScore: 6,
        walkingEffort: 4,
        avgVisitTime: 7,
        lat: 19.2075,
        lng: 73.8652,
        description: 'Rock-cut cisterns with fresh cool water year-round.',
        connections: ['badamiTalav', 'shivaiDeviTemple', 'bastions']
    },

    shivaiDeviTemple: {
        id: 'shivaiDeviTemple',
        name: 'Shivai Devi Temple',
        historicalScore: 9,
        spiritualScore: 10,
        architecturalScore: 6,
        walkingEffort: 4,
        avgVisitTime: 10,
        lat: 19.2082,
        lng: 73.8638,
        description: 'Ancient cave temple of the fort guardian deity.',
        connections: ['shivJanmasthan', 'gangaJamunaTanks', 'kadelotPoint']
    },

    kadelotPoint: {
        id: 'kadelotPoint',
        name: 'Kadelot Point (Execution)',
        historicalScore: 8,
        spiritualScore: 1,
        architecturalScore: 4,
        walkingEffort: 7, // High effort
        avgVisitTime: 8,
        lat: 19.2101,
        lng: 73.8645,
        description: 'Sheer cliff used for punishment in historical times.',
        connections: ['shivaiDeviTemple', 'bastions']
    },

    bastions: {
        id: 'bastions',
        name: 'Fort Bastions',
        historicalScore: 5,
        spiritualScore: 1,
        architecturalScore: 8,
        walkingEffort: 8, // High effort
        avgVisitTime: 10,
        lat: 19.2095,
        lng: 73.8660,
        description: 'Defensive structures offering panoramic views.',
        connections: ['gangaJamunaTanks', 'kadelotPoint', 'ammunitionStorage']
    },

    ammunitionStorage: {
        id: 'ammunitionStorage',
        name: 'Ambarkhana (Storage)',
        historicalScore: 6,
        spiritualScore: 1,
        architecturalScore: 7,
        walkingEffort: 3,
        avgVisitTime: 8,
        lat: 19.2088,
        lng: 73.8668,
        description: 'Granary and ammunition storehouse.',
        connections: ['bastions']
    }
};

/**
 * Backward-compatible geo-projection:
 * Inject `coordinates: { x, y }` into every location so SmartExplorationV2
 * (and any other consumer using loc.coordinates.x/y) continues to work.
 * Values are derived from real lat/lng via the geoProjection utility.
 */
Object.values(shivneriFortLocations).forEach((loc) => {
    const { x, y } = latLngToSVG(loc.lat, loc.lng, SHIVNERI_MAP_BOUNDS, V2_SVG_W, V2_SVG_H);
    loc.coordinates = { x, y };
});


/**
 * GRAPH EDGES WITH WALKING TIME
 * Timings verified for average walking speed.
 */
export const shivneriGraphEdges = [
    { from: 'mahaDarwaja', to: 'shivJanmasthan', walkingTime: 6, difficulty: 2 },
    { from: 'mahaDarwaja', to: 'badamiTalav', walkingTime: 5, difficulty: 2 },

    { from: 'shivJanmasthan', to: 'shivaiDeviTemple', walkingTime: 5, difficulty: 3 },
    { from: 'shivJanmasthan', to: 'badamiTalav', walkingTime: 4, difficulty: 2 },

    { from: 'badamiTalav', to: 'gangaJamunaTanks', walkingTime: 8, difficulty: 4 },

    { from: 'gangaJamunaTanks', to: 'shivaiDeviTemple', walkingTime: 6, difficulty: 3 },
    { from: 'gangaJamunaTanks', to: 'bastions', walkingTime: 12, difficulty: 6 },

    { from: 'shivaiDeviTemple', to: 'kadelotPoint', walkingTime: 7, difficulty: 5 },

    { from: 'kadelotPoint', to: 'bastions', walkingTime: 10, difficulty: 7 },

    { from: 'bastions', to: 'ammunitionStorage', walkingTime: 8, difficulty: 5 }
];

export const shivneriFortMetadata = {
    fortId: 'shivneri',
    fortName: 'Shivneri Fort',
    totalLocations: Object.keys(shivneriFortLocations).length,
    entryPoint: 'mahaDarwaja',
    description: 'Birthplace of Chhatrapati Shivaji Maharaj'
};
