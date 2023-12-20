import { useState } from "react";
import TextBox from "./common/TextBox";
import Button from "./common/Button";
import "../assets/css/registerStudent.css";
import axios from "axios";
function RegisterStudent() {
  const [studentId, setStudentId] = useState();
  const [courseId, setCourseId] = useState("");
  const [message, setMessage] = useState("");

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
  const clearFields = () => {
    setStudentId("");
    setCourseId("");
  };
  return (
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
  );
}

export default RegisterStudent;
