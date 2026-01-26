// Script to convert maharashtraData.js to JSON
// Run: node convert-data.js

const fs = require('fs');
const path = require('path');

// Read the JS file
const jsFilePath = path.join(__dirname, '../MarathiMiles/src/services/maharashtraData.js');
const jsContent = fs.readFileSync(jsFilePath, 'utf8');

// Extract the array content (simple regex approach)
// This is a basic converter - for production, use a proper JS parser
const arrayMatch = jsContent.match(/export const maharashtraPlaces = (\[[\s\S]*?\]);/);

if (arrayMatch) {
  // Evaluate the array (in a safe way)
  const places = eval(arrayMatch[1]);
  
  // Write to JSON
  const jsonPath = path.join(__dirname, 'data/maharashtraPlaces.json');
  fs.writeFileSync(jsonPath, JSON.stringify(places, null, 2));
  
  console.log(`✅ Converted ${places.length} places to JSON`);
  console.log(`📁 Saved to: ${jsonPath}`);
} else {
  console.error('❌ Could not extract places array from JS file');
}
