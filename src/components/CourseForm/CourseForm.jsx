import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "../CourseForm/CourseForm.css";
function CourseForm({
  isAddNewCourse,
  setAddNewCourse,
  setIsEditButton,
  isEditButton,
  edit,
  courseData,
  setCourseData,
  course_id,
  prevImage,
  setPrevImage,
}) {
  const [isCloseForm, setIsCloseForm] = useState(false);
  const { course_Id } = useParams();
  const [message, setMessage] = useState("");
  const [courseImg, setCourseImage] = useState(prevImage);
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    console.log(courseData);

    setCourseData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));

    // setPrevImage(URL.createObjectURL(files[0]));
  };
  async function handleForm(e) {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    const formData = new FormData();
    formData.append("title", courseData.title);
    formData.append("description", courseData.description);
    formData.append("skills", courseData.skills);
    formData.append("date_created", courseData.date_created);
    formData.append("videos", courseData.videos);
    if (courseData.course_img) {
      formData.append("course_img", courseData.course_img);
    }
    let response = {};
    !edit
      ? (response = await axios.post(
          `http://127.0.0.1:8000/api/courses/`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        ))
      : (response = await axios.put(
          `http://127.0.0.1:8000/api/courses/${course_id}/`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        ));

    setMessage(response.data);

    if (!edit) {
    }
  }

  return (
    <form
      className={isEditButton || isAddNewCourse ? "popup-form" : "hidden"}
      onSubmit={handleForm}
    >
      <div className="course-form-col-1">
        <div className="check design for icon for the course image">
          <label htmlFor="course_img">course img</label>
          {edit && courseImg && (
            <img
              src={"http://127.0.0.1:8000/".concat(courseImg)}
              alt="course"
              width={200}
            />
          )}
          <input
            type="file"
            name="course_img"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        <button className="submit-btn">Submit</button>
      </div>
      <div className="course-form-col-2">
        <div className="form-x-container">
          {isEditButton ? (
            <button
              className="form-x"
              onClick={(isEditButton) => setIsEditButton(!isEditButton)}
            >
              X
            </button>
          ) : (
            ""
          )}
          {isAddNewCourse ? (
            <button
              className="form-x"
              onClick={(isAddNewCourse) => setAddNewCourse(!isAddNewCourse)}
            >
              X
            </button>
          ) : (
            ""
          )}
        </div>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            value={courseData.title}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            id="description"
            type="text"
            name="description"
            value={courseData.description}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label htmlFor="skills">Skills</label>
          <input
            id="skills"
            type="text"
            name="skills"
            value={courseData.skills}
            onChange={handleChange}
          ></input>
        </div>
        <div className="flex-field">
          <label htmlFor="date_created">Date created</label>
          <input
            id="date_created"
            type="date"
            name="date_created"
            value={courseData.date_created}
            onChange={handleChange}
          ></input>
        </div>
      </div>
    </form>
  );
}
export default CourseForm;
