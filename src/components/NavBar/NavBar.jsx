import React from "react";
import { Link } from "react-router";
import "./NavBar.css";
function NavBar() {
  return (
    <div className="navbar-container">
      <nav>
        <Link className="leagueboard" to={"/home"}>
          Learning
        </Link>
        <Link to={"/home/courses"}>Find my path</Link>
        <Link to={"/home/myprofile"}>leagueboard</Link>
      </nav>
    </div>
  );
}
export default NavBar;
