/**
 * RAIGAD FORT DATA — GIS Coordinates
 * Capital of the Maratha Empire. Elevation: 820m.
 * Coordinates verified for key landmark positions.
 */
import { latLngToSVG } from '../utils/geoProjection.js';

const V2_SVG_W = 900;
const V2_SVG_H = 800;

export const RAIGAD_MAP_BOUNDS = {
    north: 18.2400,
    south: 18.2290,
    east: 73.4470,
    west: 73.4370
};

export const RAIGAD_CENTER = {
    lat: 18.2345,
    lng: 73.4420
};

export const raigadFortLocations = {
    mahaDarwaja: {
        id: 'mahaDarwaja',
        name: 'Maha Darwaja (Main Gate)',
        historicalScore: 9,
        spiritualScore: 3,
        architecturalScore: 9,
        walkingEffort: 2,
        avgVisitTime: 10,
        lat: 18.2298,
        lng: 73.4405,
        description: 'The grand main gateway of Raigad Fort. A testament to Maratha military architecture.',
        connections: ['nagarkhana', 'rajBhavan']
    },
    nagarkhana: {
        id: 'nagarkhana',
        name: 'Nagarkhana (Drum House)',
        historicalScore: 8,
        spiritualScore: 2,
        architecturalScore: 8,
        walkingEffort: 3,
        avgVisitTime: 8,
        lat: 18.2310,
        lng: 73.4415,
        description: 'The royal drum house where musicians announced the King\'s presence and daily events.',
        connections: ['mahaDarwaja', 'rajBhavan', 'hattilake']
    },
    rajBhavan: {
        id: 'rajBhavan',
        name: 'Raj Bhavan (Royal Palace)',
        historicalScore: 10,
        spiritualScore: 5,
        architecturalScore: 10,
        walkingEffort: 4,
        avgVisitTime: 20,
        lat: 18.2325,
        lng: 73.4425,
        description: 'The seat of Chhatrapati Shivaji Maharaj\'s rule. The heart of the Maratha Empire\'s capital.',
        connections: ['nagarkhana', 'jagdishwarTemple', 'shivSamadhi']
    },
    jagdishwarTemple: {
        id: 'jagdishwarTemple',
        name: 'Jagdishwar Temple',
        historicalScore: 9,
        spiritualScore: 10,
        architecturalScore: 8,
        walkingEffort: 3,
        avgVisitTime: 12,
        lat: 18.2338,
        lng: 73.4432,
        description: 'The ancient Shiva temple within the fort, where the King prayed before major campaigns.',
        connections: ['rajBhavan', 'shivSamadhi']
    },
    shivSamadhi: {
        id: 'shivSamadhi',
        name: 'Shivaji Samadhi (Royal Tomb)',
        historicalScore: 10,
        spiritualScore: 10,
        architecturalScore: 7,
        walkingEffort: 3,
        avgVisitTime: 15,
        lat: 18.2345,
        lng: 73.4428,
        description: 'The sacred samadhi (memorial tomb) of Chhatrapati Shivaji Maharaj. A place of deep reverence.',
        connections: ['jagdishwarTemple', 'takmakTok']
    },
    takmakTok: {
        id: 'takmakTok',
        name: 'Takmak Tok (Execution Cliff)',
        historicalScore: 8,
        spiritualScore: 1,
        architecturalScore: 3,
        walkingEffort: 8,
        avgVisitTime: 10,
        lat: 18.2360,
        lng: 73.4438,
        description: 'The sheer 1,400-foot cliff used for executing traitors. Offers breathtaking views of the Konkan coast.',
        connections: ['shivSamadhi', 'hattilake']
    },
    hattilake: {
        id: 'hattilake',
        name: 'Hatti Lake (Elephant Tank)',
        historicalScore: 7,
        spiritualScore: 3,
        architecturalScore: 7,
        walkingEffort: 5,
        avgVisitTime: 8,
        lat: 18.2355,
        lng: 73.4450,
        description: 'The royal water reservoir where the royal elephants were bathed. A marvel of Maratha hydraulics.',
        connections: ['takmakTok', 'pethRuins']
    },
    pethRuins: {
        id: 'pethRuins',
        name: 'Raigad Peth (Market Ruins)',
        historicalScore: 7,
        spiritualScore: 1,
        architecturalScore: 6,
        walkingEffort: 4,
        avgVisitTime: 10,
        lat: 18.2342,
        lng: 73.4455,
        description: 'Ruins of the ancient marketplace — once 200 shops lined these streets serving the Maratha capital.',
        connections: ['hattilake', 'watchTower']
    },
    watchTower: {
        id: 'watchTower',
        name: 'Hirakani Buruj (Watch Tower)',
        historicalScore: 8,
        spiritualScore: 2,
        architecturalScore: 9,
        walkingEffort: 9,
        avgVisitTime: 12,
        lat: 18.2330,
        lng: 73.4462,
        description: 'Named after Hirakani, a brave woman who scaled this impossible cliff to reach her infant child.',
        connections: ['pethRuins']
    }
};

// Inject SVG coordinates for the illustrated map
Object.values(raigadFortLocations).forEach((loc) => {
    const { x, y } = latLngToSVG(loc.lat, loc.lng, RAIGAD_MAP_BOUNDS, V2_SVG_W, V2_SVG_H);
    loc.coordinates = { x, y };
});

export const raigadGraphEdges = [
    { from: 'mahaDarwaja', to: 'nagarkhana', walkingTime: 5, difficulty: 2 },
    { from: 'nagarkhana', to: 'rajBhavan', walkingTime: 7, difficulty: 3 },
    { from: 'nagarkhana', to: 'hattilake', walkingTime: 12, difficulty: 5 },
    { from: 'rajBhavan', to: 'jagdishwarTemple', walkingTime: 6, difficulty: 3 },
    { from: 'rajBhavan', to: 'shivSamadhi', walkingTime: 5, difficulty: 2 },
    { from: 'jagdishwarTemple', to: 'shivSamadhi', walkingTime: 4, difficulty: 2 },
    { from: 'shivSamadhi', to: 'takmakTok', walkingTime: 10, difficulty: 7 },
    { from: 'takmakTok', to: 'hattilake', walkingTime: 8, difficulty: 5 },
    { from: 'hattilake', to: 'pethRuins', walkingTime: 7, difficulty: 4 },
    { from: 'pethRuins', to: 'watchTower', walkingTime: 10, difficulty: 6 }
];

export const raigadFortMetadata = {
    fortId: 'raigad',
    fortName: 'Raigad Fort',
    totalLocations: Object.keys(raigadFortLocations).length,
    entryPoint: 'mahaDarwaja',
    description: 'Capital of the Maratha Empire and coronation site of Chhatrapati Shivaji Maharaj'
};
