# Mood Recommendation Backend

Backend API for mood-based travel recommendations in Maharashtra.

## Features

- Mood-based place recommendations
- Distance calculation from user location
- Logical itinerary planning
- Comprehensive Maharashtra tourist places data

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

## API Endpoints

### Health Check
- `GET /api/health` - Check if server is running

### Recommendations
- `POST /api/recommendations/mood-based` - Get mood-based recommendations
  - Body: `{ mood, userProfile: { ageGroup, travelGroup, tripType, duration, budget, interests }, userLocation: { lat, lng } }`

### Places
- `GET /api/places` - Get all places
- `GET /api/places/:id` - Get specific place
- `GET /api/places/mood/:mood` - Get places by mood

## Data

Tourist places data is stored in `data/maharashtraPlaces.json`
