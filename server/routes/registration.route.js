const express = require("express");
const router = express.Router();
const {
  registerStudentToCourse,
  removeStudentFromCourse,
} = require("../controller/registrations");

// Register a student for a course
router.post("/", registerStudentToCourse);

// Remove a student from a course
router.delete("/:studentId/:courseId", registerStudentToCourse);

module.exports = router;
