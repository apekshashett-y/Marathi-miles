/**
 * LOHAGAD FORT — Real Coordinate Data Layer
 * Geospatially accurate lat/lng coordinates for Lohagad Fort landmarks.
 */

export const lohagadLocations = [
    {
        id: "mainGate",
        name: "Ganesh Darwaza",
        fullName: "Lohagad Main Gate (Ganesh Darwaza)",
        lat: 18.7085,
        lng: 73.4890,
        importance: 8,
        avgVisitTime: 10,
        walkingEffort: 2,
        historicalScore: 8,
        spiritualScore: 4,
        architecturalScore: 9,
        description: "The primary entrance to the fort, named after Lord Ganesha. It is strongly fortified to resist enemy attacks.",
        cardPosition: "right",
        icon: "⛩️"
    },
    {
        id: "narayanDarwaza",
        name: "Narayan Darwaza",
        fullName: "Narayan Darwaza",
        lat: 18.7075,
        lng: 73.4880,
        importance: 7,
        avgVisitTime: 5,
        walkingEffort: 2,
        historicalScore: 7,
        spiritualScore: 4,
        architecturalScore: 8,
        description: "The second gate in the sequence of defenses, built during the Peshwa era.",
        cardPosition: "left",
        icon: "⛩️"
    },
    {
        id: "hanumanDarwaza",
        name: "Hanuman Darwaza",
        fullName: "Hanuman Darwaza",
        lat: 18.7065,
        lng: 73.4870,
        importance: 7,
        avgVisitTime: 5,
        walkingEffort: 3,
        historicalScore: 8,
        spiritualScore: 7,
        architecturalScore: 7,
        description: "The oldest gate of the fort, housing an ancient idol of Lord Hanuman.",
        cardPosition: "right",
        icon: "⛩️"
    },
    {
        id: "mahaDarwaza",
        name: "Maha Darwaza",
        fullName: "Maha Darwaza",
        lat: 18.7055,
        lng: 73.4860,
        importance: 9,
        avgVisitTime: 10,
        walkingEffort: 3,
        historicalScore: 9,
        spiritualScore: 3,
        architecturalScore: 10,
        description: "The massive main gate at the top, featuring intricate carvings and robust defenses.",
        cardPosition: "left",
        icon: "⛩️"
    },
    {
        id: "loheshwarTemple",
        name: "Loheshwar Temple",
        fullName: "Loheshwar Temple",
        lat: 18.7065,
        lng: 73.4835,
        importance: 8,
        avgVisitTime: 15,
        walkingEffort: 4,
        historicalScore: 8,
        spiritualScore: 10,
        architecturalScore: 6,
        description: "An ancient Shiva temple situated on the plateau, offering peaceful surroundings.",
        cardPosition: "top",
        icon: "🛕"
    },
    {
        id: "laxmiKothi",
        name: "Laxmi Kothi",
        fullName: "Laxmi Kothi",
        lat: 18.7045,
        lng: 73.4850,
        importance: 8,
        avgVisitTime: 10,
        walkingEffort: 3,
        historicalScore: 9,
        spiritualScore: 4,
        architecturalScore: 8,
        description: "A large rock-cut cave with multiple chambers, historically used as a treasury by the Marathas.",
        cardPosition: "bottom",
        icon: "🏦"
    },
    {
        id: "shivMandir",
        name: "Shiv Mandir",
        fullName: "Shiv Mandir",
        lat: 18.7050,
        lng: 73.4870,
        importance: 7,
        avgVisitTime: 10,
        walkingEffort: 2,
        historicalScore: 7,
        spiritualScore: 9,
        architecturalScore: 5,
        description: "A small but significant temple dedicated to Lord Shiva near the central plateau.",
        cardPosition: "right",
        icon: "🕉️"
    },
    {
        id: "waterCistern",
        name: "Water Cistern",
        fullName: "Water Cistern (Rock-Cut Tank)",
        lat: 18.7035,
        lng: 73.4835,
        importance: 6,
        avgVisitTime: 10,
        walkingEffort: 2,
        historicalScore: 7,
        spiritualScore: 2,
        architecturalScore: 8,
        description: "Ancient rock-cut water tanks (Hawd) used for rainwater harvesting and supply throughout the year.",
        cardPosition: "left",
        icon: "💧"
    },
    {
        id: "vinchuKata",
        name: "Vinchu Kata",
        fullName: "Vinchu Kata (Scorpion's Tail)",
        lat: 18.7025,
        lng: 73.4810,
        importance: 10,
        avgVisitTime: 25,
        walkingEffort: 6,
        historicalScore: 9,
        spiritualScore: 2,
        architecturalScore: 8,
        description: "A long and narrow fortified spur extending from the main plateau, resembling a scorpion's tail.",
        cardPosition: "bottom",
        icon: "🦂"
    }
];

export const LOHAGAD_MAP_BOUNDS = {
    north: 18.7090,
    south: 18.7020,
    east: 73.4900,
    west: 73.4800
};

export const LOHAGAD_CENTER = {
    lat: 18.7055,
    lng: 73.4850
};

export const lohagadEdges = [
    { from: "mainGate", to: "narayanDarwaza", walkingTime: 3, difficulty: 2 },
    { from: "narayanDarwaza", to: "hanumanDarwaza", walkingTime: 4, difficulty: 2 },
    { from: "hanumanDarwaza", to: "mahaDarwaza", walkingTime: 5, difficulty: 3 },
    { from: "mahaDarwaza", to: "shivMandir", walkingTime: 4, difficulty: 1 },
    { from: "shivMandir", to: "laxmiKothi", walkingTime: 5, difficulty: 1 },
    { from: "laxmiKothi", to: "loheshwarTemple", walkingTime: 6, difficulty: 1 },
    { from: "laxmiKothi", to: "waterCistern", walkingTime: 4, difficulty: 1 },
    { from: "loheshwarTemple", to: "waterCistern", walkingTime: 5, difficulty: 1 },
    { from: "waterCistern", to: "vinchuKata", walkingTime: 15, difficulty: 4 }
];
