const express = require("express");
const router = express.Router();

// Insert a new student into the database
router.post("/", async (req, res) => {
  try {
    const { first_name, last_name, phone_number } = req.body;
    const result = await req.conn.query(
      "INSERT INTO students (first_name, last_name, phone_number) VALUES ($1, $2, $3) RETURNING *",
      [first_name, last_name, phone_number]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error:");
  }
});

// Retrieve a list of all students enrolled in a specific course
router.get("/:courseName", async (req, res) => {
  try {
    const courseName = req.params.courseName;
    console.log(courseName);
    const result = await req.conn.query(
      "SELECT * FROM students JOIN registrations ON students.id = registrations.student_id JOIN courses ON registrations.course_id = courses.id WHERE courses.course_name=$1",
      // "SELECT students.first_name, students.last_name FROM students JOIN registrations ON students.id = registrations.student_id JOIN courses ON registrations.course_id = courses.id WHERE LOWER(courses.course_name)=LOWER($1)",
      [courseName]
    );
    if (result.rowCount > 0) {
      console.log(result.rows);
      res.json(result.rows);
      // res.json({ message: "Student Removed from the course" });
    } else {
      console.log("No data found");
      // res.json({ message: "No record found" });
      res.send("No Record Found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// Get the details of a student's course registrations, including the course name and instructor
router.get("/registrations/:studentId", async (req, res) => {
  try {
    const studentId = req.params.studentId;

    // const result = await req.conn.query(
    //   "SELECT courses.course_name, courses.instructor FROM courses JOIN registrations ON courses.id = registrations.course_id WHERE registrations.student_id=$1",
    //   [studentId]
    // );
    const result = await req.conn.query(
      "SELECT students.*, courses.* FROM students JOIN registrations ON students.id = registrations.student_id JOIN courses ON registrations.course_id = courses.id WHERE students.id = $1",
      [studentId]
    );
    if (result.rowCount > 0) {
      console.log(result.rows);
      res.json(result.rows);
    } else {
      console.log("No Data found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
