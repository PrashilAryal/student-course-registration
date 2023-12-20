import { useEffect, useState } from "react";
import CourseItem from "./common/CourseItem";
import axios from "axios";

function CourseContainer() {
  const [courses, setCourses] = useState([]);
  const getCourses = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/courses/no-students`
      );
      setCourses(response.data);
      console.log(response.data);
      console.log(courses);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCourses();
  }, []);
  return (
    <div>
      {courses.length === 0 ? (
        <p>No Courses Found</p>
      ) : (
        courses.map((course) => (
          <CourseItem
            key={course.id}
            data={course}
            getCourses={getCourses}
          ></CourseItem>
        ))
      )}
    </div>
  );
}

export default CourseContainer;
