import { useEffect } from "react";
import Button from "./Button";
import "../../assets/css/common/studentItem.css";
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
    <div className="student__item__container">
      <p className="student__name">
        {data.first_name} {data.last_name}
      </p>
      <div className="student__item__detail">
        <div className="student__item__container__item1">
          <p className="student__id">ID: {data.id}</p>
          <p className="student__number">Phone No.: {data.phone_number}</p>
        </div>
        <div className="student__item__container__item2">
          <Button
            key={data.id}
            onClick={removeStudent}
            children={"Remove"}
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default StudentItem;
