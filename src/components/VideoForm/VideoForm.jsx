import React, { useState } from "react";
import axios from "axios";

function VideoForm({ courseId }) {
  const [videoData, setVideoData] = useState({
    title: "",
    description: "",
    videoURL: "",
  });
  const [message, setMessage] = useState("");

  function handleChange(event) {
    setVideoData({ ...videoData, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    try {
      const accessToken = localStorage.getItem("accessToken");
      await axios.post(
        `http://127.0.0.1:8000/api/courses/${courseId}/videos/`,
        videoData,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      setMessage("Video have been added successfully");
      setVideoData({ title: "", description: "", video_url: "" });
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

      <label>Video url</label>
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
