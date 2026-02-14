/**
 * GRAPH UTILITIES
 * Real pathfinding algorithms for route optimization.
 * Ensures Dijkstra correctness and transparent logging.
 */

/**
 * Build adjacency list from edges
 * @param {Array} edges - Array of {from, to, walkingTime, difficulty}
 * @returns {Object} Adjacency map
 */
export function buildAdjacencyList(edges) {
    console.log('[GRAPH] Building adjacency list...');
    const adjacency = {};

    edges.forEach(edge => {
        // Bidirectional edges
        if (!adjacency[edge.from]) adjacency[edge.from] = [];
        if (!adjacency[edge.to]) adjacency[edge.to] = [];

        adjacency[edge.from].push({
            to: edge.to,
            walkingTime: edge.walkingTime,
            difficulty: edge.difficulty
        });

        adjacency[edge.to].push({
            to: edge.from,
            walkingTime: edge.walkingTime,
            difficulty: edge.difficulty
        });
    });

    // Log structure
    // Object.keys(adjacency).forEach(node => {
    //     console.log(`  Node ${node}: ${adjacency[node].length} neighbors`);
    // });

    return adjacency;
}

/**
 * Dijkstra's algorithm for shortest path considering difficulty limits
 * @param {Object} adjacency - Graph
 * @param {String} startId - Start Node
 * @param {String} endId - End Node
 * @param {Number} maxDifficulty - Max allowed edge difficulty (default 10)
 * @returns {Object|null} Path info { path: [], totalTime: number }
 */
export function findShortestPath(adjacency, startId, endId, maxDifficulty = 10) {
    // console.log(`[DIJKSTRA] ${startId} -> ${endId} (Max Diff: ${maxDifficulty})`);

    const distances = {};
    const previous = {};
    const visited = new Set();
    const queue = []; // Simple array as priority queue

    // Initialize
    Object.keys(adjacency).forEach(id => {
        distances[id] = Infinity;
        previous[id] = null;
    });
    distances[startId] = 0;
    queue.push({ id: startId, distance: 0 });

    while (queue.length > 0) {
        // Pop smallest distance
        queue.sort((a, b) => a.distance - b.distance);
        const current = queue.shift();

        if (current.id === endId) break;
        if (visited.has(current.id)) continue;
        visited.add(current.id);

        const neighbors = adjacency[current.id] || [];

        for (const neighbor of neighbors) {
            // FILTER: Difficulty Check
            if (neighbor.difficulty > maxDifficulty) {
                // console.log(`  Skipping edge ${current.id}->${neighbor.to} (Diff: ${neighbor.difficulty} > ${maxDifficulty})`);
                continue;
            }

            const newDist = distances[current.id] + neighbor.walkingTime;
            if (newDist < distances[neighbor.to]) {
                distances[neighbor.to] = newDist;
                previous[neighbor.to] = current.id;
                queue.push({ id: neighbor.to, distance: newDist });
            }
        }
    }

    if (distances[endId] === Infinity) return null;

    // Reconstruct path
    const path = [];
    let curr = endId;
    while (curr) {
        path.unshift(curr);
        curr = previous[curr];
    }

    return {
        path,
        totalTime: distances[endId]
    };
}

/**
 * Get all reachable nodes from start within maxDifficulty constraint
 * Uses BFS/Reachability check
 */
export function getReachableNodes(adjacency, startId, maxDifficulty) {
    console.log(`[REACHABILITY] checking from ${startId} with difficulty limit ${maxDifficulty}`);
    const reachable = new Set();
    const queue = [startId];
    reachable.add(startId);

    while (queue.length > 0) {
        const current = queue.shift();
        const neighbors = adjacency[current] || [];

        for (const neighbor of neighbors) {
            if (neighbor.difficulty <= maxDifficulty && !reachable.has(neighbor.to)) {
                reachable.add(neighbor.to);
                queue.push(neighbor.to);
            } else if (neighbor.difficulty > maxDifficulty) {
                // console.log(`  Unreachable edge: ${current}->${neighbor.to} (Diff ${neighbor.difficulty})`);
            }
        }
    }

    return Array.from(reachable);
}

/**
 * Order a set of nodes for TSP (Travelling Salesman Approximation)
 * Starting from `entryId`, visit nearest unvisited node greedy.
 */
export function solveTSP(adjacency, nodeIds, entryId, maxDifficulty) {
    console.log(`[TSP] Ordering ${nodeIds.length} nodes starting from ${entryId}`);
    const unvisited = new Set(nodeIds);
    const route = [entryId];
    unvisited.delete(entryId);

    let current = entryId;

    while (unvisited.size > 0) {
        let nearestNode = null;
        let minDist = Infinity;

        for (const candidate of unvisited) {
            const path = findShortestPath(adjacency, current, candidate, maxDifficulty);
            if (path && path.totalTime < minDist) {
                minDist = path.totalTime;
                nearestNode = candidate;
            }
        }

        if (nearestNode) {
            route.push(nearestNode);
            unvisited.delete(nearestNode);
            current = nearestNode;
        } else {
            console.warn('[TSP] Some nodes unreachable from current cluster');
            break; // Remaining nodes unreachable
        }
    }
    return route;
}
