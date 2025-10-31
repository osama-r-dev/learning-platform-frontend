import React from "react";
import { Link } from "react-router";
import "../../css-styling/NavBar.css";
function NavBar() {
  return (
    <div className="nav-container">
      <nav>
        <Link to={"/home/myprofile"}>profile</Link>
        <Link to={"/home/myprofile"}>Home</Link>
        <Link to={"/home"}>league board</Link>
      </nav>
    </div>
  );
}
export default NavBar;
