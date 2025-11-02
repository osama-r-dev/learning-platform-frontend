import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

function VideoDetails({ falg }) {
  const { courseId, videoId } = useParams(); // both IDs from URL
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p>Loading video...</p>;
  if (!video) return <p>Video not found</p>;

  return (
    <div className="video-elem">
      <h4>{video.title}</h4>
      <video width="400" controls>
        <source src={`http://127.0.0.1:8000${video.video}`} type="video/mp4" />
      </video>
      <p>{video.description}</p>
      {falg && <button>Edit or Delete</button>}
    </div>
  );
}

export default VideoDetails;
