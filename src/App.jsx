import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Homepage from "./components/Home/Homepage";
import CourseCard from "./components/CourseCard/CourseCard";
import NavBar from "./components/NavBar/NavBar";
import CourseForm from "./components/CourseForm/CourseForm";
import SignupPage from "./components/SignupPage/SignupPage";
import Login from "./components/Login/Login";
function App() {
  return (
    // <div className="app_container">
    <Router>
      <NavBar></NavBar>
      <Routes>
        <Route path="/home" element={<Homepage />}></Route>
        <Route path="/home/courses/:courseId" element={<CourseCard />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </Router>
    // </div>
  );
}
export default App;
