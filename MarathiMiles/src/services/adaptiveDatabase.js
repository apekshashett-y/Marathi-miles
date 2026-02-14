// Adaptive Route Learning System - Database Layer
// Uses localStorage for persistent storage without external APIs
// Tracks user interactions and calculates adaptive scores

/**
 * Database Schema (localStorage):
 * 
 * 1. user_interactions: Array of interaction objects
 *    {
 *      id: string (UUID),
 *      user_id: string (generated per device),
 *      location_id: string,
 *      fort_id: string,
 *      clicked: boolean,
 *      time_spent_minutes: number,
 *      skipped: boolean,
 *      timestamp: number (Unix timestamp)
 *    }
 * 
 * 2. location_stats: Object keyed by fort_id + location_id
 *    {
 *      location_id: string,
 *      fort_id: string,
 *      total_clicks: number,
 *      total_time_spent: number,
 *      total_skips: number,
 *      visit_count: number,
 *      adaptive_score: number,
 *      last_updated: number
 *    }
 * 
 * 3. adaptive_config: Configuration for adaptive scoring
 *    {
 *      click_weight: number (default: 2),
 *      time_weight: number (default: 1.5),
 *      skip_weight: number (default: 3),
 *      enabled: boolean (default: true)
 *    }
 */

const STORAGE_KEYS = {
    INTERACTIONS: 'marathimiles_user_interactions',
    LOCATION_STATS: 'marathimiles_location_stats',
    CONFIG: 'marathimiles_adaptive_config',
    USER_ID: 'marathimiles_user_id'
};

// Default configuration
const DEFAULT_CONFIG = {
    click_weight: 2,
    time_weight: 1.5,
    skip_weight: 3,
    enabled: true
};

// Generate unique user ID (device-specific)
function getUserId() {
    let userId = localStorage.getItem(STORAGE_KEYS.USER_ID);
    if (!userId) {
        userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem(STORAGE_KEYS.USER_ID, userId);
    }
    return userId;
}

// Generate UUID for interaction records
function generateUUID() {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Initialize the database (creates default entries if not exist)
 */
export function initializeDatabase() {
    // Initialize interactions array
    if (!localStorage.getItem(STORAGE_KEYS.INTERACTIONS)) {
        localStorage.setItem(STORAGE_KEYS.INTERACTIONS, JSON.stringify([]));
    }

    // Initialize location stats
    if (!localStorage.getItem(STORAGE_KEYS.LOCATION_STATS)) {
        localStorage.setItem(STORAGE_KEYS.LOCATION_STATS, JSON.stringify({}));
    }

    // Initialize config
    if (!localStorage.getItem(STORAGE_KEYS.CONFIG)) {
        localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(DEFAULT_CONFIG));
    }

    getUserId(); // Ensure user ID exists
}

/**
 * Add a user interaction record
 * @param {Object} interaction - Interaction data
 */
export function addInteraction(interaction) {
    const interactions = getInteractions();
    const newInteraction = {
        id: generateUUID(),
        user_id: getUserId(),
        timestamp: Date.now(),
        ...interaction
    };

    interactions.push(newInteraction);
    localStorage.setItem(STORAGE_KEYS.INTERACTIONS, JSON.stringify(interactions));

    // Update location stats
    updateLocationStats(interaction.fort_id, interaction.location_id);
}

/**
 * Get all interactions
 */
export function getInteractions() {
    const data = localStorage.getItem(STORAGE_KEYS.INTERACTIONS);
    return data ? JSON.parse(data) : [];
}

/**
 * Get interactions for a specific fort
 */
export function getInteractionsByFort(fortId) {
    const interactions = getInteractions();
    return interactions.filter(i => i.fort_id === fortId);
}

/**
 * Get interactions for a specific location
 */
export function getInteractionsByLocation(fortId, locationId) {
    const interactions = getInteractions();
    return interactions.filter(i => 
        i.fort_id === fortId && i.location_id === locationId
    );
}

/**
 * Update location statistics based on interactions
 * @param {string} fortId - Fort identifier
 * @param {string} locationId - Location identifier
 */
export function updateLocationStats(fortId, locationId) {
    const statsKey = `${fortId}_${locationId}`;
    const allStats = getLocationStats();
    const interactions = getInteractionsByLocation(fortId, locationId);

    // Calculate aggregated statistics
    const total_clicks = interactions.filter(i => i.clicked).length;
    const total_time_spent = interactions.reduce((sum, i) => sum + (i.time_spent_minutes || 0), 0);
    const total_skips = interactions.filter(i => i.skipped).length;
    const visit_count = interactions.length;

    // Calculate adaptive score
    const config = getConfig();
    const adaptive_score = calculateAdaptiveScore(
        total_clicks,
        total_time_spent,
        total_skips,
        visit_count,
        config
    );

    allStats[statsKey] = {
        location_id: locationId,
        fort_id: fortId,
        total_clicks,
        total_time_spent,
        total_skips,
        visit_count,
        adaptive_score,
        last_updated: Date.now()
    };

    localStorage.setItem(STORAGE_KEYS.LOCATION_STATS, JSON.stringify(allStats));
}

/**
 * Calculate adaptive score for a location
 * Formula: base_importance + (clicks * click_weight) + (avg_time * time_weight) - (skips * skip_weight)
 */
function calculateAdaptiveScore(clicks, totalTime, skips, visitCount, config) {
    const avgTimeSpent = visitCount > 0 ? totalTime / visitCount : 0;
    
    const clickScore = clicks * config.click_weight;
    const timeScore = avgTimeSpent * config.time_weight;
    const skipPenalty = skips * config.skip_weight;
    
    // Base score starts at 0, gets adjusted by user behavior
    const adaptiveScore = clickScore + timeScore - skipPenalty;
    
    // Normalize to ensure it's positive and reasonable
    return Math.max(0, adaptiveScore);
}

/**
 * Get all location statistics
 */
export function getLocationStats() {
    const data = localStorage.getItem(STORAGE_KEYS.LOCATION_STATS);
    return data ? JSON.parse(data) : {};
}

/**
 * Get statistics for a specific location
 */
export function getLocationStatsById(fortId, locationId) {
    const allStats = getLocationStats();
    const statsKey = `${fortId}_${locationId}`;
    return allStats[statsKey] || null;
}

/**
 * Get statistics for all locations in a fort
 */
export function getLocationStatsByFort(fortId) {
    const allStats = getLocationStats();
    return Object.values(allStats).filter(stat => stat.fort_id === fortId);
}

/**
 * Get adaptive configuration
 */
export function getConfig() {
    const data = localStorage.getItem(STORAGE_KEYS.CONFIG);
    return data ? JSON.parse(data) : DEFAULT_CONFIG;
}

/**
 * Update adaptive configuration
 */
export function updateConfig(newConfig) {
    const currentConfig = getConfig();
    const updatedConfig = { ...currentConfig, ...newConfig };
    localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(updatedConfig));

    // Recalculate all adaptive scores with new weights
    recalculateAllAdaptiveScores();
}

/**
 * Recalculate adaptive scores for all locations
 */
export function recalculateAllAdaptiveScores() {
    const allStats = getLocationStats();
    const config = getConfig();

    Object.keys(allStats).forEach(key => {
        const stat = allStats[key];
        stat.adaptive_score = calculateAdaptiveScore(
            stat.total_clicks,
            stat.total_time_spent,
            stat.total_skips,
            stat.visit_count,
            config
        );
        stat.last_updated = Date.now();
    });

    localStorage.setItem(STORAGE_KEYS.LOCATION_STATS, JSON.stringify(allStats));
}

/**
 * Get the adaptive score for a location (combining base importance + adaptive learning)
 * @param {string} fortId - Fort identifier
 * @param {string} locationId - Location identifier
 * @param {number} baseImportance - Original static importance score (0-10)
 * @returns {number} - Combined score
 */
export function getAdaptiveImportance(fortId, locationId, baseImportance) {
    const config = getConfig();
    
    // If adaptive mode is disabled, return base importance
    if (!config.enabled) {
        return baseImportance;
    }

    const stats = getLocationStatsById(fortId, locationId);
    
    // If no user data exists yet, return base importance
    if (!stats || stats.visit_count === 0) {
        return baseImportance;
    }

    // Combine base importance with adaptive score
    // Base importance is weighted slightly higher to preserve expert curation
    // Adaptive score adds learning from user behavior
    const combinedScore = (baseImportance * 0.6) + (stats.adaptive_score * 0.4);
    
    return Math.max(0, Math.min(10, combinedScore)); // Clamp between 0-10
}

/**
 * Get analytics for a fort (for UI display)
 */
export function getFortAnalytics(fortId) {
    const stats = getLocationStatsByFort(fortId);
    const interactions = getInteractionsByFort(fortId);

    if (stats.length === 0) {
        return null;
    }

    // Calculate popular spots (highest clicks)
    const popularSpots = [...stats]
        .sort((a, b) => b.total_clicks - a.total_clicks)
        .slice(0, 3)
        .map(s => ({
            location_id: s.location_id,
            clicks: s.total_clicks
        }));

    // Calculate frequently skipped spots
    const skippedSpots = [...stats]
        .filter(s => s.total_skips > 0)
        .sort((a, b) => b.total_skips - a.total_skips)
        .slice(0, 3)
        .map(s => ({
            location_id: s.location_id,
            skips: s.total_skips
        }));

    // Calculate average visit duration per location
    const avgDurations = stats.map(s => ({
        location_id: s.location_id,
        avg_duration: s.visit_count > 0 ? (s.total_time_spent / s.visit_count).toFixed(1) : 0
    }));

    return {
        total_visitors: new Set(interactions.map(i => i.user_id)).size,
        total_interactions: interactions.length,
        popular_spots: popularSpots,
        skipped_spots: skippedSpots,
        avg_durations: avgDurations
    };
}

/**
 * Clear all data (for testing/debugging)
 */
export function clearAllData() {
    localStorage.removeItem(STORAGE_KEYS.INTERACTIONS);
    localStorage.removeItem(STORAGE_KEYS.LOCATION_STATS);
    localStorage.removeItem(STORAGE_KEYS.CONFIG);
    // Don't clear user ID to maintain device identity
    initializeDatabase();
}

/**
 * Export data as JSON (for backup/analysis)
 */
export function exportData() {
    return {
        interactions: getInteractions(),
        location_stats: getLocationStats(),
        config: getConfig(),
        exported_at: new Date().toISOString()
    };
}

/**
 * Import data from JSON (for restore)
 */
export function importData(data) {
    if (data.interactions) {
        localStorage.setItem(STORAGE_KEYS.INTERACTIONS, JSON.stringify(data.interactions));
    }
    if (data.location_stats) {
        localStorage.setItem(STORAGE_KEYS.LOCATION_STATS, JSON.stringify(data.location_stats));
    }
    if (data.config) {
        localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(data.config));
    }
}
