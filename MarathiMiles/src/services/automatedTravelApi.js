// src/services/automatedTravelApi.js

import { getSmartRecommendations } from './recommendationEngine';

export function getAutomatedTravelPlan(userProfile, topN = 10) {
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        console.log('🚀 Generating smart recommendations for:', userProfile);
        
        const recommendations = getSmartRecommendations(userProfile, topN);
        
        const result = {
          userProfile,
          generatedAt: new Date().toISOString(),
          totalRecommendations: recommendations.length,
          plan: recommendations
        };

        console.log('✅ Smart recommendations generated:', result);
        resolve({
          success: true,
          data: result,
          message: `Found ${result.totalRecommendations} perfectly matched destinations!`
        });

      } catch (error) {
        console.error('❌ Recommendation error:', error);
        resolve({
          success: false,
          data: null,
          message: 'Smart recommendations failed. Using fallback.'
        });
      }
    }, 1000);
  });
}

export default getAutomatedTravelPlan;