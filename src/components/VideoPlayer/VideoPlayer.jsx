import React, { useState } from "react";
import { useRef } from "react";
import "../VideoPlayer/VideoPlayer.css";
function VideoPlayer({ currentVideo }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  function handlePlaying() {
    videoRef.current.play();
    setIsPlaying(true);
  }

  function fullScreen() {
    videoRef.current.requestFullscreen();
  }

  function handlePause() {
    videoRef.current.pause();
    setIsPlaying(false);
  }
  return (
    <div className="video-container">
      <video className="" ref={videoRef} key={currentVideo} width="100%">
        <source src={currentVideo} type="video/mp4" />
      </video>

      {!isPlaying ? (
        <ion-icon
          className="play-btn"
          name="play"
          onClick={handlePlaying}
        ></ion-icon>
      ) : (
        <button onClick={handlePause}>⏸ Pause</button>
      )}
      <ion-icon onClick={fullScreen} name="expand"></ion-icon>
    </div>
  );
}
export default VideoPlayer;
