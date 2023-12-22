import { useEffect, useState } from "react";
import "../assets/css/courseWithNoStudent.css";
import axios from "axios";
import "../assets/css/AllStudent.css";

function AllStudent() {
  const [students, setStudents] = useState([]);

  const getStudents = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/students/all-students`
      );
      setStudents(response.data);
      console.log(response.data);
      console.log(students);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);
  return (
    <>
      <div className="show__student__container">
        <h4 className="table__title">All Students</h4>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {students.length !== 0 ? (
              students.map((student) => (
                <tr key={student.id}>
                  <td>
                    {student.first_name} {student.last_name}
                  </td>
                  <td>{student.id}</td>
                  <td>{student.phone_number}</td>
                </tr>
              ))
            ) : (
              <p>No Students Found</p>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AllStudent;
