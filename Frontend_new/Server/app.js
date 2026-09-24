const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1/IIITLU", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ Couldn't connect to MongoDB", err));

// Import Routes
const complaintRoutes = require("./Routes/complaint");

// Use Routes with a base path
app.use("/api/complaints", complaintRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
