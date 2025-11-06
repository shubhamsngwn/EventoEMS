import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import eventRouter from "./routes/eventRoute.js";
import bookingRoutes from "./routes/bookingRoutes.js";   // ✅ BOOKING ROUTES

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Define port
const PORT = process.env.PORT || 5000;

// --- Fix __dirname for ES Modules ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Middleware Setup ---
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"], 
    credentials: true,
  })
);

app.use(express.json());

// ✅ Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// --- Connect MongoDB ---
connectDB();

// --- API Routes ---
app.use("/api/auth", authRouter);
app.use("/api/event", eventRouter);
app.use("/api/booking", bookingRoutes);   // ✅ BOOKING ROUTES ADDED

// --- Root route for testing ---
app.get("/", (req, res) => {
  res.status(200).send("✅ Evento EMS backend running successfully!");
});

// --- Global Error Handler ---
app.use((err, req, res, next) => {
  console.error("❌ Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error. Please try again later.",
  });
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
