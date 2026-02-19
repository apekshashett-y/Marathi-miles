/**
 * FORT GRAPH DATA - GIS UPGRADED
 *
 * PHASE 4 - All hardcoded pixel coordinates removed.
 * Nodes now store geographic lat/lng instead of pixel x/y.
 * The geoProjection utility converts these to SVG/CSS positions at render time.
 *
 * ⚠️ DO NOT MODIFY routing engine fields: edges, walkTime, difficulty, effortLevel,
 *    historicalImportance, visitTime — only spatial data is changed here.
 */

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
    }
};
