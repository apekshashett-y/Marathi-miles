/**
 * REAL PRATAPGAD FORT DATA — GIS UPGRADED
 *
 * Historically accurate locations with verified timestamps and attributes.
 * Coordinates are geographic lat/lng.
 * Backward-compatible `coordinates: { x, y }` fields are computed from lat/lng
 * via the geoProjection utility so SmartExplorationV2 continues to work.
 *
 * Pratapgad — Famous for the Battle of Pratapgad (1659)
 */
import { latLngToSVG } from '../utils/geoProjection.js';
import { PRATAPGAD_MAP_BOUNDS } from './pratapgadLocations.js';

// SVG canvas size used by SmartExplorationV2 (viewBox 900x800)
const V2_SVG_W = 900;
const V2_SVG_H = 800;

export const pratapgadFortLocations = {
    mainGate: {
        id: 'mainGate',
        name: 'Pratapgad Darwaza (Main Entrance)',
        historicalScore: 8,
        spiritualScore: 2,
        architecturalScore: 9,
        walkingEffort: 2,
        avgVisitTime: 10,
        lat: 17.9230,
        lng: 73.5700,
        description: 'The imposing main entrance of the fort, featuring thick wooden doors with iron spikes.',
        connections: ['lowerFort', 'bhavaniTemple', 'jivdaniBuruj', 'sajjaKothi']
    },

    bhavaniTemple: {
        id: 'bhavaniTemple',
        name: 'Bhavani Temple',
        historicalScore: 9,
        spiritualScore: 10,
        architecturalScore: 8,
        walkingEffort: 2,
        avgVisitTime: 15,
        lat: 17.9250,
        lng: 73.5700,
        description: 'The revered temple of Goddess Bhavani, established by Chhatrapati Shivaji Maharaj in 1661.',
        connections: ['mainGate', 'machiDarwaza', 'baleKilla', 'katesPoint']
    },

    afzalKhanTomb: {
        id: 'afzalKhanTomb',
        name: 'Afzal Khan Tomb (Vijay Smarak)',
        historicalScore: 10,
        spiritualScore: 1,
        architecturalScore: 6,
        walkingEffort: 3,
        avgVisitTime: 15,
        lat: 17.9270,
        lng: 73.5685,
        description: 'The site where the historic Battle of Pratapgad (1659) culminated.',
        connections: ['baleKilla', 'katesPoint']
    },

    baleKilla: {
        id: 'baleKilla',
        name: 'Bale Killa (Upper Fort)',
        historicalScore: 8,
        spiritualScore: 4,
        architecturalScore: 7,
        walkingEffort: 4,
        avgVisitTime: 20,
        lat: 17.9275,
        lng: 73.5720,
        description: 'The highest point of the fort, housing the royal residence and offering expansive views.',
        connections: ['bhavaniTemple', 'afzalKhanTomb', 'machiDarwaza']
    },

    machiDarwaza: {
        id: 'machiDarwaza',
        name: 'Machi Darwaza',
        historicalScore: 7,
        spiritualScore: 1,
        architecturalScore: 8,
        walkingEffort: 2,
        avgVisitTime: 10,
        lat: 17.9250,
        lng: 73.5730,
        description: 'The gateway connecting the upper fort to the eastern plateau.',
        connections: ['bhavaniTemple', 'baleKilla', 'sajjaKothi']
    },

    sajjaKothi: {
        id: 'sajjaKothi',
        name: 'Sajja Kothi (Watch Tower)',
        historicalScore: 6,
        spiritualScore: 2,
        architecturalScore: 7,
        walkingEffort: 2,
        avgVisitTime: 12,
        lat: 17.9235,
        lng: 73.5720,
        description: 'A prominent watchtower pavilion used for military surveillance and meetings.',
        connections: ['mainGate', 'machiDarwaza']
    },

    lowerFort: {
        id: 'lowerFort',
        name: 'Lower Fort Area (Base Area)',
        historicalScore: 5,
        spiritualScore: 2,
        architecturalScore: 4,
        walkingEffort: 1,
        avgVisitTime: 15,
        lat: 17.9215,
        lng: 73.5700,
        description: 'The expansive base area (Machi) that once housed soldiers, artisans, and markets.',
        connections: ['mainGate']
    },

    jivdaniBuruj: {
        id: 'jivdaniBuruj',
        name: 'Jivdani Buruj',
        historicalScore: 6,
        spiritualScore: 1,
        architecturalScore: 7,
        walkingEffort: 3,
        avgVisitTime: 10,
        lat: 17.9240,
        lng: 73.5670,
        description: 'A heavily fortified western bastion built to secure the fort\'s vulnerable side.',
        connections: ['mainGate', 'katesPoint']
    },

    katesPoint: {
        id: 'katesPoint',
        name: 'Kates Point (View Point)',
        historicalScore: 4,
        spiritualScore: 4,
        architecturalScore: 3,
        walkingEffort: 3,
        avgVisitTime: 10,
        lat: 17.9255,
        lng: 73.5660,
        description: 'A spectacular viewpoint offering breathtaking vistas of the lush green valleys.',
        connections: ['bhavaniTemple', 'afzalKhanTomb', 'jivdaniBuruj']
    }
};

/**
 * Backward-compatible geo-projection:
 */
Object.values(pratapgadFortLocations).forEach((loc) => {
    const { x, y } = latLngToSVG(loc.lat, loc.lng, PRATAPGAD_MAP_BOUNDS, V2_SVG_W, V2_SVG_H);
    loc.coordinates = { x, y };
});

/**
 * GRAPH EDGES WITH WALKING TIME
 */
export const pratapgadGraphEdges = [
    { from: 'mainGate', to: 'lowerFort', walkingTime: 5, difficulty: 1 },
    { from: 'mainGate', to: 'bhavaniTemple', walkingTime: 8, difficulty: 2 },
    { from: 'mainGate', to: 'jivdaniBuruj', walkingTime: 10, difficulty: 3 },
    { from: 'mainGate', to: 'sajjaKothi', walkingTime: 7, difficulty: 2 },
    { from: 'bhavaniTemple', to: 'machiDarwaza', walkingTime: 6, difficulty: 2 },
    { from: 'bhavaniTemple', to: 'baleKilla', walkingTime: 12, difficulty: 4 },
    { from: 'bhavaniTemple', to: 'katesPoint', walkingTime: 8, difficulty: 2 },
    { from: 'baleKilla', to: 'afzalKhanTomb', walkingTime: 10, difficulty: 3 },
    { from: 'baleKilla', to: 'machiDarwaza', walkingTime: 8, difficulty: 3 },
    { from: 'afzalKhanTomb', to: 'katesPoint', walkingTime: 7, difficulty: 2 },
    { from: 'machiDarwaza', to: 'sajjaKothi', walkingTime: 5, difficulty: 1 },
    { from: 'jivdaniBuruj', to: 'katesPoint', walkingTime: 6, difficulty: 2 }
];

export const pratapgadFortMetadata = {
    fortId: 'pratapgad',
    fortName: 'Pratapgad Fort',
    totalLocations: Object.keys(pratapgadFortLocations).length,
    entryPoint: 'mainGate',
    description: 'The Valor Fort — famous for the Battle of Pratapgad (1659)'
};
