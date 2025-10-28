import React from "react";
import { useParams } from "react-router";

function CourseCard({ courses }) {
  const { courseId } = useParams();
  theCourse = courses.fiter((id) => id === courseId);
  return (
    <div>
      <h2>{theCourse.title}</h2>
      <p>{theCourse.description}</p>
      <p>{theCourse.skills}</p>
      <p> {date_created}</p>
    </div>
  );
}

export default CourseCard;
