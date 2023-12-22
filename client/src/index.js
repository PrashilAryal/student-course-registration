import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AddCourse from "./components/AddCourse";
import AddStudent from "./components/AddStudent";
import CourseContainer from "./components/CourseContainer";
import AllCourse from "./components/AllCourse";
import CourseWithStudent from "./components/CourseWithStudent";
import RegisterStudent from "./components/RegisterStudent";
import StudentWithCourse from "./components/StudentWithCourse";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <StudentWithCourse />,
      },
      {
        path: "/add-student",
        element: <AddStudent />,
      },
      {
        path: "/add-course",
        element: <AddCourse />,
      },
      {
        path: "/register-student",
        element: <RegisterStudent />,
      },
      {
        path: "/course-with-no-student",
        element: <CourseContainer />,
      },
      {
        path: "/course-student",
        element: <CourseWithStudent />,
        children: [
          {
            path: "/course-student/all-courses",
            element: <AllCourse />,
          },
          // {
          //   path: "/course-student/show-with-students",
          //   element: <CourseContainer />,
          // },
          // {
          //   path: "/course-student/show-with-no-students",
          //   element: <CourseContainer />,
          // },
        ],
      },
      {
        path: "/student-course",
        element: <StudentWithCourse />,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
