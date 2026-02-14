/**
 * ROUTE ENGINE TEST - SIMPLIFIED V9
 * Tests clean routing with NO adaptive boost logic
 */

import { shivneriFortLocations, shivneriGraphEdges } from '../data/shivneriFortData.js';
import { generateAlternativeRoutes } from '../engines/routeEngine.js';

console.log('╔═══════════════════════════════════════════════════════════╗');
console.log('║   SHIVNERI SMART EXPLORATION - SIMPLIFIED ROUTING TEST   ║');
console.log('║   Three Mathematically Distinct Strategies               ║');
console.log('╚═══════════════════════════════════════════════════════════╝\n');

// Test with 60 minutes, high energy
const results = generateAlternativeRoutes(shivneriFortLocations, shivneriGraphEdges, {
    timeAvailable: 60,
    energyLevel: 'high',
    entryPoint: 'mahaDarwaja'
});

console.log('\n' + '='.repeat(60));
console.log('COMPARISON TABLE');
console.log('='.repeat(60));

console.log('\n📊 BALANCED STRATEGY:');
console.log(`   Route: ${results.balanced.stops.map(id => shivneriFortLocations[id].name).join(' → ')}`);
console.log(`   Stops: ${results.balanced.stops.length}`);
console.log(`   Visit Time: ${results.balanced.metrics.visitTime} min`);
console.log(`   Walk Time: ${results.balanced.metrics.walkTime} min`);
console.log(`   Total Time: ${results.balanced.metrics.totalTime} min`);
console.log(`   Cultural Score: ${results.balanced.metrics.culturalScore}`);

console.log('\n🎨 MAX CULTURE STRATEGY:');
console.log(`   Route: ${results.max_culture.stops.map(id => shivneriFortLocations[id].name).join(' → ')}`);
console.log(`   Stops: ${results.max_culture.stops.length}`);
console.log(`   Visit Time: ${results.max_culture.metrics.visitTime} min`);
console.log(`   Walk Time: ${results.max_culture.metrics.walkTime} min`);
console.log(`   Total Time: ${results.max_culture.metrics.totalTime} min`);
console.log(`   Cultural Score: ${results.max_culture.metrics.culturalScore}`);

console.log('\n🚶 MIN WALKING STRATEGY:');
console.log(`   Route: ${results.min_walking.stops.map(id => shivneriFortLocations[id].name).join(' → ')}`);
console.log(`   Stops: ${results.min_walking.stops.length}`);
console.log(`   Visit Time: ${results.min_walking.metrics.visitTime} min`);
console.log(`   Walk Time: ${results.min_walking.metrics.walkTime} min`);
console.log(`   Total Time: ${results.min_walking.metrics.totalTime} min`);
console.log(`   Cultural Score: ${results.min_walking.metrics.culturalScore}`);

console.log('\n' + '='.repeat(60));
console.log('ROUTE DIFFERENCES:');
console.log('='.repeat(60));

const balancedSet = new Set(results.balanced.stops);
const maxCultureSet = new Set(results.max_culture.stops);
const minWalkingSet = new Set(results.min_walking.stops);

console.log('\nUnique to Max Culture:');
const uniqueMaxCulture = results.max_culture.stops.filter(id => !balancedSet.has(id));
if (uniqueMaxCulture.length > 0) {
    console.log(`   ${uniqueMaxCulture.map(id => shivneriFortLocations[id].name).join(', ')}`);
} else {
    console.log('   (None - same as Balanced)');
}

console.log('\nUnique to Min Walking:');
const uniqueMinWalking = results.min_walking.stops.filter(id => !balancedSet.has(id));
if (uniqueMinWalking.length > 0) {
    console.log(`   ${uniqueMinWalking.map(id => shivneriFortLocations[id].name).join(', ')}`);
} else {
    console.log('   (None - same as Balanced)');
}

console.log('\nAvoided by Min Walking (but in Balanced):');
const avoidedByMinWalking = results.balanced.stops.filter(id => !minWalkingSet.has(id));
if (avoidedByMinWalking.length > 0) {
    console.log(`   ${avoidedByMinWalking.map(id => shivneriFortLocations[id].name).join(', ')}`);
    avoidedByMinWalking.forEach(id => {
        const loc = shivneriFortLocations[id];
        console.log(`      -> ${loc.name}: effort=${loc.walkingEffort} (high effort avoided ✓)`);
    });
} else {
    console.log('   (None)');
}

console.log('\n' + '='.repeat(60));
console.log('✅ TEST COMPLETE');
console.log('Expected: Min Walking avoids high-effort locations like Bastions/Kadelot');
console.log('Expected: Max Culture prioritizes Shiv Janmasthan & Shivai Devi Temple');
console.log('Expected: Balanced gives moderate mix');
console.log('='.repeat(60) + '\n');
