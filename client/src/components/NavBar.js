import React from "react";
import "../assets/css/navBar.css";

export default function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <a href="/add-student">Add Student</a>
        </li>
        <li>
          <a href="/add-course">Add Course</a>
        </li>
        <li>
          <a href="/register-student">Register Student</a>
        </li>
        {/* <li>
          <a href="/course-with-no-student">Course with no Students</a>
        </li> */}
        <li>
          <a href="/course-student/all-courses">Course</a>
        </li>
        <li>
          <a href="/student-course">Student</a>
        </li>
      </ul>
    </nav>
  );
}
