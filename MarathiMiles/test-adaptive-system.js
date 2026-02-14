// Adaptive Route Learning System - Demo Test Script
// This file demonstrates how the adaptive system works

import {
    initializeDatabase,
    addInteraction,
    getLocationStatsById,
    getFortAnalytics,
    getAdaptiveImportance,
    updateConfig,
    exportData,
    clearAllData
} from './src/services/adaptiveDatabase.js';

console.log('=== Adaptive Route Learning System - Demo ===\n');

// Step 1: Initialize the system
console.log('Step 1: Initializing database...');
initializeDatabase();
console.log('✓ Database initialized\n');

// Step 2: Simulate user interactions
console.log('Step 2: Simulating 10 users interacting with locations...\n');

const locations = ['mainGate', 'shivJanmabhoomi', 'templeArea', 'ammunitionStorage', 'viewpoint'];

// Simulate 10 users with different behaviors
for (let user = 1; user <= 10; user++) {
    console.log(`  User ${user}:`);

    // Everyone clicks on mainGate (entrance)
    addInteraction({
        fort_id: 'shivneri',
        location_id: 'mainGate',
        clicked: true,
        time_spent_minutes: Math.random() * 5 + 2,
        skipped: false
    });

    // Most users visit shivJanmabhoomi (birthplace)
    if (user <= 9) {
        addInteraction({
            fort_id: 'shivneri',
            location_id: 'shivJanmabhoomi',
            clicked: true,
            time_spent_minutes: Math.random() * 20 + 15, // Spend more time here
            skipped: false
        });
        console.log('    ✓ Visited Shiv Janmabhoomi');
    }

    // Half visit templeArea
    if (user <= 5) {
        addInteraction({
            fort_id: 'shivneri',
            location_id: 'templeArea',
            clicked: true,
            time_spent_minutes: Math.random() * 10 + 10,
            skipped: false
        });
        console.log('    ✓ Visited Temple Area');
    } else {
        // Others skip it
        addInteraction({
            fort_id: 'shivneri',
            location_id: 'templeArea',
            clicked: false,
            time_spent_minutes: 0,
            skipped: true
        });
        console.log('    ⏭ Skipped Temple Area');
    }

    // Most skip ammunitionStorage (difficult to reach)
    if (user <= 3) {
        addInteraction({
            fort_id: 'shivneri',
            location_id: 'ammunitionStorage',
            clicked: true,
            time_spent_minutes: Math.random() * 5 + 5,
            skipped: false
        });
        console.log('    ✓ Visited Ammunition Storage');
    } else {
        addInteraction({
            fort_id: 'shivneri',
            location_id: 'ammunitionStorage',
            clicked: false,
            time_spent_minutes: 0,
            skipped: true
        });
        console.log('    ⏭ Skipped Ammunition Storage');
    }

    // Few visit viewpoint (requires high energy)
    if (user <= 4) {
        addInteraction({
            fort_id: 'shivneri',
            location_id: 'viewpoint',
            clicked: true,
            time_spent_minutes: Math.random() * 10 + 8,
            skipped: false
        });
        console.log('    ✓ Visited Viewpoint');
    } else {
        addInteraction({
            fort_id: 'shivneri',
            location_id: 'viewpoint',
            clicked: false,
            time_spent_minutes: 0,
            skipped: true
        });
        console.log('    ⏭ Skipped Viewpoint');
    }

    console.log('');
}

// Step 3: View location statistics
console.log('\nStep 3: Analyzing location statistics...\n');

locations.forEach(locationId => {
    const stats = getLocationStatsById('shivneri', locationId);
    if (stats) {
        console.log(`  ${locationId}:`);
        console.log(`    Clicks: ${stats.total_clicks}`);
        console.log(`    Time Spent: ${stats.total_time_spent.toFixed(1)} minutes`);
        console.log(`    Skips: ${stats.total_skips}`);
        console.log(`    Adaptive Score: ${stats.adaptive_score.toFixed(2)}`);
        console.log('');
    }
});

// Step 4: View fort analytics
console.log('Step 4: Fort-wide analytics...\n');
const analytics = getFortAnalytics('shivneri');

console.log('  Popular Spots:');
analytics.popular_spots.forEach((spot, index) => {
    console.log(`    ${index + 1}. ${spot.location_id} (${spot.clicks} clicks)`);
});

console.log('\n  Frequently Skipped:');
analytics.skipped_spots.forEach((spot, index) => {
    console.log(`    ${index + 1}. ${spot.location_id} (${spot.skips} skips)`);
});

// Step 5: Compare base vs adaptive importance
console.log('\n\nStep 5: Comparing base vs adaptive importance scores...\n');

const importanceComparison = [
    { id: 'mainGate', base: 6 },
    { id: 'shivJanmabhoomi', base: 10 },
    { id: 'templeArea', base: 8 },
    { id: 'ammunitionStorage', base: 7 },
    { id: 'viewpoint', base: 5 }
];

console.log('  Location                  | Base Score | Adaptive Score | Change');
console.log('  --------------------------|------------|----------------|-------');

importanceComparison.forEach(loc => {
    const adaptiveScore = getAdaptiveImportance('shivneri', loc.id, loc.base);
    const change = adaptiveScore - loc.base;
    const changeStr = change >= 0 ? `+${change.toFixed(2)}` : change.toFixed(2);
    console.log(`  ${loc.id.padEnd(25)} | ${loc.base.toString().padEnd(10)} | ${adaptiveScore.toFixed(2).padEnd(14)} | ${changeStr}`);
});

// Step 6: Test configuration changes
console.log('\n\nStep 6: Testing weight configuration...\n');

console.log('  Current weights:');
const currentConfig = { click_weight: 2, time_weight: 1.5, skip_weight: 3 };
console.log(`    Click weight: ${currentConfig.click_weight}`);
console.log(`    Time weight: ${currentConfig.time_weight}`);
console.log(`    Skip weight: ${currentConfig.skip_weight}`);

console.log('\n  Updating weights...');
updateConfig({
    click_weight: 3,
    time_weight: 2,
    skip_weight: 5
});
console.log('  ✓ Weights updated and scores recalculated');

// Step 7: Export data
console.log('\n\nStep 7: Exporting data...\n');
const exportedData = exportData();
console.log(`  ✓ Exported ${exportedData.interactions.length} interactions`);
console.log(`  ✓ Exported ${Object.keys(exportedData.location_stats).length} location statistics`);
console.log(`  ✓ Export timestamp: ${exportedData.exported_at}`);

// Summary
console.log('\n\n=== Demo Complete ===\n');
console.log('The Adaptive Route Learning System:');
console.log('  ✓ Tracks user interactions (clicks, time, skips)');
console.log('  ✓ Calculates adaptive scores based on behavior');
console.log('  ✓ Adjusts route recommendations automatically');
console.log('  ✓ Provides analytics on popular/skipped spots');
console.log('  ✓ Allows configuration of learning weights');
console.log('  ✓ Maintains data privacy (localStorage only)');
console.log('\nAll data is stored locally and no external APIs are used!');

// Cleanup note
console.log('\n[Note: To clear all test data, run: clearAllData()]');
