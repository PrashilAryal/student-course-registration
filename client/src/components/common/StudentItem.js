import { useEffect } from "react";
import Button from "./Button";
import axios from "axios";
const StudentItem = ({ data, getStudents }) => {
  const removeStudent = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_URL}/registrations/${data.student_id}/${data.course_id}`
      );
      console.log(response.data);
      getStudents();
    } catch (error) {
      console.log("Error");
    }
  };
  useEffect(() => {
    getStudents();
  }, []);
  return (
    <div>
      <p>ID: {data.id}</p>
      <p>First Name: {data.first_name}</p>
      <p>Last Name: {data.last_name}</p>
      <p>phone Num: {data.phone_number}</p>
      <Button
        key={data.id}
        onClick={removeStudent}
        children={"Remove"}
      ></Button>
    </div>
  );
};

export default StudentItem;
