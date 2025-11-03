import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import VideoDetails from "../VideoDetails/VideoDetails";

function VideoList({ flag }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const { courseId } = useParams();

  async function getVideos() {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(
        `http://127.0.0.1:8000/api/courses/${courseId}/myvideos/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setVideos(response.data);
    } catch (error) {
      console.log("Error getting videos:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getVideos();
  }, []);

  if (loading) return <p>Videos loading...</p>;
  if (videos.length === 0) return <p>No videos found.</p>;

  if (selectedVideoId) {
    return (
      <VideoDetails courseId={courseId} videoId={selectedVideoId} flag={flag} />
    );
  }

  return (
    <div className="video-list">
      {videos.map((video) => (
        <div
          key={video.id}
          className="video-link"
          style={{ cursor: "pointer", marginBottom: "1rem" }}
          onClick={() => setSelectedVideoId(video.id)}
        >
          <h4>{video.title}</h4>
        </div>
      ))}
    </div>
  );
}

export default VideoList;
