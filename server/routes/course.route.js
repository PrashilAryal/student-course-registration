const express = require("express");
const router = express.Router();
const { addCourse, courseWithNoStudent } = require("../controller/course");

// Add a new course to the system
router.post("/", addCourse);

// Find courses with no registered students
router.get("/no-students", courseWithNoStudent);

module.exports = router;
