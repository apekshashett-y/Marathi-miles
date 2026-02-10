# Manual Testing Guide - Smart Exploration Planner

## 🧪 How to Test the Implementation

### Prerequisites
- Dev server should be running (`npm run dev`)
- Browser should be open at `http://localhost:5173`

---

## Test Scenario 1: Preview Section Visibility

**Steps:**
1. Open the application in your browser
2. Click on any fort (e.g., "Shivneri Fort")
3. Scroll down past these sections:
   - Timeline/Story section
   - 360° Immersive Experience
   - Explore More cards
   - Cuisine Section
   - Shopping Section
   - Cultural Experiences
   - **Smart Itinerary Planner** ← This is where you are
4. Continue scrolling down
5. You should see the **Smart Exploration Planner** preview section

**Expected Result:**
- A card with:
  - Title: "Smart Exploration Planner"
  - Description: "Not just when to visit, but how to move inside the fort."
  - Three features listed with icons (🗺️ 🎯 ⚡)
  - A small SVG map preview on the right
  - Orange "Open Smart Exploration" button
  - Warm gradient background (#fff8f0)

**Visual Indicators:**
- ✅ Card has orange top border
- ✅ Floating purple badge says "Click to explore"
- ✅ Button has orange gradient
- ✅ Hover on button makes it lift slightly

---

## Test Scenario 2: Opening Full-Page View

**Steps:**
1. From the preview section (Test 1)
2. Click the **"Open Smart Exploration"** button

**Expected Result:**
- Full-screen dark overlay appears
- Three-panel layout visible:
  - **Left**: Dark panel with controls
  - **Center**: Light panel with fort map
  - **Right**: Dark panel with visit plan
- Header shows "Shivneri Fort – Smart Exploration Map"
- Close button (✕) in top-right corner

**Visual Indicators:**
- ✅ Background is dark brown (#2c1810)
- ✅ Map panel has light beige background (#fdf6e3)
- ✅ You can see fort outline with colored dots
- ✅ Visit plan shows numbered sequence on right

---

## Test Scenario 3: Default Path Computation

**What Happens Automatically:**
- When full-page view opens, it auto-computes with defaults:
  - Time: 1 hour
  - Energy: Medium

**Check These Elements:**

### Left Panel
- ✅ "1 hour" button is highlighted (orange)
- ✅ "Medium" radio button is selected (purple)
- ✅ "Compute Optimal Path" button is green

### Center Panel
- ✅ Fort map shows:
  - Beige elliptical fort outline
  - Green circle = Main Entrance Gate (start)
  - Orange circles = High importance locations
  - Tan circles = Regular locations
  - Dashed orange line connecting visited nodes
  - Small orange arrows showing direction
- ✅ Legend in bottom-left shows what colors mean

### Right Panel
- ✅ "Optimized Visit Plan" header in yellow
- ✅ Stats showing:
  - Total time: ~58 minutes
  - Spots covered: 4 locations
- ✅ Visit Sequence with numbered cards (1, 2, 3, 4)
- ✅ Each card shows:
  - Location name
  - Description
  - Time badge (⏱️ X min)
  - Importance badge (⭐ X/10)
  - Walk time badge (🚶 X min walk) - except for first location
- ✅ Yellow note box explaining what was excluded
- ✅ "Other Feasible Routes" section (greyed out)

---

## Test Scenario 4: Changing Time Settings

**Steps:**
1. In the full-page view
2. Click different time buttons:
   - **30 minutes**
   - **2 hours**
   - **3+ hours**
3. After each click, click **"Compute Optimal Path"**

**Expected Results:**

| Time Setting | Expected Behavior |
|--------------|-------------------|
| 30 minutes   | Fewer locations (2-3), quickest route |
| 1 hour       | Moderate route (4 locations) - DEFAULT |
| 2 hours      | More locations (5-6), comprehensive route |
| 3+ hours     | All accessible locations |

**Visual Indicators:**
- ✅ Selected time button turns orange
- ✅ Button shows spinner while computing
- ✅ Map updates with new route
- ✅ Visit sequence refreshes
- ✅ Stats update (time used, spots covered)

---

## Test Scenario 5: Changing Energy Settings

**Steps:**
1. In the full-page view
2. Select different energy levels:
   - **Low** (Easy routes only)
   - **Medium** (Moderate difficulty) - DEFAULT
   - **High** (All routes accessible)
3. Click **"Compute Optimal Path"** after each change

**Expected Results:**

| Energy Level | Expected Behavior |
|--------------|-------------------|
| Low          | Excludes strenuous locations (effortLevel > 2) |
| Medium       | Includes moderate-hard locations (effortLevel ≤ 3) |
| High         | All locations accessible (effortLevel ≤ 5) |

**Visual Indicators:**
- ✅ Selected energy option has purple gradient
- ✅ Radio button is filled
- ✅ Map shows only feasible locations
- ✅ Explanation note mentions energy-based exclusions

---

## Test Scenario 6: Map Visualization

**Check These Details on the Center Panel Map:**

### Fort Terrain
- ✅ Large beige ellipse (fort outline)
- ✅ Slightly darker ellipse inside (terrain depth)

### Location Markers
- ✅ **Green circle** (left side): Main Entrance Gate
- ✅ **Orange circle** (center-top): Shiv Janmabhoomi (most important)
- ✅ Other circles positioned across the map
- ✅ Location names appear above each circle

### Route Visualization
- ✅ **Dashed orange line** connects visited locations in sequence
- ✅ Line starts at green circle (entrance)
- ✅ **Small orange circles with arrows** (→) show direction
- ✅ Unvisited locations have faded/greyed appearance

### Legend (Bottom-Left)
- ✅ Green dot: "Start/Entrance"
- ✅ Orange dot: "High Importance"
- ✅ Tan dot: "Other Locations"
- ✅ Dashed line: "Optimized Route"

---

## Test Scenario 7: Visit Sequence Details

**Examine Each Numbered Card on Right Panel:**

### Card Structure
Each location card should show:
1. **Circle with number** (1, 2, 3...) - Orange gradient
2. **Location name** (white, bold) - e.g., "Main Entrance Gate"
3. **Description** (grey, smaller) - e.g., "Massive entrance to the fort"
4. **Badges row**:
   - ⏱️ Visit time (e.g., "8 min")
   - ⭐ Importance score (e.g., "7/10")
   - 🚶 Walk time to reach (e.g., "5 min walk") - not shown for first location

### Expected Sequence (1 hour, medium energy)
1. **Main Entrance Gate** (8 min, 7/10)
2. **Shiv Janmabhoomi** (15 min, 10/10) - 5 min walk
3. **Badami Talav** (10 min, 6/10) - 8 min walk
4. **Viewpoint / Bastion** (12 min, 5/10) - 10 min walk

**Total time**: ~58 minutes (within 60-minute constraint)

---

## Test Scenario 8: Optimization Note

**Check the Yellow Note Box:**

**Should say something like:**
> 💡 **Smart Optimization:**  
> Temple Area, Ammunition Storage excluded to stay within 60 minute time constraint.

**Meaning:**
- The algorithm intentionally skipped some locations
- Reason: Staying within the time limit
- This shows intelligent path planning

---

## Test Scenario 9: Closing the View

**Steps:**
1. Click the **"Close"** button in the top-right header
2. OR press **Escape** key (if implemented)

**Expected Result:**
- ✅ Full-page view disappears
- ✅ Returns to the regular PastPort page
- ✅ Scroll position should be near the preview section

---

## Test Scenario 10: Responsive Design

**Desktop (>1200px):**
- ✅ Three columns clearly visible side-by-side
- ✅ Map is large and centered
- ✅ No horizontal scrolling needed

**Tablet (900-1200px):**
- ✅ Narrower left/right panels
- ✅ Map still comfortably visible
- ✅ All controls accessible

**Mobile (<900px):**
- ✅ Panels stack vertically
- ✅ Controls in horizontal scrollable section at top
- ✅ Map takes full width
- ✅ Visit plan below (max 400px, scrollable)

**Test by:** Resize browser window or use DevTools device emulation

---

## 🐛 Common Issues & Fixes

### Issue 1: Preview Section Not Showing
**Possible Causes:**
- Not scrolled far enough down
- `selectedFort` is null (no fort selected)
- Component import failed

**Debug:**
- Open browser console (F12)
- Check for error messages
- Verify fort is selected (click a fort card)

### Issue 2: Full-Page View Not Opening
**Possible Causes:**
- Button click not working
- State not updating (`showSmartExploration`)
- Component render failed

**Debug:**
- Check console for errors
- Add `console.log()` in button onClick
- Verify imports in PastPort.jsx

### Issue 3: Map Not Rendering
**Possible Causes:**
- SVG viewBox incorrect
- Node coordinates missing
- fortGraphData not imported

**Debug:**
- Inspect element in DevTools
- Check if SVG is in DOM
- Verify fortGraphData.js exports

### Issue 4: Algorithm Not Computing
**Possible Causes:**
- pathOptimizer import failed
- Fort ID mismatch
- Empty graph data

**Debug:**
- Run test-smart-exploration.js
- Check if `computeOptimalPath` function exists
- Verify fort ID matches data (shivneri)

### Issue 5: Styles Not Applied
**Possible Causes:**
- CSS file not imported
- Class names mismatch
- CSS specificity conflict

**Debug:**
- Check if CSS files exist
- Verify import statements
- Inspect element to see which styles apply
- Check for CSS errors in console

---

## ✅ Success Checklist

Before marking as complete, verify:

- [ ] Preview section appears after itinerary
- [ ] Preview has orange button and SVG map
- [ ] Clicking button opens full-page view
- [ ] Full-page view has 3-panel dark theme layout
- [ ] Default computation happens automatically
- [ ] Time selector buttons work (30min, 1hr, 2hrs, 3+hrs)
- [ ] Energy selector works (Low, Medium, High)
- [ ] Compute button triggers new calculation
- [ ] Map shows fort outline and location dots
- [ ] Route is visualized with dashed orange line
- [ ] Visit sequence shows numbered cards
- [ ] Each card has name, description, badges
- [ ] Stats show correct time and location count
- [ ] Optimization note explains exclusions
- [ ] Close button returns to main page
- [ ] Responsive design works on mobile
- [ ] No console errors
- [ ] Smooth animations throughout

---

## 📝 Console Commands for Debugging

```javascript
// Check if components are loaded
console.log('SmartExplorationPreview:', SmartExplorationPreview);
console.log('SmartExplorationPage:', SmartExplorationPage);

// Check fort data
import { fortGraphs } from './src/data/fortGraphData.js';
console.log('Fort Data:', fortGraphs.shivneri);

// Test algorithm
import { computeOptimalPath } from './src/utils/pathOptimizer.js';
const result = computeOptimalPath(fortGraphs.shivneri, 60, 'medium');
console.log('Path Result:', result);

// Check state
// (in React DevTools, select PastPort component)
// Look for: showSmartExploration, selectedFort
```

---

**Happy Testing! 🎉**

If everything works as described above, the Smart Exploration Planner is successfully implemented!
