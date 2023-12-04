// routes/interviews.js
const express = require("express");
const router = express.Router();
const Interview = require("../models/Interview");
const Student = require("../models/Student");
const Batch = require("../models/Batch");


// List all interviews
router.get("/", async (req, res) => {
  try {
    const interviews = await Interview.find().populate("students");
    res.render("interviews", { interviews });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Form to create a new interview
router.get("/add", async (req, res) => {
  try {
    const students = await Student.find();
    res.render("add-interview", { students });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Create a new interview
router.post("/add", async (req, res) => {
  try {
    const { company, date, students } = req.body;

    // Create a new interview in the database
    const newInterview = new Interview({ company, date, students });
    await newInterview.save();

    // Update students with the new interview ID
    await Student.updateMany(
      { _id: { $in: students } },
      { $push: { interviews: newInterview._id } }
    );

    res.redirect("/interviews");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// View details of a specific interview
router.get("/:id", async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id).populate(
      "students"
    );
    if (!interview) {
      return res.status(404).send("Interview not found");
    }
    res.render("interview-details", { interview });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
