import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import VideoList from "../VideoList/VideoList";
import "../../css-styling/CourseDetail.css";

function CourseDetail({ myCoursesMode }) {
  const [loading, setLoading] = useState(true);
  const [showVideos, setShowVideos] = useState(false);
  const { courseId } = useParams();
  const [course, setCourse] = useState({});

  async function getCourseDetails() {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/courses/${courseId}/`
      );
      setCourse(response.data);
    } catch (error) {
      console.log("Something went wrong", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCourseDetails();
  }, []);

  if (loading) return <p>Loading course details...</p>;

  return (
    <div className="course_card">
      <img src="https://placehold.co/400" alt="dummy-video-picture" />
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <p>{course.skills}</p>
      <p>{course.date_created}</p>

      <p
        style={{ cursor: "pointer", color: "blue" }}
        onClick={() => setShowVideos(!showVideos)}
      >
        Content
      </p>

      {showVideos && <VideoList courseId={courseId} falg={false} />}

      <p>by {course?.employee?.name || "loading..."}</p>
    </div>
  );
}

export default CourseDetail;
