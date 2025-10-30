import React from "react";
import { Link } from "react-router";
import "../../css-styling/NavBar.css";
function NavBar() {
  return (
    <div className="nav-container">
      <nav>
        <Link to={"/home"}>Home</Link>
      </nav>
    </div>
  );
}

export default NavBar;
