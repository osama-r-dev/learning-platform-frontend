import React, { useState } from "react";
import "../CourseListHam/CourseListHam.css";
import VideoItem from "../VideoItem/VideoItem";
function CourseListHam({ videoList, handleSetCurrentVideo, course }) {
  const [hamButton, setHamButton] = useState("unclicked");
  const [hamMenu, setaHamMenue] = useState("menu hidden");
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  function handleCourseHamMenu() {
    if (!isMenuClicked) {
      setHamButton("clicked");
      setaHamMenue("menu visible");
    } else {
      setHamButton("unclicked");
      setaHamMenue("menu hidden");
    }
    setIsMenuClicked(!isMenuClicked);
  }
  return (
    <div>
      <div className="profile-menu-drawer">
        <div className={hamButton} onClick={handleCourseHamMenu}>
          click me
        </div>
      </div>

      <ul className={hamMenu} onClick={handleCourseHamMenu}>
        <div className="course-title-heading">
          <p>{course.title}</p>
        </div>
        <div className="video-list-box ">
          {videoList.map((video) => {
            return (
              <VideoItem
                key={video.id}
                handleSetCurrentVideo={handleSetCurrentVideo}
                video={video}
              />
            );
          })}
        </div>
      </ul>
    </div>
  );
}
export default CourseListHam;
