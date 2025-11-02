import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router";
function VideoList({ falg }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { courseId } = useParams();

  async function getVideos() {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(
        `http://127.0.0.1:8000/api/courses/${courseId}/myvideos/`,
        { headers: { Authorization: `Bearer ${token}` } }
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

  if (loading === true) return <p>videos loading</p>;

  return (
    <div className="video-list">
      {videos.length === 0 ? (
        <p>No vidoes</p>
      ) : (
        videos.map((video) => (
          <Link
            key={video.id}
            to={`/courses/${courseId}/videos/${video.id}`}
            className="video-link"
          >
            <h4>{video.title}</h4>
            <video width="200" controls>
              <source
                src={`http://127.0.0.1:8000${video.video}`}
                type="video/mp4"
              />
            </video>
          </Link>
        ))
      )}
    </div>
  );
}

export default VideoList;
