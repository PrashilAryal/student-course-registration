import { useState } from "react";
import CourseItem from "./common/CourseItem";
import TextBox from "./common/TextBox";
import Button from "./common/Button";
import axios from "axios";

function StudentWithCourse() {
  const [studentId, setStudentId] = useState();
  const [courses, setCourses] = useState([]);
  const getCourses = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/students/registrations/${parseInt(
          studentId
        )}`
      );
      if (Array.isArray(response.data)) {
        setCourses(response.data);
        console.log(response.data);
      } else {
        setCourses([]);
        console.log("Data not found");
      }
    } catch (error) {
      console.log("Error while fetching courses");
    }
  };
  const handleTextStudentIdChange = (text) => {
    setStudentId(text);
  };
  return (
    <div>
      <TextBox
        type={"text"}
        placeholder={"Student ID"}
        onTextChange={handleTextStudentIdChange}
      ></TextBox>
      <Button onClick={getCourses} children={"Search"}></Button>
      {courses.length !== 0 &&
        courses?.map((course) => (
          <CourseItem key={course.id} data={course}></CourseItem>
        ))}
    </div>
  );
}

export default StudentWithCourse;
