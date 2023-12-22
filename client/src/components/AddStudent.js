import { useState, useEffect } from "react";
import TextBox from "./common/TextBox";
import Button from "./common/Button";
import "../assets/css/addStudent.css";
import axios from "axios";
function AddStudent() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [allStudents, setAllStudents] = useState([]);

  const handleTextFirstNameChange = (text) => {
    setFirstName(text);
  };
  const handleTextLastNameChange = (text) => {
    setLastName(text);
  };
  const handleTextNumberChange = (text) => {
    setPhoneNumber(text);
  };
  const addStudent = async () => {
    if (firstName.trim() !== "" && lastName.trim() !== "") {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_URL}/students`,
          {
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber,
          }
        );
        if (response.status !== 200) {
          console.log("Error Adding student");
          setMessage("Error Adding Student!");
        } else {
          console.log("Student added successfully");
          setMessage("Student Added Successfully!");
          clearFields();
        }
      } catch (error) {
        console.log("Internal Server Error: ", error);
        setMessage("Error!");
      }
    } else {
      console.log("Please fill all the Entries");
      setMessage("Please fill all the Entries!");
    }
  };
  const getStudents = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/students/all-students`
      );

      if (Array.isArray(response.data)) {
        setAllStudents(response.data);
        console.log(allStudents);
      } else {
        setAllStudents([]);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const clearFields = () => {
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
  };
  useEffect(() => {
    getStudents();
  }, [message]);

  return (
    <div className="modal__add__student">
      <div className="add__student__container">
        <div className="add__student__container__item">
          <label>First Name</label>
          <TextBox
            type={"text"}
            placeholder={"First Name"}
            onTextChange={handleTextFirstNameChange}
            value={firstName}
            setValue={setFirstName}
          ></TextBox>
        </div>
        <div className="add__student__container__item">
          <label>Last Name</label>
          <TextBox
            type={"text"}
            placeholder={"Last Name"}
            onTextChange={handleTextLastNameChange}
            value={lastName}
          ></TextBox>
        </div>
        <div className="add__student__container__item">
          <label>Mobile Number</label>
          <TextBox
            type={"text"}
            placeholder={"Mobile Number"}
            onTextChange={handleTextNumberChange}
            value={phoneNumber}
          ></TextBox>
        </div>
        <div className="add__student__container__item">
          <Button onClick={addStudent} children={"Add"}></Button>
        </div>
        <p>{message}</p>
      </div>
      <div className="all__student__container">
        <h1>All Students</h1>
        <div className="all__student__container__title">
          <p>Name</p>
          <p>ID</p>
        </div>
        {allStudents?.map((student) => (
          <div key={student.id}>
            <p>
              {student.first_name} {student.last_name}
            </p>
            <p>{student.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddStudent;
