/**
 * PRATAPGAD FORT — Real Coordinate Data Layer
 * Geospatially accurate lat/lng coordinates for Pratapgad Fort landmarks.
 * Coordinates sourced from real geographic data of Pratapgad Fort, Satara, Maharashtra.
 * NO pixel values — all positions derived from lat/lng at render time.
 */

export const pratapgadLocations = [
    {
        id: "mainGate",
        name: "Pratapgad Darwaza",
        fullName: "Pratapgad Darwaza (Main Entrance)",
        lat: 17.9230,
        lng: 73.5700,
        importance: 8,
        avgVisitTime: 10,
        walkingEffort: 2,
        historicalScore: 8,
        spiritualScore: 2,
        architecturalScore: 9,
        description: "The imposing main entrance of the fort, featuring thick wooden doors with iron spikes, hidden strategically to prevent direct elephant charges.",
        cardPosition: "right",
        icon: "⛩️"
    },
    {
        id: "bhavaniTemple",
        name: "Bhavani Temple",
        fullName: "Bhavani Mata Temple",
        lat: 17.9250,
        lng: 73.5700,
        importance: 10,
        avgVisitTime: 15,
        walkingEffort: 2,
        historicalScore: 9,
        spiritualScore: 10,
        architecturalScore: 8,
        description: "The revered temple of Goddess Bhavani, established by Chhatrapati Shivaji Maharaj in 1661. It houses a spatik (crystal) shivling.",
        cardPosition: "left",
        icon: "🛕"
    },
    {
        id: "afzalKhanTomb",
        name: "Afzal Khan Tomb",
        fullName: "Afzal Khan Tomb (Vijay Smarak)",
        lat: 17.9270,
        lng: 73.5685,
        importance: 9,
        avgVisitTime: 15,
        walkingEffort: 3,
        historicalScore: 10,
        spiritualScore: 1,
        architecturalScore: 6,
        description: "The site where the historic Battle of Pratapgad (1659) culminated. The tomb marks the defeat of Adilshahi general Afzal Khan.",
        cardPosition: "top",
        icon: "⚔️"
    },
    {
        id: "baleKilla",
        name: "Bale Killa",
        fullName: "Bale Killa (Upper Fort)",
        lat: 17.9275,
        lng: 73.5720,
        importance: 8,
        avgVisitTime: 20,
        walkingEffort: 4,
        historicalScore: 8,
        spiritualScore: 4,
        architecturalScore: 7,
        description: "The highest point of the fort, housing the royal residence and offering expansive views of the dense Jawali forests and Konkan valley.",
        cardPosition: "right",
        icon: "🏰"
    },
    {
        id: "machiDarwaza",
        name: "Machi Darwaza",
        fullName: "Machi Darwaza",
        lat: 17.9250,
        lng: 73.5730,
        importance: 7,
        avgVisitTime: 10,
        walkingEffort: 2,
        historicalScore: 7,
        spiritualScore: 1,
        architecturalScore: 8,
        description: "The gateway connecting the upper fort to the eastern plateau. An essential defensive structure guarding the fort's flanks.",
        cardPosition: "right",
        icon: "🚪"
    },
    {
        id: "sajjaKothi",
        name: "Sajja Kothi",
        fullName: "Sajja Kothi (Watch Tower)",
        lat: 17.9235,
        lng: 73.5720,
        importance: 7,
        avgVisitTime: 12,
        walkingEffort: 2,
        historicalScore: 6,
        spiritualScore: 2,
        architecturalScore: 7,
        description: "A prominent watchtower pavilion used for military surveillance and meetings. It overlooks the treacherous winding paths leading to the fort.",
        cardPosition: "bottom",
        icon: "🔭"
    },
    {
        id: "lowerFort",
        name: "Lower Fort Area",
        fullName: "Lower Fort Area (Base Area)",
        lat: 17.9215,
        lng: 73.5700,
        importance: 5,
        avgVisitTime: 15,
        walkingEffort: 1,
        historicalScore: 5,
        spiritualScore: 2,
        architecturalScore: 4,
        description: "The expansive base area (Machi) that once housed soldiers, artisans, and markets. It forms the first tier of the fort's defenses.",
        cardPosition: "bottom",
        icon: "🏕️"
    },
    {
        id: "jivdaniBuruj",
        name: "Jivdani Buruj",
        fullName: "Jivdani Buruj",
        lat: 17.9240,
        lng: 73.5670,
        importance: 6,
        avgVisitTime: 10,
        walkingEffort: 3,
        historicalScore: 6,
        spiritualScore: 1,
        architecturalScore: 7,
        description: "A heavily fortified western bastion built to secure the fort's vulnerable side, overlooking the deep ravines of the Sahyadri mountains.",
        cardPosition: "left",
        icon: "🛡️"
    },
    {
        id: "katesPoint",
        name: "Kates Point",
        fullName: "Kates Point (View Point)",
        lat: 17.9255,
        lng: 73.5660,
        importance: 6,
        avgVisitTime: 10,
        walkingEffort: 3,
        historicalScore: 4,
        spiritualScore: 4,
        architecturalScore: 3,
        description: "A spectacular viewpoint offering breathtaking, uninterrupted vistas of the lush green valleys and the distant Mahabaleshwar range.",
        cardPosition: "left",
        icon: "🌄"
    }
];

/**
 * Geographic Bounding Box for Pratapgad Fort
 */
export const PRATAPGAD_MAP_BOUNDS = {
    north: 17.9290,   // Northernmost point
    south: 17.9200,   // Southernmost point
    east: 73.5750,    // Easternmost point
    west: 73.5640     // Westernmost point
};

/**
 * Fort center for Leaflet map centering
 */
export const PRATAPGAD_CENTER = {
    lat: 17.9245,
    lng: 73.5695
};

/**
 * Graph edges for routing (pure logical connections with walk times)
 */
export const pratapgadEdges = [
    // From Pratapgad Darwaza (Main Entrance)
    { from: "mainGate", to: "lowerFort", walkingTime: 5, difficulty: 1 },
    { from: "mainGate", to: "bhavaniTemple", walkingTime: 8, difficulty: 2 },
    { from: "mainGate", to: "jivdaniBuruj", walkingTime: 10, difficulty: 3 },
    { from: "mainGate", to: "sajjaKothi", walkingTime: 7, difficulty: 2 },

    // From Bhavani Temple
    { from: "bhavaniTemple", to: "machiDarwaza", walkingTime: 6, difficulty: 2 },
    { from: "bhavaniTemple", to: "baleKilla", walkingTime: 12, difficulty: 4 },
    { from: "bhavaniTemple", to: "katesPoint", walkingTime: 8, difficulty: 2 },
    
    // From Bale Killa
    { from: "baleKilla", to: "afzalKhanTomb", walkingTime: 10, difficulty: 3 },
    { from: "baleKilla", to: "machiDarwaza", walkingTime: 8, difficulty: 3 },

    // From Afzal Khan Tomb
    { from: "afzalKhanTomb", to: "katesPoint", walkingTime: 7, difficulty: 2 },

    // From Machi Darwaza
    { from: "machiDarwaza", to: "sajjaKothi", walkingTime: 5, difficulty: 1 },

    // From Jivdani Buruj
    { from: "jivdaniBuruj", to: "katesPoint", walkingTime: 6, difficulty: 2 }
];
