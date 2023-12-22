import { useEffect, useState } from "react";
import TextBox from "./common/TextBox";
import Button from "./common/Button";
import "../assets/css/registerStudent.css";
import axios from "axios";
function RegisterStudent() {
  const [studentId, setStudentId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [message, setMessage] = useState("");
  const [allStudents, setAllStudents] = useState([]);

  const handleTextStudentIdChange = (text) => {
    setStudentId(text);
  };

  const handleTextCourseIdChange = (text) => {
    setCourseId(text);
  };
  const registerStudent = async () => {
    if (studentId && courseId !== "") {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_URL}/registrations`,
          {
            student_id: parseInt(studentId),
            course_id: parseInt(courseId),
          }
        );
        if (response.status !== 200) {
          console.log("Error Registering: ", response);
          setMessage("Error while registering!");
        } else {
          console.log("Student Registered successfully");
          setMessage("Student Registered Successfully!");
          clearFields();
        }
      } catch (error) {
        console.log(error.response.data.message);
        setMessage(error.response.data.message);
      }
    } else {
      console.log("Please fill the form");
      setMessage("Please fill all the fields");
    }
  };
  const getStudents = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/students/all-students`
      );

      if (Array.isArray(response.data)) {
        setAllStudents(response.data);
        console.log(allStudents);
      } else {
        setAllStudents([]);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const clearFields = () => {
    setStudentId("");
    setCourseId("");
  };
  useEffect(() => {
    getStudents();
  }, [message]);
  return (
    <div className="modal__add__student">
      <div className="register__student__container">
        <div className="register__student__container__item">
          <label>Student ID</label>
          <TextBox
            type={"text"}
            placeholder={"Student Id"}
            onTextChange={handleTextStudentIdChange}
            value={studentId}
          ></TextBox>
        </div>
        <div className="register__student__container__item">
          <label>Course ID</label>
          <TextBox
            type={"text"}
            placeholder={"Course Id"}
            onTextChange={handleTextCourseIdChange}
            value={courseId}
          ></TextBox>
        </div>
        <div className="register__student__container__item">
          <Button onClick={registerStudent} children={"Register"}></Button>
        </div>
        <p>{message}</p>
      </div>
      <div className="all__student__container">
        <h1>All Students</h1>
        <div className="all__student__container__title">
          <p>Name</p>
          <p>ID</p>
        </div>
        {allStudents?.map((student) => (
          <div key={student.id}>
            <p>
              {student.first_name} {student.last_name}
            </p>
            <p>{student.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RegisterStudent;
