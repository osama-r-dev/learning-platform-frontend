import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import CourseDetails from "../CourseDetails/CourseDetails";
import axios from "axios";
import CourseForm from "../CourseForm/CourseForm";
import { useParams } from "react-router";
import VideoForm from "../VideoForm/VideoForm";
import VideoCard from "../VideoCard/VideoCard";

function CourseManager({ myCourse }) {
  const [isEditVideo, setIsEditVideo] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState(null);
  const [addVideoClicked, setAddVideoClicked] = useState(false);
  const [courseData, setCourseData] = useState({});
  const [courseVideos, setCourseVideos] = useState([]);

  const { course_id } = useParams();

  const [isEditButton, setIsEditButton] = useState(false);
  const [prevImage, setPrevImage] = useState(null);
  const [message, setMessage] = useState("ERROR");
  const token = localStorage.getItem("accessToken");
  function playVideo() {
    vidRef.current.play();
  }
  async function deleteCourse() {
    const response = await axios.delete(
      `http://127.0.0.1:8000/api/courses/${course_id}/`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    console.log(response.data);
  }
  async function deleteVideo(videoID) {
    const token = localStorage.getItem("accessToken");
    const response = await axios.delete(
      `http://127.0.0.1:8000/api/courses/${course_id}/myvideos/${videoID}/`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    console.log(response.data);
    setCourseVideos((courseVideos) =>
      courseVideos.filter((video) => video.id !== videoID),
    );
  }
  async function fetchData() {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(
      `http://127.0.0.1:8000/api/courses/${course_id}/`,

      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    setCourseData({
      course_img: response.data.course_img,
      title: response.data.title,
      description: response.data.description,
      skills: response.data.skills,
      date_created: response.data.date_created,
      videos: response.data.videos,
    });
    setCourseVideos(response.data.videos);
    setPrevImage(response.data.course_img);
    console.log(response.data.course_img);
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="  ">
      <div>
        <CourseDetails course={courseData} />
        <div className="flex items-end justify-end gap-4 bg-[#140920] pr-4 ">
          <button onClick={() => setIsEditButton(!isEditButton)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#60A561"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
              />
            </svg>
          </button>
          <button className="" onClick={deleteCourse}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#DE1A1A"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </div>
      </div>
      <div>
        {!isEditButton ? (
          <div></div>
        ) : (
          <div>
            <CourseForm
              setIsEditButton={setIsEditButton}
              isEditButton={isEditButton}
              edit={true}
              courseData={courseData}
              setCourseData={setCourseData}
              course_id={course_id}
              prevImage={prevImage}
              setPrevImage={setPrevImage}
            ></CourseForm>
          </div>
        )}
      </div>
      <div>
        {courseVideos.length > 0 && (
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(380px,1fr))] gap-6">
            {courseVideos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                setCurrentVideoId={setCurrentVideoId}
                deleteVideo={deleteVideo}
              ></VideoCard>
            ))}
          </ul>
        )}

        {currentVideoId && (
          <VideoForm
            // isEditVideo={isEditVideo}
            // setIsEditVideo={isEditVideo}
            closeForm={() => setCurrentVideoId(null)}
            key={currentVideoId}
            setCurrentVideoId={setCurrentVideoId}
            currentVideoId={currentVideoId}
            edit={true}
            course_id={course_id}
            courseVideos={courseVideos}
            setCourseVideos={setCourseVideos}
          ></VideoForm>
        )}
        <div className=" inline-block rounded-full bg-[#15616D]  ">
          <button
            className=" w-16 h-16 items-center flex justify-center text-[#ffffff] "
            onClick={() => setAddVideoClicked(!addVideoClicked)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.6}
              stroke="currentColor"
              className="size-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </div>
        {addVideoClicked && (
          <VideoForm
            closeForm={() => setAddVideoClicked(false)}
            addVideoClicked={addVideoClicked}
            setAddVideoClicked={setAddVideoClicked}
            courseVideos={courseVideos}
            course_id={course_id}
            setCourseVideos={setCourseVideos}
          ></VideoForm>
        )}
      </div>
    </div>
  );
}

export default CourseManager;
