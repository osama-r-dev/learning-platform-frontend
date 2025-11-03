import React from "react";
import { useEffect, useState } from "react";
import CourseList from "../CourseList/CourseList";
import EmployeeProfile from "../EmployeeProfile/EmployeeProfile";
function Homepage() {
  return (
    <div>
      <CourseList></CourseList>
      <EmployeeProfile></EmployeeProfile>
    </div>
  );
}

export default Homepage;
