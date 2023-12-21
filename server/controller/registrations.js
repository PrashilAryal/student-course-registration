// Register a student for a course
const registerStudentToCourse = async (req, res) => {
  try {
    const { student_id, course_id } = req.body;
    const result = await req.conn.query(
      "INSERT INTO registrations (student_id, course_id) VALUES ($1, $2) RETURNING *",
      [student_id, course_id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    if (error.code === "23505") {
      res.status(400).json({ message: "Already registered" });
    } else if (error.code === "23503") {
      res.status(400).json({ message: "Record Not Found" });
    } else if (error.code === "23502") {
      console.error(error);
      res.status(400).json({ message: "IDs must be an integer value!" });
    } else {
      res.status(500).json({ message: "Internal Server Error!" });
    }
  }
};

// Remove a student from a course
const removeStudentFromCourse = async (req, res) => {
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
};

module.exports = { registerStudentToCourse, removeStudentFromCourse };
