import axios from "axios";
import React, { useEffect, useState } from "react";
import CourseCard from "../CourseCard/CourseCard";
import { Link } from "react-router";
import CourseForm from "../CourseForm/CourseForm";
function AdminCourses({ getMyCourse }) {
  const [prevImg, setprevImg] = useState(null);
  const [isAddNewCourse, setAddNewCourse] = useState(false);
  const [courseData, setCourseData] = useState({
    course_img: null,
    title: "",
    description: "",
    skills: "",
    date_created: "",
  });

  const [myCourses, setMyCourses] = useState([]);
  const token = localStorage.getItem("accessToken");
  async function getMyCourses() {
    const response = await axios.get("http://127.0.0.1:8000/api/courses/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setMyCourses(response.data);
    setprevImg();
    console.log(response.data);
  }

  useEffect(() => {
    getMyCourses();
  }, []);

  return (
    <>
      {/* This will be rendered differently than the cards visisble to the user  */}
      <ul className=" mt-16 grid max-w-[2000px]  grid-cols-[repeat(auto-fit,minmax(240px,1fr))] mx-auto px-4 gap-6">
        {myCourses.map((course) => {
          return (
            <i>
              <CourseCard courseId={course.id} course={course}></CourseCard>
            </i>
          );
        })}
        <button onClick={() => setAddNewCourse(!isAddNewCourse)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </ul>
      {isAddNewCourse && (
        <CourseForm
          courseData={courseData}
          setCourseData={setCourseData}
          setAddNewCourse={setAddNewCourse}
          isAddNewCourse={isAddNewCourse}
        ></CourseForm>
      )}
      <div className="flex justify-self-center: center"></div>
    </>
  );
}

export default AdminCourses;
