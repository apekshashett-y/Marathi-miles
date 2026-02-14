/**
 * CROWD HEATMAP INTELLIGENCE ENGINE
 * Tracks visitor density and provides heatmap data for visualization and routing logic.
 */

const STORAGE_KEY = 'marathi_miles_crowd_data';

// Mock Initial Data: Some locations are naturally busy
const DEFAULT_CROWD = {
    'mahaDarwaja': 0.9, // Main entrance always busy
    'shivJanmasthan': 0.8, // Popular
    'badamiTalav': 0.6,
    'gangaJamuna': 0.5,
    'shivaiDeviTemple': 0.7,
    'amberkhana': 0.4,
    'kadelout': 0.2 // Edge of map
};

const getCrowdData = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) return JSON.parse(data);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_CROWD));
        return DEFAULT_CROWD;
    } catch (e) { return DEFAULT_CROWD; }
};

const saveCrowdData = (data) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// Simulate real-time fluctuation
export const getCrowdLevel = (locationId) => {
    const base = getCrowdData()[locationId] || 0.3;
    // Add random noise for simulation
    const variation = (Math.random() - 0.5) * 0.1;
    return Math.max(0, Math.min(1, base + variation));
};

export const recordVisit = (locationId) => {
    const data = getCrowdData();
    const current = data[locationId] || 0.3;
    // Slightly increase crowd density when visited
    const updated = Math.min(current + 0.05, 1.0);

    data[locationId] = updated;
    saveCrowdData(data);

    // Also decay others slightly to simulate movement?
    // For simplicity, just update target.
    console.log(`[CROWD] Updated ${locationId} density: ${updated.toFixed(2)}`);
};

// Helper for UI color (Blue -> Yellow -> Red)
export const getCrowdColor = (density) => {
    if (density < 0.4) return '#3b82f6'; // Low (Blue)
    if (density < 0.7) return '#fbbf24'; // Med (Yellow)
    return '#ef4444'; // High (Red)
};

export const getAvoidancePenalty = (locationId, isAvoidMode) => {
    if (!isAvoidMode) return 0;
    const density = getCrowdLevel(locationId);
    // Severe penalty for high density if avoiding
    if (density > 0.7) return density * 5.0; // Huge penalty
    if (density > 0.5) return density * 2.0;
    return 0;
};
