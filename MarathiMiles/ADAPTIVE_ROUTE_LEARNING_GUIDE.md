# Adaptive Route Learning System - Implementation Documentation

## Overview

The Adaptive Route Learning System is a **self-learning, behavior-based route optimization system** that learns from user interactions to improve route recommendations over time. This system does NOT use ChatGPT or any external AI APIs—it's a pure, local, data-driven learning system using localStorage.

---

## 🏗️ Architecture

### Core Components

1. **Database Layer** (`src/services/adaptiveDatabase.js`)
   - Local storage-based persistence
   - Tracks user interactions
   - Calculates adaptive scores
   - Manages configuration

2. **Tracking System** (`src/utils/behaviorTracking.js`)
   - Session management
   - Click tracking
   - Time tracking
   - Skip tracking
   - Route comparison

3. **Adaptive Path Optimizer** (`src/utils/adaptivePathOptimizer.js`)
   - Enhanced version of original optimizer
   - Uses adaptive scores instead of static importance
   - Falls back gracefully when insufficient data

4. **Analytics Dashboard** (`src/components/Passport/AdaptiveAnalytics.jsx`)
   - Displays visitor patterns
   - Shows popular spots
   - Displays frequently skipped locations
   - Average visit duration

5. **Integration** (`src/components/Passport/SmartExplorationPage.jsx`)
   - Adaptive mode toggle
   - Analytics panel
   - User behavior tracking

---

## 📊 Database Schema

### 1. User Interactions Table
Stored in: `localStorage['marathimiles_user_interactions']`

```javascript
{
  id: string,              // UUID
  user_id: string,         // Device-specific user ID
  location_id: string,     // e.g., "shivJanmabhoomi"
  fort_id: string,         // e.g., "shivneri"
  clicked: boolean,        // Location was clicked
  time_spent_minutes: number,  // Time spent viewing
  skipped: boolean,        // Location was skipped
  timestamp: number        // Unix timestamp
}
```

### 2. Location Statistics Table
Stored in: `localStorage['marathimiles_location_stats']`

```javascript
{
  location_id: string,
  fort_id: string,
  total_clicks: number,
  total_time_spent: number,
  total_skips: number,
  visit_count: number,
  adaptive_score: number,  // Calculated score
  last_updated: number
}
```

### 3. Configuration
Stored in: `localStorage['marathimiles_adaptive_config']`

```javascript
{
  click_weight: 2,      // Weight for clicks
  time_weight: 1.5,     // Weight for time spent
  skip_weight: 3,       // Penalty for skips
  enabled: true         // Adaptive mode on/off
}
```

---

## 🧮 Adaptive Score Calculation

### Formula

```javascript
adaptive_score = 
    (total_clicks * click_weight) +
    (avg_time_spent * time_weight) -
    (total_skips * skip_weight)
```

### Combined Score (for route optimization)

```javascript
final_score = (base_importance * 0.6) + (adaptive_score * 0.4)
```

- **60%** weight to expert-curated base importance
- **40%** weight to user behavior patterns
- Ensures expert knowledge is preserved while incorporating user preferences

### Default Weights

- **Click Weight**: 2.0 (each click adds 2 points)
- **Time Weight**: 1.5 (each minute adds 1.5 points)
- **Skip Weight**: 3.0 (each skip removes 3 points)

These weights can be customized using `updateConfig()` function.

---

## 🔄 User Behavior Tracking

### What Gets Tracked

1. **Location Clicks**
   - When user clicks on a location in the route
   - Indicates interest in that location

2. **Time Spent**
   - Duration user views location details
   - Indicates engagement level

3. **Location Skips**
   - When location was in planned route but user skipped it
   - Indicates disinterest or inaccessibility

4. **Route Order Changes**
   - Comparison between planned vs actual route
   - Future enhancement capability

### How Tracking Works

```javascript
// Example: Track a location click
import { trackLocationClick } from './utils/behaviorTracking';

trackLocationClick('shivneri', 'shivJanmabhoomi');
```

```javascript
// Example: Track time spent
import { trackLocationView } from './utils/behaviorTracking';

trackLocationView('shivneri', 'templeArea', 15.5);
```

```javascript
// Example: Track skip
import { trackLocationSkip } from './utils/behaviorTracking';

trackLocationSkip('shivneri', 'ammunitionStorage');
```

---

## 🎯 Route Optimization with Adaptive Learning

### How It Works

1. **Initial State** (No data)
   - Uses static `historicalImportance` scores
   - Expert-curated values from fort data

2. **Learning Phase** (Some data)
   - Combines base importance with adaptive scores
   - Gradually adjusts based on patterns

3. **Mature State** (Rich data)
   - Routes optimized based on collective behavior
   - Popular spots get prioritized
   - Frequently skipped spots deprioritized

### Path Computation

```javascript
import { computeAdaptiveOptimalPath } from './utils/adaptivePathOptimizer';

const result = computeAdaptiveOptimalPath(
  fortGraph,      // Fort graph structure
  120,           // Available minutes
  'medium',      // Energy level
  true           // Use adaptive mode
);
```

---

## 🎨 UI Components

### 1. Adaptive Mode Toggle

Located in SmartExplorationPage header:
- **ON**: Uses adaptive scores (learning enabled)
- **OFF**: Uses static importance scores

```jsx
<button 
  className={`adaptive-toggle-btn ${adaptiveMode ? 'active' : ''}`}
  onClick={toggleAdaptiveMode}
>
  <span className="toggle-icon">{adaptiveMode ? '🧠' : '📊'}</span>
  <span className="toggle-text">Adaptive Mode</span>
  <span className="toggle-status">{adaptiveMode ? 'ON' : 'OFF'}</span>
</button>
```

### 2. Analytics Dashboard

Displays:
- **Popular Spots**: Most clicked locations
- **Frequently Skipped**: Often excluded locations
- **Average Visit Duration**: Time spent per location
- **Visitor Count**: Number of unique visitors analyzed

Accessed via the 📈 button in header.

---

## 🚀 Integration Points

### Files Modified

1. **SmartExplorationPage.jsx**
   - Added adaptive mode toggle
   - Added analytics panel
   - Integrated tracking
   - Uses adaptive optimizer

2. **fortGraphData.js**
   - Added `fortId` field to enable tracking

### Files Created

1. **adaptiveDatabase.js** - Database layer
2. **behaviorTracking.js** - Tracking utilities
3. **adaptivePathOptimizer.js** - Enhanced optimizer
4. **AdaptiveAnalytics.jsx** - Analytics component
5. **AdaptiveAnalytics.css** - Analytics styling

---

## 📝 Usage Examples

### Enable/Disable Adaptive Mode

```javascript
import { updateConfig } from '../services/adaptiveDatabase';

// Enable adaptive mode
updateConfig({ enabled: true });

// Disable adaptive mode
updateConfig({ enabled: false });
```

### Adjust Learning Weights

```javascript
import { updateConfig } from '../services/adaptiveDatabase';

updateConfig({
  click_weight: 3,      // Increase click importance
  time_weight: 2,       // Increase time importance
  skip_weight: 5        // Increase skip penalty
});
```

### Get Analytics Data

```javascript
import { getFortAnalytics } from '../services/adaptiveDatabase';

const analytics = getFortAnalytics('shivneri');

console.log(analytics.popular_spots);
console.log(analytics.skipped_spots);
console.log(analytics.total_visitors);
```

### Export/Import Data

```javascript
import { exportData, importData } from '../services/adaptiveDatabase';

// Backup data
const backup = exportData();
localStorage.setItem('backup', JSON.stringify(backup));

// Restore data
const backup = JSON.parse(localStorage.getItem('backup'));
importData(backup);
```

---

## 🔒 Privacy & Data

- **No external APIs**: All data stays on user's device
- **No user identification**: Uses anonymous device IDs
- **No server transmission**: Pure localStorage implementation
- **User control**: Can clear data anytime
- **Transparent**: All logic is client-side and inspectable

### Clear All Data

```javascript
import { clearAllData } from '../services/adaptiveDatabase';

clearAllData(); // Resets everything except user ID
```

---

## 🎓 Learning Behavior Examples

### Example 1: Popular Location Boost

**Initial State:**
- `templeArea`: base importance = 8

**After 100 visitors:**
- 85 clicked on temple
- Average time: 12 minutes
- 5 skipped

**Calculation:**
```
adaptive_score = (85 * 2) + (12 * 1.5) - (5 * 3)
               = 170 + 18 - 15
               = 173

final_score = (8 * 0.6) + (173 * 0.4)
            = 4.8 + 69.2
            = 74 (scaled appropriately)
```

Result: Temple gets higher priority in routes.

### Example 2: Frequently Skipped Location

**Initial State:**
- `viewpoint`: base importance = 5

**After 100 visitors:**
- 20 clicked
- Average time: 8 minutes
- 60 skipped

**Calculation:**
```
adaptive_score = (20 * 2) + (8 * 1.5) - (60 * 3)
               = 40 + 12 - 180
               = -128

final_score = (5 * 0.6) + (-128 * 0.4)
            = 3 - 51.2
            = 0 (floored to minimum)
```

Result: Viewpoint gets lower priority due to frequent skips.

---

## 🔧 Troubleshooting

### No Analytics Showing

**Cause**: No user interaction data yet

**Solution**: 
1. Use the app normally
2. Click on locations in routes
3. Check analytics after a few interactions

### Weights Not Working

**Cause**: Need to recalculate scores after weight change

**Solution**: Scores are recalculated automatically when you call `updateConfig()`

### Data Not Persisting

**Cause**: localStorage might be disabled or full

**Solution**:
1. Check browser localStorage is enabled
2. Clear old data if storage is full
3. Use `clearAllData()` to reset

---

## 🚦 Future Enhancement Ideas

1. **Machine Learning Integration**
   - Export data to JSON
   - Train models offline
   - Import predictions

2. **Collaborative Filtering**
   - Aggregate data across users (with consent)
   - Find similar user patterns

3. **Seasonal Adjustments**
   - Track timestamp patterns
   - Adjust for weather/season

4. **Personalization**
   - Individual user preferences
   - Custom weight profiles

5. **A/B Testing**
   - Compare adaptive vs static routes
   - Measure satisfaction metrics

---

## ✅ Testing Checklist

- [ ] Toggle adaptive mode ON/OFF
- [ ] Click on locations (verify tracking)
- [ ] View analytics dashboard
- [ ] Check popular spots update
- [ ] Check skipped spots update
- [ ] Verify route changes with adaptive mode
- [ ] Test data persistence (refresh page)
- [ ] Test responsive design (mobile)
- [ ] Export/import data functionality

---

## 📞 API Reference

### Database Functions

- `initializeDatabase()` - Initialize storage
- `addInteraction(interaction)` - Add interaction record
- `getInteractions()` - Get all interactions
- `getLocationStats()` - Get all location stats
- `getLocationStatsById(fortId, locationId)` - Get specific stats
- `getAdaptiveImportance(fortId, locationId, baseImportance)` - Get combined score
- `getFortAnalytics(fortId)` - Get analytics for UI
- `updateConfig(newConfig)` - Update configuration
- `clearAllData()` - Reset all data
- `exportData()` - Export as JSON
- `importData(data)` - Import from JSON

### Tracking Functions

- `trackLocationClick(fortId, locationId)` - Track click
- `trackLocationView(fortId, locationId, minutes)` - Track view with time
- `trackLocationSkip(fortId, locationId)` - Track skip
- `createLocationSession(fortId, locationId)` - Create tracking session

### Path Optimizer Functions

- `computeAdaptiveOptimalPath(fortGraph, minutes, energy, useAdaptive)` - Compute route

---

## 🎉 Summary

This Adaptive Route Learning System transforms static route recommendations into a **living, learning system** that improves with every user interaction. It's:

- ✅ Self-contained (no external APIs)
- ✅ Privacy-friendly (local storage only)
- ✅ Transparent (all logic client-side)
- ✅ Scalable (can integrate ML later)
- ✅ User-controlled (toggle on/off anytime)

The system maintains the quality of expert curation while incorporating real-world usage patterns for better recommendations.
