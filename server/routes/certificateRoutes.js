import express from "express";
import {
  generateCertificate,
  checkCertificateStatus
} from "../controllers/certificateController.js";

import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// ✅ Generate certificate (after unlock time)
router.get(
  "/generate/:eventId",
  isAuthenticated,
  generateCertificate
);

// ✅ Check certificate unlock eligibility
router.get(
  "/status/:eventId",
  isAuthenticated,
  checkCertificateStatus
);

export default router;
