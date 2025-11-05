import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import axios from "axios";
import VideoList from "../VideoList/VideoList";
import NewCourseForm from "../NewCourseForm/NewCourseForm";
import "./CourseDetail.css";

function CourseDetail({ myCoursesMode }) {
  const [loading, setLoading] = useState(true);
  const [showVideos, setShowVideos] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  const navigate = useNavigate();

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

  async function handleDeleteCourse() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`http://127.0.0.1:8000/api/courses/${courseId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Course deleted successfully!");
      navigate("/home/myprofile/mycourses");
    } catch (error) {
      console.error("Failed to delete course:", error);
      alert("Failed to delete course");
    }
  }
  const colors = ["#FF006E"];

  function getRandomCloror() {
    return colors[Math.floor(Math.random() * colors.length)];
  }
  if (loading) return <p>Loading course details...</p>;

  return (
    <div className="course_card">
      <img
        src={"http://127.0.0.1:8000".concat(course.course_img)}
        alt="Course"
      />
      <div className="title-container">
        <h2 className="course-title">{course.title}</h2>
      </div>
      <p className="course-description">Description</p>
      <p>{course.description}</p>
      <p className="Skills">Skills</p>
      <span className="skills-container">
        {(Array.isArray(course.skills)
          ? course.skills
          : course.skills?.split(",")
        )?.map((skill, index) => (
          <span
            key={index}
            className="skill-tag"
            style={{ backgroundColor: getRandomCloror() }}
          >
            {skill.trim()}
          </span>
        ))}
      </span>

      <p onClick={() => setShowVideos(!showVideos)} className="content-toggle">
        {showVideos ? "Hide Content" : "Show Content"}
      </p>
      {showVideos && <VideoList courseId={courseId} flag={false} />}

      <p>by {course?.employee?.name || "loading..."}</p>

      <p className="date-created">{course.date_created}</p>
      {myCoursesMode && (
        <div className="course-actions">
          <button className="edit-btn" onClick={() => setShowEditForm(true)}>
            Edit
          </button>
          <button className="delete-btn" onClick={handleDeleteCourse}>
            Delete Course
          </button>
        </div>
      )}

      {showEditForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              className="close-modal"
              onClick={() => setShowEditForm(false)}
            >
              ✖
            </button>
            <NewCourseForm flag={true} courseId={courseId} />
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseDetail;
