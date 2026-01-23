// routes/ai.routes.js
import express from 'express';
import { explainEvent, chatAboutEvent } from '../controllers/ai.controller.js';

const router = express.Router();

// Existing route - Generate initial explanation
router.post('/explain-event', explainEvent);

// NEW route - Chat about the event
router.post('/chat', chatAboutEvent);

export default router;