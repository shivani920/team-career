// routes/csv.js
const express = require("express");
const router = express.Router();
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const Student = require("../models/Student");
const Interview = require("../models/Interview");
const Result = require("../models/Result");

router.get("/export", async (req, res) => {
  try {
    const students = await Student.find();
    const interviews = await Interview.find();
    const results = await Result.find();

    const csvWriter = createCsvWriter({
      path: "exported_data.csv",
      header: [
        "Student id",
        "Student name",
        "Student college",
        "Student status",
        "DSA Final Score",
        "WebD Final Score",
        "React Final Score",
        "Interview date",
        "Interview company",
        "Interview student result",
      ],
    });

    const records = []; // Add your data here

    await csvWriter.writeRecords(records);
    res.attachment("exported_data.csv");
    res.send("CSV exported successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
