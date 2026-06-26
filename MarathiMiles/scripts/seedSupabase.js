// scripts/seedSupabase.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Supabase configuration
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://ccmxfwzphowbzsexebua.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_TRfyet6n2hEFtOYh96bexg_VP_Dzam3';

console.log(`🔌 Connecting to Supabase at: ${SUPABASE_URL}`);
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Helper to create a temp JS file with image imports cleaned up
async function loadCleanModule(filePath) {
    const absPath = path.resolve(filePath);
    const dir = path.dirname(absPath);
    const base = path.basename(absPath, '.js');
    const tempPath = path.join(dir, `${base}.temp.js`);

    console.log(`🧼 Cleaning file: ${filePath}`);
    let content = fs.readFileSync(absPath, 'utf8');

    // Replace image imports with string paths
    content = content.replace(/import\s+(\w+)\s+from\s+['"](.+\.(png|jpe?g|svg|webp|jpeg))['"];?/g, 'const $1 = "$2";');

    fs.writeFileSync(tempPath, content, 'utf8');

    try {
        // Dynamic import using absolute file URL for Windows compatibility
        const fileUrl = `file://${tempPath.replace(/\\/g, '/')}`;
        const module = await import(fileUrl);
        return module;
    } finally {
        // Always clean up temp file
        if (fs.existsSync(tempPath)) {
            fs.unlinkSync(tempPath);
        }
    }
}

async function seed() {
    try {
        console.log('🚀 Starting Supabase Seeding...');

        // 1. Load Forts Data
        const fortDataModule = await loadCleanModule(path.join(__dirname, '../src/services/fortData.js'));
        const forts = fortDataModule.maharashtraForts;
        console.log(`Loaded ${forts.length} forts.`);

        // Insert forts
        const formattedForts = forts.map(fort => ({
            id: fort.id,
            name: fort.name,
            location: fort.location,
            era: fort.era,
            subtitle: fort.subtitle,
            significance: fort.significance,
            image_url: fort.imageUrl || fort.image,
            timeline: fort.timeline || [],
            itineraries: fort.itineraries || {},
            images360: fort.images360 || [],
            highlights: fort.highlights || [],
            guides: fort.guides || [],
            food: fort.food || [],
            bazaar: fort.bazaar || [],
            culture: fort.culture || []
        }));

        console.log('Inserting forts...');
        const { error: fortError } = await supabase.from('forts').upsert(formattedForts);
        if (fortError) throw fortError;
        console.log('✅ Forts seeded successfully.');

        // 2. Load Smart Exploration Data for Shivneri
        const shivneriModule = await loadCleanModule(path.join(__dirname, '../src/data/shivneriFortData.js'));
        const shivneriLocs = shivneriModule.shivneriFortLocations;
        const shivneriEdges = shivneriModule.shivneriGraphEdges;

        // Load Smart Exploration Data for Raigad
        const raigadModule = await loadCleanModule(path.join(__dirname, '../src/data/raigadFortData.js'));
        const raigadLocs = raigadModule.raigadFortLocations;
        const raigadEdges = raigadModule.raigadGraphEdges;

        const allNodes = [];
        const allEdges = [];

        // Format Shivneri nodes
        Object.keys(shivneriLocs).forEach(nodeId => {
            const node = shivneriLocs[nodeId];
            allNodes.push({
                fort_id: 1, // Shivneri
                node_id: nodeId,
                name: node.name,
                lat: node.lat,
                lng: node.lng,
                historical_score: node.historicalScore,
                spiritual_score: node.spiritualScore,
                architectural_score: node.architecturalScore,
                walking_effort: node.walkingEffort,
                avg_visit_time: node.avgVisitTime,
                description: node.description,
                connections: node.connections || []
            });
        });

        // Format Shivneri edges
        shivneriEdges.forEach(edge => {
            allEdges.push({
                fort_id: 1,
                from_node: edge.from,
                to_node: edge.to,
                walking_time: edge.walkingTime,
                difficulty: edge.difficulty
            });
        });

        // Format Raigad nodes
        Object.keys(raigadLocs).forEach(nodeId => {
            const node = raigadLocs[nodeId];
            allNodes.push({
                fort_id: 2, // Raigad
                node_id: nodeId,
                name: node.name,
                lat: node.lat,
                lng: node.lng,
                historical_score: node.historicalScore,
                spiritual_score: node.spiritualScore,
                architectural_score: node.architecturalScore,
                walking_effort: node.walkingEffort,
                avg_visit_time: node.avgVisitTime,
                description: node.description,
                connections: node.connections || []
            });
        });

        // Format Raigad edges
        raigadEdges.forEach(edge => {
            allEdges.push({
                fort_id: 2,
                from_node: edge.from,
                to_node: edge.to,
                walking_time: edge.walkingTime,
                difficulty: edge.difficulty
            });
        });

        console.log(`Inserting ${allNodes.length} smart exploration nodes...`);
        const { error: nodeError } = await supabase.from('smart_exploration_nodes').upsert(allNodes, { onConflict: 'fort_id,node_id' });
        if (nodeError) throw nodeError;
        console.log('✅ Smart exploration nodes seeded successfully.');

        console.log(`Inserting ${allEdges.length} smart exploration edges...`);
        const { error: edgeError } = await supabase.from('smart_exploration_edges').insert(allEdges);
        if (edgeError) throw edgeError;
        console.log('✅ Smart exploration edges seeded successfully.');

        // 3. Load Destinations
        const travelModule = await loadCleanModule(path.join(__dirname, '../src/services/travelData.js'));
        const allPlaces = travelModule.allPlaces;
        console.log(`Loaded ${allPlaces.length} destinations.`);

        const formattedDestinations = allPlaces.map(place => ({
            id: place.id,
            name: place.name,
            location: place.location,
            description: place.description,
            category: place.category || [],
            interests: place.interests || [],
            budget: place.budget,
            duration: place.duration,
            recommended_for: place.recommendedFor || [],
            suitable_age_groups: place.suitableAgeGroups || [],
            suitable_travel_groups: place.suitableTravelGroups || [],
            trip_type_tags: place.tripTypeTags || [],
            interest_tags: place.interestTags || [],
            budget_compatibility: place.budgetCompatibility,
            duration_compatibility: place.durationCompatibility || [],
            mood_compatibility: place.moodCompatibility || [],
            accessibility: place.accessibility || [],
            best_season: place.bestSeason,
            mood_tags: place.moodTags || [],
            highlights: place.highlights || [],
            image: place.image,
            coordinates: place.coordinates || {},
            base_budget: place.baseBudget || 0,
            transport_options: place.transportOptions || [],
            detailed_highlights: place.detailedHighlights || [],
            itinerary_template: place.itineraryTemplate || []
        }));

        console.log('Inserting destinations...');
        const { error: destError } = await supabase.from('destinations').upsert(formattedDestinations);
        if (destError) throw destError;
        console.log('✅ Destinations seeded successfully.');

        // 4. Load Historical Events
        const historyModule = await loadCleanModule(path.join(__dirname, '../src/services/historicalData.js'));
        const events = historyModule.maharashtraHistoricalEvents;
        console.log(`Loaded ${events.length} historical event years.`);

        const formattedEvents = events.map(ev => ({
            year: ev.year,
            era: ev.era,
            events: ev.events || []
        }));

        console.log('Inserting historical events...');
        const { error: histError } = await supabase.from('historical_events').insert(formattedEvents);
        if (histError) throw histError;
        console.log('✅ Historical events seeded successfully.');

        console.log('🎉 Seeding Complete! Everything shifted to Supabase successfully.');
    } catch (err) {
        console.error('❌ Seeding failed with error:', err);
    }
}

seed();
