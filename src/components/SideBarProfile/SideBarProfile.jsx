import React, { useEffect, useState } from "react";
import "../SideBarProfile/SideBarProfile.css";
import { Link } from "react-router";
function SideBarProfile() {
  const [isButtunClicked, setIsButtonClicked] = useState(false);
  function handleProfileMenu() {
    setIsButtonClicked(!isButtunClicked);
  }

  return (
    <div>
      <button
        className={`${
          isButtunClicked ? "clicked-prof-btn" : "unclicked-prof-btn"
        }`}
        onClick={handleProfileMenu}
      >
        <ion-icon
          className={" text-[#15616D] h-12 w-12"}
          name="menu-outline"
        ></ion-icon>
      </button>

      <div
        className={`menu-prof ${
          isButtunClicked ? "visible-prof" : "hidden-prof"
        }`}
      >
        <Link to={"/home/mycourses"}> My Courses</Link>
      </div>
    </div>
  );
}

export default SideBarProfile;
