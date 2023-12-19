const express = require("express");
const router = express.Router();

// Register a student for a course
router.post("/", async (req, res) => {
  try {
    const { student_id, course_id } = req.body;
    const result = await req.conn.query(
      "INSERT INTO registrations (student_id, course_id) VALUES ($1, $2) RETURNING *",
      [student_id, course_id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      res.status(400).json({ message: "Already registered" });
    } else {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
});

// Remove a student from a course
router.delete("/:studentId/:courseId", async (req, res) => {
  try {
    const { studentId, courseId } = req.params;
    const result = await req.conn.query(
      "DELETE FROM registrations WHERE student_id = $1 AND course_id = $2",
      [studentId, courseId]
    );

    if (result.rowCount > 0) {
      res.json({ message: "Student removed from the course." });
    } else {
      res.json({ message: "No matching registration found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
