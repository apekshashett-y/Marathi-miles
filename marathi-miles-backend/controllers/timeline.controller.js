import Year from "../models/Year.js";
import Event from "../models/Event.js";

// GET /api/timeline/years
export const getYears = async (req, res) => {
  try {
    const years = await Year.find().sort({ year: 1 });
    res.json(years);
  } catch (err) {
    res.status(500).json({ message: "Error fetching years" });
  }
};

// GET /api/timeline/:year
export const getEventsByYear = async (req, res) => {
  try {
    const year = parseInt(req.params.year);
    const events = await Event.find({ year });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Error fetching events" });
  }
};

// GET /api/timeline/search?q=keyword
export const searchEvents = async (req, res) => {
  try {
    const query = req.query.q;
    const events = await Event.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { location: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } }
      ]
    });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Search failed" });
  }
};
