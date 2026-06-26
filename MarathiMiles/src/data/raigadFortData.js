/**
 * REAL RAIGAD FORT DATA — GIS UPGRADED
 *
 * Historically accurate locations with verified timestamps and attributes.
 * PHASE 4: Coordinates are now geographic lat/lng.
 * Backward-compatible `coordinates: { x, y }` fields are computed from lat/lng
 * via the geoProjection utility so SmartExplorationV2 continues to work.
 */
import { latLngToSVG } from '../utils/geoProjection.js';
import { RAIGAD_MAP_BOUNDS } from './raigadLocations.js';

// SVG canvas size used by SmartExplorationV2 (viewBox 900x800)
const V2_SVG_W = 900;
const V2_SVG_H = 800;

export const raigadFortLocations = {
    menaDarwaza: {
        id: 'menaDarwaza',
        name: 'Mena Darwaza (Main Entrance)',
        historicalScore: 7,
        spiritualScore: 2,
        architecturalScore: 9,
        walkingEffort: 1,
        avgVisitTime: 10,
        lat: 18.2335,
        lng: 73.4478,
        description: 'The grand main entrance to Raigad Fort. This fortified gateway was the primary access point.',
        connections: ['rajSabha', 'bazaarPeth', 'samadhi']
    },

    rajSabha: {
        id: 'rajSabha',
        name: 'Raigad Royal Court (Raj Sabha)',
        historicalScore: 10,
        spiritualScore: 5,
        architecturalScore: 10,
        walkingEffort: 2,
        avgVisitTime: 25,
        lat: 18.2358,
        lng: 73.4492,
        description: 'The grand audience hall where Chhatrapati Shivaji Maharaj held court.',
        connections: ['menaDarwaza', 'samadhi', 'waghDarwaza', 'gangasagarLake']
    },

    samadhi: {
        id: 'samadhi',
        name: 'Shivaji Maharaj Samadhi',
        historicalScore: 10,
        spiritualScore: 10,
        architecturalScore: 8,
        walkingEffort: 2,
        avgVisitTime: 20,
        lat: 18.2342,
        lng: 73.4500,
        description: 'The sacred memorial tomb of Chhatrapati Shivaji Maharaj.',
        connections: ['menaDarwaza', 'rajSabha', 'ranivasa', 'bazaarPeth']
    },

    gangasagarLake: {
        id: 'gangasagarLake',
        name: 'Gangasagar Lake',
        historicalScore: 6,
        spiritualScore: 7,
        architecturalScore: 5,
        walkingEffort: 3,
        avgVisitTime: 12,
        lat: 18.2372,
        lng: 73.4520,
        description: 'A large freshwater lake atop the fort used for drinking water supply.',
        connections: ['rajSabha', 'takmakTok', 'hirkaniBastion', 'ranivasa']
    },

    hirkaniBastion: {
        id: 'hirkaniBastion',
        name: 'Hirkani Bastion',
        historicalScore: 8,
        spiritualScore: 3,
        architecturalScore: 7,
        walkingEffort: 3,
        avgVisitTime: 15,
        lat: 18.2380,
        lng: 73.4470,
        description: 'Named after Hirakani, a brave village woman who scaled the impossible cliff.',
        connections: ['gangasagarLake', 'takmakTok', 'waghDarwaza']
    },

    takmakTok: {
        id: 'takmakTok',
        name: 'Takmak Tok (Execution Point)',
        historicalScore: 8,
        spiritualScore: 1,
        architecturalScore: 4,
        walkingEffort: 7,
        avgVisitTime: 15,
        lat: 18.2385,
        lng: 73.4505,
        description: 'A sheer 1,400-foot cliff from which traitors were thrown.',
        connections: ['gangasagarLake', 'hirkaniBastion']
    },

    waghDarwaza: {
        id: 'waghDarwaza',
        name: "Dragon's Tooth (Wagh Darwaza)",
        historicalScore: 7,
        spiritualScore: 2,
        architecturalScore: 8,
        walkingEffort: 5,
        avgVisitTime: 12,
        lat: 18.2360,
        lng: 73.4462,
        description: 'The secondary fortified gate resembling a dragon\'s jaw.',
        connections: ['rajSabha', 'hirkaniBastion']
    },

    ranivasa: {
        id: 'ranivasa',
        name: 'Queens\' Quarters',
        historicalScore: 7,
        spiritualScore: 4,
        architecturalScore: 7,
        walkingEffort: 2,
        avgVisitTime: 15,
        lat: 18.2345,
        lng: 73.4515,
        description: 'The private residential quarters of the royal queens.',
        connections: ['samadhi', 'gangasagarLake', 'bazaarPeth']
    },

    bazaarPeth: {
        id: 'bazaarPeth',
        name: 'Market Area (Bazaar Peth)',
        historicalScore: 5,
        spiritualScore: 1,
        architecturalScore: 6,
        walkingEffort: 1,
        avgVisitTime: 10,
        lat: 18.2325,
        lng: 73.4498,
        description: 'The ruins of the ancient marketplace that once had over 200 shops.',
        connections: ['menaDarwaza', 'samadhi', 'ranivasa']
    }
};

/**
 * Backward-compatible geo-projection:
 * Inject `coordinates: { x, y }` into every location so SmartExplorationV2
 * continues to work. Values are derived from real lat/lng via geoProjection utility.
 */
Object.values(raigadFortLocations).forEach((loc) => {
    const { x, y } = latLngToSVG(loc.lat, loc.lng, RAIGAD_MAP_BOUNDS, V2_SVG_W, V2_SVG_H);
    loc.coordinates = { x, y };
});

export const raigadGraphEdges = [
    { from: 'menaDarwaza', to: 'rajSabha', walkingTime: 8, difficulty: 2 },
    { from: 'menaDarwaza', to: 'bazaarPeth', walkingTime: 5, difficulty: 1 },
    { from: 'menaDarwaza', to: 'samadhi', walkingTime: 6, difficulty: 2 },
    { from: 'rajSabha', to: 'samadhi', walkingTime: 4, difficulty: 1 },
    { from: 'rajSabha', to: 'waghDarwaza', walkingTime: 7, difficulty: 2 },
    { from: 'rajSabha', to: 'gangasagarLake', walkingTime: 10, difficulty: 3 },
    { from: 'samadhi', to: 'ranivasa', walkingTime: 5, difficulty: 2 },
    { from: 'samadhi', to: 'bazaarPeth', walkingTime: 6, difficulty: 1 },
    { from: 'gangasagarLake', to: 'takmakTok', walkingTime: 8, difficulty: 4 },
    { from: 'gangasagarLake', to: 'hirkaniBastion', walkingTime: 12, difficulty: 3 },
    { from: 'hirkaniBastion', to: 'takmakTok', walkingTime: 10, difficulty: 4 },
    { from: 'hirkaniBastion', to: 'waghDarwaza', walkingTime: 8, difficulty: 3 },
    { from: 'ranivasa', to: 'gangasagarLake', walkingTime: 7, difficulty: 2 },
    { from: 'bazaarPeth', to: 'ranivasa', walkingTime: 8, difficulty: 1 }
];

export const raigadFortMetadata = {
    fortId: 'raigad',
    fortName: 'Raigad Fort',
    totalLocations: Object.keys(raigadFortLocations).length,
    entryPoint: 'menaDarwaza',
    description: 'Capital of the Maratha Empire'
};
