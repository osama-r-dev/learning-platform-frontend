import "./Layout.css";
import React from "react";
import { Link } from "react-router";

function Layout() {
  return (
    <div className="layout-container">
      <nav className="layout-nav">
        <Link to="/login" className="layout-link">
          Login
        </Link>
        <Link to="/signup" className="layout-link">
          Sign Up
        </Link>
      </nav>
      <h1 className="layout-title">LEARN SHARE</h1>
    </div>
  );
}

export default Layout;
