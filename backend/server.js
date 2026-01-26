const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001; // Changed from 5000 to 3001

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// Import routes
const recommendationRoutes = require('./routes/recommendations');
const placesRoutes = require('./routes/places');

// Routes
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/places', placesRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Marathi Miles Backend API',
    version: '1.0.0',
    description: 'Mood-based travel recommendations for Maharashtra',
    endpoints: {
      health: 'GET /api/health',
      places: {
        all: 'GET /api/places',
        byId: 'GET /api/places/:id',
        byMood: 'GET /api/places/mood/:mood'
      },
      recommendations: {
        moodBased: 'POST /api/recommendations/mood-based',
        calculateDistance: 'POST /api/recommendations/calculate-distance'
      }
    },
    documentation: 'Check individual route files for detailed API documentation',
    status: 'Server is running successfully'
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Mood Recommendation Backend is running' });
});
// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🌐 Also accessible on: http://0.0.0.0:${PORT}`);
  console.log(`🔍 Server listening on all interfaces`);
});

server.on('error', (err) => {
  console.error('❌ Server error:', err);
});

server.on('listening', () => {
  console.log('✅ Server is actually listening and ready to accept connections');
});

// Error handling
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});
