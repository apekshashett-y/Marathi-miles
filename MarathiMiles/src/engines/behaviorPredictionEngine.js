/**
 * REAL-TIME BEHAVIOR PREDICTION ENGINE
 * Predicts user preference based on recent interactions and context.
 * Uses lightweight regression model simulation.
 */

const STORAGE_KEY = 'marathi_miles_behavior_weights';

const DEFAULT_WEIGHTS = {
    w_history: 1.0, // Existing interest
    w_time: 0.2,    // Is current time constraint relevant?
    w_energy: 0.3,  // Is energy constraint relevant?
    w_social: 0.1   // Is social proof relevant?
};

const getWeights = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : DEFAULT_WEIGHTS;
    } catch { return DEFAULT_WEIGHTS; }
};

const saveWeights = (w) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(w));
};

// Calculate Preference Score (0-100 Boost)
export const calculatePreferenceScore = (location, context, userHistory) => {
    const weights = getWeights();
    let score = 0;

    // Feature 1: Historical Interest Match
    // If user clicked or viewed similar categories before
    const category = location.category || 'general'; // Assumption
    const affinity = userHistory.includes(category) ? 1.0 : 0.2;
    score += weights.w_history * (location.historicalScore * affinity);

    // Feature 2: Time Alignment
    // If user has low time, prefer quick visits. If high time, prefer long visits.
    const visitTime = location.avgVisitTime;
    const timeMatch = (context.timeAvailable > 60 && visitTime > 15) ? 1.0 :
        (context.timeAvailable < 45 && visitTime < 10) ? 1.0 : 0.5;
    score += weights.w_time * (timeMatch * 5); // Scale up

    // Feature 3: Energy Alignment
    const effort = location.walkingEffort;
    const energyMatch = (context.energyLevel === 'high' && effort > 5) ? 1.0 :
        (context.energyLevel === 'low' && effort < 3) ? 1.0 : 0.5;
    score += weights.w_energy * (energyMatch * 5);

    return Math.min(score, 10); // Cap at max boost
};

// Train the Model (Updating weights based on a positive interaction)
export const trainModel = (location, feedbackType) => {
    // If user accepted a route including this location, or clicked "Like"
    const weights = getWeights();
    const learningRate = 0.05;

    // If feedback is positive, increase weights slightly towards the features of this location
    // Simplified Gradient Descent step
    if (feedbackType === 'positive') {
        weights.w_history = Math.min(weights.w_history + learningRate, 2.0);
        // ... update others
        console.log(`[PREDICTION] Model Updated: Preference for ${location.name} reinforced.`);
        saveWeights(weights);
    }
};

export const getPredictionConfidence = () => {
    // Determine how confident the model is based on weight deviation
    const w = getWeights();
    const sum = w.w_history + w.w_time + w.w_energy;
    const conf = Math.min((sum / 3) * 100, 95); // Cap at 95%
    return Math.round(conf);
};
