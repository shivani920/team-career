// routes/students.js
const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// List all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.render("students", { students });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Form to add a new student
router.get("/add", (req, res) => {
  res.render("add-student");
});

// Add a new student
router.post("/add", async (req, res) => {
  try {
    const { name, college, status, dsaScore, webDScore, reactScore } = req.body;

    // Create a new student in the database
    const newStudent = new Student({
      name,
      college,
      status,
      dsaScore,
      webDScore,
      reactScore,
    });
    await newStudent.save();

    res.redirect("/students");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// View details of a specific student
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).send("Student not found");
    }
    res.render("student-details", { student });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// ... (other student-related routes)

module.exports = router;
