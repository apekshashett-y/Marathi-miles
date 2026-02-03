// Quick Test - Paste this in browser console to check if components loaded

console.log('=== MarathiMiles Component Check ===');

// Check if data is loaded
try {
    const data = require('../../data/shivneriData');
    console.log('✅ shivneriData loaded');
    console.log('Activities count:', data.shivneriData?.activities?.length);
    console.log('Itinerary rules:', data.shivneriData?.itineraryRules);
} catch (e) {
    console.log('❌ Data loading error:', e.message);
}

// Check if DOM elements exist
setTimeout(() => {
    const exploreMore = document.querySelector('.explore-more-section');
    const cuisineSection = document.querySelector('.cuisine-section');
    const dynamicItinerary = document.querySelector('.dynamic-itinerary-planner');

    console.log('\n=== DOM Elements ===');
    console.log('Explore More section:', exploreMore ? '✅ Found' : '❌ Not found');
    console.log('Cuisine section:', cuisineSection ? '✅ Found' : '❌ Not found');
    console.log('Dynamic Itinerary:', dynamicItinerary ? '✅ Found' : '❌ Not found');

    if (!dynamicItinerary) {
        console.log('\n⚠️ Dynamic Itinerary not rendering!');
        console.log('Check browser console for React errors');
    } else {
        console.log('\n✅ All components loaded successfully!');
        console.log('Scroll down to see the itinerary planner');
    }
}, 2000);
