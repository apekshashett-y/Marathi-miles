/**
 * REINFORCEMENT LEARNING ENGINE
 * Implements Q-Learning to optimize route sequences based on user feedback.
 */

const STORAGE_KEY = 'marathi_miles_rl_qtable';
const ALPHA = 0.1; // Learning Rate
const GAMMA = 0.9; // Discount Factor
const EPSILON = 0.1; // Exploration Rate

// Load Q-Table
const getQTable = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : {};
    } catch (e) { return {}; }
};

const saveQTable = (table) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(table));
};

// State Representation: discrete bucket string
const getStateKey = (currentLocId, timeAvailable, energyLevel) => {
    const timeBucket = timeAvailable > 90 ? 'LONG' : (timeAvailable > 45 ? 'MED' : 'SHORT');
    return `${currentLocId}|${timeBucket}|${energyLevel}`;
};

// Get Q-Value
export const getQValue = (currentLocId, nextLocId, timeAvailable, energyLevel) => {
    const table = getQTable();
    const state = getStateKey(currentLocId, timeAvailable, energyLevel);

    // Q[state][action]
    if (!table[state]) return 0.5; // Optimistic initialization
    return table[state][nextLocId] || 0.5;
};

// Update Q-Value based on Reward
export const updateQValue = (currentLocId, nextLocId, timeAvailable, energyLevel, reward, nextBestQ = 0) => {
    const table = getQTable();
    const state = getStateKey(currentLocId, timeAvailable, energyLevel);
    const action = nextLocId;

    if (!table[state]) table[state] = {};
    const currentQ = table[state][action] || 0.5;

    // Q(s,a) = Q(s,a) + α * (Reward + γ * max(Q(s', a')) - Q(s,a))
    const newQ = currentQ + ALPHA * (reward + (GAMMA * nextBestQ) - currentQ);

    table[state][action] = newQ;
    saveQTable(table);

    console.log(`[RL] Updated Q(${state} -> ${action}): ${currentQ.toFixed(2)} -> ${newQ.toFixed(2)} | Reward: ${reward}`);
    return newQ;
};

// Select Action (Epsilon-Greedy, but for route generation we mostly use Q values as weights)
// In a pure agent, we'd pick one. In a recommender, we return score boost.
export const getRLBoost = (currentLocId, nextLocId, timeAvailable, energyLevel) => {
    const q = getQValue(currentLocId, nextLocId, timeAvailable, energyLevel);
    // Normalize roughly 0-1 to a boost score (e.g. 0-5 points)
    return Math.min(Math.max(q * 2, 0), 5);
};

// Calculate Max Q for next state (for update rule)
export const getMaxQ = (nextLocId, timeAvailable, energyLevel, possibleNextActions) => {
    const table = getQTable();
    const nextState = getStateKey(nextLocId, timeAvailable, energyLevel); // Simplified time transition
    if (!table[nextState]) return 0.5;

    let maxQ = 0;
    possibleNextActions.forEach(action => {
        const val = table[nextState][action] || 0.5;
        if (val > maxQ) maxQ = val;
    });
    return maxQ;
};

export const getRLStats = () => {
    const table = getQTable();
    const states = Object.keys(table).length;
    return { statesLearned: states, totalUpdates: states * 1.5 }; // approximate
};
