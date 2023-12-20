const CourseItem = ({ data }) => {
  return (
    <div>
      <p>ID: {data.id}</p>
      <p>Course Name: {data.course_name}</p>
      <p>Credit: {data.course_credit}</p>
      <p>Instructor: {data.instructor_name}</p>
      <p>Writer: {data.writer_name}</p>
      <p>Publication: {data.course_publication}</p>
      <p>Year: {data.publication_year}</p>
    </div>
  );
};

export default CourseItem;
