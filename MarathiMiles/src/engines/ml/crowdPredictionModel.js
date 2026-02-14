/**
 * CROWD PREDICTION MODEL (Random Forest Implementation)
 * A pure JavaScript implementation of a Random Forest Classifier for crowd level prediction.
 */

// --- UTILS ---
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

// --- DECISION TREE CORE ---
class DecisionTree {
    constructor(maxDepth = 6, minSamplesSplit = 2) {
        this.maxDepth = maxDepth;
        this.minSamplesSplit = minSamplesSplit;
        this.tree = null;
    }

    train(features, labels) {
        this.tree = this._buildTree(features, labels, 0);
    }

    predict(sample) {
        return this._traverse(sample, this.tree);
    }

    _gini(labels) {
        const total = labels.length;
        if (total === 0) return 0;
        const counts = {};
        for (const l of labels) counts[l] = (counts[l] || 0) + 1;
        let impurity = 1;
        for (const k in counts) {
            const prob = counts[k] / total;
            impurity -= prob * prob;
        }
        return impurity;
    }

    _split(features, labels, featureIndex, threshold) {
        const left = { features: [], labels: [] };
        const right = { features: [], labels: [] };
        for (let i = 0; i < features.length; i++) {
            if (features[i][featureIndex] < threshold) {
                left.features.push(features[i]);
                left.labels.push(labels[i]);
            } else {
                right.features.push(features[i]);
                right.labels.push(labels[i]);
            }
        }
        return { left, right };
    }

    _bestSplit(features, labels) {
        let bestGini = Infinity;
        let bestSplit = null;
        const nFeatures = features[0].length;

        // Random feature selection (Feature Bagging for Random Forest)
        const featureIndices = [];
        const nSubset = Math.max(1, Math.floor(Math.sqrt(nFeatures)));
        while (featureIndices.length < nSubset) {
            const idx = Math.floor(Math.random() * nFeatures);
            if (!featureIndices.includes(idx)) featureIndices.push(idx);
        }

        for (const fIdx of featureIndices) {
            // Check potential thresholds (simplified: use values present in data)
            // Optimization: simplified sampling for speed using percentiles
            const values = features.map(row => row[fIdx]);
            const uniqueValues = [...new Set(values)].sort((a, b) => a - b);

            // Limit checks to prevent massive loops on continuous data
            const checks = uniqueValues.length > 20 ?
                Array.from({ length: 20 }, (_, i) => uniqueValues[Math.floor(i * uniqueValues.length / 20)]) :
                uniqueValues;

            for (let i = 0; i < checks.length - 1; i++) {
                const threshold = (checks[i] + checks[i + 1]) / 2;
                const { left, right } = this._split(features, labels, fIdx, threshold);
                if (left.labels.length === 0 || right.labels.length === 0) continue;

                const giniLeft = this._gini(left.labels);
                const giniRight = this._gini(right.labels);
                const weightedGini = (left.labels.length * giniLeft + right.labels.length * giniRight) / labels.length;

                if (weightedGini < bestGini) {
                    bestGini = weightedGini;
                    bestSplit = { featureIndex: fIdx, threshold, left, right };
                }
            }
        }
        return bestSplit;
    }

    _mostCommonLabel(labels) {
        const counts = {};
        let maxCount = -1;
        let maxLabel = null;
        for (const l of labels) {
            counts[l] = (counts[l] || 0) + 1;
            if (counts[l] > maxCount) {
                maxCount = counts[l];
                maxLabel = l;
            }
        }
        return parseInt(maxLabel || 0);
    }

    _buildTree(features, labels, depth) {
        if (depth >= this.maxDepth || labels.length < this.minSamplesSplit || new Set(labels).size === 1) {
            return { type: 'leaf', value: this._mostCommonLabel(labels) };
        }

        const split = this._bestSplit(features, labels);
        if (!split) return { type: 'leaf', value: this._mostCommonLabel(labels) };

        return {
            type: 'node',
            featureIndex: split.featureIndex,
            threshold: split.threshold,
            left: this._buildTree(split.left.features, split.left.labels, depth + 1),
            right: this._buildTree(split.right.features, split.right.labels, depth + 1)
        };
    }

    _traverse(sample, node) {
        if (node.type === 'leaf') return node.value;
        if (sample[node.featureIndex] < node.threshold) {
            return this._traverse(sample, node.left);
        }
        return this._traverse(sample, node.right);
    }
}

// --- RANDOM FOREST CORE ---
class RandomForestClassifier {
    constructor(nEstimators = 15, maxDepth = 6) {
        this.nEstimators = nEstimators;
        this.maxDepth = maxDepth;
        this.trees = [];
    }

    _bootstrap(features, labels) {
        const n = features.length;
        const bFeatures = [];
        const bLabels = [];
        for (let i = 0; i < n; i++) {
            const idx = Math.floor(Math.random() * n);
            bFeatures.push(features[idx]);
            bLabels.push(labels[idx]);
        }
        return { features: bFeatures, labels: bLabels };
    }

    train(features, labels) {
        this.trees = [];
        for (let i = 0; i < this.nEstimators; i++) {
            const { features: bf, labels: bl } = this._bootstrap(features, labels);
            const tree = new DecisionTree(this.maxDepth);
            tree.train(bf, bl);
            this.trees.push(tree);
        }
    }

    predict(sample) {
        const votes = this.trees.map(tree => tree.predict(sample));
        const counts = {};
        for (const v of votes) counts[v] = (counts[v] || 0) + 1;

        let maxVote = -1;
        let prediction = null;
        for (const k in counts) {
            if (counts[k] > maxVote) {
                maxVote = counts[k];
                prediction = parseInt(k);
            }
        }

        // Calculate class probabilities
        const probs = { 0: 0, 1: 0, 2: 0 };
        votes.forEach(v => probs[v] = (probs[v] || 0) + 1);
        Object.keys(probs).forEach(k => probs[k] /= this.nEstimators);

        return { prediction: prediction !== null ? prediction : 0, probabilities: probs };
    }
}

// --- FEATURE ENGINEERING ---
export const FeatureEngineer = {
    // 0: hour (0-23)
    // 1: is_weekend (0/1)
    // 2: last_5min_clicks
    // 3: last_15min_clicks
    // 4: unique_users_15min
    // 5: avg_time_spent
    // 6: route_inclusions
    // 7: base_importance

    extractFeatures: (rawData) => {
        // Allow simulated hour in rawData for debugging/testing
        const time = new Date();
        const hour = rawData.simulated_hour !== undefined ? rawData.simulated_hour : time.getHours();

        return [
            hour,
            (time.getDay() === 0 || time.getDay() === 6) ? 1 : 0,
            rawData.clicks_5m || 0,
            rawData.clicks_15m || 0,
            rawData.unique_users || 0,
            rawData.avg_time || 0,
            rawData.route_inclusions || 0,
            rawData.base_score || 5
        ];
    }
};

// --- DATASET GENERATOR (REALISTIC) ---
export const generateTrainingData = (nSamples = 600) => {
    const features = [];
    const labels = [];
    const counts = { 0: 0, 1: 0, 2: 0 };

    for (let i = 0; i < nSamples; i++) {
        // Enforce balanced distribution by cycling target intents
        const targetClass = i % 3;

        // Synthesize features based on intended Class
        const hour = Math.floor(Math.random() * 24);
        const isWeekend = Math.random() > 0.6 ? 1 : 0;
        const baseScore = Math.floor(Math.random() * 10) + 1;

        let clicks5m, clicks15m;

        // Pattern Injection
        if (targetClass === 2) { // HIGH CROWD
            // High traffic signatures: Peak hours, Weekend, Popular spots
            clicks15m = 30 + Math.floor(Math.random() * 50); // High activity
            clicks5m = Math.floor(clicks15m * 0.4);
        } else if (targetClass === 1) { // MEDIUM
            clicks15m = 10 + Math.floor(Math.random() * 20); // Mod activity
            clicks5m = Math.floor(clicks15m * 0.3);
        } else { // LOW
            clicks15m = Math.floor(Math.random() * 10); // Low activity
            clicks5m = Math.floor(clicks15m * 0.5);
        }

        // Add Noise
        // Sometimes even with low clicks, it's a specific hour for a specific type (simulated by base_score) that drives class up?
        // Actually, just let the activity dictate the label mostly for this synthetic run, 
        // but ensure `hour` features are relevant.

        const row = [
            hour,
            isWeekend,
            clicks5m,
            clicks15m,
            Math.floor(clicks15m * 0.8),
            30 + (Math.random() * 300),
            Math.floor(clicks15m * 0.5),
            baseScore
        ];

        features.push(row);
        labels.push(targetClass);
        counts[targetClass]++;
    }

    console.log(`[ML DATA] Class Distribution: Low:${counts[0]} Medium:${counts[1]} High:${counts[2]}`);
    return { features, labels };
};

// --- SINGLETON MODEL INSTANCE ---
let activeModel = new RandomForestClassifier(20, 8);

export const trainGlobalModel = () => {
    console.log("--- STARTING MODEL TRAINING (Realistic) ---");
    const { features, labels } = generateTrainingData(600);

    activeModel.train(features, labels);
    console.log(`[ML] Training Complete. Model Ready.`);

    return activeModel;
};

// Initial training on load
trainGlobalModel();

export const predictCrowd = (locationId, usageStats) => {
    // If stats are empty (0 clicks), the model might predict 0 (Low).
    // To ensure variety during demo if no real interactions, verify input data has some noise?
    // No, trust the model.
    const features = FeatureEngineer.extractFeatures(usageStats);
    const result = activeModel.predict(features);

    let label = "Low";
    if (result.prediction === 1) label = "Medium";
    if (result.prediction === 2) label = "High";

    console.log(`[ML Inference] ${locationId} -> ${label} (${result.probabilities[2].toFixed(2)})`);
    return result;
};
