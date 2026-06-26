# 🗄️ Supabase Migration - Setup Guide

## Step 1: Create Tables (Required Once)

You need to run the schema SQL in your Supabase Dashboard:

1. **Open the SQL Editor:**  
   👉 [https://supabase.com/dashboard/project/ccmxfwzphowbzsexebua/sql/new](https://supabase.com/dashboard/project/ccmxfwzphowbzsexebua/sql/new)

2. **Copy the schema SQL** from [`scripts/schema.sql`](./schema.sql)

3. **Paste & Click Run** → You should see "Success. No rows returned."

## Step 2: Seed Data

Once the tables exist, run the seeder:

```bash
node scripts/seedSupabase.js
```

This will automatically:
- ✅ Insert all 6 forts (Shivneri, Raigad, Sinhagad, Pratapgad, Lohagad, Rajgad)
- ✅ Insert Smart Exploration graph nodes & edges for Shivneri + Raigad
- ✅ Insert all travel destinations (happy, calm, stressed, excited moods)
- ✅ Insert historical events timeline

## Step 3: Verify

Run this to check all tables are populated:

```bash
node scripts/createTablesViaApi.js
```

## Architecture

```
Local JS Files        →  Supabase PostgreSQL
──────────────────────────────────────────────
fortData.js           →  forts
shivneriFortData.js   →  smart_exploration_nodes + edges (fort_id=1)
raigadFortData.js     →  smart_exploration_nodes + edges (fort_id=2)  
travelData.js         →  destinations
historicalData.js     →  historical_events
```

## Frontend (Already Updated)

The following components now fetch from Supabase with **static data as fallback**:

- `PastPort.jsx` → fetches `forts` from Supabase on mount
- `SmartExplorationV2.jsx` → fetches Shivneri graph on mount  
- `RaigadSmartExplorationV2.jsx` → fetches Raigad graph on mount

> **Note:** If Supabase is unreachable, all components automatically fall back to local static data — the app never breaks.

## Services Created

- `src/services/supabaseClient.js` — Supabase client initialization
- `src/services/supabaseService.js` — `fetchForts()`, `fetchSmartExplorationGraph()`, `fetchDestinations()`, `fetchHistoricalEvents()`
