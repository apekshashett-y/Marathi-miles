const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// GET /api/places - Get all places
router.get('/', (req, res) => {
  try {
    const placesPath = path.join(__dirname, '../data/maharashtraPlaces.json');
    const places = JSON.parse(fs.readFileSync(placesPath, 'utf8'));
    
    res.json({
      success: true,
      data: places,
      total: places.length
    });
  } catch (error) {
    console.error('❌ Error fetching places:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch places',
      error: error.message
    });
  }
});

// GET /api/places/:id - Get specific place
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const placesPath = path.join(__dirname, '../data/maharashtraPlaces.json');
    const places = JSON.parse(fs.readFileSync(placesPath, 'utf8'));
    
    const place = places.find(p => p.id === parseInt(id));
    
    if (!place) {
      return res.status(404).json({
        success: false,
        message: 'Place not found'
      });
    }

    res.json({
      success: true,
      data: place
    });
  } catch (error) {
    console.error('❌ Error fetching place:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch place',
      error: error.message
    });
  }
});

// GET /api/places/mood/:mood - Get places by mood
router.get('/mood/:mood', (req, res) => {
  try {
    const { mood } = req.params;
    const placesPath = path.join(__dirname, '../data/maharashtraPlaces.json');
    const places = JSON.parse(fs.readFileSync(placesPath, 'utf8'));
    
    const filteredPlaces = places.filter(place => 
      place.moodTags && place.moodTags.includes(mood.toLowerCase())
    );
    
    res.json({
      success: true,
      data: filteredPlaces,
      total: filteredPlaces.length
    });
  } catch (error) {
    console.error('❌ Error fetching places by mood:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch places',
      error: error.message
    });
  }
});

module.exports = router;
