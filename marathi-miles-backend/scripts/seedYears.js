import mongoose from "mongoose";
import dotenv from "dotenv";
import { maharashtraHistoricalEvents } from "../data/historicalData.js";
import Year from "../models/Year.js";

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);

// Clear old years
await Year.deleteMany({});

// Insert all years
const years = maharashtraHistoricalEvents.map(item => ({
  year: item.year,
  era: item.era
}));

await Year.insertMany(years);

console.log("✅ Years imported successfully");
process.exit();
