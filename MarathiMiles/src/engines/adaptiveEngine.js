/**
 * ADAPTIVE LEARNING ENGINE - Enhanced V2 (Fixed Scaling)
 * Uses real behavioral data (interactionTracker) to compute dynamic boosts.
 */

import { interactionTracker } from './interactionTracker.js';

export const initializeAdaptiveLearning = () => {
    // Ensures baseline data exists
    console.log('[ADAPTIVE] Engine V2 initialized');
};

/**
 * Calculates adaptive boost for a location based on user behavior.
 * Formula: 
 * - Click = +0.3
 * - Long visit (>10s) = +0.5 per unit
 * - Skip = -0.5
 * Normalized between -3 and +3.
 */
export const calculateAdaptiveBoost = (locationId) => {
    const data = interactionTracker.getData(locationId);

    // Engagement Component
    // Click is worth 0.3 points
    // Time spent: 0.5 point per 10 seconds? User said "Long visit (>10s) = +0.5". 
    // Let's assume proportional: (totalScore / 10) * 0.5.
    const engagementScore = (data.clicks * 0.3) + ((data.totalTimeSpent / 10.0) * 0.5);

    // Penalty Component
    // Skip is worth -0.5 points
    const skipPenalty = (data.skips || 0) * 0.5;

    // Raw Boost
    let rawBoost = engagementScore - skipPenalty;

    // Normalize / Clamp
    // Max total boost per location = ±3
    const clamped = Math.max(-3.0, Math.min(3.0, rawBoost));

    if (Math.abs(clamped) > 0.1) {
        console.log(`[BOOST NORMALIZED] ${locationId}: Raw ${rawBoost.toFixed(2)} → Clamped ${clamped.toFixed(2)}`);
    }

    return parseFloat(clamped.toFixed(2));
};

/**
 * Returns an object map of all boosts: { locationId: boostValue, ... }
 */
export const calculateAdaptiveBoosts = (locations) => {
    const boosts = {};
    Object.keys(locations).forEach(id => {
        boosts[id] = calculateAdaptiveBoost(id);
    });
    return boosts;
};

// Legacy stubs kept for compatibility if needed elsewhere
export const trackClick = (id) => interactionTracker.recordClick(id);
export const trackTime = (id, sec) => { }; // handled by timer logic now
export const getAnalytics = () => interactionTracker.getAllData();
