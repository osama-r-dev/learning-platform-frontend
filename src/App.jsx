import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router";
import SignupPage from "./components/SignupPage/SignupPage";
import Login from "./components/Login/Login";
import NavBar from "./components/NavBar/NavBar";
import Homepage from "./components/Home/Homepage";
import CourseViewer from "./components/CourseViewer/CourseViewer";
import Profile from "./components/Profile/Profile";
import axios from "axios";
import AdminCourses from "./components/AdminCourses/AdminCourses";
import CourseManager from "./components/CourseManager/CourseManager";
import VideoForm from "./components/VideoForm/VideoForm";
import CourseCard from "./components/CourseCard/CourseCard";
import TestSpace from "./components/TestSpace/TestSpace";

function App() {
  const [profiles, setProfiles] = useState([]);
  const [myCourse, setMyCourse] = useState({});

  async function getAllProfiles() {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get("http://127.0.0.1:8000/api/allprofiles", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProfiles(response.data);
    console.log(response.data);
  }

  useEffect(() => {
    getAllProfiles();
  }, []);

  function getMyCourse(course) {
    setMyCourse(course);
  }

  return (
    <>
      <BrowserRouter>
        <NavBar profiles={profiles} />
        <Routes>
          <Route path="/testSpace" element={<TestSpace />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="home/courses/:course_Id" element={<CourseViewer />} />
          <Route path="home/:profile_Id" element={<Profile />} />
          <Route
            path="home/mycourses"
            element={<AdminCourses getMyCourse={getMyCourse} />}
          ></Route>

          <Route
            path="home/courses/:course_Id/:video_Id"
            element={<VideoForm getMyCourse={getMyCourse} />}
          ></Route>
          <Route
            path="home/mycourses/:course_id/manage"
            element={<CourseManager myCourse={myCourse} />}
          ></Route>
          {/* Fetching the all profiles list from our profile API endpoint  */}
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
