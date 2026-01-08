// emotionDetection.js - Utility functions for emotion detection

const FLASK_BACKEND_URL = "http://127.0.0.1:5000";

/**
 * Send image to Flask backend for emotion detection
 * @param {string} imageBase64 - Base64 encoded image
 * @returns {Promise<string>} - Detected emotion
 */
export const detectEmotionFromBackend = async (imageBase64) => {
  try {
    console.log("📤 Sending frame to Flask backend...");
    
    // Remove data URL prefix if present
    const base64Data = imageBase64.includes(',') 
      ? imageBase64.split(',')[1] 
      : imageBase64;
    
    const response = await fetch(`${FLASK_BACKEND_URL}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        image: base64Data 
      }),
      timeout: 5000 // 5 second timeout
    });

    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }

    const data = await response.json();
    
    console.log("📥 Backend response:", data);
    
    if (data.error) {
      throw new Error(data.error);
    }
    
    if (data.emotion === "No Face") {
      console.warn("⚠️ No face detected in frame");
      return "No Face";
    }
    
    console.log(`✅ Detected emotion: ${data.emotion} (${(data.confidence * 100).toFixed(1)}%)`);
    return data.emotion;
    
  } catch (error) {
    console.error("❌ Backend detection failed:", error.message);
    throw error;
  }
};

/**
 * Test connection to Flask backend
 * @returns {Promise<boolean>} - True if backend is available
 */
export const testBackendConnection = async () => {
  try {
    console.log("🔗 Testing Flask backend connection...");
    
    const response = await fetch(`${FLASK_BACKEND_URL}/health`, {
      method: "GET",
      timeout: 3000
    });
    
    if (!response.ok) {
      throw new Error(`Health check failed: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("✅ Backend health check:", data);
    
    return data.status === "ok" && data.model === "loaded";
    
  } catch (error) {
    console.error("❌ Backend connection test failed:", error.message);
    return false;
  }
};

/**
 * Map detected emotion to travel mood category
 * @param {string} emotion - Raw emotion from model
 * @returns {string} - Travel mood category
 */
export const mapEmotionToTravelMood = (emotion) => {
  const emotionLower = emotion.toLowerCase();
  
  const moodMapping = {
    'happy': 'Happy',
    'excited': 'Excited',
    'surprise': 'Excited',
    'neutral': 'Calm',
    'calm': 'Calm',
    'sad': 'Sad',
    'fear': 'Stressed',
    'angry': 'Stressed',
    'stressed': 'Stressed',
    'disgust': 'Stressed'
  };
  
  return moodMapping[emotionLower] || 'Calm';
};

/**
 * Get mood recommendations based on detected emotion
 * @param {string} mood - Travel mood
 * @returns {object} - Recommendations
 */
export const getMoodRecommendations = (mood) => {
  const recommendations = {
    'Happy': {
      destinations: ['Beach resorts', 'Adventure parks', 'Music festivals'],
      activities: ['Water sports', 'Hiking', 'Dancing'],
      color: '#4CAF50'
    },
    'Excited': {
      destinations: ['Theme parks', 'Mountains', 'City tours'],
      activities: ['Bungee jumping', 'Rock climbing', 'Exploration'],
      color: '#FF9800'
    },
    'Calm': {
      destinations: ['Spa resorts', 'Gardens', 'Temples'],
      activities: ['Meditation', 'Yoga', 'Reading'],
      color: '#2196F3'
    },
    'Sad': {
      destinations: ['Peaceful lakes', 'Quiet villages', 'Libraries'],
      activities: ['Photography', 'Journaling', 'Nature walks'],
      color: '#9C27B0'
    },
    'Stressed': {
      destinations: ['Wellness retreats', 'Beaches', 'Forests'],
      activities: ['Spa treatments', 'Massage', 'Breathing exercises'],
      color: '#f44336'
    }
  };
  
  return recommendations[mood] || recommendations['Calm'];
};