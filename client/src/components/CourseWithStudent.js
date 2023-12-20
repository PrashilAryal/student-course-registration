import { useEffect, useState } from "react";
import StudentItem from "./common/StudentItem";
import TextBox from "./common/TextBox";
import Button from "./common/Button";
import "../assets/css/courseWithStudent.css";
import axios from "axios";

function CourseWithStudent() {
  const [courseName, setCourseName] = useState("");
  const [students, setStudents] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [message, setMessage] = useState("");
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
          setMessage("");
        } else {
          setStudents([]);
          setMessage("Record not found!");
        }
        // setStudentId(response.data.student_id);
        // setCourseId(response.data.course_id);
        // console.log(response.data.student_id);
        console.log(response.data);
        console.log(courseName);
      } catch (error) {
        console.log(error);
        setStudents([]);
        setMessage("Record not found!");
      }
    } else {
      console.log("Please enter course name!");
      setMessage("Please enter course name!");
    }
  };
  const handleTextCourseSearchChange = (text) => {
    setCourseName(text);
  };

  useEffect(() => {
    // getStudents();
  }, []);
  return (
    <div className="search__course__student">
      <div className="course__search__box">
        <label className="course__search__box__item">Search</label>
        <div className="course__search__box__item text-box">
          <TextBox
            type={"text"}
            placeholder={"Enter Course Name"}
            onTextChange={handleTextCourseSearchChange}
            value={courseName}
          ></TextBox>
        </div>
        <div className="course__search__box__item">
          <Button onClick={getStudents} children={"Search"}></Button>
        </div>
      </div>
      <p>{message}</p>
      <div className="course__search__result">
        {/* {buttonClicked && students.length === 0 && courseName !== "" ? ( */}
        {students.length !== 0 &&
          // <p>No Students Found</p>
          // ) : (
          students?.map((student) => (
            <div>
              <StudentItem
                key={student.id}
                data={student}
                getStudents={getStudents}
              ></StudentItem>
            </div>
          ))}
      </div>
    </div>
  );
}

export default CourseWithStudent;
