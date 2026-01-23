import mongoose from "mongoose";

const yearSchema = new mongoose.Schema({
  year: Number,
  era: String
});

export default mongoose.model("Year", yearSchema);
