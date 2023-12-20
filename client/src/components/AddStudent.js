import { useState } from "react";
import TextBox from "./common/TextBox";
import Button from "./common/Button";
import axios from "axios";
function AddStudent() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

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
    if (firstName || lastName !== "") {
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
        } else {
          console.log("Student added successfully");
        }
      } catch (error) {
        console.log("Internal Server Error: ", error);
      }
    } else {
      console.log("Please fill the form");
    }
  };
  return (
    <div>
      <TextBox
        type={"text"}
        placeholder={"First Name"}
        onTextChange={handleTextFirstNameChange}
      ></TextBox>
      <TextBox
        type={"text"}
        placeholder={"Last Name"}
        onTextChange={handleTextLastNameChange}
      ></TextBox>
      <TextBox
        type={"text"}
        placeholder={"Mobile Number"}
        onTextChange={handleTextNumberChange}
      ></TextBox>
      <Button onClick={addStudent} children={"Add"}></Button>
    </div>
  );
}

export default AddStudent;
