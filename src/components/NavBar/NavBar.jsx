import React from "react";
import { Link } from "react-router";
import "../../css-styling/NavBar.css";
function NavBar() {
  return (
    <div className="nav-container">
      <nav>
        <Link to={"/home"}>Home</Link>
        <Link to={"/home"}>Find my path</Link>
        <Link to={"/home"}>league board</Link>
      </nav>
    </div>
  );
}
export default NavBar;
