import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  eventId: Number,
  title: String,
  date: String,
  shortDescription: String,
  fullDescription: String,
  category: String,
  tags: [String],
  location: String,
  imageUrl: String,
  year: Number,
  era: String
});

export default mongoose.model("Event", eventSchema);
