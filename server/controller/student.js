// Insert a new student into the database
const addStudent = async (req, res) => {
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
};

// Retrieve a list of all students enrolled in a specific course
const enrolledStudents = async (req, res) => {
  try {
    const courseName = req.params.courseName;
    console.log(courseName);
    const result = await req.conn.query(
      "SELECT * FROM students as s JOIN registrations as r ON s.id = r.student_id JOIN courses as c ON r.course_id = c.id WHERE LOWER(c.course_name)=LOWER($1)",
      [courseName]
    );
    if (result.rowCount > 0) {
      console.log(result.rows);
      res.json(result.rows);
    } else {
      console.log("No data found");
      res.send("No Record Found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

// Get the details of a student's course registrations, including the course name and instructor
const studentCourseDetail = async (req, res) => {
  try {
    const studentId = req.params.studentId;

    const result = await req.conn.query(
      "SELECT students.*, courses.* FROM students JOIN registrations ON students.id = registrations.student_id JOIN courses ON registrations.course_id =courses.id WHERE students.id = $1",
      [studentId]
    );
    if (result.rowCount > 0) {
      console.log(result.rows);
      res.json(result.rows);
    } else {
      console.log("No Data found");
      res.status(500).json({ message: "Record not found!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Retrieve all the students from database
const allStudents = async (req, res) => {
  try {
    const result = await req.conn.query("SELECT * FROM students");
    console.log(result);
    if (result.rowCount > 0) {
      res.json(result.rows);
    } else {
      res.status(500).json({ message: "No Students!" });
    }
  } catch (error) {
    console.log(error);
  }
};

// Search student by their ID
const searchStudent = async (req, res) => {
  const studentId = parseInt(req.params.studentId);
  try {
    const result = await req.conn.query(
      "SELECT * FROM students WHERE students.id=$1",
      [studentId]
    );
    console.log(result);
    if (result.rowCount > 0) {
      res.json(result.rows);
    } else {
      res.status(500).json({ message: "No Courses!" });
    }
  } catch (error) {
    console.log(error);
    console.log("hi");
  }
};

module.exports = {
  addStudent,
  enrolledStudents,
  studentCourseDetail,
  allStudents,
  searchStudent,
};
