import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import eventRouter from "./routes/eventRoute.js";

dotenv.config();

const app = express();
const PORT = 5000;


// Middleware
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api",authRouter);
app.use("/event", eventRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on :${PORT}`);
});
