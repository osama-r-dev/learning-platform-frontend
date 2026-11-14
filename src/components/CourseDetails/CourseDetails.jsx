import React from "react";

function CourseDetails({ course }) {
  return (
    <div className="">
      <div className="border h-85 bg-[#190B28] flex items-center justify-center flex-col">
        <div className="flex justify-center">
          <p className="text-[42px]  text-[#FFECD1]">{course.title}</p>
        </div>
        <p className="text-[32px] text-[#fff]">{course.description}</p>
        <ul>
          <div className="flex gap-4 ">
            {course.skills?.split(",").map((skill) => (
              <li
                className="bg-[#50d71e] font-semibold text-[18px] pr-4 pl-4 rounded-full px-2  "
                key={skill}
              >
                {skill}
              </li>
            ))}
          </div>
        </ul>
      </div>
      <span>
        {/* <a className="text-[32px]">Overview</a> */}
        {/* <a className="text-[32px]">Quizzes</a> */}
      </span>
    </div>
  );
}

export default CourseDetails;
