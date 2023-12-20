import { useState } from "react";
import TextBox from "./common/TextBox";
import Button from "./common/Button";
import axios from "axios";
function AddCourse() {
  const [courseName, setCourseName] = useState("");
  const [courseCredit, setCourseCredit] = useState();
  const [instructorName, setInstructorName] = useState("");
  const [writerName, setWriterName] = useState("");
  const [coursePublication, setCoursePublication] = useState();
  const [publicationYear, setPublicationYear] = useState();

  const handleTextCourseNameChange = (text) => {
    setCourseName(text);
  };
  const handleTextInstructorNameChange = (text) => {
    setInstructorName(text);
  };
  const handleTextCourseCreditChange = (text) => {
    setCourseCredit(text);
  };
  const handleTextCoursePublicationChange = (text) => {
    setCoursePublication(text);
  };
  const handleTextWriterNameChange = (text) => {
    setWriterName(text);
  };
  const handleTextPublishedYearChange = (text) => {
    setPublicationYear(text);
  };
  const addCourse = async () => {
    if (
      courseName === "" ||
      instructorName === "" ||
      writerName === "" ||
      coursePublication === "" ||
      publicationYear === "" ||
      isNaN(parseInt(publicationYear)) ||
      isNaN(parseInt(courseCredit))
    ) {
      console.log("Please fill the form with correct values");
    } else {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_URL}/courses`,
          {
            course_name: courseName,
            course_credit: parseInt(courseCredit),
            instructor_name: instructorName,
            writer_name: writerName,
            course_publication: coursePublication,
            publication_year: parseInt(publicationYear),
          }
        );

        if (response.status !== 200) {
          console.log("Error Adding Course", response);
        } else {
          console.log("Course Added successfully");
        }
      } catch (error) {
        console.log("Already Registered.");
      }
    }
  };
  return (
    <div>
      <TextBox
        type={"text"}
        placeholder={"Course Name"}
        onTextChange={handleTextCourseNameChange}
      ></TextBox>
      <TextBox
        type={"text"}
        placeholder={"Course Credit"}
        onTextChange={handleTextCourseCreditChange}
      ></TextBox>
      <TextBox
        type={"text"}
        placeholder={"Instructor's Name"}
        onTextChange={handleTextInstructorNameChange}
      ></TextBox>
      <TextBox
        type={"text"}
        placeholder={"Writer(s) Name"}
        onTextChange={handleTextWriterNameChange}
      ></TextBox>
      <TextBox
        type={"text"}
        placeholder={"Course Publication"}
        onTextChange={handleTextCoursePublicationChange}
      ></TextBox>
      <TextBox
        type={"text"}
        placeholder={"Published Year"}
        onTextChange={handleTextPublishedYearChange}
      ></TextBox>
      <Button onClick={addCourse} children={"Add"}></Button>
    </div>
  );
}

export default AddCourse;
