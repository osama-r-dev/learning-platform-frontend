import React from "react";
import { Link } from "react-router";
import "./NavBar.css";
function NavBar() {
  return (
    <div className="nav-container">
      <nav>
        <Link to={"/home/myprofile"}>Home</Link>
        <Link to={"/home"}>league board</Link>
        <Link to={"/home/courses"}>courses</Link>
      </nav>
    </div>
  );
}
export default NavBar;
