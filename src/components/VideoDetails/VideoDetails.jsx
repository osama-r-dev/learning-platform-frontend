import React, { useEffect, useState } from "react";
import axios from "axios";
import "./VideoDetails.css";
import CourseDetail from "../CourseDetail/CourseDetail";
import { Link } from "react-router";
function VideoDetails({ courseId, videoId, flag }) {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState("");

  useEffect(() => {
    async function getVideo() {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          `http://127.0.0.1:8000/api/courses/${courseId}/myvideos/${videoId}/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setVideo(response.data);
      } catch (error) {
        console.log("Error fetching video:", error);
      } finally {
        setLoading(false);
      }
    }
    getVideo();
  }, [courseId, videoId]);

  async function handleDeleteCourse() {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(
        `http://127.0.0.1:8000/api/courses/${courseId}/myvideos/${videoId}/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setState("Video deleted");
      window.location.reload();
      // <Link key={courseId} to={"/home/myprofile/mycourses/:courseId"}></Link>;
    } catch (error) {
      console.error("Failed to delete video:", error);
    }
  }
  if (loading) return <p>Loading video...</p>;
  if (!video) return <p>Video not found</p>;

  return (
    <div className="video-elem">
      <h4>{video.title}</h4>
      <video width="400" controls>
        <source src={`http://127.0.0.1:8000${video.video}`} type="video/mp4" />
      </video>
      <button onClick={handleDeleteCourse}>Delete Video</button>
      <p className="video-descrip">{video.description}</p>
      <p>{state}</p>
    </div>
  );
}

export default VideoDetails;
