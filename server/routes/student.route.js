const express = require("express");
const router = express.Router();
const {
  addStudent,
  enrolledStudents,
  studentCourseDetail,
  allStudents,
  searchStudent,
} = require("../controller/student");

// Insert a new student into the database
router.post("/", addStudent);

// Extra Features
// Read all the students from database
router.get("/all-students", allStudents);

// Search student by ID
router.get("/search/:studentId", searchStudent);
// End of Extra Features

// Retrieve a list of all students enrolled in a specific course
router.get("/:courseName", enrolledStudents);

// Get the details of a student's course registrations, including the course name and instructor
router.get("/registrations/:studentId", studentCourseDetail);

module.exports = router;
