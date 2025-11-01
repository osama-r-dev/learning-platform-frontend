import axios from "axios";
import { Link } from "react-router";
import React, { useEffect, useState } from "react";
import "../../css-styling/course-list.css";
function CourseList({ myCoursesMode }) {
  const [courses, setCourses] = useState([]);

  async function getCoursesList() {
    const accessToken = localStorage.getItem("accessToken");
    const url = myCoursesMode
      ? "http://127.0.0.1:8000/api/courses/"
      : "http://127.0.0.1:8000/api/allcourses/";

    const response = await axios.get(url, {
      headers: myCoursesMode ? { Authorization: `Bearer ${accessToken}` } : {},
    });

    setCourses(response.data);
  }
  useEffect(() => {
    getCoursesList();
  }, [myCoursesMode]);
  return (
    <div className="courses_dashboard">
      {courses.map((course) => {
        return (
          <div className="course_container">
            <Link
              key={course.id}
              to={
                myCoursesMode
                  ? `/home/myprofile/mycourses/${course.id}`
                  : `/home/courses/${course.id}`
              }
            >
              {/* TODO remove this and make an API request for an actual course img */}
              <div>
                <img src={"http://127.0.0.1:8000".concat(course.course_img)} />
                <h2>{course.title}</h2>
              </div>
            </Link>
          </div>
        );
      })}
      {/* // this is a condition in the case of adding a course meaning if it contains the 'myprofile inside the path' */}
      {myCoursesMode && (
        <div className="add-course-btn">
          <Link to="/home/myprofile/mycourses/new" className="add-course-link">
            + Add New Course
          </Link>
        </div>
      )}
      {/* End of that condition */}
    </div>
  );
}
export default CourseList;
