import axios from "axios";
import { Link } from "react-router";
import React, { useEffect, useState } from "react";
import "../../css-styling/course-list.css";
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
    <div className="courses_dashboard">
      {courses.map((course) => {
        return (
          <div className="course_container">
            <Link key={course.id} to={`/home/courses/${course.id}`}>
              {/* TODO remove this and make an API request for an actual course img */}
              <img src="https://placehold.co/400" alt="dummy-course-pciture" />
              <h2>{course.title}</h2>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default CourseList;
