/**
 * FORT GRAPH DATA - GIS UPGRADED
 *
 * PHASE 4 - All hardcoded pixel coordinates removed.
 * Nodes now store geographic lat/lng instead of pixel x/y.
 * The geoProjection utility converts these to SVG/CSS positions at render time.
 *
/**
 * ⚠️ DO NOT MODIFY routing engine fields: edges, walkTime, difficulty, effortLevel,
 *    historicalImportance, visitTime — only spatial data is changed here.
 */
import { pratapgadFortLocations, pratapgadGraphEdges } from './pratapgadFortData.js';
import { lohagadFortLocations, lohagadGraphEdges } from './lohagadFortData.js';

export const fortGraphs = {
    shivneri: {
        fortId: "shivneri",
        fortName: "Shivneri Fort",
        nodes: {
            mainGate: {
                id: "mainGate",
                name: "Maha Darwaja",
                description: "The massive spike-studded main gate — historical seven-gate protected entrance to the fort.",
                // 🌍 Real lat/lng — no pixel values
                lat: 19.2043,
                lng: 73.8595,
                historicalImportance: 6,
                visitTime: 10,
                effortLevel: 1,
                cardPosition: "right"
            },
            shivJanmabhoomi: {
                id: "shivJanmabhoomi",
                name: "Shiv Janmabhoomi",
                description: "The birthplace of Chhatrapati Shivaji Maharaj. Highly sacred.",
                lat: 19.2068,
                lng: 73.8617,
                historicalImportance: 10,
                visitTime: 30,
                effortLevel: 2,
                cardPosition: "top"
            },
            ammunitionStorage: {
                id: "ammunitionStorage",
                name: "Ambarkhana (Storage)",
                description: "Granary and ammunition storehouse. Strategic storage rooms for the fort's defenses.",
                lat: 19.2088,
                lng: 73.8668,
                historicalImportance: 7,
                visitTime: 15,
                effortLevel: 3,
                cardPosition: "left"
            },
            templeArea: {
                id: "templeArea",
                name: "Shivai Devi Temple",
                description: "Ancient cave temple of the fort guardian deity — the goddess after whom Shivaji was named.",
                lat: 19.2082,
                lng: 73.8638,
                historicalImportance: 8,
                visitTime: 20,
                effortLevel: 2,
                cardPosition: "right"
            },
            viewpoint: {
                id: "viewpoint",
                name: "Kadelot / Bastions",
                description: "Strategic overlook and sheer cliff offering 360-degree Sahyadri views.",
                lat: 19.2101,
                lng: 73.8645,
                historicalImportance: 5,
                visitTime: 15,
                effortLevel: 4,
                cardPosition: "bottom"
            }
        },
        edges: [
            { from: "mainGate", to: "shivJanmabhoomi", walkTime: 12, difficulty: 2 },
            { from: "shivJanmabhoomi", to: "ammunitionStorage", walkTime: 18, difficulty: 3 },
            { from: "ammunitionStorage", to: "templeArea", walkTime: 10, difficulty: 2 },
            { from: "templeArea", to: "viewpoint", walkTime: 15, difficulty: 4 },
            { from: "mainGate", to: "templeArea", walkTime: 25, difficulty: 3 },
            { from: "shivJanmabhoomi", to: "viewpoint", walkTime: 30, difficulty: 4 }
        ]
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 🏰 RAIGAD FORT — Capital of the Maratha Empire
    // Real lat/lng coordinates for 9 key Raigad landmarks
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    raigad: {
        fortId: "raigad",
        fortName: "Raigad Fort",
        nodes: {
            mainGate: {
                id: "mainGate",
                name: "Mena Darwaza",
                description: "The grand main entrance to Raigad Fort. This fortified gateway was the primary access point, featuring massive wooden doors and defensive bastions.",
                lat: 18.2335,
                lng: 73.4478,
                historicalImportance: 7,
                visitTime: 10,
                effortLevel: 1,
                cardPosition: "right"
            },
            rajSabha: {
                id: "rajSabha",
                name: "Raigad Royal Court",
                description: "The grand audience hall where Chhatrapati Shivaji Maharaj held court. The coronation of the Maratha Empire took place here in 1674.",
                lat: 18.2358,
                lng: 73.4492,
                historicalImportance: 10,
                visitTime: 25,
                effortLevel: 2,
                cardPosition: "right"
            },
            samadhi: {
                id: "samadhi",
                name: "Shivaji Maharaj Samadhi",
                description: "The sacred memorial tomb of Chhatrapati Shivaji Maharaj. The most revered site on the fort.",
                lat: 18.2342,
                lng: 73.4500,
                historicalImportance: 10,
                visitTime: 20,
                effortLevel: 2,
                cardPosition: "bottom"
            },
            gangasagarLake: {
                id: "gangasagarLake",
                name: "Gangasagar Lake",
                description: "A large freshwater lake atop the fort used for drinking water supply. Sustained the fort's population year-round.",
                lat: 18.2372,
                lng: 73.4520,
                historicalImportance: 6,
                visitTime: 12,
                effortLevel: 3,
                cardPosition: "right"
            },
            hirkaniBastion: {
                id: "hirkaniBastion",
                name: "Hirkani Bastion",
                description: "Named after Hirakani, a brave village woman who scaled the impossible cliff at night to reach her child.",
                lat: 18.2380,
                lng: 73.4470,
                historicalImportance: 8,
                visitTime: 15,
                effortLevel: 3,
                cardPosition: "left"
            },
            takmakTok: {
                id: "takmakTok",
                name: "Takmak Tok",
                description: "A sheer 1,400-foot cliff from which traitors were thrown. Offers breathtaking panoramic views of the Konkan coast.",
                lat: 18.2385,
                lng: 73.4505,
                historicalImportance: 8,
                visitTime: 15,
                effortLevel: 4,
                cardPosition: "top"
            },
            waghDarwaza: {
                id: "waghDarwaza",
                name: "Dragon's Tooth",
                description: "The secondary fortified gate resembling a dragon's jaw. Named 'Wagh Darwaza' (Tiger Gate) with ingenious defensive architecture.",
                lat: 18.2360,
                lng: 73.4462,
                historicalImportance: 7,
                visitTime: 12,
                effortLevel: 3,
                cardPosition: "left"
            },
            ranivasa: {
                id: "ranivasa",
                name: "Queens' Quarters",
                description: "The private residential quarters of the royal queens. Features intricate stone carvings and private bathing pools.",
                lat: 18.2345,
                lng: 73.4515,
                historicalImportance: 7,
                visitTime: 15,
                effortLevel: 2,
                cardPosition: "right"
            },
            bazaarPeth: {
                id: "bazaarPeth",
                name: "Market Area",
                description: "The ruins of the ancient marketplace that once had over 200 shops. The commercial heart of the fort city.",
                lat: 18.2325,
                lng: 73.4498,
                historicalImportance: 5,
                visitTime: 10,
                effortLevel: 1,
                cardPosition: "bottom"
            }
        },
        edges: [
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
            { from: "waghDarwaza", to: "hirkaniBastion", walkTime: 8, difficulty: 3 },
            { from: "ranivasa", to: "gangasagarLake", walkTime: 7, difficulty: 2 },
            { from: "bazaarPeth", to: "ranivasa", walkTime: 8, difficulty: 1 }
        ]
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 🦁 SINHAGAD FORT — The Lion's Fort (Battle of Sinhagad 1670)
    // Real lat/lng coordinates for 9 key Sinhagad landmarks
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    sinhagad: {
        fortId: "sinhagad",
        fortName: "Sinhagad Fort",
        nodes: {
            mainGate: {
                id: "mainGate",
                name: "Pune Darwaza",
                description: "The main entrance facing Pune city. A massive fortified gateway with spike-studded doors, the primary access point used by Maratha soldiers.",
                lat: 18.3662,
                lng: 73.7555,
                historicalImportance: 8,
                visitTime: 8,
                effortLevel: 1,
                cardPosition: "right"
            },
            kalyanDarwaza: {
                id: "kalyanDarwaza",
                name: "Kalyan Darwaza",
                description: "The gate from which Tanaji Malusare and his warriors scaled the cliff in the legendary night attack of 1670.",
                lat: 18.3648,
                lng: 73.7528,
                historicalImportance: 9,
                visitTime: 10,
                effortLevel: 3,
                cardPosition: "left"
            },
            tanajiMemorial: {
                id: "tanajiMemorial",
                name: "Tanaji Memorial",
                description: "Memorial of the legendary warrior Tanaji Malusare who sacrificed his life to recapture Sinhagad. 'Gad aala pan Sinha gela.'",
                lat: 18.3672,
                lng: 73.7522,
                historicalImportance: 10,
                visitTime: 15,
                effortLevel: 3,
                cardPosition: "top"
            },
            kondhaneshwarTemple: {
                id: "kondhaneshwarTemple",
                name: "Kondhaneshwar Temple",
                description: "An ancient Shiva temple with a natural spring, believed to be over 2000 years old. Perennial water source flowing through the sanctum.",
                lat: 18.3682,
                lng: 73.7542,
                historicalImportance: 8,
                visitTime: 12,
                effortLevel: 2,
                cardPosition: "right"
            },
            rajaramSamadhi: {
                id: "rajaramSamadhi",
                name: "Rajaram Samadhi",
                description: "Sacred memorial of Rajaram Maharaj, the younger son of Shivaji Maharaj. He passed away here in 1700.",
                lat: 18.3688,
                lng: 73.7562,
                historicalImportance: 9,
                visitTime: 12,
                effortLevel: 2,
                cardPosition: "right"
            },
            devTake: {
                id: "devTake",
                name: "Dev Take",
                description: "Ancient rock-cut water reservoir that sustained the fort's garrison year-round. A marvel of Maratha-era water engineering.",
                lat: 18.3694,
                lng: 73.7578,
                historicalImportance: 6,
                visitTime: 8,
                effortLevel: 3,
                cardPosition: "right"
            },
            zunjarBastion: {
                id: "zunjarBastion",
                name: "Zunjar Bastion",
                description: "Massive defensive bastion on the northern edge offering panoramic views of the Sahyadri range. Key strategic monitoring point.",
                lat: 18.3698,
                lng: 73.7548,
                historicalImportance: 7,
                visitTime: 10,
                effortLevel: 4,
                cardPosition: "top"
            },
            hawaPoint: {
                id: "hawaPoint",
                name: "Hawa Point",
                description: "The most spectacular sunset viewpoint on the fort. Strong winds sweep across this western cliff edge with breathtaking valley views.",
                lat: 18.3675,
                lng: 73.7508,
                historicalImportance: 5,
                visitTime: 15,
                effortLevel: 4,
                cardPosition: "left"
            },
            tilakBungalow: {
                id: "tilakBungalow",
                name: "Tilak Bungalow",
                description: "Hilltop bungalow where Lokmanya Bal Gangadhar Tilak stayed. A key landmark connecting the fort to India's freedom struggle.",
                lat: 18.3658,
                lng: 73.7568,
                historicalImportance: 7,
                visitTime: 10,
                effortLevel: 1,
                cardPosition: "bottom"
            }
        },
        edges: [
            { from: "mainGate", to: "tilakBungalow", walkTime: 5, difficulty: 1 },
            { from: "mainGate", to: "kalyanDarwaza", walkTime: 8, difficulty: 2 },
            { from: "mainGate", to: "kondhaneshwarTemple", walkTime: 10, difficulty: 2 },
            { from: "kalyanDarwaza", to: "tanajiMemorial", walkTime: 6, difficulty: 3 },
            { from: "kalyanDarwaza", to: "hawaPoint", walkTime: 7, difficulty: 3 },
            { from: "tanajiMemorial", to: "kondhaneshwarTemple", walkTime: 5, difficulty: 2 },
            { from: "tanajiMemorial", to: "hawaPoint", walkTime: 8, difficulty: 3 },
            { from: "kondhaneshwarTemple", to: "rajaramSamadhi", walkTime: 5, difficulty: 2 },
            { from: "kondhaneshwarTemple", to: "zunjarBastion", walkTime: 8, difficulty: 3 },
            { from: "rajaramSamadhi", to: "devTake", walkTime: 6, difficulty: 2 },
            { from: "rajaramSamadhi", to: "tilakBungalow", walkTime: 7, difficulty: 1 },
            { from: "devTake", to: "zunjarBastion", walkTime: 5, difficulty: 3 },
            { from: "zunjarBastion", to: "hawaPoint", walkTime: 12, difficulty: 4 },
            { from: "tilakBungalow", to: "kondhaneshwarTemple", walkTime: 8, difficulty: 2 },
            { from: "hawaPoint", to: "mainGate", walkTime: 12, difficulty: 3 }
        ]
    },
    pratapgad: {
        fortId: "pratapgad",
        fortName: "Pratapgad Fort",
        nodes: pratapgadFortLocations,
        edges: pratapgadGraphEdges
    },
    lohagad: {
        fortId: "lohagad",
        fortName: "Lohagad Fort",
        nodes: lohagadFortLocations,
        edges: lohagadGraphEdges
    }
};
