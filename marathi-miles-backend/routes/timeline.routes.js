import express from "express";
import {
  getYears,
  getEventsByYear,
  searchEvents
} from "../controllers/timeline.controller.js";

const router = express.Router();

router.get("/years", getYears);
router.get("/:year", getEventsByYear);
router.get("/search", searchEvents);

export default router;
