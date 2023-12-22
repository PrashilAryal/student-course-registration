import { useEffect, useState } from "react";
import CourseItem from "./common/CourseItem";
import TextBox from "./common/TextBox";
import Button from "./common/Button";
import "../assets/css/courseWithStudent.css";
import axios from "axios";
import { Outlet } from "react-router-dom";

function CourseWithStudent() {
  const [courseName, setCourseName] = useState("");
  const [students, setStudents] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [message, setMessage] = useState("");
  const [removeMessage, setRemoveMessage] = useState("");
  const [course, setCourse] = useState([]);

  const getStudents = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/students/${courseName}`
      );
      if (Array.isArray(response.data)) {
        setStudents(response.data);
        console.log(response.data);
        setMessage("");
      } else {
        setStudents([]);
        setMessage("There are no students!");
      }
      console.log(response.data);
      console.log(courseName);
    } catch (error) {
      console.log(error);
      setStudents([]);
      setMessage("Record not found!");
    }
  };
  const searchCourse = async () => {
    setButtonClicked(true);
    if (courseName !== "") {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_URL}/courses/search/${courseName}`
        );
        setCourse(response.data);
        console.log(response.data);
        console.log(course);
        setMessage("");
      } catch (error) {
        console.log(error);
        setMessage("Record Not Found");
      }
    } else {
      console.log("Please enter course name!");
      setMessage("Please enter course name!");
    }
  };
  const removeStudent = async (studentId, courseId) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_URL}/registrations/${parseInt(
          studentId
        )}/${parseInt(courseId)}`
      );
      console.log(response.data);
      searchCourse();
      getStudents();
      setMessage("Student Removed Successfully!");
    } catch (error) {
      console.log("Error");
      console.log(studentId, courseId);
      setMessage("");
    }
  };
  const handleTextCourseSearchChange = (text) => {
    setCourseName(text);
  };

  useEffect(() => {}, []);
  return (
    <div className="modal__course">
      <div className="course__filter__container">
        <div className="course__filter__options">
          <a href="/course-student/all-courses">All Courses</a>
        </div>
        <div className="course__search_container">
          <div className="course__search__box">
            <TextBox
              type={"text"}
              placeholder={"Enter Course Name"}
              onTextChange={handleTextCourseSearchChange}
              value={courseName}
            ></TextBox>
          </div>
          <Button onClick={searchCourse} children={"Search"}></Button>
        </div>
      </div>
      <p className="messageCourse">{message}</p>
      <div className="course__search__result">
        {course.length === 0 && courseName !== "" ? (
          <p></p>
        ) : (
          course?.map((item) => (
            <div key={item.id}>
              <CourseItem data={item} getStudents={getStudents}></CourseItem>
            </div>
          ))
        )}

        {students.length > 0 && (
          <div>
            <table className="enrolled__student__table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>ID</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {students.length !== 0 ? (
                  students.map((student) => (
                    <tr key={student.student_id}>
                      <td>
                        {student.first_name} {student.last_name}
                      </td>
                      <td>{student.student_id}</td>
                      <td>
                        <Button
                          onClick={() =>
                            removeStudent(student.student_id, student.course_id)
                          }
                          children={"Remove"}
                        ></Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <p>No Students Enrolled yet</p>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="course__list__container">
        <div className="course__list__box">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default CourseWithStudent;
