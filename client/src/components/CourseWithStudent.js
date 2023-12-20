import { useEffect, useState } from "react";
import StudentItem from "./common/StudentItem";
import TextBox from "./common/TextBox";
import Button from "./common/Button";
import axios from "axios";

function CourseWithStudent() {
  const [courseName, setCourseName] = useState("");
  const [students, setStudents] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  // const [courseId, setCourseId] = useState();
  // const [studentId, setStudentId] = useState();

  const getStudents = async () => {
    setButtonClicked(true);
    if (courseName !== "") {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_URL}/students/${courseName}`
        );
        if (Array.isArray(response.data)) {
          setStudents(response.data);
        } else {
          setStudents([]);
        }
        // setStudentId(response.data.student_id);
        // setCourseId(response.data.course_id);
        // console.log(response.data.student_id);
        console.log(response.data);
        console.log(courseName);
      } catch (error) {
        console.log(error);
        setStudents([]);
      }
    } else {
      console.log("Please enter course name");
    }
  };
  const handleTextCourseSearchChange = (text) => {
    setCourseName(text);
  };

  useEffect(() => {
    // getStudents();
  }, []);
  return (
    <div>
      <TextBox
        type={"text"}
        placeholder={"Enter Course Name"}
        onTextChange={handleTextCourseSearchChange}
      ></TextBox>
      <Button onClick={getStudents} children={"Search"}></Button>

      {buttonClicked && students.length === 0 && courseName !== "" ? (
        <p>No Students Found</p>
      ) : (
        students?.map((student) => (
          <div>
            <StudentItem
              key={student.id}
              data={student}
              getStudents={getStudents}
            ></StudentItem>
          </div>
        ))
      )}
    </div>
  );
}

export default CourseWithStudent;
