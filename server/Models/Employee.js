// models/Employee.js
const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ["organizer", "attendee"],
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const EmployeeModel = mongoose.model("eventoems", EmployeeSchema);
module.exports = EmployeeModel;
