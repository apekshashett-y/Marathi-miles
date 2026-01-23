import mongoose from "mongoose";
import dotenv from "dotenv";
import { maharashtraHistoricalEvents } from "../data/historicalData.js";
import Event from "../models/Event.js";


dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const flatEvents = maharashtraHistoricalEvents.flatMap(yearBlock =>
  yearBlock.events.map(event => ({
    eventId: event.id,
    title: event.title,
    date: event.date,
    shortDescription: event.shortDescription,
    fullDescription: event.fullDescription,
    category: event.category,
    tags: event.tags,
    location: event.location,
    imageUrl: event.imageUrl,
    year: yearBlock.year,
    era: yearBlock.era
  }))
);

await Event.insertMany(flatEvents);

console.log("✅ Events imported successfully");
process.exit();
