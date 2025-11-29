import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import eventRouter from "./routes/eventRoute.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";
import cron from "node-cron";
import Event from "./Models/event.js";

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Define port
const PORT = process.env.PORT || 5000;

// --- Fix __dirname for ES Modules ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 📌 AUTO CREATE UPLOADS FOLDER
const uploadPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
  console.log("📁 'uploads' folder created automatically.");
}

// --- Middleware Setup ---
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json());

// Serve uploaded images statically
app.use("/uploads", express.static(uploadPath));

// --- Connect MongoDB ---
connectDB();

// --- API Routes ---
app.use("/api/auth", authRouter);
app.use("/api/event", eventRouter);
app.use("/api/booking", bookingRoutes);
app.use("/api/certificate", certificateRoutes);

// Root route
app.get("/", (req, res) => {
  res.status(200).send("✅ Evento EMS backend running successfully!");
});

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.error("❌ Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error. Please try again later.",
  });
});

// AUTO DELETE OLD EVENTS EVERY MIDNIGHT
cron.schedule("0 0 * * *", async () => {
  try {
    const now = new Date();
    const result = await Event.deleteMany({
      eventDate: { $lt: now },
    });

    console.log(`🗑️ Auto-deleted ${result.deletedCount} expired events`);
  } catch (error) {
    console.log("Cron Error:", error);
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on PORT: ${PORT}`);
});
