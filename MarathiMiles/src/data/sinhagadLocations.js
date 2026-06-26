/**
 * SINHAGAD FORT — Real Coordinate Data Layer
 * Geospatially accurate lat/lng coordinates for Sinhagad Fort landmarks.
 * Coordinates sourced from real geographic data of Sinhagad Fort, Pune, Maharashtra.
 * NO pixel values — all positions derived from lat/lng at render time.
 *
 * Sinhagad (Lion's Fort) was historically known as Kondhana.
 * Famous for the Battle of Sinhagad (1670) led by Tanaji Malusare.
 */

export const sinhagadLocations = [
    {
        id: "puneDarwaza",
        name: "Pune Darwaza",
        fullName: "Pune Darwaza (Main Entrance)",
        lat: 18.3662,
        lng: 73.7555,
        importance: 8,
        visitTime: 8,
        effortLevel: 1,
        historicalScore: 8,
        spiritualScore: 2,
        architecturalScore: 9,
        description: "The main entrance facing Pune city. A massive fortified gateway with spike-studded doors, this was the primary access point used by Maratha soldiers and traders.",
        cardPosition: "right",
        icon: "⛩️"
    },
    {
        id: "kalyanDarwaza",
        name: "Kalyan Darwaza",
        fullName: "Kalyan Darwaza (Kalyan Gate)",
        lat: 18.3648,
        lng: 73.7528,
        importance: 9,
        visitTime: 10,
        effortLevel: 3,
        historicalScore: 9,
        spiritualScore: 3,
        architecturalScore: 8,
        description: "The gate from which Tanaji Malusare and his warriors scaled the cliff in the legendary night attack of 1670. A site of immense military significance.",
        cardPosition: "left",
        icon: "🏰"
    },
    {
        id: "tanajiMemorial",
        name: "Tanaji Memorial",
        fullName: "Tanaji Malusare Memorial",
        lat: 18.3672,
        lng: 73.7522,
        importance: 10,
        visitTime: 15,
        effortLevel: 3,
        historicalScore: 10,
        spiritualScore: 8,
        architecturalScore: 7,
        description: "Memorial of the legendary warrior Tanaji Malusare who sacrificed his life to recapture Sinhagad. Shivaji Maharaj said 'Gad aala pan Sinha gela' (The fort is won but the lion is lost).",
        cardPosition: "top",
        icon: "⚔️"
    },
    {
        id: "kondhaneshwarTemple",
        name: "Kondhaneshwar Temple",
        fullName: "Kondhaneshwar Temple",
        lat: 18.3682,
        lng: 73.7542,
        importance: 8,
        visitTime: 12,
        effortLevel: 2,
        historicalScore: 8,
        spiritualScore: 10,
        architecturalScore: 7,
        description: "An ancient Shiva temple with a natural spring, believed to be over 2000 years old. The temple has a perennial water source flowing through the sanctum.",
        cardPosition: "right",
        icon: "🛕"
    },
    {
        id: "rajaramSamadhi",
        name: "Rajaram Samadhi",
        fullName: "Rajaram Maharaj Samadhi",
        lat: 18.3688,
        lng: 73.7562,
        importance: 9,
        visitTime: 12,
        effortLevel: 2,
        historicalScore: 9,
        spiritualScore: 9,
        architecturalScore: 6,
        description: "The sacred memorial of Rajaram Maharaj, the younger son of Chhatrapati Shivaji Maharaj. He passed away here in 1700 while defending the Maratha legacy.",
        cardPosition: "right",
        icon: "🪔"
    },
    {
        id: "devTake",
        name: "Dev Take",
        fullName: "Dev Take (Water Tank)",
        lat: 18.3694,
        lng: 73.7578,
        importance: 6,
        visitTime: 8,
        effortLevel: 3,
        historicalScore: 6,
        spiritualScore: 5,
        architecturalScore: 5,
        description: "Ancient rock-cut water reservoir that sustained the fort's garrison year-round. A marvel of Maratha-era water engineering carved into the hilltop basalt.",
        cardPosition: "right",
        icon: "💧"
    },
    {
        id: "zunjarBastion",
        name: "Zunjar Bastion",
        fullName: "Zunjar Bastion (Watch Tower)",
        lat: 18.3698,
        lng: 73.7548,
        importance: 7,
        visitTime: 10,
        effortLevel: 4,
        historicalScore: 7,
        spiritualScore: 1,
        architecturalScore: 8,
        description: "A massive defensive bastion on the northern edge offering panoramic views of the Sahyadri range. Key strategic point for monitoring enemy movements.",
        cardPosition: "top",
        icon: "🏰"
    },
    {
        id: "hawaPoint",
        name: "Hawa Point",
        fullName: "Hawa Point (Sunset Viewpoint)",
        lat: 18.3675,
        lng: 73.7508,
        importance: 7,
        visitTime: 15,
        effortLevel: 4,
        historicalScore: 5,
        spiritualScore: 6,
        architecturalScore: 3,
        description: "The most spectacular sunset viewpoint on the fort. Strong winds sweep across this western cliff edge, offering breathtaking views of the Sahyadri valleys below.",
        cardPosition: "left",
        icon: "🌅"
    },
    {
        id: "tilakBungalow",
        name: "Tilak Bungalow",
        fullName: "Lokmanya Tilak Bungalow",
        lat: 18.3658,
        lng: 73.7568,
        importance: 7,
        visitTime: 10,
        effortLevel: 1,
        historicalScore: 7,
        spiritualScore: 3,
        architecturalScore: 6,
        description: "The hilltop bungalow where Lokmanya Bal Gangadhar Tilak stayed during his visits. A key landmark connecting the fort to India's freedom struggle.",
        cardPosition: "bottom",
        icon: "🏠"
    }
];

/**
 * Geographic Bounding Box for Sinhagad Fort
 * Encompasses all real landmark coordinates with padding.
 */
export const SINHAGAD_MAP_BOUNDS = {
    north: 18.3710,   // Northernmost point (Zunjar Bastion area)
    south: 18.3638,   // Southernmost point (Kalyan Darwaza area)
    east: 73.7590,    // Easternmost point (Dev Take area)
    west: 73.7495     // Westernmost point (Hawa Point area)
};

/**
 * Fort center for Leaflet map centering
 */
export const SINHAGAD_CENTER = {
    lat: 18.3675,
    lng: 73.7545
};

/**
 * Graph edges for routing (pure logical connections with walk times)
 * Based on actual walking paths within the fort.
 */
export const sinhagadEdges = [
    // From Pune Darwaza (main entrance)
    { from: "puneDarwaza", to: "tilakBungalow", walkTime: 5, difficulty: 1 },
    { from: "puneDarwaza", to: "kalyanDarwaza", walkTime: 8, difficulty: 2 },
    { from: "puneDarwaza", to: "kondhaneshwarTemple", walkTime: 10, difficulty: 2 },

    // From Kalyan Darwaza
    { from: "kalyanDarwaza", to: "tanajiMemorial", walkTime: 6, difficulty: 3 },
    { from: "kalyanDarwaza", to: "hawaPoint", walkTime: 7, difficulty: 3 },

    // From Tanaji Memorial
    { from: "tanajiMemorial", to: "kondhaneshwarTemple", walkTime: 5, difficulty: 2 },
    { from: "tanajiMemorial", to: "hawaPoint", walkTime: 8, difficulty: 3 },

    // From Kondhaneshwar Temple
    { from: "kondhaneshwarTemple", to: "rajaramSamadhi", walkTime: 5, difficulty: 2 },
    { from: "kondhaneshwarTemple", to: "zunjarBastion", walkTime: 8, difficulty: 3 },

    // From Rajaram Samadhi
    { from: "rajaramSamadhi", to: "devTake", walkTime: 6, difficulty: 2 },
    { from: "rajaramSamadhi", to: "tilakBungalow", walkTime: 7, difficulty: 1 },

    // From Dev Take
    { from: "devTake", to: "zunjarBastion", walkTime: 5, difficulty: 3 },

    // From Zunjar Bastion
    { from: "zunjarBastion", to: "hawaPoint", walkTime: 12, difficulty: 4 },

    // Return paths
    { from: "tilakBungalow", to: "kondhaneshwarTemple", walkTime: 8, difficulty: 2 },
    { from: "hawaPoint", to: "puneDarwaza", walkTime: 12, difficulty: 3 }
];
