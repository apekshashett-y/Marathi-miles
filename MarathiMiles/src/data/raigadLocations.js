/**
 * RAIGAD FORT — Real Coordinate Data Layer
 * Geospatially accurate lat/lng coordinates for Raigad Fort landmarks.
 * Coordinates sourced from real geographic data of Raigad Fort, Mahad, Maharashtra.
 * NO pixel values — all positions derived from lat/lng at render time.
 */

export const raigadLocations = [
    {
        id: "mainGate",
        name: "Mena Darwaza",
        fullName: "Mena Darwaza (Main Entrance)",
        lat: 18.2335,
        lng: 73.4478,
        importance: 7,
        visitTime: 10,
        effortLevel: 1,
        historicalScore: 7,
        spiritualScore: 2,
        architecturalScore: 9,
        description: "The grand main entrance to Raigad Fort. This fortified gateway was the primary access point, featuring massive wooden doors and defensive bastions.",
        cardPosition: "right",
        icon: "⛩️"
    },
    {
        id: "rajSabha",
        name: "Raigad Royal Court",
        fullName: "Raigad Royal Court (Raj Sabha)",
        lat: 18.2358,
        lng: 73.4492,
        importance: 10,
        visitTime: 25,
        effortLevel: 2,
        historicalScore: 10,
        spiritualScore: 5,
        architecturalScore: 10,
        description: "The grand audience hall where Chhatrapati Shivaji Maharaj held court. The coronation of the Maratha Empire took place here in 1674.",
        cardPosition: "right",
        icon: "🏛️"
    },
    {
        id: "samadhi",
        name: "Shivaji Maharaj Samadhi",
        fullName: "Shivaji Maharaj Samadhi (Memorial)",
        lat: 18.2342,
        lng: 73.4500,
        importance: 10,
        visitTime: 20,
        effortLevel: 2,
        historicalScore: 10,
        spiritualScore: 10,
        architecturalScore: 8,
        description: "The sacred memorial tomb of Chhatrapati Shivaji Maharaj. The most revered site on the fort, where the great king's mortal remains rest.",
        cardPosition: "bottom",
        icon: "🪔"
    },
    {
        id: "gangasagarLake",
        name: "Gangasagar Lake",
        fullName: "Gangasagar Lake",
        lat: 18.2372,
        lng: 73.4520,
        importance: 6,
        visitTime: 12,
        effortLevel: 3,
        historicalScore: 6,
        spiritualScore: 7,
        architecturalScore: 5,
        description: "A large freshwater lake atop the fort used for drinking water supply. Named after the sacred river Ganga, it sustained the fort's population year-round.",
        cardPosition: "right",
        icon: "💧"
    },
    {
        id: "hirkaniBastion",
        name: "Hirkani Bastion",
        fullName: "Hirkani Bastion (Watch Tower)",
        lat: 18.2380,
        lng: 73.4470,
        importance: 8,
        visitTime: 15,
        effortLevel: 3,
        historicalScore: 8,
        spiritualScore: 3,
        architecturalScore: 7,
        description: "Named after Hirakani, a brave village woman who scaled the impossible cliff at night to reach her child. Shivaji Maharaj was so impressed he named this bastion after her.",
        cardPosition: "left",
        icon: "🏰"
    },
    {
        id: "takmakTok",
        name: "Takmak Tok",
        fullName: "Takmak Tok (Execution Point)",
        lat: 18.2385,
        lng: 73.4505,
        importance: 8,
        visitTime: 15,
        effortLevel: 4,
        historicalScore: 8,
        spiritualScore: 1,
        architecturalScore: 4,
        description: "A sheer 1,400-foot cliff from which traitors were thrown as punishment. Offers the most breathtaking panoramic views of the Konkan coastline stretching endlessly below.",
        cardPosition: "top",
        icon: "🪨"
    },
    {
        id: "waghDarwaza",
        name: "Dragon's Tooth",
        fullName: "Dragon's Tooth (Wagh Darwaza)",
        lat: 18.2360,
        lng: 73.4462,
        importance: 7,
        visitTime: 12,
        effortLevel: 3,
        historicalScore: 7,
        spiritualScore: 2,
        architecturalScore: 8,
        description: "The secondary fortified gate resembling a dragon's jaw. Named 'Wagh Darwaza' (Tiger Gate), it features ingenious defensive architecture with sharp-angled turns.",
        cardPosition: "left",
        icon: "🐉"
    },
    {
        id: "ranivasa",
        name: "Queens' Quarters",
        fullName: "Queens' Quarters (Ranivasa)",
        lat: 18.2345,
        lng: 73.4515,
        importance: 7,
        visitTime: 15,
        effortLevel: 2,
        historicalScore: 7,
        spiritualScore: 4,
        architecturalScore: 7,
        description: "The private residential quarters of the royal queens. Features intricate stone carvings and private bathing pools, offering a glimpse into royal Maratha domestic life.",
        cardPosition: "right",
        icon: "👑"
    },
    {
        id: "bazaarPeth",
        name: "Market Area",
        fullName: "Market Area (Bazaar Peth)",
        lat: 18.2325,
        lng: 73.4498,
        importance: 5,
        visitTime: 10,
        effortLevel: 1,
        historicalScore: 5,
        spiritualScore: 1,
        architecturalScore: 6,
        description: "The ruins of the ancient marketplace that once had over 200 shops. This was the commercial heart of the fort city, bustling with traders and artisans.",
        cardPosition: "bottom",
        icon: "🏪"
    }
];

/**
 * Geographic Bounding Box for Raigad Fort
 * Encompasses all real landmark coordinates with padding.
 */
export const RAIGAD_MAP_BOUNDS = {
    north: 18.2395,   // Northernmost point (Takmak Tok area)
    south: 18.2315,   // Southernmost point (Bazaar Peth area)
    east: 73.4530,    // Easternmost point (Gangasagar Lake area)
    west: 73.4450     // Westernmost point (Wagh Darwaza area)
};

/**
 * Fort center for Leaflet map centering
 */
export const RAIGAD_CENTER = {
    lat: 18.2355,
    lng: 73.4490
};

/**
 * Graph edges for routing (pure logical connections with walk times)
 */
export const raigadEdges = [
    { from: "mainGate", to: "rajSabha", walkTime: 8, difficulty: 2 },
    { from: "mainGate", to: "bazaarPeth", walkTime: 5, difficulty: 1 },
    { from: "mainGate", to: "samadhi", walkTime: 6, difficulty: 2 },
    { from: "rajSabha", to: "samadhi", walkTime: 4, difficulty: 1 },
    { from: "rajSabha", to: "waghDarwaza", walkTime: 7, difficulty: 2 },
    { from: "rajSabha", to: "gangasagarLake", walkTime: 10, difficulty: 3 },
    { from: "samadhi", to: "ranivasa", walkTime: 5, difficulty: 2 },
    { from: "samadhi", to: "bazaarPeth", walkTime: 6, difficulty: 1 },
    { from: "gangasagarLake", to: "takmakTok", walkTime: 8, difficulty: 4 },
    { from: "gangasagarLake", to: "hirkaniBastion", walkTime: 12, difficulty: 3 },
    { from: "hirkaniBastion", to: "takmakTok", walkTime: 10, difficulty: 4 },
    { from: "hirkaniBastion", to: "waghDarwaza", walkTime: 8, difficulty: 3 },
    { from: "takmakTok", to: "hirkaniBastion", walkTime: 10, difficulty: 4 },
    { from: "waghDarwaza", to: "hirkaniBastion", walkTime: 8, difficulty: 3 },
    { from: "ranivasa", to: "gangasagarLake", walkTime: 7, difficulty: 2 },
    { from: "bazaarPeth", to: "ranivasa", walkTime: 8, difficulty: 1 }
];
