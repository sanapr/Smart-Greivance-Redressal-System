const mongoose = require("mongoose");

// Define the counter schema
const counterSchema = new mongoose.Schema({
  count: {
    type: Number,
    required: true,
    default: 0,
  },
  LastModified: {
    type: Date,
    default: Date.now,
  },
});

// Create a model based on the schema
const Counter = mongoose.model("Counter", counterSchema);

module.exports = Counter;
