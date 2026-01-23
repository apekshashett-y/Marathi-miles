import "dotenv/config";   // 👈 THIS IS THE KEY FIX

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import timelineRoutes from "./routes/timeline.routes.js";
import aiRoutes from "./routes/ai.routes.js";

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/timeline", timelineRoutes);
app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
  res.send("Marathi Miles Backend Running 🚀");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log(`Backend running on http://localhost:${PORT}`)
);
