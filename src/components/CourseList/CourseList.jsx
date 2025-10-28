import axios from "axios";
import { Link } from "react-router";
import React, { useEffect, useState } from "react";
function CourseList() {
  const [courses, setCourses] = useState([]);

  async function getCoursesList() {
    const response = await axios.get("http://127.0.0.1:8000/api/courses/");
    console.log(response.data);
    setCourses(response.data);
  }

  useEffect(() => {
    getCoursesList();
  }, []);
  return (
    <div>
      {courses.map((course) => {
        return (
          <>
            <div>
              <Link key={course.id} to={`/home/courses/${course.id}`}></Link>
              <h2>{course.title}</h2>
            </div>
          </>
        );
      })}
    </div>
  );
}

export default CourseList;
