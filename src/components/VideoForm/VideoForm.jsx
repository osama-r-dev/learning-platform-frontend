import React, { useEffect, useState } from "react";
import axios from "axios";
import "../VideoForm/VideoForm.css";
import { useRef } from "react";
function VideoForm({
  closeForm,
  setCurrentVideoId,
  addVideoClicked,
  setAddVideoClicked,
  edit,
  currentVideoId,
  courseVideos,
  course_id,
  setCourseVideos,
}) {
  const vidRef = useRef(null);
  const [formState, setFormState] = useState("hidden");
  const [video, setVideo] = useState({
    title: "",
    video: null,
  });
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setVideo((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));

    // setPrevImage(URL.createObjectURL(files[0]));
  };

  function setForm() {
    if (addVideoClicked || currentVideoId) {
      setFormState("popup-form-video");
    } else {
      setFormState("hidden");
    }
  }
  // function closeForm() {
  //   setFormState("hidden");
  //   setAddVideoClicked(false);
  //   setCurrentVideoId(null);
  // }
  async function handleForm(e) {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    let response = {};
    const formData = new FormData();
    formData.append("title", video.title);

    if (video.video) {
      formData.append("video", video.video);
    }

    if (!edit) {
      const newVideo = await axios.post(
        `http://127.0.0.1:8000/api/courses/${course_id}/myvideos/`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setCourseVideos((prev) => [...prev, newVideo.data]);
    } else if (edit) {
      const updatedVideo = await axios.put(
        `http://127.0.0.1:8000/api/courses/${course_id}/myvideos/${currentVideoId}/`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      console.log("im here");
      setCourseVideos((prev) =>
        prev.map((v) => (v.id === currentVideoId ? updatedVideo.data : v)),
      );
    }
    // setMessage(response.data);
    // setCourseVideos((courseVideos) =>
    //   courseVideos.map((v) => (v.id === currentVideoId ? response.data : v)),
    // );
    // setCourseVideos((courseVideos) => [...courseVideos, response.data]);
  }
  async function fetchData() {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(
      `http://127.0.0.1:8000/api/courses/${course_id}/myvideos/${currentVideoId}/`,

      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    setVideo((prev) => ({
      ...prev,
      title: response.data.title,
    }));

    console.log(response.data);
    // setCourseVideos((courseVideos) => [...courseVideos, response.data]);
  }

  useEffect(() => {
    setForm();
    if (currentVideoId) fetchData();
  }, [addVideoClicked, currentVideoId]);

  return (
    <form onSubmit={handleForm} className={formState}>
      <button className="x" onClick={closeForm}>
        X
      </button>
      <div className="vid-form">
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={() => {
              vidRef.current.click();
            }}
            className="upload-btn"
          >
            <div className="outline">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#868e96"
                className="size-18"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                />
              </svg>
            </div>
          </button>
          <div className={"form-flex"}>
            <div>
              <input
                className="hidden"
                ref={vidRef}
                type="file"
                name="video"
                accept="video/*"
                onChange={handleChange}
              />
            </div>

            <div className="flex justify-between gap-2">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                name="title"
                value={video.title}
                onChange={handleChange}
              ></input>
            </div>
          </div>
        </div>
        <button className="submit-btn">Submit</button>
      </div>
    </form>
  );
}
export default VideoForm;
