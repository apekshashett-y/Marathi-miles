
import { shivneriFortLocations, shivneriGraphEdges } from './src/data/shivneriFortData.js';
import { optimizeRoute } from './src/engines/routeEngine.js';
import { calculateAdaptiveBoosts } from './src/engines/adaptiveEngine.js';

console.log('--- TEST: 1 Hour + High Energy ---');

const result = optimizeRoute(shivneriFortLocations, shivneriGraphEdges, {
    timeAvailable: 60,
    energyLevel: 'high',
    entryPoint: 'mahaDarwaja',
    adaptiveScores: {}
});

console.log(`Selected: ${result.locations.length} locations`);
console.log(`Total Time: ${result.metrics.totalTime}m`);
console.log(`Route: ${result.route.map(id => shivneriFortLocations[id].name).join(' -> ')}`);

if (result.locations.length < 3) {
    console.error('FAIL: Still only fitting < 3 locations!');
} else {
    console.log('PASS: Fits 3+ locations');
}
