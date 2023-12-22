// Add a new course to the system
const addCourse = async (req, res) => {
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
};

// Find courses with no registered students
const courseWithNoStudent = async (req, res) => {
  try {
    const result = await req.conn.query(
      "SELECT * FROM courses LEFT JOIN registrations ON courses.id = registrations.course_id WHERE registrations.id IS NULL"
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Retrieve all courses from database
const allCourses = async (req, res) => {
  try {
    const result = await req.conn.query("SELECT * FROM courses");
    console.log(result);
    if (result.rowCount > 0) {
      res.json(result.rows);
    } else {
      res.status(500).json({ message: "No Courses!" });
    }
  } catch (error) {
    console.log(error);
  }
};

// Search course by its name
const searchCourse = async (req, res) => {
  const courseName = req.params.courseName;
  try {
    const result = await req.conn.query(
      "SELECT * FROM courses WHERE LOWER(courses.course_name)=LOWER($1)",
      [courseName]
    );
    console.log(result);
    if (result.rowCount > 0) {
      res.json(result.rows);
    } else {
      res.status(500).json({ message: "No Courses!" });
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = { addCourse, courseWithNoStudent, allCourses, searchCourse };
