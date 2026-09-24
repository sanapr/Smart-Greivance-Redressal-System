const express = require("express");
const Complaint = require("../modles/complaintmodel"); // Ensure the correct path to the model
const router = express.Router();

// 📌 POST: Create a new complaint
router.post("/create", async (req, res) => {
  try {
    // Log incoming request data for debugging
    console.log("Incoming request body:", req.body);

    // Destructure the request body
    const { name, description, email, phoneNo, aadharNumber, city, date } =
      req.body;

    // Validate that all fields are provided
    if (!name || !description || !email || !phoneNo || !aadharNumber || !city) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new complaint instance
    const newComplaint = new Complaint({
      name,
      description,
      email,
      phoneNo,
      aadharNumber,
      city,
      date,
    });

    // Save the complaint to the database
    const savedComplaint = await newComplaint.save();

    // Send success response
    res.status(201).json({
      message: "Complaint registered successfully",
      complaint: savedComplaint,
    });
  } catch (error) {
    // Log the error for debugging
    console.error("Error during complaint creation:", error);

    // Send error response
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

// 📌 GET: Fetch all complaints
router.get("/", async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// 📌 GET: Fetch a single complaint by ID
router.get("/:id", async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    res.status(200).json(complaint);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// 📌 PUT: Update a complaint by ID
// router.put("/:id", async (req, res) => {
//   try {
//     const updatedComplaint = await Complaint.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     if (!updatedComplaint) {
//       return res.status(404).json({ message: "Complaint not found" });
//     }
//     res
//       .status(200)
//       .json({
//         message: "Complaint updated successfully",
//         complaint: updatedComplaint,
//       });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// 📌 DELETE: Delete a complaint by ID
// router.delete("/:id", async (req, res) => {
//   try {
//     const deletedComplaint = await Complaint.findByIdAndDelete(req.params.id);
//     if (!deletedComplaint) {
//       return res.status(404).json({ message: "Complaint not found" });
//     }
//     res.status(200).json({ message: "Complaint deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

module.exports = router;
