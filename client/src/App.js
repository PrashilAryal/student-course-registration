import "./app.css";
import Menu from "./components/Menu";
import AddStudent from "./components/AddStudent";
import AddCourse from "./components/AddCourse";
import RegisterStudent from "./components/RegisterStudent";
import CourseContainer from "./components/CourseContainer";
import CourseWithStudent from "./components/CourseWithStudent";
import StudentWithCourse from "./components/StudentWithCourse";
import { useEffect, useState } from "react";

function App() {
  const [header, setHeader] = useState("");

  const [selectedMenuItem, setSelectedMenuItem] = useState();
  const openModal = (menuItem) => {
    setSelectedMenuItem(parseInt(menuItem));
    if (menuItem === 1) {
      setHeader("Add Student");
    } else if (menuItem === 2) {
      setHeader("Add Course");
    } else if (menuItem === 3) {
      setHeader("Register Student");
    } else if (menuItem === 4) {
      setHeader("Course With No Enrolled Students");
    } else if (menuItem === 5) {
      setHeader("Search Course Name to View its Students");
    } else if (menuItem === 6) {
      setHeader("Search Student ID to View Enrolled Courses");
    } else {
      setHeader("Welcome");
    }
  };

  useEffect(() => {});
  return (
    <div className="app">
      <div className="app__header">
        <p className="app__header__company">Takeo</p>
        <p className="app__header__system">Student Course Registration</p>
      </div>
      {/* <div className="app__"> */}
      <div className="app__body__menu">
        <Menu openModal={openModal}></Menu>
      </div>
      <div className="app__body">
        <div className="app__body__content">
          <div className="app__body__content__modal">
            <p className="modal__header">{header}</p>
            <div className="modal__add__student">
              {parseInt(selectedMenuItem) === 1 && <AddStudent></AddStudent>}
            </div>
            <div className="modal__add__course">
              {selectedMenuItem === 2 && <AddCourse></AddCourse>}
            </div>
            <div className="modal__register__student">
              {selectedMenuItem === 3 && <RegisterStudent></RegisterStudent>}
            </div>
            <div className="modal__course_with-not__student">
              {selectedMenuItem === 4 && <CourseContainer></CourseContainer>}
            </div>
            <div className="modal__search__course__student">
              {selectedMenuItem === 5 && (
                <CourseWithStudent></CourseWithStudent>
              )}
            </div>
            <div className="modal__search__student__course">
              {selectedMenuItem === 6 && (
                <StudentWithCourse></StudentWithCourse>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}

export default App;
