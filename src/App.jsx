import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router";
import Homepage from "./components/Home/Homepage";
import CourseDetail from "./components/CourseDetail/CourseDetail";
import NavBar from "./components/NavBar/NavBar";
import NewCourseForm from "./components/NewCourseForm/NewCourseForm";
import SignupPage from "./components/SignupPage/SignupPage";
import Login from "./components/Login/Login";
import EmployeeProfile from "./components/EmployeeProfile/EmployeeProfile";
import CourseList from "./components/CourseList/CourseList";
import VideoDetails from "./components/VideoDetails/VideoDetails";
import Layout from "./components/Layout/Layout";

function AppContent() {
  const location = useLocation();

  const hiddenPaths = ["/login", "/signup", "/"];

  const hideNav = hiddenPaths.includes(location.pathname);

  return (
    <>
      {!hideNav && <NavBar />}

      <Routes>
        <Route path="/" element={<Layout />} />

        <Route path="/home" element={<Homepage />} />
        <Route path="/home/courses/:courseId" element={<CourseDetail />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home/myprofile" element={<EmployeeProfile />} />
        <Route
          path="/home/myprofile/mycourses"
          element={<CourseList myCoursesMode={true} />}
        />
        <Route
          path="/courses/:courseId/videos/:videoId"
          element={<VideoDetails myCoursesMode={true} />}
        />
        <Route
          path="/home/myprofile/mycourses/:courseId"
          element={<CourseDetail myCoursesMode={true} />}
        />
        <Route
          path="/home/myprofile/mycourses/new"
          element={<NewCourseForm myCoursesMode={true} flag={false} />}
        />
        <Route
          path="/home/myprofile/mycourses/:courseId/edit"
          element={<NewCourseForm myCoursesMode={true} />}
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
