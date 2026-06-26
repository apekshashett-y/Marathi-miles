// src/services/supabaseService.js
import { supabase } from './supabaseClient';
import { latLngToSVG } from '../utils/geoProjection';
import { SHIVNERI_MAP_BOUNDS } from '../data/shivneriLocations';
import { RAIGAD_MAP_BOUNDS } from '../data/raigadLocations';

const V2_SVG_W = 900;
const V2_SVG_H = 800;

/**
 * Fetch all forts
 */
export async function fetchForts() {
  const { data, error } = await supabase
    .from('forts')
    .select('*')
    .order('id');
  if (error) {
    console.error('Error fetching forts:', error);
    throw error;
  }
  return data.map(fort => ({
    ...fort,
    imageUrl: fort.image_url
  }));
}

/**
 * Fetch smart exploration graph (nodes & edges) for a specific fort
 * @param {number} fortId
 */
export async function fetchSmartExplorationGraph(fortId) {
  // Fetch nodes
  const { data: nodes, error: nodesError } = await supabase
    .from('smart_exploration_nodes')
    .select('*')
    .eq('fort_id', fortId);
  if (nodesError) {
    console.error(`Error fetching nodes for fort ${fortId}:`, nodesError);
    throw nodesError;
  }

  // Fetch edges
  const { data: edges, error: edgesError } = await supabase
    .from('smart_exploration_edges')
    .select('*')
    .eq('fort_id', fortId);
  if (edgesError) {
    console.error(`Error fetching edges for fort ${fortId}:`, edgesError);
    throw edgesError;
  }

  const bounds = fortId === 1 ? SHIVNERI_MAP_BOUNDS : RAIGAD_MAP_BOUNDS;

  const fortLocations = {};
  nodes.forEach(node => {
    const { x, y } = latLngToSVG(node.lat, node.lng, bounds, V2_SVG_W, V2_SVG_H);
    fortLocations[node.node_id] = {
      id: node.node_id,
      name: node.name,
      historicalScore: node.historical_score,
      spiritualScore: node.spiritual_score,
      architecturalScore: node.architectural_score,
      walkingEffort: node.walking_effort,
      avgVisitTime: node.avg_visit_time,
      lat: node.lat,
      lng: node.lng,
      description: node.description,
      connections: node.connections || [],
      coordinates: { x, y }
    };
  });

  const fortEdges = edges.map(edge => ({
    from: edge.from_node,
    to: edge.to_node,
    walkingTime: edge.walking_time,
    difficulty: edge.difficulty
  }));

  const fortMetadata = {
    fortId: fortId === 1 ? 'shivneri' : 'raigad',
    fortName: fortId === 1 ? 'Shivneri Fort' : 'Raigad Fort',
    totalLocations: nodes.length,
    entryPoint: fortId === 1 ? 'mahaDarwaja' : 'menaDarwaza',
    description: fortId === 1 ? 'Birthplace of Chhatrapati Shivaji Maharaj' : 'Capital of the Maratha Empire'
  };

  return { fortLocations, fortEdges, fortMetadata };
}

/**
 * Fetch all destinations
 */
export async function fetchDestinations() {
  const { data, error } = await supabase
    .from('destinations')
    .select('*')
    .order('id');
  if (error) {
    console.error('Error fetching destinations:', error);
    throw error;
  }
  return data;
}

/**
 * Fetch mood-based places structured like moodBasedPlaces
 */
export async function fetchMoodBasedPlaces() {
  const destinations = await fetchDestinations();
  const moodBased = {
    happy: [],
    calm: [],
    stressed: [],
    excited: []
  };

  destinations.forEach(dest => {
    const tags = dest.mood_tags || [];
    tags.forEach(mood => {
      const normalizedMood = mood.toLowerCase();
      if (moodBased[normalizedMood]) {
        moodBased[normalizedMood].push(dest);
      } else {
        moodBased[normalizedMood] = moodBased[normalizedMood] || [];
        moodBased[normalizedMood].push(dest);
      }
    });
  });

  return moodBased;
}

/**
 * Fetch historical events
 */
export async function fetchHistoricalEvents() {
  const { data, error } = await supabase
    .from('historical_events')
    .select('*')
    .order('year');
  if (error) {
    console.error('Error fetching historical events:', error);
    throw error;
  }
  return data;
}
