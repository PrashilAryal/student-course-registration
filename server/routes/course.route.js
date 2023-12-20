const express = require("express");
const router = express.Router();

// Add a new course to the system
router.post("/", async (req, res) => {
  try {
    const {
      course_name,
      course_credit,
      instructor_name,
      writer_name,
      course_publication,
      publication_year,
    } = req.body;
    const result = await req.conn.query(
      "INSERT INTO courses (course_name, course_credit, instructor_name, writer_name, course_publication, publication_year) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        course_name,
        course_credit,
        instructor_name,
        writer_name,
        course_publication,
        publication_year,
      ]
    );

    res.json(result.rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      res.status(400).json({ message: "Course Already Added" });
    } else {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
});

// Find courses with no registered students
router.get("/no-students", async (req, res) => {
  try {
    const result = await req.conn.query(
      "SELECT * FROM courses LEFT JOIN registrations ON courses.id = registrations.course_id WHERE registrations.id IS NULL"
      // "SELECT courses.course_name, courses.instructor_name FROM courses LEFT JOIN registrations ON courses.id = registrations.course_id WHERE registrations.id IS NULL"
    );

    console.log(result.rows);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
