/**
 * PHASE 1 — Real Coordinate Data Layer
 * Geospatially accurate lat/lng coordinates for Shivneri Fort landmarks.
 * Coordinates sourced from real geographic data of Shivneri Fort, Junnar, Maharashtra.
 * NO pixel values allowed anywhere in this data.
 */

export const shivneriLocations = [
    {
        id: "mahaDarwaja",
        name: "Maha Darwaja",
        fullName: "Maha Darwaja (Main Entrance)",
        lat: 19.2043,
        lng: 73.8595,
        importance: 9,
        visitTime: 8,
        effortLevel: 2,
        historicalScore: 9,
        spiritualScore: 3,
        architecturalScore: 8,
        description: "The massive spike-studded main gate of Shivneri. The historical seven-gate protected entrance to the fort.",
        cardPosition: "right",
        icon: "⛩️"
    },
    {
        id: "shivJanmasthan",
        name: "Shiv Janmasthan",
        fullName: "Shiv Janmasthan (Birthplace)",
        lat: 19.2068,
        lng: 73.8617,
        importance: 10,
        visitTime: 15,
        effortLevel: 3,
        historicalScore: 10,
        spiritualScore: 10,
        architecturalScore: 9,
        description: "The sacred building where Chhatrapati Shivaji Maharaj was born. Highly sacred site.",
        cardPosition: "top",
        icon: "🏛️"
    },
    {
        id: "shivaiDeviTemple",
        name: "Shivai Devi Temple",
        fullName: "Shivai Devi Temple",
        lat: 19.2082,
        lng: 73.8638,
        importance: 9,
        visitTime: 10,
        effortLevel: 4,
        historicalScore: 9,
        spiritualScore: 10,
        architecturalScore: 6,
        description: "Ancient cave temple of the fort guardian deity. The goddess after whom Shivaji was named.",
        cardPosition: "top",
        icon: "🛕"
    },
    {
        id: "gangaJamunaTanks",
        name: "Ganga-Jamuna Tanks",
        fullName: "Ganga-Jamuna Tanks",
        lat: 19.2075,
        lng: 73.8652,
        importance: 7,
        visitTime: 7,
        effortLevel: 4,
        historicalScore: 7,
        spiritualScore: 6,
        architecturalScore: 6,
        description: "Rock-cut cisterns with fresh cool water year-round. East of main temple complex.",
        cardPosition: "right",
        icon: "💧"
    },
    {
        id: "badamiTalav",
        name: "Badami Talav",
        fullName: "Badami Talav",
        lat: 19.2055,
        lng: 73.8628,
        importance: 6,
        visitTime: 5,
        effortLevel: 2,
        historicalScore: 6,
        spiritualScore: 4,
        architecturalScore: 7,
        description: "Ancient water reservoir integral to the fort's sustainability.",
        cardPosition: "bottom",
        icon: "🏊"
    },
    {
        id: "bastions",
        name: "Fort Bastions",
        fullName: "Fort Bastions",
        lat: 19.2095,
        lng: 73.8660,
        importance: 5,
        visitTime: 10,
        effortLevel: 8,
        historicalScore: 5,
        spiritualScore: 1,
        architecturalScore: 8,
        description: "Defensive structures offering panoramic views of the Sahyadri ranges.",
        cardPosition: "right",
        icon: "🏰"
    },
    {
        id: "kadelotPoint",
        name: "Kadelot Point",
        fullName: "Kadelot Point (Execution)",
        lat: 19.2101,
        lng: 73.8645,
        importance: 8,
        visitTime: 8,
        effortLevel: 7,
        historicalScore: 8,
        spiritualScore: 1,
        architecturalScore: 4,
        description: "Sheer cliff used for punishment in historical times. Offers breathtaking views.",
        cardPosition: "left",
        icon: "🪨"
    },
    {
        id: "ambarkhana",
        name: "Ambarkhana",
        fullName: "Ambarkhana (Storage)",
        lat: 19.2088,
        lng: 73.8668,
        importance: 6,
        visitTime: 8,
        effortLevel: 3,
        historicalScore: 6,
        spiritualScore: 1,
        architecturalScore: 7,
        description: "Granary and ammunition storehouse. Northeast section of the fort.",
        cardPosition: "right",
        icon: "🏗️"
    }
];

/**
 * PHASE 2 — Map Boundary Calibration
 * Geographic bounding box for Shivneri Fort's actual extent.
 * These bounds encompass all real landmark coordinates.
 */
export const SHIVNERI_MAP_BOUNDS = {
    north: 19.2110,  // Northernmost point (Kadelot/Bastions area)
    south: 19.2035,  // Southernmost point (Main Entrance area)
    east: 73.8680,  // Easternmost point (Ambarkhana/Bastions)
    west: 73.8580   // Westernmost point (Main Gate area)
};

/**
 * Fort center for Leaflet map centering
 */
export const SHIVNERI_CENTER = {
    lat: 19.2070,
    lng: 73.8630
};

/**
 * Graph edges for routing (no pixel coords, pure logical connections)
 */
export const shivneriEdges = [
    { from: "mahaDarwaja", to: "shivJanmasthan", walkTime: 6, difficulty: 2 },
    { from: "mahaDarwaja", to: "badamiTalav", walkTime: 5, difficulty: 2 },
    { from: "shivJanmasthan", to: "shivaiDeviTemple", walkTime: 5, difficulty: 3 },
    { from: "shivJanmasthan", to: "badamiTalav", walkTime: 4, difficulty: 2 },
    { from: "badamiTalav", to: "gangaJamunaTanks", walkTime: 8, difficulty: 4 },
    { from: "gangaJamunaTanks", to: "shivaiDeviTemple", walkTime: 6, difficulty: 3 },
    { from: "gangaJamunaTanks", to: "bastions", walkTime: 12, difficulty: 6 },
    { from: "shivaiDeviTemple", to: "kadelotPoint", walkTime: 7, difficulty: 5 },
    { from: "kadelotPoint", to: "bastions", walkTime: 10, difficulty: 7 },
    { from: "bastions", to: "ambarkhana", walkTime: 8, difficulty: 5 }
];
