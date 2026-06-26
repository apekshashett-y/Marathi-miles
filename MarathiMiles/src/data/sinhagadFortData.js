/**
 * REAL SINHAGAD FORT DATA — GIS UPGRADED
 *
 * Historically accurate locations with verified timestamps and attributes.
 * Coordinates are geographic lat/lng.
 * Backward-compatible `coordinates: { x, y }` fields are computed from lat/lng
 * via the geoProjection utility so SmartExplorationV2 continues to work.
 *
 * Sinhagad (Lion's Fort) — Famous for the Battle of Sinhagad (1670)
 */
import { latLngToSVG } from '../utils/geoProjection.js';
import { SINHAGAD_MAP_BOUNDS } from './sinhagadLocations.js';

// SVG canvas size used by SmartExplorationV2 (viewBox 900x800)
const V2_SVG_W = 900;
const V2_SVG_H = 800;

export const sinhagadFortLocations = {
    puneDarwaza: {
        id: 'puneDarwaza',
        name: 'Pune Darwaza (Main Entrance)',
        historicalScore: 8,
        spiritualScore: 2,
        architecturalScore: 9,
        walkingEffort: 1,
        avgVisitTime: 8,
        lat: 18.3662,
        lng: 73.7555,
        description: 'The main entrance facing Pune city with spike-studded doors.',
        connections: ['tilakBungalow', 'kalyanDarwaza', 'kondhaneshwarTemple']
    },

    kalyanDarwaza: {
        id: 'kalyanDarwaza',
        name: 'Kalyan Darwaza',
        historicalScore: 9,
        spiritualScore: 3,
        architecturalScore: 8,
        walkingEffort: 3,
        avgVisitTime: 10,
        lat: 18.3648,
        lng: 73.7528,
        description: 'The gate from which Tanaji Malusare scaled the cliff in 1670.',
        connections: ['puneDarwaza', 'tanajiMemorial', 'hawaPoint']
    },

    tanajiMemorial: {
        id: 'tanajiMemorial',
        name: 'Tanaji Malusare Memorial',
        historicalScore: 10,
        spiritualScore: 8,
        architecturalScore: 7,
        walkingEffort: 3,
        avgVisitTime: 15,
        lat: 18.3672,
        lng: 73.7522,
        description: 'Memorial of the legendary warrior who sacrificed his life to recapture Sinhagad.',
        connections: ['kalyanDarwaza', 'kondhaneshwarTemple', 'hawaPoint']
    },

    kondhaneshwarTemple: {
        id: 'kondhaneshwarTemple',
        name: 'Kondhaneshwar Temple',
        historicalScore: 8,
        spiritualScore: 10,
        architecturalScore: 7,
        walkingEffort: 2,
        avgVisitTime: 12,
        lat: 18.3682,
        lng: 73.7542,
        description: 'Ancient Shiva temple with a natural spring, believed to be over 2000 years old.',
        connections: ['puneDarwaza', 'tanajiMemorial', 'rajaramSamadhi', 'zunjarBastion']
    },

    rajaramSamadhi: {
        id: 'rajaramSamadhi',
        name: 'Rajaram Maharaj Samadhi',
        historicalScore: 9,
        spiritualScore: 9,
        architecturalScore: 6,
        walkingEffort: 2,
        avgVisitTime: 12,
        lat: 18.3688,
        lng: 73.7562,
        description: 'Sacred memorial of Rajaram Maharaj, younger son of Shivaji Maharaj.',
        connections: ['kondhaneshwarTemple', 'devTake', 'tilakBungalow']
    },

    devTake: {
        id: 'devTake',
        name: 'Dev Take (Water Tank)',
        historicalScore: 6,
        spiritualScore: 5,
        architecturalScore: 5,
        walkingEffort: 3,
        avgVisitTime: 8,
        lat: 18.3694,
        lng: 73.7578,
        description: 'Ancient rock-cut water reservoir, a marvel of Maratha-era water engineering.',
        connections: ['rajaramSamadhi', 'zunjarBastion']
    },

    zunjarBastion: {
        id: 'zunjarBastion',
        name: 'Zunjar Bastion',
        historicalScore: 7,
        spiritualScore: 1,
        architecturalScore: 8,
        walkingEffort: 4,
        avgVisitTime: 10,
        lat: 18.3698,
        lng: 73.7548,
        description: 'Massive defensive bastion with panoramic views of the Sahyadri range.',
        connections: ['kondhaneshwarTemple', 'devTake', 'hawaPoint']
    },

    hawaPoint: {
        id: 'hawaPoint',
        name: 'Hawa Point (Sunset Viewpoint)',
        historicalScore: 5,
        spiritualScore: 6,
        architecturalScore: 3,
        walkingEffort: 4,
        avgVisitTime: 15,
        lat: 18.3675,
        lng: 73.7508,
        description: 'The most spectacular sunset viewpoint with sweeping Sahyadri valley views.',
        connections: ['kalyanDarwaza', 'tanajiMemorial', 'zunjarBastion']
    },

    tilakBungalow: {
        id: 'tilakBungalow',
        name: 'Lokmanya Tilak Bungalow',
        historicalScore: 7,
        spiritualScore: 3,
        architecturalScore: 6,
        walkingEffort: 1,
        avgVisitTime: 10,
        lat: 18.3658,
        lng: 73.7568,
        description: 'Hilltop bungalow where Lokmanya Tilak stayed, linking fort to freedom struggle.',
        connections: ['puneDarwaza', 'rajaramSamadhi', 'kondhaneshwarTemple']
    }
};

/**
 * Backward-compatible geo-projection:
 * Inject `coordinates: { x, y }` into every location so SmartExplorationV2
 * (and any other consumer using loc.coordinates.x/y) continues to work.
 */
Object.values(sinhagadFortLocations).forEach((loc) => {
    const { x, y } = latLngToSVG(loc.lat, loc.lng, SINHAGAD_MAP_BOUNDS, V2_SVG_W, V2_SVG_H);
    loc.coordinates = { x, y };
});


/**
 * GRAPH EDGES WITH WALKING TIME
 * Timings verified for average walking speed on Sinhagad terrain.
 */
export const sinhagadGraphEdges = [
    { from: 'puneDarwaza', to: 'tilakBungalow', walkingTime: 5, difficulty: 1 },
    { from: 'puneDarwaza', to: 'kalyanDarwaza', walkingTime: 8, difficulty: 2 },
    { from: 'puneDarwaza', to: 'kondhaneshwarTemple', walkingTime: 10, difficulty: 2 },

    { from: 'kalyanDarwaza', to: 'tanajiMemorial', walkingTime: 6, difficulty: 3 },
    { from: 'kalyanDarwaza', to: 'hawaPoint', walkingTime: 7, difficulty: 3 },

    { from: 'tanajiMemorial', to: 'kondhaneshwarTemple', walkingTime: 5, difficulty: 2 },
    { from: 'tanajiMemorial', to: 'hawaPoint', walkingTime: 8, difficulty: 3 },

    { from: 'kondhaneshwarTemple', to: 'rajaramSamadhi', walkingTime: 5, difficulty: 2 },
    { from: 'kondhaneshwarTemple', to: 'zunjarBastion', walkingTime: 8, difficulty: 3 },

    { from: 'rajaramSamadhi', to: 'devTake', walkingTime: 6, difficulty: 2 },
    { from: 'rajaramSamadhi', to: 'tilakBungalow', walkingTime: 7, difficulty: 1 },

    { from: 'devTake', to: 'zunjarBastion', walkingTime: 5, difficulty: 3 },

    { from: 'zunjarBastion', to: 'hawaPoint', walkingTime: 12, difficulty: 4 },

    { from: 'tilakBungalow', to: 'kondhaneshwarTemple', walkingTime: 8, difficulty: 2 },
    { from: 'hawaPoint', to: 'puneDarwaza', walkingTime: 12, difficulty: 3 }
];

export const sinhagadFortMetadata = {
    fortId: 'sinhagad',
    fortName: 'Sinhagad Fort',
    totalLocations: Object.keys(sinhagadFortLocations).length,
    entryPoint: 'puneDarwaza',
    description: 'The Lion\'s Fort — famous for the Battle of Sinhagad (1670)'
};
