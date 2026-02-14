/**
 * QUICK TEST - Route Engine V8 Refactoring
 * Validates the mathematically consistent scoring system
 */

import { shivneriFortLocations, shivneriGraphEdges } from '../data/shivneriFortData.js';
import { generateAlternativeRoutes } from '../engines/routeEngine.js';

console.log('='.repeat(60));
console.log('SHIVNERI SMART EXPLORATION ENGINE - V8 TEST');
console.log('Testing Mathematically Consistent Scoring System');
console.log('='.repeat(60));

// Test with 90 minutes, medium energy
console.log('\n📍 Test Configuration:');
console.log('   Time Available: 90 minutes');
console.log('   Energy Level: Medium');
console.log('   Entry Point: Maha Darwaja');

const results = generateAlternativeRoutes(shivneriFortLocations, shivneriGraphEdges, {
    timeAvailable: 90,
    energyLevel: 'medium',
    entryPoint: 'mahaDarwaja',
    adaptiveScores: {}
});

console.log('\n' + '='.repeat(60));
console.log('RESULTS COMPARISON');
console.log('='.repeat(60));

console.log('\n📊 BALANCED STRATEGY:');
console.log(`   Stops: ${results.balanced.stops.length}`);
console.log(`   Route: ${results.balanced.stops.map(id => shivneriFortLocations[id].name).join(' → ')}`);
console.log(`   Visit Time: ${results.balanced.metrics.visitTime} min`);
console.log(`   Walk Time: ${results.balanced.metrics.walkTime} min`);
console.log(`   Total Time: ${results.balanced.metrics.totalTime} min`);
console.log(`   Cultural Score: ${results.balanced.metrics.culturalScore}`);

console.log('\n🎨 MAX CULTURE STRATEGY:');
console.log(`   Stops: ${results.max_culture.stops.length}`);
console.log(`   Route: ${results.max_culture.stops.map(id => shivneriFortLocations[id].name).join(' → ')}`);
console.log(`   Visit Time: ${results.max_culture.metrics.visitTime} min`);
console.log(`   Walk Time: ${results.max_culture.metrics.walkTime} min`);
console.log(`   Total Time: ${results.max_culture.metrics.totalTime} min`);
console.log(`   Cultural Score: ${results.max_culture.metrics.culturalScore}`);

console.log('\n🚶 MIN WALKING STRATEGY:');
console.log(`   Stops: ${results.min_walking.stops.length}`);
console.log(`   Route: ${results.min_walking.stops.map(id => shivneriFortLocations[id].name).join(' → ')}`);
console.log(`   Visit Time: ${results.min_walking.metrics.visitTime} min`);
console.log(`   Walk Time: ${results.min_walking.metrics.walkTime} min`);
console.log(`   Total Time: ${results.min_walking.metrics.totalTime} min`);
console.log(`   Cultural Score: ${results.min_walking.metrics.culturalScore}`);

console.log('\n' + '='.repeat(60));
console.log('✅ TEST COMPLETE - Check constraint validation above');
console.log('='.repeat(60));
