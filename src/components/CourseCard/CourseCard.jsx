import React from "react";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import "../../css-styling/course-card.css";
function CourseCard() {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  async function getCourseDetails() {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/courses/${courseId}/`
    );
    console.log(response.data);
    setCourse(response.data);
  }
  useEffect(() => {
    getCourseDetails();
  }, []);
  return (
    <div className="course_card">
      {/* TODO remove this and make an API request for an actual video img */}

      <img src="https://placehold.co/400" alt="dummy-video-pciture" />
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <p>{course.skills}</p>
      <p> {course.date_created}</p>
    </div>
  );
}

export default CourseCard;
