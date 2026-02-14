/**
 * SHIVNERI SMART EXPLORATION ENGINE - BEAM SEARCH IMPLEMENTATION
 * 
 * Uses Beam Search algorithm instead of greedy selection for globally optimal routes.
 * 
 * Key Features:
 * 1. Beam Search with configurable beamWidth (default: 3)
 * 2. Strategy-specific path scoring functions
 * 3. Constraint-aware path expansion
 * 4. Pruning to maintain beam size
 * 5. Final selection based on strategy objectives
 */

import { buildAdjacencyList, findShortestPath, getReachableNodes } from '../utils/graphUtils.js';

/**
 * Calculate raw importance score for a location
 * Pure data-driven, no adaptive boosts.
 */
function calculateImportance(location) {
    return parseFloat((
        location.historicalScore * 0.4 +
        location.spiritualScore * 0.3 +
        location.architecturalScore * 0.3
    ).toFixed(2));
}

function getEnergyConstraint(level) {
    if (!level) return 6;
    switch (level.toLowerCase()) {
        case 'low': return 3;
        case 'medium': return 6;
        case 'high': return 10;
        default: return 6;
    }
}

/**
 * Path representation for beam search
 * Tracks route state and cumulative metrics
 */
class Path {
    constructor(route, totalImportance, totalWalk, totalVisit, visited) {
        this.route = route; // Array of node IDs
        this.totalImportance = totalImportance;
        this.totalWalk = totalWalk;
        this.totalVisit = totalVisit;
        this.totalTime = totalWalk + totalVisit;
        this.visited = visited; // Set of visited node IDs
        this.score = 0; // Strategy-specific score (set during scoring)
    }

    /**
     * Create a new path by extending this path with a new node
     */
    extend(nodeId, walkTime, visitTime, importance) {
        const newRoute = [...this.route, nodeId];
        const newVisited = new Set(this.visited);
        newVisited.add(nodeId);
        
        return new Path(
            newRoute,
            this.totalImportance + importance,
            this.totalWalk + walkTime,
            this.totalVisit + visitTime,
            newVisited
        );
    }
}

/**
 * Strategy-specific path scoring functions
 */

/**
 * BALANCED: score = totalImportance / totalTime
 * Maximizes efficiency (importance per unit time)
 */
function scoreBalanced(path) {
    if (path.totalTime === 0) return 0;
    return path.totalImportance / path.totalTime;
}

/**
 * MAX_CULTURE: score = totalImportance * 1.5 - (0.2 * totalWalk)
 * Prioritizes high importance, with slight penalty for walking
 */
function scoreMaxCulture(path) {
    return path.totalImportance * 1.5 - (0.2 * path.totalWalk);
}

/**
 * MIN_WALKING: score = -totalWalk * 1.5 + (0.3 * totalImportance)
 * Minimizes walking with importance as secondary factor
 */
function scoreMinWalking(path) {
    return -path.totalWalk * 1.5 + (0.3 * path.totalImportance);
}

/**
 * Score a path based on strategy
 */
function scorePath(path, strategy) {
    switch (strategy) {
        case 'balanced':
            return scoreBalanced(path);
        case 'max_culture':
            return scoreMaxCulture(path);
        case 'min_walking':
            return scoreMinWalking(path);
        default:
            return scoreBalanced(path);
    }
}

/**
 * Final path selection based on strategy objective
 */
function selectBestPath(paths, strategy) {
    if (paths.length === 0) return null;

    switch (strategy) {
        case 'balanced':
            // Select path with highest efficiency
            return paths.reduce((best, path) => {
                const bestEfficiency = best.totalTime > 0 ? best.totalImportance / best.totalTime : 0;
                const pathEfficiency = path.totalTime > 0 ? path.totalImportance / path.totalTime : 0;
                return pathEfficiency > bestEfficiency ? path : best;
            });

        case 'max_culture':
            // Select path with highest total importance
            return paths.reduce((best, path) => 
                path.totalImportance > best.totalImportance ? path : best
            );

        case 'min_walking':
            // Select path with minimum total walk time
            return paths.reduce((best, path) => 
                path.totalWalk < best.totalWalk ? path : best
            );

        default:
            return paths[0];
    }
}

/**
 * CORE ROUTE OPTIMIZATION ENGINE - BEAM SEARCH
 */
export function optimizeRoute(locations, edges, options) {
    const {
        timeAvailable,
        energyLevel,
        entryPoint,
        strategy = 'balanced',
        previousVisited = [],
        forcedNodeId,
        beamWidth = 3 // Configurable beam width
    } = options;

    const maxDifficulty = getEnergyConstraint(energyLevel);
    const adjacency = buildAdjacencyList(edges);

    // Logging setup
    console.log(`\n${'='.repeat(60)}`);
    console.log(`ROUTE OPTIMIZATION - ${strategy.toUpperCase()} (BEAM SEARCH)`);
    console.log(`Time Budget: ${timeAvailable} min | Energy: ${energyLevel}`);
    console.log(`Entry: ${entryPoint}`);
    console.log(`Beam Width: ${beamWidth}`);
    if (forcedNodeId) {
        console.log(`[FORCE] Must include node: ${forcedNodeId}`);
    }

    // Strategy Description Log
    if (strategy === 'balanced') {
        console.log(`[STRATEGY MODE] Balanced → Efficiency optimization (Importance / Time)`);
    } else if (strategy === 'max_culture') {
        console.log(`[STRATEGY MODE] Max Culture → Importance maximization`);
    } else if (strategy === 'min_walking') {
        console.log(`[STRATEGY MODE] Min Walking → Walking minimization`);
    }

    // Special constraint for Min Walking
    const MAX_WALK_BUDGET = strategy === 'min_walking' ? (timeAvailable * 0.35) : Infinity;
    if (strategy === 'min_walking') {
        console.log(`[CONSTRAINT] Max Walking Allowed: ${MAX_WALK_BUDGET.toFixed(1)} min`);
    }

    // REACHABILITY PRE-CALCULATION
    const reachableIds = new Set(getReachableNodes(adjacency, entryPoint, maxDifficulty));

    // FILTER VALID LOCATIONS (candidate pool)
    const candidatePool = Object.values(locations).filter(loc => {
        if (!reachableIds.has(loc.id)) return false;
        if (previousVisited.includes(loc.id)) return false;
        if (loc.id === entryPoint) return false;
        if (energyLevel === 'low' && loc.walkingEffort > 5) return false;
        return true;
    });

    // Cache for return-to-entry shortest times (minutes)
    const returnTimeCache = new Map();

    /**
     * ROUND-TRIP FEASIBILITY CHECK
     *
     * Ensures that from a given node we can still return to the original entry
     * within the global time budget.
     *
     * - nodeId: candidate node we are considering extending to
     * - forwardTime: time spent AFTER reaching candidate (walk + visit so far)
     * - budget: total available time for the whole round trip
     */
    function canReturnToEntry(nodeId, forwardTime, budget) {
        let returnTime = returnTimeCache.get(nodeId);

        if (returnTime === undefined) {
            const backPath = findShortestPath(adjacency, nodeId, entryPoint, maxDifficulty);

            if (!backPath) {
                console.log('[RETURN CHECK]');
                console.log(`Candidate: ${locations[nodeId].name}`);
                console.log(`Forward: ${forwardTime.toFixed(1)} min`);
                console.log('Return: INF (unreachable)');
                console.log('Total: INF');
                console.log(`Budget: ${budget} min`);
                console.log('Allowed: NO');

                returnTimeCache.set(nodeId, Infinity);
                return false;
            }

            returnTime = backPath.totalTime;
            returnTimeCache.set(nodeId, returnTime);
        }

        const total = forwardTime + returnTime;
        const allowed = total <= budget;

        console.log('[RETURN CHECK]');
        console.log(`Candidate: ${locations[nodeId].name}`);
        console.log(`Forward: ${forwardTime.toFixed(1)} min`);
        console.log(`Return: ${returnTime.toFixed(1)} min`);
        console.log(`Total: ${total.toFixed(1)} min`);
        console.log(`Budget: ${budget} min`);
        console.log(`Allowed: ${allowed ? 'YES' : 'NO'}`);

        return allowed;
    }

    console.log(`${'='.repeat(60)}\n`);
    console.log(`[BEAM INITIALIZATION] Starting at ${locations[entryPoint].name}`);

    // BEAM INITIALIZATION
    // Start with a single path containing just the entry point
    const entryImportance = calculateImportance(locations[entryPoint]);
    const entryVisitTime = locations[entryPoint].avgVisitTime;
    const initialVisited = new Set([...previousVisited, entryPoint]);
    
    let beam = [
        new Path(
            [entryPoint],
            entryImportance,
            0, // No walking to entry point
            entryVisitTime,
            initialVisited
        )
    ];

    const decisionLog = [];
    let expansionStep = 0;

    // BEAM EXPANSION LOOP
    // Continue expanding until no paths can be extended further
    while (true) {
        expansionStep++;
        console.log(`\n[BEAM EXPANSION STEP ${expansionStep}] Current beam size: ${beam.length}`);

        // Expand all paths in current beam
        const expandedPaths = [];

        for (const path of beam) {
            const currentLocationId = path.route[path.route.length - 1];
            const currentTimeUsed = path.totalTime;

            // Find all valid next nodes for this path
            const validNextNodes = [];

            for (const candidate of candidatePool) {
                // Skip if already visited in this path
                if (path.visited.has(candidate.id)) continue;

                // Find shortest path to candidate
                const pathInfo = findShortestPath(adjacency, currentLocationId, candidate.id, maxDifficulty);
                if (!pathInfo) continue;

                const walkTime = pathInfo.totalTime;
                const visitTime = candidate.avgVisitTime;
                const importance = calculateImportance(candidate);
                const totalCost = walkTime + visitTime;

                // Compute forward time after reaching this candidate
                const forwardTime = currentTimeUsed + totalCost;

                // ROUND-TRIP FEASIBILITY:
                // Ensure we can still return back to the original entry node
                if (!canReturnToEntry(candidate.id, forwardTime, timeAvailable)) {
                    // This candidate would leave us stranded away from entry
                    continue;
                }

                // Check walking budget constraint (for min_walking strategy)
                if (strategy === 'min_walking') {
                    if (path.totalWalk + walkTime > MAX_WALK_BUDGET) {
                        continue;
                    }
                }

                // Check difficulty constraint (already handled by findShortestPath, but double-check)
                // This is implicit in reachability check

                validNextNodes.push({
                    nodeId: candidate.id,
                    walkTime,
                    visitTime,
                    importance,
                    node: candidate
                });
            }

            // Expand path with all valid next nodes
            for (const nextNode of validNextNodes) {
                const extendedPath = path.extend(
                    nextNode.nodeId,
                    nextNode.walkTime,
                    nextNode.visitTime,
                    nextNode.importance
                );
                
                // Score the extended path
                extendedPath.score = scorePath(extendedPath, strategy);
                
                // Boost score if forcedNodeId is included (ensure it's prioritized)
                if (forcedNodeId && extendedPath.route.includes(forcedNodeId)) {
                    extendedPath.score += 1000; // Large boost to ensure inclusion
                }
                
                expandedPaths.push(extendedPath);

                // Log expansion
                console.log(`  [EXPAND] ${locations[currentLocationId].name} → ${nextNode.node.name}`);
                console.log(`    Path: [${extendedPath.route.map(id => locations[id].name).join(' → ')}]`);
                console.log(`    Score: ${extendedPath.score.toFixed(2)} | Imp: ${extendedPath.totalImportance.toFixed(1)} | Walk: ${extendedPath.totalWalk.toFixed(1)} | Time: ${extendedPath.totalTime.toFixed(1)}`);
            }
        }

        // Stop if no expansions possible
        if (expandedPaths.length === 0) {
            console.log(`[BEAM EXPANSION] No valid expansions found. Stopping.`);
            break;
        }

        // PRUNING: Keep only top K paths based on strategy-specific scoring
        // Sort by score (descending) and take top beamWidth
        // If forcedNodeId is specified, prioritize paths containing it
        expandedPaths.sort((a, b) => {
            // If forcedNodeId is set, paths containing it get priority
            if (forcedNodeId) {
                const aHasForced = a.route.includes(forcedNodeId);
                const bHasForced = b.route.includes(forcedNodeId);
                if (aHasForced && !bHasForced) return -1;
                if (!aHasForced && bHasForced) return 1;
            }
            return b.score - a.score;
        });
        
        const beforePruning = expandedPaths.length;
        beam = expandedPaths.slice(0, beamWidth);
        const pruned = beforePruning - beam.length;

        console.log(`[PRUNING] Expanded: ${beforePruning} paths → Kept top ${beam.length} paths (Pruned: ${pruned})`);
        
        // Log top paths in beam
        beam.forEach((path, idx) => {
            console.log(`  [BEAM ${idx + 1}] Score: ${path.score.toFixed(2)} | Route: [${path.route.map(id => locations[id].name).join(' → ')}]`);
        });
    }

    // FINAL SELECTION
    // Select best path from final beam based on strategy objective
    console.log(`\n[FINAL SELECTION] Evaluating ${beam.length} paths from final beam...`);
    
    // If forcedNodeId is specified, filter to only paths containing it
    let candidatePaths = beam;
    if (forcedNodeId) {
        const pathsWithForced = beam.filter(path => path.route.includes(forcedNodeId));
        if (pathsWithForced.length > 0) {
            console.log(`[FORCE] Found ${pathsWithForced.length} paths containing forced node ${forcedNodeId}`);
            candidatePaths = pathsWithForced;
        } else {
            console.log(`[WARNING] No paths contain forced node ${forcedNodeId}, selecting from all paths`);
        }
    }
    
    const bestPath = selectBestPath(candidatePaths, strategy);

    if (!bestPath) {
        // Fallback: return entry point only
        console.log(`[WARNING] No valid path found, returning entry point only`);
        const fallbackPath = new Path(
            [entryPoint],
            entryImportance,
            0,
            entryVisitTime,
            initialVisited
        );
        return formatResult(fallbackPath, locations, strategy, timeAvailable);
    }

    // Ensure ROUND-TRIP: append return leg back to entry if needed
    const lastNodeId = bestPath.route[bestPath.route.length - 1];
    if (lastNodeId !== entryPoint) {
        // Prefer cached return time if available from feasibility checks
        let returnTime = returnTimeCache.get(lastNodeId);

        if (returnTime === undefined) {
            const backPath = findShortestPath(adjacency, lastNodeId, entryPoint, maxDifficulty);
            if (backPath) {
                returnTime = backPath.totalTime;
            } else {
                console.log(`[WARNING] Unable to find return path from ${lastNodeId} back to entry ${entryPoint} during finalization.`);
                returnTime = 0;
            }
        }

        if (returnTime > 0) {
            bestPath.route = [...bestPath.route, entryPoint];
            bestPath.totalWalk += returnTime;
            bestPath.totalTime = bestPath.totalWalk + bestPath.totalVisit;
        }
    }

    // Build decision log from best path (including return leg)
    for (let i = 1; i < bestPath.route.length; i++) {
        const fromId = bestPath.route[i - 1];
        const toId = bestPath.route[i];
        const pathInfo = findShortestPath(adjacency, fromId, toId, maxDifficulty);
        const toLocation = locations[toId];
        const isFinalReturnToEntry = (toId === entryPoint && i === bestPath.route.length - 1);
        const visitTime = isFinalReturnToEntry ? 0 : toLocation.avgVisitTime;
        
        decisionLog.push({
            step: i,
            from: locations[fromId].name,
            to: toLocation.name,
            strategy: strategy,
            walkTime: pathInfo.totalTime,
            visitTime,
            score: scorePath(bestPath, strategy)
        });
    }

    // Log final route details
    console.log(`[SELECTED ROUTE]`);
    console.log(`  Route: [${bestPath.route.map(id => locations[id].name).join(' → ')}]`);
    console.log(`  Total Importance: ${bestPath.totalImportance.toFixed(1)}`);
    console.log(`  Total Walk: ${bestPath.totalWalk.toFixed(1)} min`);
    console.log(`  Total Visit: ${bestPath.totalVisit.toFixed(1)} min`);
    console.log(`  Total Time: ${bestPath.totalTime.toFixed(1)} min`);

    return formatResult(bestPath, locations, strategy, timeAvailable, decisionLog);
}

/**
 * Format path result into expected output format
 */
function formatResult(path, locations, strategy, timeAvailable, decisionLog = []) {
    const totalTime = path.totalTime;

    console.log(`${'='.repeat(60)}`);
    console.log(`ROUTE COMPLETE - ${strategy.toUpperCase()}`);
    console.log(`${'='.repeat(60)}`);
    console.log(`Total Importance: ${path.totalImportance.toFixed(1)}`);
    console.log(`Total Walk: ${path.totalWalk.toFixed(1)} min`);
    console.log(`Total Visit: ${path.totalVisit.toFixed(1)} min`);
    console.log(`Total Time: ${totalTime.toFixed(1)} min (Budget: ${timeAvailable} min)`);
    console.log(`Stops: ${path.route.length}`);
    console.log(`${'='.repeat(60)}\n`);

    return {
        strategy,
        stops: path.route,
        route: path.route, // Backward compat
        locations: path.route.map(id => locations[id]),
        metrics: {
            visitTime: path.totalVisit,
            walkTime: path.totalWalk,
            totalTime: totalTime,
            culturalScore: path.totalImportance
        },
        decisionLog,
        totalImportance: path.totalImportance,
        totalWalk: path.totalWalk,
        totalVisit: path.totalVisit,
        totalTime: totalTime
    };
}

/**
 * Add stop to existing route (For "Force Include" feature)
 */
export function addStopToRoute(selectedNodeId, context) {
    console.log(`[ADD STOP] Forcing inclusion of: ${selectedNodeId}`);
    return optimizeRoute(context.locations, context.edges, {
        ...context,
        forcedNodeId: selectedNodeId
    });
}

/**
 * Reroute from new starting point (For "Start Here" feature)
 */
export function rerouteFromNode(selectedNodeId, context) {
    console.log(`[REROUTE] Starting fresh from: ${selectedNodeId}`);
    return optimizeRoute(context.locations, context.edges, {
        ...context,
        entryPoint: selectedNodeId,
        previousVisited: [],
        forcedNodeId: null
    });
}

/**
 * Helper to generate comparison (Used by validation scripts)
 */
export function generateAlternativeRoutes(locations, edges, baseOptions) {
    const strategies = ['balanced', 'max_culture', 'min_walking'];
    const results = {};
    strategies.forEach(s => {
        results[s] = optimizeRoute(locations, edges, { ...baseOptions, strategy: s });
    });
    return results;
}

// Backward compatibility export
export { calculateImportance as calculateLocationRank };
