import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import Event from "../Models/event.js";
import Booking from "../Models/booking.js";
import User from "../Models/user.js";

// ---------------------- CERTIFICATE GENERATION ------------------------
export const generateCertificate = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const userId = req.id;

    // ✅ Event find
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // ✅ Booking check
    const booking = await Booking.findOne({ eventId, userId });
    if (!booking) {
      return res.status(403).json({
        success: false,
        message: "You are not registered for this event",
      });
    }

    // ✅ User details fetch (FOR NAME)
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ✅ Folder create if not exist
    const certDir = path.join("certificates");
    if (!fs.existsSync(certDir)) {
      fs.mkdirSync(certDir);
    }

    const filePath = path.join(certDir, `${userId}_${eventId}.pdf`);

    const doc = new PDFDocument({
      size: "A4",
      margin: 50,
    });

    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // ---------------------- DESIGN START ----------------------

    doc.fontSize(28).fillColor("#333").text("Certificate of Participation", {
      align: "center",
      underline: true,
    });

    doc.moveDown(2);

    doc
      .fontSize(18)
      .fillColor("#000")
      .text("This certificate is proudly presented to", { align: "center" });

    doc.moveDown();

    doc
      .fontSize(26)
      .fillColor("#1a73e8")
      .text(user.name.toUpperCase(), { align: "center", bold: true });

    doc.moveDown(2);

    doc
      .fontSize(16)
      .fillColor("#000")
      .text(`For successfully participating in the event "${event.title}".`, {
        align: "center",
      });

    doc.moveDown();

    doc
      .fontSize(14)
      .text(`Event Date: ${new Date(event.eventDate).toLocaleDateString()}`, {
        align: "center",
      });

    doc.text(`Location: ${event.location}`, { align: "center" });

    doc.moveDown(2);

    doc.fontSize(12).text("Thank you for being a part of this event!", {
      align: "center",
      italic: true,
    });

    // ---------------------- DESIGN END ----------------------

    doc.end();

    // ✅ Send file when completed
    stream.on("finish", () => {
      res.download(filePath, `${user.name}_certificate.pdf`);
    });
  } catch (error) {
    console.log("Certificate Error:", error);
    res.status(500).json({
      success: false,
      message: "Error generating certificate",
    });
  }
};

// ---------------------- CERTIFICATE STATUS ------------------------

export const checkCertificateStatus = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const userId = req.id;

    const event = await Event.findById(eventId);
    if (!event) return res.json({ eligible: false });

    const booking = await Booking.findOne({ eventId, userId });
    if (!booking) return res.json({ eligible: false });

    // ------------------ EVENT DATE + TIME COMBINE ------------------
    const eventDate = new Date(event.eventDate);

    // event.eventTime = "HH:mm"
    const [hours, minutes] = event.eventTime.split(":").map(Number);

    // eventDate ko event ke exact start time par set karo
    eventDate.setHours(hours);
    eventDate.setMinutes(minutes);
    eventDate.setSeconds(0);
    eventDate.setMilliseconds(0);

    // ---------- UNLOCK TIME = EVENT START TIME + DELAY ----------
    const unlockTime = new Date(
      eventDate.getTime() + (event.certificateDelay || 1) * 60000
    );

    const now = new Date();

    // Check eligibility
    if (now >= unlockTime) {
      return res.json({ eligible: true });
    }

    return res.json({ eligible: false });
  } catch (error) {
    console.log(error);
    return res.json({ eligible: false });
  }
};
