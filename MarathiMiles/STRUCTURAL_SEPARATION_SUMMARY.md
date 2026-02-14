# ✅ Route Engine Structural Separation - Refactor V11

## 🎯 Goal
Strictly separate strategy behaviors by removing the shared greedy loop and implementing distinct sorting algorithms and hard constraints for each strategy.

## 🛠️ Key Architectural Changes

### 1. Distinct Candidate Selection Logic
Instead of a single score formula, we now use three completely different candidate evaluation methods:

*   **`balanced`**: Sorts by **Efficiency Score** (`Importance / (WalkTime + VisitTime)`).
    *   *Result:* Prioritizes high-value locations that are quick to reach and visit.
*   **`max_culture`**: Sorts by **Raw Importance**.
    *   *Result:* Will accept long walks (e.g., Amberkhana, 28 min walk) if the destination is culturally significant.
*   **`min_walking`**: Sorts by **Walk Time (Ascending)**, then Importance.
    *   *Result:*Strictly prioritizes the closest possible stop.

### 2. Hard Constraints Implementation
*   **Min Walking**: Added a strict **Walking Budget** (`TimeBudget * 0.35`).
    *   *Behavior:* The route stops adding nodes immediately if the next stop would exceed this budget, even if time remains.
    *   *Verification:* In 120 min test, stops at **41.0 min** cumulative walk (Limit 42.0 min).

### 3. Removal of Adaptive/Objective Logic
*   Removed all adaptive boosts and "objective improvement" thresholds.
*   Routing is now purely deterministic based on the strategy rules and constraints.

## 📊 Verified Behavioral Differences (120 Min Scenario)

| Strategy | Route Characteristics | Key Outcome |
|----------|-----------------------|-------------|
| **Balanced** | 7 Stops | Visits efficient nodes like **Kadelot Point** and **Fort Bastions**. |
| **Max Culture** | 6 Stops | Willing to make the long trek to **Amberkhana** (28 min walk) for its high value. |
| **Min Walking** | 6 Stops | **Stops early** at 41 min walk. Avoids Fort Bastions and Amberkhana. |

## 🚀 Status: COMPLETE

The `routeEngine.js` has been completely rewritten.
*   Code is cleaner and strictly typed by strategy.
*   Behaviors are visibly different.
*   Time budget controls the route length naturally.

**Example Log Output:**
```
[STRATEGY MODE] Min Walking → Distance-priority selection (Local Clusters)
[CONSTRAINT] Max Walking Allowed: 42.0 min
[STEP 1] Maha Darwaja → Shiv Janmasthan
   Walk: 6 min (Cumulative: 6.0 / limit 42.0)
...
⏹️ No more reachable candidates within constraints.
```
