import { useState } from "react";
import TextBox from "./common/TextBox";
import Button from "./common/Button";
import "../assets/css/addCourse.css";
import axios from "axios";
function AddCourse() {
  const [courseName, setCourseName] = useState("");
  const [courseCredit, setCourseCredit] = useState();
  const [instructorName, setInstructorName] = useState("");
  const [writerName, setWriterName] = useState("");
  const [coursePublication, setCoursePublication] = useState();
  const [publicationYear, setPublicationYear] = useState();
  const [message, setMessage] = useState("");

  const clearFields = () => {
    setCourseName("");
    setCourseCredit("");
    setInstructorName("");
    setWriterName("");
    setCoursePublication("");
    setPublicationYear("");
  };
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
      courseName.trim === "" ||
      instructorName === "" ||
      writerName === "" ||
      coursePublication === "" ||
      publicationYear === "" ||
      isNaN(parseInt(publicationYear)) ||
      isNaN(parseInt(courseCredit))
    ) {
      console.log("Please fill the form with correct values");
      setMessage("Please fill the form with correct values!");
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
          setMessage("Error!");
        } else {
          console.log("Course Added successfully");
          setMessage("Course Added successfully!");
          clearFields();
        }
      } catch (error) {
        console.log("Already Registered.");
        setMessage("Course already added!");
      }
    }
  };
  return (
    <div className="add__course__container">
      <div className="add__course__container__item">
        <label>Course Name</label>
        <TextBox
          type={"text"}
          placeholder={"Course Name"}
          onTextChange={handleTextCourseNameChange}
          value={courseName}
        ></TextBox>
      </div>
      <div className="add__course__container__item">
        <label>Course Credit</label>
        <TextBox
          type={"text"}
          placeholder={"Course Credit"}
          onTextChange={handleTextCourseCreditChange}
          value={courseCredit}
        ></TextBox>
      </div>
      <div className="add__course__container__item">
        <label>Instructor's Name</label>
        <TextBox
          type={"text"}
          placeholder={"Instructor's Name"}
          onTextChange={handleTextInstructorNameChange}
          value={instructorName}
        ></TextBox>
      </div>
      <div className="add__course__container__item">
        <label>Writer(s) Name</label>
        <TextBox
          type={"text"}
          placeholder={"Writer(s) Name"}
          onTextChange={handleTextWriterNameChange}
          value={writerName}
        ></TextBox>
      </div>
      <div className="add__course__container__item">
        <label>Course Publication</label>
        <TextBox
          type={"text"}
          placeholder={"Course Publication"}
          onTextChange={handleTextCoursePublicationChange}
          value={coursePublication}
        ></TextBox>
      </div>
      <div className="add__course__container__item">
        <label>Published year</label>
        <TextBox
          type={"text"}
          placeholder={"Published Year"}
          onTextChange={handleTextPublishedYearChange}
          value={publicationYear}
        ></TextBox>
      </div>
      <div className="add__course__container__item">
        <Button onClick={addCourse} children={"Add"}></Button>
      </div>
      <p>{message}</p>
    </div>
  );
}

export default AddCourse;
