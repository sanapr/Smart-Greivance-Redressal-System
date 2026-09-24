const express = require("express");
const router = express.Router();
const Counter = require("../modles/counterModel.js"); // Import the model correctly

// Get the counter data
router.get("/count", async (req, res) => {
  try {
    const counterData = await Counter.findOne(); // Assuming you have only one counter document
    if (!counterData) return res.status(404).send("Counter not found");
    res.send(counterData);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update the counter
router.put("/count", async (req, res) => {
  try {
    const counterData = await Counter.findOne(); // Fetch the counter document
    if (!counterData) {
      return res.status(404).json({ error: "Counter not found" }); // Return JSON on error
    }

    counterData.LastModified = Date.now();
    counterData.count = req.body.count;

    await counterData.save(); // Save the updated counter document

    return res.json({ success: true, counter: counterData }); // Return JSON on success
  } catch (error) {
    return res.status(500).json({ error: "Error updating counter" }); // Return JSON on error
  }
});

module.exports = router;
