// src/utils/travelCalculations.js - COMPLETELY UPDATED

import { GeolocationService } from './geolocationService';

let userLocation = null;
let locationSource = 'not_detected';

export async function initializeUserLocation() {
  try {
    console.log('📍 Requesting location permission...');
    
    // ✅ STEP 1: Try to get precise GPS location first
    userLocation = await GeolocationService.getCurrentLocation();
    locationSource = 'gps';
    console.log('📍 Precise GPS location acquired');
    return userLocation;
    
  } catch (error) {
    console.log('📍 GPS location failed, using approximate:', error.message);
    
    // ✅ STEP 2: Show user that we're using approximate location
    const approximateLocation = await GeolocationService.getApproximateLocation();
    userLocation = approximateLocation;
    locationSource = 'approximate';
    
    return userLocation;
  }
}

export function getUserLocation() {
  return userLocation;
}

export function getLocationSource() {
  return locationSource;
}

// ✅ UPDATED: All functions now use user location
export function calculateDistance(placeCoordinates) {
  if (!userLocation || !placeCoordinates) {
    return 150; // Fallback distance
  }

  const R = 6371; // Earth radius in km
  const dLat = (placeCoordinates.lat - userLocation.lat) * Math.PI / 180;
  const dLon = (placeCoordinates.lng - userLocation.lng) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(userLocation.lat * Math.PI / 180) * Math.cos(placeCoordinates.lat * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  return Math.round(distance);
}

// ✅ UPDATED: Realistic budget calculation for dynamic budgets
export function calculateTotalBudget(place, userBudget = 'Medium', duration = '2 Weeks', transportMode = 'Bus') {
  if (!place || !place.coordinates) {
    const baseBudgetMap = {
      'Low': 5000,
      'Budget': 5000,
      'Medium': 10000,
      'Mid-range': 10000,
      'High': 20000,
      'Luxury': 25000
    };
    return baseBudgetMap[userBudget] || 5000;
  }
  
  const distance = calculateDistance(place.coordinates);
  const transport = place.transportOptions?.find(t => t.mode === transportMode);
  
  // ✅ Get days from duration
  const getDays = (dur) => {
    if (!dur) return 14;
    const durLower = dur.toLowerCase();
    if (durLower.includes('14') || durLower.includes('2 week')) return 14;
    if (durLower.includes('7') || durLower.includes('1 week')) return 7;
    if (durLower.includes('1 day')) return 1;
    if (durLower.includes('weekend') || durLower.includes('2-3')) return 2;
    return 14;
  };
  
  const days = getDays(duration);
  
  // ✅ USER'S ACTUAL BUDGET BASED ON SELECTION
  const baseBudgetMap = {
    'Low': 5000,
    'Budget': 5000,
    'Medium': 10000,
    'Mid-range': 10000, 
    'High': 20000,
    'Luxury': 25000
  };
  const totalUserBudget = baseBudgetMap[userBudget] || 5000;
  
  // ✅ REALISTIC BUDGET BREAKDOWN BASED ON ACTUAL BUDGET
  const transportCost = transport ? Math.round(distance * transport.costPerKm * 2) : Math.round(totalUserBudget * 0.2);
  
  // ✅ Ensure transport cost is reasonable (10-30% of total budget)
  const minTransport = Math.round(totalUserBudget * 0.1);
  const maxTransport = Math.round(totalUserBudget * 0.3);
  const adjustedTransportCost = Math.min(Math.max(transportCost, minTransport), maxTransport);
  
  // ✅ Calculate remaining budget
  const remainingBudget = totalUserBudget - adjustedTransportCost;
  
  // ✅ REALISTIC DISTRIBUTION based on days and budget
  let stayCost, foodCost, activityCost;
  
  if (days === 1) {
    // Day trip - more for activities
    stayCost = 0;
    foodCost = Math.round(remainingBudget * 0.3);
    activityCost = Math.round(remainingBudget * 0.7);
  } else if (days <= 3) {
    // Short trip
    stayCost = Math.round(remainingBudget * 0.5);
    foodCost = Math.round(remainingBudget * 0.3);
    activityCost = Math.round(remainingBudget * 0.2);
  } else {
    // Long trip (7-14 days) - more for stay & food
    stayCost = Math.round(remainingBudget * 0.6);
    foodCost = Math.round(remainingBudget * 0.25);
    activityCost = Math.round(remainingBudget * 0.15);
  }
  
  const total = adjustedTransportCost + stayCost + foodCost + activityCost;
  
  return total;
}

export function calculateTransportTime(place, transportMode = 'Bus') {
  if (!place || !place.coordinates) {
    return "3-4 hours";
  }
  
  const distance = calculateDistance(place.coordinates);
  const transport = place.transportOptions?.find(t => t.mode === transportMode);
  
  if (!transport) return "3-4 hours";
  
  const baseTime = (distance / 100) * transport.durationPer100Km;
  const hours = Math.round(baseTime * 10) / 10;
  
  // ✅ More realistic time calculation
  if (hours < 1) return `${Math.round(hours * 60)} minutes`;
  if (hours === 1) return "1 hour";
  return `${hours} hours`;
}

// ✅ UPDATED: Realistic transport cost calculation
export function getTransportCost(place, transportMode = 'Bus') {
  if (!place || !place.coordinates) {
    return 1000; // ✅ Updated to realistic default
  }
  
  const distance = calculateDistance(place.coordinates);
  const transport = place.transportOptions?.find(t => t.mode === transportMode);
  
  if (!transport) return 1000;
  
  const cost = Math.round(distance * transport.costPerKm * 2);
  
  // ✅ Ensure realistic transport costs
  if (cost < 500) return 500; // Minimum transport cost
  if (cost > 3000) return 3000; // Maximum transport cost
  
  return cost;
}

// ✅ NEW: Get detailed budget breakdown
export function getDetailedBudget(place, userBudget = 'Medium', duration = '2 Weeks', transportMode = 'Bus') {
  if (!place || !place.coordinates) {
    // ✅ Return based on user budget selection
    const baseBudgetMap = {
      'Low': 5000,
      'Budget': 5000,
      'Medium': 10000,
      'Mid-range': 10000,
      'High': 20000,
      'Luxury': 25000
    };
    const totalBudget = baseBudgetMap[userBudget] || 5000;
    
    return {
      total: totalBudget,
      transportCost: Math.round(totalBudget * 0.2), // 20%
      stayCost: Math.round(totalBudget * 0.5),      // 50%
      foodCost: Math.round(totalBudget * 0.2),      // 20%
      activityCost: Math.round(totalBudget * 0.1),  // 10%
      stayAndFood: Math.round(totalBudget * 0.7)    // 70% combined
    };
  }
  
  const distance = calculateDistance(place.coordinates);
  const transport = place.transportOptions?.find(t => t.mode === transportMode);
  
  // ✅ Get days from duration
  const getDays = (dur) => {
    if (!dur) return 14;
    const durLower = dur.toLowerCase();
    if (durLower.includes('14') || durLower.includes('2 week')) return 14;
    if (durLower.includes('7') || durLower.includes('1 week')) return 7;
    if (durLower.includes('1 day')) return 1;
    if (durLower.includes('weekend') || durLower.includes('2-3')) return 2;
    return 14;
  };
  
  const days = getDays(duration);
  
  // ✅ USER'S ACTUAL BUDGET BASED ON SELECTION
  const baseBudgetMap = {
    'Low': 5000,
    'Budget': 5000,
    'Medium': 10000,
    'Mid-range': 10000, 
    'High': 20000,
    'Luxury': 25000
  };
  const totalUserBudget = baseBudgetMap[userBudget] || 5000;
  
  // ✅ REALISTIC BUDGET BREAKDOWN BASED ON ACTUAL BUDGET
  const transportCost = transport ? Math.round(distance * transport.costPerKm * 2) : Math.round(totalUserBudget * 0.2);
  
  // ✅ Ensure transport cost is reasonable (10-30% of total budget)
  const minTransport = Math.round(totalUserBudget * 0.1);
  const maxTransport = Math.round(totalUserBudget * 0.3);
  const adjustedTransportCost = Math.min(Math.max(transportCost, minTransport), maxTransport);
  
  // ✅ Calculate remaining budget
  const remainingBudget = totalUserBudget - adjustedTransportCost;
  
  // ✅ REALISTIC DISTRIBUTION based on days and budget
  let stayCost, foodCost, activityCost;
  
  if (days === 1) {
    // Day trip - more for activities
    stayCost = 0;
    foodCost = Math.round(remainingBudget * 0.3);
    activityCost = Math.round(remainingBudget * 0.7);
  } else if (days <= 3) {
    // Short trip
    stayCost = Math.round(remainingBudget * 0.5);
    foodCost = Math.round(remainingBudget * 0.3);
    activityCost = Math.round(remainingBudget * 0.2);
  } else {
    // Long trip (7-14 days) - more for stay & food
    stayCost = Math.round(remainingBudget * 0.6);
    foodCost = Math.round(remainingBudget * 0.25);
    activityCost = Math.round(remainingBudget * 0.15);
  }
  
  const total = adjustedTransportCost + stayCost + foodCost + activityCost;
  
  console.log('💰 DYNAMIC Budget Calculation:', {
    userBudget,
    totalUserBudget,
    days,
    adjustedTransportCost,
    stayCost, 
    foodCost,
    activityCost,
    total
  });
  
  return {
    total,
    transportCost: adjustedTransportCost,
    stayCost,
    foodCost,
    activityCost,
    stayAndFood: stayCost + foodCost
  };
}

// ✅ UPDATED: Calculate per day budget based on ACTUAL user budget
export function getPerDayBudget(userBudget = 'Medium', duration = '2 Weeks') {
  const getDays = (dur) => {
    if (!dur) return 14;
    const durLower = dur.toLowerCase();
    if (durLower.includes('14') || durLower.includes('2 week')) return 14;
    if (durLower.includes('7') || durLower.includes('1 week')) return 7;
    if (durLower.includes('1 day')) return 1;
    if (durLower.includes('weekend') || durLower.includes('2-3')) return 2;
    return 14;
  };
  
  const days = getDays(duration);
  
  // ✅ USER'S ACTUAL BUDGET
  const baseBudgetMap = {
    'Low': 5000,
    'Budget': 5000,
    'Medium': 10000,
    'Mid-range': 10000,
    'High': 20000,
    'Luxury': 25000
  };
  const totalBudget = baseBudgetMap[userBudget] || 5000;
  
  return Math.round(totalBudget / days);
}

// ✅ Export all functions properly
export default {
  calculateDistance,
  calculateTotalBudget,
  calculateTransportTime,
  getTransportCost,
  getDetailedBudget,
  getPerDayBudget,
  initializeUserLocation,
  getUserLocation,
  getLocationSource
};