import React from "react";
import { Link } from "react-router";
import "./NavBar.css";
function NavBar() {
  return (
    <div className="navbar-container">
      <nav>
        <Link className="leagueboard" to={"/home"}>
          Home
        </Link>
        <Link to={"/home/myprofile"}>Home</Link>
        <Link to={"/home/courses"}>Find my path</Link>
      </nav>
    </div>
  );
}
export default NavBar;
