import React, { useEffect, useState } from "react";
import axios from "axios";

function VideoList({ courseId, falg }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

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
          <div key={video.id} className="video-elem">
            <h4>{video.title}</h4>
            <video width="400" controls>
              <source
                src={`http://127.0.0.1:8000${video.video}`}
                type="video/mp4"
              />
            </video>
            <p>{video.description}</p>
            {falg && <button>Edit or Delete</button>}
          </div>
        ))
      )}
    </div>
  );
}

export default VideoList;
