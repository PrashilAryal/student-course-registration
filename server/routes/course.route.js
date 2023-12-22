const express = require("express");
const router = express.Router();
const {
  addCourse,
  courseWithNoStudent,
  allCourses,
  searchCourse,
} = require("../controller/course");

// Add a new course to the system
router.post("/", addCourse);

// Find courses with no registered students
router.get("/no-students", courseWithNoStudent);

// Extra Features
// Read all the courses from the database
router.get("/all-courses", allCourses);

// Search course by name
router.get("/search/:courseName", searchCourse);
// End of Extra Features

module.exports = router;
