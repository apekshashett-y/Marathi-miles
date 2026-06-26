import { latLngToSVG } from '../utils/geoProjection.js';
import { LOHAGAD_MAP_BOUNDS, lohagadLocations, lohagadEdges } from './lohagadLocations.js';

const V2_SVG_W = 900;
const V2_SVG_H = 800;

export const lohagadFortLocations = {};

lohagadLocations.forEach(loc => {
    lohagadFortLocations[loc.id] = { ...loc };
});

// Backward-compatible geo-projection:
Object.values(lohagadFortLocations).forEach((loc) => {
    const { x, y } = latLngToSVG(loc.lat, loc.lng, LOHAGAD_MAP_BOUNDS, V2_SVG_W, V2_SVG_H);
    loc.coordinates = { x, y };
});

export const lohagadGraphEdges = lohagadEdges;

export const lohagadFortMetadata = {
    fortId: 'lohagad',
    fortName: 'Lohagad Fort',
    totalLocations: Object.keys(lohagadFortLocations).length,
    entryPoint: 'mainGate',
    description: 'The Iron Fort — A magnificent hill fort near Lonavala'
};
