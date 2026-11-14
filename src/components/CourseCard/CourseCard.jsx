import React, { useState } from "react";
import { Link } from "react-router";
import CourseManager from "../CourseManager/CourseManager";
import Rating from "../Rating/Rating";
import myImage from "../../assets/images/image.png";
function CourseCard({ course, courseId }) {
  const url = `/home/courses/${course.id}`;
  return (
    <div
      className={
        " w-full pb-4 bg-[#FFFFFF] flex flex-col font-Poppins items-center gap-2  text-[#190B28 ] font-normal rounded-[8px]"
      }
    >
      <div className=" flex w-full just justify-items-center h-40">
        <img
          className="w-full h-40 object-cover"
          src={
            !course.course_img
              ? myImage
              : "http://127.0.0.1:8000".concat(course.course_img)
          }
        ></img>
      </div>
      <span className="w-54 h-0.5 bg-[#15616D]"></span>
      <div>
        <Link to={url} className="block w-full">
          <h3 className="line-clamp-1 text-[22px] w-full break-words">
            {course.title}
          </h3>
          <p className="text-[16px] font-[400] text-[#868e96]">by osama</p>
          <Rating className={"text-[12px]"} course_id={course.id}></Rating>
          {/* <p>{course.description}</p> */}
          <div></div>
        </Link>
        {courseId ? (
          <div className="flex gap-8">
            <Link
              className="flex justify-self-center"
              onClick={() => getMyCourse(course)}
              to={`/home/mycourses/${course.id}/manage`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </Link>
            <Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
                />
              </svg>
            </Link>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
export default CourseCard;
