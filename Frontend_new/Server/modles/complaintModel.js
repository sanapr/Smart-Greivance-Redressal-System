const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  phoneNo: {
    type: String,
    required: true,
    trim: true,
    match: /^[0-9]{10}$/, // Ensures a 10-digit number
  },
  aadharNumber: {
    type: String,
    required: true,
    trim: true,
    match: /^[0-9]{12}$/, // Ensures a 12-digit number for Aadhar
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now, // Defaults to the current date
  },
});

const Complaint = mongoose.model("Complaint", complaintSchema);

module.exports = Complaint;
