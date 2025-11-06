import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { bookEvent } from "../controllers/bookingController.js";

const router = express.Router();

router.post("/book", isAuthenticated, bookEvent);

export default router;
