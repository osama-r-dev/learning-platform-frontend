import React, { useState } from "react";
import { Link } from "react-router";
import CourseManager from "../CourseManager/CourseManager";
import Rating from "../Rating/Rating";
import myImage from "../../assets/images/image.png";
import CourseCard from "../CourseCard/CourseCard";
function TestSpace({ course }) {
  const fakeCourse = {
    title: "this is the title",
    id: 0,
    coures_img: myImage,
  };
  return <CourseCard course={fakeCourse}></CourseCard>;
}
export default TestSpace;
