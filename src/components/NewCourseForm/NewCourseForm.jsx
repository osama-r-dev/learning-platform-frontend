import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import axios from "axios";
import { useNavigate } from "react-router";
import VideoForm from "../VideoForm/VideoForm";
import "./NewCourseForm.css";
function NewCourseForm({ flag }) {
  const [info, setInfo] = useState({
    course_img: null,
    title: "",
    description: "",
    skills: "",
  });
  const { courseId } = useParams();
  const [error, setError] = useState(null);
  const [responseState, setResponseState] = useState("");
  const [videoForm, setVideoForm] = useState(false);
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, type, value, files } = event.target;
    if (type === "file") {
      setInfo({ ...info, [name]: files[0] });
    } else {
      setInfo({ ...info, [name]: value });
    }
  }

  async function getCourseForm() {
    if (!courseId) return;
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        `http://127.0.0.1:8000/api/courses/${courseId}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      setInfo(response.data);
      console.log(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        setError("Session has expired, login again");
        navigate("/login");
      } else setError(error.response?.data || { message: error.message });
    }
  }

  useEffect(() => {
    getCourseForm();
  }, []);

  async function handleForm(event) {
    event.preventDefault();
    const accessToken = localStorage.getItem("accessToken");
    setError(null);
    setResponseState("");

    try {
      const formData = new FormData();
      formData.append("title", info.title);
      formData.append("description", info.description);
      formData.append("skills", info.skills);
      if (info.course_img) formData.append("course_img", info.course_img);

      let response;

      if (courseId) {
        response = await axios.put(
          `http://127.0.0.1:8000/api/courses/${courseId}/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setResponseState("Course updated successfully!");
        window.location.reload();
      } else {
        response = await axios.post(
          `http://127.0.0.1:8000/api/courses/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setResponseState("Course created successfully!");
        navigate("/home/myprofile/mycourses");
      }
    } catch (error) {
      console.log("Error:", error);
      setError(error.response?.data || { message: error.message });
    }
  }

  return (
    <div className="course-form-container">
      <form onSubmit={handleForm}>
        <label htmlFor="course_img">img of the course</label>
        <input
          id="course_img"
          type="file"
          accept="image/*"
          name="course_img"
          onChange={handleChange}
        ></input>

        <label htmlFor="Title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          value={info.title}
          onChange={handleChange}
        ></input>

        <label htmlFor="Description">Description</label>
        <input
          id="description"
          type="text"
          name="description"
          value={info.description}
          onChange={handleChange}
        ></input>

        <label htmlFor="skills">Skills</label>
        <input
          id="skills"
          type="text"
          name="skills"
          value={info.skills}
          onChange={handleChange}
        ></input>

        {error && (
          <p style={{ color: "red" }}>
            {error.message || error.error || String(error)}
          </p>
        )}
        {responseState && <p style={{ color: "green" }}>{responseState}</p>}

        <button type="submit">Submit</button>
      </form>

      {videoForm === true ? <VideoForm courseId={courseId}></VideoForm> : null}
      {flag ? (
        <button
          className="show-hide-form-button"
          onClick={() => setVideoForm(!videoForm)}
        >
          {videoForm ? "Hide form" : "Show form"}
        </button>
      ) : (
        <button
          className="show-hide-form-button-arrows"
          onClick={() => setVideoForm(!videoForm)}
        >
          {videoForm ? "▲" : "▼"}
        </button>
      )}
    </div>
  );
}

export default NewCourseForm;
