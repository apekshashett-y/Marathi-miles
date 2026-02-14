/**
 * INTERACTION TRACKER ENGINE -- ENHANCED
 * Tracks user behavior (clicks, time spent, skips) to feed into the Adaptive Learning system.
 * NOW SUPPORTS: Time-windowed analytics for ML features.
 */

const STORAGE_KEY = 'marathi_miles_interactions';

// In-memory timer references
const activeTimers = {};

const getStore = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        // Migration: Ensure new structure exists
        return data ? JSON.parse(data) : {};
    } catch (e) { return {}; }
};

const saveStore = (data) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const initLocation = (data, id) => {
    if (!data[id]) {
        data[id] = {
            clicks: 0,
            clickTimestamps: [], // NEW: timestamp array
            totalTimeSpent: 0,
            skips: 0,
            lastVisited: Date.now()
        };
    }
    // Migration check for old data
    if (!data[id].clickTimestamps) data[id].clickTimestamps = [];
};

export const interactionTracker = {
    recordClick: (id) => {
        const data = getStore();
        initLocation(data, id);

        const now = Date.now();
        data[id].clicks += 1;
        data[id].clickTimestamps.push(now);
        data[id].lastVisited = now;

        // Cleanup old timestamps (> 1 hour) to save space
        const cutoff = now - (60 * 60 * 1000);
        data[id].clickTimestamps = data[id].clickTimestamps.filter(t => t > cutoff);

        console.log(`[TRACKER] Clicked ${id} (Total: ${data[id].clicks})`);
        saveStore(data);
    },

    startTimer: (id) => {
        if (activeTimers[id]) return; // Already running
        activeTimers[id] = Date.now();
        console.log(`[TRACKER] Timer started for ${id}`);
    },

    stopTimer: (id) => {
        if (!activeTimers[id]) return;
        const startTime = activeTimers[id];
        const durationSec = (Date.now() - startTime) / 1000;

        const data = getStore();
        initLocation(data, id);
        data[id].totalTimeSpent += durationSec;
        saveStore(data);

        delete activeTimers[id];
        console.log(`[TRACKER] Timer stopped for ${id} (+${durationSec.toFixed(1)}s)`);
    },

    recordSkip: (id) => {
        const data = getStore();
        initLocation(data, id);
        data[id].skips += 1;
        console.log(`[TRACKER] Recorded SKIP for ${id} (Total: ${data[id].skips})`);
        saveStore(data);
    },

    getData: (id) => {
        const data = getStore();
        // Safe return
        if (!data[id]) return { clicks: 0, totalTimeSpent: 0, skips: 0, clickTimestamps: [] };
        return data[id];
    },

    // NEW: Get ML features
    getRecentStats: (id) => {
        const data = getStore();
        const loc = data[id];
        if (!loc || !loc.clickTimestamps) return { click5: 0, click15: 0, avgTime: 0 };

        const now = Date.now();
        const t5 = now - (5 * 60 * 1000);
        const t15 = now - (15 * 60 * 1000);

        const c5 = loc.clickTimestamps.filter(t => t > t5).length;
        const c15 = loc.clickTimestamps.filter(t => t > t15).length;

        return {
            clicks_5m: c5,
            clicks_15m: c15,
            avg_time: loc.clicks > 0 ? (loc.totalTimeSpent / loc.clicks) : 0,
            base_score: 5 // Mock base importance
        };
    },

    getAllData: () => getStore(),

    reset: () => {
        localStorage.removeItem(STORAGE_KEY);
    }
};
