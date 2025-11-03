import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Homepage from "./components/Home/Homepage";
import CourseDetail from "./components/CourseDetail/CourseDetail";
import NavBar from "./components/NavBar/NavBar";
import NewCourseForm from "./components/NewCourseForm/NewCourseForm";
import SignupPage from "./components/SignupPage/SignupPage";
import Login from "./components/Login/Login";
import EmployeeProfile from "./components/EmployeeProfile/EmployeeProfile";
import CourseList from "./components/CourseList/CourseList";
import VideoList from "./components/VideoList/VideoList";
import VideoDetails from "./components/VideoDetails/VideoDetails";
import Layout from "./components/Layout/Layout";
function App() {
  return (
    // <div className="app_container">
    <Router>
      <NavBar></NavBar>
      <Routes>
        <Route path="/home" element={<Homepage />}></Route>
        <Route
          path="/home/courses/:courseId"
          element={<CourseDetail />}
        ></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="home/myprofile" element={<EmployeeProfile />}></Route>
        <Route
          path="home/myprofile/mycourses"
          element={<CourseList myCoursesMode={true} />}
        />
        <Route
          path="/courses/:courseId/videos/:videoId"
          element={<VideoDetails myCoursesMode={true} />}
        />
        <Route
          path="home/myprofile/mycourses/:courseId"
          element={<CourseDetail myCoursesMode={true} />}
        />
        <Route
          path="home/myprofile/mycourses/new"
          element={<NewCourseForm myCoursesMode={true} />}
        />
        <Route
          path="home/myprofile/mycourses/:courseId/edit"
          element={<NewCourseForm myCoursesMode={true} />}
        />
        <Route path="/layout" element={<Layout Layout={true} />} />
      </Routes>
    </Router>
    // </div>
  );
}
export default App;
