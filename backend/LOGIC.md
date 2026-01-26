# Backend Logic for Mood Recommendation System

## Overview
The backend provides a comprehensive mood-based travel recommendation system for Maharashtra tourist places. It takes user's mood (expression), questionnaire answers, and location to provide personalized recommendations with distance calculations and logical itineraries.

---

## Complete Flow

### 1. **Request Flow**
```
Frontend → POST /api/recommendations/mood-based
Body: {
  mood: "happy" | "sad" | "excited" | "calm" | "stressed",
  userProfile: {
    ageGroup: "18-30",
    travelGroup: "Friends",
    tripType: "Adventure",
    duration: "2-3 Days",
    budget: "Medium",
    interests: ["Beaches", "Trekking"]
  },
  userLocation: { lat: 19.0760, lng: 72.8777 } // Optional
}
```

### 2. **Processing Pipeline**

#### Step 1: Validation
- Validates `mood` is provided
- Validates `userProfile` is provided
- Logs the request for debugging

#### Step 2: Recommendation Scoring (`recommendationService.js`)
The system scores each place in the database using a weighted scoring algorithm:

**Scoring System (Total: 140 points max)**
1. **Mood Matching (40 points)** - Highest Priority
   - Direct match in `moodTags`: +40 points
   - Match in `moodCompatibility`: +35 points
   - Reason: "Perfect for {mood} mood"

2. **Trip Type Matching (30 points)**
   - Checks if place's `tripTypeTags` includes user's `tripType`
   - Reason: "Great for {tripType} trips"

3. **Interests Matching (25 points)**
   - Each matching interest: +8 points
   - Compares user's `interests` array with place's `interests` array
   - Reason: "Matches interests: {list}"

4. **Budget Compatibility (20 points)**
   - Maps user budget to place budget:
     - Low/Budget → Low/Budget places
     - Medium/Mid-range → Medium/Mid-range places
     - High/Luxury → High/Luxury places
   - Reason: "Fits your {budget} budget"

5. **Duration Matching (15 points)**
   - Checks if place's `durationCompatibility` includes user's `duration`
   - Reason: "Perfect for {duration} trip"

6. **Travel Group Matching (10 points)**
   - Checks if place's `suitableTravelGroups` includes user's `travelGroup`
   - Reason: "Ideal for {travelGroup} travel"

7. **Age Group Matching (5 points)**
   - Checks if place's `suitableAgeGroups` includes user's `ageGroup`
   - Reason: "Suitable for {ageGroup} age group"

**Filtering & Sorting:**
- Filters out places with score < 20
- Sorts by score (highest first)
- Fallback: If no matches, returns top 5 places by mood only

#### Step 3: Distance Calculation (`distanceService.js`)
If user location is provided:
- Uses **Haversine formula** to calculate great-circle distance
- Formula: `d = 2R × arcsin(√(sin²(Δlat/2) + cos(lat1)×cos(lat2)×sin²(Δlon/2)))`
- Returns: `{ km, miles, formatted }`
- **Sorts recommendations by distance** (closest first)

#### Step 4: Itinerary Generation (`itineraryService.js`)
For each recommended place:

**Duration Parsing:**
- "1 Day" → 1 day
- "2-3 Days" / "Weekend" → 2 days
- "1 Week" / "7 Days" → 7 days
- "2 Weeks" / "14 Days" → 14 days

**Itinerary Logic:**
1. **Uses Template if Available:**
   - If place has `itineraryTemplate`, uses it
   - Extends template if user selected longer duration

2. **Generates Custom Itinerary:**
   - **Day 1 (Arrival):**
     - Travel to place
     - Check-in
     - Explore local attractions
     - Visit first highlight
     - Evening relaxation & local cuisine
   
   - **Middle Days:**
     - Themed activities based on place type and interests:
       - Beaches → Beach Activities, Water Sports, Coastal Exploration
       - Trekking → Trekking Adventure, Nature Walks, Scenic Viewpoints
       - Spiritual → Spiritual Experience, Temple Visits, Meditation
       - Default → Cultural Immersion, Nature Exploration, Historical Sites
     - Includes place-specific highlights from `detailedHighlights`
   
   - **Last Day (Departure):**
     - Final exploration & photography
     - Souvenir shopping
     - Check-out
     - Return journey

#### Step 5: Response Formatting
Returns:
```json
{
  "success": true,
  "data": {
    "mood": "happy",
    "userProfile": {...},
    "recommendations": [
      {
        "place": {
          ...place data with distance, duration, budget...
        },
        "itinerary": {
          "placeId": 1,
          "placeName": "Alibaug",
          "totalDays": 2,
          "itinerary": [
            {
              "day": 1,
              "title": "Arrival & Beach Exploration",
              "activities": [...]
            }
          ]
        },
        "matchScore": 95,
        "matchPercentage": 95,
        "matchReasons": ["Perfect for happy mood", "Great for Adventure trips"]
      }
    ],
    "totalRecommendations": 5,
    "generatedAt": "2026-01-25T..."
  },
  "message": "Found 5 perfect destinations for your happy mood!"
}
```

---

## Key Services

### 1. RecommendationService
- **Purpose:** Score and filter places based on user preferences
- **Input:** mood (string), userProfile (object)
- **Output:** Array of scored places (sorted by match score)
- **Logic:** Weighted scoring system with 7 criteria

### 2. DistanceService
- **Purpose:** Calculate distance between user location and places
- **Method:** Haversine formula (great-circle distance)
- **Input:** lat1, lon1, lat2, lon2
- **Output:** `{ km, miles, formatted }`
- **Accuracy:** ~0.5% error for distances up to 1000km

### 3. ItineraryService
- **Purpose:** Generate day-by-day itinerary based on duration
- **Input:** place (object), duration (string), userProfile (object)
- **Output:** Itinerary object with day-by-day plans
- **Logic:** 
  - Uses template if available
  - Generates custom itinerary based on place type
  - Adapts activities to user interests

---

## Data Structure

### Place Object Structure
```javascript
{
  id: 1,
  name: "Alibaug",
  location: "Raigad, Maharashtra",
  category: ["beach"],
  interests: ["Beaches", "Fort", "Water Sports"],
  budget: "mid-range",
  budgetCompatibility: "mid-range",
  durationCompatibility: ["1 Day", "2-3 Days"],
  moodTags: ["happy", "excited"],
  moodCompatibility: ["happy", "excited"],
  tripTypeTags: ["Relaxing", "Adventure", "Beach"],
  suitableTravelGroups: ["Friends", "Couple", "Family"],
  suitableAgeGroups: ["18-30", "30-50", "50+"],
  coordinates: { lat: 18.6414, lng: 72.8722 },
  highlights: [...],
  detailedHighlights: [...],
  itineraryTemplate: [...],
  transportOptions: [...],
  // ... other fields
}
```

---

## Error Handling

1. **Missing Required Fields:**
   - Returns 400 with error message

2. **No Places Found:**
   - Falls back to mood-based filtering
   - Returns top 5 places matching mood only

3. **Location Not Available:**
   - Continues without distance calculation
   - Recommendations sorted by match score only

4. **Server Errors:**
   - Returns 500 with error message
   - Frontend falls back to local recommendations

---

## Performance Optimizations

1. **Data Loading:**
   - Places loaded once at service initialization
   - Cached in memory for fast access

2. **Filtering:**
   - Filters low-score places early (< 20 points)
   - Limits to top 5 recommendations

3. **Distance Calculation:**
   - Only calculated if user location provided
   - Efficient Haversine formula implementation

---

## API Endpoints

### POST /api/recommendations/mood-based
Main endpoint for mood-based recommendations

### POST /api/recommendations/calculate-distance
Calculate distance to specific place

### GET /api/places
Get all places

### GET /api/places/:id
Get specific place by ID

### GET /api/places/mood/:mood
Get places filtered by mood

### GET /api/health
Health check endpoint

---

## Frontend Integration

The frontend:
1. Detects mood from face recognition
2. Collects questionnaire answers
3. Gets user location (optional)
4. Calls backend API
5. Falls back to local recommendations if backend unavailable
6. Displays recommendations with distance and itinerary

---

## Logic Summary

**The system works by:**
1. **Scoring** each place based on how well it matches user's mood and preferences
2. **Filtering** out low-scoring places (< 20 points)
3. **Calculating distances** if user location available
4. **Sorting** by distance (if available) or match score
5. **Generating itineraries** tailored to user's duration and interests
6. **Returning top 5** most relevant recommendations

**Priority Order:**
1. Mood match (most important)
2. Trip type match
3. Interests match
4. Budget compatibility
5. Duration match
6. Travel group match
7. Age group match

This ensures users get the most relevant destinations for their current mood and preferences!
