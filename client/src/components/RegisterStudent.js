import { useState } from "react";
import TextBox from "./common/TextBox";
import Button from "./common/Button";
import axios from "axios";
function RegisterStudent() {
  const [studentId, setStudentId] = useState();
  const [courseId, setCourseId] = useState("");

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
        } else {
          console.log("Student Registered successfully");
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    } else {
      console.log("Please fill the form");
    }
  };
  return (
    <div>
      <TextBox
        type={"text"}
        placeholder={"Student Id"}
        onTextChange={handleTextStudentIdChange}
      ></TextBox>

      <TextBox
        type={"text"}
        placeholder={"Course Id"}
        onTextChange={handleTextCourseIdChange}
      ></TextBox>
      <Button onClick={registerStudent} children={"Register"}></Button>
    </div>
  );
}

export default RegisterStudent;
