import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Homepage from "./components/Home/Homepage";
import CourseCard from "./components/CourseCard/CourseCard";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home/" element={<Homepage />}></Route>
        <Route path="/home/courses/:courseId" element={<CourseCard />}></Route>
      </Routes>
    </Router>
  );
}
export default App;
