// Adaptive Path Optimizer
// Enhanced version that uses learned user behavior patterns
// Falls back to static importance when insufficient data

import { getAdaptiveImportance, getConfig } from '../services/adaptiveDatabase';

/**
 * Computes optimal path with adaptive learning
 * @param {Object} fortGraph - Graph structure with nodes and edges
 * @param {number} availableMinutes - Total time available
 * @param {string} energyLevel - "low", "medium", or "high"
 * @param {boolean} useAdaptive - Whether to use adaptive scores (default: true)
 * @returns {Object} - Optimized visit plan including alternatives
 */
export function computeAdaptiveOptimalPath(fortGraph, availableMinutes, energyLevel, useAdaptive = true) {
    const { nodes, edges, fortId } = fortGraph;
    const config = getConfig();

    // Enhance nodes with adaptive scores
    const enhancedNodes = {};
    Object.keys(nodes).forEach(nodeId => {
        const node = nodes[nodeId];
        const adaptiveImportance = useAdaptive && config.enabled
            ? getAdaptiveImportance(fortId || 'shivneri', node.id, node.historicalImportance)
            : node.historicalImportance;

        enhancedNodes[nodeId] = {
            ...node,
            originalImportance: node.historicalImportance,
            adaptiveImportance: adaptiveImportance,
            // Use adaptive importance for path calculation
            historicalImportance: adaptiveImportance
        };
    });

    const effortConstraints = {
        low: 2,
        medium: 3,
        high: 5
    };
    const currentMaxEffort = effortConstraints[energyLevel] || 3;
    const adjacencyList = buildAdjacencyList(edges);

    // Strategy Definitions
    const strategies = [
        {
            id: "balanced",
            name: "Balanced Plan",
            description: useAdaptive && config.enabled
                ? "Optimized using visitor behavior patterns"
                : "Optimal mix of historical value and time",
            timeLimit: availableMinutes,
            effortLimit: currentMaxEffort,
            priority: "balanced"
        },
        {
            id: "express",
            name: "Express Highlights",
            description: useAdaptive && config.enabled
                ? "Most popular spots visited by others"
                : "Top-tier sites, minimal movement",
            timeLimit: Math.min(availableMinutes, 45),
            effortLimit: currentMaxEffort,
            priority: "importance"
        },
        {
            id: "extended",
            name: "Extended Heritage",
            description: "Full coverage of all sectors",
            timeLimit: 240,
            effortLimit: 5,
            priority: "coverage"
        },
        {
            id: "leisure",
            name: "Leisurely Walk",
            description: "Easy terrain, scenic viewpoints",
            timeLimit: availableMinutes * 1.2,
            effortLimit: 2,
            priority: "leisure"
        }
    ];

    const results = strategies.map(strat => {
        const res = findOptimalPath(
            enhancedNodes.mainGate,
            Object.values(enhancedNodes),
            adjacencyList,
            strat.timeLimit,
            strat.effortLimit,
            strat.priority
        );

        const exceedsTime = res.stats.totalTime > availableMinutes;
        const exceedsEnergy = strat.effortLimit > currentMaxEffort && res.path.some(p => p.node.effortLevel > currentMaxEffort);
        const disabled = exceedsEnergy;

        let statusText = null;
        if (exceedsEnergy) statusText = "Requires High Energy";
        else if (exceedsTime) statusText = `Requires +${res.stats.totalTime - availableMinutes} min`;

        return {
            ...res,
            id: strat.id,
            name: strat.name,
            description: strat.description,
            estimatedTime: `${res.stats.totalTime} min`,
            disabled: disabled,
            statusText: statusText,
            tradeoff: getTradeoff(strat.id, res.stats, availableMinutes),
            isAdaptive: useAdaptive && config.enabled
        };
    });

    // Filter out duplicates
    const uniqueResults = [];
    const seenPaths = new Set();

    results.forEach(res => {
        const pathString = res.path.map(p => p.node.id).join(',');
        if (!seenPaths.has(pathString)) {
            seenPaths.add(pathString);
            uniqueResults.push(res);
        }
    });

    const mainPlan = uniqueResults[0];
    mainPlan.feasibleAlternatives = uniqueResults.slice(1);
    mainPlan.allPlans = uniqueResults;
    mainPlan.isAdaptive = useAdaptive && config.enabled;

    return mainPlan;
}

/**
 * Build adjacency list from edges
 */
function buildAdjacencyList(edges) {
    const adj = {};
    edges.forEach(edge => {
        if (!adj[edge.from]) adj[edge.from] = [];
        if (!adj[edge.to]) adj[edge.to] = [];
        adj[edge.from].push({ to: edge.to, walkTime: edge.walkTime, difficulty: edge.difficulty });
        adj[edge.to].push({ to: edge.from, walkTime: edge.walkTime, difficulty: edge.difficulty });
    });
    return adj;
}

/**
 * Sequential Selection Logic (same as original but uses adaptive importance)
 */
function findOptimalPath(startNode, allNodes, adjacencyList, timeLimit, maxEffort, strategy) {
    const visited = new Set();
    const path = [];
    const feasibleNodes = allNodes.filter(n => n.effortLevel <= maxEffort);

    let currentNode = startNode;
    let timeUsed = 0;
    let totalImportance = 0;

    visited.add(currentNode.id);
    path.push({
        node: currentNode,
        walkTime: 0,
        arrivalTime: 0,
        departureTime: currentNode.visitTime,
        isReachable: true
    });
    timeUsed += currentNode.visitTime;
    totalImportance += currentNode.historicalImportance; // Now uses adaptive importance

    while (timeUsed < timeLimit) {
        let bestNext = null;
        let bestScore = -1;
        let bestWalkTime = 0;

        for (const node of feasibleNodes) {
            if (visited.has(node.id)) continue;

            const pathInfo = findShortestPath(currentNode.id, node.id, adjacencyList, maxEffort);
            if (!pathInfo) continue;

            const timeNeeded = timeUsed + pathInfo.walkTime + node.visitTime;
            if (timeNeeded <= timeLimit) {
                let score = 0;
                const totalCost = pathInfo.walkTime + node.visitTime;

                // Use adaptive importance in scoring
                if (strategy === "importance") {
                    score = (node.historicalImportance ** 3) / (totalCost + 10);
                } else if (strategy === "coverage") {
                    score = 1000 / (totalCost + 1);
                } else if (strategy === "leisure") {
                    const difficultyPenalty = pathInfo.maxDifficulty * 5;
                    score = node.historicalImportance / (pathInfo.walkTime * 3 + difficultyPenalty + 1);
                } else {
                    score = node.historicalImportance / totalCost;
                }

                if (score > bestScore) {
                    bestScore = score;
                    bestNext = node;
                    bestWalkTime = pathInfo.walkTime;
                }
            }
        }

        if (!bestNext) break;

        visited.add(bestNext.id);
        const arrival = timeUsed + bestWalkTime;
        const departure = arrival + bestNext.visitTime;

        path.push({
            node: bestNext,
            walkTime: bestWalkTime,
            arrivalTime: arrival,
            departureTime: departure,
            isReachable: true
        });

        timeUsed = departure;
        totalImportance += bestNext.historicalImportance;
        currentNode = bestNext;
    }

    const excludedNodes = allNodes.filter(n => !visited.has(n.id));

    return {
        path,
        stats: {
            totalTime: timeUsed,
            locationsVisited: path.length,
            totalImportance,
            averageImportance: (totalImportance / Math.max(1, path.length)).toFixed(1)
        },
        explanation: generateExplanation(excludedNodes, timeLimit, timeUsed, strategy)
    };
}

function findShortestPath(fromId, toId, adjacencyList, maxEffort) {
    if (!adjacencyList[fromId]) return null;
    const queue = [{ id: fromId, time: 0, maxDifficulty: 0 }];
    const visitedIndices = new Map();

    while (queue.length > 0) {
        queue.sort((a, b) => a.time - b.time);
        const curr = queue.shift();
        if (curr.id === toId) return { walkTime: curr.time, maxDifficulty: curr.maxDifficulty };
        if (visitedIndices.has(curr.id) && visitedIndices.get(curr.id) <= curr.time) continue;
        visitedIndices.set(curr.id, curr.time);

        const neighbors = adjacencyList[curr.id] || [];
        for (const n of neighbors) {
            if (n.difficulty > maxEffort) continue;
            queue.push({
                id: n.to,
                time: curr.time + n.walkTime,
                maxDifficulty: Math.max(curr.maxDifficulty, n.difficulty)
            });
        }
    }
    return null;
}

function generateExplanation(excludedNodes, limit, used, strategy) {
    if (excludedNodes.length === 0) return "Included all accessible locations in this route.";

    if (strategy === "importance") return "Skipping secondary spots to focus exclusively on top-rated landmarks.";
    if (strategy === "leisure") return "Avoiding steep sectors and difficult terrain for a relaxed experience.";
    if (strategy === "coverage") return "Optimized to visit the maximum number of locations across the fort.";

    return used >= limit * 0.85
        ? `Excluding ${excludedNodes.length} secondary spots to strictly respect time constraints.`
        : "Prioritizing high-importance sites for the best experience.";
}

function getTradeoff(id, stats, budget) {
    if (id === 'express') return "Fewer stops, significant time saved.";
    if (id === 'extended') {
        const diff = stats.totalTime - budget;
        return diff > 0 ? `Unlocks all sectors; adds ${diff} min walking.` : "Maximum coverage within your time.";
    }
    if (id === 'leisure') return "Easier terrain, slightly fewer locations.";
    return "Balanced distribution of sites.";
}

// Re-export original optimizer for backwards compatibility
export { computeOptimalPath } from './pathOptimizer';
