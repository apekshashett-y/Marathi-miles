// User Behavior Tracking System
// Automatically tracks user interactions with locations
// Integrates with adaptive database

import { addInteraction } from '../services/adaptiveDatabase';

/**
 * Initialize tracking for a location visit session
 * Returns a session object with tracking methods
 */
export function createLocationSession(fortId, locationId) {
    const session = {
        fortId,
        locationId,
        startTime: Date.now(),
        clicked: false,
        skipped: false,
        ended: false
    };

    return {
        /**
         * Mark location as clicked/viewed
         */
        markClicked: () => {
            if (!session.ended) {
                session.clicked = true;
            }
        },

        /**
         * Mark location as skipped
         */
        markSkipped: () => {
            if (!session.ended) {
                session.skipped = true;
            }
        },

        /**
         * End session and save interaction
         */
        endSession: () => {
            if (session.ended) return;

            const endTime = Date.now();
            const timeSpentMs = endTime - session.startTime;
            const timeSpentMinutes = parseFloat((timeSpentMs / 60000).toFixed(2));

            // Save interaction to database
            addInteraction({
                fort_id: session.fortId,
                location_id: session.locationId,
                clicked: session.clicked,
                time_spent_minutes: timeSpentMinutes,
                skipped: session.skipped
            });

            session.ended = true;
        },

        /**
         * Get current session info (for debugging)
         */
        getSessionInfo: () => ({
            ...session,
            currentDuration: Date.now() - session.startTime
        })
    };
}

/**
 * Track location click event
 * Use when user explicitly clicks on a location in the route
 */
export function trackLocationClick(fortId, locationId) {
    addInteraction({
        fort_id: fortId,
        location_id: locationId,
        clicked: true,
        time_spent_minutes: 0,
        skipped: false
    });
}

/**
 * Track location skip event
 * Use when location was in route but user skipped it
 */
export function trackLocationSkip(fortId, locationId) {
    addInteraction({
        fort_id: fortId,
        location_id: locationId,
        clicked: false,
        time_spent_minutes: 0,
        skipped: true
    });
}

/**
 * Track location view with time spent
 * Use when user views location details
 */
export function trackLocationView(fortId, locationId, timeSpentMinutes) {
    addInteraction({
        fort_id: fortId,
        location_id: locationId,
        clicked: true,
        time_spent_minutes: timeSpentMinutes,
        skipped: false
    });
}

/**
 * Hook to track time spent on a page/component
 * Returns cleanup function to be called on unmount
 */
export function useLocationTimeTracking(fortId, locationId, isViewing) {
    let startTime = null;

    const startTracking = () => {
        if (isViewing && !startTime) {
            startTime = Date.now();
        }
    };

    const stopTracking = () => {
        if (startTime) {
            const endTime = Date.now();
            const timeSpentMs = endTime - startTime;
            const timeSpentMinutes = parseFloat((timeSpentMs / 60000).toFixed(2));

            if (timeSpentMinutes > 0) {
                trackLocationView(fortId, locationId, timeSpentMinutes);
            }

            startTime = null;
        }
    };

    startTracking();

    // Return cleanup function
    return stopTracking;
}

/**
 * Track route sequence changes
 * Compares original route with actual visited sequence
 */
export function trackRouteComparison(fortId, plannedRoute, actualRoute) {
    const plannedIds = new Set(plannedRoute.map(stop => stop.node?.id || stop.id));
    const actualIds = new Set(actualRoute.map(stop => stop.node?.id || stop.id));

    // Track skipped locations (in planned but not in actual)
    plannedIds.forEach(locationId => {
        if (!actualIds.has(locationId)) {
            trackLocationSkip(fortId, locationId);
        }
    });

    // Track clicked locations (in actual route)
    actualIds.forEach(locationId => {
        if (plannedIds.has(locationId)) {
            trackLocationClick(fortId, locationId);
        }
    });
}

/**
 * Batch tracking helper
 * Useful for tracking multiple interactions at once
 */
export function trackBatchInteractions(interactions) {
    interactions.forEach(interaction => {
        addInteraction(interaction);
    });
}
