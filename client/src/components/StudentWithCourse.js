import { useEffect, useState } from "react";
import TextBox from "./common/TextBox";
import Button from "./common/Button";
import "../assets/css/studentWithCourse.css";
import axios from "axios";
import AllStudent from "../components/AllStudent";

function StudentWithCourse() {
  const [studentId, setStudentId] = useState("");
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("");
  const [student, setStudent] = useState([]);

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
        setMessage("Student not enrolled on any course!");
        setCourses([]);
      }
    }
  };
  const searchStudent = async () => {
    if (studentId === "" || studentId === null) {
      console.log("Please enter student ID!");
      setMessage("Please enter student ID!");
      setStudent([]);
    } else if (isNaN(studentId)) {
      setMessage("ID must be an Integer value!");
      setStudent([]);
    } else {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_URL}/students/search/${studentId}`
        );
        setStudent(response.data);
        getCourses();
        console.log(response.data);
        console.log(student);
        setMessage("");
      } catch (error) {
        setStudent([]);
        console.log(error);
        setMessage("Record Not Found");
      }
    }
  };
  const handleTextStudentIdChange = (text) => {
    setStudentId(text);
  };
  useEffect(() => {
    getCourses();
  }, [message]);
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
          <Button onClick={searchStudent} children={"Search"}></Button>
        </div>
      </div>
      <div className="student__search__result">
        <p>{message}</p>
        {courses.length !== 0 &&
          courses?.map((course) => (
            <div className="course__item__container">
              <p className="course__name">{course.course_name}</p>
              <div className="course__item__detail">
                <div className="course__item__container__list1">
                  <p className="course__writer">Writer: {course.writer_name}</p>
                  <p className="course__instructor">
                    Instructor: {course.instructor_name}
                  </p>
                  <p className="course__publication">
                    Publication: {course.course_publication}
                  </p>
                </div>
                <div className="course__item__container__list2">
                  <p className="course__credit">
                    Credit: {course.course_credit}
                  </p>
                  <p className="course__year">
                    Year: {course.publication_year}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="show__student__container">
        <h4 className="table__title">Details</h4>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {student.length !== 0 ? (
              student.map((item) => (
                <tr key={item.id}>
                  <td>
                    {item.first_name} {item.last_name}
                  </td>
                  <td>{item.id}</td>
                  <td>{item.phone_number}</td>
                </tr>
              ))
            ) : (
              <p>Student Not Found</p>
            )}
          </tbody>
        </table>
      </div>
      <AllStudent></AllStudent>
    </div>
  );
}

export default StudentWithCourse;
