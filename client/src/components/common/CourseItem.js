import "../../assets/css/common/courseItem.css";
import Button from "./Button";
const CourseItem = ({ data, getStudents }) => {
  return (
    <div className="course__item__container">
      <p className="course__name">{data.course_name}</p>
      <div className="course__item__detail">
        <div className="course__item__container__list1">
          <p className="course__writer">Writer: {data.writer_name}</p>
          <p className="course__instructor">
            Instructor: {data.instructor_name}
          </p>
          <p className="course__publication">
            Publication: {data.course_publication}
          </p>
        </div>
        <div className="course__item__container__list2">
          <p className="course__credit">Credit: {data.course_credit}</p>
          <p className="course__year">Year: {data.publication_year}</p>
          <p className="course__credit">ID: {data.id}</p>
        </div>
      </div>
      <div className="course__item__button">
        <Button
          onClick={getStudents}
          children={"View Enrolled Students"}
        ></Button>
      </div>
    </div>
  );
};

export default CourseItem;
