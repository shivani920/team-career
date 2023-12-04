const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Result = require("../models/Result");

// List all results
router.get("/", async (req, res) => {
  try {
    // ... your existing code for listing results
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Form to add a new result
router.get("/add", (req, res) => {
  res.render("add-result");
});

// Add a new result
router.post("/add", async (req, res) => {
  try {
    const { studentId, company, status } = req.body;

    // Validate studentId as a valid ObjectId
    const isValidObjectId = mongoose.Types.ObjectId.isValid(studentId);

    if (!isValidObjectId) {
      // Handle the case where the value is not a valid ObjectId
      console.error("Invalid studentId:", studentId);
      return res.status(400).send("Invalid studentId");
    }

    // Create a new result in the database
    const newResult = new Result({ student: studentId, company, status });
    await newResult.save();

    res.redirect("/results");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// View details of a specific result
router.get("/:id", async (req, res) => {
  try {
    // ... your existing code for viewing result details
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// ... (other result-related routes)

module.exports = router;
