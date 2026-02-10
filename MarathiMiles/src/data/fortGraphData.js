export const fortGraphs = {
    shivneri: {
        fortName: "Shivneri Fort",
        nodes: {
            mainGate: {
                id: "mainGate",
                name: "Main Entrance Gate",
                description: "The historical seven-gate protected entrance to the fort.",
                coordinates: { x: 300, y: 560 },
                historicalImportance: 6,
                visitTime: 10,
                effortLevel: 1,
                cardPosition: "right"
            },
            shivJanmabhoomi: {
                id: "shivJanmabhoomi",
                name: "Shiv Janmabhoomi",
                description: "The birthplace of Chhatrapati Shivaji Maharaj. Highly sacred.",
                coordinates: { x: 380, y: 400 },
                historicalImportance: 10,
                visitTime: 30,
                effortLevel: 2,
                cardPosition: "top"
            },
            ammunitionStorage: {
                id: "ammunitionStorage",
                name: "Ammunition Storage",
                description: "Strategic storage rooms for the fort's defenses.",
                coordinates: { x: 550, y: 240 },
                historicalImportance: 7,
                visitTime: 15,
                effortLevel: 3,
                cardPosition: "left"
            },
            templeArea: {
                id: "templeArea",
                name: "Temple Area",
                description: "Shivai Devi Temple, the goddess after whom Shivaji was named.",
                coordinates: { x: 680, y: 360 },
                historicalImportance: 8,
                visitTime: 20,
                effortLevel: 2,
                cardPosition: "right"
            },
            viewpoint: {
                id: "viewpoint",
                name: "Viewpoint / Bastion",
                description: "Strategic overlook point offering 360-degree Sahyadri views.",
                coordinates: { x: 740, y: 500 },
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
