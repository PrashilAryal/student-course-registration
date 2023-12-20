import "./app.css";
import Menu from "./components/Menu";
import AddStudent from "./components/AddStudent";
import AddCourse from "./components/AddCourse";
import RegisterStudent from "./components/RegisterStudent";
import CourseContainer from "./components/CourseContainer";
import CourseWithStudent from "./components/CourseWithStudent";
import StudentWithCourse from "./components/StudentWithCourse";

function App() {
  return (
    <div className="App">
      <Menu></Menu>
      {/* <p>Add Student</p>
      <AddStudent></AddStudent> */}
      {/* <p>Add Course</p>
      <AddCourse></AddCourse> */}
      {/* <p>Register Student for Course</p>
      <RegisterStudent></RegisterStudent> */}
      {/* <p>Course with no Students</p>
      <CourseContainer></CourseContainer> */}
      {/* <p>Search Students by Course</p>
      <CourseWithStudent></CourseWithStudent>
      <p>Search Courses by Student</p>
      <StudentWithCourse></StudentWithCourse> */}
    </div>
  );
}

export default App;
