import React from "react";
import "../VideoItem/VideoItem.css";
function VideoItem({ video, handleSetCurrentVideo }) {
  return (
    <div
      className="video-item-box"
      onClick={() => handleSetCurrentVideo(video.video)}
    >
      <div className="video-item">
        <p className="course-title-item inline">{video.title}</p>
        <input type="checkbox"></input>
      </div>
    </div>
  );
}
export default VideoItem;
