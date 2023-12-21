import { useState } from "react";
import TextBox from "./common/TextBox";
import Button from "./common/Button";
import "../assets/css/addStudent.css";
import axios from "axios";
function AddStudent() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

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
  const clearFields = () => {
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
  };

  return (
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
  );
}

export default AddStudent;
