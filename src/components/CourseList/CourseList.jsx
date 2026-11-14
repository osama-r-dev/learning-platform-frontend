import axios from "axios";
import React, { useState, useEffect } from "react";
import CourseCard from "../CourseCard/CourseCard";

function CourseList() {
  const [courses, setCourses] = useState([]);
  const accessToken = localStorage.getItem("accessToken");
  async function getCoursesList() {
    const res = await axios.get("http://127.0.0.1:8000/api/allcourses/", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log(res);
    setCourses(res.data);
  }

  useEffect(() => {
    getCoursesList();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-6 mx-auto my-12">
      {courses.map((course) => {
        return <CourseCard course={course} />;
      })}
    </div>
  );
}
export default CourseList;
