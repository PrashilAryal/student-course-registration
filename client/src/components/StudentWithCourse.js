import { useState } from "react";
import CourseItem from "./common/CourseItem";
import TextBox from "./common/TextBox";
import Button from "./common/Button";
import "../assets/css/studentWithCourse.css";
import axios from "axios";

function StudentWithCourse() {
  const [studentId, setStudentId] = useState();
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("");

  // const clearFields = () => {
  //   setStudentId("");
  // };

  const getCourses = async () => {
    if (studentId === "") {
      setMessage("Please enter student ID!");
    } else if (isNaN(parseInt(studentId))) {
      setMessage("ID must be an integer value!");
    } else {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_URL}/students/registrations/${parseInt(
            studentId
          )}`
        );
        if (Array.isArray(response.data)) {
          setCourses(response.data);
          console.log(response.data);
          setMessage("");
        } else {
          setCourses([]);
          console.log("Internal server error");
          setMessage("Internal server error!");
        }
      } catch (error) {
        console.log("Record not found");
        setMessage("Record not found!");
        setCourses([]);
      }
    }
  };
  const handleTextStudentIdChange = (text) => {
    setStudentId(text);
  };
  return (
    <div className="search__student__course">
      <div className="student__search__box">
        <label className="student__search__box__item">Search</label>
        <div className="student__search__box__item text-box">
          <TextBox
            type={"text"}
            placeholder={"Student ID"}
            onTextChange={handleTextStudentIdChange}
            value={studentId}
          ></TextBox>
        </div>
        <div className="student__search__box__item">
          <Button onClick={getCourses} children={"Search"}></Button>
        </div>
      </div>
      <div className="student__search__result">
        <p>{message}</p>
        {courses.length !== 0 &&
          courses?.map((course) => (
            <CourseItem key={course.id} data={course}></CourseItem>
          ))}
      </div>
    </div>
  );
}

export default StudentWithCourse;
