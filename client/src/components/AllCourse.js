import { useEffect, useState } from "react";
import "../assets/css/courseWithNoStudent.css";
import axios from "axios";
import "../assets/css/AllCourse.css";

function AllCourse() {
  const [courses, setCourses] = useState([]);
  const [noStudentCourses, setNoStudentCourses] = useState([]);

  const getCourses = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/courses/all-courses`
      );
      setCourses(response.data);
      console.log(response.data);
      console.log(courses);
    } catch (error) {
      console.log(error);
    }
  };

  const getNoStudentCourses = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/courses/no-students`
      );
      setNoStudentCourses(response.data);
      console.log(response.data);
      console.log(courses);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCourses();
    getNoStudentCourses();
  }, []);
  return (
    <>
      <div className="show__course__container">
        <h4 className="table__title">All Courses</h4>
        <table>
          <thead>
            <tr>
              <th>Course</th>
              <th>Instructor</th>
              <th>Writer</th>
              <th>Publication</th>
              <th>Credit</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {courses.length !== 0 ? (
              courses.map((course) => (
                <tr key={course.id}>
                  <td>{course.course_name}</td>
                  <td>{course.instructor_name}</td>
                  <td>{course.writer_name}</td>
                  <td>{course.course_publication}</td>
                  <td>{course.course_credit}</td>
                  <td>{course.publication_year}</td>
                </tr>
              ))
            ) : (
              <p>No Courses Found</p>
            )}
          </tbody>
        </table>
      </div>
      <div className="show__course__container">
        <h4 className="table__title">Courses with no enrolled students</h4>
        <table>
          <thead>
            <tr>
              <th>Course</th>
              <th>Instructor</th>
              <th>Writer</th>
              <th>Publication</th>
              <th>Credit</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {noStudentCourses.length !== 0 ? (
              noStudentCourses.map((noStudentCourse) => (
                <tr key={noStudentCourse.id}>
                  <td>{noStudentCourse.course_name}</td>
                  <td>{noStudentCourse.instructor_name}</td>
                  <td>{noStudentCourse.writer_name}</td>
                  <td>{noStudentCourse.course_publication}</td>
                  <td>{noStudentCourse.course_credit}</td>
                  <td>{noStudentCourse.publication_year}</td>
                </tr>
              ))
            ) : (
              <p>No Courses Found</p>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AllCourse;
