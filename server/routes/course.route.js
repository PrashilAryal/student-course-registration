const express = require("express");
const router = express.Router();

// Add a new course to the system
router.post("/", async (req, res) => {
  try {
    const { course_name, instructor, course_publication, credit } = req.body;
    const result = await req.conn.query(
      "INSERT INTO courses (course_name, instructor, course_publication, credit) VALUES ($1, $2, $3, $4) RETURNING *",
      [course_name, instructor, course_publication, credit]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Find courses with no registered students
router.get("/no-students", async (req, res) => {
  try {
    const result = await req.conn.query(
      "SELECT courses.course_name, courses.instructor FROM courses LEFT JOIN registrations ON courses.id = registrations.course_id WHERE registrations.id IS NULL"
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
