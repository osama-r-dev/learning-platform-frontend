import React, { useState } from "react";
import axios from "axios";

function VideoForm({ courseId }) {
  const [videoData, setVideoData] = useState({
    title: "",
    description: "",
    video_url: null,
  });
  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value, files } = event.target;
    if (name === "video_url") {
      setVideoData({ ...videoData, video_url: files[0] });
    } else {
      setVideoData({ ...videoData, [name]: value });
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    try {
      const accessToken = localStorage.getItem("accessToken");
      const formData = new FormData();
      formData.append("title", videoData.title);
      formData.append("description", videoData.description);
      formData.append("video", videoData.video_url);

      await axios.post(
        `http://127.0.0.1:8000/api/courses/${courseId}/myvideos/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage("Video has been added successfully!");
      setVideoData({ title: "", description: "", video_url: null });
    } catch (err) {
      setMessage(
        "Failed to add video: " + (err.response?.data?.error || err.message)
      );
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Video Title</label>
      <input
        type="text"
        name="title"
        value={videoData.title}
        onChange={handleChange}
      />

      <label>Description</label>
      <input
        type="text"
        name="description"
        value={videoData.description}
        onChange={handleChange}
      />

      <label>Video File</label>
      <input
        type="file"
        accept="video/*"
        name="video_url"
        onChange={handleChange}
      />

      <button type="submit">Add Video</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default VideoForm;
